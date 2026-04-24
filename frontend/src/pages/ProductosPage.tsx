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
import { useMateriasQuery } from '../hooks/useMaterial'
import type { Producto, CreateProductoPayload, UpdateProductoPayload } from '../types'

export const ProductosPage: React.FC = () => {
  const { data: productos = [], isLoading, error } = useProductosQuery()
  const { data: categorias = [] } = useCategoriasQuery()
  const { data: materiales = [] } = useMateriasQuery()
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
        <h1 className='text-3xl font-bold uppercase'>PRODUCTOS</h1>
        <Button onClick={() => handleOpenModal()}>+ NUEVO PRODUCTO</Button>
      </div>

      {successMessage && <Alert type='success' message={successMessage} />}

      {error && <Alert type='error' message={String(error)} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='bg-white border-2 border-black shadow-lg p-6'>
          <ProductoTable
            productos={productos}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      )}

      <ProductoModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingProducto(undefined)
        }}
        producto={editingProducto}
        categorias={categorias}
        materiales={materiales}
        onSubmit={(editingProducto ? handleUpdate : handleCreate) as (data: CreateProductoPayload | UpdateProductoPayload) => void}
        isLoading={createMutation.isPending || updateMutation.isPending}
        error={createMutation.isError || updateMutation.isError ? 'Error en la operación' : ''}
      />
    </div>
  )
}
