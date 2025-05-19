import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import ModalConfirm from './ModalConfirm'
import Button from '@/components/ui/Button/Button'
import { AlertCircle, Info, Trash, AlertTriangle } from 'lucide-react'

const meta: Meta<typeof ModalConfirm> = {
  title: 'Composed/ModalConfirm',
  component: ModalConfirm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Modal title',
      control: 'text',
    },
    description: {
      description: 'Modal description',
      control: 'text',
    },
    confirmText: {
      description: 'Text for confirm button',
      control: 'text',
    },
    cancelText: {
      description: 'Text for cancel button',
      control: 'text',
    },
    isDestructive: {
      description: 'Whether the confirm action is destructive',
      control: 'boolean',
    },
    icon: {
      description: 'Custom icon to display',
      control: { disable: true },
    },
    isDismissable: {
      description: 'Whether the modal can be closed by clicking outside or pressing Escape',
      control: 'boolean',
    },
    open: {
      description: 'Whether the modal is open',
      control: 'boolean',
    },
    onOpenChange: {
      description: 'Handler for open state changes',
      control: { disable: true },
    },
    onConfirm: {
      description: 'Handler for confirm action',
      control: { disable: true },
    },
    onCancel: {
      description: 'Handler for cancel action',
      control: { disable: true },
    },
  },
}

export default meta
type Story = StoryObj<typeof ModalConfirm>

// Wrapper component for interactive stories
const ModalConfirmDemo = (args: React.ComponentProps<typeof ModalConfirm>) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <ModalConfirm
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </div>
  )
}

// Base story
export const Default: Story = {
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDestructive: false,
    isDismissable: true,
  },
  render: (args) => <ModalConfirmDemo {...args} />,
}

// Destructive action story
export const Destructive: Story = {
  args: {
    title: 'Delete Item',
    description: 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    isDestructive: true,
    isDismissable: true,
  },
  render: (args) => <ModalConfirmDemo {...args} />,
}

// Story with custom icon
export const WithCustomIcon: Story = {
  args: {
    title: 'Information',
    description: 'This action will publish your changes to the live site.',
    confirmText: 'Publish',
    cancelText: 'Cancel',
    isDestructive: false,
    icon: <Info className="h-6 w-6 text-primary" />,
    isDismissable: true,
  },
  render: (args) => <ModalConfirmDemo {...args} />,
}

// Story with non-dismissable modal
export const NonDismissable: Story = {
  args: {
    title: 'Critical Action',
    description: 'You must choose an option to proceed. This cannot be dismissed with the Escape key or by clicking outside.',
    confirmText: 'Proceed',
    cancelText: 'Go Back',
    isDestructive: false,
    isDismissable: false,
  },
  render: (args) => <ModalConfirmDemo {...args} />,
}

// Component for the Variants story
const VariantsExample = () => {
  const [openDefault, setOpenDefault] = useState(false)
  const [openDestructive, setOpenDestructive] = useState(false)
  const [openCustomIcon, setOpenCustomIcon] = useState(false)
  
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button onClick={() => setOpenDefault(true)}>Default Confirmation</Button>
        <ModalConfirm
          open={openDefault}
          onOpenChange={setOpenDefault}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      </div>
      
      <div>
        <Button onClick={() => setOpenDestructive(true)} variant="tertiary" className="border-[hsl(var(--destructive))] text-[hsl(var(--destructive))]">
          <Trash className="mr-2 h-4 w-4" />
          Delete Item
        </Button>
        <ModalConfirm
          open={openDestructive}
          onOpenChange={setOpenDestructive}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          isDestructive
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      </div>
      
      <div>
        <Button onClick={() => setOpenCustomIcon(true)} variant="secondary">
          <AlertCircle className="mr-2 h-4 w-4" />
          Custom Icon Dialog
        </Button>
        <ModalConfirm
          open={openCustomIcon}
          onOpenChange={setOpenCustomIcon}
          title="Warning"
          description="This action will log you out from all devices. Continue?"
          confirmText="Continue"
          cancelText="Not Now"
          icon={<AlertTriangle className="h-6 w-6 text-badge-warning-text" />}
          onConfirm={() => {}}
          onCancel={() => {}}
        />
      </div>
    </div>
  )
}

export const Variants: Story = {
  render: () => <VariantsExample />,
}

// Long content example
export const LongContent: Story = {
  args: {
    title: 'Terms and Conditions',
    description: `
      By accepting these terms, you agree to our privacy policy and terms of service.
      
      This is a longer description that demonstrates how the modal handles additional content.
      The modal should properly adapt to the content size while maintaining good spacing and layout.
      
      This modal includes a scrollable area when the content exceeds the available space.
      The buttons remain fixed at the bottom for easy access.
    `,
    confirmText: 'Accept',
    cancelText: 'Decline',
    isDestructive: false,
    isDismissable: true,
  },
  render: (args) => <ModalConfirmDemo {...args} />,
}