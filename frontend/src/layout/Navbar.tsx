import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || (path === '/' && location.pathname === '/categorias')

  return (
    <nav className='bg-slate-800 text-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold flex items-center gap-2'>
          🍽️ FOOD STORE
        </h1>

        <div className='flex gap-8'>
          <Link
            to='/'
            className={`px-3 py-2 font-medium text-sm transition-colors ${
              isActive('/') 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-white hover:text-orange-500'
            }`}
          >
            Categorías
          </Link>
          <Link
            to='/productos'
            className={`px-3 py-2 font-medium text-sm transition-colors ${
              isActive('/productos') 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-white hover:text-orange-500'
            }`}
          >
            Productos
          </Link>
          <Link
            to='/ingredientes'
            className={`px-3 py-2 font-medium text-sm transition-colors ${
              isActive('/ingredientes') 
                ? 'text-orange-500 border-b-2 border-orange-500' 
                : 'text-white hover:text-orange-500'
            }`}
          >
            Ingredientes
          </Link>
        </div>
      </div>
    </nav>
  )
}
