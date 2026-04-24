import { apiClient } from './api'
import type { Producto, CreateProductoPayload, UpdateProductoPayload } from '../types'

export const productoService = {
  getAll: async (
    skip = 0,
    limit = 10,
    categoria_id?: number,
    material_id?: number,
  ): Promise<Producto[]> => {
    return apiClient<Producto[]>('/productos', {
      params: { skip, limit, categoria_id, material_id },
    })
  },

  getById: async (id: number): Promise<Producto> => {
    return apiClient<Producto>(`/productos/${id}`)
  },

  create: async (payload: CreateProductoPayload): Promise<Producto> => {
    return apiClient<Producto>('/productos', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  update: async (id: number, payload: UpdateProductoPayload): Promise<Producto> => {
    return apiClient<Producto>(`/productos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  delete: async (id: number): Promise<void> => {
    return apiClient<void>(`/productos/${id}`, {
      method: 'DELETE',
    })
  },
}

