import React from 'react'

export interface ButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary'
  /**
   * Is button disabled?
   */
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium transition-colors'

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    tertiary: 'bg-transparent text-blue-600 hover:bg-blue-50 border border-blue-600',
  }

  const disabledStyles = 'opacity-50 cursor-not-allowed'

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
