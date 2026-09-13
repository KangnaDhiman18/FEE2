# KhojMart

KhojMart is a college-level store discovery and inventory application. Customers can search products inside nearby stores, see aisle and shelf locations, build a shopping list, and complete a simulated purchase. Store managers get an inventory overview with stock and expiry alerts.

## Stack

- Frontend: React, JavaScript, Vite, Axios, React Router, Lucide icons, normal CSS
- Backend: Python, FastAPI, Pydantic, Uvicorn, JWT
- Storage: JSON files only for version 1

The project does not use SQL, MongoDB, Django, Express, or a Node.js server. Node/npm is used only as the React build tool required by Vite.

## Architecture

```text
React UI -> Axios -> FastAPI routes -> services -> JSON repository -> JSON files
```

`backend/repositories/json_repository.py` is the storage boundary. A future SQL repository can implement the same operations without changing the React API contract.

## Project Structure

```text
backend/
  main.py
  data/                 JSON persistence
  repositories/         storage boundary
  services/             auth logic
  routers/              REST endpoints
frontend/
  src/main.jsx          customer and manager UI
  src/api.js            Axios client
  src/index.css         responsive visual system
```

## Install

### Backend

```bash
cd backend
python3 -m pip install -r requirements.txt
cp .env.example .env
```

### Frontend

```bash
cd frontend
npm install
```

## Run

Terminal 1:

```bash
cd backend
PYTHONPATH=. python3 -m uvicorn main:app --reload
```

Open the API docs at http://localhost:8000/docs.

Terminal 2:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173.

## Demo Accounts

- Customer: `customer@example.com` / `customer123`
- Manager: `manager@example.com` / `manager123`

The demo login button asks for credentials. Manager mode becomes available after manager login.

## Main API Routes

- `POST /auth/register`, `POST /auth/login`, `GET /auth/me`
- `GET /stores`, `GET /stores/nearby`, `GET /stores/{store_id}`
- `GET /stores/{store_id}/products`, `GET /products/search`, `GET /products/{product_id}`
- `GET /orders`, `POST /orders`
- `GET /admin/dashboard`, `GET /admin/products`, `PUT /admin/inventory/{inventory_id}`, `GET /admin/analytics`

## Data Model

Products describe catalog information. Inventory adds `store_id`, quantity, minimum stock, expiry, section, aisle, shelf, and position. Orders store product ids, quantities, prices, totals, customer id, store id, and creation time. These files are intentionally readable so the data flow can be explained in a presentation.

## Future Database Integration

Current:

```text
React -> FastAPI -> service layer -> JSON repository -> JSON files
```

Future:

```text
React -> FastAPI -> service layer -> SQL repository -> MySQL
```

Only the repository implementation needs to change. Routes and frontend requests can remain stable.

## Future ML Integration

Version 1 uses straightforward Python rules for stock status, expiry status, and sales summaries. Future versions could add demand forecasting, product popularity prediction, customer segmentation, and more advanced market-basket analysis without changing the basic API shape.
