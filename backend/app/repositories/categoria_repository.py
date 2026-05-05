from typing import Optional
from sqlmodel import Session, select
from app.models.categoria import Categoria
from app.repositories.base_repository import BaseRepository


class CategoriaRepository(BaseRepository[Categoria]):
    def __init__(self, session: Session):
        super().__init__(Categoria, session)

    def get_by_nombre(self, nombre: str) -> Optional[Categoria]:
        return self.session.exec(
            select(self.model).where(self.model.nombre == nombre)
        ).first()

    def get_parent_categorias(self) -> list[Categoria]:
        """Get all categories that don't have a parent (root categories)"""
        return self.session.exec(
            select(self.model).where(self.model.parent_id.is_(None))
        ).all()
