import { SelectHTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface SelectOption {
  /**
   * Option value
   */
  value: string
  /**
   * Option label to display
   */
  label: string
  /**
   * Whether the option is disabled
   */
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * Array of select options
   */
  options: SelectOption[]
  /**
   * Error state - applies error styling
   */
  error?: boolean
  /**
   * Size of the select element
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Placeholder text (shown as disabled first option)
   */
  placeholder?: string
}

/**
 * A customizable select component using TailwindCSS and design system tokens.
 *
 * Example:
 * 
 * ```tsx
 * <Select 
 *   options={[
 *     { value: 'chocolate', label: 'Chocolate' },
 *     { value: 'strawberry', label: 'Strawberry' },
 *     { value: 'vanilla', label: 'Vanilla' }
 *   ]} 
 *   placeholder="Select a flavor..."
 * />
 * ```
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { 
      options, 
      error = false, 
      size = 'md', 
      className = '', 
      placeholder,
      ...props 
    }, 
    ref
  ): JSX.Element => {
    const sizeStyles = {
      sm: 'h-10 px-sm text-sm',
      md: 'h-10 px-md text-base',
      lg: 'h-12 px-md text-lg',
    }
    
    return (
      <select
        className={cn(
          'appearance-none rounded border bg-transparent',
          'text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'pr-lg',
          sizeStyles[size],
          error ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-ring',
          className
        )}
        ref={ref}
        style={{
          backgroundImage: 'url(\'data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e\')',
          backgroundPosition: 'calc(100% - 0.33rem) center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em',
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    )
  }
)

Select.displayName = 'Select'

export default Select