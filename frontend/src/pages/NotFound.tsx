import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/common'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='text-center py-16'>
      <h1 className='text-4xl font-bold mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-8'>Página no encontrada</p>
      <Button onClick={() => navigate('/')}>Volver al inicio</Button>
    </div>
  )
}
