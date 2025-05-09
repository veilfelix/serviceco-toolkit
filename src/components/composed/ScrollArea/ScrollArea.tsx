import { forwardRef, ComponentPropsWithoutRef } from 'react'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { cn } from '@/utils/classNames'

export interface ScrollAreaProps extends ComponentPropsWithoutRef<typeof RadixScrollArea.Root> {
  /**
   * The viewport's orientation
   */
  orientation?: 'horizontal' | 'vertical' | 'both'
  /**
   * The type of scrollbar to display
   */
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  /**
   * The color scheme of the scrollbar thumb
   */
  scrollbarStyle?: 'default' | 'minimal'
  /**
   * Additional CSS classes for the root
   */
  className?: string
  /**
   * Additional CSS classes for the viewport
   */
  viewportClassName?: string
  /**
   * Content to be scrolled
   */
  children: React.ReactNode
}

/**
 * Accessible scroll area component using Radix UI with Tailwind styling and token-based theming.
 */
const ScrollArea = forwardRef<
  React.ComponentRef<typeof RadixScrollArea.Root>,
  ScrollAreaProps
>(
  (
    {
      orientation = 'vertical',
      type = 'auto',
      scrollbarStyle = 'default',
      className,
      viewportClassName,
      children,
      ...props
    },
    ref
  ) => {
    const isMinimal = scrollbarStyle === 'minimal'
    const scrollbarSize = isMinimal ? '2px' : '10px'

    const commonScrollbarClasses = cn(
      'flex touch-none select-none transition-colors',
      isMinimal ? 'bg-transparent' : 'bg-muted'
    )

    const thumbClasses = cn(
      'relative flex-1 rounded-full bg-muted-foreground',
      isMinimal && 'opacity-50',
      'before:absolute before:left-1/2 before:top-1/2 before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'
    )

    return (
      <RadixScrollArea.Root
        ref={ref}
        type={type}
        data-type={type}
        className={cn('relative overflow-hidden', className)}
        style={{ '--scrollbar-size': scrollbarSize } as React.CSSProperties}
        {...props}
      >
        <RadixScrollArea.Viewport
          className={cn('h-full w-full rounded-[inherit]', viewportClassName)}
        >
          {children}
        </RadixScrollArea.Viewport>

        {(orientation === 'vertical' || orientation === 'both') && (
          <RadixScrollArea.Scrollbar
            orientation="vertical"
            data-orientation="vertical"
            className={cn(
              commonScrollbarClasses,
              'h-full w-[var(--scrollbar-size)] border-l border-l-transparent p-[1px]'
            )}
          >
            <RadixScrollArea.Thumb className={thumbClasses} />
          </RadixScrollArea.Scrollbar>
        )}

        {(orientation === 'horizontal' || orientation === 'both') && (
          <RadixScrollArea.Scrollbar
            orientation="horizontal"
            data-orientation="horizontal"
            className={cn(
              commonScrollbarClasses,
              'h-[var(--scrollbar-size)] w-full flex-col border-t border-t-transparent p-[1px]'
            )}
          >
            <RadixScrollArea.Thumb className={thumbClasses} />
          </RadixScrollArea.Scrollbar>
        )}

        <RadixScrollArea.Corner />
      </RadixScrollArea.Root>
    )
  }
)

ScrollArea.displayName = 'ScrollArea'
export default ScrollArea
