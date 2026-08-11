from pydantic import BaseModel, EmailStr, Field

class RegisterRequest(BaseModel):
    
    username: str = Field(
        min_length = 3,
        max_length = 30
    )
    
    email: EmailStr
    
    password: str = Field(
        min_length = 8,
        max_length = 100
    )
    

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    
    otp: str

class LoginRequest(BaseModel):
    email: EmailStr
        
    password: str
    
class ResendOtpRequest(BaseModel):
    email:EmailStr
    
class ForgotPasswordRequest(BaseModel):
    email:EmailStr
    
    
class ResetPasswordRequest(BaseModel):
    
    email: EmailStr
    
    otp: str = Field(
        min_length=6,
        max_length=6
    )
    
    new_password: str = Field(
        min_length=8,
        max_length=100
    )