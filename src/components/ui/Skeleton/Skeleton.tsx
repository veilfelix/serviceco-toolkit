import { HTMLAttributes, JSX } from 'react'
import { cn } from '@/utils/classNames'

export type SkeletonShape = 'rect' | 'text' | 'circle'
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The shape of the skeleton
   * @default 'rect'
   */
  shape?: SkeletonShape
  /**
   * The animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation
  /**
   * The width of the skeleton
   */
  width?: string | number
  /**
   * The height of the skeleton
   */
  height?: string | number
  /**
   * Number of skeleton items to render in a stack
   * @default 1
   */
  count?: number
  /**
   * Gap between multiple skeleton items
   * @default '0.5rem'
   */
  gap?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A loading placeholder component to simulate content while it's loading.
 * 
 * Supports different shapes (text, rect, circle), animations, width/height, and multiple instances.
 * 
 * Example:
 * 
 * ```tsx
 * <Skeleton shape="text" height="1rem" />
 * <Skeleton shape="circle" width="3rem" height="3rem" />
 * <Skeleton shape="rect" width="100%" height="12rem" />
 * ```
 */
export default function Skeleton({
  shape = 'rect',
  animation = 'pulse',
  width,
  height,
  count = 1,
  gap = '0.5rem',
  className = '',
  ...props
}: SkeletonProps): JSX.Element {
  // Base classes for all skeleton shapes
  const baseClasses = cn(
    'bg-skeleton-bg relative overflow-hidden',
    {
      'animate-pulse': animation === 'pulse',
      '[&::before]:content-[""] [&::before]:absolute [&::before]:inset-0 [&::before]:translate-x-[-100%] [&::before]:w-[100%] [&::before]:h-full [&::before]:animate-wave [&::before]:bg-gradient-to-r [&::before]:from-transparent [&::before]:via-skeleton-highlight/60 [&::before]:to-transparent':
        animation === 'wave',
    }
  )
  

  // Shape-specific styling
  const shapeClasses = {
    rect: 'rounded-[var(--skeleton-border-radius)]',
    text: 'rounded-[var(--skeleton-border-radius)]',
    circle: 'rounded-[var(--skeleton-circle-border-radius)]',
  }

  // Inline styles for width and height if provided
  const style: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? width + 'px' : width) : undefined,
    height: height !== undefined ? (typeof height === 'number' ? height + 'px' : height) : undefined,
    ...(props.style || {}),
  }

  if (shape === 'text' && height === undefined) {
    style.height = '1rem'
  }

  // For single skeleton (count === 1)
  if (count === 1) {
    return (
      <div
        className={cn(baseClasses, shapeClasses[shape], className)}
        style={style}
        aria-hidden="true"
        {...props}
      />
    )
  }

  // For multiple skeletons (count > 1)
  return (
    <div
      className={cn('flex flex-col', className)}
      style={{ gap, ...(props.style || {}) }}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(baseClasses, shapeClasses[shape])}
          style={style}
        />
      ))}
    </div>
  )
}