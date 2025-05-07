import { cn } from '@/utils/classNames'
import * as RadixTooltip from '@radix-ui/react-tooltip'

export interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  /**
   * Content to display in the tooltip
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the tooltip content
   */
  className?: string
  /**
   * Side of the trigger to display the tooltip
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * Alignment of the tooltip relative to the trigger
   */
  align?: 'start' | 'center' | 'end'
  /**
   * Optional arrow element for the tooltip
   */
  showArrow?: boolean
}

/**
 * Accessible Tooltip component using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <Tooltip.Provider>
 *   <Tooltip.Root>
 *     <Tooltip.Trigger asChild>
 *       <Button>Hover me</Button>
 *     </Tooltip.Trigger>
 *     <Tooltip.Content>
 *       Tooltip content here
 *     </Tooltip.Content>
 *   </Tooltip.Root>
 * </Tooltip.Provider>
 * ```
 */
export const Tooltip = {
  Provider: RadixTooltip.Provider,
  Root: RadixTooltip.Root,
  Trigger: RadixTooltip.Trigger,
  /**
   * Main tooltip content component.
   */
  Content: ({
    children,
    className,
    side = 'top',
    align = 'center',
    showArrow = true,
    ...props
  }: TooltipContentProps) => (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        side={side}
        align={align}
        className={cn(
          'z-50 overflow-hidden rounded-[var(--radius-md)] border border-[hsl(var(--border))] bg-[hsl(var(--background))]',
          'px-[var(--spacing-sm)] py-[var(--spacing-xs)] text-[var(--font-sm)] text-[hsl(var(--foreground))]',
          'shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <RadixTooltip.Arrow className="fill-[hsl(var(--background))] stroke-[hsl(var(--border))] stroke-1" />
        )}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  ),
}