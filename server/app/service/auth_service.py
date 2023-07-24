from database import SessionLocal
from model import User, PasswordReset
from util.helper import Helper
import uuid
from datetime import datetime, timedelta

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
            password=Helper.generate_hash_password(payload.password)
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
        db.add(new_token)
        db.commit()
        return {"message": "success", "token": token}
    
    @staticmethod
    def verify_reset_token(token: str):
        current_time = datetime.utcnow()
        reset_token = db.query(PasswordReset)