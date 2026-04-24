from sqlmodel import select, Session
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaCreate, CategoriaUpdate
from app.utils.exceptions import NotFoundException


async def get_all_categorias(session: Session, skip: int = 0, limit: int = 10):
    statement = select(Categoria).offset(skip).limit(limit)
    return session.exec(statement).all()


async def get_categoria_by_id(session: Session, categoria_id: int):
    categoria = session.get(Categoria, categoria_id)
    if not categoria:
        raise NotFoundException(f'Categoría con id {categoria_id} no existe')
    return categoria


async def create_categoria(session: Session, categoria_in: CategoriaCreate):
    categoria = Categoria.from_orm(categoria_in)
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return categoria


async def update_categoria(session: Session, categoria_id: int, categoria_in: CategoriaUpdate):
    categoria = await get_categoria_by_id(session, categoria_id)
    categoria_data = categoria_in.dict(exclude_unset=True)
    for field, value in categoria_data.items():
        setattr(categoria, field, value)
    session.add(categoria)
    session.commit()
    session.refresh(categoria)
    return categoria


async def delete_categoria(session: Session, categoria_id: int):
    categoria = await get_categoria_by_id(session, categoria_id)
    session.delete(categoria)
    session.commit()
    return {'status': 'deleted'}
