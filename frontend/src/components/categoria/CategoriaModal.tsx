import React from 'react'
import { Modal, Alert } from '../common'
import { CategoriaForm } from './CategoriaForm'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../../types'

interface CategoriaModalProps {
  isOpen: boolean
  onClose: () => void
  categoria?: Categoria
  onSubmit: (data: CreateCategoriaPayload | UpdateCategoriaPayload) => void
  isLoading?: boolean
  error?: string
  success?: string
}

export const CategoriaModal: React.FC<CategoriaModalProps> = ({
  isOpen,
  onClose,
  categoria,
  onSubmit,
  isLoading = false,
  error,
  success,
}) => {
  const handleSubmit = (data: CreateCategoriaPayload | UpdateCategoriaPayload) => {
    onSubmit(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={categoria ? 'EDITAR CATEGORÍA' : 'NUEVA CATEGORÍA'}
    >
      {error && <Alert type='error' message={error} />}
      {success && <Alert type='success' message={success} />}
      <CategoriaForm
        categoria={categoria}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  )
}
