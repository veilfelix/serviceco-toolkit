import { cn } from '@/utils/classNames'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

/**
 * Accessible Dialog (modal) using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
 * 
 * ```tsx
 * <Dialog>
 *   <Dialog.Trigger>Open</Dialog.Trigger>
 *   <Dialog.Content title="Modal Title">
 *     Modal content here
 *   </Dialog.Content>
 * </Dialog>
 * ```
 */
export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  /**
   * Overlay behind the dialog
   */
  Overlay: (props: RadixDialog.DialogOverlayProps) => (
    <RadixDialog.Overlay
      className="fixed inset-0 bg-dialog-overlay-background backdrop-blur-[var(--dialog-overlay-blur)] z-[var(--dialog-overlay-z-index)]"
      {...props}
    />
  ),
  /**
   * Main dialog content with optional close button and title.
   */
  Content: ({
    children,
    title,
    description,
    className,
    ...rest
  }: {
    children: React.ReactNode
    title?: string
    description?: string
    className?: string
  } & RadixDialog.DialogContentProps) => (
    <RadixDialog.Portal>
      <Dialog.Overlay />
      <RadixDialog.Content
        className={cn(
          'fixed left-1/2 top-1/2 z-[var(--dialog-content-z-index)] grid w-[var(--dialog-content-width)] max-w-[var(--dialog-content-max-width)] -translate-x-1/2 -translate-y-1/2 gap-[var(--dialog-content-gap)] border bg-background p-[var(--dialog-content-padding)] shadow-lg duration-200 data-[state=open]:animate-fade-in rounded-[var(--dialog-content-border-radius)]',
          className
        )}
        {...rest}
      >
        {title && (
          <RadixDialog.Title className="text-[var(--dialog-title-font-size)] font-[var(--dialog-title-font-weight)] text-foreground">
            {title}
          </RadixDialog.Title>
        )}
        {description && (
          <RadixDialog.Description className="sr-only">
            {description}
          </RadixDialog.Description>
        )}
        {children}
        <RadixDialog.Close 
          className="absolute right-[var(--dialog-close-right)] top-[var(--dialog-close-top)] text-dialog-close-text-color hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-[var(--dialog-close-icon-size)] w-[var(--dialog-close-icon-size)]" />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  ),
}
