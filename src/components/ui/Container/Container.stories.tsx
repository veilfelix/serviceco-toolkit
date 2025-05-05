import type { Meta, StoryObj } from '@storybook/react'
import Container from '@/components/ui/Container/Container'

const meta: Meta<typeof Container> = {
  title: 'Components/UI/Container',
  component: Container,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-gray-100 p-6">
        <p>This content is wrapped inside a responsive container.</p>
      </div>
    ),
  },
}