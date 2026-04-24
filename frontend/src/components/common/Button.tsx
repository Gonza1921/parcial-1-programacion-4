import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  isLoading?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}) => {
  const baseClass = 'px-4 py-2 font-bold uppercase text-sm tracking-wide transition-all border-2'
  const variantClass = {
    primary: 'bg-black text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-400',
    secondary: 'bg-white text-black border-black hover:bg-black hover:text-yellow-400 disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-400',
  }[variant]

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClass} ${variantClass} ${className || ''}`}
    >
      {isLoading ? 'CARGANDO...' : children}
    </button>
  )
}
