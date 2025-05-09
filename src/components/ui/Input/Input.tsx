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
          'flex w-[var(--input-width)] rounded-[var(--input-border-radius)] border-[var(--input-border-width)] border-input bg-[var(--input-background)] px-md py-[var(--input-padding-y)] text-base ring-offset-[var(--input-ring-offset-color)]',
          'placeholder:text-muted-foreground',
          'focus:outline-[var(--input-focus-outline)] focus:ring-[var(--input-focus-ring-width)] focus:ring-ring focus:ring-offset-[var(--input-focus-ring-offset)]',
          'disabled:cursor-[var(--input-disabled-cursor)] disabled:opacity-[var(--input-disabled-opacity)]',
          error && 'border-destructive focus:ring-destructive',
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