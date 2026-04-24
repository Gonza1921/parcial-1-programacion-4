export interface Categoria {
  id: number
  nombre: string
  descripcion: string | null
}

export interface Material {
  id: number
  nombre: string
}

export interface Producto {
  id: number
  nombre: string
  precio: number
  descripcion: string | null
  talle: number
  color: string
  categoria_id: number
  categoria: Categoria
  materiales: Material[]
}

export interface CreateCategoriaPayload {
  nombre: string
  descripcion?: string
}

export interface UpdateCategoriaPayload {
  nombre?: string
  descripcion?: string
}

export interface CreateMaterialPayload {
  nombre: string
}

export interface UpdateMaterialPayload {
  nombre?: string
}

export interface CreateProductoPayload {
  nombre: string
  precio: number
  descripcion?: string
  talle: number
  color: string
  categoria_id: number
  materiales_ids?: number[]
}

export interface UpdateProductoPayload {
  nombre?: string
  precio?: number
  descripcion?: string
  talle?: number
  color?: string
  categoria_id?: number
  materiales_ids?: number[]
}

