import type { Meta, StoryObj } from '@storybook/react'
import ScrollArea from '@/components/composed/ScrollArea/ScrollArea'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/Composed/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      description: 'The viewport\'s orientation',
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      defaultValue: 'vertical',
    },
    type: {
      description: 'The type of scrollbar to display',
      control: 'select',
      options: ['auto', 'always', 'scroll', 'hover'],
      defaultValue: 'auto',
    },
    scrollbarStyle: {
      description: 'The color scheme of the scrollbar thumb',
      control: 'select',
      options: ['default', 'minimal'],
      defaultValue: 'default',
    },
    className: {
      description: 'Additional CSS classes for the root',
      control: 'text',
    },
    viewportClassName: {
      description: 'Additional CSS classes for the viewport',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

// Helper function to generate Lorem Ipsum paragraphs
const generateLoremIpsum = (paragraphs = 5) => {
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  
  return Array(paragraphs).fill(0).map((_, i) => (
    <p key={i} className="mb-4">{lorem}</p>
  ))
}

// Base story with controls
export const Playground: Story = {
  args: {
    orientation: 'vertical',
    type: 'auto',
    scrollbarStyle: 'default',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Lorem Ipsum</h4>
        {generateLoremIpsum(7)}
      </div>
    ),
  },
}

// Vertical scrolling
export const VerticalScroll: Story = {
  args: {
    orientation: 'vertical',
    className: 'h-[200px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Vertical Scrolling</h4>
        {generateLoremIpsum(5)}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Scroll area with vertical scrolling only.',
      },
    },
  },
}

// Horizontal scrolling
export const HorizontalScroll: Story = {
  args: {
    orientation: 'horizontal',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="flex gap-4 p-4">
        {Array(10).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="flex h-[250px] w-[200px] flex-shrink-0 items-center justify-center rounded-md bg-muted"
          >
            <span className="text-2xl font-bold">Card {i + 1}</span>
          </div>
        ))}
      </div>
    ),
  },
}

// Both orientations
export const BothScroll: Story = {
  args: {
    orientation: 'both',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div style={{ width: '600px' }}>
        <div className="p-4">
          <h4 className="mb-4 text-lg font-medium">Scrolling in Both Directions</h4>
          {generateLoremIpsum(10)}
        </div>
      </div>
    ),
  },
}

// Always visible scrollbar
export const AlwaysVisibleScrollbar: Story = {
  args: {
    type: 'always',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Always Visible Scrollbar</h4>
        <p className="mb-4">The scrollbar is always visible, even when content fits.</p>
        {generateLoremIpsum(5)}
      </div>
    ),
  },
}

// Hover-only scrollbar
export const HoverScrollbar: Story = {
  args: {
    type: 'hover',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Hover-Only Scrollbar</h4>
        <p className="mb-4">Scrollbar appears only when hovering over the scroll area.</p>
        {generateLoremIpsum(5)}
      </div>
    ),
  },
}

// Minimal scrollbar style
export const MinimalScrollbar: Story = {
  args: {
    scrollbarStyle: 'minimal',
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">Minimal Scrollbar</h4>
        <p className="mb-4">A thinner, more minimal scrollbar design.</p>
        {generateLoremIpsum(5)}
      </div>
    ),
  },
}

// Example use case: List
export const ListExample: Story = {
  args: {
    className: 'h-[300px] w-[300px] rounded-md border',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium">User List</h4>
        <ul className="space-y-2">
          {Array(20).fill(0).map((_, i) => (
            <li 
              key={i} 
              className="rounded-sm bg-muted p-2"
            >
              User {i + 1}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
}

// Example use case: Code block
export const CodeBlockExample: Story = {
  args: {
    className: 'h-[300px] w-[500px] rounded-md bg-slate-950 text-slate-50',
    children: (
      <pre className="p-4 font-mono text-sm">
        {`// Example React component
import { useState, useEffect } from 'react';

function ExampleComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Example Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExampleComponent;`}
      </pre>
    ),
  },
}

// Viewport className example
export const ViewportClassName: Story = {
  args: {
    className: 'h-[300px] w-[300px] border rounded-md',
    viewportClassName: 'bg-secondary p-12',
    children: (
      <div>
        <h4 className="mb-4 text-lg font-medium">Viewport Styling</h4>
        {generateLoremIpsum(5)}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates styling the inner viewport via `viewportClassName` prop.',
      },
    },
  },
}

// Design Tokens applied
export const CustomTokens: Story = {
  args: {
    className: 'h-[300px] w-[300px] border rounded-lg bg-secondary',
    scrollbarStyle: 'default',
    type: 'always',
    orientation: 'vertical',
    children: (
      <div className="p-4">
        <h4 className="mb-4 text-lg font-medium text-[hsl(var(--on-secondary))]">Using Tokens</h4>
        {generateLoremIpsum(6)}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Showcase of scrollbar with spacing, colors and radii defined via `theme/index.css` tokens.',
      },
    },
  },
}
