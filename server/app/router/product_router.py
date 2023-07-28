from fastapi import APIRouter
from service.product_service import ProductService
from schema.product import CreateProduct
from fastapi import HTTPException
from fastapi import Depends
from middleware.auth_middleware import auth_middleware


product_router = APIRouter()

@product_router.post("/", status_code=201)
async def create_product(product: CreateProduct, token = Depends(auth_middleware)):
    print(token)
    try:
        if product:
            result = ProductService.create(product)
            return {"success": "true", "message":{"User created" : result}}
    except:
        raise HTTPException(status_code=500, detail="Internal server error")