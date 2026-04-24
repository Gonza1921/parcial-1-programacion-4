import React from 'react'
import { Button } from '../common'
import type { Material } from '../../types'

interface MaterialTableProps {
  materiales: Material[]
  onEdit: (material: Material) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const MaterialTable: React.FC<MaterialTableProps> = ({
  materiales,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-black text-white border-b-2 border-black'>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>ID</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Nombre</th>
            <th className='px-6 py-4 text-right text-sm font-bold uppercase'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material.id} className='border-b border-gray-300 hover:bg-gray-100'>
              <td className='px-6 py-3 text-sm'>{material.id}</td>
              <td className='px-6 py-3 text-sm font-bold uppercase'>{material.nombre}</td>
              <td className='px-6 py-3 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(material)}
                  className='text-xs'
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(material.id)}
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

      {materiales.length === 0 && (
        <div className='text-center py-8 text-gray-500 font-bold'>
          NO HAY MATERIALES DISPONIBLES
        </div>
      )}
    </div>
  )
}
