import React, { ButtonHTMLAttributes, JSX } from 'react'
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
}: Pick<ButtonProps, 'variant' | 'size' | 'disabled' | 'className'>): string {
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
 * This Button component is reusable, with Tailwind-based variants, sizes, and accessibility.
 *
 * - Variants: primary, secondary, tertiary
 * - Sizes: sm, md, lg
 * - Keyboard and screen reader friendly
 *
 * This component is currently handcrafted for flexibility and consistency.
 *
 * Once a design system (e.g. ShadCN, Tailwind UI) is adopted:
 * - It could be replaced by the system’s button primitive
 * - OR this component could wrap it to maintain app-specific variants
 * - OR we may keep this for isolated use-cases or content editors (e.g. Contentful actions)
 */

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps): JSX.Element {
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