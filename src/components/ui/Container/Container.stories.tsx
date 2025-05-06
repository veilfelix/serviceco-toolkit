import type { Meta, StoryObj } from '@storybook/react'
import Container from './Container'

const meta: Meta<typeof Container> = {
  title: 'Components/UI/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional classes to apply to the container',
      control: 'text',
    },
    children: {
      description: 'Inner content',
      control: false,
    },
  },
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-muted p-6 rounded-md text-sm text-muted-foreground">
        <p>
          This content is wrapped inside a responsive container using tokens and
          design system spacing.
        </p>
      </div>
    ),
  },
}
