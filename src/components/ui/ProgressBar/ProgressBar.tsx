import { HTMLAttributes, JSX, useMemo } from 'react'
import { cn } from '@/utils/classNames'

export type ProgressColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current value of the progress bar (0 to max)
   */
  value?: number
  /**
   * Maximum value
   * @default 100
   */
  max?: number
  /**
   * Label to display above the progress bar
   */
  label?: string
  /**
   * Whether to show percentage text beside label
   * @default false
   */
  showValueLabel?: boolean
  /**
   * Value label format function
   * @default (value, max) => `${Math.round((value / max) * 100)}%`
   */
  valueFormatter?: (value: number, max: number) => string
  /**
   * Indeterminate loading state (shows animation instead of progress)
   * @default false
   */
  indeterminate?: boolean
  /**
   * Color variant of the progress bar
   * @default 'primary'
   */
  color?: ProgressColor
  /**
   * Size of the progress bar
   * @default 'default'
   */
  size?: 'sm' | 'default' | 'lg'
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A progress bar component that can be determinate (with a numeric progress) or indeterminate.
 * 
 * Example:
 * 
 * ```tsx
 * <ProgressBar value={75} label="Loading..." color="primary" />
 * <ProgressBar indeterminate color="secondary" label="Processing" />
 * ```
 */
export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValueLabel = false,
  valueFormatter = (value, max) => `${Math.round((value / max) * 100)}%`,
  indeterminate = false,
  color = 'primary',
  size = 'default',
  className = '',
  ...props
}: ProgressBarProps): JSX.Element {
  // Normalize value if provided to be between 0 and max
  const normalizedValue = useMemo(() => {
    if (indeterminate) return 0
    return Math.max(0, Math.min(value, max))
  }, [value, max, indeterminate])

  // Calculate percentage width
  const percentage = useMemo(() => {
    return (normalizedValue / max) * 100
  }, [normalizedValue, max])

  // Size variations
  const sizeClasses = {
    sm: 'h-1',
    default: 'h-[var(--progress-height)]',
    lg: 'h-3',
  }

  // Color variations
  const colorClasses: Record<ProgressColor, string> = {
    primary: 'bg-progress-primary',
    secondary: 'bg-progress-secondary',
    success: 'bg-progress-success',
    warning: 'bg-progress-warning',
    danger: 'bg-progress-danger',
  }

  // ARIA attributes for accessibility
  const ariaProps = useMemo(() => {
    return indeterminate 
      ? { 'aria-busy': true, 'aria-valuemin': 0, 'aria-valuemax': max }
      : { 
        'aria-valuenow': normalizedValue, 
        'aria-valuemin': 0, 
        'aria-valuemax': max,
        'aria-valuetext': valueFormatter(normalizedValue, max),
      }
  }, [indeterminate, normalizedValue, max, valueFormatter])

  return (
    <div className={cn('w-full', className)} {...props}>
      {/* Label with optional value */}
      {label && (
        <div
          className="flex items-center justify-between font-[var(--progress-label-font-weight)] text-[var(--progress-label-font-size)] mb-[var(--progress-text-margin)]"
        >
          <div>{label}</div>
          {showValueLabel && !indeterminate && (
            <div>{valueFormatter(normalizedValue, max)}</div>
          )}
        </div>
      )}


      {/* Progress bar container */}
      <div 
        className={cn(
          'w-full bg-progress-bg rounded-[var(--progress-border-radius)] overflow-hidden',
          sizeClasses[size],
        )}
        role="progressbar"
        {...ariaProps}
      >
        {/* Progress indicator */}
        <div
          className={cn(
            'h-full rounded-[var(--progress-border-radius)]',
            colorClasses[color],
            indeterminate ? 'w-1/3 animate-indeterminate' : ''
          )}
          style={!indeterminate ? { width: `${percentage}%` } : undefined}
        />
      </div>
    </div>
  )
}