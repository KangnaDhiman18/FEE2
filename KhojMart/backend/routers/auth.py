from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
from repositories.json_repository import JsonRepository
from services.auth_service import authenticate, create_token, decode_token, pwd_context

router = APIRouter(prefix="/auth", tags=["Authentication"])
users = JsonRepository("users.json")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class Credentials(BaseModel):
    email: EmailStr
    password: str

class Registration(Credentials):
    name: str
    role: str = "customer"


def current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")
    user = next((u for u in users.read() if str(u["id"]) == payload.get("sub")), None)
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


def manager_user(user=Depends(current_user)):
    if user["role"] != "manager":
        raise HTTPException(status_code=403, detail="Manager access required")
    return user

@router.post("/register")
def register(data: Registration):
    records = users.read()
    if any(user["email"].lower() == data.email.lower() for user in records):
        raise HTTPException(status_code=400, detail="Email is already registered")
    user = {"id": users.next_id(), "name": data.name, "email": data.email, "password": pwd_context.hash(data.password), "role": "customer"}
    records.append(user)
    users.write(records)
    return {"access_token": create_token(user), "token_type": "bearer", "user": {k: v for k, v in user.items() if k != "password"}}

@router.post("/login")
def login(data: Credentials):
    user = authenticate(data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return {"access_token": create_token(user), "token_type": "bearer", "user": {k: v for k, v in user.items() if k != "password"}}

@router.get("/me")
def me(user=Depends(current_user)):
    return {k: v for k, v in user.items() if k != "password"}
