import type { Meta, StoryObj } from '@storybook/react'
import Stack from './Stack'
import Badge from '@/components/ui/Badge/Badge'
import Button from '@/components/ui/Button/Button'
import { Plus, Minus, AlertTriangle, Check, Info } from 'lucide-react'

const meta: Meta<typeof Stack> = {
  title: 'Components/UI/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      description: 'The direction to arrange children',
      control: 'select',
      options: ['column', 'row', 'column-reverse', 'row-reverse'],
      defaultValue: 'column',
    },
    gap: {
      description: 'The spacing between children',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    align: {
      description: 'Cross-axis alignment',
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      defaultValue: 'stretch',
    },
    justify: {
      description: 'Main-axis alignment',
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      defaultValue: 'start',
    },
    directionBreakpoint: {
      description: 'Breakpoint at which to switch direction from column to row',
      control: 'select',
      options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    as: {
      description: 'Render as a different HTML element',
      control: 'select',
      options: ['div', 'section', 'article', 'main', 'header', 'footer', 'nav', 'aside'],
      defaultValue: 'div',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Stack>

// Style for visualizing items in stories
const itemStyle = 'p-sm bg-muted rounded-md text-center min-w-[4rem]'

export const Playground: Story = {
  args: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    children: [
      <div key="1" className={itemStyle}>Item 1</div>,
      <div key="2" className={itemStyle}>Item 2</div>,
      <div key="3" className={itemStyle}>Item 3</div>,
    ],
  },
}

export const VerticalStack: Story = {
  args: {
    children: [
      <div key="1" className={itemStyle}>Item 1</div>,
      <div key="2" className={itemStyle}>Item 2</div>,
      <div key="3" className={itemStyle}>Item 3</div>,
    ],
  },
}

export const HorizontalStack: Story = {
  args: {
    direction: 'row',
    children: [
      <div key="1" className={itemStyle}>Item 1</div>,
      <div key="2" className={itemStyle}>Item 2</div>,
      <div key="3" className={itemStyle}>Item 3</div>,
    ],
  },
}

export const SpacingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;xs&quot;</h3>
        <Stack gap="xs" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Stack>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;sm&quot;</h3>
        <Stack gap="sm" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Stack>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;md&quot; (default)</h3>
        <Stack gap="md" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Stack>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;lg&quot;</h3>
        <Stack gap="lg" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Stack>
      </div>
    </div>
  ),
}

export const AlignmentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Vertical Stack with different alignments</h3>
        <div className="grid grid-cols-3 gap-md">
          <div>
            <p className="mb-sm text-sm">align=&quot;start&quot;</p>
            <Stack align="start" className="h-50 border border-dashed border-muted-foreground p-md">
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall item</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;center&quot;</p>
            <Stack align="center" className="h-50 border border-dashed border-muted-foreground p-md">
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall item</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;end&quot;</p>
            <Stack align="end" className="h-50 border border-dashed border-muted-foreground p-md">
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall item</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">Horizontal Stack with different alignments</h3>
        <div className="grid grid-cols-3 gap-md">
          <div>
            <p className="mb-sm text-sm">align=&quot;start&quot;</p>
            <Stack 
              direction="row" 
              align="start" 
              className="h-50 border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;center&quot;</p>
            <Stack 
              direction="row" 
              align="center" 
              className="h-50 border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;end&quot;</p>
            <Stack 
              direction="row" 
              align="end" 
              className="h-50 border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Short</div>
              <div className={`${itemStyle} h-16`}>Tall</div>
              <div className={itemStyle}>Short</div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const JustifyVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Horizontal Stack with different justifications</h3>
        <div className="grid grid-cols-2 gap-md">
          <div>
            <p className="mb-sm text-sm">justify=&quot;start&quot; (default)</p>
            <Stack 
              direction="row" 
              justify="start" 
              className="w-80 border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">justify=&quot;center&quot;</p>
            <Stack 
              direction="row" 
              justify="center" 
              className="w-80 border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">justify=&quot;end&quot;</p>
            <Stack 
              direction="row" 
              justify="end" 
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">justify=&quot;between&quot;</p>
            <Stack 
              direction="row" 
              justify="between" 
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">justify=&quot;around&quot;</p>
            <Stack 
              direction="row" 
              justify="around" 
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
          
          <div>
            <p className="mb-sm text-sm">justify=&quot;evenly&quot;</p>
            <Stack 
              direction="row" 
              justify="evenly" 
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ResponsiveDirection: Story = {
  render: () => (
    <div className="flex flex-col gap-lg max-w-full">
      <div>
        <h3 className="text-lg font-medium mb-sm">Responsive Stack (column to row at md breakpoint)</h3>
        <p className="text-sm text-muted-foreground mb-sm">Resize your browser to see the layout change</p>
        <Stack 
          directionBreakpoint="md"
          gap="md" 
          className="border border-dashed border-muted-foreground p-md"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Stack>
      </div>
    </div>
  ),
}

export const SingleChild: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Stack with a single child</h3>
        <Stack className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Single Item</div>
        </Stack>
      </div>
    </div>
  ),
}

export const CustomElement: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Stack rendered as a different element</h3>
        <Stack 
          as="section" 
          className="border border-dashed border-muted-foreground p-md"
        >
          <div className={itemStyle}>Item in a section</div>
          <div className={itemStyle}>Another item</div>
        </Stack>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Form-like layout</h3>
        <Stack gap="md" className="max-w-md">
          <Stack gap="xs">
            <label className="font-medium">Email</label>
            <input type="email" className="border rounded-md px-sm py-xs" placeholder="user@example.com" />
          </Stack>
          
          <Stack gap="xs">
            <label className="font-medium">Password</label>
            <input type="password" className="border rounded-md px-sm py-xs" placeholder="••••••••" />
          </Stack>
          
          <div className="pt-xs">
            <Button>Submit</Button>
          </div>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Alert with icon</h3>
        <Stack 
          direction="row" 
          gap="sm" 
          align="center" 
          className="bg-alert-warning-bg border border-alert-warning-border text-alert-warning-text p-md rounded-md"
        >
          <AlertTriangle size={18} />
          <div>
            <p className="font-medium">Warning</p>
            <p className="text-sm">This action cannot be undone.</p>
          </div>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Card with header and footer</h3>
        <Stack as="article" className="border rounded-md overflow-hidden">
          <div className="bg-muted p-md border-b">
            <h3 className="font-medium">Card Title</h3>
          </div>
          
          <div className="p-md">
            <p>Card content goes here. This is the main body of the card.</p>
          </div>
          
          <Stack direction="row" justify="end" gap="sm" className="bg-muted p-md border-t">
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </Stack>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Status badges with icons</h3>
        <Stack direction="row" gap="sm" className="flex-wrap">
          <Stack direction="row" gap="xs" align="center">
            <Badge variant="success">
              <Stack direction="row" gap="xs" align="center">
                <Check size={14} />
                <span>Success</span>
              </Stack>
            </Badge>
          </Stack>
          
          <Stack direction="row" gap="xs" align="center">
            <Badge variant="warning">
              <Stack direction="row" gap="xs" align="center">
                <AlertTriangle size={14} />
                <span>Warning</span>
              </Stack>
            </Badge>
          </Stack>
          
          <Stack direction="row" gap="xs" align="center">
            <Badge variant="danger">
              <Stack direction="row" gap="xs" align="center">
                <AlertTriangle size={14} />
                <span>Error</span>
              </Stack>
            </Badge>
          </Stack>
          
          <Stack direction="row" gap="xs" align="center">
            <Badge variant="secondary">
              <Stack direction="row" gap="xs" align="center">
                <Info size={14} />
                <span>Info</span>
              </Stack>
            </Badge>
          </Stack>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Number Stepper</h3>
        <Stack 
          direction="row" 
          gap="none" 
          align="center" 
          className="inline-flex border rounded-md overflow-hidden"
        >
          <button className="p-sm border-r hover:bg-muted">
            <Minus size={16} />
          </button>
          <div className="px-md py-sm">1</div>
          <button className="p-sm border-l hover:bg-muted">
            <Plus size={16} />
          </button>
        </Stack>
      </div>
    </div>
  ),
}