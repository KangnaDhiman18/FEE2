from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from repositories.json_repository import JsonRepository
from routers.auth import current_user

router = APIRouter(prefix="/orders", tags=["Orders"])
orders = JsonRepository("orders.json")
inventory = JsonRepository("inventory.json")
products = JsonRepository("products.json")

class OrderItem(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)

class CreateOrder(BaseModel):
    store_id: int
    items: list[OrderItem]

@router.get("")
def list_orders(user=Depends(current_user)):
    return [o for o in orders.read() if o["user_id"] == user["id"]]

@router.post("")
def create_order(data: CreateOrder, user=Depends(current_user)):
    if not data.items:
        raise HTTPException(status_code=422, detail="Order must contain at least one item")
    stocks = inventory.read(); product_map = {p["id"]: p for p in products.read()}; line_items = []
    for requested in data.items:
        stock = next((s for s in stocks if s["store_id"] == data.store_id and s["product_id"] == requested.product_id), None)
        if not stock or stock["quantity"] < requested.quantity: raise HTTPException(status_code=400, detail="Insufficient stock")
        product = product_map[requested.product_id]; line_items.append({"product_id": requested.product_id, "quantity": requested.quantity, "price": product["price"]}); stock["quantity"] -= requested.quantity
    total = sum(item["price"] * item["quantity"] for item in line_items)
    order = {"id": orders.next_id() + 1000, "user_id": user["id"], "store_id": data.store_id, "items": line_items, "total": total, "created_at": datetime.now().isoformat()}
    records = orders.read(); records.append(order); orders.write(records); inventory.write(stocks)
    return order
