from datetime import date
from fastapi import APIRouter, HTTPException, Query
from repositories.json_repository import JsonRepository

router = APIRouter(tags=["Products"])
products = JsonRepository("products.json")
inventory = JsonRepository("inventory.json")

def status_for(item):
    if item["quantity"] == 0: return "OUT OF STOCK"
    if item.get("expiry"):
        days = (date.fromisoformat(item["expiry"]) - date.today()).days
        if days < 0: return "EXPIRED"
        if days <= 7: return "NEAR EXPIRY"
    if item["quantity"] <= item["minimum_stock"]: return "LOW STOCK"
    return "NORMAL"

def combined(store_id=None):
    product_map = {p["id"]: p for p in products.read()}
    results = []
    for stock in inventory.read():
        if store_id and stock["store_id"] != store_id: continue
        product = product_map.get(stock["product_id"])
        if product:
            results.append({**product, **stock, "inventory_status": status_for(stock)})
    return results

@router.get("/stores/{store_id}/products")
def store_products(store_id: int, search: str = Query(""), category: str = Query("")):
    result = combined(store_id)
    if search: result = [p for p in result if search.lower() in p["name"].lower() or search.lower() in p["brand"].lower()]
    if category: result = [p for p in result if p["category"] == category]
    return result

@router.get("/products/search")
def search_products(q: str = ""):
    return [p for p in combined() if q.lower() in p["name"].lower() or q.lower() in p["category"].lower()]

@router.get("/products/{product_id}")
def product_detail(product_id: int):
    result = [p for p in combined() if p["product_id"] == product_id]
    if not result: raise HTTPException(status_code=404, detail="Product not found")
    return result[0]

@router.get("/products/{product_id}/compare")
def compare_product(product_id: int):
    return [p for p in combined() if p["product_id"] == product_id]
