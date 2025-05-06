import type { Meta, StoryObj } from '@storybook/react'
import Text from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/UI/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: 'The HTML tag to render',
      control: 'select',
      options: ['p', 'span', 'div'],
      defaultValue: 'p',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    children: {
      description: 'Text content',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'This is a paragraph of body text using design system styles.',
  },
}

export const Span: Story = {
  args: {
    as: 'span',
    children: 'This is inline text in a span element.',
  },
}

export const WithCustomClass: Story = {
  args: {
    as: 'div',
    children: 'This text is inside a div with custom styles.',
    className: 'text-red-500 italic',
  },
}
