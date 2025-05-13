import type { Meta, StoryObj } from '@storybook/react'
import Spacer from './Spacer'
import Text from '@/components/ui/Text/Text'
import Heading from '@/components/ui/Heading/Heading'
import Stack from '@/components/ui/Stack/Stack'

const meta: Meta<typeof Spacer> = {
  title: 'UI/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'The size of the spacer (amount of spacing)',
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    orientation: {
      description: 'The orientation of the spacer',
      control: 'radio',
      options: ['vertical', 'horizontal'],
      defaultValue: 'vertical',
    },
    as: {
      description: 'Render as a different HTML element',
      control: 'select',
      options: ['div', 'span', 'hr'],
      defaultValue: 'div',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Spacer>

// Simple placeholder box for visualization
const Box = () => (
  <div className="bg-muted p-md rounded-md text-center">
    Content block
  </div>
)

export const Playground: Story = {
  args: {
    size: 'md',
    orientation: 'vertical',
  },
  render: (args) => (
    <div>
      <Box />
      <Spacer {...args} />
      <Box />
    </div>
  ),
}

export const VerticalSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">size=&quot;xs&quot;</h3>
        <div className="border border-dashed border-muted-foreground p-md">
          <Box />
          <Spacer size="xs" />
          <Box />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">size=&quot;sm&quot;</h3>
        <div className="border border-dashed border-muted-foreground p-md">
          <Box />
          <Spacer size="sm" />
          <Box />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">size=&quot;md&quot; (default)</h3>
        <div className="border border-dashed border-muted-foreground p-md">
          <Box />
          <Spacer size="md" />
          <Box />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">size=&quot;lg&quot;</h3>
        <div className="border border-dashed border-muted-foreground p-md">
          <Box />
          <Spacer size="lg" />
          <Box />
        </div>
      </div>
    </div>
  ),
}

export const HorizontalSpacing: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Horizontal spacing at different sizes</h3>
        <div className="grid grid-cols-2 gap-md">
          <div>
            <p className="mb-sm text-sm">size=&quot;xs&quot;</p>
            <div className="flex items-center border border-dashed border-muted-foreground p-md">
              <div className="bg-muted p-xs rounded-md">Item</div>
              <Spacer orientation="horizontal" size="xs" />
              <div className="bg-muted p-xs rounded-md">Item</div>
            </div>
          </div>
          
          <div>
            <p className="mb-sm text-sm">size=&quot;sm&quot;</p>
            <div className="flex items-center border border-dashed border-muted-foreground p-md">
              <div className="bg-muted p-xs rounded-md">Item</div>
              <Spacer orientation="horizontal" size="sm" />
              <div className="bg-muted p-xs rounded-md">Item</div>
            </div>
          </div>
          
          <div>
            <p className="mb-sm text-sm">size=&quot;md&quot;</p>
            <div className="flex items-center border border-dashed border-muted-foreground p-md">
              <div className="bg-muted p-xs rounded-md">Item</div>
              <Spacer orientation="horizontal" size="md" />
              <div className="bg-muted p-xs rounded-md">Item</div>
            </div>
          </div>
          
          <div>
            <p className="mb-sm text-sm">size=&quot;lg&quot;</p>
            <div className="flex items-center border border-dashed border-muted-foreground p-md">
              <div className="bg-muted p-xs rounded-md">Item</div>
              <Spacer orientation="horizontal" size="lg" />
              <div className="bg-muted p-xs rounded-md">Item</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Section separation</h3>
        <div className="border border-dashed border-muted-foreground p-md rounded-md max-w-lg">
          <Heading as="h2">First Section</Heading>
          <Text>This is the content of the first section. It might be about something interesting like product features or an introduction.</Text>
          
          <Spacer size="lg" />
          
          <Heading as="h2">Second Section</Heading>
          <Text>This is the content of the second section. It might contain details about different topics or address different aspects of the subject.</Text>
          
          <Spacer size="lg" />
          
          <Heading as="h2">Third Section</Heading>
          <Text>This is the content of the third section. It might contain a conclusion or call to action for the reader.</Text>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Form fields separation</h3>
        <div className="border border-dashed border-muted-foreground p-md rounded-md max-w-md">
          <Stack gap="xs">
            <label className="font-medium">Name</label>
            <input type="text" className="border rounded-md px-sm py-xs" placeholder="John Doe" />
          </Stack>
          
          <Spacer size="sm" />
          
          <Stack gap="xs">
            <label className="font-medium">Email</label>
            <input type="email" className="border rounded-md px-sm py-xs" placeholder="john.doe@example.com" />
          </Stack>
          
          <Spacer size="sm" />
          
          <Stack gap="xs">
            <label className="font-medium">Message</label>
            <textarea className="border rounded-md px-sm py-xs" rows={3} placeholder="Type your message here..."></textarea>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Icon and text spacing</h3>
        <div className="border border-dashed border-muted-foreground p-md rounded-md">
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground p-xs rounded-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-4 w-4"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <Spacer orientation="horizontal" size="sm" />
            <Text>Important information that needs an icon</Text>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Card elements spacing</h3>
        <div className="border border-dashed border-muted-foreground p-md rounded-md max-w-md">
          <div className="border rounded-md overflow-hidden">
            <div className="bg-primary text-primary-foreground p-md">
              <h3 className="font-medium">Card Title</h3>
            </div>
            
            <div className="p-md">
              <Text>This is the main content of the card.</Text>
              <Spacer size="sm" />
              <Text className="text-sm text-muted-foreground">Additional details or explanation can go here.</Text>
            </div>
            
            <div className="bg-muted p-md flex justify-end">
              <button className="bg-primary text-primary-foreground px-md py-xs rounded-md">Action</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AsHorizontalRule: Story = {
  args: {
    orientation: 'vertical',
    as: 'hr',
    className: 'border-t border-muted my-md',
  },
  render: (args) => (
    <div className="border border-dashed border-muted-foreground p-md max-w-md">
      <Text>First paragraph of content. This might be the introduction to an article or the opening paragraph of a longer piece of content.</Text>
      <Spacer {...args} />
      <Text>Second paragraph of content after the horizontal rule. This continues the article or content with new information or details.</Text>
    </div>
  ),
}

export const ResponsiveSpacing: Story = {
  render: () => (
    <div className="border border-dashed border-muted-foreground p-md rounded-md">
      <div className="md:hidden">
        <Text className="font-medium">Mobile View (Small Spacing)</Text>
        <Box />
        <Spacer size="sm" />
        <Box />
      </div>
      <div className="hidden md:block">
        <Text className="font-medium">Desktop View (Large Spacing)</Text>
        <Box />
        <Spacer size="lg" />
        <Box />
      </div>
      <Text className="text-sm text-muted-foreground mt-sm">
        Resize your browser to see the spacing change based on viewport width
      </Text>
    </div>
  ),
}