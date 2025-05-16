import { ReactNode } from 'react'
import { cn } from '@/utils/classNames'
import { Dialog } from '@/components/composed/Dialog/Dialog'
import Button from '@/components/ui/Button/Button'
import Text from '@/components/ui/Text/Text'
import { AlertTriangle } from 'lucide-react'

export interface ModalConfirmProps {
  /**
   * Whether the modal is open
   */
  open: boolean
  /**
   * Handler for changing the open state
   */
  onOpenChange: (open: boolean) => void
  /**
   * Modal title
   */
  title: string
  /**
   * Modal description
   */
  description: string
  /**
   * Handler for confirm action
   */
  onConfirm: () => void
  /**
   * Handler for cancel action
   */
  onCancel?: () => void
  /**
   * Text for the confirm button
   */
  confirmText?: string
  /**
   * Text for the cancel button
   */
  cancelText?: string
  /**
   * Whether the confirm action is destructive
   */
  isDestructive?: boolean
  /**
   * Icon to display in the modal (optional)
   */
  icon?: ReactNode
  /**
   * Whether the modal can be closed by clicking the overlay or pressing Escape
   */
  isDismissable?: boolean
  /**
   * Additional class name for content container
   */
  className?: string
  /**
   * Children props allowing to add custom content
   */
  children?: React.ReactNode;
}

/**
 * A confirmation modal component that extends Dialog with confirm/cancel actions.
 * 
 * Example:
 * 
 * ```tsx
 * const [open, setOpen] = useState(false)
 * 
 * <ModalConfirm
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Confirm deletion"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   isDestructive
 *   onConfirm={() => handleDelete()}
 * />
 * ```
 */
export default function ModalConfirm({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  icon,
  isDismissable = true,
  className,
  children
}: ModalConfirmProps) {
  const handleCancel = () => {
    onOpenChange(false)
    onCancel?.()
  }

  const handleConfirm = () => {
    onOpenChange(false)
    onConfirm()
  }

  return (
    <Dialog.Root open={open} onOpenChange={isDismissable ? onOpenChange : undefined}>
      <Dialog.Content
        title={title}
        description={description}
        onEscapeKeyDown={isDismissable ? undefined : (e) => e.preventDefault()}
        onPointerDownOutside={isDismissable ? undefined : (e) => e.preventDefault()}
        className={cn('flex flex-col', className)}
      >
        <div className="mb-md flex items-start">
          {icon ? (
            <div className="mr-md">{icon}</div>
          ) : isDestructive ? (
            <div className="mr-md text-destructive">
              <AlertTriangle className="h-6 w-6" />
            </div>
          ) : null}
          <Text as="div">{description}</Text>
        </div>
        {children && <div className="mb-md">{children}</div>}
        <div className="mt-lg flex justify-end gap-md">
          <Button
            variant="secondary"
            onClick={handleCancel}
            data-testid="modal-confirm-cancel"
          >
            {cancelText}
          </Button>
          <Button
            variant={isDestructive ? 'tertiary' : 'primary'}
            className={isDestructive ? 'border-[hsl(var(--destructive))] text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))]/10' : ''}
            onClick={handleConfirm}
            data-testid="modal-confirm-submit"
          >
            {confirmText}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}