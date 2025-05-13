import type { Meta, StoryObj } from '@storybook/react'
import Skeleton from '@/components/ui/Skeleton/Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      description: 'The shape of the skeleton',
      control: 'select',
      options: ['rect', 'text', 'circle'],
      defaultValue: 'rect',
    },
    animation: {
      description: 'The animation type',
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      defaultValue: 'pulse',
    },
    width: {
      description: 'The width of the skeleton',
      control: 'text',
    },
    height: {
      description: 'The height of the skeleton',
      control: 'text',
    },
    count: {
      description: 'Number of skeleton items to render in a stack',
      control: 'number',
      defaultValue: 1,
    },
    gap: {
      description: 'Gap between multiple skeleton items',
      control: 'text',
      defaultValue: '0.5rem',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

// Base story with controls
export const Playground: Story = {
  args: {
    shape: 'rect',
    animation: 'pulse',
    width: '200px',
    height: '2rem',
    count: 1,
  },
}

// Shape variants
export const RectangleShape: Story = {
  args: {
    shape: 'rect',
    width: '200px',
    height: '2rem',
  },
}

export const TextShape: Story = {
  args: {
    shape: 'text',
    width: '200px',
  },
}

export const CircleShape: Story = {
  args: {
    shape: 'circle',
    width: '3rem',
    height: '3rem',
  },
}

// Animation variants
export const PulseAnimation: Story = {
  args: {
    animation: 'pulse',
    width: '200px',
    height: '2rem',
  },
}

export const WaveAnimation: Story = {
  args: {
    animation: 'wave',
    width: '200px',
    height: '20rem',
  },
}

export const NoAnimation: Story = {
  args: {
    animation: 'none',
    width: '200px',
    height: '2rem',
  },
}

// Multiple skeletons
export const MultipleItems: Story = {
  args: {
    width: '200px',
    height: '1.5rem',
    count: 5,
    gap: '0.75rem',
  },
}

// Usage examples
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[300px] p-4 border rounded-md border-border">
      <Skeleton
        shape="circle"
        width="4rem"
        height="4rem"
        className="mb-4 mx-auto"
      />
      <Skeleton shape="text" width="80%" className="mx-auto mb-2" />
      <Skeleton shape="text" width="60%" className="mx-auto mb-4" />
      <Skeleton shape="rect" height="6rem" className="mb-4" />
      <Skeleton shape="text" className="mb-1" />
      <Skeleton shape="text" className="mb-1" />
      <Skeleton shape="text" width="80%" />
    </div>
  ),
}

export const ProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center space-x-4 w-[300px]">
      <Skeleton shape="circle" width="3rem" height="3rem" />
      <div className="flex-1">
        <Skeleton shape="text" width="70%" className="mb-2" />
        <Skeleton shape="text" width="40%" />
      </div>
    </div>
  ),
}

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-[500px]">
      <div className="flex mb-4 space-x-2">
        <Skeleton shape="rect" width="25%" height="2rem" />
        <Skeleton shape="rect" width="50%" height="2rem" />
        <Skeleton shape="rect" width="25%" height="2rem" />
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex mb-2 space-x-2">
          <Skeleton shape="rect" width="25%" height="1.5rem" />
          <Skeleton shape="rect" width="50%" height="1.5rem" />
          <Skeleton shape="rect" width="25%" height="1.5rem" />
        </div>
      ))}
    </div>
  ),
}

export const FormSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Skeleton shape="text" width="30%" />
      <Skeleton shape="rect" height="2.5rem" />
      <Skeleton shape="text" width="30%" />
      <Skeleton shape="rect" height="2.5rem" />
      <Skeleton shape="text" width="30%" />
      <Skeleton shape="rect" height="5rem" />
      <Skeleton shape="rect" width="30%" height="2.5rem" />
    </div>
  ),
}