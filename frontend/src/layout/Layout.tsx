import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Layout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className='max-w-7xl mx-auto px-4 py-8 space-y-6'>
        <Outlet />
      </main>
    </div>
  )
}
