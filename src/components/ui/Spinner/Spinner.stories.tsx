import type { Meta, StoryObj } from '@storybook/react'
import Spinner from '@/components/ui/Spinner/Spinner'
import Button from '@/components/ui/Button/Button'

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Spinner color variant',
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'white'],
      defaultValue: 'primary',
    },
    size: {
      description: 'Spinner size',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    layout: {
      description: 'Layout mode',
      control: 'select',
      options: ['inline', 'center'],
      defaultValue: 'inline',
    },
    ariaLabel: {
      description: 'Screen reader label for the spinner',
      control: 'text',
      defaultValue: 'Loading',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Spinner>

// Base story with controls
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    layout: 'inline',
    ariaLabel: 'Loading',
  },
}

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary spinner style using the primary color from the design system.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Muted: Story = {
  args: {
    variant: 'muted',
  },
}

export const White: Story = {
  args: {
    variant: 'white',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

// Size stories
export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
  },
}

// Layout stories
export const InlineLayout: Story = {
  args: {
    layout: 'inline',
  },
  render: () => (
    <div className="flex items-center gap-2">
      <Spinner layout="inline" />
      <span>Loading content...</span>
    </div>
  ),
}

export const CenteredLayout: Story = {
  args: {
    layout: 'center',
  },
  render: () => (
    <div className="w-full p-8 border rounded-md">
      <Spinner layout="center" size="lg" />
      <p className="mt-4 text-center">Loading content...</p>
    </div>
  ),
}

// Example with different spinners
export const SpinnerGroup: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Spinner size="sm" variant="primary" />
      <Spinner size="md" variant="primary" />
      <Spinner size="lg" variant="primary" />
      <Spinner size="xl" variant="primary" />
    </div>
  ),
}

// Common usage examples
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      {/* Inside buttons */}
      <div className="space-x-4">
        <Button disabled className="flex items-center">
          <Spinner size="sm" variant="white" className="mr-2" />
          Loading...
        </Button>
        
        <Button variant="secondary" disabled className="flex items-center">
          <Spinner size="sm" variant="secondary" className="mr-2" />
          Processing
        </Button>
      </div>
      
      {/* Inline with text */}
      <div className="flex items-center gap-2">
        <Spinner size="sm" />
        <span>Fetching data...</span>
      </div>
      
      {/* Centered in a container */}
      <div className="flex flex-col items-center justify-center gap-2 p-6 border rounded-md">
        <Spinner size="lg" variant="secondary" />
        <span className="mt-2">Loading dashboard</span>
      </div>
      
      {/* Loading state of a card or section */}
      <div className="relative p-6 border rounded-md min-h-[200px] flex items-center justify-center">
        <Spinner size="xl" variant="muted" />
      </div>
    </div>
  ),
}

// Color variants demo with different backgrounds
export const VariantShowcase: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-white rounded-md">
        <p className="mb-2 text-sm font-medium">Light background:</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Spinner variant="primary" />
            <span className="mt-2 text-xs">Primary</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner variant="secondary" />
            <span className="mt-2 text-xs">Secondary</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner variant="muted" />
            <span className="mt-2 text-xs">Muted</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 rounded-md">
        <p className="mb-2 text-sm font-medium text-white">Dark background:</p>
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <Spinner variant="primary" />
            <span className="mt-2 text-xs text-white">Primary</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner variant="secondary" />
            <span className="mt-2 text-xs text-white">Secondary</span>
          </div>
          <div className="flex flex-col items-center">
            <Spinner variant="white" />
            <span className="mt-2 text-xs text-white">White</span>
          </div>
        </div>
      </div>
    </div>
  ),
}