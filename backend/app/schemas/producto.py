from pydantic import BaseModel, Field
from app.schemas.categoria import CategoriaRead
from app.schemas.material import MaterialRead


class ProductoCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)
    precio: float = Field(gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    talle: int = Field(ge=1, le=5)
    color: str = Field(min_length=2, max_length=50)
    categoria_id: int
    materiales_ids: list[int] | None = Field(default=None)


class ProductoUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)
    precio: float | None = Field(default=None, gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    talle: int | None = Field(default=None, ge=1, le=5)
    color: str | None = Field(default=None, min_length=2, max_length=50)
    categoria_id: int | None = Field(default=None)
    materiales_ids: list[int] | None = Field(default=None)


class ProductoRead(BaseModel):
    id: int
    nombre: str
    precio: float
    descripcion: str | None
    talle: int
    color: str
    categoria_id: int
    categoria: CategoriaRead
    materiales: list[MaterialRead]
