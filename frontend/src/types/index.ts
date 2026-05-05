export interface Categoria {
  id: number
  nombre: string
  descripcion: string | null
  parent_id?: number | null
  subcategorias?: Categoria[]
  parent?: Categoria | null
}

export interface Ingrediente {
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
  ingredientes: Ingrediente[]
}

export interface CreateCategoriaPayload {
  nombre: string
  descripcion?: string
  parent_id?: number | null
}

export interface UpdateCategoriaPayload {
  nombre?: string
  descripcion?: string
  parent_id?: number | null
}

export interface CreateIngredientePayload {
  nombre: string
}

export interface UpdateIngredientePayload {
  nombre?: string
}

export interface CreateProductoPayload {
  nombre: string
  precio: number
  descripcion?: string
  talle: number
  color: string
  categoria_id: number
  ingredientes_ids?: number[]
}

export interface UpdateProductoPayload {
  nombre?: string
  precio?: number
  descripcion?: string
  talle?: number
  color?: string
  categoria_id?: number
  ingredientes_ids?: number[]
}


