import os
from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from jose import JWTError, jwt
from passlib.context import CryptContext
from repositories.json_repository import JsonRepository

load_dotenv()
SECRET_KEY = os.getenv("KhojMart_SECRET_KEY", "dev-only-KhojMart-secret")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
users = JsonRepository("users.json")


def authenticate(email: str, password: str):
    user = next((u for u in users.read() if u["email"].lower() == email.lower()), None)
    if not user or (user["password"] != password and not pwd_context.verify(password, user["password"])):
        return None
    return user


def create_token(user: dict) -> str:
    expires = datetime.now(timezone.utc) + timedelta(minutes=int(os.getenv("KhojMart_TOKEN_EXPIRE_MINUTES", "60")))
    return jwt.encode({"sub": str(user["id"]), "role": user["role"], "exp": expires}, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
