import { ElementType, HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

interface BaseAspectRatioProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to display in the aspect ratio container
   */
  children: React.ReactNode
  /**
   * The ratio to maintain, expressed as width/height (e.g., 16/9, 1, 4/3)
   * @default 1
   */
  ratio?: number
  /**
   * Additional CSS class to apply
   */
  className?: string
}

interface AsComponentProps extends BaseAspectRatioProps {
  /**
   * Render the container as a different HTML element
   * @default 'div'
   */
  as?: ElementType
}

export type AspectRatioProps = AsComponentProps

/**
 * AspectRatio component that locks its children into a consistent aspect ratio.
 * Useful for videos, image previews, or embed containers.
 *
 * Example:
 *
 * ```tsx
 * <AspectRatio ratio={16/9}>
 *   <img src="/image.jpg" alt="An image with 16:9 aspect ratio" />
 * </AspectRatio>
 * ```
 *
 * Common ratios:
 * - Square: 1/1 or 1
 * - Standard TV: 4/3
 * - Widescreen: 16/9
 * - Ultrawide: 21/9
 * - Portrait: 2/3 or 3/4
 * - Landscape: 3/2
 * - Common photos: 3/2, 4/3
 */
const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(
  (
    {
      children,
      ratio = 1,
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn('relative w-full', className)}
        style={{
          paddingBottom: `${(1 / ratio) * 100}%`
        }}
        {...props}
      >
        <div className="absolute inset-0 h-full w-full">
          {children}
        </div>
      </Component>
    )
  }
)

AspectRatio.displayName = 'AspectRatio'

export default AspectRatio