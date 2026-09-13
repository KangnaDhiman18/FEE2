from fastapi import APIRouter, HTTPException
from repositories.json_repository import JsonRepository

router = APIRouter(prefix="/stores", tags=["Stores"])
stores = JsonRepository("stores.json")

@router.get("")
def list_stores():
    return stores.read()

@router.get("/nearby")
def nearby_stores():
    return sorted(stores.read(), key=lambda store: store["distance"])

@router.get("/{store_id}")
def get_store(store_id: int):
    store = next((s for s in stores.read() if s["id"] == store_id), None)
    if not store:
        raise HTTPException(status_code=404, detail="Store not found")
    return store
