from sqlmodel import SQLModel, Field


class ProductoMaterial(SQLModel, table=True):
    __tablename__ = "producto_material"
    producto_id: int = Field(foreign_key="producto.id", primary_key=True)
    material_id: int = Field(foreign_key="materiales.id", primary_key=True)
    cantidad: float = 0.0