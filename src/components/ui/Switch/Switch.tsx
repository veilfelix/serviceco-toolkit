import { InputHTMLAttributes, forwardRef, JSX, useId } from 'react'
import { cn } from '@/utils/classNames'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Whether the switch is checked
   */
  checked?: boolean
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
  (
    {
      checked = false,
      onCheckedChange,
      label,
      disabled = false,
      visualSize = 'md',
      className = '',
      labelClassName = '',
      labelPosition = 'right',
      id: propId,
      ...props
    },
    ref
  ): JSX.Element => {
    const generatedId = useId()
    const id = propId ?? generatedId

    const sizeStyles = {
      sm: {
        track: 'h-[var(--switch-sm-track-height)] w-[var(--switch-sm-track-width)]',
        thumb: 'h-[var(--switch-sm-thumb-size)] w-[var(--switch-sm-thumb-size)]',
        translate: 'translate-x-[var(--switch-sm-translate)]',
      },
      md: {
        track: 'h-[var(--switch-md-track-height)] w-[var(--switch-md-track-width)]',
        thumb: 'h-[var(--switch-md-thumb-size)] w-[var(--switch-md-thumb-size)]',
        translate: 'translate-x-[var(--switch-md-translate)]',
      },
      lg: {
        track: 'h-[var(--switch-lg-track-height)] w-[var(--switch-lg-track-width)]',
        thumb: 'h-[var(--switch-lg-thumb-size)] w-[var(--switch-lg-thumb-size)]',
        translate: 'translate-x-[var(--switch-lg-translate)]',
      },
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(e.target.checked)
      }
    }

    return (
      <label
        htmlFor={id}
        className={cn(
          'inline-flex items-center gap-2 cursor-pointer',
          labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
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
              'block rounded-full transition-colors bg-input',
              'peer-checked:bg-primary',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
              'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
              sizeStyles[visualSize].track
            )}
          />
          <div
            className={cn(
              'absolute top-[2px] left-[2px] rounded-full bg-white transition-transform',
              sizeStyles[visualSize].thumb,
              checked && sizeStyles[visualSize].translate
            )}
          />
        </div>
        {label && (
          <span
            className={cn(
              'text-base text-foreground select-none',
              labelClassName
            )}
          >
            {label}
          </span>
        )}
      </label>
    )
  }
)

Switch.displayName = 'Switch'

export default Switch
