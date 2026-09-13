from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_and_stores():
    assert client.get("/").status_code == 200
    assert len(client.get("/stores").json()) >= 3


def test_product_search():
    response = client.get("/stores/1/products", params={"search": "milk"})
    assert response.status_code == 200
    assert response.json()[0]["name"] == "Amul Taaza Milk 1L"


def test_login_and_role_protection():
    login = client.post("/auth/login", json={"email": "customer@example.com", "password": "customer123"})
    assert login.status_code == 200
    token = login.json()["access_token"]
    assert client.get("/admin/dashboard", headers={"Authorization": f"Bearer {token}"}).status_code == 403
