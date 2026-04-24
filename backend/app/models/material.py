from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from app.models.associations import ProductoMaterial

if TYPE_CHECKING:
    from app.models.producto import Producto


class Material(SQLModel, table=True):
    __tablename__ = "materiales"
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, min_length=3, max_length=100)
    productos: List["Producto"] = Relationship(
        back_populates="materiales",
        link_model=ProductoMaterial
    )