from sqlmodel import SQLModel, Field


class Ingrediente(SQLModel, table=True):
    __tablename__ = 'ingredientes'

    id: int | None = Field(default=None, primary_key=True)
    nombre: str = Field(index=True, unique=True, min_length=3, max_length=100)
