from fastapi import FastAPI
from database import engine
from model import Base
from fastapi.middleware.cors import CORSMiddleware
from router.auth_router import router
from router.product_router import product_router
from middleware.auth_middleware import auth_middleware

app = FastAPI()

origins = ["http://localhost:3000", "https://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def read_root():
    return {"Hello": "World"}


app.include_router(router, prefix="/api/v1/auth")
app.include_router(product_router, prefix="/api/v1/products")
