import type { Meta, StoryObj } from '@storybook/react'
import Textarea from '@/components/ui/Textarea/Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text',
      control: 'text',
    },
    disabled: {
      description: 'Whether the textarea is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      description: 'Whether the textarea has an error',
      control: 'boolean',
      defaultValue: false,
    },
    rows: {
      description: 'Number of visible rows',
      control: 'number',
      defaultValue: 4,
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
type Story = StoryObj<typeof Textarea>

// Base story with controls
export const Playground: Story = {
  args: {
    placeholder: 'Type your message here',
    rows: 4,
    disabled: false,
    error: false,
  },
}

// Variant stories
export const Default: Story = {
  args: {
    placeholder: 'Type your message here',
    rows: 4,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard textarea for multi-line input.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'This textarea is disabled',
    rows: 4,
  },
}

export const WithError: Story = {
  args: {
    error: true,
    placeholder: 'Textarea with error',
    rows: 4,
  },
}

export const VariableSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-80">
      <Textarea placeholder="Small textarea (2 rows)" rows={2} />
      <Textarea placeholder="Medium textarea (4 rows)" rows={4} />
      <Textarea placeholder="Large textarea (6 rows)" rows={6} />
    </div>
  ),
}

// Example stories with multiple variants
export const TextareaGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-80">
      <Textarea placeholder="Default textarea" rows={3} />
      <Textarea placeholder="Disabled textarea" disabled rows={3} />
      <Textarea placeholder="Textarea with error" error rows={3} />
    </div>
  ),
}