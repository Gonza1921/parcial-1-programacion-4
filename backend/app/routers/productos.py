from fastapi import APIRouter, Depends, HTTPException, status, Query
from typing import Annotated
from sqlmodel import Session

from app.database import get_session
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


@router.get('', response_model=list[ProductoRead])
async def list_productos(
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(gt=0, le=100)] = 10,
    categoria_id: Annotated[int | None, Query()] = None,
    material_id: Annotated[int | None, Query()] = None,
    session: Session = Depends(get_session),
):
    return await get_all_productos(
        session,
        skip=skip,
        limit=limit,
        categoria_id=categoria_id,
        material_id=material_id,
    )


@router.get('/{id}', response_model=ProductoRead)
async def get_producto(id: int, session: Session = Depends(get_session)):
    try:
        return await get_producto_by_id(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post('', response_model=ProductoRead, status_code=status.HTTP_201_CREATED)
async def create_producto_endpoint(
    producto_in: ProductoCreate,
    session: Session = Depends(get_session),
):
    try:
        return await create_producto(session, producto_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/{id}', response_model=ProductoRead)
async def update_producto_endpoint(
    id: int,
    producto_in: ProductoUpdate,
    session: Session = Depends(get_session),
):
    try:
        return await update_producto(session, id, producto_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_producto_endpoint(
    id: int,
    session: Session = Depends(get_session),
):
    try:
        await delete_producto(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
