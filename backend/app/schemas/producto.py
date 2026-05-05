from pydantic import BaseModel, Field
from app.schemas.categoria import CategoriaRead
from app.schemas.ingrediente import IngredienteRead


class ProductoCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)
    precio: float = Field(gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    talle: int = Field(ge=1, le=5)
    color: str = Field(min_length=2, max_length=50)
    categoria_id: int
    ingredientes_ids: list[int] | None = Field(default=None)


class ProductoUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)
    precio: float | None = Field(default=None, gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    talle: int | None = Field(default=None, ge=1, le=5)
    color: str | None = Field(default=None, min_length=2, max_length=50)
    categoria_id: int | None = Field(default=None)
    ingredientes_ids: list[int] | None = Field(default=None)


class ProductoRead(BaseModel):
    id: int
    nombre: str
    precio: float
    descripcion: str | None
    talle: int
    color: str
    categoria_id: int
    categoria: CategoriaRead
    ingredientes: list[IngredienteRead]
