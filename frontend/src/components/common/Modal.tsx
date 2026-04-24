import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50'>
      <div className='bg-white border-2 border-black shadow-2xl w-full max-w-md p-6'>
        <div className='flex justify-between items-center mb-4 pb-4 border-b-2 border-black'>
          <h2 className='text-2xl font-bold uppercase text-black'>{title}</h2>
          <button
            onClick={onClose}
            className='text-black hover:text-red-600 text-3xl leading-none font-bold transition-colors'
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
