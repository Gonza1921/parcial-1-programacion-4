from sqlmodel import select
from app.uow.unit_of_work import UnitOfWork
from app.repositories.producto_repository import ProductoRepository
from app.models.producto import Producto
from app.models.ingrediente import Ingrediente
from app.models.categoria import Categoria
from app.models.associations import ProductoIngrediente
from app.schemas.producto import ProductoCreate, ProductoUpdate
from app.utils.exceptions import NotFoundException


def _serialize_producto(producto: Producto) -> dict:
    """Serializa un producto con sus relaciones dentro del contexto de la sesión."""
    # Serializar categoría
    categoria_data = None
    if producto.categoria:
        categoria_data = {
            "id": producto.categoria.id,
            "nombre": producto.categoria.nombre,
            "descripcion": producto.categoria.descripcion,
            "parent_id": producto.categoria.parent_id,
            "subcategorias": []
        }
    
    # Serializar ingredientes
    ingredientes_data = [
        {"id": ing.id, "nombre": ing.nombre}
        for ing in producto.ingredientes
    ]
    
    return {
        "id": producto.id,
        "nombre": producto.nombre,
        "precio": producto.precio,
        "descripcion": producto.descripcion,
        "stock": producto.stock,
        "disponibilidad": producto.disponibilidad,
        "categoria_id": producto.categoria_id,
        "categoria": categoria_data,
        "ingredientes": ingredientes_data
    }


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
        # Serializar dentro del contexto del UoW para acceder a las relaciones
        return [_serialize_producto(item) for item in results]


def get_producto_by_id(producto_id: int):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        producto = repo.get_by_id(producto_id)
        if not producto:
            raise NotFoundException(f'Producto con id {producto_id} no existe')
        # Serializar dentro del contexto del UoW para acceder a las relaciones
        return _serialize_producto(producto)


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
        # Serializar dentro del contexto del UoW para acceder a las relaciones
        return _serialize_producto(created)


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
        # Serializar dentro del contexto del UoW para acceder a las relaciones
        return _serialize_producto(producto)


def delete_producto(producto_id: int):
    with UnitOfWork() as uow:
        repo = ProductoRepository(uow.session)
        producto = repo.get_by_id(producto_id)
        
        if not producto:
            raise NotFoundException(f'Producto con id {producto_id} no existe')
        
        repo.delete(producto)
        return {'status': 'deleted'}

