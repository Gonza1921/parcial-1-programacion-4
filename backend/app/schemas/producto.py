from pydantic import BaseModel, Field
from typing import Any
from app.schemas.ingrediente import IngredienteRead


class ProductoCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)
    precio: float = Field(gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    stock: int = Field(default=0, ge=0)
    disponibilidad: bool = Field(default=True)
    categoria_id: int
    ingredientes_ids: list[int] | None = Field(default=None)


class ProductoUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)
    precio: float | None = Field(default=None, gt=0)
    descripcion: str | None = Field(default=None, max_length=500)
    stock: int | None = Field(default=None, ge=0)
    disponibilidad: bool | None = Field(default=None)
    categoria_id: int | None = Field(default=None)
    ingredientes_ids: list[int] | None = Field(default=None)


class ProductoRead(BaseModel):
    id: int
    nombre: str
    precio: float
    descripcion: str | None
    stock: int
    disponibilidad: bool
    categoria_id: int
    categoria: dict[str, Any]  # Use dict instead of CategoriaRead to avoid recursion issues
    ingredientes: list[IngredienteRead]
