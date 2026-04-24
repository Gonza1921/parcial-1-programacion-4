import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Navbar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className='bg-black text-white shadow-lg border-b-2 border-yellow-400'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
        <h1 className='text-3xl font-bold uppercase tracking-widest' style={{ color: '#facc15' }}>
          DOLLAR RICH KIDZ
        </h1>

        <div className='flex gap-6'>
          <Link
            to='/'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/') 
                ? 'text-yellow-400 border-b-2 border-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            CATEGORÍAS
          </Link>
          <Link
            to='/productos'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/productos') 
                ? 'text-yellow-400 border-b-2 border-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            PRODUCTOS
          </Link>
          <Link
            to='/materiales'
            className={`px-3 py-2 uppercase font-bold text-sm tracking-wide transition-colors ${
              isActive('/materiales') 
                ? 'text-yellow-400 border-b-2 border-yellow-400' 
                : 'text-white hover:text-yellow-400'
            }`}
          >
            MATERIALES
          </Link>
        </div>
      </div>
    </nav>
  )
}
