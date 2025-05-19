import type { Meta, StoryObj } from '@storybook/react'
import Card from '@/components/ui/Card/Card'
import Button from '@/components/ui/Button/Button'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
    children: {
      description: 'Card content',
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

// Base story with controls
export const Playground: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card description goes here</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>This is the main content area of the card.</p>
        </Card.Content>
        <Card.Footer>
          <Button>Action</Button>
        </Card.Footer>
      </>
    ),
  },
}

// Basic card with just content
export const SimpleCard: Story = {
  args: {
    children: (
      <Card.Content>
        <p>A simple card with just content and no header or footer.</p>
      </Card.Content>
    ),
  },
}

// Card with header and content
export const WithHeader: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Features</Card.Title>
          <Card.Description>Our platform offers everything you need.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Explore our comprehensive suite of tools and solutions designed to meet your needs.</p>
        </Card.Content>
      </>
    ),
  },
}

// Card with header, content, and footer
export const CompleteCard: Story = {
  args: {
    children: (
      <>
        <Card.Header>
          <Card.Title>Premium Plan</Card.Title>
          <Card.Description>$49/month</Card.Description>
        </Card.Header>
        <Card.Content>
          <ul className="list-disc pl-5 space-y-2">
            <li>Unlimited users</li>
            <li>24/7 support</li>
            <li>Advanced analytics</li>
            <li>Custom integrations</li>
          </ul>
        </Card.Content>
        <Card.Footer>
          <Button className="w-full">Subscribe Now</Button>
        </Card.Footer>
      </>
    ),
  },
}

// Card with custom styling
export const CustomStyling: Story = {
  args: {
    className: 'border-primary bg-input',
    children: (
      <>
        <Card.Header className="border-b border-[hsl(var(--primary))/30">
          <Card.Title className="text-primary">Custom Card</Card.Title>
          <Card.Description>With custom styling applied</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>This card demonstrates how you can apply custom styling to the card and its components.</p>
        </Card.Content>
        <Card.Footer className="flex justify-end">
          <Button variant="secondary">Cancel</Button>
          <Button className="ml-2">Submit</Button>
        </Card.Footer>
      </>
    ),
  },
}

// Multiple cards example
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <Card.Header>
            <Card.Title>Card {i}</Card.Title>
            <Card.Description>Description {i}</Card.Description>
          </Card.Header>
          <Card.Content>
            <p>Content for card {i}</p>
          </Card.Content>
          <Card.Footer>
            <Button size="sm">Action</Button>
          </Card.Footer>
        </Card>
      ))}
    </div>
  ),
}