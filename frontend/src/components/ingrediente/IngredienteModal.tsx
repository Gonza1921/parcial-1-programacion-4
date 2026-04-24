import React from 'react'
import { Modal, Alert } from '../common'
import { IngredienteForm } from './IngredienteForm'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../../types'

interface IngredienteModalProps {
  isOpen: boolean
  onClose: () => void
  ingrediente?: Ingrediente
  onSubmit: (data: CreateIngredientePayload | UpdateIngredientePayload) => void
  isLoading?: boolean
  error?: string
  success?: string
}

export const IngredienteModal: React.FC<IngredienteModalProps> = ({
  isOpen,
  onClose,
  ingrediente,
  onSubmit,
  isLoading = false,
  error,
  success,
}) => {
  const handleSubmit = (data: CreateIngredientePayload | UpdateIngredientePayload) => {
    onSubmit(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ingrediente ? 'Editar Ingrediente' : 'Nuevo Ingrediente'}
    >
      {error && <Alert type='error' message={error} />}
      {success && <Alert type='success' message={success} />}
      <IngredienteForm
        ingrediente={ingrediente}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  )
}
