import type { Meta, StoryObj } from '@storybook/react'
import RichText from './RichText'

const meta: Meta<typeof RichText> = {
  title: 'Components/UI/RichText',
  component: RichText,
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    children: {
      description: 'Rich content (HTML or React nodes)',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof RichText>

export const Default: Story = {
  args: {
    children: (
      <>
        <h2>Rich Text Example</h2>
        <p>
          This is a <strong>paragraph</strong> inside the rich text container.
        </p>
        <ul>
          <li>First item</li>
          <li>Second item</li>
        </ul>
      </>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'bg-gray-100 p-4 rounded',
    children: (
      <>
        <h2>Styled Rich Text</h2>
        <p>This version has additional styling from custom className.</p>
      </>
    ),
  },
}
