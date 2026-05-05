from typing import Optional
from sqlmodel import Session, select
from app.models.producto import Producto
from app.repositories.base_repository import BaseRepository


class ProductoRepository(BaseRepository[Producto]):
    def __init__(self, session: Session):
        super().__init__(Producto, session)

    def get_by_nombre(self, nombre: str) -> Optional[Producto]:
        return self.session.exec(
            select(self.model).where(self.model.nombre == nombre)
        ).first()

    def get_by_categoria_id(self, categoria_id: int) -> list[Producto]:
        """Get all products for a category"""
        return self.session.exec(
            select(self.model).where(self.model.categoria_id == categoria_id)
        ).all()

    def get_by_color(self, color: str) -> list[Producto]:
        """Get all products by color"""
        return self.session.exec(
            select(self.model).where(self.model.color == color)
        ).all()

    def get_by_price_range(self, min_price: float, max_price: float) -> list[Producto]:
        """Get products within a price range"""
        return self.session.exec(
            select(self.model).where(
                (self.model.precio >= min_price) & (self.model.precio <= max_price)
            )
        ).all()
