import React, { useState } from 'react'
import { Button } from '../common'
import type { Categoria, CreateCategoriaPayload, UpdateCategoriaPayload } from '../../types'

interface CategoriaFormProps {
  categoria?: Categoria
  onSubmit: (data: CreateCategoriaPayload | UpdateCategoriaPayload) => void
  isLoading?: boolean
}

export const CategoriaForm: React.FC<CategoriaFormProps> = ({
  categoria,
  onSubmit,
  isLoading = false,
}) => {
  const [nombre, setNombre] = useState(categoria?.nombre || '')
  const [descripcion, setDescripcion] = useState(categoria?.descripcion || '')
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

    onSubmit({ nombre, descripcion: descripcion || undefined })
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
          placeholder='Nombre de la categoría'
        />
      </div>

      <div>
        <label className='block text-sm font-bold uppercase text-black mb-2'>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 font-bold'
          placeholder='Descripción de la categoría'
          rows={3}
        />
      </div>

      <div className='flex gap-2 justify-end pt-4'>
        <Button type='submit' isLoading={isLoading}>
          {categoria ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
