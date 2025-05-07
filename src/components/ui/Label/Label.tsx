import { LabelHTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Label content
   */
  children: React.ReactNode
  /**
   * Whether the field is required
   */
  required?: boolean
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
 * A customizable label component using TailwindCSS and design system tokens.
 *
 * Example:
 * 
 * ```tsx
 * <Label htmlFor="name">Name</Label>
 * <Label htmlFor="email" required>Email</Label>
 * ```
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, className, required = false, error = false, ...props }, ref): JSX.Element => {
    return (
      <label
        className={cn(
          'text-[var(--font-base)] font-medium text-foreground mb-[var(--spacing-xs)] block',
          error && 'text-[hsl(var(--destructive))]',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {required && <span className="text-[hsl(var(--destructive))] ml-[var(--spacing-xs)]" aria-hidden="true">*</span>}
      </label>
    )
  }
)

Label.displayName = 'Label'

export default Label