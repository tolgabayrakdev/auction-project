from fastapi import APIRouter
from service.auth_service import AuthService
from schema.user import UserLogin, UserRegister, UserResetToken, UserChangePassword
from fastapi import Response
from fastapi import HTTPException
from fastapi import Request
from fastapi import Request
import jwt
router = APIRouter()


@router.post("/login")
async def login(user: UserLogin, response: Response):
    result = AuthService.login(user.email, user.password)
    if result is None:
        raise HTTPException(status_code=400, detail="Username or password wrong!")
    response.set_cookie(key="access_token", value=result["access_token"], httponly=True)
    response.set_cookie(
        key="refresh_token", value=result["refresh_token"], httponly=True
    )
    return {"message": "Login is successful"}


@router.post("/register", status_code=201)
async def register(user: UserRegister):
    if user is not None:
        try:
            AuthService.register(user)
            return {"message": "User created succesful."}
        except:
            raise HTTPException(
                status_code=400, detail="Username or password already used!"
            )
    else:
        raise HTTPException(status_code=400, detail="Invalid format")


@router.post("/verify", status_code=200)
async def verify_user(request: Request):
    auth_header = request.cookies.get("access_token")
    if auth_header is not None:
        decoded_token = jwt.decode(auth_header, "secret", algorithms=["HS256"])
        id = decoded_token["payload"]["user_id"]
        result = AuthService.user_information(id)
        print(result.id, result.username)
        return {"success": "true", "user": {
            "username": result.username,
            "email": result.email,
            "phone_number": result.phone_number,
            "address": result.address
        } }
    else:
        raise HTTPException(status_code=401, detail="Unauthorization")


@router.post("/generate-token", status_code=201)
async def reset_password(body: UserResetToken):
    result = AuthService.generate_reset_token(body.email)
    if result:
        return {"success": "true", "message": "Created"}
    else:
        raise HTTPException(status_code=400, detail="Invalid Request")
    

@router.post("/verify-token/{token}")
async def verify_reset_token(token: str):
    result = AuthService.verify_reset_token(token)
    return {"message": result}
        

@router.put("/change-password/{token}")
async def change_password(body: UserChangePassword, token: str):
    try:
        result = AuthService.change_password(token=token, new_password=body.password)
        return result
    except HTTPException as e:
        raise e



@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"messsage": "you are logged out."}