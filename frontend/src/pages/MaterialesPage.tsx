import React, { useState } from 'react'
import { Button, Alert, LoadingSpinner } from '../components/common'
import { MaterialForm, MaterialTable, MaterialModal } from '../components/material'
import {
  useMateriasQuery,
  useMaterialCreate,
  useMaterialUpdate,
  useMaterialDelete,
} from '../hooks/useMaterial'
import type { Material, CreateMaterialPayload, UpdateMaterialPayload } from '../types'

export const MaterialesPage: React.FC = () => {
  const { data: materiales = [], isLoading, error } = useMateriasQuery()
  const createMutation = useMaterialCreate()
  const updateMutation = useMaterialUpdate()
  const deleteMutation = useMaterialDelete()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMaterial, setEditingMaterial] = useState<Material | undefined>()
  const [successMessage, setSuccessMessage] = useState('')

  const handleCreate = (data: CreateMaterialPayload) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setSuccessMessage('Material creado exitosamente')
        setIsModalOpen(false)
        setTimeout(() => setSuccessMessage(''), 3000)
      },
    })
  }

  const handleUpdate = (data: UpdateMaterialPayload) => {
    if (editingMaterial) {
      updateMutation.mutate(
        { id: editingMaterial.id, payload: data },
        {
          onSuccess: () => {
            setSuccessMessage('Material actualizado exitosamente')
            setIsModalOpen(false)
            setEditingMaterial(undefined)
            setTimeout(() => setSuccessMessage(''), 3000)
          },
        },
      )
    }
  }

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de que quieres eliminar este material?')) {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          setSuccessMessage('Material eliminado exitosamente')
          setTimeout(() => setSuccessMessage(''), 3000)
        },
      })
    }
  }

  const handleOpenModal = (material?: Material) => {
    setEditingMaterial(material)
    setIsModalOpen(true)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>MATERIALES</h1>
        <Button onClick={() => handleOpenModal()}>+ NUEVO MATERIAL</Button>
      </div>

      {successMessage && <Alert type='success' message={successMessage} />}

      {error && <Alert type='error' message={String(error)} />}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className='bg-white rounded-lg shadow p-6'>
          <MaterialTable
            materiales={materiales}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
          />
        </div>
      )}

      <MaterialModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingMaterial(undefined)
        }}
        material={editingMaterial}
        onSubmit={(editingMaterial ? handleUpdate : handleCreate) as (data: CreateMaterialPayload | UpdateMaterialPayload) => void}
        isLoading={createMutation.isPending || updateMutation.isPending}
        error={createMutation.isError || updateMutation.isError ? 'Error en la operación' : ''}
      />
    </div>
  )
}
