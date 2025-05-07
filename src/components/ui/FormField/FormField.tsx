import { HTMLAttributes, ReactNode, JSX } from 'react'
import { cn } from '@/utils/classNames'
import Label from '@/components/ui/Label/Label'
import FormError from '@/components/ui/FormError/FormError'

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Form field label
   */
  label: string
  /**
   * Unique identifier for the form field and label
   */
  id: string
  /**
   * Form field children (usually an input component)
   */
  children: ReactNode
  /**
   * Whether the field is required
   */
  required?: boolean
  /**
   * Error message to display
   */
  error?: string
  /**
   * Additional CSS classes for the field container
   */
  className?: string
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string
  /**
   * Optional helper text to display below the field
   */
  helperText?: string
}

/**
 * A compound form field component that combines a label, input, and error message.
 *
 * Example:
 * 
 * ```tsx
 * <FormField label="Email" id="email" required>
 *   <Input type="email" placeholder="Enter your email" />
 * </FormField>
 * 
 * <FormField label="Message" id="message" error="Please enter a message">
 *   <Textarea placeholder="Enter your message" />
 * </FormField>
 * ```
 */
export default function FormField({
  label,
  id,
  children,
  required = false,
  error,
  className = '',
  labelClassName = '',
  helperText,
  ...rest
}: FormFieldProps): JSX.Element {
  const hasError = Boolean(error)
  
  return (
    <div 
      className={cn('flex flex-col gap-1 mb-[var(--spacing-md)]', className)}
      {...rest}
    >
      <Label 
        htmlFor={id} 
        required={required} 
        error={hasError}
        className={labelClassName}
      >
        {label}
      </Label>
      
      {children}
      
      {helperText && !hasError && (
        <p className="text-[var(--font-sm)] text-[hsl(var(--muted-foreground))]">
          {helperText}
        </p>
      )}
      
      {hasError && <FormError>{error}</FormError>}
    </div>
  )
}