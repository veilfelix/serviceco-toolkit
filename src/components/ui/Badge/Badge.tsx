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
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
    secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
    outline: 'border border-[hsl(var(--input))] bg-transparent text-[hsl(var(--foreground))]',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    danger: 'bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-[var(--spacing-sm)] py-[0.25rem] text-[var(--font-sm)] font-medium',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}