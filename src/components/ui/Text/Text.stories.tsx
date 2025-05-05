import type { Meta, StoryObj } from '@storybook/react'
import Text from '@/components/ui/Text/Text'

const meta: Meta<typeof Text> = {
  title: 'Components/UI/Text',
  component: Text,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Text>

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph of body text with a readable line length and consistent typography.',
  },
}

export const Span: Story = {
  args: {
    as: 'span',
    children: 'This is an inline span styled like text.',
  },
}
