import { cn } from '@/utils/classNames'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { forwardRef } from 'react'
import Button from '@/components/ui/Button/Button'
import React from 'react'

export type DrawerSide = 'left' | 'right' | 'bottom'

export interface DrawerProps extends RadixDialog.DialogProps {
  /**
   * Which side the drawer should appear from
   */
  side?: DrawerSide
  /**
   * Whether the drawer should be shown
   */
  open?: boolean
  /**
   * Handler for when the open state changes
   */
  onOpenChange?: (open: boolean) => void
  /**
   * Whether to display the close button
   */
  showClose?: boolean
  /**
   * Whether to show the backdrop overlay
   */
  showOverlay?: boolean
  /**
   * Whether clicking the overlay should close the drawer
   */
  closeOnOverlayClick?: boolean
}

export interface DrawerContentProps extends Omit<RadixDialog.DialogContentProps, 'side'> {
  /**
   * The side from which the drawer appears
   */
  side?: DrawerSide
  /**
   * The title to display in the drawer header
   */
  title?: string
  /**
   * Description for screen readers
   */
  description?: string
  /**
   * Whether to show the close button
   */
  showClose?: boolean
  /**
   * Whether to show the backdrop overlay
   */
  showOverlay?: boolean
  /**
   * Whether clicking the overlay should close the drawer
   */
  closeOnOverlayClick?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

type DrawerComponent = React.ForwardRefExoticComponent<
  DrawerProps & React.RefAttributes<HTMLDivElement>
> & {
  Trigger: typeof DrawerTrigger
  Content: typeof DrawerContent
  Close: typeof DrawerClose
  Overlay: typeof DrawerOverlay
  Portal: typeof DrawerPortal
}

/**
 * Accessible Drawer (sliding panel) component using Radix UI Dialog with Tailwind styling and token-based theming.
 * 
 * Example:
 * 
 * ```tsx
 * <Drawer side="right">
 *   <Drawer.Trigger asChild>
 *     <Button>Open Drawer</Button>
 *   </Drawer.Trigger>
 *   <Drawer.Content title="Drawer Title">
 *     <p>Drawer content here</p>
 *   </Drawer.Content>
 * </Drawer>
 * ```
 */
const DrawerBase = forwardRef<HTMLDivElement, DrawerProps>(({
  children,
  side = 'right',
  showClose = true,
  showOverlay = true,
  closeOnOverlayClick = true,
  ...props
}, ref) => {
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    const typeWithDisplayName = child.type as { displayName?: string }
    const displayName = typeWithDisplayName.displayName

    const propsToInject = {
      ...(displayName === 'Drawer.Content' && {
        side,
        showClose,
        closeOnOverlayClick,
        showOverlay,
      }),
    }

    const typedChild = child as React.ReactElement<Record<string, unknown>>

    if (displayName === 'Drawer.Overlay' && showOverlay === false) {
      return null
    }

    return React.cloneElement(typedChild, {
      ...typedChild.props,
      ...propsToInject,
    })
  })

  return (
    <div ref={ref}>
      <RadixDialog.Root {...props}>
        {enhancedChildren}
      </RadixDialog.Root>
    </div>
  )
})

DrawerBase.displayName = 'Drawer'

const DrawerTrigger = RadixDialog.Trigger
DrawerTrigger.displayName = 'Drawer.Trigger'

const DrawerPortal = RadixDialog.Portal
DrawerPortal.displayName = 'Drawer.Portal'

const DrawerClose = RadixDialog.Close
DrawerClose.displayName = 'Drawer.Close'

const DrawerOverlay = forwardRef<HTMLDivElement, RadixDialog.DialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <RadixDialog.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-[var(--drawer-overlay-z-index)] bg-drawer-overlay-background backdrop-blur-[var(--drawer-overlay-blur)]',
        'data-[state=open]:animate-fadeIn data-[state=closed]:animate-fadeOut',
        className
      )}
      {...props}
    />
  )
)

DrawerOverlay.displayName = 'Drawer.Overlay'

const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ 
    side = 'right', 
    title, 
    description, 
    showClose = true, 
    showOverlay = true,
    closeOnOverlayClick = true,
    className, 
    children, 
    ...props 
  }, ref) => {
    const sideStyles = {
      left: [
        'left-0 top-0 h-full',
        'w-[var(--drawer-width-side)] max-w-[var(--drawer-max-width-side)]',
        'border-r',
        'data-[state=open]:animate-slideInFromLeft data-[state=closed]:animate-slideOutToLeft',
      ],
      right: [
        'right-0 top-0 h-full',
        'w-[var(--drawer-width-side)] max-w-[var(--drawer-max-width-side)]',
        'border-l',
        'data-[state=open]:animate-slideInFromRight data-[state=closed]:animate-slideOutToRight',
      ],
      bottom: [
        'bottom-0 left-0 right-0',
        'h-[var(--drawer-height-bottom)] max-h-[var(--drawer-max-height-bottom)]',
        'w-full border-t',
        'data-[state=open]:animate-slideInFromBottom data-[state=closed]:animate-slideOutToBottom',
      ],
    }

    return (
      <DrawerPortal>
        {showOverlay !== false && (
          <DrawerOverlay onClick={closeOnOverlayClick ? undefined : (e) => e.stopPropagation()} />
        )}
        <RadixDialog.Content
          ref={ref}
          onEscapeKeyDown={closeOnOverlayClick ? undefined : (e) => e.preventDefault()}
          className={cn(
            'fixed z-[var(--drawer-content-z-index)] bg-background shadow-[var(--drawer-content-shadow)]',
            'flex flex-col gap-[var(--drawer-content-gap)] p-[var(--drawer-content-padding)]',
            'focus:outline-none',
            sideStyles[side],
            className
          )}
          {...props}
        >
          <div className="flex flex-col space-y-1.5">
            {title && (
              <RadixDialog.Title className="text-[var(--drawer-title-font-size)] font-[var(--drawer-title-font-weight)] text-foreground">
                {title}
              </RadixDialog.Title>
            )}
            {description && (
              <RadixDialog.Description className="sr-only">
                {description}
              </RadixDialog.Description>
            )}
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
          {showClose && (
            <RadixDialog.Close 
              asChild
              className="absolute right-[var(--drawer-close-right)] top-[var(--drawer-close-top)]"
            >
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-[var(--drawer-close-size)] w-[var(--drawer-close-size)] rounded-full p-0" 
                aria-label="Close"
              >
                <X className="h-[var(--drawer-close-icon-size)] w-[var(--drawer-close-icon-size)]" />
              </Button>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </DrawerPortal>
    )
  }
)

DrawerContent.displayName = 'Drawer.Content'

export const Drawer = DrawerBase as DrawerComponent

Drawer.Trigger = DrawerTrigger
Drawer.Content = DrawerContent
Drawer.Close = DrawerClose
Drawer.Overlay = DrawerOverlay
Drawer.Portal = DrawerPortal
