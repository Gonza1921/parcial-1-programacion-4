import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductoQuery } from '../hooks/useProducto'
import { Button, Alert, LoadingSpinner } from '../components/common'

export const ProductoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const productoId = id ? parseInt(id, 10) : undefined

  const { data: producto, isLoading, error } = useProductoQuery(productoId!)

  if (!id || !productoId || isNaN(productoId)) {
    return (
      <div className="space-y-4">
        <Alert type="error" message="ID de producto inválido" />
        <Button onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Alert type="error" message={`Error al cargar el producto: ${String(error)}`} />
        <Button onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </Button>
      </div>
    )
  }

  if (!producto) {
    return (
      <div className="space-y-4">
        <Alert type="error" message="Producto no encontrado" />
        <Button onClick={() => navigate('/productos')}>
          ← Volver a Productos
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate('/productos')} className="!p-2">
          ← Volver
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{producto.nombre}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nombre</label>
            <p className="text-lg text-gray-900">{producto.nombre}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Categoría</label>
            <p className="text-lg text-gray-900">{producto.categoria?.nombre || 'No asignada'}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Precio</label>
            <p className="text-lg text-gray-900 font-semibold">${producto.precio.toFixed(2)}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Stock</label>
            <p className="text-lg text-gray-900">
              <span className={producto.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {producto.stock} unidades
              </span>
            </p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Disponibilidad</label>
            <p className="text-lg">
              {producto.disponibilidad ? (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Disponible
                </span>
              ) : (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  No disponible
                </span>
              )}
            </p>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700">Descripción</label>
            <p className="text-gray-600 mt-1">{producto.descripcion || 'Sin descripción'}</p>
          </div>
        </div>

        {producto.ingredientes && producto.ingredientes.length > 0 && (
          <div className="border-t pt-6 mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Ingredientes</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {producto.ingredientes.map((ing) => (
                <div
                  key={ing.id}
                  className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900"
                >
                  {ing.nombre}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={() => navigate('/productos')} className="bg-gray-500 hover:bg-gray-600">
          ← Volver
        </Button>
        <Button onClick={() => navigate(`/productos/${productoId}/editar`)} className="bg-blue-600 hover:bg-blue-700">
          Editar
        </Button>
      </div>
    </div>
  )
}
