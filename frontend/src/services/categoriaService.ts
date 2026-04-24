import { apiClient } from './api'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types'

export const categoriaService = {
  getAll: async (skip = 0, limit = 10): Promise<Categoria[]> => {
    return apiClient<Categoria[]>('/categorias', {
      params: { skip, limit },
    })
  },

  getById: async (id: number): Promise<Categoria> => {
    return apiClient<Categoria>(`/categorias/${id}`)
  },

  create: async (payload: CreateCategoriaPayload): Promise<Categoria> => {
    return apiClient<Categoria>('/categorias', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  update: async (id: number, payload: UpdateCategoriaPayload): Promise<Categoria> => {
    return apiClient<Categoria>(`/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  delete: async (id: number): Promise<void> => {
    return apiClient<void>(`/categorias/${id}`, {
      method: 'DELETE',
    })
  },
}
