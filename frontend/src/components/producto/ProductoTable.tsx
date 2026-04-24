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
    <div className='overflow-x-auto'>
      <table className='w-full border-collapse'>
        <thead>
          <tr className='bg-black text-white border-b-2 border-black'>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>ID</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Nombre</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Precio</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Talle</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Color</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Categoría</th>
            <th className='px-6 py-4 text-left text-sm font-bold uppercase'>Materiales</th>
            <th className='px-6 py-4 text-right text-sm font-bold uppercase'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className='border-b border-gray-300 hover:bg-gray-100'>
              <td className='px-6 py-3 text-sm'>{producto.id}</td>
              <td className='px-6 py-3 text-sm font-bold uppercase'>{producto.nombre}</td>
              <td className='px-6 py-3 text-sm font-bold'>${producto.precio.toFixed(2)}</td>
              <td className='px-6 py-3 text-sm font-bold uppercase'>{producto.talle}</td>
              <td className='px-6 py-3 text-sm font-bold uppercase'>{producto.color}</td>
              <td className='px-6 py-3 text-sm uppercase'>{producto.categoria.nombre}</td>
              <td className='px-6 py-3 text-sm'>
                {producto.materiales.length > 0
                  ? producto.materiales.map((m) => m.nombre).join(', ')
                  : '-'}
              </td>
              <td className='px-6 py-3 text-right space-x-2'>
                <Button
                  variant='secondary'
                  onClick={() => onEdit(producto)}
                  className='text-xs'
                >
                  Editar
                </Button>
                <Button
                  variant='danger'
                  onClick={() => onDelete(producto.id)}
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

      {productos.length === 0 && (
        <div className='text-center py-8 text-gray-500 font-bold'>
          NO HAY PRODUCTOS DISPONIBLES
        </div>
      )}
    </div>
  )
}
