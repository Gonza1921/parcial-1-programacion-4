from app.uow.unit_of_work import UnitOfWork
from app.repositories.categoria_repository import CategoriaRepository
from app.models.categoria import Categoria
from app.schemas.categoria import CategoriaCreate, CategoriaUpdate
from app.utils.exceptions import NotFoundException


def get_all_categorias(skip: int = 0, limit: int = 10):
    with UnitOfWork() as uow:
        repo = CategoriaRepository(uow.session)
        results = repo.get_all(skip, limit)
        return [item.model_dump() for item in results]


def get_categoria_by_id(categoria_id: int):
    with UnitOfWork() as uow:
        repo = CategoriaRepository(uow.session)
        categoria = repo.get_by_id(categoria_id)
        if not categoria:
            raise NotFoundException(f'Categoría con id {categoria_id} no existe')
        return categoria.model_dump()


def create_categoria(categoria_in: CategoriaCreate):
    with UnitOfWork() as uow:
        repo = CategoriaRepository(uow.session)
        categoria = Categoria.from_orm(categoria_in)
        created = repo.create(categoria)
        return created.model_dump()


def update_categoria(categoria_id: int, categoria_in: CategoriaUpdate):
    with UnitOfWork() as uow:
        repo = CategoriaRepository(uow.session)
        categoria = repo.get_by_id(categoria_id)
        if not categoria:
            raise NotFoundException(f'Categoría con id {categoria_id} no existe')
        
        categoria_data = categoria_in.dict(exclude_unset=True)
        for field, value in categoria_data.items():
            setattr(categoria, field, value)
        
        repo.session.add(categoria)
        return categoria.model_dump()


def delete_categoria(categoria_id: int):
    with UnitOfWork() as uow:
        repo = CategoriaRepository(uow.session)
        categoria = repo.get_by_id(categoria_id)
        if not categoria:
            raise NotFoundException(f'Categoría con id {categoria_id} no existe')
        repo.delete(categoria)
        return {'status': 'deleted'}

