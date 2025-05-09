import { cn } from '@/utils/classNames'
import * as RadixAccordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

export interface AccordionItemProps extends RadixAccordion.AccordionItemProps {
  /**
   * The unique value of the accordion item
   */
  value: string
  /**
   * Additional CSS classes for the accordion item
   */
  className?: string
}

export interface AccordionTriggerProps extends RadixAccordion.AccordionTriggerProps {
  /**
   * Title to display in the accordion trigger
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the accordion trigger
   */
  className?: string
  /**
   * Optional icon displayed to the right of the trigger (defaults to ChevronDown)
   */
  icon?: React.ReactNode
}

export interface AccordionContentProps extends RadixAccordion.AccordionContentProps {
  /**
   * Content to display when the accordion item is open
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the accordion content
   */
  className?: string
}

/**
 * Accessible accordion component using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <Accordion.Root type="single" collapsible>
 *   <Accordion.Item value="item-1">
 *     <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
 *     <Accordion.Content>Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */
export const Accordion = {
  Root: RadixAccordion.Root,

  /**
   * Individual accordion item
   */
  Item: ({ className, ...props }: AccordionItemProps) => (
    <RadixAccordion.Item
      className={cn(
        'border-b border-b-[hsl(var(--border))]',
        '[&:first-child]:border-t [&:first-child]:border-t-[hsl(var(--border))]',
        className
      )}
      {...props}
    />
  ),

  /**
   * Trigger button for an accordion item
   */
  Trigger: ({
    className,
    children,
    icon = <ChevronDown className="h-[var(--accordion-icon-size)] w-[var(--accordion-icon-size)] shrink-0 transition-transform duration-[var(--accordion-icon-transition)]" />,
    ...props
  }: AccordionTriggerProps) => (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        className={cn(
          'flex flex-1 items-center justify-between py-[var(--accordion-trigger-padding-y)] text-[var(--font-base)] font-[var(--accordion-trigger-font-weight)] transition-all',
          'hover:underline',
          '[&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        {icon}
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),

  /**
   * Content of an accordion item
   */
  Content: ({ className, children, ...props }: AccordionContentProps) => (
    <RadixAccordion.Content
      className={cn(
        'overflow-hidden text-[var(--font-base)] transition-all',
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className
      )}
      {...props}
    >
      <div className="pb-[var(--accordion-content-padding-bottom)] pt-0">{children}</div>
    </RadixAccordion.Content>
  ),
}
