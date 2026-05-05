import React from 'react'
import { Button } from '../common'
import type { Categoria } from '../../types'

interface CategoriaTableProps {
  categorias: Categoria[]
  onEdit: (categoria: Categoria) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const CategoriaTable: React.FC<CategoriaTableProps> = ({
  categorias,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden'>
      <table className='w-full'>
        <thead className='bg-gray-50 border-b border-gray-100'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>ID</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Nombre</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Descripción</th>
            <th className='px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wide'>Acciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className='hover:bg-orange-50 transition-colors'>
              <td className='px-6 py-4 text-sm text-gray-900'>{categoria.id}</td>
              <td className='px-6 py-4 text-sm font-medium text-gray-900'>{categoria.nombre}</td>
              <td className='px-6 py-4 text-sm text-gray-600'>
                {categoria.descripcion || '-'}
              </td>
              <td className='px-6 py-4 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(categoria)}
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(categoria.id)}
                  isLoading={isDeleting}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categorias.length === 0 && (
        <div className='text-center py-12 text-gray-500'>
          <p className='text-sm font-medium'>No hay categorías disponibles</p>
        </div>
      )}
    </div>
  )
}
