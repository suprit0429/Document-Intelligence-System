import os
from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader,
    CSVLoader,
    UnstructuredFileLoader,
)


SUPPORTED_EXTENSIONS = {
    ".pdf": PyPDFLoader,
    ".docx": Docx2txtLoader,
    ".txt": TextLoader,
    ".csv": CSVLoader,
}


def load_document(file_path: str) -> list:
    """
    Load a document from the given file path.
    Supports PDF, DOCX, TXT, CSV and falls back to UnstructuredFileLoader.

    Args:
        file_path (str): Absolute or relative path to the document.

    Returns:
        list: A list of LangChain Document objects with page_content and metadata.

    Raises:
        FileNotFoundError: If the file does not exist.
        ValueError: If the file type is not supported even by fallback loader.
    """
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")

    _, ext = os.path.splitext(file_path)
    ext = ext.lower()

    loader_class = SUPPORTED_EXTENSIONS.get(ext)

    if loader_class:
        loader = loader_class(file_path)
    else:
        print(f"[WARN] Unknown file type '{ext}'. Trying UnstructuredFileLoader...")
        loader = UnstructuredFileLoader(file_path)

    documents = loader.load()

    print(f"[INFO] Loaded '{os.path.basename(file_path)}' — {len(documents)} page(s) / section(s) extracted.")
    return documents


def extract_text(documents: list) -> str:
    """
    Extract and concatenate all text content from a list of LangChain Document objects.

    Args:
        documents (list): List of LangChain Document objects.

    Returns:
        str: Full concatenated text from all documents.
    """
    full_text = "\n\n".join([doc.page_content for doc in documents])
    print(f"[INFO] Total characters extracted: {len(full_text)}")
    return full_text


if __name__ == "__main__":
    # Quick test — replace with your actual file path
    test_file = input("Enter file path to test: ").strip()
    docs = load_document(test_file)
    text = extract_text(docs)
    print("\n--- EXTRACTED TEXT PREVIEW (first 500 chars) ---")
    print(text[:500])
