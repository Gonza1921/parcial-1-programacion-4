from typing import Optional
from sqlmodel import Session, select
from app.models.ingrediente import Ingrediente
from app.repositories.base_repository import BaseRepository


class IngredienteRepository(BaseRepository[Ingrediente]):
    def __init__(self, session: Session):
        super().__init__(Ingrediente, session)

    def get_by_nombre(self, nombre: str) -> Optional[Ingrediente]:
        return self.session.exec(
            select(self.model).where(self.model.nombre == nombre)
        ).first()

    def get_by_description(self, descripcion: str) -> list[Ingrediente]:
        """Search ingredientes by description"""
        return self.session.exec(
            select(self.model).where(self.model.descripcion.ilike(f"%{descripcion}%"))
        ).all()
