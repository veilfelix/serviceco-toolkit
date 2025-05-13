import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/utils/classNames'

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export type ToastProps = {
  /**
   * Toast variant styling
   */
  variant?: ToastVariant
  /**
   * Toast title (overrides Radix UI's title prop which requires string)
   */
  title?: React.ReactNode
  /**
   * Custom icon to display
   */
  icon?: React.ReactNode
  /**
   * Toast content (alias for description prop)
   */
  children?: React.ReactNode
  /**
   * Action element to be displayed in the toast
   */
  action?: React.ReactNode
} & Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>, 'title'>

/**
 * Toast component for showing notification messages with different variants.
 * Built on Radix UI's Toast primitive for accessibility and interaction support.
 */
export function Toast({
  className,
  variant = 'default',
  title,
  children,
  icon,
  action,
  ...props
}: ToastProps) {
  // Variant styles map
  const variantStyles: Record<ToastVariant, string> = {
    default: 'bg-toast-background text-toast-foreground border-border',
    success: 'bg-toast-success-bg text-toast-success-text border-toast-success-border',
    error: 'bg-toast-error-bg text-toast-error-text border-toast-error-border',
    warning: 'bg-toast-warning-bg text-toast-warning-text border-toast-warning-border',
    info: 'bg-toast-info-bg text-toast-info-text border-toast-info-border',
  }

  // Default icons based on variant
  const getDefaultIcon = () => {
    if (icon) return icon
    
    const iconProps = { 
      className: cn('h-[var(--toast-icon-size)] w-[var(--toast-icon-size)]'),
      'aria-hidden': true 
    }
    
    switch (variant) {
    case 'success':
      return <CheckCircle {...iconProps} />
    case 'warning':
      return <AlertTriangle {...iconProps} />
    case 'error':
      return <AlertCircle {...iconProps} />
    case 'info':
      return <Info {...iconProps} />
    default:
      return null
    }
  }

  return (
    <ToastPrimitives.Root
      className={cn(
        'group pointer-events-auto relative flex w-full max-w-[var(--toast-width)] items-start',
        'overflow-hidden rounded-[var(--toast-border-radius)] border shadow-[var(--toast-shadow)]',
        'data-[swipe=move]:transition-none',
        'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]',
        'data-[swipe=end]:animate-swipeOut',
        'data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex flex-1 items-start gap-[var(--toast-gap)] p-[var(--toast-padding)]">
        {getDefaultIcon() && (
          <div className="flex-shrink-0 pt-0.5">
            {getDefaultIcon()}
          </div>
        )}
        
        <div className="flex flex-1 flex-col gap-1">
          {title && (
            <ToastPrimitives.Title className="text-[var(--toast-font-size)] font-[var(--toast-title-font-weight)] leading-[var(--toast-line-height)]">
              {title}
            </ToastPrimitives.Title>
          )}
          
          {children && (
            <ToastPrimitives.Description className="text-[var(--toast-font-size)] leading-[var(--toast-line-height)] opacity-[var(--toast-description-opacity)]">
              {children}
            </ToastPrimitives.Description>
          )}
          
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </div>
      </div>
      
      <ToastPrimitives.Close 
        className={cn(
          'absolute right-2 top-2 rounded-md p-1',
          'text-foreground/50 opacity-0 transition-opacity',
          'hover:text-foreground focus:opacity-100 focus:outline-none',
          'group-hover:opacity-100'
        )}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </ToastPrimitives.Close>
    </ToastPrimitives.Root>
  )
}

/**
 * Enhanced props for ToastAction component
 */
export interface ToastActionProps extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>, 'altText'> {
  /**
   * Text content of the action button
   */
  children: React.ReactNode
  /**
   * Accessibility text describing the action
   */
  altText?: string
}

/**
 * Action button for a Toast to provide a user action (like Undo)
 */
export function ToastAction({
  className,
  children,
  altText,
  ...props
}: ToastActionProps) {
  return (
    <ToastPrimitives.Action
      className={cn(
        'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium',
        'bg-secondary text-secondary-foreground',
        'hover:opacity-[var(--toast-action-hover-opacity)]',
        'focus:outline-none focus:ring-2 focus:ring-ring',
        'transition-opacity',
        className
      )}
      // Use children as altText if not explicitly provided for better accessibility
      altText={altText || (typeof children === 'string' ? children : 'Toast action')}
      {...props}
    >
      {children}
    </ToastPrimitives.Action>
  )
}

/**
 * Toast provider wrapper
 */
export const ToastProvider = ToastPrimitives.Provider

/**
 * Toast viewport component that determines where toasts will appear
 */
export function ToastViewport({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>) {
  return (
    <ToastPrimitives.Viewport
      className={cn(
        'fixed z-[var(--toast-z-index)] flex flex-col gap-4 p-4 max-h-screen',
        className
      )}
      {...props}
    />
  )
}

// We only re-export Radix UI types that don't conflict with our own
export type { ToastDescriptionProps, ToastTitleProps } from '@radix-ui/react-toast'