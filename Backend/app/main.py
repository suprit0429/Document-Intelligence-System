from fastapi import FastAPI
from app.config.database import client

app = FastAPI()

def test_connection():
    try:
        client.admin.command("ping")
        print("MongoDB connected successfully")
    except Exception as e:
        print("MongoDB connection failed:", e)



@app.on_event("startup")
def startup_event():
    test_connection()

@app.get("/")
def root():
    return {"message": "Document Intelligence System API"}
