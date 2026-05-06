from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.services.producto_service import get_all_productos

app = FastAPI()

@app.get("/test")
def test_endpoint():
    result = get_all_productos(skip=0, limit=10)
    return result

client = TestClient(app)
response = client.get("/test")
print(f"Status: {response.status_code}")
print(f"Result: {len(response.json())} items")
print("Response:")
print(response.json()[0] if response.json() else "No items")
