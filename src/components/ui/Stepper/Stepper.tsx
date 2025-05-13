import { Children, HTMLAttributes, JSX, ReactNode, cloneElement, createContext, isValidElement, useContext } from 'react'
import { cn } from '@/utils/classNames'
import { CheckIcon } from 'lucide-react'

// Type for step states
export type StepState = 'inactive' | 'active' | 'complete' | 'error'

// Type for stepper orientation
export type StepperOrientation = 'horizontal' | 'vertical'

// Type for stepper size
export type StepperSize = 'sm' | 'md' | 'lg'

// Step context to track state and index
export interface StepContextValue {
  /**
   * Current state of the step
   */
  state: StepState
  /**
   * Current index of the step
   */
  index: number
  /**
   * Total number of steps
   */
  totalSteps: number
  /**
   * Whether the step is the last one
   */
  isLastStep: boolean
  /**
   * Size of the step elements
   */
  size: StepperSize
  /**
   * Orientation of the stepper
   */
  orientation: StepperOrientation
}

// Create step context
const StepContext = createContext<StepContextValue | null>(null)

// Step context hook
export const useStepContext = () => {
  const context = useContext(StepContext)
  if (!context) {
    throw new Error('Step components must be used within a Stepper component')
  }
  return context
}

// Stepper props interface
export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Active step index (0-based)
   */
  activeStep: number
  /**
   * List of step states
   */
  states?: StepState[]
  /**
   * Direction of the stepper - horizontal or vertical
   */
  orientation?: StepperOrientation
  /**
   * Size of step elements
   */
  size?: StepperSize
  /**
   * Child components - should be Step components
   */
  children: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A visual representation of progress through multiple steps. Supports step states, labels,
 * numbers/icons, horizontal and vertical orientation.
 *
 * Example:
 * ```tsx
 * <Stepper activeStep={1}>
 *   <Step label="Step 1">
 *     <StepIcon />
 *     <StepLabel />
 *   </Step>
 *   <Step label="Step 2">
 *     <StepIcon />
 *     <StepLabel />
 *   </Step>
 * </Stepper>
 * ```
 */
export default function Stepper({
  activeStep = 0,
  states,
  orientation = 'horizontal',
  size = 'md',
  children,
  className,
  ...props
}: StepperProps): JSX.Element {
  // Get React children array to work with
  const childrenArray = Children.toArray(children)
  const totalSteps = childrenArray.length

  // Base classes for stepper
  const stepperClasses = cn(
    'flex',
    {
      'flex-row': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
      'gap-[var(--stepper-spacing-sm)]': size === 'sm',
      'gap-[var(--stepper-spacing-md)]': size === 'md',
      'gap-[var(--stepper-spacing-lg)]': size === 'lg',
    },
    className
  )

  return (
    <div
      className={stepperClasses}
      role="navigation"
      aria-label="Progress steps"
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return null

        // Determine step state
        let stepState: StepState = 'inactive'
        
        if (states && states[index]) {
          // Use provided states if available
          stepState = states[index]
        } else {
          // Otherwise determine based on activeStep
          if (index < activeStep) stepState = 'complete'
          else if (index === activeStep) stepState = 'active'
          else stepState = 'inactive'
        }

        // Create context value for this step
        const contextValue: StepContextValue = {
          state: stepState,
          index,
          totalSteps,
          isLastStep: index === totalSteps - 1,
          size,
          orientation,
        }

        // Clone the step with additional props
        return (
          <StepContext.Provider key={index} value={contextValue}>
            {cloneElement(child)}
          </StepContext.Provider>
        )
      })}
    </div>
  )
}

// Step props interface
export interface StepProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Step label
   */
  label?: string
  /**
   * Step description
   */
  description?: string
  /**
   * Optional icon to replace the number
   */
  icon?: ReactNode
  /**
   * Children components
   */
  children?: ReactNode
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Individual step component for the Stepper
 */
export function Step({
  label,
  description,
  icon,
  onClick,
  children,
  className,
  ...props
}: StepProps): JSX.Element {
  const { state, orientation } = useStepContext()
  
  // If children are provided, use them otherwise create default structure
  const hasChildren = Children.count(children) > 0

  // Base step classes
  const stepClasses = cn(
    'relative flex',
    {
      'flex-row items-start': orientation === 'horizontal',
      'flex-col': orientation === 'vertical',
      'cursor-pointer': onClick !== undefined,
    },
    className
  )

  return (
    <div
      className={stepClasses}
      role="group"
      aria-current={state === 'active' ? 'step' : undefined}
      aria-label={label}
      onClick={onClick}
      {...props}
    >
      {hasChildren ? (
        children
      ) : (
        <>
          <StepIcon icon={icon} />
          {(label || description) && (
            <div className={cn('flex flex-col', {
              'ml-3': orientation === 'horizontal',
              'mt-3': orientation === 'vertical',
            })}>
              {label && <StepLabel>{label}</StepLabel>}
              {description && <StepDescription>{description}</StepDescription>}
            </div>
          )}
        </>
      )}
    </div>
  )
}

// StepIcon props interface
export interface StepIconProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Custom icon to display instead of number
   */
  icon?: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Icon component for a step (number or custom icon)
 */
export function StepIcon({
  icon,
  className,
  ...props
}: StepIconProps): JSX.Element {
  const { state, index, size } = useStepContext()

  // Style mappings
  const stateStyles: Record<StepState, string> = {
    inactive: 'bg-stepper-inactive-bg text-stepper-inactive-text',
    active: 'bg-stepper-active-bg text-stepper-active-text',
    complete: 'bg-stepper-complete-bg text-stepper-complete-text',
    error: 'bg-stepper-error-bg text-stepper-error-text',
  }

  const sizeStyles: Record<StepperSize, string> = {
    sm: 'h-[var(--stepper-icon-size-sm)] w-[var(--stepper-icon-size-sm)] text-[var(--stepper-font-size-sm)]',
    md: 'h-[var(--stepper-icon-size-md)] w-[var(--stepper-icon-size-md)] text-[var(--stepper-font-size-md)]',
    lg: 'h-[var(--stepper-icon-size-lg)] w-[var(--stepper-icon-size-lg)] text-[var(--stepper-font-size-lg)]',
  }

  // Icon classes
  const iconClasses = cn(
    'flex items-center justify-center rounded-[var(--stepper-border-radius)]',
    'shrink-0 transition-colors duration-[var(--stepper-transition-duration)]',
    'font-medium z-10',
    stateStyles[state],
    sizeStyles[size],
    className
  )

  // Content based on state
  const displayIcon = () => {
    if (icon) return icon
    if (state === 'complete') return <CheckIcon className="w-3/5 h-3/5" />
    return <span aria-hidden="true">{index + 1}</span>
  }

  return (
    <div
      className={iconClasses}
      aria-hidden="true"
      {...props}
    >
      {displayIcon()}
    </div>
  )
}

// StepLabel props interface
export interface StepLabelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Label content
   */
  children: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Label component for a step
 */
export function StepLabel({
  children,
  className,
  ...props
}: StepLabelProps): JSX.Element {
  const { state, size } = useStepContext()

  // Style mappings
  const stateStyles: Record<StepState, string> = {
    inactive: 'text-stepper-inactive-text',
    active: 'text-foreground',
    complete: 'text-foreground',
    error: 'text-stepper-error-bg',
  }

  const sizeStyles: Record<StepperSize, string> = {
    sm: 'text-[var(--stepper-font-size-sm)]',
    md: 'text-[var(--stepper-font-size-md)]',
    lg: 'text-[var(--stepper-font-size-lg)]',
  }

  // Label classes
  const labelClasses = cn(
    'font-[var(--stepper-label-font-weight)] transition-colors duration-[var(--stepper-transition-duration)]',
    stateStyles[state],
    sizeStyles[size],
    className
  )

  return (
    <div className={labelClasses} {...props}>
      {children}
    </div>
  )
}

// StepDescription props interface
export interface StepDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Description content
   */
  children: ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Description component for a step
 */
export function StepDescription({
  children,
  className,
  ...props
}: StepDescriptionProps): JSX.Element {
  const { state, size } = useStepContext()

  // Size styles mapping
  const sizeStyles: Record<StepperSize, string> = {
    sm: 'text-[calc(var(--stepper-font-size-sm)-0.125rem)]',
    md: 'text-[calc(var(--stepper-font-size-md)-0.125rem)]',
    lg: 'text-[calc(var(--stepper-font-size-lg)-0.125rem)]',
  }

  // Description classes
  const descriptionClasses = cn(
    'text-stepper-description font-[var(--stepper-description-font-weight)]',
    {
      'opacity-[var(--stepper-disabled-opacity)]': state === 'inactive',
    },
    sizeStyles[size],
    className
  )

  return (
    <div className={descriptionClasses} {...props}>
      {children}
    </div>
  )
}