import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Alert from '@/components/ui/Alert/Alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'The style variant of the alert',
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      defaultValue: 'default',
    },
    title: {
      description: 'Optional title for the alert',
      control: 'text',
    },
    dismissible: {
      description: 'Whether the alert can be dismissed',
      control: 'boolean',
      defaultValue: false,
    },
    onDismiss: {
      description: 'Callback when the dismiss button is clicked',
      action: 'dismissed',
    },
    icon: {
      description: 'Optional icon element to display',
      control: 'object',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    children: {
      description: 'Alert content',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

// Basic icon elements for various alert types
const icons = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[hsl(var(--alert-info-text))]">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[hsl(var(--alert-success-text))]">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[hsl(var(--alert-warning-text))]">
      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[hsl(var(--alert-error-text))]">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
    </svg>
  ),
}

// Base story with controls
export const Playground: Story = {
  args: {
    variant: 'default',
    title: 'Alert Title',
    children: 'This is an alert message with some important information.',
    dismissible: false,
  },
}

// Variant examples
export const Default: Story = {
  args: {
    children: 'This is a default alert with some information.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default alert styling for general messages.',
      },
    },
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
    icon: icons.success,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your account is about to reach its storage limit.',
    icon: icons.warning,
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'There was a problem processing your request.',
    icon: icons.error,
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'A new version of the software is available.',
    icon: icons.info,
  },
}

// With dismissible option
const DismissibleComponent = () => {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return <div>Alert dismissed! (Refresh to see it again)</div>
  }

  return (
    <Alert
      variant="info"
      title="Dismissible Alert"
      dismissible
      onDismiss={() => setVisible(false)}
      icon={icons.info}
    >
      This alert can be dismissed by clicking the X button.
    </Alert>
  )
}

export const Dismissible: Story = {
  render: () => <DismissibleComponent />,
}

// Without title
export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    children: 'This is a simple success message without a title.',
    icon: icons.success,
  },
}

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'warning',
    title: 'No Icon',
    children: 'This alert doesn\'t have an icon.',
  },
}

// Example with multiple alerts
export const MultipleAlerts: Story = {
  render: () => (
    <div className="flex flex-col space-y-4 w-96">
      <Alert variant="info" title="Welcome" icon={icons.info}>
        Welcome to our application! Here you can find everything you need.
      </Alert>
      <Alert variant="success" icon={icons.success}>
        Your profile has been updated successfully.
      </Alert>
      <Alert variant="warning" title="Storage Alert" icon={icons.warning}>
        You&apos;re using 90% of your storage space.
      </Alert>
      <Alert variant="error" title="Connection Error" icon={icons.error}>
        Could not connect to the server. Please try again later.
      </Alert>
    </div>
  ),
}