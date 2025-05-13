import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import RadioGroup from '@/components/ui/RadioGroup/RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: 'The currently selected value in the group',
      control: 'text',
    },
    name: {
      description: 'Radio group name attribute',
      control: 'text',
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
    children: {
      description: 'Radio options',
      control: 'object',
    },
  },
  decorators: [
    (Story) => {
      const [value, setValue] = useState('option1')
      return <Story args={{ value, onChange: setValue }} />
    },
  ],
}

export default meta
type Story = StoryObj<typeof RadioGroup>

// Base story with controls
export const Playground: Story = {
  render: ({ value, onChange }) => (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Item value="option1" label="Option 1" />
      <RadioGroup.Item value="option2" label="Option 2" />
      <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
  ),
}

// Basic example
export const Default: Story = {
  render: ({ value, onChange }) => (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Item value="option1" label="Option 1" />
      <RadioGroup.Item value="option2" label="Option 2" />
      <RadioGroup.Item value="option3" label="Option 3" />
    </RadioGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic radio group with three options.',
      },
    },
  },
}

// With disabled option
export const WithDisabledOption: Story = {
  render: ({ value, onChange }) => (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Item value="option1" label="Option 1" />
      <RadioGroup.Item value="option2" label="Option 2" />
      <RadioGroup.Item value="option3" label="Disabled option" disabled />
    </RadioGroup>
  ),
}

// Form field style
export const FormField: Story = {
  render: ({ value, onChange }) => (
    <div className="p-4 w-80">
      <div className="mb-sm">
        <label className="text-base font-medium">Subscription Plan</label>
      </div>
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Item value="basic" label="Basic - $9.99/month" />
        <RadioGroup.Item value="premium" label="Premium - $19.99/month" />
        <RadioGroup.Item value="enterprise" label="Enterprise - Contact sales" />
      </RadioGroup>
    </div>
  ),
}

// Custom styling
export const CustomStyling: Story = {
  render: ({ value, onChange }) => (
    <RadioGroup 
      value={value} 
      onChange={onChange}
      className="bg-secondary p-md rounded-md"
    >
      <RadioGroup.Item 
        value="option1" 
        label="Custom Option 1" 
        labelClassName="font-semibold"
      />
      <RadioGroup.Item 
        value="option2" 
        label="Custom Option 2"
        labelClassName="font-semibold"
      />
      <RadioGroup.Item 
        value="option3" 
        label="Custom Option 3"
        labelClassName="font-semibold"
      />
    </RadioGroup>
  ),
}
