import { cn } from '@/utils/classNames'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

export interface DropdownMenuContentProps extends RadixDropdownMenu.DropdownMenuContentProps {
  /**
   * The alignment of the dropdown menu relative to its trigger
   */
  align?: 'start' | 'center' | 'end'
  /**
   * The side of the trigger to display the dropdown menu
   */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /**
   * The vertical offset of the dropdown menu
   */
  sideOffset?: number
  /**
   * Additional CSS classes for the content
   */
  className?: string
}

export interface DropdownMenuItemProps extends RadixDropdownMenu.DropdownMenuItemProps {
  /**
   * Whether to display an inset padding
   */
  inset?: boolean
  /**
   * Additional CSS classes for the item
   */
  className?: string
}

export interface DropdownMenuLabelProps extends RadixDropdownMenu.DropdownMenuLabelProps {
  /**
   * Whether to display an inset padding
   */
  inset?: boolean
  /**
   * Additional CSS classes for the label
   */
  className?: string
}

export interface DropdownMenuCheckboxItemProps
  extends RadixDropdownMenu.DropdownMenuCheckboxItemProps {
  /**
   * Additional CSS classes for the checkbox item
   */
  className?: string
}

export interface DropdownMenuRadioItemProps
  extends RadixDropdownMenu.DropdownMenuRadioItemProps {
  /**
   * Additional CSS classes for the radio item
   */
  className?: string
}

export interface DropdownMenuSeparatorProps
  extends RadixDropdownMenu.DropdownMenuSeparatorProps {
  /**
   * Additional CSS classes for the separator
   */
  className?: string
}

export interface DropdownMenuSubTriggerProps
  extends RadixDropdownMenu.DropdownMenuSubTriggerProps {
  /**
   * Whether to display an inset padding
   */
  inset?: boolean
  /**
   * Additional CSS classes for the sub-trigger
   */
  className?: string
}

export interface DropdownMenuSubContentProps
  extends RadixDropdownMenu.DropdownMenuSubContentProps {
  /**
   * Additional CSS classes for the sub-content
   */
  className?: string
}

/**
 * Accessible dropdown menu component using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <DropdownMenu.Root>
 *   <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
 *   <DropdownMenu.Content>
 *     <DropdownMenu.Item>Item 1</DropdownMenu.Item>
 *     <DropdownMenu.Item>Item 2</DropdownMenu.Item>
 *     <DropdownMenu.Separator />
 *     <DropdownMenu.Item>Item 3</DropdownMenu.Item>
 *   </DropdownMenu.Content>
 * </DropdownMenu.Root>
 * ```
 */
export const DropdownMenu = {
  Root: RadixDropdownMenu.Root,
  Trigger: RadixDropdownMenu.Trigger,
  Group: RadixDropdownMenu.Group,
  Portal: RadixDropdownMenu.Portal,
  Sub: RadixDropdownMenu.Sub,
  RadioGroup: RadixDropdownMenu.RadioGroup,
  
  /**
   * Main dropdown content component that contains menu items
   */
  Content: ({
    className,
    sideOffset = 4,
    align = 'end',
    side = 'bottom',
    ...props
  }: DropdownMenuContentProps) => (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.Content
        sideOffset={sideOffset}
        align={align}
        side={side}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border',
          'bg-background p-1 text-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  ),
  
  /**
   * Dropdown menu item
   */
  Item: ({ className, inset, ...props }: DropdownMenuItemProps) => (
    <RadixDropdownMenu.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  ),
  
  /**
   * Dropdown menu checkbox item
   */
  CheckboxItem: ({ className, children, checked, ...props }: DropdownMenuCheckboxItemProps) => (
    <RadixDropdownMenu.CheckboxItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixDropdownMenu.ItemIndicator>
          <Check className="h-4 w-4" />
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.CheckboxItem>
  ),
  
  /**
   * Dropdown menu radio item
   */
  RadioItem: ({ className, children, ...props }: DropdownMenuRadioItemProps) => (
    <RadixDropdownMenu.RadioItem
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <RadixDropdownMenu.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </RadixDropdownMenu.ItemIndicator>
      </span>
      {children}
    </RadixDropdownMenu.RadioItem>
  ),
  
  /**
   * Label for a group of dropdown menu items
   */
  Label: ({ className, inset, ...props }: DropdownMenuLabelProps) => (
    <RadixDropdownMenu.Label
      className={cn(
        'px-2 py-1.5 text-sm text-muted-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  ),
  
  /**
   * Separator line between dropdown menu items
   */
  Separator: ({ className, ...props }: DropdownMenuSeparatorProps) => (
    <RadixDropdownMenu.Separator
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  ),
  
  /**
   * Trigger for a submenu
   */
  SubTrigger: ({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) => (
    <RadixDropdownMenu.SubTrigger
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-base outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </RadixDropdownMenu.SubTrigger>
  ),
  
  /**
   * Content for a submenu
   */
  SubContent: ({ className, ...props }: DropdownMenuSubContentProps) => (
    <RadixDropdownMenu.Portal>
      <RadixDropdownMenu.SubContent
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border',
          'bg-background p-1 text-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </RadixDropdownMenu.Portal>
  ),
}