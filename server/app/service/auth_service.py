from database import SessionLocal
from model import User

db = SessionLocal()


class AuthService:

    def login(email: str, password: str):
        user = db.query(User).filter_by(email=email).first()