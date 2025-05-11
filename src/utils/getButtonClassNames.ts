import { cn } from '@/utils/classNames'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'sm' | 'md' | 'lg'

export function getButtonClassNames({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  className?: string
}) {
  const base = [
    'inline-flex items-center justify-center',
    'font-[var(--button-font-weight)]',
    'transition-[var(--button-transition)]',
    'focus:outline-[var(--button-focus-outline)]',
    'focus:ring-[var(--button-focus-ring-width)]',
    'focus:ring-ring',
    'focus:ring-offset-[var(--button-focus-ring-offset)]',
    'disabled:opacity-[var(--button-disabled-opacity)]',
    'disabled:pointer-events-[var(--button-disabled-events)]',
    'rounded-[var(--button-border-radius)]'
  ].join(' ')

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-sm py-[var(--button-padding-y-sm)] text-sm',
    md: 'px-md py-[var(--button-padding-y-md)] text-base',
    lg: 'px-lg py-[var(--button-padding-y-lg)] text-lg',
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/[var(--button-hover-background-opacity)]',
    secondary:
      'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/[var(--button-hover-background-opacity)]',
    tertiary:
      'bg-transparent text-primary border border-primary hover:bg-primary/10',
  }

  return cn(base, sizeStyles[size], variantStyles[variant], disabled && 'cursor-[var(--button-disabled-cursor)]', className)
}
