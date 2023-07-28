from pydantic import BaseModel
from datetime import datetime

class CreateProduct(BaseModel):
    title: str
    about: str
    starting_price: float
    end_date: datetime
