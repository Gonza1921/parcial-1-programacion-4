import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ingredienteService } from '../services/ingredienteService'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../types'

const QUERY_KEY = ['ingredientes']

export const useIngredientesQuery = () => {
  return useQuery<Ingrediente[]>({
    queryKey: QUERY_KEY,
    queryFn: () => ingredienteService.getAll(),
  })
}

export const useIngredienteByIdQuery = (id: number) => {
  return useQuery<Ingrediente>({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => ingredienteService.getById(id),
  })
}

export const useIngredienteCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateIngredientePayload) => ingredienteService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useIngredienteUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateIngredientePayload }) =>
      ingredienteService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useIngredienteDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => ingredienteService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
