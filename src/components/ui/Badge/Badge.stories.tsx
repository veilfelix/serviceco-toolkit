import type { Meta, StoryObj } from '@storybook/react'
import Badge from '@/components/ui/Badge/Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Badge style variant',
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'success', 'warning', 'danger'],
      defaultValue: 'primary',
    },
    children: {
      description: 'Badge content',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

// Base story with controls
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
  },
}

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary badge style using the primary color from the design system.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
}

// Example with icons or emojis
export const WithEmoji: Story = {
  args: {
    children: '✅ Completed',
  },
}

// Example stories with multiple variants
export const BadgeGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 p-4">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
}

// Custom usage examples
export const CustomizedBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Badge className="mr-2" variant="primary">New</Badge>
        <span>Feature just released!</span>
      </div>
      
      <div>
        <Badge variant="outline" className="rounded-md px-[var(--spacing-md)]">Custom shape</Badge>
      </div>
      
      <div>
        <Badge variant="success" className="text-[var(--font-base)]">Larger text</Badge>
      </div>
    </div>
  ),
}