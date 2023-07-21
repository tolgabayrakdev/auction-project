from database import SessionLocal
from model import User
from util.helper import Helper

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