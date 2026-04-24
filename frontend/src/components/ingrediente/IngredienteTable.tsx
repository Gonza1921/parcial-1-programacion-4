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
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-gray-100 border-b'>
            <th className='px-6 py-3 text-left text-sm font-medium'>ID</th>
            <th className='px-6 py-3 text-left text-sm font-medium'>Nombre</th>
            <th className='px-6 py-3 text-right text-sm font-medium'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((ingrediente) => (
            <tr key={ingrediente.id} className='border-b hover:bg-gray-50'>
              <td className='px-6 py-3 text-sm'>{ingrediente.id}</td>
              <td className='px-6 py-3 text-sm font-medium'>{ingrediente.nombre}</td>
              <td className='px-6 py-3 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(ingrediente)}
                  className='text-xs'
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(ingrediente.id)}
                  isLoading={isDeleting}
                  className='text-xs'
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ingredientes.length === 0 && (
        <div className='text-center py-8 text-gray-500'>
          No hay ingredientes disponibles
        </div>
      )}
    </div>
  )
}
