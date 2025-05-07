import { TextareaHTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
 * A customizable textarea component using TailwindCSS and design system tokens.
 *
 * Example:
 *
 * ```tsx
 * <Textarea placeholder="Enter your message" />
 * <Textarea placeholder="Enter your message" error={true} />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref): JSX.Element => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded border border-[hsl(var(--input))] bg-transparent px-[var(--spacing-md)] py-[var(--spacing-sm)] text-[var(--font-base)] ring-offset-background',
          'placeholder:text-[hsl(var(--muted-foreground))]',
          'focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-vertical',
          error && 'border-[hsl(var(--destructive))] focus:ring-[hsl(var(--destructive))]',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea