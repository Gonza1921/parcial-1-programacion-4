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
  const baseClass = 'rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  const variantClass = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white px-4 py-2',
    secondary: 'bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 text-sm',
    danger: 'bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 text-sm',
  }[variant]

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseClass} ${variantClass} ${className || ''}`}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  )
}
