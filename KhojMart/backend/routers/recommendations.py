from fastapi import APIRouter
from repositories.json_repository import JsonRepository

router = APIRouter(tags=["Products"])
products = JsonRepository("products.json")

@router.get("/recommendations")
def recommendations():
    return products.read()[:6]
