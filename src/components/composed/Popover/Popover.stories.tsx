import type { Meta, StoryObj } from '@storybook/react'
import { Popover } from '@/components/composed/Popover/Popover'
import Button from '@/components/ui/Button/Button'
import Input from '@/components/ui/Input/Input'
import Label from '@/components/ui/Label/Label'
import { Settings, Calendar } from 'lucide-react'
import type { Decorator } from '@storybook/react'

const meta: Meta<typeof Popover.Content> = {
  title: 'Composed/Popover',
  component: Popover.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      description: 'The alignment of the popover relative to its trigger',
      control: 'select',
      options: ['start', 'center', 'end'],
      defaultValue: 'center',
    },
    side: {
      description: 'The side of the trigger to display the popover',
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: 'bottom',
    },
    sideOffset: {
      description: 'The vertical offset of the popover',
      control: 'number',
      defaultValue: 4,
    },
    showClose: {
      description: 'Whether to show a close button',
      control: 'boolean',
      defaultValue: true,
    },
    className: {
      description: 'Additional CSS classes for the content',
      control: 'text',
    },
  },
  decorators: [
    ((Story, context) => {
      if (context.args?.children) {
        return (
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button>Open Popover</Button>
            </Popover.Trigger>
            <Story />
          </Popover.Root>
        )
      }

      return <Story />
    }) as Decorator,
  ]
}

export default meta
type Story = StoryObj<typeof Popover.Content>

// Base story with controls
export const Playground: Story = {
  args: {
    align: 'center',
    side: 'bottom',
    sideOffset: 4,
    showClose: true,
    children: (
      <>
        <div className="text-center">
          <h4 className="text-base font-medium">Popover Title</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            This is a popover with some example content.
          </p>
        </div>
      </>
    ),
  },
}

// Basic popover
export const Basic: Story = {
  args: {
    children: (
      <div className="space-y-2">
        <h4 className="font-medium">Popover Title</h4>
        <p className="text-sm text-muted-foreground">
          This is a basic popover with some content.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic popover with title and text content.',
      },
    },
  },
}

// With arrow
export const WithArrow: Story = {
  args: {
    children: (
      <>
        <Popover.Arrow className="h-2 w-4" />
        <div className="space-y-2">
          <h4 className="font-medium">Popover with Arrow</h4>
          <p className="text-sm text-muted-foreground">
            This popover has an arrow pointing to the trigger.
          </p>
        </div>
      </>
    ),
  },
}

// Without close button
export const WithoutCloseButton: Story = {
  args: {
    showClose: false,
    children: (
      <div className="space-y-2">
        <h4 className="font-medium">No Close Button</h4>
        <p className="text-sm text-muted-foreground">
          This popover doesn&apos;t have a close button.
        </p>
      </div>
    ),
  },
}

// Form content
export const FormContent: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="primary">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Schedule</span>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Schedule Meeting</h4>
            <p className="text-sm text-muted-foreground">
              Set your availability for the meeting.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" className="col-span-2" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" className="col-span-2" />
            </div>
          </div>
          <Button className="w-full">Schedule</Button>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Settings popover example
export const SettingsPopover: Story = {
  render: () => (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button variant="primary" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content side="right">
        <Popover.Arrow className="h-2 w-4" />
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Display Settings</h4>
            <p className="text-sm text-muted-foreground">
              Customize how the content is displayed.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input id="width" defaultValue="100%" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input id="height" defaultValue="auto" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  ),
}

// Different side placement
export const SidePlacements: Story = {
  render: () => (
    <div className="flex items-center justify-center space-x-4">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button>Top</Button>
        </Popover.Trigger>
        <Popover.Content side="top">
          <Popover.Arrow className="h-2 w-4" />
          <p>Appears on top</p>
        </Popover.Content>
      </Popover.Root>
      
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button>Right</Button>
        </Popover.Trigger>
        <Popover.Content side="right">
          <Popover.Arrow className="h-2 w-4" />
          <p>Appears on right</p>
        </Popover.Content>
      </Popover.Root>
      
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button>Bottom</Button>
        </Popover.Trigger>
        <Popover.Content side="bottom">
          <Popover.Arrow className="h-2 w-4" />
          <p>Appears on bottom</p>
        </Popover.Content>
      </Popover.Root>
      
      <Popover.Root>
        <Popover.Trigger asChild>
          <Button>Left</Button>
        </Popover.Trigger>
        <Popover.Content side="left">
          <Popover.Arrow className="h-2 w-4" />
          <p>Appears on left</p>
        </Popover.Content>
      </Popover.Root>
    </div>
  ),
}