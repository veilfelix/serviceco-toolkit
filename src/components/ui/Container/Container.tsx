import { JSX } from 'react'
import { cn } from '@/utils/classNames'

export type ContainerProps = {
  /**
   * The content to render inside the container
   */
  children: React.ReactNode

  /**
   * Additional classes to apply on the container wrapper
   */
  className?: string
}

/**
 * A layout wrapper that centers content and applies horizontal padding and max-width.
 *
 * Example:
 *
 * ```tsx
 * <Container>
 *   <YourComponent />
 * </Container>
 * ```
 */
export default function Container({
  children,
  className,
}: ContainerProps): JSX.Element {
  return (
    <div
      className={cn(
        'w-full max-w-screen-xl mx-auto px-md sm:px-md lg:px-lg',
        className
      )}
    >
      {children}
    </div>
  )
}
