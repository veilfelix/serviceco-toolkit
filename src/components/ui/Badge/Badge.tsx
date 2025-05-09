import { HTMLAttributes, JSX } from 'react'
import { cn } from '@/utils/classNames'

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge content
   */
  children: React.ReactNode
  /**
   * Badge variant
   */
  variant?: BadgeVariant
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A customizable badge component using TailwindCSS and design system tokens.
 *
 * Example:
 *
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="outline">Outline</Badge>
 * <Badge variant="success">Success</Badge>
 * ```
 */
export default function Badge({
  children,
  variant = 'primary',
  className = '',
  ...props
}: BadgeProps): JSX.Element {
  const variantStyles: Record<BadgeVariant, string> = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-transparent text-foreground',
    success: 'bg-badge-success-bg text-badge-success-text',
    warning: 'bg-badge-warning-bg text-badge-warning-text',
    danger: 'bg-destructive text-destructive-foreground'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-sm py-[0.25rem] text-sm font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}