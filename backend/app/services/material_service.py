from sqlmodel import select, Session
from app.models.material import Material
from app.schemas.material import MaterialCreate, MaterialUpdate
from app.utils.exceptions import NotFoundException


async def get_all_materiales(session: Session, skip: int = 0, limit: int = 10):
    statement = select(Material).offset(skip).limit(limit)
    return session.exec(statement).all()


async def get_material_by_id(session: Session, material_id: int):
    material = session.get(Material, material_id)
    if not material:
        raise NotFoundException(f'Material con id {material_id} no existe')
    return material


async def create_material(session: Session, material_in: MaterialCreate):
    material = Material.from_orm(material_in)
    session.add(material)
    session.commit()
    session.refresh(material)
    return material


async def update_material(session: Session, material_id: int, material_in: MaterialUpdate):
    material = await get_material_by_id(session, material_id)
    material_data = material_in.dict(exclude_unset=True)
    for field, value in material_data.items():
        setattr(material, field, value)
    session.add(material)
    session.commit()
    session.refresh(material)
    return material


async def delete_material(session: Session, material_id: int):
    material = await get_material_by_id(session, material_id)
    session.delete(material)
    session.commit()
    return {'status': 'deleted'}
