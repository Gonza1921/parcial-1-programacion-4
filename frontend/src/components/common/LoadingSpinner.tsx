import React from 'react'

export const LoadingSpinner: React.FC = () => (
  <div className='flex justify-center items-center py-8'>
    <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-orange-500'></div>
  </div>
)
