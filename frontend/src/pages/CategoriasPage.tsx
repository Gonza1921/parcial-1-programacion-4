import React, { useState } from 'react'
import { Button, Alert, LoadingSpinner } from '../components/common'
import { CategoriaModal, CategoriaTable } from '../components/categoria'
import {
  useCategoriasQuery,
  useCategoriaCreate,
  useCategoriaUpdate,
  useCategoriaDelete,
} from '../hooks/useCategoria'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../types'

export const CategoriasPage: React.FC = () => {
  const { data: categorias = [], isLoading, error } = useCategoriasQuery()
  const createMutation = useCategoriaCreate()
  const updateMutation = useCategoriaUpdate()
  const deleteMutation = useCategoriaDelete()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | undefined>()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreate = (data: CreateCategoriaPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Categoría creada exitosamente')
        setIsModalOpen(false)
        setTimeout(() => setSuccessMessage(''), 3000)
      },
      onError: (err) => console.error(err),
    })
  }

  const handleUpdate = (data: UpdateCategoriaPayload) => {
    if (editingCategoria) {
      updateMutation.mutate(
        { id: editingCategoria.id, payload: data },
        {
          onSuccess: () => {
            setSuccessMessage('Categoría actualizada exitosamente')
            setIsModalOpen(false)
            setEditingCategoria(undefined)
            setTimeout(() => setSuccessMessage(''), 3000)
          },
          onError: (err) => console.error(err),
        },
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setSuccessMessage('Categoría eliminada exitosamente')
          setTimeout(() => setSuccessMessage(''), 3000)
        },
        onError: (err) => console.error(err),
      })
    }
  }

  const handleOpenModal = (categoria?: Categoria) => {
    setEditingCategoria(categoria)
    setIsModalOpen(true)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold uppercase'>CATEGORÍAS</h1>
        <Button onClick={() => handleOpenModal()}>+ NUEVA CATEGORÍA</Button>
      </div>

      {successMessage && <Alert type='success' message={successMessage} />}

      {error && <Alert type='error' message={String(error)} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='bg-white border-2 border-black shadow-lg p-6'>
          <CategoriaTable
            categorias={categorias}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      )}

      <CategoriaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCategoria(undefined)
        }}
        categoria={editingCategoria}
        onSubmit={(editingCategoria ? handleUpdate : handleCreate) as (data: CreateCategoriaPayload | UpdateCategoriaPayload) => void}
        isLoading={createMutation.isPending || updateMutation.isPending}
        error={createMutation.isError || updateMutation.isError ? 'Error en la operación' : ''}
      />
    </div>
  )
}
