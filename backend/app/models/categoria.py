from sqlmodel import SQLModel, Field, Relationship


class Categoria(SQLModel, table=True):
    __tablename__ = 'categorias'

    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, min_length=3, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)

    productos: list['Producto'] = Relationship(back_populates='categoria')


# Import here to avoid circular dependency at module load time
from app.models.producto import Producto
