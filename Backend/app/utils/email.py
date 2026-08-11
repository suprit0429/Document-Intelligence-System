import os
import smtplib

from email.message import EmailMessage

from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")


def send_otp_email(
    receiver_email:str,
    otp:str,
    purpose:str = "verification"
):
    if purpose == "verification":
        subject = "Verify your AI Study Assistant account"
        
        body = f"""
        Hello,

        Your OTP for verifying your AI Study Assistant account is:

        {otp}

        This OTP is valid for 5 minutes.

        If you did not request this, please ignore this email.

        Regards,
        Document-Intelligence-System

        """
    else:
        subject = "Reset your password"
        body = f"""
        Hello,

        Your password reset OTP is:

        {otp}

        This OTP is valid for 5 minutes.

        If you did not request a password reset, please ignore this email.

        Regards,
        Document-Intelligence-System
        """
    message = EmailMessage()
    
    message["subject"] = subject
    message["from"] = SMTP_EMAIL
    message["To"] = receiver_email
    
    message.set_content(body)
    
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        
        server.login(
            SMTP_EMAIL,
            SMTP_PASSWORD
        )
        server.send_message(message)