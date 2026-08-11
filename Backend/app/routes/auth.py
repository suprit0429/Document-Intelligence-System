import os
import random
from datetime import datetime, timedelta, timezone

from bson import ObjectId
from fastapi import APIRouter, HTTPException

from app.config.database import (
    users_collection,
    otp_collection
)

from app.schemas.auth import (
    RegisterRequest,
    VerifyOTPRequest,
    LoginRequest,
    ResendOtpRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)

from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.utils.email import send_otp_email


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


OTP_EXPIRE_MINUTES = int(
    os.getenv("OTP_EXPIRE_MINUTES", 5)
)


def generate_otp():

    return str(
        random.randint(100000, 999999)
    )

@router.post("/register")
async def register(user: RegisterRequest):

    existing_email = await users_collection.find_one({
        "email": user.email
    })

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    existing_username = await users_collection.find_one({
        "username": user.username
    })

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already taken"
        )

    otp = generate_otp()

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=OTP_EXPIRE_MINUTES)
    )

    # Remove previous OTP
    await otp_collection.delete_many({
        "email": user.email
    })

    # Store temporary registration information
    await otp_collection.insert_one({

        "email": user.email,

        "username": user.username,

        "password_hash": hash_password(
            user.password
        ),

        "otp": otp,

        "purpose": "registration",

        "expires_at": expires_at
    })

    try:

        send_otp_email(
            user.email,
            otp,
            "verification"
        )

    except Exception as e:

        await otp_collection.delete_many({
            "email": user.email
        })

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    return {
        "message": "OTP sent to your email",
        "email": user.email
    }
    
@router.post("/verify-otp")
async def verify_otp(data: VerifyOTPRequest):

    record = await otp_collection.find_one({
        "email": data.email,
        "purpose": "registration"
    })

    if not record:

        raise HTTPException(
            status_code=400,
            detail="OTP not found or expired"
        )

    expires_at = record["expires_at"].replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):

        await otp_collection.delete_one({
            "_id": record["_id"]
        })

        raise HTTPException(
            status_code=400,
            detail="OTP has expired"
        )

    if record["otp"] != data.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    user = {

        "username": record["username"],

        "email": record["email"],

        "password_hash": record["password_hash"],

        "is_verified": True,

        "created_at": datetime.now(timezone.utc)
    }

    result = await users_collection.insert_one(user)

    await otp_collection.delete_one({
        "_id": record["_id"]
    })

    return {
        "message": "Account created successfully",
        "user_id": str(result.inserted_id)
    }
@router.post("/resend-otp")
async def resend_otp(data: ResendOtpRequest):

    record = await otp_collection.find_one({
        "email": data.email,
        "purpose": "registration"
    })

    if not record:

        raise HTTPException(
            status_code=404,
            detail="Registration request not found"
        )

    otp = generate_otp()

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=OTP_EXPIRE_MINUTES)
    )

    await otp_collection.update_one(

        {
            "_id": record["_id"]
        },

        {
            "$set": {
                "otp": otp,
                "expires_at": expires_at
            }
        }
    )

    send_otp_email(
        data.email,
        otp,
        "verification"
    )

    return {
        "message": "New OTP sent"
    }

@router.post("/login")
async def login(data: LoginRequest):
    
    user = await users_collection.find_one({
        "email":data.email
    })
    
    if not user:
        raise HTTPException(
            status_code = 401,
            detail ="Invalid email or password"
        )
    
    if not user.get("is_verified", False):
        
        raise HTTPException(
            status_code = 403,
            detail = "please verify your email first"
        )
    if not verify_password(
        data.password,
        user["password_hash"]
    ):
        raise HTTPException(
            status_code=401,
            detail ="Invalid email or password"
        )
    token = create_access_token(
        str(user["_id"])
    )
    return {

        "message": "Login successful",

        "token": token,

        "user": {

            "id": str(user["_id"]),

            "username": user["username"],

            "email": user["email"]
        }
    }

@router.post("/forgot-password")
async def forgot_password(
    data: ForgotPasswordRequest
):

    user = await users_collection.find_one({
        "email": data.email
    })

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Email not registered"
        )

    otp = generate_otp()

    expires_at = (
        datetime.now(timezone.utc)
        + timedelta(minutes=OTP_EXPIRE_MINUTES)
    )

    await otp_collection.delete_many({
        "email": data.email
    })

    await otp_collection.insert_one({

        "email": data.email,

        "otp": otp,

        "purpose": "password_reset",

        "expires_at": expires_at
    })

    send_otp_email(
        data.email,
        otp,
        "password_reset"
    )

    return {
        "message": "Password reset OTP sent"
    }
@router.post("/reset-password")
async def reset_password(
    data: ResetPasswordRequest
):

    record = await otp_collection.find_one({
        "email": data.email,
        "purpose": "password_reset"
    })

    if not record:

        raise HTTPException(
            status_code=400,
            detail="OTP not found or expired"
        )

    expires_at = record["expires_at"].replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):

        await otp_collection.delete_one({
            "_id": record["_id"]
        })

        raise HTTPException(
            status_code=400,
            detail="OTP expired"
        )

    if record["otp"] != data.otp:

        raise HTTPException(
            status_code=400,
            detail="Invalid OTP"
        )

    await users_collection.update_one(

        {
            "email": data.email
        },

        {
            "$set": {
                "password_hash": hash_password(
                    data.new_password
                )
            }
        }
    )

    await otp_collection.delete_one({
        "_id": record["_id"]
    })

    return {
        "message": "Password reset successfully"
    }