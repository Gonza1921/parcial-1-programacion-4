import React from 'react'
import { Button } from '../common'
import type { Producto } from '../../types'

interface ProductoTableProps {
  productos: Producto[]
  onEdit: (producto: Producto) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export const ProductoTable: React.FC<ProductoTableProps> = ({
  productos,
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
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Precio</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Talle</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Color</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Categoría</th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wide'>Ingredientes</th>
            <th className='px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wide'>Acciones</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100'>
          {productos.map((producto) => (
            <tr key={producto.id} className='hover:bg-orange-50 transition-colors'>
              <td className='px-6 py-4 text-sm text-gray-900'>{producto.id}</td>
              <td className='px-6 py-4 text-sm font-medium text-gray-900'>{producto.nombre}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>${producto.precio.toFixed(2)}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>{producto.talle}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>{producto.color}</td>
              <td className='px-6 py-4 text-sm text-gray-900'>{producto.categoria.nombre}</td>
              <td className='px-6 py-4 text-sm text-gray-600'>
                {producto.ingredientes.length > 0
                  ? producto.ingredientes.map((ing) => ing.nombre).join(', ')
                  : '-'}
              </td>
              <td className='px-6 py-4 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(producto)}
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(producto.id)}
                  isLoading={isDeleting}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productos.length === 0 && (
        <div className='text-center py-12 text-gray-500'>
          <p className='text-sm font-medium'>No hay productos disponibles</p>
        </div>
      )}
    </div>
  )
}
