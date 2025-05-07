import type { Meta, StoryObj } from '@storybook/react'
import Checkbox from '@/components/ui/Checkbox/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text to display next to the checkbox',
      control: 'text',
    },
    checked: {
      description: 'Whether the checkbox is checked',
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      description: 'Whether the checkbox is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    required: {
      description: 'Whether the checkbox is required',
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      description: 'Whether the checkbox has an error',
      control: 'boolean',
      defaultValue: false,
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
    inputClassName: {
      description: 'Additional CSS classes for the input element',
      control: 'text',
    },
    labelClassName: {
      description: 'Additional CSS classes for the label',
      control: 'text',
    },
    onChange: { 
      description: 'Change handler',
      action: 'changed' 
    }
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

// Base story with controls
export const Playground: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    checked: false,
    disabled: false,
    error: false,
    id: 'playground-checkbox',
  },
}

// Variant stories
export const Default: Story = {
  args: {
    label: 'Remember me',
    id: 'default-checkbox',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard checkbox with a label.',
      },
    },
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
    id: 'checked-checkbox',
  },
}

export const Required: Story = {
  args: {
    label: 'Required checkbox',
    required: true,
    id: 'required-checkbox',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
    id: 'disabled-checkbox',
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
    id: 'disabled-checked-checkbox',
  },
}

export const WithError: Story = {
  args: {
    label: 'Checkbox with error',
    error: true,
    id: 'error-checkbox',
  },
}

export const NoLabel: Story = {
  args: {
    id: 'no-label-checkbox',
  },
}

// Example stories with multiple variants
export const CheckboxGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <Checkbox label="Unchecked checkbox" id="group-unchecked" />
      <Checkbox label="Checked checkbox" checked id="group-checked" />
      <Checkbox label="Disabled checkbox" disabled id="group-disabled" />
      <Checkbox label="Disabled checked checkbox" disabled checked id="group-disabled-checked" />
      <Checkbox label="Checkbox with error" error id="group-error" />
      <Checkbox label="Required checkbox" required id="group-required" />
    </div>
  ),
}