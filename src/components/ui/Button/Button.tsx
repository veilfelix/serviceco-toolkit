import { ButtonHTMLAttributes, JSX } from 'react'
import { ButtonSize, ButtonVariant, getButtonClassNames } from '@/utils/getButtonClassNames'

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
 * A customizable button component using TailwindCSS and design system tokens.
 *
 * Example:
 * ```tsx
 * <Button variant="primary" size="md">Click Me</Button>
 * ```
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button',
  ...rest
}: ButtonProps): JSX.Element {
  const buttonClasses = getButtonClassNames({ variant, size, disabled, className })

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      className={buttonClasses}
      {...rest}
    >
      {children}
    </button>
  )
}
