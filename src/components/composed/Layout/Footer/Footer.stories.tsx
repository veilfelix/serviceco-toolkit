import type { Meta, StoryObj } from '@storybook/react'
import Footer from '@/components/composed/Layout/Footer/Footer'

const meta: Meta<typeof Footer> = {
  title: 'Composed/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    description: {
      component: 'Simple site footer with current year and placeholder copyright.',
    },
  },
}
export default meta

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  render: () => <Footer />,
}
