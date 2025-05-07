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
          'flex w-full rounded border border-[hsl(var(--input))] bg-transparent px-[var(--spacing-md)] py-[0.5rem] text-[var(--font-base)] ring-offset-background',
          'placeholder:text-[hsl(var(--muted-foreground))]',
          'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]',
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