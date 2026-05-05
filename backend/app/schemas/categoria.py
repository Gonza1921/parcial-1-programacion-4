from pydantic import BaseModel, Field


class CategoriaCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)
    parent_id: int | None = Field(default=None)


class CategoriaUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)
    descripcion: str | None = Field(default=None, max_length=500)
    parent_id: int | None = Field(default=None)


class CategoriaRead(BaseModel):
    id: int
    nombre: str
    descripcion: str | None
    parent_id: int | None = None
    subcategorias: list['CategoriaRead'] = Field(default_factory=list)

