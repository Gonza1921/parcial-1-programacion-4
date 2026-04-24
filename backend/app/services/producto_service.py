from sqlmodel import select, Session
from app.models.producto import Producto
from app.models.material import Material
from app.models.associations import ProductoMaterial
from app.schemas.producto import ProductoCreate, ProductoUpdate
from app.utils.exceptions import NotFoundException


async def get_all_productos(
    session: Session,
    skip: int = 0,
    limit: int = 10,
    categoria_id: int | None = None,
    material_id: int | None = None,
):
    statement = select(Producto)

    if categoria_id:
        statement = statement.where(Producto.categoria_id == categoria_id)

    if material_id:
        statement = statement.join(ProductoMaterial).where(
            ProductoMaterial.material_id == material_id
        )

    statement = statement.offset(skip).limit(limit)
    return session.exec(statement).all()


async def get_producto_by_id(session: Session, producto_id: int):
    producto = session.get(Producto, producto_id)
    if not producto:
        raise NotFoundException(f'Producto con id {producto_id} no existe')
    return producto


async def create_producto(
    session: Session,
    producto_in: ProductoCreate,
):
    # Validar que la categoría existe
    from app.models.categoria import Categoria
    categoria = session.get(Categoria, producto_in.categoria_id)
    if not categoria:
        raise NotFoundException(f'Categoría con id {producto_in.categoria_id} no existe')

    # Crear producto
    producto = Producto(
        nombre=producto_in.nombre,
        precio=producto_in.precio,
        descripcion=producto_in.descripcion,
        talle=producto_in.talle,
        color=producto_in.color,
        categoria_id=producto_in.categoria_id,
    )

    # Asignar materiales si vienen
    if producto_in.materiales_ids:
        materiales = session.exec(
            select(Material).where(Material.id.in_(producto_in.materiales_ids))
        ).all()
        producto.materiales = materiales

    session.add(producto)
    session.commit()
    session.refresh(producto)
    return producto


async def update_producto(
    session: Session,
    producto_id: int,
    producto_in: ProductoUpdate,
):
    producto = await get_producto_by_id(session, producto_id)

    # Validar categoría si se proporciona
    if producto_in.categoria_id:
        from app.models.categoria import Categoria
        categoria = session.get(Categoria, producto_in.categoria_id)
        if not categoria:
            raise NotFoundException(f'Categoría con id {producto_in.categoria_id} no existe')

    # Actualizar campos
    producto_data = producto_in.dict(exclude_unset=True, exclude={'materiales_ids'})
    for field, value in producto_data.items():
        setattr(producto, field, value)

    # Actualizar materiales si se proporcionan
    if producto_in.materiales_ids is not None:
        materiales = session.exec(
            select(Material).where(Material.id.in_(producto_in.materiales_ids))
        ).all()
        producto.materiales = materiales

    session.add(producto)
    session.commit()
    session.refresh(producto)
    return producto


async def delete_producto(session: Session, producto_id: int):
    producto = await get_producto_by_id(session, producto_id)
    session.delete(producto)
    session.commit()
    return {'status': 'deleted'}
