import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoriaService } from '../services/categoriaService'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types'

const QUERY_KEY = ['categorias']

export const useCategoriasQuery = () => {
  return useQuery<Categoria[]>({
    queryKey: QUERY_KEY,
    queryFn: () => categoriaService.getAll(),
  })
}

export const useCategoriaByIdQuery = (id: number) => {
  return useQuery<Categoria>({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => categoriaService.getById(id),
  })
}

export const useCategoriaCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateCategoriaPayload) => categoriaService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useCategoriaUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCategoriaPayload }) =>
      categoriaService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useCategoriaDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => categoriaService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
