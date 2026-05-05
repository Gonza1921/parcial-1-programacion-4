from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from app.models.associations import ProductoIngrediente

if TYPE_CHECKING:
    from app.models.categoria import Categoria
    from app.models.ingrediente import Ingrediente


class Producto(SQLModel, table=True):
    __tablename__ = "producto"
    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, min_length=3, max_length=100)
    precio: float = Field(gt=0)
    descripcion: Optional[str] = Field(default=None, max_length=500)
    talle: int = Field(ge=1, le=5)
    color: Optional[str] = Field(default=None, max_length=50)
    categoria_id: int = Field(foreign_key="categorias.id")
    categoria: Optional["Categoria"] = Relationship(back_populates="productos")
    ingredientes: List["Ingrediente"] = Relationship(
        back_populates="productos",
        link_model=ProductoIngrediente
    )