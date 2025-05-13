import { ElementType, HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

interface BaseVisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  /**
   * Additional CSS class to apply
   */
  className?: string
  
  /**
   * Content to hide visually but keep accessible to screen readers
   */
  children: React.ReactNode
  
  /**
   * HTML "for" attribute - used when rendering as a label
   */
  htmlFor?: string
}

interface AsComponentProps extends BaseVisuallyHiddenProps {
  /**
   * Render the visually hidden content as a different HTML element
   * @default 'span'
   */
  as?: ElementType
}

export type VisuallyHiddenProps = AsComponentProps

/**
 * VisuallyHidden component that hides content visually while keeping it
 * accessible to screen readers. Essential for accessibility.
 *
 * Example:
 *
 * ```tsx
 * <button>
 *   <VisuallyHidden>Close dialog</VisuallyHidden>
 *   <XIcon />
 * </button>
 * ```
 */
const VisuallyHidden = forwardRef<HTMLElement, VisuallyHiddenProps>(
  (
    {
      children,
      className = '',
      as: Component = 'span',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Using common sr-only pattern implemented with Tailwind classes 
          'absolute w-px h-px p-0 -m-px overflow-hidden',
          'whitespace-nowrap border-0',
          // clip is deprecated but needed for older browsers
          'clip',
          'clip-path-[inset(50%)]',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

VisuallyHidden.displayName = 'VisuallyHidden'

export default VisuallyHidden