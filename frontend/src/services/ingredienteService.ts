import { apiClient } from './api'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../types'

export const ingredienteService = {
  getAll: async (skip = 0, limit = 10): Promise<Ingrediente[]> => {
    return apiClient<Ingrediente[]>('/ingredientes', {
      params: { skip, limit },
    })
  },

  getById: async (id: number): Promise<Ingrediente> => {
    return apiClient<Ingrediente>(`/ingredientes/${id}`)
  },

  create: async (payload: CreateIngredientePayload): Promise<Ingrediente> => {
    return apiClient<Ingrediente>('/ingredientes', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  update: async (id: number, payload: UpdateIngredientePayload): Promise<Ingrediente> => {
    return apiClient<Ingrediente>(`/ingredientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  delete: async (id: number): Promise<void> => {
    return apiClient<void>(`/ingredientes/${id}`, {
      method: 'DELETE',
    })
  },
}
