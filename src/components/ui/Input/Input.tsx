import { InputHTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Error state - applies error styling
   */
  error?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A customizable input component using TailwindCSS and design system tokens.
 *
 * Example:
 * 
 * ```tsx
 * <Input placeholder="Enter your name" />
 * <Input type="email" placeholder="Enter your email" error={true} />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref): JSX.Element => {
    return (
      <input
        className={cn(
          'flex w-[var(--input-width)] rounded-[var(--input-border-radius)] bg-[var(--input-background)] px-md py-[var(--input-padding-y)] text-base ring-offset-[var(--input-ring-offset-color)]',
          'placeholder:text-muted-foreground',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-[var(--input-disabled-cursor)] disabled:opacity-[var(--input-disabled-opacity)]',
          error ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-ring',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input