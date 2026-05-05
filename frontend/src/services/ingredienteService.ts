import { apiClient } from './api'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../types'

export class IngredienteService {
  async getAll(skip = 0, limit = 10): Promise<Ingrediente[]> {
    return apiClient<Ingrediente[]>('/ingredientes', {
      params: { skip, limit },
    })
  }

  async getById(id: number): Promise<Ingrediente> {
    return apiClient<Ingrediente>(`/ingredientes/${id}`)
  }

  async create(payload: CreateIngredientePayload): Promise<Ingrediente> {
    return apiClient<Ingrediente>('/ingredientes', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  }

  async update(id: number, payload: UpdateIngredientePayload): Promise<Ingrediente> {
    return apiClient<Ingrediente>(`/ingredientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  }

  async delete(id: number): Promise<void> {
    return apiClient<void>(`/ingredientes/${id}`, {
      method: 'DELETE',
    })
  }
}

export const ingredienteService = new IngredienteService()
