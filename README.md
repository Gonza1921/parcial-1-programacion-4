# Parcial UTN - Programación IV

Aplicación fullstack (FastAPI + React) para gestionar Categorías, Productos e Ingredientes.

## Requisitos

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+

## Setup

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Crear archivo `.env`:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/parcial_utn
ENVIRONMENT=development
DEBUG=True
```

Ejecutar:
```bash
python run.py
```

API disponible en: `http://127.0.0.1:8000`
Documentación: `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponible en: `http://localhost:5173`

## Estructura

- **Backend**: FastAPI + SQLModel + PostgreSQL
- **Frontend**: React 18 + TypeScript + TanStack Query + Tailwind CSS

## Características

- ✅ CRUD completo para Categorías, Productos e Ingredientes
- ✅ Relaciones 1:N (Categoría → Producto)
- ✅ Relaciones N:N (Producto ↔ Ingrediente)
- ✅ Validaciones con Pydantic
- ✅ Gestión de estado con TanStack Query
- ✅ UI responsiva con Tailwind CSS

## Endpoints API

### Categorías
- `GET /categorias`
- `POST /categorias`
- `PUT /categorias/{id}`
- `DELETE /categorias/{id}`

### Productos
- `GET /productos?categoria_id=1&ingrediente_id=2`
- `POST /productos`
- `PUT /productos/{id}`
- `DELETE /productos/{id}`

### Ingredientes
- `GET /ingredientes`
- `POST /ingredientes`
- `PUT /ingredientes/{id}`
- `DELETE /ingredientes/{id}`
