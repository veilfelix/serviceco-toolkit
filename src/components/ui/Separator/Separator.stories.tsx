import { Meta, StoryObj } from '@storybook/react'
import Separator from './Separator'
import Text from '@/components/ui/Text/Text'
import Stack from '@/components/ui/Stack/Stack'

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    thickness: {
      control: 'radio',
      options: ['thin', 'regular', 'thick'],
      description: 'The thickness of the separator line',
      table: { defaultValue: { summary: 'regular' } },
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'accent', 'primary'],
      description: 'The color of the separator',
      table: { defaultValue: { summary: 'default' } },
    },
    label: {
      control: 'text',
      description: 'Optional text label to display centered on the separator',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
}
export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  render: (args) => (
    <div className="bg-background p-4 space-y-4 min-h-12 flex flex-col justify-center">
      <p>Above</p>
      <Separator {...args} />
      <p>Below</p>
    </div>
  ),
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="bg-background p-4 space-y-4 min-h-12 flex flex-col justify-center">
      <p>Above</p>
      <Separator {...args} label="Section Label" />
      <p>Below</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: (args) => (
    <div className="h-40">
      <Separator {...args} orientation="vertical" />
    </div>
  ),
}

export const Thicknesses: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text>Thin</Text>
        <Separator thickness="thin" />
      </Stack>
      <Stack gap="sm">
        <Text>Regular (default)</Text>
        <Separator thickness="regular" />
      </Stack>
      <Stack gap="sm">
        <Text>Thick</Text>
        <Separator thickness="thick" />
      </Stack>
    </Stack>
  ),
}

export const Colors: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text>Default</Text>
        <Separator color="default" />
      </Stack>
      <Stack gap="sm">
        <Text>Muted</Text>
        <Separator color="muted" />
      </Stack>
      <Stack gap="sm">
        <Text>Accent</Text>
        <Separator color="accent" />
      </Stack>
      <Stack gap="sm">
        <Text>Primary</Text>
        <Separator color="primary" />
      </Stack>
    </Stack>
  ),
}

export const WithContent: Story = {
  render: () => (
    <Stack gap="lg">
      <Text as="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Separator />
      <Text as="p">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
      <Separator label="Section" />
      <Text as="p">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
    </Stack>
  ),
}

export const VerticalWithContent: Story = {
  render: () => (
    <div className="flex flex-row h-40">
      <div className="flex-1 p-md">
        <Text as="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 p-md">
        <Text as="p">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </div>
    </div>
  ),
}
