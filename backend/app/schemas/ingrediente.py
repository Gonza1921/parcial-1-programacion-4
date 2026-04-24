from pydantic import BaseModel, Field


class IngredienteCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)


class IngredienteUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)


class IngredienteRead(BaseModel):
    id: int
    nombre: str
