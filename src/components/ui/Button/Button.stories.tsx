import type { Meta, StoryObj } from '@storybook/react'
import Button from '@/components/ui/Button/Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button style variant',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      defaultValue: 'primary',
    },
    size: {
      description: 'Button size',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    onClick: { 
      description: 'Click handler',
      action: 'clicked' 
    },
    type: {
      description: 'Button type attribute',
      control: 'select',
      options: ['button', 'submit', 'reset'],
      defaultValue: 'button',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
    children: {
      description: 'Button content',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// Base story with controls
export const Playground: Story = {
  args: {
    children: 'Button Text',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
}

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'The primary style is used for main actions.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
}

// Size stories
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
}

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
}

// Example stories with multiple variants
export const ButtonGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
}

export const SizeComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </div>
  ),
}