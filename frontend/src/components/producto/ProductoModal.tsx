import React from 'react'
import { Modal, Alert } from '../common'
import { ProductoForm } from './ProductoForm'
import type { Producto, Categoria, Material, CreateProductoPayload, UpdateProductoPayload } from '../../types'

interface ProductoModalProps {
  isOpen: boolean
  onClose: () => void
  producto?: Producto
  categorias: Categoria[]
  materiales: Material[]
  onSubmit: (data: CreateProductoPayload | UpdateProductoPayload) => void
  isLoading?: boolean
  error?: string
  success?: string
}

export const ProductoModal: React.FC<ProductoModalProps> = ({
  isOpen,
  onClose,
  producto,
  categorias,
  materiales,
  onSubmit,
  isLoading = false,
  error,
  success,
}) => {
  const handleSubmit = (data: CreateProductoPayload | UpdateProductoPayload) => {
    onSubmit(data)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={producto ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
    >
      {error && <Alert type='error' message={error} />}
      {success && <Alert type='success' message={success} />}
      <ProductoForm
        producto={producto}
        categorias={categorias}
        materiales={materiales}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Modal>
  )
}
