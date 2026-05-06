from sqlmodel import select
from app.uow.unit_of_work import UnitOfWork
from app.repositories.producto_repository import ProductoRepository
from app.models.producto import Producto
from app.models.ingrediente import Ingrediente
from app.models.categoria import Categoria
from app.models.associations import ProductoIngrediente
from app.schemas.producto import ProductoCreate, ProductoUpdate
from app.utils.exceptions import NotFoundException


def get_all_productos(
    skip: int = 0,
    limit: int = 10,
    categoria_id: int | None = None,
    ingrediente_id: int | None = None,
):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        statement = select(Producto)

        if categoria_id:
            statement = statement.where(Producto.categoria_id == categoria_id)

        if ingrediente_id:
            statement = statement.join(ProductoIngrediente).where(
                ProductoIngrediente.ingrediente_id == ingrediente_id
            )

        statement = statement.offset(skip).limit(limit)
        results = uow.session.exec(statement).all()
        return [item.model_dump() for item in results]


def get_producto_by_id(producto_id: int):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        producto = repo.get_by_id(producto_id)
        if not producto:
            raise NotFoundException(f'Producto con id {producto_id} no existe')
        return producto.model_dump()


def create_producto(producto_in: ProductoCreate):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        
        # Validar que la categoría existe
        categoria = uow.session.get(Categoria, producto_in.categoria_id)
        if not categoria:
            raise NotFoundException(f'Categoría con id {producto_in.categoria_id} no existe')

        # Crear producto
        producto = Producto(
            nombre=producto_in.nombre,
            precio=producto_in.precio,
            descripcion=producto_in.descripcion,
            stock=producto_in.stock,
            disponibilidad=producto_in.disponibilidad,
            categoria_id=producto_in.categoria_id,
        )

        # Asignar ingredientes si vienen
        if producto_in.ingredientes_ids:
            ingredientes = uow.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto_in.ingredientes_ids))
            ).all()
            producto.ingredientes = ingredientes

        created = repo.create(producto)
        return created.model_dump()


def update_producto(
    producto_id: int,
    producto_in: ProductoUpdate,
):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        producto = repo.get_by_id(producto_id)
        
        if not producto:
            raise NotFoundException(f'Producto con id {producto_id} no existe')

        # Validar categoría si se proporciona
        if producto_in.categoria_id:
            categoria = uow.session.get(Categoria, producto_in.categoria_id)
            if not categoria:
                raise NotFoundException(f'Categoría con id {producto_in.categoria_id} no existe')

        # Actualizar campos
        producto_data = producto_in.dict(exclude_unset=True, exclude={'ingredientes_ids'})
        for field, value in producto_data.items():
            setattr(producto, field, value)

        # Actualizar ingredientes si se proporcionan
        if producto_in.ingredientes_ids is not None:
            ingredientes = uow.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto_in.ingredientes_ids))
            ).all()
            producto.ingredientes = ingredientes

        repo.session.add(producto)
        return producto.model_dump()


def delete_producto(producto_id: int):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        producto = repo.get_by_id(producto_id)
        
        if not producto:
            raise NotFoundException(f'Producto con id {producto_id} no existe')
        
        repo.delete(producto)
        return {'status': 'deleted'}

