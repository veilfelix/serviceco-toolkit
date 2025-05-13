import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Alert from '@/components/ui/Alert/Alert'
import { Info as InfoCircle, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'


const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
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
  info: <InfoCircle className="w-4 h-4 text-alert-info-text" />,
  success: <CheckCircle className="w-4 h-4 text-alert-success-text" />,
  warning: <AlertTriangle className="w-4 h-4 text-alert-warning-text" />,
  error: <XCircle className="w-4 h-4 text-alert-error-text" />,
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