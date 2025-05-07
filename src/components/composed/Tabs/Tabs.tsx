import { cn } from '@/utils/classNames'
import * as RadixTabs from '@radix-ui/react-tabs'

export interface TabsListProps extends RadixTabs.TabsListProps {
  /**
   * Content of the tabs list (typically Tab.Trigger elements)
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the tabs list
   */
  className?: string
}

export interface TabsTriggerProps extends RadixTabs.TabsTriggerProps {
  /**
   * Content of the tab trigger
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the tab trigger
   */
  className?: string
}

export interface TabsContentProps extends RadixTabs.TabsContentProps {
  /**
   * Content to display when this tab is active
   */
  children: React.ReactNode
  /**
   * Additional CSS classes for the tab content
   */
  className?: string
}

/**
 * Accessible tabs component using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <Tabs.Root defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
 * </Tabs.Root>
 * ```
 */
export const Tabs = {
  Root: RadixTabs.Root,
  /**
   * Tabs list container for the tab triggers
   */
  List: ({ className, children, ...props }: TabsListProps) => (
    <RadixTabs.List
      className={cn(
        'flex h-10 items-center justify-start rounded-md bg-[hsl(var(--muted))] p-1 text-[hsl(var(--muted-foreground))]',
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.List>
  ),
  /**
   * Tab trigger component that users click to select a tab
   */
  Trigger: ({ className, children, ...props }: TabsTriggerProps) => (
    <RadixTabs.Trigger
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-[var(--spacing-md)] py-[var(--spacing-xs)]',
        'text-[var(--font-base)] font-medium transition-all',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-[hsl(var(--background))] data-[state=active]:text-[hsl(var(--foreground))]',
        'data-[state=active]:shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Trigger>
  ),
  /**
   * Tab content component that is displayed when the corresponding tab is selected
   */
  Content: ({ className, children, ...props }: TabsContentProps) => (
    <RadixTabs.Content
      className={cn(
        'mt-[var(--spacing-md)] rounded-md focus:outline-none',
        'data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:zoom-in-95',
        'data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:zoom-out-95',
        className
      )}
      {...props}
    >
      {children}
    </RadixTabs.Content>
  ),
}