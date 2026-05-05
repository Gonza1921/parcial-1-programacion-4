from typing import Optional
from sqlmodel import SQLModel, Field, Relationship


class Categoria(SQLModel, table=True):
    __tablename__ = 'categorias'

    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, min_length=3, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)
    parent_id: Optional[int] = Field(default=None, foreign_key="categorias.id")

    productos: list['Producto'] = Relationship(back_populates='categoria')
    subcategorias: list['Categoria'] = Relationship(
        back_populates='parent',
        sa_relationship_kwargs={'remote_side': 'Categoria.id'}
    )
    parent: Optional['Categoria'] = Relationship(back_populates='subcategorias')


# Import here to avoid circular dependency at module load time
from app.models.producto import Producto
