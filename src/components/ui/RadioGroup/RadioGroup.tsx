import { InputHTMLAttributes, JSX, createContext, useContext, useId } from 'react'
import { cn } from '@/utils/classNames'

type RadioGroupContextType = {
  name: string
  value: string
  onChange: (value: string) => void
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined)

export interface RadioGroupProps {
  /**
   * The currently selected value in the group
   */
  value: string
  /**
   * Radio group name attribute
   */
  name?: string
  /**
   * Callback when selection changes
   */
  onChange: (value: string) => void
  /**
   * Radio options
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * RadioGroup component that manages a group of radio inputs
 *
 * Example:
 * 
 * ```tsx
 * const [value, setValue] = useState('option1')
 * 
 * <RadioGroup 
 *   value={value} 
 *   onChange={setValue} 
 *   className="space-y-2"
 * >
 *   <RadioGroup.Item value="option1" label="Option 1" />
 *   <RadioGroup.Item value="option2" label="Option 2" />
 *   <RadioGroup.Item value="option3" label="Option 3" disabled />
 * </RadioGroup>
 * ```
 */
function RadioGroup({
  value,
  onChange,
  name,
  children,
  className,
}: RadioGroupProps): JSX.Element {
  const generatedName = useId()
  const contextValue = {
    name: name || generatedName,
    value,
    onChange,
  }

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={cn('flex flex-col space-y-2', className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export interface RadioGroupItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'checked' | 'name' | 'onChange'> {
  /**
   * Value of this radio option
   */
  value: string
  /**
   * Label text to display
   */
  label: string
  /**
   * Whether the radio is disabled
   */
  disabled?: boolean
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
 * Individual radio item within a RadioGroup
 */
function RadioGroupItem({
  value,
  label,
  disabled = false,
  className,
  inputClassName,
  labelClassName,
  ...props
}: RadioGroupItemProps): JSX.Element {
  const id = useId()
  const context = useContext(RadioGroupContext)
  
  if (!context) {
    throw new Error('RadioGroupItem must be used within a RadioGroup')
  }
  
  const { name, value: groupValue, onChange } = context
  const checked = value === groupValue
  
  const handleChange = () => {
    if (!disabled) {
      onChange(value)
    }
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className={cn(
          'h-4 w-4 rounded-full border border-[hsl(var(--input))]',
          'text-[hsl(var(--primary))] focus:ring-[hsl(var(--ring))]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          'text-[var(--font-base)] text-foreground',
          disabled && 'opacity-50 cursor-not-allowed',
          labelClassName
        )}
      >
        {label}
      </label>
    </div>
  )
}

// Attach RadioGroupItem as a sub-component
RadioGroup.Item = RadioGroupItem

export default RadioGroup