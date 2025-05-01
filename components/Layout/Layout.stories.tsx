import type { Meta, StoryObj } from '@storybook/react'
import Layout from './Layout'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout/Layout',
  component: Layout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    description: {
      component: 'App layout wrapper including header, footer, and main content area.',
    },
  },
}
export default meta

type Story = StoryObj<typeof Layout>

export const Default: Story = {
  render: () => (
    <Layout>
      <div className="p-8 bg-gray-50 text-center text-gray-700 border rounded">
        This is some sample content inside the layout.
      </div>
    </Layout>
  ),
}
