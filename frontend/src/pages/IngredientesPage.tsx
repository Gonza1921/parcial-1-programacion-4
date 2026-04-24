import React, { useState } from 'react'
import { Button, Alert, LoadingSpinner } from '../components/common'
import { IngredienteModal, IngredienteTable } from '../components/ingrediente'
import {
  useIngredientesQuery,
  useIngredienteCreate,
  useIngredienteUpdate,
  useIngredienteDelete,
} from '../hooks/useIngrediente'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../types'

export const IngredientesPage: React.FC = () => {
  const { data: ingredientes = [], isLoading, error } = useIngredientesQuery()
  const createMutation = useIngredienteCreate()
  const updateMutation = useIngredienteUpdate()
  const deleteMutation = useIngredienteDelete()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingIngrediente, setEditingIngrediente] = useState<Ingrediente | undefined>()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreate = (data: CreateIngredientePayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Ingrediente creado exitosamente')
        setIsModalOpen(false)
        setTimeout(() => setSuccessMessage(''), 3000)
      },
    })
  }

  const handleUpdate = (data: UpdateIngredientePayload) => {
    if (editingIngrediente) {
      updateMutation.mutate(
        { id: editingIngrediente.id, payload: data },
        {
          onSuccess: () => {
            setSuccessMessage('Ingrediente actualizado exitosamente')
            setIsModalOpen(false)
            setEditingIngrediente(undefined)
            setTimeout(() => setSuccessMessage(''), 3000)
          },
        },
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este ingrediente?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setSuccessMessage('Ingrediente eliminado exitosamente')
          setTimeout(() => setSuccessMessage(''), 3000)
        },
      })
    }
  }

  const handleOpenModal = (ingrediente?: Ingrediente) => {
    setEditingIngrediente(ingrediente)
    setIsModalOpen(true)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Ingredientes</h1>
        <Button onClick={() => handleOpenModal()}>+ Nuevo Ingrediente</Button>
      </div>

      {successMessage && <Alert type='success' message={successMessage} />}

      {error && <Alert type='error' message={String(error)} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='bg-white rounded-lg shadow p-6'>
          <IngredienteTable
            ingredientes={ingredientes}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      )}

      <IngredienteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingIngrediente(undefined)
        }}
        ingrediente={editingIngrediente}
        onSubmit={(editingIngrediente ? handleUpdate : handleCreate) as (data: CreateIngredientePayload | UpdateIngredientePayload) => void}
        isLoading={createMutation.isPending || updateMutation.isPending}
        error={createMutation.isError || updateMutation.isError ? 'Error en la operación' : ''}
      />
    </div>
  )
}
