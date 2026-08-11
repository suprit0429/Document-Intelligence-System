import os
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.retrievers import BM25Retriever
from langchain_community.vectorstores import FAISS
from langchain_classic.retrievers import EnsembleRetriever
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda, RunnableParallel, RunnablePassthrough
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()
model=ChatGroq(model="llama-3.3-70b-versatile")
embedding=HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
# ─────────────────────────────────────────────────────────────────────────────
# STEP 2: Document Loader & Processor (PDF only)
# ─────────────────────────────────────────────────────────────────────────────

def load_document(file_path: str) -> list:
    """
    Load a PDF document from the given file path.

    Args:
        file_path (str): Path to the PDF file.

    Returns:
        list: List of LangChain Document objects.

    Raises:
        FileNotFoundError: If the file does not exist.
        ValueError: If the file is not a PDF.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    _, ext = os.path.splitext(file_path)
    if ext.lower() != ".pdf":
        raise ValueError(f"Only PDF files are supported. Got: '{ext}'")

    loader = PyPDFLoader(file_path)
    documents = loader.load()
    print(f"[INFO] Loaded '{os.path.basename(file_path)}' — {len(documents)} page(s) extracted.")
    return documents


def extract_text(documents: list) -> str:
    """
    Extract and concatenate all text from a list of LangChain Document objects.

    Args:
        documents (list): List of LangChain Document objects.

    Returns:
        str: Full concatenated text content.
    """
    full_text = "\n\n".join([doc.page_content for doc in documents])
    print(f"[INFO] Total characters extracted: {len(full_text)}")
    return full_text


# ─────────────────────────────────────────────────────────────────────────────
# STEP 3: Text Splitter / Chunker
# ─────────────────────────────────────────────────────────────────────────────

def chunk_documents(documents: list, chunk_size: int = 1500, chunk_overlap: int = 300) -> list:
    """
    Split a list of LangChain Document objects into smaller chunks for embedding.

    Args:
        documents (list): List of LangChain Document objects.
        chunk_size (int): Maximum number of characters per chunk. Default is 1500.
                          Larger chunks = more context per retrieval, better answers.
        chunk_overlap (int): Number of overlapping characters between consecutive chunks.
                             Overlap preserves context across chunk boundaries. Default is 300.

    Returns:
        list: A new list of LangChain Document objects, each representing one chunk.
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\n\n", "\n", ".", " ", ""],  # tries paragraph → line → sentence → word
    )

    chunks = splitter.split_documents(documents)
    print(f"[INFO] Split into {len(chunks)} chunk(s) "
          f"(chunk_size={chunk_size}, overlap={chunk_overlap}).")
    return chunks


# ─────────────────────────────────────────────────────────────────────────────
# STEP 4: Vector Store — In-Memory FAISS
# ─────────────────────────────────────────────────────────────────────────────

def build_vector_store(chunks: list) -> FAISS:
    """
    Embed document chunks using HuggingFace embeddings and build an in-memory
    FAISS vector index. The index is NOT saved to disk — it is rebuilt fresh
    for every uploaded document and lives only for the duration of the session.

    Args:
        chunks (list): List of LangChain Document objects (output of chunk_documents).

    Returns:
        FAISS: The in-memory FAISS vector store object.
    """
    print(f"[INFO] Embedding {len(chunks)} chunk(s) — this may take a moment...")
    vector_store = FAISS.from_documents(chunks, embedding)
    print(f"[INFO] FAISS index built in memory ({len(chunks)} chunk(s) indexed).")
    return vector_store


# ─────────────────────────────────────────────────────────────────────────────
# STEP 5: Hybrid Retriever (BM25 + FAISS via EnsembleRetriever)
# ─────────────────────────────────────────────────────────────────────────────

def build_retriever(chunks: list, vector_store: FAISS, k: int = 5):
    """
    Build a Hybrid Retriever that combines:
      - BM25 (sparse / keyword-based): catches exact word matches and rare terms.
      - FAISS MMR (dense / semantic): catches meaning-based matches even without
        exact keywords.

    Both retrievers are merged using LangChain's EnsembleRetriever with equal
    weighting (0.5 BM25 + 0.5 FAISS). Results are deduplicated automatically.

    The retriever is built ONCE per document upload and is stateless — the same
    object handles all questions the user asks in a session.

    Args:
        chunks (list): List of LangChain Document objects — needed to build BM25 index.
        vector_store (FAISS): The in-memory FAISS index (from build_vector_store).
        k (int): Number of chunks each sub-retriever fetches. Default is 5.
                 EnsembleRetriever merges both lists, so final results ≤ 2*k.

    Returns:
        EnsembleRetriever: Hybrid retriever ready to be plugged into the RAG chain.
    """
    # --- Sparse retriever: BM25 (keyword matching) ---
    bm25_retriever = BM25Retriever.from_documents(chunks)
    bm25_retriever.k = k

    # --- Dense retriever: FAISS with MMR (semantic + diversity) ---
    faiss_retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k": k,
            "fetch_k": k * 5,
        },
    )

    # --- Hybrid: merge both with equal weight ---
    hybrid_retriever = EnsembleRetriever(
        retrievers=[bm25_retriever, faiss_retriever],
        weights=[0.4, 0.6],         # 40% keyword + 60% semantic
    )

    print(f"[INFO] Hybrid retriever ready (BM25 + FAISS MMR, k={k} each).")
    return hybrid_retriever


# ─────────────────────────────────────────────────────────────────────────────
# STEP 6: RAG Chain (Prompt + LLM + Output Parser)
# ─────────────────────────────────────────────────────────────────────────────

RAG_PROMPT = PromptTemplate.from_template("""
You are an expert document analyst. Your job is to answer questions based STRICTLY
on the document context provided below.

INSTRUCTIONS:
- Read ALL the context chunks carefully before answering.
- Give a thorough, detailed, and well-structured answer.
- Use bullet points, numbered lists, or paragraphs as appropriate.
- Quote or reference specific parts of the document when relevant.
- If the answer spans multiple chunks, synthesize them into one complete answer.
- If the answer is truly not present in the context, say exactly:
  "I could not find this information in the provided document."
- Do NOT make up or infer information beyond what the document states.

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{question}

DETAILED ANSWER:
""")


def format_docs(docs: list) -> str:
    """Format retrieved chunks with numbering so the LLM can reference them clearly."""
    formatted = []
    for i, doc in enumerate(docs, 1):
        page = doc.metadata.get("page", "?")
        formatted.append(f"[Chunk {i} | Page {page}]\n{doc.page_content}")
    return "\n\n" + "─" * 40 + "\n\n".join(formatted)


def build_rag_chain(retriever):
    """
    Assemble the full RAG chain using LangChain Expression Language (LCEL).

    Pipeline:
        question (str)
            │
            ├─► retriever.invoke(question)  → relevant chunks → format_docs → context (str)
            │
            └─► RunnablePassthrough()       → question (str) passed through unchanged
            │
            ▼
        RAG_PROMPT.format(context=..., question=...)
            │
            ▼
        model (Groq Llama-3.3-70b)
            │
            ▼
        StrOutputParser()  → final answer (str)

    The chain is stateless — call chain.invoke(question) for every user question.
    The retriever automatically queries the in-memory FAISS + BM25 index.

    Args:
        retriever (EnsembleRetriever): Hybrid retriever from build_retriever().

    Returns:
        Runnable: A fully composed LCEL chain. Call with chain.invoke("your question").
    """
    rag_chain = (
        RunnableParallel({
            "context":  retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        })
        | RAG_PROMPT
        | model
        | StrOutputParser()
    )

    print("[INFO] RAG chain assembled and ready.")
    return rag_chain


# ─────────────────────────────────────────────────────────────────────────────
# STEP 7: Main — Wire Everything Together
# ─────────────────────────────────────────────────────────────────────────────

def main():
    """
    Entry point for the Document Intelligence Bot.

    Session flow (per run):
      1. User provides a PDF file path.
      2. Document is loaded, chunked, embedded → FAISS index built (once).
      3. Hybrid retriever (BM25 + FAISS) is created (once).
      4. RAG chain is assembled (once).
      5. User asks as many questions as they want in an interactive loop.
      6. Type 'exit' or 'quit' to end the session.
    """
    print("\n" + "═" * 60)
    print("       📄  Document Intelligence Bot  🤖")
    print("═" * 60)

    # ── Step 1: Load document ──────────────────────────────────
    file_path = input("\nEnter path to your PDF file: ").strip()
    try:
        documents = load_document(file_path)
    except (FileNotFoundError, ValueError) as e:
        print(f"[ERROR] {e}")
        return

    # ── Step 2: Chunk ──────────────────────────────────────────
    chunks = chunk_documents(documents)

    # ── Step 3: Build vector store (in-memory) ─────────────────
    vector_store = build_vector_store(chunks)

    # ── Step 4: Build hybrid retriever ────────────────────────
    retriever = build_retriever(chunks, vector_store)

    # ── Step 5: Assemble RAG chain ────────────────────────────
    chain = build_rag_chain(retriever)

    print("\n✅ Bot is ready! Ask anything about your document.")
    print("   Type 'exit' or 'quit' to end the session.\n")
    print("─" * 60)

    # ── Step 6: Multi-question loop ───────────────────────────
    while True:
        question = input("\n❓ Your question: ").strip()

        if not question:
            continue

        if question.lower() in ("exit", "quit"):
            print("\n👋 Session ended. Goodbye!")
            break

        try:
            print("\n💬 Answer:")
            answer = chain.invoke(question)
            print(answer)
            print("\n" + "─" * 60)
        except Exception as e:
            print(f"[ERROR] Failed to get answer: {e}")


if __name__ == "__main__":
    main()