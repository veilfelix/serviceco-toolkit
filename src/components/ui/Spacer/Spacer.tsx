import { ElementType, HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg'
export type SpacerOrientation = 'horizontal' | 'vertical'

interface BaseSpacerProps extends HTMLAttributes<HTMLElement> {
  /**
   * The size of the spacer - controls the amount of visual separation
   * @default 'md'
   */
  size?: SpacerSize
  /**
   * The orientation of the spacer - determines if it creates horizontal or vertical space
   * @default 'vertical'
   */
  orientation?: SpacerOrientation
  /**
   * Additional CSS class to apply
   */
  className?: string
}

interface AsComponentProps extends BaseSpacerProps {
  /**
   * Render the spacer as a different HTML element
   * @default 'div'
   */
  as?: ElementType
}

export type SpacerProps = AsComponentProps

/**
 * Spacer component to create visual separation between elements.
 * By default, it creates vertical spacing. For horizontal spacing, set `orientation="horizontal"`.
 *
 * Example:
 *
 * ```tsx
 * <Heading>First Section</Heading>
 * <Text>Some content here...</Text>
 * 
 * <Spacer size="lg" />
 * 
 * <Heading>Second Section</Heading>
 * <Text>More content here...</Text>
 * ```
 *
 * For horizontal spacing within inline elements:
 * 
 * ```tsx
 * <div className="flex items-center">
 *   <Icon name="info" />
 *   <Spacer orientation="horizontal" size="sm" />
 *   <Text>Important information</Text>
 * </div>
 * ```
 */
const Spacer = forwardRef<HTMLElement, SpacerProps>(
  (
    {
      size = 'md',
      orientation = 'vertical',
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    // Size utilities based on the theme tokens
    const sizeStyles: Record<SpacerSize, string> = {
      xs: orientation === 'vertical' ? 'h-xs' : 'w-xs',
      sm: orientation === 'vertical' ? 'h-sm' : 'w-sm',
      md: orientation === 'vertical' ? 'h-md' : 'w-md',
      lg: orientation === 'vertical' ? 'h-lg' : 'w-lg'
    }

    // Additional styles based on orientation
    const orientationStyles = orientation === 'horizontal' ? 'inline-block' : 'block w-full'

    return (
      <Component
        ref={ref}
        className={cn(
          'flex-shrink-0',
          sizeStyles[size], 
          orientationStyles,
          className
        )}
        aria-hidden="true"
        {...props}
      />
    )
  }
)

Spacer.displayName = 'Spacer'

export default Spacer