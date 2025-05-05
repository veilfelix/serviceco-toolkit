import type { Meta, StoryObj } from '@storybook/react'
import Header from '@/components/Layout/Header/Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    description: {
      component: 'Simple header with navigation links and logo for ServiceCo. Temporary placeholder for layout dev.',
    },
  },
}
export default meta

type Story = StoryObj<typeof Header>

export const Default: Story = {
  render: () => <Header />,
}
