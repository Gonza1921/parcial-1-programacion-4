import { apiClient } from './api'
import type { Material, CreateMaterialPayload, UpdateMaterialPayload } from '../types'

export const materialService = {
  getAll: async (skip = 0, limit = 10): Promise<Material[]> => {
    return apiClient<Material[]>('/materiales', {
      params: { skip, limit },
    })
  },

  getById: async (id: number): Promise<Material> => {
    return apiClient<Material>(`/materiales/${id}`)
  },

  create: async (payload: CreateMaterialPayload): Promise<Material> => {
    return apiClient<Material>('/materiales', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  update: async (id: number, payload: UpdateMaterialPayload): Promise<Material> => {
    return apiClient<Material>(`/materiales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  delete: async (id: number): Promise<void> => {
    return apiClient<void>(`/materiales/${id}`, {
      method: 'DELETE',
    })
  },
}
