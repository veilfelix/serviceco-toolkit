import type { Meta, StoryObj } from '@storybook/react'
import Label from '@/components/ui/Label/Label'
import Input from '@/components/ui/Input/Input'

const meta: Meta<typeof Label> = {
  title: 'Components/UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Label content',
      control: 'text',
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      description: 'Whether the label has an error',
      control: 'boolean',
      defaultValue: false,
    },
    htmlFor: {
      description: 'ID of the associated form element',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

// Base story with controls
export const Playground: Story = {
  args: {
    children: 'Label Text',
    required: false,
    error: false,
    htmlFor: 'input-example',
  },
}

// Variant stories
export const Default: Story = {
  args: {
    children: 'Default Label',
    htmlFor: 'default-input',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard label for form elements.',
      },
    },
  },
}

export const Required: Story = {
  args: {
    children: 'Required Field',
    required: true,
    htmlFor: 'required-input',
  },
}

export const WithError: Story = {
  args: {
    children: 'Error Label',
    error: true,
    htmlFor: 'error-input',
  },
}

// Example stories with form elements
export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-1 p-4 w-72">
      <Label htmlFor="label-example">Name</Label>
      <Input id="label-example" placeholder="Enter your name" />
    </div>
  ),
}

export const LabelVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-72">
      <div className="flex flex-col gap-1">
        <Label htmlFor="normal-input">Normal Label</Label>
        <Input id="normal-input" placeholder="Normal input" />
      </div>
      
      <div className="flex flex-col gap-1">
        <Label htmlFor="required-input" required>Required Label</Label>
        <Input id="required-input" placeholder="Required input" />
      </div>
      
      <div className="flex flex-col gap-1">
        <Label htmlFor="error-input" error>Error Label</Label>
        <Input id="error-input" placeholder="Input with error" error />
      </div>
    </div>
  ),
}