import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productoService } from '../services/productoService'
import type { Producto, CreateProductoPayload, UpdateProductoPayload } from '../types'

const QUERY_KEY = ['productos']

export const useProductosQuery = (categoria_id?: number, material_id?: number) => {
  return useQuery<Producto[]>({
    queryKey: [QUERY_KEY, categoria_id, material_id],
    queryFn: () => productoService.getAll(0, 100, categoria_id, material_id),
  })
}

export const useProductoByIdQuery = (id: number) => {
  return useQuery<Producto>({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => productoService.getById(id),
  })
}

export const useProductoCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProductoPayload) => productoService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useProductoUpdate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateProductoPayload }) =>
      productoService.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}

export const useProductoDelete = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => productoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })
}
