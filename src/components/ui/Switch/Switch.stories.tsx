import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Switch from '@/components/ui/Switch/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      description: 'Whether the switch is checked',
      control: 'boolean',
      defaultValue: false,
    },
    onCheckedChange: {
      description: 'Callback when the switch is toggled',
      action: 'toggled',
    },
    label: {
      description: 'Label for the switch',
      control: 'text',
    },
    disabled: {
      description: 'Whether the switch is disabled',
      control: 'boolean',
      defaultValue: false,
    },
    visualSize: {
      description: 'Size of the switch',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    labelPosition: {
      description: 'Position of the label',
      control: 'radio',
      options: ['left', 'right'],
      defaultValue: 'right',
    },
    className: {
      description: 'Additional CSS classes for the container',
      control: 'text',
    },
    labelClassName: {
      description: 'Additional CSS classes for the label',
      control: 'text',
    },
  },
  decorators: [
    Story => {
      // Add state management for the story
      const [checked, setChecked] = useState(false)
      return <Story args={{ checked, onCheckedChange: setChecked }} />
    },
  ],
}

export default meta
type Story = StoryObj<typeof Switch>

// Base story with controls
export const Playground: Story = {
  render: ({ checked, onCheckedChange, ...args }) => (
    <Switch checked={checked} onCheckedChange={onCheckedChange} {...args} />
  ),
  args: {
    label: 'Toggle me lol',
    visualSize: 'md',
    labelPosition: 'right',
  },
}

// Basic switch without label
export const Basic: Story = {
  render: ({ checked, onCheckedChange }) => (
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic switch without label.',
      },
    },
  },
}

// With label
export const WithLabel: Story = {
  render: ({ checked, onCheckedChange }) => (
    <Switch checked={checked} onCheckedChange={onCheckedChange} label="Airplane mode" />
  ),
}

// Size variants
export const SizeVariants: Story = {
  render: ({ checked, onCheckedChange }) => (
    <div className="flex flex-col space-y-4">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        label="Small switch"
        visualSize="sm"
      />
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        label="Medium switch"
        visualSize="md"
      />
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        label="Large switch"
        visualSize="lg"
      />
    </div>
  ),
}

// Label position
export const LabelPositions: Story = {
  render: ({ checked, onCheckedChange }) => (
    <div className="flex flex-col space-y-4">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        label="Label on right"
        labelPosition="right"
      />
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        label="Label on left"
        labelPosition="left"
      />
    </div>
  ),
}

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Switch checked={false} onCheckedChange={() => {}} label="Disabled unchecked" disabled />
      <Switch checked={true} onCheckedChange={() => {}} label="Disabled checked" disabled />
    </div>
  ),
}

// Form example
export const FormExample: Story = {
  render: ({ checked, onCheckedChange }) => (
    <div className="p-4 border rounded-md w-72">
      <h3 className="font-medium mb-4">Notification Settings</h3>
      <div className="space-y-3">
        <Switch checked={checked} onCheckedChange={onCheckedChange} label="Email notifications" />
        <Switch
          checked={!checked}
          onCheckedChange={val => onCheckedChange(!val)}
          label="Push notifications"
        />
        <Switch checked={checked} onCheckedChange={onCheckedChange} label="SMS notifications" />
      </div>
    </div>
  ),
}
