import type { Meta, StoryObj } from '@storybook/react'
import SkipLink from '@/components/a11y/SkipLink/SkipLink'

const meta: Meta<typeof SkipLink> = {
  title: 'Accessibility/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SkipLink>

export const Default: Story = {
  render: () => (
    <>
      <SkipLink />
      <main id="main" className="p-8">
        <p>This is the main content area.</p>
      </main>
    </>
  ),
}
