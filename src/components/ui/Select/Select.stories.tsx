import type { Meta, StoryObj } from '@storybook/react'
import Select from '@/components/ui/Select/Select'

const meta: Meta<typeof Select> = {
  title: 'Components/UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of select options',
      control: 'object',
    },
    placeholder: {
      description: 'Placeholder text (shown as disabled first option)',
      control: 'text',
    },
    size: {
      description: 'Size of the select element',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    error: {
      description: 'Whether the select has an error',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Whether the select is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
    onChange: {
      description: 'Change handler',
      action: 'changed',
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

const defaultOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

// Base story with controls
export const Playground: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select a flavor...',
    size: 'md',
    error: false,
    disabled: false,
  },
}

// Size variants
export const Small: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Small select',
    size: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small select input for compact layouts.',
      },
    },
  },
}

export const Medium: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Medium select',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Large select',
    size: 'lg',
  },
}

// State variants
export const WithError: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Error state',
    error: true,
  },
}

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Disabled select',
    disabled: true,
  },
}

// With disabled options
export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry', disabled: true },
      { value: 'vanilla', label: 'Vanilla' },
    ],
    placeholder: 'Some options disabled',
  },
}

// Without placeholder
export const WithoutPlaceholder: Story = {
  args: {
    options: defaultOptions,
  },
}

// Example with grouped selects
export const FormExample: Story = {
  render: () => (
    <div className="p-4 space-y-4 w-64">
      <div className="space-y-1">
        <label className="text-[var(--font-base)] font-medium">Country</label>
        <Select
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'mx', label: 'Mexico' },
          ]}
          placeholder="Select country..."
        />
      </div>
      
      <div className="space-y-1">
        <label className="text-[var(--font-base)] font-medium">State/Province</label>
        <Select
          options={[
            { value: 'ny', label: 'New York' },
            { value: 'ca', label: 'California' },
            { value: 'tx', label: 'Texas' },
          ]}
          placeholder="Select state..."
        />
      </div>
    </div>
  ),
}