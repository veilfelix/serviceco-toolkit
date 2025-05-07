import type { Meta, StoryObj } from '@storybook/react'
import Avatar from '@/components/ui/Avatar/Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the avatar',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
    shape: {
      description: 'Shape of the avatar',
      control: 'radio',
      options: ['circle', 'square'],
      defaultValue: 'circle',
    },
    bordered: {
      description: 'Whether the avatar has a border',
      control: 'boolean',
      defaultValue: false,
    },
    status: {
      description: 'Status indicator in the bottom-right corner',
      control: 'select',
      options: ['none', 'online', 'offline', 'away', 'busy'],
      defaultValue: 'none',
    },
    className: {
      description: 'Additional CSS classes to add',
      control: 'text',
    },
    children: {
      description: 'Avatar content (usually AvatarImage or AvatarFallback)',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

// Sample image URL
const sampleImageUrl = 'https://i.pravatar.cc/300'

// Base story with controls
export const Playground: Story = {
  args: {
    size: 'md',
    shape: 'circle',
    bordered: false,
    status: 'none',
    children: (
      <>
        <Avatar.Image src={sampleImageUrl} alt="User" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </>
    ),
  },
}

// Basic avatar with image
export const WithImage: Story = {
  args: {
    children: (
      <Avatar.Image src={sampleImageUrl} alt="John Doe" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic avatar with an image.',
      },
    },
  },
}

// Avatar with fallback
export const WithFallback: Story = {
  args: {
    children: (
      <Avatar.Fallback>JD</Avatar.Fallback>
    ),
  },
}

// Avatar with image and fallback
export const WithImageAndFallback: Story = {
  args: {
    children: (
      <>
        <Avatar.Image src="invalid-url.jpg" alt="John Doe" />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </>
    ),
  },
}

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar size="xs">
        <Avatar.Fallback>XS</Avatar.Fallback>
      </Avatar>
      <Avatar size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
      <Avatar size="xl">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}

// Shape variants
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar shape="circle">
        <Avatar.Image src={sampleImageUrl} alt="Circle avatar" />
      </Avatar>
      <Avatar shape="square">
        <Avatar.Image src={sampleImageUrl} alt="Square avatar" />
      </Avatar>
    </div>
  ),
}

// Status variants
export const StatusIndicators: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar status="online">
        <Avatar.Fallback>ON</Avatar.Fallback>
      </Avatar>
      <Avatar status="offline">
        <Avatar.Fallback>OFF</Avatar.Fallback>
      </Avatar>
      <Avatar status="away">
        <Avatar.Fallback>AW</Avatar.Fallback>
      </Avatar>
      <Avatar status="busy">
        <Avatar.Fallback>BS</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}

// Bordered avatar
export const Bordered: Story = {
  args: {
    bordered: true,
    children: (
      <Avatar.Image src={sampleImageUrl} alt="Bordered avatar" />
    ),
  },
}

// Fallback color schemes
export const FallbackColorSchemes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar>
        <Avatar.Fallback colorScheme="gray">GR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback colorScheme="primary">PR</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback colorScheme="secondary">SC</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback colorScheme="random">A</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback colorScheme="random">B</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback colorScheme="random">C</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}

// Avatar group example
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar bordered>
        <Avatar.Image src={`${sampleImageUrl}?user=1`} alt="User 1" />
      </Avatar>
      <Avatar bordered>
        <Avatar.Image src={`${sampleImageUrl}?user=2`} alt="User 2" />
      </Avatar>
      <Avatar bordered>
        <Avatar.Image src={`${sampleImageUrl}?user=3`} alt="User 3" />
      </Avatar>
      <Avatar bordered>
        <Avatar.Fallback colorScheme="primary">+5</Avatar.Fallback>
      </Avatar>
    </div>
  ),
}

// With icon fallback
export const WithIconFallback: Story = {
  args: {
    children: (
      <Avatar.Fallback>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-5 h-5"
        >
          <path 
            fillRule="evenodd" 
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" 
            clipRule="evenodd" 
          />
        </svg>
      </Avatar.Fallback>
    ),
  },
}