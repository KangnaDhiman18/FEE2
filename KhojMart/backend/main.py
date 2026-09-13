import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, stores, products, orders, admin, lists, recommendations, demands

app = FastAPI(title="KhojMart API", version="1.0.0", description="Store discovery and inventory APIs backed by JSON files.")
origins = os.getenv("KhojMart_CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth.router); app.include_router(stores.router); app.include_router(products.router); app.include_router(orders.router); app.include_router(admin.router)
app.include_router(lists.router); app.include_router(recommendations.router)
app.include_router(demands.router)

@app.get("/")
def root(): return {"name": "KhojMart API", "docs": "/docs", "status": "ready"}
