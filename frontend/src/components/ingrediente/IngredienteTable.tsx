import React from 'react'
import { Button } from '../common'
import type { Ingrediente } from '../../types'

interface IngredienteTableProps {
  ingredientes: Ingrediente[]
  onEdit: (ingrediente: Ingrediente) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const IngredienteTable: React.FC<IngredienteTableProps> = ({
  ingredientes,
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
            <th className='px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wide'>Acciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {ingredientes.map((ingrediente) => (
            <tr key={ingrediente.id} className='hover:bg-orange-50 transition-colors'>
              <td className='px-6 py-4 text-sm text-gray-900'>{ingrediente.id}</td>
              <td className='px-6 py-4 text-sm font-medium text-gray-900'>{ingrediente.nombre}</td>
              <td className='px-6 py-4 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(ingrediente)}
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(ingrediente.id)}
                  isLoading={isDeleting}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ingredientes.length === 0 && (
        <div className='text-center py-12 text-gray-500'>
          <p className='text-sm font-medium'>No hay ingredientes disponibles</p>
        </div>
      )}
    </div>
  )
}
