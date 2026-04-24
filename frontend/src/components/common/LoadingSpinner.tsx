import React from 'react'

export const LoadingSpinner: React.FC = () => (
  <div className='flex justify-center items-center py-8'>
    <div className='animate-spin rounded-full h-12 w-12 border-4 border-black border-t-yellow-400'></div>
  </div>
)
