import os
from pymongo import AsyncMongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DB_NAME")


client = AsyncMongoClient(MONGO_URI)
db = client[DATABASE_NAME]

users_collection = db["users"]
otp_collection = db["otp_verifications"]