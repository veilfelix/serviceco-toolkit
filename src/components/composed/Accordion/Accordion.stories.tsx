import type { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '@/components/composed/Accordion/Accordion'

const meta: Meta<typeof Accordion.Root> = {
  title: 'Composed/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      description: 'Determines whether one or multiple items can be open at the same time',
      control: 'select',
      options: ['single', 'multiple'],
      defaultValue: 'single',
    },
    collapsible: {
      description: 'When type is "single", allows closing content by clicking the trigger of an open item',
      control: 'boolean',
      defaultValue: true,
    },
    defaultValue: {
      description: 'The value of the item(s) to expand by default (uncontrolled)',
      control: 'text',
    },
    value: {
      description: 'The controlled value of the item(s) to expand',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion.Root>

// Helpers to create consistent demo content
const faqItems = [
  {
    question: 'Is it accessible?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern. The Accordion component is built on top of Radix UI primitives which follow accessibility best practices.',
  },
  {
    question: 'Can I customize the styling?',
    answer: 'Yes! The component uses CSS variables from our design token system and Tailwind utility classes. You can modify the styling by overriding these variables or by passing custom class names to the component.',
  },
  {
    question: 'Is it responsive?',
    answer: 'Absolutely. The Accordion component is fully responsive and adapts to different screen sizes. It takes the full width of its parent container by default, so you can easily adjust its size as needed.',
  },
  {
    question: 'Can I nest accordions?',
    answer: 'While technically possible, nesting accordions is generally not recommended from a UX perspective. It can create a confusing interface for users. If you need to show hierarchical information, consider alternative UI patterns like trees or nested menus.',
  },
]

// Base story with controls
export const Playground: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
  },
  render: (args) => (
    <div className="w-96">
      <Accordion.Root {...args}>
        {faqItems.map((item, i) => (
          <Accordion.Item key={i} value={`item-${i + 1}`}>
            <Accordion.Trigger>{item.question}</Accordion.Trigger>
            <Accordion.Content>{item.answer}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
}

// Single accordion with collapsible items
export const SingleCollapsible: Story = {
  args: {
    type: 'single',
    collapsible: true,
    defaultValue: 'item-1',
  },
  render: (args) => (
    <div className="w-96">
      <Accordion.Root {...args}>
        {faqItems.map((item, i) => (
          <Accordion.Item key={i} value={`item-${i + 1}`}>
            <Accordion.Trigger>{item.question}</Accordion.Trigger>
            <Accordion.Content>{item.answer}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default accordion behavior with single open item at a time, which can be collapsed.',
      },
    },
  },
}

// Multiple accordions can be open at once
export const MultipleItems: Story = {
  args: {
    type: 'multiple',
    defaultValue: ['item-1', 'item-3'],
  },
  render: (args) => (
    <div className="w-96">
      <Accordion.Root {...args}>
        {faqItems.map((item, i) => (
          <Accordion.Item key={i} value={`item-${i + 1}`}>
            <Accordion.Trigger>{item.question}</Accordion.Trigger>
            <Accordion.Content>{item.answer}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
}

// Styled accordion
export const StyledAccordion: Story = {
  render: () => (
    <div className="w-96">
      <Accordion.Root
        type="single"
        collapsible
        className="rounded-md border border-border shadow-sm"
      >
        {faqItems.map((item, i) => (
          <Accordion.Item 
            key={i} 
            value={`item-${i + 1}`}
            className={i === 0 ? 'border-t-0' : ''}
          >
            <Accordion.Trigger className="px-4 hover:bg-muted hover:no-underline">
              {item.question}
            </Accordion.Trigger>
            <Accordion.Content className="bg-muted/30 px-4">
              {item.answer}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  ),
}

// With nested content
export const WithRichContent: Story = {
  render: () => (
    <div className="w-96">
      <Accordion.Root type="single" collapsible>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Product Features</Accordion.Trigger>
          <Accordion.Content>
            <ul className="list-disc pl-5 space-y-2">
              <li>Responsive design for all devices</li>
              <li>High-performance architecture</li>
              <li>Accessibility built-in</li>
              <li>Customizable theming</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Pricing Options</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <h4 className="font-semibold">Starter Plan</h4>
                <p className="text-muted-foreground">$9.99/month</p>
              </div>
              <div className="rounded-md border p-3">
                <h4 className="font-semibold">Pro Plan</h4>
                <p className="text-muted-foreground">$19.99/month</p>
              </div>
              <div className="rounded-md border p-3">
                <h4 className="font-semibold">Enterprise</h4>
                <p className="text-muted-foreground">Contact sales</p>
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
          <Accordion.Trigger>Support Options</Accordion.Trigger>
          <Accordion.Content>
            <div className="space-y-2">
              <p>We offer multiple ways to get support:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Email support</li>
                <li>Live chat</li>
                <li>Phone support (Pro and Enterprise plans)</li>
                <li>Community forums</li>
              </ul>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  ),
}