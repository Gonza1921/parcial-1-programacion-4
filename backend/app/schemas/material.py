from pydantic import BaseModel, Field


class MaterialCreate(BaseModel):
    nombre: str = Field(min_length=3, max_length=100)


class MaterialUpdate(BaseModel):
    nombre: str | None = Field(default=None, min_length=3, max_length=100)


class MaterialRead(BaseModel):
    id: int
    nombre: str
