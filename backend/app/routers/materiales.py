from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
from fastapi import Query
from sqlmodel import Session

from app.database import get_session
from app.services.material_service import (
    get_all_materiales,
    get_material_by_id,
    create_material,
    update_material,
    delete_material,
)
from app.schemas.material import MaterialCreate, MaterialUpdate, MaterialRead
from app.utils.exceptions import NotFoundException

router = APIRouter(prefix='/materiales', tags=['materiales'])


@router.get('', response_model=list[MaterialRead])
async def list_materiales(
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(gt=0, le=100)] = 10,
    session: Session = Depends(get_session),
):
    return await get_all_materiales(session, skip, limit)


@router.get('/{id}', response_model=MaterialRead)
async def get_material(id: int, session: Session = Depends(get_session)):
    try:
        return await get_material_by_id(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post('', response_model=MaterialRead, status_code=status.HTTP_201_CREATED)
async def create_material_endpoint(
    material_in: MaterialCreate,
    session: Session = Depends(get_session),
):
    try:
        return await create_material(session, material_in)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/{id}', response_model=MaterialRead)
async def update_material_endpoint(
    id: int,
    material_in: MaterialUpdate,
    session: Session = Depends(get_session),
):
    try:
        return await update_material(session, id, material_in)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_material_endpoint(
    id: int,
    session: Session = Depends(get_session),
):
    try:
        await delete_material(session, id)
    except NotFoundException as e:
        raise HTTPException(status_code=404, detail=str(e))
