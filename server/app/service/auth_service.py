from database import SessionLocal
from model import User, PasswordReset
from util.helper import Helper
import uuid
from datetime import datetime, timedelta
from fastapi import HTTPException
import smtplib

db = SessionLocal()


class AuthService:
    def login(email: str, password: str):
        user = db.query(User).filter_by(email=email).first()
        if user is None or not Helper.matchHashedText(user.password, password):
            return False
        access_token = Helper.generate_access_token({"user_id": user.id})
        refresh_token = Helper.generate_refresh_token({"user_id": user.id})
        return {"access_token": access_token, "refresh_token": refresh_token}

    @staticmethod
    def register(payload: dict):
        user = User(
            username=payload.username,
            email=payload.email,
            password=Helper.generate_hash_password(payload.password),
            role_id = 1
        )
        db.add(user)
        db.commit()
        return user

    @staticmethod
    def user_information(id: int):
        user = db.query(User).filter_by(id=id).first()
        if user:
            return user
        else:
            return False

    @staticmethod
    def generate_reset_token(email: str):
        db.query(PasswordReset).filter(PasswordReset.email == email).delete()
        token = str(uuid.uuid4())
        expiration_date = datetime.utcnow() + timedelta(minutes=15)

        new_token = PasswordReset(
            email=email, token=token, expiration_date=expiration_date
        )
        sender = "from@example.com"
        receiver = "o@example.com"

        message = f"""\
        Subject: Hi Mailtrap
        To: {receiver}
        From: {sender}

        This is a test e-mail message."""
        with smtplib.SMTP("sandbox.smtp.mailtrap.io", 2525) as server:
            server.login("d225eaf7a363a3", "79b349db43a223")
            server.sendmail(sender, receiver, message)

        db.add(new_token)
        db.commit()
        return {"message": "success", "token": token}

    @staticmethod
    def verify_reset_token(token: str):
        current_time = datetime.utcnow()
        reset_token = (
            db.query(PasswordReset).filter(PasswordReset.token == token).first()
        )
        if not reset_token:
            raise HTTPException(status_code=404, detail="Token invalid")
        if reset_token.expiration_date < current_time:
            raise HTTPException(status_code=400, detail="Token has expired")
        return {"success": True}

    @staticmethod
    def change_password(token: str, new_password: str):
        hashed_password = Helper.generate_hash_password(new_password)
        reset_token = (
            db.query(PasswordReset).filter(PasswordReset.token == token).first()
        )
        if not reset_token:
            raise HTTPException(status_code=404, detail="Token invalid")

        user = db.query(User).filter(User.email == reset_token.email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user.password = hashed_password
        db.commit()
        return {"message": "Password has been changed successfully."}
