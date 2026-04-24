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
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-black text-white border-b-2 border-black'>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>ID</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Nombre</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Descripción</th>
            <th className='px-6 py-4 text-right text-sm font-bold uppercase'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id} className='border-b border-gray-300 hover:bg-gray-100'>
              <td className='px-6 py-3 text-sm'>{categoria.id}</td>
              <td className='px-6 py-3 text-sm font-bold uppercase'>{categoria.nombre}</td>
              <td className='px-6 py-3 text-sm text-gray-600'>
                {categoria.descripcion || '-'}
              </td>
              <td className='px-6 py-3 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(categoria)}
                  className='text-xs'
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(categoria.id)}
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

      {categorias.length === 0 && (
        <div className='text-center py-8 text-gray-500 font-bold'>
          NO HAY CATEGORÍAS DISPONIBLES
        </div>
      )}
    </div>
  )
}
