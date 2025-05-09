import { HTMLAttributes, JSX, ReactNode } from 'react'
import { cn } from '@/utils/classNames'

export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alert content
   */
  children: ReactNode
  /**
   * Alert variant
   */
  variant?: AlertVariant
  /**
   * Alert title (optional)
   */
  title?: string
  /**
   * Icon to display (optional)
   */
  icon?: ReactNode
  /**
   * Whether the alert is dismissible
   */
  dismissible?: boolean
  /**
   * Callback when dismiss button is clicked
   */
  onDismiss?: () => void
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A customizable alert component for showing messages, notifications, and feedback.
 *
 * Example:
 * 
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved successfully.
 * </Alert>
 * ```
 */
export default function Alert({
  children,
  variant = 'default',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className,
  ...props
}: AlertProps): JSX.Element {
  const variantStyles: Record<AlertVariant, string> = {
    default: 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] border-[hsl(var(--border))]',
    success: 'bg-[hsl(var(--alert-success-bg))] text-[hsl(var(--alert-success-text))] border-[hsl(var(--alert-success-border))]',
    warning: 'bg-[hsl(var(--alert-warning-bg))] text-[hsl(var(--alert-warning-text))] border-[hsl(var(--alert-warning-border))]',
    error: 'bg-[hsl(var(--alert-error-bg))] text-[hsl(var(--alert-error-text))] border-[hsl(var(--alert-error-border))]',
    info: 'bg-[hsl(var(--alert-info-bg))] text-[hsl(var(--alert-info-text))] border-[hsl(var(--alert-info-border))]',
  }

  return (
    <div
      role="alert"
      className={cn(
        'relative rounded-[var(--radius-md)] border p-[var(--spacing-md)]',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium text-[var(--font-base)]">{title}</h5>
          )}
          
          <div className="text-[var(--font-base)]">{children}</div>
        </div>
        
        {dismissible && onDismiss && (
          <button
            type="button"
            aria-label="Dismiss alert"
            onClick={onDismiss}
            className={cn(
              'inline-flex h-5 w-5 items-center justify-center rounded-full',
              'opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]',
              'transition-opacity'
            )}
          >
            <svg
              className="h-3 w-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}