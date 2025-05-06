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
  const base =
    'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded'

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-[var(--spacing-sm)] py-[0.375rem] text-[var(--font-sm)]',
    md: 'px-[var(--spacing-md)] py-[0.5rem] text-[var(--font-base)]',
    lg: 'px-[var(--spacing-lg)] py-[0.75rem] text-[var(--font-lg)]',
  }

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90',
    secondary:
      'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] border border-[hsl(var(--border))] hover:bg-[hsl(var(--secondary))]/90',
    tertiary:
      'bg-transparent text-[hsl(var(--primary))] border border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10',
  }

  return cn(base, sizeStyles[size], variantStyles[variant], disabled && 'cursor-not-allowed', className)
}
