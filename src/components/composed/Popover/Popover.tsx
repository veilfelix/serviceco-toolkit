import { cn } from '@/utils/classNames'
import * as RadixPopover from '@radix-ui/react-popover'
import { X } from 'lucide-react'

export interface PopoverContentProps extends RadixPopover.PopoverContentProps {
  /**
   * The alignment of the popover relative to its trigger
   */
  align?: 'start' | 'center' | 'end'
  /**
   * The side of the trigger to display the popover
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * The vertical offset of the popover
   */
  sideOffset?: number
  /**
   * Whether to show a close button
   */
  showClose?: boolean
  /**
   * Additional CSS classes for the content
   */
  className?: string
}

/**
 * Accessible popover component using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <Popover.Root>
 *   <Popover.Trigger>Open Popover</Popover.Trigger>
 *   <Popover.Content>
 *     Popover content goes here
 *   </Popover.Content>
 * </Popover.Root>
 * ```
 */
export const Popover = {
  Root: RadixPopover.Root,
  Trigger: RadixPopover.Trigger,
  Anchor: RadixPopover.Anchor,
  
  /**
   * Main popover content component
   */
  Content: ({
    className,
    align = 'center',
    side = 'bottom',
    sideOffset = 4,
    showClose = true,
    children,
    ...props
  }: PopoverContentProps) => (
    <RadixPopover.Portal>
      <RadixPopover.Content
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          'z-[var(--popover-content-z-index)] w-[var(--popover-content-width)] rounded-md border border-border',
          'bg-background p-[var(--popover-content-padding)] text-foreground shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        {showClose && (
          <RadixPopover.Close
            className={cn(
              'absolute right-[var(--popover-close-right)] top-[var(--popover-close-top)] inline-flex h-[var(--popover-close-size)] w-[var(--popover-close-size)] items-center justify-center rounded-[var(--popover-close-border-radius)]',
              'opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring',
              'focus:ring-offset-2 disabled:pointer-events-none'
            )}
            aria-label="Close"
          >
            <X className="h-[var(--popover-close-icon-size)] w-[var(--popover-close-icon-size)]" />
          </RadixPopover.Close>
        )}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  ),
  
  /**
   * Arrow element for the popover
   */
  Arrow: ({ className, ...props }: RadixPopover.PopoverArrowProps) => (
    <RadixPopover.Arrow
      className={cn('fill-background stroke-border stroke-1', className)}
      {...props}
    />
  ),
}