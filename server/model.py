from sqlalchemy import ForeignKey, Column, Integer, String
from .database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(30), unique=True)
    email = Column(String(60), unique=True)
    password = Column(String)
    role_id = Column(Integer, ForeignKey("roles.id"))


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(40), unique=True)


