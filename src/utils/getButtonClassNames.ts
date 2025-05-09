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
    sm: 'px-[var(--spacing-sm)] py-[var(--button-padding-y-sm)] text-[var(--font-sm)]',
    md: 'px-[var(--spacing-md)] py-[var(--button-padding-y-md)] text-[var(--font-base)]',
    lg: 'px-[var(--spacing-lg)] py-[var(--button-padding-y-lg)] text-[var(--font-lg)]',
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/[var(--button-hover-background-opacity)]',
    secondary:
      'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]/[var(--button-hover-background-opacity)]',
    tertiary:
      'bg-transparent text-[hsl(var(--primary))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10',
  }

  return cn(base, sizeStyles[size], variantStyles[variant], disabled && 'cursor-[var(--button-disabled-cursor)]', className)
}
