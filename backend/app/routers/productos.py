from fastapi import APIRouter, HTTPException, status, Query
from typing import Annotated, Any

from app.services.producto_service import (
    get_all_productos,
    get_producto_by_id,
    create_producto,
    update_producto,
    delete_producto,
)
from app.schemas.producto import ProductoCreate, ProductoUpdate, ProductoRead
from app.utils.exceptions import NotFoundException

router = APIRouter(prefix='/productos', tags=['productos'])


@router.get('', response_model=list[dict[str, Any]])
async def list_productos(
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(gt=0, le=100)] = 10,
    categoria_id: Annotated[int | None, Query()] = None,
    ingrediente_id: Annotated[int | None, Query()] = None,
):
    return get_all_productos(
        skip=skip,
        limit=limit,
        categoria_id=categoria_id,
        ingrediente_id=ingrediente_id,
    )


@router.get('/{id}', response_model=dict[str, Any])
async def get_producto(id: int):
    try:
        return get_producto_by_id(id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post('', response_model=dict[str, Any], status_code=status.HTTP_201_CREATED)
async def create_producto_endpoint(
    producto_in: ProductoCreate,
):
    try:
        return create_producto(producto_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/{id}', response_model=dict[str, Any])
async def update_producto_endpoint(
    id: int,
    producto_in: ProductoUpdate,
):
    try:
        return update_producto(id, producto_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_producto_endpoint(
    id: int,
):
    try:
        delete_producto(id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))

