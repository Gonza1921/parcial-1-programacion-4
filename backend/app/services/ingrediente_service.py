from sqlmodel import select, Session
from app.models.ingrediente import Ingrediente
from app.schemas.ingrediente import IngredienteCreate, IngredienteUpdate
from app.utils.exceptions import NotFoundException


async def get_all_ingredientes(session: Session, skip: int = 0, limit: int = 10):
    statement = select(Ingrediente).offset(skip).limit(limit)
    return session.exec(statement).all()


async def get_ingrediente_by_id(session: Session, ingrediente_id: int):
    ingrediente = session.get(Ingrediente, ingrediente_id)
    if not ingrediente:
        raise NotFoundException(f'Ingrediente con id {ingrediente_id} no existe')
    return ingrediente


async def create_ingrediente(session: Session, ingrediente_in: IngredienteCreate):
    ingrediente = Ingrediente.from_orm(ingrediente_in)
    session.add(ingrediente)
    session.commit()
    session.refresh(ingrediente)
    return ingrediente


async def update_ingrediente(session: Session, ingrediente_id: int, ingrediente_in: IngredienteUpdate):
    ingrediente = await get_ingrediente_by_id(session, ingrediente_id)
    ingrediente_data = ingrediente_in.dict(exclude_unset=True)
    for field, value in ingrediente_data.items():
        setattr(ingrediente, field, value)
    session.add(ingrediente)
    session.commit()
    session.refresh(ingrediente)
    return ingrediente


async def delete_ingrediente(session: Session, ingrediente_id: int):
    ingrediente = await get_ingrediente_by_id(session, ingrediente_id)
    session.delete(ingrediente)
    session.commit()
    return {'status': 'deleted'}
