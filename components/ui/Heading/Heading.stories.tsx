import type { Meta, StoryObj } from '@storybook/react'
import Heading from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'UI/Heading',
  component: Heading,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'This is an H1',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'This is an H2',
  },
}

export const CustomClass: Story = {
  args: {
    as: 'h3',
    children: 'Heading with extra classes',
    className: 'text-red-500 underline',
  },
}
