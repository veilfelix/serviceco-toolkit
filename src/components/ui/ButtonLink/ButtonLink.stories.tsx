import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

const meta: Meta<typeof ButtonLink> = {
  title: 'Components/UI/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'Button visual style',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      description: 'Button size',
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      description: 'Disable the link (aria-disabled + no click)',
      control: 'boolean',
    },
    href: {
      description: 'Destination URL',
      control: 'text',
    },
    target: {
      description: 'Target attribute (_blank, etc.)',
      control: 'text',
    },
    className: {
      description: 'Extra CSS classes',
      control: 'text',
    },
    children: {
      description: 'Link content',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Visit site',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
}

export const Secondary: Story = {
  args: {
    href: '#',
    children: 'More info',
    variant: 'secondary',
  },
}

export const Disabled: Story = {
  args: {
    href: '#',
    children: 'Disabled link',
    disabled: true,
  },
}
