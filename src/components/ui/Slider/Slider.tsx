import { forwardRef, useEffect, useRef, useState, KeyboardEvent, useCallback } from 'react'
import { cn } from '@/utils/classNames'
import VisuallyHidden from '@/components/a11y/VisuallyHidden/VisuallyHidden'

export type SliderSize = 'sm' | 'md' | 'lg'
export type SliderVariant = 'default' | 'primary' | 'secondary'

export interface SliderProps {
  /**
   * Current value of the slider (for single-value slider)
   */
  value?: number

  /**
   * Range values for dual-handle slider (overrides value when provided)
   */
  range?: [number, number]

  /**
   * Callback when slider value changes for single value
   */
  onChange?: (value: number) => void

  /**
   * Callback when slider range changes for dual handles
   */
  onRangeChange?: (range: [number, number]) => void

  /**
   * Minimum value of the slider
   * @default 0
   */
  min?: number

  /**
   * Maximum value of the slider
   * @default 100
   */
  max?: number

  /**
   * Step size for value changes
   * @default 1
   */
  step?: number

  /**
   * Size variant of the slider
   * @default 'md'
   */
  size?: SliderSize

  /**
   * Color variant of the slider
   * @default 'default'
   */
  variant?: SliderVariant

  /**
   * Label for the slider (for accessibility)
   */
  label?: string

  /**
   * Format function for displaying values in tooltip and aria-valuetext
   */
  formatValue?: (value: number) => string

  /**
   * Whether to show the tooltip with current value
   * @default false
   */
  showTooltip?: boolean | 'always' | 'focus'

  /**
   * Whether to show min and max labels
   * @default false
   */
  showMinMaxLabels?: boolean

  /**
   * Whether to show ticks on the track
   * @default false
   */
  showTicks?: boolean

  /**
   * Number of ticks to show (evenly distributed)
   * @default 5
   */
  tickCount?: number

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Additional CSS class to apply
   */
  className?: string

  /**
   * ID for the slider element
   */
  id?: string
}

/**
 * Slider component providing single or range value selection with accessibility support
 * and various visual customization options.
 *
 * Features:
 * - Single or range value selection
 * - Customizable min, max, and step values
 * - Different sizes and color variants
 * - Optional tooltips, labels, and tick marks
 * - Full keyboard navigation and screen reader support
 *
 * Example:
 * ```tsx
 * // Single value slider
 * <Slider
 *   value={50}
 *   onChange={setValue}
 *   label="Volume"
 *   showTooltip
 * />
 *
 * // Range slider
 * <Slider
 *   range={[25, 75]}
 *   onRangeChange={setRange}
 *   min={0}
 *   max={100}
 *   step={5}
 *   label="Price range"
 *   showMinMaxLabels
 * />
 * ```
 */
const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  value = 0,
  range,
  onChange,
  onRangeChange,
  min = 0,
  max = 100,
  step = 1,
  size = 'md',
  variant = 'default',
  label,
  formatValue,
  showTooltip = false,
  showMinMaxLabels = false,
  showTicks = false,
  tickCount = 5,
  disabled = false,
  className = '',
  id,
  ...props
}, ref) => {
  // Refs for DOM elements
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([])
  
  // Internal state for active thumb and tooltip visibility
  const [activeThumbIndex, setActiveThumbIndex] = useState<number | null>(null)
  const [tooltipVisible, setTooltipVisible] = useState<boolean[]>(
    range ? [false, false] : [false]
  )
  
  // Handle controlled values for single or range mode
  const isRangeSlider = !!range
  const currentValues = isRangeSlider ? range : [value]
  
  // Format value for display
  const formatValueFn = formatValue || ((val: number) => val.toString())
  
  // Calculate percentage position from value
  const valueToPercent = (val: number): number => {
    return ((val - min) / (max - min)) * 100
  }
  
  // Calculate value from percentage position
  const percentToValue = (percent: number): number => {
    // Get raw value based on percentage
    const rawValue = min + ((max - min) * percent) / 100
    
    // Apply step constraints
    const steppedValue = Math.round(rawValue / step) * step
    
    // Ensure value is within bounds and properly quantized
    return Math.max(min, Math.min(max, steppedValue))
  }
  
  // Handle track clicking
  const handleTrackClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !trackRef.current) return
    
    // Calculate percent based on click position
    const rect = trackRef.current.getBoundingClientRect()
    const percent = ((event.clientX - rect.left) / rect.width) * 100
    const newValue = percentToValue(percent)
    
    if (isRangeSlider && range) {
      // For range slider, determine which handle to move
      const [rangeMin, rangeMax] = range
      
      // Find closest handle to click point
      const distanceToMin = Math.abs(valueToPercent(rangeMin) - percent)
      const distanceToMax = Math.abs(valueToPercent(rangeMax) - percent)
      
      if (distanceToMin <= distanceToMax) {
        // Move the min handle (left/first)
        onRangeChange?.([newValue, Math.max(newValue, rangeMax)])
      } else {
        // Move the max handle (right/second)
        onRangeChange?.([Math.min(newValue, rangeMin), newValue])
      }
    } else {
      // For single value slider
      onChange?.(newValue)
    }
  }
  
  // Handle thumb dragging
  const handleThumbDrag = (event: MouseEvent, thumbIndex: number) => {
    if (disabled || !trackRef.current) return
    
    const rect = trackRef.current.getBoundingClientRect()
    const percent = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    const newValue = percentToValue(percent)
    
    if (isRangeSlider && range) {
      const newRange = [...range] as [number, number]
      
      if (thumbIndex === 0) {
        // Left/min thumb
        newRange[0] = Math.min(newValue, range[1])
      } else {
        // Right/max thumb
        newRange[1] = Math.max(newValue, range[0])
      }
      
      onRangeChange?.(newRange)
    } else {
      onChange?.(newValue)
    }
  }
  
  // Handle keyboard navigation for better accessibility
  const handleThumbKeyDown = (event: KeyboardEvent<HTMLDivElement>, thumbIndex: number) => {
    if (disabled) return
    
    // Define how much to adjust value based on key pressed
    let adjustment = 0
    
    switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      adjustment = -step
      event.preventDefault()
      break
    case 'ArrowRight':
    case 'ArrowUp':
      adjustment = step
      event.preventDefault()
      break
    case 'PageUp':
      adjustment = step * 10
      event.preventDefault()
      break
    case 'PageDown':
      adjustment = -step * 10
      event.preventDefault()
      break
    case 'Home':
      // Set to min value
      if (isRangeSlider && range) {
        const newRange = [...range] as [number, number]
        newRange[thumbIndex] = thumbIndex === 0 ? min : range[0]
        onRangeChange?.(newRange)
      } else {
        onChange?.(min)
      }
      event.preventDefault()
      return
    case 'End':
      // Set to max value
      if (isRangeSlider && range) {
        const newRange = [...range] as [number, number]
        newRange[thumbIndex] = thumbIndex === 1 ? max : range[1]
        onRangeChange?.(newRange)
      } else {
        onChange?.(max)
      }
      event.preventDefault()
      return
    default:
      return
    }
    
    // Apply the adjustment
    if (isRangeSlider && range) {
      const newRange = [...range] as [number, number]
      const newValue = Math.max(min, Math.min(max, newRange[thumbIndex] + adjustment))
      
      if (thumbIndex === 0) {
        // Left/min thumb, can't go beyond the max thumb
        newRange[0] = Math.min(newValue, range[1])
      } else {
        // Right/max thumb, can't go below the min thumb
        newRange[1] = Math.max(newValue, range[0])
      }
      
      onRangeChange?.(newRange)
    } else {
      const newValue = Math.max(min, Math.min(max, value + adjustment))
      onChange?.(newValue)
    }
  }
  
  // Start dragging when mousedown on thumb
  const handleThumbMouseDown = (event: React.MouseEvent, thumbIndex: number) => {
    if (disabled) return
    
    event.preventDefault()
    setActiveThumbIndex(thumbIndex)

    thumbRefs.current[thumbIndex]?.focus()
    
    const handleMouseMove = (e: MouseEvent) => {
      handleThumbDrag(e, thumbIndex)
    }
    
    const handleMouseUp = () => {
      setActiveThumbIndex(null)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  // Handle focus events for tooltips
  const handleThumbFocus = (index: number) => {
    if (showTooltip === 'focus' || showTooltip === true || showTooltip === 'always') {
      setTooltipVisible(prev => {
        const newState = [...prev]
        newState[index] = true
        return newState
      })
    }
  }
  
  const handleThumbBlur = (index: number) => {
    if (showTooltip === 'focus' || showTooltip === true) {
      setTooltipVisible(prev => {
        const newState = [...prev]
        newState[index] = false
        return newState
      })
    }
  }
  
  // Update tooltip visibility based on props
  useEffect(() => {
    if (showTooltip === 'always') {
      setTooltipVisible(range ? [true, true] : [true])
    }
  }, [showTooltip, range])
  
  // Generate ticks if enabled
  const renderTicks = useCallback(() => {
    if (!showTicks) return null
    
    const ticks = []
    for (let i = 0; i < tickCount; i++) {
      const percent = (i / (tickCount - 1)) * 100
      ticks.push(
        <div 
          key={i}
          className="absolute top-1/2 h-1.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-muted-foreground/50"
          style={{ left: `${percent}%` }}
          aria-hidden="true"
        />
      )
    }
    return ticks
  }, [showTicks, tickCount])
  
  // Size variants for track
  const trackSizeClasses: Record<SliderSize, string> = {
    sm: 'h-[0.125rem]',
    md: 'h-[var(--slider-track-height)]',
    lg: 'h-[0.375rem]',
  }
  
  // Size variants for thumb
  const thumbSizeClasses: Record<SliderSize, string> = {
    sm: 'h-3 w-3',
    md: 'h-[var(--slider-thumb-size)] w-[var(--slider-thumb-size)]',
    lg: 'h-5 w-5',
  }
  
  // Color variants
  const variantClasses: Record<SliderVariant, { track: string, range: string, thumb: string }> = {
    default: {
      track: 'bg-slider-track',
      range: 'bg-slider-range',
      thumb: 'bg-slider-thumb border-slider-thumb-border',
    },
    primary: {
      track: 'bg-muted',
      range: 'bg-primary',
      thumb: 'bg-white border-primary',
    },
    secondary: {
      track: 'bg-muted',
      range: 'bg-secondary',
      thumb: 'bg-white border-secondary',
    },
  }
  
  // Calculate position for each thumb
  const thumbPositions = currentValues.map(val => valueToPercent(val))
  
  // For range slider, calculate the width and position of the range fill
  const rangeWidth = isRangeSlider ? thumbPositions[1] - thumbPositions[0] : thumbPositions[0]
  const rangeLeft = isRangeSlider ? thumbPositions[0] : 0
  
  // Generate unique ID for the slider if not provided
  const sliderId = id || `slider-${Math.random().toString(36).substring(2, 11)}`
  
  // Reference to which elements get rendered
  const thumbElements = isRangeSlider ? [0, 1] : [0]
  
  return (
    <div className={cn('w-full', className)} ref={ref} {...props}>
      {label && (
        <label 
          htmlFor={sliderId} 
          className={cn(
            'mb-1.5 block text-sm font-medium',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {label}
        </label>
      )}
      
      <div 
        className={cn(
          'relative py-2',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {/* Main track */}
        <div
          ref={trackRef}
          className={cn(
            'relative w-full rounded-full',
            trackSizeClasses[size],
            variantClasses[variant].track,
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          )}
          onClick={handleTrackClick}
          role="presentation"
        >
          {/* Filled range */}
          <div
            className={cn(
              'absolute h-full rounded-full',
              variantClasses[variant].range
            )}
            style={{
              left: `${rangeLeft}%`,
              width: `${rangeWidth}%`
            }}
            aria-hidden="true"
          />
          
          {/* Tick marks */}
          {renderTicks()}
          
          {/* Thumb(s) */}
          {thumbElements.map((_, index) => (
            <div
              key={index}
              ref={(el: HTMLDivElement | null): void => {
                thumbRefs.current[index] = el
              }}              
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={currentValues[index]}
              aria-valuetext={formatValueFn(currentValues[index])}
              aria-label={label || `Slider ${isRangeSlider ? (index === 0 ? 'minimum' : 'maximum') : 'value'}`}
              aria-disabled={disabled}
              aria-orientation="horizontal"
              className={cn(
                'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2',
                thumbSizeClasses[size],
                variantClasses[variant].thumb,
                activeThumbIndex === index && 'z-10 shadow-[var(--slider-thumb-shadow)]',
                disabled ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing', 
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
              style={{
                left: `${thumbPositions[index]}%`
              }}
              onMouseDown={e => handleThumbMouseDown(e, index)}
              onKeyDown={e => handleThumbKeyDown(e, index)}
              onFocus={() => handleThumbFocus(index)}
              onBlur={() => handleThumbBlur(index)}
            >
              {tooltipVisible[index] && (
                <div
                  className={cn(
                    'absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1',
                    'text-xs font-semibold text-white shadow-md'
                  )}
                >
                  {formatValueFn(currentValues[index])}
                  <div
                    className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground"
                    aria-hidden="true"
                  />
                </div>
              )}
              
              <VisuallyHidden>
                {isRangeSlider
                  ? `${index === 0 ? 'Minimum' : 'Maximum'} value: ${formatValueFn(currentValues[index])}`
                  : `Value: ${formatValueFn(currentValues[index])}`
                }
              </VisuallyHidden>
            </div>
          ))}
        </div>
        
        {/* Min/Max labels */}
        {showMinMaxLabels && (
          <div className="mt-1 flex w-full justify-between">
            <span className="text-xs text-muted-foreground">{formatValueFn(min)}</span>
            <span className="text-xs text-muted-foreground">{formatValueFn(max)}</span>
          </div>
        )}
      </div>
    </div>
  )
})

Slider.displayName = 'Slider'

export default Slider