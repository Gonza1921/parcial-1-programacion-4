from app.uow.unit_of_work import UnitOfWork
from app.repositories.ingrediente_repository import IngredienteRepository
from app.models.ingrediente import Ingrediente
from app.schemas.ingrediente import IngredienteCreate, IngredienteUpdate
from app.utils.exceptions import NotFoundException


def get_all_ingredientes(skip: int = 0, limit: int = 10):
    with UnitOfWork() as uow:
        repo = IngredienteRepository(uow.session)
        return repo.get_all(skip, limit)


def get_ingrediente_by_id(ingrediente_id: int):
    with UnitOfWork() as uow:
        repo = IngredienteRepository(uow.session)
        ingrediente = repo.get_by_id(ingrediente_id)
        if not ingrediente:
            raise NotFoundException(f'Ingrediente con id {ingrediente_id} no existe')
        return ingrediente


def create_ingrediente(ingrediente_in: IngredienteCreate):
    with UnitOfWork() as uow:
        repo = IngredienteRepository(uow.session)
        ingrediente = Ingrediente.from_orm(ingrediente_in)
        return repo.create(ingrediente)


def update_ingrediente(ingrediente_id: int, ingrediente_in: IngredienteUpdate):
    with UnitOfWork() as uow:
        repo = IngredienteRepository(uow.session)
        ingrediente = repo.get_by_id(ingrediente_id)
        if not ingrediente:
            raise NotFoundException(f'Ingrediente con id {ingrediente_id} no existe')
        
        ingrediente_data = ingrediente_in.dict(exclude_unset=True)
        for field, value in ingrediente_data.items():
            setattr(ingrediente, field, value)
        
        repo.session.add(ingrediente)
        return ingrediente


def delete_ingrediente(ingrediente_id: int):
    with UnitOfWork() as uow:
        repo = IngredienteRepository(uow.session)
        ingrediente = repo.get_by_id(ingrediente_id)
        if not ingrediente:
            raise NotFoundException(f'Ingrediente con id {ingrediente_id} no existe')
        repo.delete(ingrediente)
        return {'status': 'deleted'}

