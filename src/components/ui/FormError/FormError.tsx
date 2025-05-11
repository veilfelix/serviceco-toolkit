import { HTMLAttributes, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Error message content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A form error message component with appropriate styling.
 *
 * Example:
 *
 * ```tsx
 * <FormError>This field is required</FormError>
 * ```
 */
export default function FormError({
  children,
  className = '',
  ...rest
}: FormErrorProps): JSX.Element {
  return (
    <p
      className={cn(
        'text-sm font-medium text-destructive',
        className
      )}
      role="alert"
      {...rest}
    >
      {children}
    </p>
  )
}