from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi import Query
from sqlmodel import Session

from app.database import get_session
from app.services.categoria_service import (
    get_all_categorias,
    get_categoria_by_id,
    create_categoria,
    update_categoria,
    delete_categoria,
)
from app.schemas.categoria import CategoriaCreate, CategoriaUpdate, CategoriaRead
from app.utils.exceptions import NotFoundException

router = APIRouter(prefix='/categorias', tags=['categorias'])


@router.get('', response_model=list[CategoriaRead])
async def list_categorias(
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(gt=0, le=100)] = 10,
    session: Session = Depends(get_session),
):
    return await get_all_categorias(session, skip, limit)


@router.get('/{id}', response_model=CategoriaRead)
async def get_categoria(id: int, session: Session = Depends(get_session)):
    try:
        return await get_categoria_by_id(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post('', response_model=CategoriaRead, status_code=status.HTTP_201_CREATED)
async def create_categoria_endpoint(
    categoria_in: CategoriaCreate,
    session: Session = Depends(get_session),
):
    try:
        return await create_categoria(session, categoria_in)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/{id}', response_model=CategoriaRead)
async def update_categoria_endpoint(
    id: int,
    categoria_in: CategoriaUpdate,
    session: Session = Depends(get_session),
):
    try:
        return await update_categoria(session, id, categoria_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_categoria_endpoint(
    id: int,
    session: Session = Depends(get_session),
):
    try:
        await delete_categoria(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
