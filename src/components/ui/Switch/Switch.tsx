import { InputHTMLAttributes, forwardRef, JSX, useId } from 'react'
import { cn } from '@/utils/classNames'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked'> {
  /**
   * Whether the switch is checked
   */
  checked: boolean
  /**
   * Callback when the switch is toggled
   */
  onCheckedChange: (checked: boolean) => void
  /**
   * Label for the switch (optional)
   */
  label?: string
  /**
   * Whether the switch is disabled
   */
  disabled?: boolean
  /**
   * Size of the switch
   */
  visualSize?: 'sm' | 'md' | 'lg'
  /**
   * Additional CSS classes for the container
   */
  className?: string
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string
  /**
   * Position of the label
   */
  labelPosition?: 'left' | 'right'
}

/**
 * A customizable switch/toggle component using TailwindCSS and design system tokens.
 *
 * Example:
 * 
 * ```tsx
 * const [checked, setChecked] = useState(false)
 * 
 * <Switch 
 *   checked={checked} 
 *   onCheckedChange={setChecked} 
 *   label="Airplane mode"
 * />
 * ```
 */
const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    checked,
    onCheckedChange,
    label,
    disabled = false,
    visualSize = 'md',
    className = '',
    labelClassName = '',
    labelPosition = 'right',
    id: propId,
    ...props
  }, ref): JSX.Element => {
    const generatedId = useId()
    const id = propId ?? generatedId

    
    const sizeStyles = {
      sm: {
        track: 'h-4 w-7',
        thumb: 'h-3 w-3',
        translate: 'translate-x-3',
      },
      md: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      lg: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onCheckedChange(e.target.checked)
      }
    }
    
    const switchElement = (
      <div className={cn('inline-flex items-center', className)}>
        <span className="sr-only">{label || 'Switch'}</span>
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            ref={ref}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div 
            className={cn(
              'peer-focus-visible:ring-2 peer-focus-visible:ring-[hsl(var(--ring))] peer-focus-visible:ring-offset-2',
              'rounded-full transition-colors',
              'bg-[hsl(var(--input))] peer-checked:bg-[hsl(var(--primary))]',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              sizeStyles[visualSize].track
            )}
          />
          <div 
            className={cn(
              'absolute top-[2px] left-[2px]',
              'rounded-full bg-white transition-transform',
              'peer-checked:' + sizeStyles[visualSize].translate,
              sizeStyles[visualSize].thumb
            )}
          />
        </div>
      </div>
    )
    
    if (!label) {
      return switchElement
    }
    
    return (
      <div className={cn(
        'flex items-center gap-2',
        labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
      )}>
        {switchElement}
        <label 
          htmlFor={id}
          className={cn(
            'text-[var(--font-base)] text-foreground select-none',
            disabled && 'opacity-50 cursor-not-allowed',
            labelClassName
          )}
        >
          {label}
        </label>
      </div>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch