import React, { useState } from 'react'
import { Button } from '../common'
import type { Material, CreateMaterialPayload, UpdateMaterialPayload } from '../../types'

interface MaterialFormProps {
  material?: Material
  onSubmit: (data: CreateMaterialPayload | UpdateMaterialPayload) => void
  isLoading?: boolean
}

export const MaterialForm: React.FC<MaterialFormProps> = ({
  material,
  onSubmit,
  isLoading = false,
}) => {
  const [nombre, setNombre] = useState(material?.nombre || '')
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
      {error && <div className='text-red-600 text-sm font-bold'>{error}</div>}

      <div>
        <label className='block text-sm font-bold uppercase text-black mb-2'>Nombre</label>
        <input
          type='text'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 uppercase font-bold'
          placeholder='Nombre del material'
        />
      </div>

      <div className='flex gap-2 justify-end pt-4'>
        <Button type='submit' isLoading={isLoading}>
          {material ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
