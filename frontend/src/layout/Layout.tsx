import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Layout: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col w-full'>
      <Navbar />
      <main className='flex-1 w-full px-6 py-8'>
        <div className='space-y-6'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
