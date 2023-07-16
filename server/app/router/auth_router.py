from fastapi import APIRouter
from service.auth_service import AuthService
from schema.user import UserLogin
from fastapi import Response
router = APIRouter()

@router.post("/login")
async def login(user: UserLogin, response: Response):
    result = AuthService.login(user.email, user.password)
