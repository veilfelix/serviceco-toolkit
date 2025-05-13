import type { Meta, StoryObj } from '@storybook/react'
import VisuallyHidden from './VisuallyHidden'
import Button from '@/components/ui/Button/Button'
import Stack from '@/components/ui/Stack/Stack'
import { X, Search, ArrowRight, Trash } from 'lucide-react'

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Accessibility/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: 'Render as a different HTML element',
      control: 'select',
      options: ['span', 'div', 'h2', 'p', 'label'],
      defaultValue: 'span',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`VisuallyHidden\` component is an accessibility utility that hides content visually
while keeping it accessible to screen readers. This is essential for providing context to
assistive technologies without affecting the visual design.

**Important note:** This component will appear empty visually, but its content will be
announced by screen readers. To see how it works, try using a screen reader to navigate
the examples below.
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof VisuallyHidden>

export const Basic: Story = {
  args: {
    children: 'This text is visually hidden but announced by screen readers',
  },
  parameters: {
    docs: {
      description: {
        story: 'The simplest usage of VisuallyHidden. The content is not visible but is accessible to screen readers.',
      },
    },
  },
  render: (args) => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md flex items-center justify-center">
      <VisuallyHidden {...args} />
      <p className="text-muted-foreground">
        👆 There is hidden text above this paragraph that is only visible to screen readers.
      </p>
    </div>
  ),
}

export const IconButton: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons should always have accessible text for screen readers.',
      },
    },
  },
  render: () => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md flex flex-col gap-md">
      <div>
        <h3 className="text-lg font-medium mb-sm">Icon Buttons with accessible labels</h3>
        <Stack direction="row" gap="md">
          <Button variant="tertiary" size="sm" className="p-sm">
            <VisuallyHidden>Close</VisuallyHidden>
            <X className="h-4 w-4" />
          </Button>
          
          <Button variant="tertiary" size="sm" className="p-sm">
            <VisuallyHidden>Search</VisuallyHidden>
            <Search className="h-4 w-4" />
          </Button>
          
          <Button variant="tertiary" size="sm" className="p-sm">
            <VisuallyHidden>Delete</VisuallyHidden>
            <Trash className="h-4 w-4" />
          </Button>
        </Stack>
      </div>
      
      <div className="text-sm text-muted-foreground mt-sm">
        <p>
          While sighted users can infer the meaning of these buttons from their icons,
          screen reader users will hear the hidden text (e.g., &quot;Close&quot;, &quot;Search&quot;, &quot;Delete&quot;).
        </p>
      </div>
    </div>
  ),
}

export const ContextualInformation: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Adding contextual information for screen readers without cluttering the visual interface.',
      },
    },
  },
  render: () => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md">
      <h3 className="text-lg font-medium mb-sm">Product Cards with Additional Context</h3>
      
      <div className="grid grid-cols-2 gap-md max-w-2xl">
        <div className="border rounded-md p-md">
          <h4 className="font-medium">Basic Plan</h4>
          <p className="text-muted-foreground mb-sm">$9.99/month</p>
          <Button>
            Learn More
            <ArrowRight className="ml-sm h-4 w-4" />
            <VisuallyHidden>about Basic Plan</VisuallyHidden>
          </Button>
        </div>
        
        <div className="border rounded-md p-md">
          <h4 className="font-medium">Premium Plan</h4>
          <p className="text-muted-foreground mb-sm">$19.99/month</p>
          <Button>
            Learn More
            <ArrowRight className="ml-sm h-4 w-4" />
            <VisuallyHidden>about Premium Plan</VisuallyHidden>
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-md">
        <p>
          The &quot;Learn More&quot; buttons include additional context for screen readers
          without making the visual UI repetitive. Screen readers will announce
          &quot;Learn More about Basic Plan&quot; and &quot;Learn More about Premium Plan&quot;.
        </p>
      </div>
    </div>
  ),
}

export const HiddenHeadings: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Providing semantic structure with headings that are hidden visually but available to screen readers.',
      },
    },
  },
  render: () => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md">
      <div className="flex flex-col gap-md">
        <section className="p-md border rounded-md">
          <VisuallyHidden as="h2">Product Features</VisuallyHidden>
          <ul className="list-disc list-inside space-y-xs">
            <li>Responsive design</li>
            <li>Accessible components</li>
            <li>Performant code</li>
          </ul>
        </section>
        
        <section className="p-md border rounded-md">
          <VisuallyHidden as="h2">Customer Testimonials</VisuallyHidden>
          <blockquote className="italic">
            &quot;This product has transformed our workflow!&quot;
          </blockquote>
        </section>
      </div>
      
      <div className="text-sm text-muted-foreground mt-md">
        <p>
          These sections have visually hidden headings that provide semantic 
          structure for screen reader users without affecting the visual design.
        </p>
      </div>
    </div>
  ),
}

export const AsVariousElements: Story = {
  parameters: {
    docs: {
      description: {
        story: 'VisuallyHidden can be rendered as different HTML elements.',
      },
    },
  },
  render: () => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md">
      <div className="flex flex-col gap-md">
        <div>
          <p className="mb-sm text-sm font-medium">As a span (default):</p>
          <div className="flex items-center border p-sm rounded-md">
            <VisuallyHidden>Hidden span content</VisuallyHidden>
            <p>Visible content with hidden span</p>
          </div>
        </div>
        
        <div>
          <p className="mb-sm text-sm font-medium">As a heading:</p>
          <div className="flex items-center border p-sm rounded-md">
            <VisuallyHidden as="h2">Hidden heading</VisuallyHidden>
            <p>Section with hidden heading</p>
          </div>
        </div>
        
        <div>
          <p className="mb-sm text-sm font-medium">As a paragraph:</p>
          <div className="flex items-center border p-sm rounded-md">
            <VisuallyHidden as="p">Hidden paragraph with detailed explanation</VisuallyHidden>
            <p>Content with hidden paragraph</p>
          </div>
        </div>
        
        <div>
          <p className="mb-sm text-sm font-medium">As a label:</p>
          <div className="flex items-center border p-sm rounded-md">
            <VisuallyHidden as="label" htmlFor="demo-input">Email address:</VisuallyHidden>
            <input id="demo-input" type="email" className="border-0 p-sm" placeholder="email@example.com" />
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-md">
        <p>
          The VisuallyHidden component can be rendered as any HTML element
          to maintain proper semantics while hiding content visually.
        </p>
      </div>
    </div>
  ),
}