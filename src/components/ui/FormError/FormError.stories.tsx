import type { Meta, StoryObj } from '@storybook/react'
import FormError from '@/components/ui/FormError/FormError'

const meta: Meta<typeof FormError> = {
  title: 'Components/UI/FormError',
  component: FormError,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Error message content',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof FormError>

// Base story with controls
export const Playground: Story = {
  args: {
    children: 'This field is required',
  },
}

// Additional examples
export const SimpleError: Story = {
  args: {
    children: 'Please enter a valid email address.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic error message for form validation feedback.',
      },
    },
  },
}

export const LongErrorMessage: Story = {
  args: {
    children: 'The password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
  },
}

export const ErrorExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4 w-80">
      <FormError>This field is required</FormError>
      <FormError>Please enter a valid email address</FormError>
      <FormError>Password must be at least 8 characters long</FormError>
    </div>
  ),
}