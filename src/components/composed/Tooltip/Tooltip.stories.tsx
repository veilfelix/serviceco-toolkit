import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from '@/components/composed/Tooltip/Tooltip'
import Button from '@/components/ui/Button/Button'
import type { Decorator } from '@storybook/react'

const meta: Meta<typeof Tooltip.Content> = {
  title: 'Composed/Tooltip',
  component: Tooltip.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Tooltip content',
  },
  argTypes: {
    children: {
      description: 'Content to display in the tooltip',
      control: 'text',
    },
    side: {
      description: 'Side of the trigger to display the tooltip',
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: 'top',
    },
    align: {
      description: 'Alignment of the tooltip relative to the trigger',
      control: 'select',
      options: ['start', 'center', 'end'],
      defaultValue: 'center',
    },
    showArrow: {
      description: 'Show arrow pointing to the trigger',
      control: 'boolean',
      defaultValue: true,
    },
    className: {
      description: 'Additional CSS classes for the tooltip content',
      control: 'text',
    },
  },
  decorators: [
    ((Story, context) => {
      if (context.name !== 'MultipleTooltips') {
        return (
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Button>Hover me</Button>
              </Tooltip.Trigger>
              <Story />
            </Tooltip.Root>
          </Tooltip.Provider>
        )
      }
  
      return <Story />
    }) as Decorator,
  ],  
}

export default meta
type Story = StoryObj<typeof Tooltip.Content>

// Base story with controls
export const Playground: Story = {
  args: {
    children: 'This is a tooltip',
    side: 'top',
    align: 'center',
    showArrow: true,
  },
}

// Position variants
export const TopTooltip: Story = {
  args: {
    children: 'Tooltip on top',
    side: 'top',
  },
}

export const RightTooltip: Story = {
  args: {
    children: 'Tooltip on right',
    side: 'right',
  },
}

export const BottomTooltip: Story = {
  args: {
    children: 'Tooltip on bottom',
    side: 'bottom',
  },
}

export const LeftTooltip: Story = {
  args: {
    children: 'Tooltip on left',
    side: 'left',
  },
}

// Alignment variants
export const StartAligned: Story = {
  args: {
    children: 'Start-aligned tooltip',
    align: 'start',
  },
}

export const CenterAligned: Story = {
  args: {
    children: 'Center-aligned tooltip',
    align: 'center',
  },
}

export const EndAligned: Story = {
  args: {
    children: 'End-aligned tooltip',
    align: 'end',
  },
}

// Without arrow
export const WithoutArrow: Story = {
  args: {
    children: 'Tooltip without arrow',
    showArrow: false,
  },
}

// Example of rich content
export const RichContent: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-1 max-w-[200px]">
        <h4 className="font-bold">Tooltips can have rich content</h4>
        <p>Including multiple paragraphs and formatting.</p>
        <p className="text-muted-foreground">Even with colors!</p>
      </div>
    ),
  },
}

// Multiple tooltips example
export const MultipleTooltips: Story = {
  name: 'MultipleTooltips',
  render: () => (
    <div className="flex gap-4">
      <Tooltip.Provider>
        {['top', 'right', 'bottom', 'left'].map((side) => (
          <Tooltip.Root key={side}>
            <Tooltip.Trigger asChild>
              <Button size="sm">{side}</Button>
            </Tooltip.Trigger>
            <Tooltip.Content side={side as 'top' | 'right' | 'bottom' | 'left'}>
              Tooltip on {side}
            </Tooltip.Content>
          </Tooltip.Root>
        ))}
      </Tooltip.Provider>
    </div>
  ),
}