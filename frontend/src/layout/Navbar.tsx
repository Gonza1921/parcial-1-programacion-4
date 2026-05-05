import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || (path === '/' && location.pathname === '/categorias')

  return (
    <nav className='bg-green-800 text-white shadow-lg border-b-2 border-green-500'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold uppercase tracking-widest' style={{ color: '#22c55e' }}>
          FOOD STORE
        </h1>

        <div className='flex gap-6'>
          <Link
            to='/'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/') 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-white hover:text-green-400'
            }`}
          >
            CATEGORÍAS
          </Link>
          <Link
            to='/productos'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/productos') 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-white hover:text-green-400'
            }`}
          >
            PRODUCTOS
          </Link>
          <Link
            to='/ingredientes'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/ingredientes') 
                ? 'text-green-400 border-b-2 border-green-400' 
                : 'text-white hover:text-green-400'
            }`}
          >
            INGREDIENTES
          </Link>
        </div>
      </div>
    </nav>
  )
}
