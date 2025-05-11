import { InputHTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'
import Label from '../Label/Label'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Text label to display next to the checkbox
   */
  label?: string
  /**
   * Error state - applies error styling
   */
  error?: boolean
  /**
   * Additional CSS classes for the container
   */
  className?: string
  /**
   * Additional CSS classes for the input element
   */
  inputClassName?: string
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string
}

/**
 * A customizable checkbox component using TailwindCSS and design system tokens.
 *
 * Example:
 *
 * ```tsx
 * <Checkbox label="Remember me" />
 * <Checkbox label="I agree to the terms and conditions" required />
 * ```
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    inputClassName,
    labelClassName,
    label, 
    error, 
    id,
    required,
    ...props 
  }, ref): JSX.Element => {
    return (
      <div className={cn('flex items-start space-x-2', className)}>
        <input
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'text-destructive border-destructive focus:ring-destructive' : 'text-primary border-input focus:ring-ring',
            inputClassName
          )}
          ref={ref}
          id={id}
          {...props}
        />
        {label && (
          <Label 
            htmlFor={id} 
            required={required}
            className={cn(
              'text-base select-none',
              error ? 'text-destructive' : 'text-foreground',
              props.disabled && 'opacity-50 cursor-not-allowed',
              labelClassName
            )}
            error={!!error}
          >
            {label}
          </Label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox