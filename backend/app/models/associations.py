from sqlmodel import SQLModel, Field


class ProductoIngrediente(SQLModel, table=True):
    __tablename__ = "producto_ingrediente"
    producto_id: int = Field(foreign_key="producto.id", primary_key=True)
    ingrediente_id: int = Field(foreign_key="ingredientes.id", primary_key=True)
    cantidad: float = 0.0


# Keep backward compatibility for now
ProductoMaterial = ProductoIngrediente