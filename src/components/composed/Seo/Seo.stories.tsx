import type { Meta, StoryObj } from '@storybook/react'
import Seo from '@/components/composed/Seo/Seo'

const meta: Meta<typeof Seo> = {
  title: 'Composed/SEO/Seo',
  component: Seo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Seo>

export const Default: Story = {
  args: {
    title: 'Homepage',
    description: 'This is the homepage of ServiceCo Toolkit.',
  },
}
