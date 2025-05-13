/* eslint-disable jsx-a11y/alt-text */
import type { Meta, StoryObj } from '@storybook/react'
import Grid, { GridFlow } from './Grid'
import { Image, Camera, ShoppingCart, User, Settings, Home, Book, Mail } from 'lucide-react'

const meta: Meta<typeof Grid> = {
  title: 'UI/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      description: 'Number of columns or auto layout type',
      control: { 
        type: 'select',
        options: [1, 2, 3, 4, 5, 6, 'auto-fill', 'auto-fit']
      },
      defaultValue: 1,
    },
    gap: {
      description: 'Space between grid items',
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    gapX: {
      description: 'Horizontal space between grid items',
      control: 'select',
      options: [undefined, 'none', 'xs', 'sm', 'md', 'lg'],
    },
    gapY: {
      description: 'Vertical space between grid items',
      control: 'select',
      options: [undefined, 'none', 'xs', 'sm', 'md', 'lg'],
    },
    align: {
      description: 'Vertical alignment of grid items',
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      defaultValue: 'stretch',
    },
    justify: {
      description: 'Horizontal alignment of grid items',
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      defaultValue: 'start',
    },
    flow: {
      description: 'Grid auto flow direction',
      control: 'select',
      options: [undefined, 'row', 'col', 'dense', 'row-dense', 'col-dense'],
    },
    minColWidth: {
      description: 'Minimum column width for auto-fill/auto-fit layouts',
      control: 'text',
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
type Story = StoryObj<typeof Grid>

// Style for visualizing grid items
const itemStyle = 'bg-muted rounded-md p-md text-center w-full min-h-[100px] flex items-center justify-center'

export const Playground: Story = {
  args: {
    columns: 3,
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    children: [
      <div key="1" className={itemStyle}>Grid Item 1</div>,
      <div key="2" className={itemStyle}>Grid Item 2</div>,
      <div key="3" className={itemStyle}>Grid Item 3</div>,
      <div key="4" className={itemStyle}>Grid Item 4</div>,
      <div key="5" className={itemStyle}>Grid Item 5</div>,
      <div key="6" className={itemStyle}>Grid Item 6</div>,
    ],
  },
}

export const BasicGrid: Story = {
  args: {
    columns: 2,
    gap: 'md',
    children: [
      <div key="1" className={itemStyle}>Grid Item 1</div>,
      <div key="2" className={itemStyle}>Grid Item 2</div>,
      <div key="3" className={itemStyle}>Grid Item 3</div>,
      <div key="4" className={itemStyle}>Grid Item 4</div>,
    ],
  },
}

export const DifferentColumnCounts: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">1 Column</h3>
        <Grid 
          columns={1} 
          gap="md"
          align="stretch"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">2 Columns</h3>
        <Grid 
          columns={2} 
          gap="md"
          align="stretch"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">3 Columns</h3>
        <Grid 
          columns={3} 
          gap="md"
          align="stretch"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">4 Columns</h3>
        <Grid 
          columns={4} 
          gap="md"
          align="stretch"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
          <div className={itemStyle}>Item 7</div>
          <div className={itemStyle}>Item 8</div>
        </Grid>
      </div>
    </div>
  ),
}

export const AutoFillGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-md w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold">Auto-fill (with gaps)</h3>
      <p className="text-sm text-muted-foreground">
        Columns are pre-allocated even when empty. Resize to see how the grid keeps empty tracks.
      </p>
      <Grid
        columns="auto-fill"
        minColWidth="100px"
        gap="md"
        className="border border-dashed border-muted-foreground p-md"
      >
        <div className={itemStyle}>Item 1</div>
        <div className={itemStyle}>Item 2</div>
      </Grid>
    </div>
  ),
}

export const AutoFitGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-md w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold">Auto-fit (collapsing empty space)</h3>
      <p className="text-sm text-muted-foreground">
        Columns collapse when empty. Resize to see how extra space is used.
      </p>
      <Grid
        columns="auto-fit"
        minColWidth="100px"
        gap="md"
        className="border border-dashed border-muted-foreground p-md"
      >
        <div className={itemStyle}>Item 1</div>
        <div className={itemStyle}>Item 2</div>
      </Grid>
    </div>
  ),
}

export const AutoFitGrid_ManyItems: Story = {
  render: () => (
    <div className="flex flex-col gap-md w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold">Auto-fit with many items</h3>
      <p className="text-sm text-muted-foreground">
        Notice how the grid adapts to fit items tightly and collapse empty columns.
      </p>
      <Grid
        columns="auto-fit"
        minColWidth="120px"
        gap="sm"
        className="border border-dashed border-muted-foreground p-md"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className={itemStyle}>Item {i + 1}</div>
        ))}
      </Grid>
    </div>
  ),
}

export const ResponsiveGrid: Story = {
  render: () => (
    <div className="flex flex-col gap-lg max-w-full">
      <div>
        <h3 className="text-lg font-medium mb-sm">Responsive Grid</h3>
        <p className="text-sm text-muted-foreground mb-sm">1 column by default, 2 columns at SM, 3 at MD, 4 at LG breakpoints</p>
        <Grid 
          responsive={{ sm: 2, md: 3, lg: 4 }}
          gap="md" 
          className="border border-dashed border-muted-foreground p-md"
        >
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
          <div className={itemStyle}>Item 7</div>
          <div className={itemStyle}>Item 8</div>
        </Grid>
      </div>
    </div>
  ),
}

export const SpacingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;xs&quot;</h3>
        <Grid columns={3} gap="xs" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;sm&quot;</h3>
        <Grid columns={3} gap="sm" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;md&quot; (default)</h3>
        <Grid columns={3} gap="md" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">gap=&quot;lg&quot;</h3>
        <Grid columns={3} gap="lg" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">Different Column/Row Gaps (gapX=&quot;lg&quot;, gapY=&quot;xs&quot;)</h3>
        <Grid columns={3} gapX="lg" gapY="xs" className="border border-dashed border-muted-foreground p-md">
          <div className={itemStyle}>Item 1</div>
          <div className={itemStyle}>Item 2</div>
          <div className={itemStyle}>Item 3</div>
          <div className={itemStyle}>Item 4</div>
          <div className={itemStyle}>Item 5</div>
          <div className={itemStyle}>Item 6</div>
        </Grid>
      </div>
    </div>
  ),
}

export const AlignmentVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Grid with different alignments</h3>
        <div className="grid grid-cols-2 gap-md">
          <div>
            <p className="mb-sm text-sm">align=&quot;start&quot;</p>
            <Grid 
              columns={3} 
              align="start" 
              gap="md"
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={`${itemStyle} h-20`}>Short</div>
              <div className={`${itemStyle} h-40`}>Tall</div>
              <div className={`${itemStyle} h-20`}>Short</div>
            </Grid>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;center&quot;</p>
            <Grid 
              columns={3} 
              align="center" 
              gap="md"
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={`${itemStyle} h-20`}>Short</div>
              <div className={`${itemStyle} h-40`}>Tall</div>
              <div className={`${itemStyle} h-20`}>Short</div>
            </Grid>
          </div>
          
          <div>
            <p className="mb-sm text-sm">align=&quot;end&quot;</p>
            <Grid 
              columns={3} 
              align="end" 
              gap="md"
              className="border border-dashed border-muted-foreground p-md"
            >
              <div className={`${itemStyle} h-20`}>Short</div>
              <div className={`${itemStyle} h-40`}>Tall</div>
              <div className={`${itemStyle} h-20`}>Short</div>
            </Grid>
          </div>

          <div>
            <p className="mb-sm text-sm">align=&quot;stretch&quot; (default)</p>
            <Grid 
              columns={3} 
              align="stretch" 
              gap="md"
              className="border border-dashed border-muted-foreground p-md h-40"
            >
              <div className={itemStyle}>Item 1</div>
              <div className={itemStyle}>Item 2</div>
              <div className={itemStyle}>Item 3</div>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const FlowVariants: Story = {
  render: () => {
    const items = [
      <div className={itemStyle} key="1">Item 1</div>,
      <div className={`${itemStyle} row-span-2 h-32`} key="2">Item 2 (Tall)</div>,
      <div className={itemStyle} key="3">Item 3</div>,
      <div className={`${itemStyle} col-span-2`} key="4">Item 4 (Wide)</div>,
      <div className={itemStyle} key="5">Item 5</div>,
      <div className={`${itemStyle} row-span-2 h-32`} key="6">Item 6 (Tall)</div>,
      <div className={itemStyle} key="7">Item 7</div>
    ]

    const flows: GridFlow[] = [
      'row',
      'row-dense',
      'col',
      'col-dense',
      'dense'
    ]

    return (
      <div className="flex flex-col gap-lg">
        <h3 className="text-lg font-medium mb-sm">Grid with different flow values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {flows.map((flow) => (
            <div key={flow}>
              <p className="mb-sm text-sm text-muted-foreground">
                flow=&quot;<strong>{flow}</strong>&quot;
              </p>
              <Grid
                columns={3}
                flow={flow}
                gap="sm"
                className="border border-dashed border-muted-foreground p-sm h-f"
              >
                {items}
              </Grid>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const CustomElement: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Grid rendered as a different element</h3>
        <Grid 
          as="section" 
          columns={3}
          gap="md"
          className="border border-dashed border-muted-foreground p-md"
        >
          <div className={itemStyle}>Item in a section</div>
          <div className={itemStyle}>Another item</div>
          <div className={itemStyle}>Yet another</div>
        </Grid>
      </div>
    </div>
  ),
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Feature Cards</h3>
        <Grid 
          columns={1}
          responsive={{ sm: 2, lg: 4 }}
          gap="md" 
          className="mb-lg"
          justify='evenly'
        >
          {[
            { icon: <Home size={24} />, title: 'Dashboard', description: 'View all your important metrics in one place.' },
            { icon: <Settings size={24} />, title: 'Settings', description: 'Configure the application to suit your needs.' },
            { icon: <User size={24} />, title: 'Profile', description: 'Update your personal information and preferences.' },
            { icon: <Mail size={24} />, title: 'Messages', description: 'Check your notifications and stay in touch.' }
          ].map((feature, i) => (
            <div key={i} className="bg-background border rounded-md px-md py-lg flex flex-col items-center text-center">
              <div className="bg-muted p-sm rounded-full mb-sm text-primary">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </Grid>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-sm">Product Gallery</h3>
        <Grid 
          columns="auto-fill" 
          minColWidth="180px" 
          gap="md"
          className="mb-lg"
          justify='evenly'
        >
          {[
            { name: 'Product 1', price: '$19.99', image: <Image size={48} /> },
            { name: 'Product 2', price: '$24.99', image: <Camera size={48} /> },
            { name: 'Product 3', price: '$34.99', image: <Book size={48} /> },
            { name: 'Product 4', price: '$49.99', image: <ShoppingCart size={48} /> },
            { name: 'Product 5', price: '$29.99', image: <Settings size={48} /> }
          ].map((product, i) => (
            <div key={i} className="bg-background border rounded-md overflow-hidden flex flex-col">
              <div className="bg-muted h-40 flex items-center justify-center text-muted-foreground" aria-hidden="true">
                {product.image}
              </div>
              <div className="p-md">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.price}</p>
                <button className="mt-sm w-full py-xs px-sm border rounded-md text-sm hover:bg-muted transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Dashboard Layout</h3>
        <Grid 
          columns={1}
          responsive={{ md: 2, lg: 3 }}
          gap="md"
          className="mb-lg"
          justify='evenly'
        >
          <div className="bg-background border rounded-md p-md col-span-full">
            <h3 className="text-xl font-medium">Overview</h3>
            <p className="text-muted-foreground">Welcome to your dashboard! Here&apos;s a summary of your activity.</p>
          </div>
          
          <div className="bg-background border rounded-md p-md">
            <h3 className="text-lg font-medium mb-sm">Sales Analytics</h3>
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
          
          <div className="bg-background border rounded-md p-md">
            <h3 className="text-lg font-medium mb-sm">Traffic Sources</h3>
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
              Chart Placeholder
            </div>
          </div>
          
          <div className="bg-background border rounded-md p-md">
            <h3 className="text-lg font-medium mb-sm">Recent Orders</h3>
            <div className="space-y-xs">
              <div className="flex justify-between p-xs border-b">
                <span>Order #12345</span>
                <span className="text-muted-foreground">$124.00</span>
              </div>
              <div className="flex justify-between p-xs border-b">
                <span>Order #12346</span>
                <span className="text-muted-foreground">$75.50</span>
              </div>
              <div className="flex justify-between p-xs">
                <span>Order #12347</span>
                <span className="text-muted-foreground">$239.99</span>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  ),
}