import type { Meta, StoryObj } from '@storybook/react'
import Input from '@/components/ui/Input/Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Input type attribute',
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      defaultValue: 'text',
    },
    disabled: {
      description: 'Whether the input is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
    },
    error: {
      description: 'Whether the input has an error',
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
    onChange: { 
      description: 'Change handler',
      action: 'changed' 
    }
  },
}

export default meta
type Story = StoryObj<typeof Input>

// Base story with controls
export const Playground: Story = {
  args: {
    placeholder: 'Enter text here',
    type: 'text',
    disabled: false,
    error: false,
  },
}

// Type stories
export const Text: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard text input for general use.',
      },
    },
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

// State stories
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'Input with error',
  },
}

// Example stories with multiple variants
export const InputGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-72">
      <Input placeholder="Default input" />
      <Input placeholder="Disabled input" disabled />
      <Input placeholder="Error input" error />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
    </div>
  ),
}