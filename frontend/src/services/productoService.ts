import { apiClient } from './api'
import type { Producto, CreateProductoPayload, UpdateProductoPayload } from '../types'

export class ProductoService {
  async getAll(
    skip = 0,
    limit = 10,
    categoria_id?: number,
    ingrediente_id?: number,
  ): Promise<Producto[]> {
    return apiClient<Producto[]>('/productos', {
      params: { skip, limit, categoria_id, ingrediente_id },
    })
  }

  async getById(id: number): Promise<Producto> {
    return apiClient<Producto>(`/productos/${id}`)
  }

  async create(payload: CreateProductoPayload): Promise<Producto> {
    return apiClient<Producto>('/productos', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async update(id: number, payload: UpdateProductoPayload): Promise<Producto> {
    return apiClient<Producto>(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  async delete(id: number): Promise<void> {
    return apiClient<void>(`/productos/${id}`, {
      method: 'DELETE',
    })
  }
}

export const productoService = new ProductoService()

