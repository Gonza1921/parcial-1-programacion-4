import React, { useState } from 'react'
import { Button } from '../common'
import type { Producto, Categoria, Ingrediente, CreateProductoPayload, UpdateProductoPayload } from '../../types'

interface ProductoFormProps {
  producto?: Producto
  categorias: Categoria[]
  ingredientes: Ingrediente[]
  onSubmit: (data: CreateProductoPayload | UpdateProductoPayload) => void
  isLoading?: boolean
}

export const ProductoForm: React.FC<ProductoFormProps> = ({
  producto,
  categorias,
  ingredientes,
  onSubmit,
  isLoading = false,
}) => {
  const [nombre, setNombre] = useState(producto?.nombre || '')
  const [precio, setPrecio] = useState(producto?.precio?.toString() || '')
  const [descripcion, setDescripcion] = useState(producto?.descripcion || '')
  const [talle, setTalle] = useState(producto?.talle?.toString() || '')
  const [color, setColor] = useState(producto?.color || '')
  const [categoria_id, setCategoria_id] = useState(producto?.categoria_id?.toString() || '')
  const [ingredientes_ids, setIngredientes_ids] = useState<number[]>(
    producto?.ingredientes?.map((m) => m.id) || [],
  )
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

    if (!precio) {
      setError('El precio es requerido')
      return
    }

    const precioNum = parseFloat(precio)
    if (isNaN(precioNum) || precioNum <= 0) {
      setError('El precio debe ser un número mayor a 0')
      return
    }

    if (!talle) {
      setError('El talle es requerido')
      return
    }

    const talleNum = parseInt(talle)
    if (isNaN(talleNum) || talleNum < 1 || talleNum > 5) {
      setError('El talle debe ser un número entre 1 y 5')
      return
    }

    if (!color.trim()) {
      setError('El color es requerido')
      return
    }

    if (!categoria_id) {
      setError('La categoría es requerida')
      return
    }

    onSubmit({
      nombre,
      precio: precioNum,
      descripcion: descripcion || undefined,
      talle: talleNum,
      color: color.trim(),
      categoria_id: parseInt(categoria_id),
      ingredientes_ids: ingredientes_ids.length > 0 ? ingredientes_ids : undefined,
    })
  }

  const toggleIngrediente = (id: number) => {
    setIngredientes_ids((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    )
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
          placeholder='Nombre del producto'
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-bold uppercase text-black mb-2'>Precio</label>
          <input
            type='number'
            step='0.01'
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200'
            placeholder='0.00'
          />
        </div>

        <div>
          <label className='block text-sm font-bold uppercase text-black mb-2'>Categoría</label>
          <select
            value={categoria_id}
            onChange={(e) => setCategoria_id(e.target.value)}
            className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 font-bold'
          >
            <option value=''>SELECCIONA UNA CATEGORÍA</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-bold uppercase text-black mb-2'>Talle (1-5)</label>
          <select
            value={talle}
            onChange={(e) => setTalle(e.target.value)}
            className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 font-bold'
          >
            <option value=''>SELECCIONA UN TALLE</option>
            <option value='1'>1 (XS)</option>
            <option value='2'>2 (S)</option>
            <option value='3'>3 (M)</option>
            <option value='4'>4 (L)</option>
            <option value='5'>5 (XL)</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-bold uppercase text-black mb-2'>Color</label>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 uppercase font-bold'
            placeholder='Color del producto'
          />
        </div>
      </div>

      <div>
        <label className='block text-sm font-bold uppercase text-black mb-2'>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className='w-full px-4 py-2 border-2 border-black focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 font-bold'
          placeholder='Descripción del producto'
          rows={3}
        />
      </div>

      <div>
        <label className='block text-sm font-bold uppercase text-black mb-2'>Ingredientes</label>
        <div className='space-y-2 max-h-40 overflow-y-auto border-2 border-black p-3 bg-gray-50'>
          {ingredientes.length > 0 ? (
            ingredientes.map((ing) => (
              <label key={ing.id} className='flex items-center'>
                <input
                  type='checkbox'
                  checked={ingredientes_ids.includes(ing.id)}
                  onChange={() => toggleIngrediente(ing.id)}
                  className='mr-2 w-4 h-4 border-2 border-black'
                />
                <span className='text-sm font-bold uppercase'>{ing.nombre}</span>
              </label>
            ))
          ) : (
            <p className='text-sm text-gray-500 font-bold'>NO HAY INGREDIENTES DISPONIBLES</p>
          )}
        </div>
      </div>

      <div className='flex gap-2 justify-end pt-4'>
        <Button type='submit' isLoading={isLoading}>
          {producto ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  )
}
