import React, { useState } from 'react'
import { Button, Alert } from '../common'
import type { Ingrediente, CreateIngredientePayload, UpdateIngredientePayload } from '../../types'

interface IngredienteFormProps {
  ingrediente?: Ingrediente
  onSubmit: (data: CreateIngredientePayload | UpdateIngredientePayload) => void
  isLoading?: boolean
}

export const IngredienteForm: React.FC<IngredienteFormProps> = ({
  ingrediente,
  onSubmit,
  isLoading = false,
}) => {
  const [nombre, setNombre] = useState(ingrediente?.nombre || '')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!nombre.trim()) {
      setError('El nombre es requerido')
      return
    }

    if (nombre.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres')
      return
    }

    onSubmit({ nombre })
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && <Alert type='error' message={error} />}

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre</label>
        <input
          type='text'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-900'
          placeholder='Nombre del ingrediente'
        />
      </div>

      <div className='flex gap-2 justify-end pt-4'>
        <Button type='submit' isLoading={isLoading}>
          {ingrediente ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
