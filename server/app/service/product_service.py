from database import SessionLocal
from model import Product
from fastapi import HTTPException
from sqlalchemy.exc import SQLAlchemyError

db = SessionLocal()

class ProductService:

    def create(data: dict):
        try:
            product = Product(
                title=data.title,
                about=data.about,
                starting_price=data.starting_price,
                current_price=data.starting_price,
                end_date=data.end_date,
                status=True,
                user_id=data.user_id
            )
            db.add(product)
            db.commit()
            return product
        except SQLAlchemyError as e:
            # Log the error here if needed
            db.rollback()
            raise HTTPException(status_code=500, detail="Database Error")