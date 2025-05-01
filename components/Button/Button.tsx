import React, { ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/classNames'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode
  /**
   * Button variant
   */
  variant?: ButtonVariant
  /**
   * Button size
   */
  size?: ButtonSize
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Get button classes based on variant, size, disabled state, and custom classes
 */
export function getButtonClasses({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: Pick<ButtonProps, 'variant' | 'size' | 'disabled' | 'className'>) {
  // Base styles always applied
  const baseStyles = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  // Size variations
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 border border-gray-300',
    tertiary: 'bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 border border-blue-600',
  }

  // Disabled state
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none'

  return cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabled && disabledStyles,
    className
  )
}

/**
 * Reusable button with Tailwind variants and accessibility.
 *
 * - Variants: primary, secondary, tertiary
 * - Sizes: sm, md, lg
 * - Accessible and keyboard friendly
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const buttonClasses = getButtonClasses({ variant, size, disabled, className })

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button