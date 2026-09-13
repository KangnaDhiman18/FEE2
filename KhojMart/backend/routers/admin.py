from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from repositories.json_repository import JsonRepository
from routers.auth import manager_user
from routers.products import combined, status_for

router = APIRouter(prefix="/admin", tags=["Manager"])
inventory = JsonRepository("inventory.json")
products = JsonRepository("products.json")
orders = JsonRepository("orders.json")
demands = JsonRepository("demands.json")

class InventoryUpdate(BaseModel):
    quantity: int = Field(ge=0)
    minimum_stock: int = Field(ge=0)
    expiry: str | None = None
    section: str
    aisle: str
    shelf: str
    position: str

@router.get("/dashboard")
def dashboard(user=Depends(manager_user)):
    items = combined(user.get("store_id"))
    return {"total_products": len(items), "total_stock": sum(p["quantity"] for p in items), "low_stock": sum(p["inventory_status"] == "LOW STOCK" for p in items), "out_of_stock": sum(p["inventory_status"] == "OUT OF STOCK" for p in items), "near_expiry": sum(p["inventory_status"] == "NEAR EXPIRY" for p in items), "today_orders": len(orders.read()), "today_sales": sum(o["total"] for o in orders.read())}

@router.get("/products")
def manager_products(user=Depends(manager_user)):
    return combined(user.get("store_id"))

@router.put("/inventory/{inventory_id}")
def update_inventory(inventory_id: int, data: InventoryUpdate, user=Depends(manager_user)):
    records = inventory.read()
    item = next((i for i in records if i["id"] == inventory_id), None)
    if not item or item["store_id"] != user.get("store_id"): raise HTTPException(status_code=404, detail="Inventory item not found")
    item.update(data.model_dump())
    inventory.write(records)
    return {**item, "inventory_status": status_for(item)}

@router.get("/analytics")
def analytics(user=Depends(manager_user)):
    items = combined(user.get("store_id")); order_records = orders.read()
    top_products = []
    for product in products.read()[:5]:
        units = sum(item["quantity"] for order in order_records for item in order["items"] if item["product_id"] == product["id"])
        top_products.append({"name": product["name"], "units": units})
    return {"total_sales": sum(o["total"] for o in order_records), "total_orders": len(order_records), "average_order_value": round(sum(o["total"] for o in order_records) / len(order_records), 2) if order_records else 0, "top_products": top_products, "low_stock_products": [p["name"] for p in items if p["inventory_status"] in ("LOW STOCK", "OUT OF STOCK")], "near_expiry_products": [p["name"] for p in items if p["inventory_status"] == "NEAR EXPIRY"]}

@router.get("/demands")
def manager_demands(user=Depends(manager_user)):
    return [d for d in demands.read() if d["store_id"] == user.get("store_id")]
