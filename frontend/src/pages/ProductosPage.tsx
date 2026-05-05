import React, { useState } from 'react'
import { Button, Alert, LoadingSpinner } from '../components/common'
import { ProductoModal, ProductoTable } from '../components/producto'
import {
  useProductosQuery,
  useProductoCreate,
  useProductoUpdate,
  useProductoDelete,
} from '../hooks/useProducto'
import { useCategoriasQuery } from '../hooks/useCategoria'
import { useIngredientesQuery } from '../hooks/useIngrediente'
import type { Producto, CreateProductoPayload, UpdateProductoPayload } from '../types'

export const ProductosPage: React.FC = () => {
  const { data: productos = [], isLoading, error } = useProductosQuery()
  const { data: categorias = [] } = useCategoriasQuery()
  const { data: ingredientes = [] } = useIngredientesQuery()
  const createMutation = useProductoCreate()
  const updateMutation = useProductoUpdate()
  const deleteMutation = useProductoDelete()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProducto, setEditingProducto] = useState<Producto | undefined>()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreate = (data: CreateProductoPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Producto creado exitosamente')
        setIsModalOpen(false)
        setTimeout(() => setSuccessMessage(''), 3000)
      },
    })
  }

  const handleUpdate = (data: UpdateProductoPayload) => {
    if (editingProducto) {
      updateMutation.mutate(
        { id: editingProducto.id, payload: data },
        {
          onSuccess: () => {
            setSuccessMessage('Producto actualizado exitosamente')
            setIsModalOpen(false)
            setEditingProducto(undefined)
            setTimeout(() => setSuccessMessage(''), 3000)
          },
        },
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setSuccessMessage('Producto eliminado exitosamente')
          setTimeout(() => setSuccessMessage(''), 3000)
        },
      })
    }
  }

  const handleOpenModal = (producto?: Producto) => {
    setEditingProducto(producto)
    setIsModalOpen(true)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Productos</h1>
          <p className='text-sm text-gray-500 mt-1'>Gestiona tu catálogo de productos</p>
        </div>
        <Button onClick={() => handleOpenModal()}>+ Nuevo producto</Button>
      </div>

      {successMessage && <Alert type='success' message={successMessage} />}

      {error && <Alert type='error' message={String(error)} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductoTable
          productos={productos}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      <ProductoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProducto(undefined)
        }}
        producto={editingProducto}
        categorias={categorias}
        ingredientes={ingredientes}
        onSubmit={(editingProducto ? handleUpdate : handleCreate) as (data: CreateProductoPayload | UpdateProductoPayload) => void}
        isLoading={createMutation.isPending || updateMutation.isPending}
        error={createMutation.isError || updateMutation.isError ? 'Error en la operación' : ''}
      />
    </div>
  )
}
