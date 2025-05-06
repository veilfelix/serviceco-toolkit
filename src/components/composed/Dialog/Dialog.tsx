import { cn } from '@/utils/classNames'
import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

/**
 * Accessible Dialog (modal) using Radix UI with Tailwind styling and token-based theming.
 *
 * Example:
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
          'fixed left-1/2 top-1/2 z-50 grid w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-fade-in rounded-md',
          className
        )}
        {...rest}
      >
        {title && (
          <RadixDialog.Title className="text-lg font-semibold text-foreground">
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
          className="absolute right-4 top-4 text-foreground/60 hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </RadixDialog.Close>
      </RadixDialog.Content>
    </RadixDialog.Portal>
  ),
}
