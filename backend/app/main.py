from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from app.database import engine
from app.routers import categorias, materiales, productos
from app.utils.exceptions import NotFoundException, ValidationException


@asynccontextmanager
async def lifespan(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    print('✓ Tablas creadas en la base de datos')
    yield


app = FastAPI(
    title='DOLLAR RICH KIDZ - API REST',
    version='1.0.0',
    description='API para gestionar Categorías, Productos y Materiales',
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


# Include routers
app.include_router(categorias.router, prefix="/api")
app.include_router(materiales.router, prefix="/api")
app.include_router(productos.router, prefix="/api")


# Root endpoint
@app.get('/', tags=['Root'])
async def root():
    return {
        'message': 'Bienvenido a DOLLAR RICH KIDZ API',
        'endpoints': {
            'categorias': '/api/categorias',
            'materiales': '/api/materiales',
            'productos': '/api/productos',
            'health': '/health',
            'docs': '/docs',
        },
    }


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)