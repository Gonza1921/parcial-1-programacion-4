from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from typing import Any

from app.database import engine
from app.utils.exceptions import NotFoundException, ValidationException


@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    print('[OK] Tablas creadas en la base de datos')
    yield


app = FastAPI(
    title='FOOD STORE - API REST',
    version='1.0.0',
    description='API para gestionar Categorías, Productos e Ingredientes',
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5175',
    ],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Exception handlers
@app.exception_handler(NotFoundException)
async def not_found_exception_handler(request, exc):
    return HTTPException(status_code=404, detail=str(exc))


@app.exception_handler(ValidationException)
async def validation_exception_handler(request, exc):
    return HTTPException(status_code=400, detail=str(exc))


# Health check endpoint
@app.get('/health', tags=['Health'])
async def health():
    return {'status': 'ok', 'message': 'API is running'}


# Simple test endpoint
@app.get('/test-productos', tags=['Test'], response_model=list[dict[str, Any]])
async def test_productos():
    from app.services.producto_service import get_all_productos
    return get_all_productos(skip=0, limit=10)


# Include routers
from app.routers import categorias, ingredientes, productos
app.include_router(categorias.router, prefix="/api")
app.include_router(ingredientes.router, prefix="/api")
app.include_router(productos.router, prefix="/api")


# Root endpoint
@app.get('/', tags=['Root'])
async def root():
    return {
        'message': 'Bienvenido a FOOD STORE API',
        'endpoints': {
            'categorias': '/api/categorias',
            'ingredientes': '/api/ingredientes',
            'productos': '/api/productos',
            'health': '/health',
            'test-productos': '/test-productos',
            'docs': '/docs',
        },
    }


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
