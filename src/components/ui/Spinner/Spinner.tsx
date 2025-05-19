import { HTMLAttributes, JSX } from 'react'
import { cn } from '@/utils/classNames'

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl'
export type SpinnerVariant = 'primary' | 'secondary' | 'muted' | 'white'
export type SpinnerLayout = 'inline' | 'center'

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Spinner size
   */
  size?: SpinnerSize
  /**
   * Spinner color variant
   */
  variant?: SpinnerVariant
  /**
   * Additional CSS class names
   */
  className?: string
  /**
   * Aria label for screen readers (defaults to "Loading")
   */
  ariaLabel?: string
  /**
   * Layout mode - inline (default) or centered
   */
  layout?: SpinnerLayout
}

/**
 * A customizable loading spinner component using TailwindCSS and design system tokens.
 * Supports different sizes, colors, and can be displayed inline or centered.
 *
 * Example:
 *
 * ```tsx
 * <Spinner /> 
 * <Spinner size="lg" variant="secondary" />
 * <Spinner variant="white" layout="center" />
 * <Button disabled><Spinner size="sm" variant="white" className="mr-2" />Loading...</Button>
 * ```
 */
export default function Spinner({
  size = 'md',
  variant = 'primary',
  className = '',
  ariaLabel = 'Loading',
  layout = 'inline',
  ...props
}: SpinnerProps): JSX.Element {
  const sizeStyles: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-4',
    xl: 'h-12 w-12 border-4'
  }

  const variantStyles: Record<SpinnerVariant, string> = {
    primary: 'border-primary/30 border-t-primary',
    secondary: 'border-secondary/30 border-t-secondary',
    muted: 'border-muted-foreground/30 border-t-muted-foreground',
    white: 'border-white/30 border-t-white'
  }

  const layoutStyles: Record<SpinnerLayout, string> = {
    inline: 'inline-block',
    center: 'mx-auto block'
  }

  return (
    <div
      className={cn(
        'animate-spin rounded-full',
        sizeStyles[size],
        variantStyles[variant],
        layoutStyles[layout],
        className
      )}
      role="status"
      aria-label={ariaLabel}
      {...props}
    >
      <span className="sr-only">{ariaLabel}</span>
    </div>
  )
}