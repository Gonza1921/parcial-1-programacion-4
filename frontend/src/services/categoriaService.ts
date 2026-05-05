import { apiClient } from './api'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types'

export class CategoriaService {
  async getAll(skip = 0, limit = 10): Promise<Categoria[]> {
    return apiClient<Categoria[]>('/categorias', {
      params: { skip, limit },
    })
  }

  async getById(id: number): Promise<Categoria> {
    return apiClient<Categoria>(`/categorias/${id}`)
  }

  async create(payload: CreateCategoriaPayload): Promise<Categoria> {
    return apiClient<Categoria>('/categorias', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async update(id: number, payload: UpdateCategoriaPayload): Promise<Categoria> {
    return apiClient<Categoria>(`/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  async delete(id: number): Promise<void> {
    return apiClient<void>(`/categorias/${id}`, {
      method: 'DELETE',
    })
  }
}

export const categoriaService = new CategoriaService()
