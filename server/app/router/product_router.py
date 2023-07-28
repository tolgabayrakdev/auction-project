from fastapi import APIRouter
from service.product_service import ProductService
from schema.product import CreateProduct
from fastapi import HTTPException
router = APIRouter()

@router.post("/create", status_code=201)
async def create_product(product: CreateProduct):
    try:
        if product:
            result = ProductService.create(product)
            return {"success": "true", "message":{"User created" : result}}
    except:
        raise HTTPException(status_code=500, detail="Internal server error")