import React from 'react'

interface AlertProps {
  type: 'success' | 'error' | 'info'
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const typeClass = {
    success: 'bg-green-100 text-green-800 border-green-400 border-2',
    error: 'bg-red-100 text-red-800 border-red-400 border-2',
    info: 'bg-yellow-100 text-yellow-800 border-yellow-400 border-2',
  }[type]

  return (
    <div className={`${typeClass} px-4 py-3 mb-4 font-bold`}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className='float-right text-2xl leading-none font-bold hover:opacity-70'
        >
          ×
        </button>
      )}
    </div>
  )
}
