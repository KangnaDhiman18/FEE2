from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from repositories.json_repository import JsonRepository
from routers.auth import current_user

router = APIRouter(tags=["Shopping"])
lists = JsonRepository("shopping_lists.json")

class ListItem(BaseModel):
    product_id: int
    quantity: int = Field(ge=1)

class ShoppingList(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    items: list[ListItem] = []

@router.get("/lists")
def get_lists(user=Depends(current_user)):
    return [x for x in lists.read() if x["user_id"] == user["id"]]

@router.post("/lists")
def save_list(data: ShoppingList, user=Depends(current_user)):
    records = lists.read()
    item = {"id": lists.next_id(), "user_id": user["id"], **data.model_dump()}
    records.append(item)
    lists.write(records)
    return item
