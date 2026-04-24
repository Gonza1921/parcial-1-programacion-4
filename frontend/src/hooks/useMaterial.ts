import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { materialService } from '../services/materialService'
import type { Material, CreateMaterialPayload, UpdateMaterialPayload } from '../types'

const QUERY_KEY = ['materiales']

export const useMateriasQuery = () => {
  return useQuery<Material[]>({
    queryKey: QUERY_KEY,
    queryFn: () => materialService.getAll(),
  })
}

export const useMaterialByIdQuery = (id: number) => {
  return useQuery<Material>({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => materialService.getById(id),
  })
}

export const useMaterialCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateMaterialPayload) => materialService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useMaterialUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateMaterialPayload }) =>
      materialService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useMaterialDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => materialService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
