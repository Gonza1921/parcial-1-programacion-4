import React from 'react'
import { Modal, Alert } from '../common'
import { MaterialForm } from './MaterialForm'
import type { Material, CreateMaterialPayload, UpdateMaterialPayload } from '../../types'

interface MaterialModalProps {
  isOpen: boolean
  onClose: () => void
  material?: Material
  onSubmit: (data: CreateMaterialPayload | UpdateMaterialPayload) => void
  isLoading?: boolean
  error?: string
  success?: string
}

export const MaterialModal: React.FC<MaterialModalProps> = ({
  isOpen,
  onClose,
  material,
  onSubmit,
  isLoading = false,
  error,
  success,
}) => {
  const handleSubmit = (data: CreateMaterialPayload | UpdateMaterialPayload) => {
    onSubmit(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={material ? 'Editar Material' : 'Nuevo Material'}
    >
      {error && <Alert type='error' message={error} />}
      {success && <Alert type='success' message={success} />}
      <MaterialForm
        material={material}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  )
}
