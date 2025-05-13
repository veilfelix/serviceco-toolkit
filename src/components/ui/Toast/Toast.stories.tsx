import type { Meta, StoryObj } from '@storybook/react'
import { JSX, useState } from 'react'
import Button from '@/components/ui/Button/Button'
import { Toast, ToastAction } from './Toast'
import { ToastProvider, useToast } from './ToastProvider'
import { AlertCircle, Bell, CheckCircle, AlertTriangle, Info as InfoCircle } from 'lucide-react'
import type { Decorator } from '@storybook/react'

const meta: Meta<typeof Toast> = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    ((Story, context): JSX.Element => {
      if (context.name !== 'Positions') {
        return (
          <div className="p-8 max-w-md mx-auto">
            <ToastProvider>
              <Story />
              {/* This is needed to show manually created Toasts in stories */}
              <div id="toast-viewport" />
            </ToastProvider>
          </div>
        )
      }

      return <Story />
    }) as Decorator,
  ],
}

export default meta
type Story = StoryObj<typeof Toast>

// Playground story with common variants and controls
export const Playground: Story = {
  args: {
    variant: 'default',
    title: 'Notification',
    children: 'This is a notification message.',
    duration: 5000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test different Toast properties.',
      },
    },
  },
}

// Basic variants for visual review
export const Default: Story = {
  args: {
    title: 'Default Notification',
    children: 'This is a standard notification.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem with your request.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your storage is almost full. Consider upgrading.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'A new version is available. Refresh to update.',
  },
}

// Functional examples

// Toast with custom action button
export const WithAction: Story = {
  args: {
    variant: 'success',
    title: 'File Deleted',
    children: 'The file has been moved to trash.',
  },
  render: (args) => (
    <Toast {...args}>
      {args.children}
      <ToastAction 
        altText="Undo the deletion" 
        // eslint-disable-next-line no-console
        onClick={() => console.log('Undo clicked')}
      >
        Undo
      </ToastAction>
    </Toast>
  ),
}

// Toast with custom icon
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'New Feature',
    children: 'Check out our new dashboard experience.',
    icon: <Bell className="h-5 w-5 text-blue-500" />,
  },
}

// Toast without title
export const NoTitle: Story = {
  args: {
    variant: 'success',
    children: 'Your profile has been updated successfully.',
  },
}

// Toast without auto-dismiss
export const Persistent: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children: 'This message will not automatically dismiss. You must close it manually.',
    duration: Infinity,
  },
}

// Demonstration of the useToast hook in action
const ToastDemo = () => {
  const { toast, dismissAll } = useToast()
  
  const showToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    const variants = {
      default: {
        title: 'Notification',
        description: 'This is a standard notification.',
        icon: null,
      },
      success: {
        title: 'Success!',
        description: 'Operation completed successfully.',
        icon: <CheckCircle className="h-5 w-5" />,
      },
      error: {
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        icon: <AlertCircle className="h-5 w-5" />,
      },
      warning: {
        title: 'Warning',
        description: 'Resource is running low. Please check.',
        icon: <AlertTriangle className="h-5 w-5" />,
      },
      info: {
        title: 'Information',
        description: 'New update is available for your system.',
        icon: <InfoCircle className="h-5 w-5" />,
      },
    }
    
    const { title, description, icon } = variants[variant]
    
    toast({
      variant,
      title,
      children: description,
      icon,
      action: variant === 'success' ? (
        <ToastAction 
          altText="Undo last operation" 
          // eslint-disable-next-line no-console
          onClick={() => console.log('Undo')}
        >
          Undo
        </ToastAction>
      ) : undefined,
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Toast Demonstration</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Click the buttons below to trigger different toast notifications.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => showToast('default')}>Default</Button>
        <Button onClick={() => showToast('success')}>Success</Button>
        <Button onClick={() => showToast('error')}>Error</Button>
        <Button onClick={() => showToast('warning')}>Warning</Button>
        <Button onClick={() => showToast('info')}>Info</Button>
        <Button onClick={dismissAll} variant="tertiary">Dismiss All</Button>
      </div>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <ToastDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of creating toasts programmatically using the useToast hook.',
      },
    },
  },
}

// Example with stacked toasts
const StackedToastsDemo = () => {
  const { toast } = useToast()
  
  const showStackedToasts = () => {
    // Show multiple toasts in sequence
    toast({
      variant: 'info',
      title: 'Starting Process',
      children: 'Beginning the operation...',
    })
    
    setTimeout(() => {
      toast({
        variant: 'warning',
        title: 'Processing',
        children: 'This might take a moment...',
      })
    }, 1000)
    
    setTimeout(() => {
      toast({
        variant: 'success',
        title: 'Complete',
        children: 'Operation finished successfully!',
      })
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Stacked Toasts</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Demonstrates how multiple toasts stack in the UI.
      </p>
      <Button onClick={showStackedToasts}>
        Show Stacked Toasts
      </Button>
    </div>
  )
}

export const StackedToasts: Story = {
  render: () => <StackedToastsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Shows how multiple toasts stack in the UI.',
      },
    },
  },
}

// Real-world usage examples
const RealWorldExamples = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  const simulateFormSubmit = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      toast({
        variant: 'success',
        title: 'Form Submitted',
        children: 'Your information has been saved successfully.',
        action: (
          <ToastAction 
            altText="View form submission details" 
            // eslint-disable-next-line no-console
            onClick={() => console.log('View details')}
          >
            View
          </ToastAction>
        ),
      })
    }, 1500)
  }
  
  const simulateError = () => {
    toast({
      variant: 'error',
      title: 'Connection Error',
      children: 'Could not connect to the server. Please check your internet connection.',
      duration: 8000, // Extended duration for important error
    })
  }
  
  const simulateFileUpload = () => {
    toast({
      variant: 'info',
      title: 'Uploading File',
      children: 'Your document is being uploaded...',
    })
    
    // Simulate successful upload after delay
    setTimeout(() => {
      toast({
        variant: 'success',
        title: 'Upload Complete',
        children: 'Your document has been uploaded successfully.',
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Form Submission</h3>
        <Button onClick={simulateFormSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Form'}
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Error Handling</h3>
        <Button onClick={simulateError} variant="tertiary">
          Simulate Error
        </Button>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">File Upload</h3>
        <Button onClick={simulateFileUpload}>
          Upload File
        </Button>
      </div>
    </div>
  )
}

export const UsageExamples: Story = {
  render: () => <RealWorldExamples />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples of using Toasts in typical application scenarios.',
      },
    },
  },
}