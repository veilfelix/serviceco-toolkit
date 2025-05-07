import type { Meta, StoryObj } from '@storybook/react'
import FormField from '@/components/ui/FormField/FormField'
import Input from '@/components/ui/Input/Input'

const meta: Meta<typeof FormField> = {
  title: 'Components/UI/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: 'Label text for the form field',
      control: 'text',
    },
    id: {
      description: 'Unique identifier for the form field and label',
      control: 'text',
    },
    required: {
      description: 'Whether the field is required',
      control: 'boolean',
      defaultValue: false,
    },
    error: {
      description: 'Error message to display',
      control: 'text',
    },
    helperText: {
      description: 'Helper text to display below the field',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes for the field container',
      control: 'text',
    },
    labelClassName: {
      description: 'Additional CSS classes for the label',
      control: 'text',
    },
    children: {
      description: 'Form field input component',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormField>

// Base story with controls
export const Playground: Story = {
  args: {
    label: 'Email',
    id: 'email',
    required: false,
    children: <Input placeholder="Enter your email" id="email" />,
  },
}

// Variant stories
export const Default: Story = {
  args: {
    label: 'Full Name',
    id: 'full-name',
    children: <Input placeholder="Enter your full name" id="full-name" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard form field with label and input.',
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Email Address',
    id: 'email-required',
    required: true,
    children: <Input placeholder="Enter your email" id="email-required" type="email" />,
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    id: 'password-error',
    error: 'Password must be at least 8 characters long',
    children: <Input placeholder="Enter your password" id="password-error" type="password" error />,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    id: 'username-helper',
    helperText: 'Your username must be 3-16 characters long',
    children: <Input placeholder="Choose a username" id="username-helper" />,
  },
}

// Example stories with multiple variants
export const FormFieldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-80">
      <FormField label="Full Name" id="form-name">
        <Input placeholder="Enter your full name" id="form-name" />
      </FormField>
      
      <FormField label="Email" id="form-email" required>
        <Input placeholder="Enter your email" id="form-email" type="email" />
      </FormField>
      
      <FormField 
        label="Password" 
        id="form-password" 
        required
        helperText="Must be at least 8 characters"
      >
        <Input placeholder="Create a password" id="form-password" type="password" />
      </FormField>
      
      <FormField 
        label="Confirm Password" 
        id="form-confirm-password" 
        required
        error="Passwords do not match"
      >
        <Input placeholder="Confirm your password" id="form-confirm-password" type="password" error />
      </FormField>
    </div>
  ),
}