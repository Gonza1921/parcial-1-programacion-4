from app.main import app
from app.database import engine
from sqlmodel import SQLModel
import asyncio

# Create tables
SQLModel.metadata.create_all(engine)
print("[OK] Tables created")

# Test the endpoint handler directly
from app.routers.productos import list_productos

try:
    result = asyncio.run(list_productos(skip=0, limit=10))
    print("[OK] Endpoint called successfully")
    print(f"Result type: {type(result)}")
    print(f"Result: {len(result) if isinstance(result, list) else 'not a list'} items")
    if result:
        print(f"First item type: {type(result[0])}")
        if isinstance(result[0], dict):
            print(f"First item keys: {list(result[0].keys())}")
        else:
            print(f"First item: {result[0]}")
except Exception as e:
    print(f"[ERROR] {type(e).__name__}: {e}")
    import traceback
    traceback.print_exc()
