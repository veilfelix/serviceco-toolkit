import { JSX } from 'react'
import { cn } from '@/utils/classNames'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

/**
 * Container is a layout utility component that constrains content to a maximum width
 * and applies consistent horizontal padding.
 *
 * It is often used to wrap page content and ensure readability across screen sizes.
 *
 * In a future design system:
 * - We might remove this and use layout primitives provided by the system
 * - OR update the classes here to match the grid/breakpoint system of the chosen library
 */
export default function Container({ children, className }: ContainerProps): JSX.Element {
  return (
    <div className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
