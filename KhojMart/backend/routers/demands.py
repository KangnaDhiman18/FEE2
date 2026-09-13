from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from repositories.json_repository import JsonRepository
from routers.auth import current_user

router = APIRouter(prefix="/demands", tags=["Demand"])
demands = JsonRepository("demands.json")
stores = JsonRepository("stores.json")

class CreateDemand(BaseModel):
    store_id: int = Field(gt=0)
    item_name: str = Field(min_length=2, max_length=100)
    category: str | None = Field(default=None, max_length=60)
    notes: str | None = Field(default=None, max_length=500)

@router.get("")
def list_demands(user=Depends(current_user)):
    return [d for d in demands.read() if d["user_id"] == user["id"]]

@router.post("", status_code=201)
def create_demand(data: CreateDemand, user=Depends(current_user)):
    if not any(store["id"] == data.store_id for store in stores.read()):
        raise HTTPException(status_code=404, detail="Store not found")
    item = {"id": demands.next_id(), "user_id": user["id"], **data.model_dump(), "status": "Pending", "created_at": datetime.now(timezone.utc).isoformat()}
    records = demands.read(); records.append(item); demands.write(records)
    return item
