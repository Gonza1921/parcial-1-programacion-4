import React from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeClass = {
    success: 'bg-green-50 text-green-700 border border-green-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
  }[type]

  return (
    <div className={`${typeClass} rounded-lg p-3 mb-4 flex items-center justify-between`}>
      <span className='text-sm font-medium'>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className='ml-4 text-gray-400 hover:text-gray-600 transition-colors'
        >
          ✕
        </button>
      )}
    </div>
  )
}
