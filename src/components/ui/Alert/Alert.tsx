import { HTMLAttributes, JSX, ReactNode } from 'react'
import { cn } from '@/utils/classNames'
import { X } from 'lucide-react'

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
    default: 'bg-muted text-foreground border-border',
    success: 'bg-alert-success-bg text-alert-success-text border-alert-success-border',
    warning: 'bg-alert-warning-bg text-alert-warning-text border-alert-warning-border',
    error: 'bg-alert-error-bg text-alert-error-text border-alert-error-border',
    info: 'bg-alert-info-bg text-alert-info-text border-alert-info-border',
  }

  return (
    <div
      role="alert"
      className={cn(
        'relative rounded-md border p-md',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
        
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium text-base">{title}</h5>
          )}
          
          <div className="text-base">{children}</div>
        </div>
        
        {dismissible && onDismiss && (
          <button
            type="button"
            aria-label="Dismiss alert"
            onClick={onDismiss}
            className={cn(
              'inline-flex h-5 w-5 items-center justify-center rounded-full',
              'opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring',
              'transition-opacity'
            )}
          >
            <X className="h-3 w-3"/>
          </button>
        )}
      </div>
    </div>
  )
}