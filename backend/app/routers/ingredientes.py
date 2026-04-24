from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi import Query
from sqlmodel import Session

from app.database import get_session
from app.services.ingrediente_service import (
    get_all_ingredientes,
    get_ingrediente_by_id,
    create_ingrediente,
    update_ingrediente,
    delete_ingrediente,
)
from app.schemas.ingrediente import IngredienteCreate, IngredienteUpdate, IngredienteRead
from app.utils.exceptions import NotFoundException

router = APIRouter(prefix='/ingredientes', tags=['ingredientes'])


@router.get('', response_model=list[IngredienteRead])
async def list_ingredientes(
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(gt=0, le=100)] = 10,
    session: Session = Depends(get_session),
):
    return await get_all_ingredientes(session, skip, limit)


@router.get('/{id}', response_model=IngredienteRead)
async def get_ingrediente(id: int, session: Session = Depends(get_session)):
    try:
        return await get_ingrediente_by_id(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post('', response_model=IngredienteRead, status_code=status.HTTP_201_CREATED)
async def create_ingrediente_endpoint(
    ingrediente_in: IngredienteCreate,
    session: Session = Depends(get_session),
):
    try:
        return await create_ingrediente(session, ingrediente_in)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/{id}', response_model=IngredienteRead)
async def update_ingrediente_endpoint(
    id: int,
    ingrediente_in: IngredienteUpdate,
    session: Session = Depends(get_session),
):
    try:
        return await update_ingrediente(session, id, ingrediente_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_ingrediente_endpoint(
    id: int,
    session: Session = Depends(get_session),
):
    try:
        await delete_ingrediente(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
