import type { Meta, StoryObj } from '@storybook/react'
import { Drawer, DrawerSide } from '@/components/composed/Drawer/Drawer'
import Button from '@/components/ui/Button/Button'
import { useState } from 'react'
import Select from '@/components/ui/Select/Select'
import FormField from '@/components/ui/FormField/FormField'

const meta: Meta<typeof Drawer> = {
  title: 'Composed/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      description: 'Side from which the drawer appears',
      control: 'select',
      options: ['left', 'right', 'bottom'],
      defaultValue: 'right',
    },
    showClose: {
      description: 'Whether to show the close button',
      control: 'boolean',
      defaultValue: true,
    },
    closeOnOverlayClick: {
      description: 'Whether clicking the overlay should close the drawer',
      control: 'boolean',
      defaultValue: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

// Base story with controls
export const Playground: Story = {
  render: (args) => (
    <DrawerDemo 
      side={args.side} 
      showClose={args.showClose} 
      closeOnOverlayClick={args.closeOnOverlayClick}
    />
  ),
  args: {
    side: 'right',
    showClose: true,
    closeOnOverlayClick: true,
  },
}

const DrawerDemo = ({
  side = 'right',
  showClose = true,
  showOverlay = true,
  closeOnOverlayClick = true,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      side={side as DrawerSide}
      showClose={showClose}
      showOverlay={showOverlay}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      <Drawer.Trigger asChild>
        <Button>Open Drawer</Button>
      </Drawer.Trigger>
      <Drawer.Content title="Drawer Title">
        <div className="space-y-4">
          <p>This is a drawer component that slides in from the {side}.</p>
          <p>You can put any content here.</p>
          <Button variant="tertiary" onClick={() => setIsOpen(false)}>
            Close Drawer
          </Button>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}

// Different sides
export const LeftSide: Story = {
  render: () => <DrawerDemo side="left" />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides in from the left side of the screen.',
      },
    },
  },
}

export const RightSide: Story = {
  render: () => <DrawerDemo side="right" />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides in from the right side of the screen (default).',
      },
    },
  },
}

export const BottomSide: Story = {
  render: () => <DrawerDemo side="bottom" />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer that slides up from the bottom of the screen.',
      },
    },
  },
}

// Feature variants
export const NoCloseButton: Story = {
  render: () => <DrawerDemo showClose={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer without a close button. Can still be closed by clicking the overlay or pressing Escape.',
      },
    },
  },
}

export const NoOverlay: Story = {
  render: () => <DrawerDemo showOverlay={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer without a backdrop overlay. The content behind the drawer remains visible.',
      },
    },
  },
}

export const DisableOverlayClick: Story = {
  render: () => <DrawerDemo closeOnOverlayClick={false} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer that cannot be closed by clicking the overlay. It can only be closed by pressing the close button or Escape key.',
      },
    },
  },
}

// Example usage
export const NavigationDrawer: Story = {
  render: () => <NavDrawerExample />,
  parameters: {
    docs: {
      description: {
        story: 'An example of using the Drawer for mobile navigation.',
      },
    },
  },
}

const NavDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Contact', href: '#' },
  ]

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      side="left"
    >
      <Drawer.Trigger asChild>
        <Button>Menu</Button>
      </Drawer.Trigger>
      <Drawer.Content title="Navigation">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="p-2 border-b border-border hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Drawer.Content>
    </Drawer>
  )
}

export const FilterDrawer: Story = {
  render: () => <FilterDrawerExample />,
  parameters: {
    docs: {
      description: {
        story: 'An example of using the Drawer for filter controls on mobile.',
      },
    },
  },
}

const FilterDrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    priceRange: 'all',
    category: 'all',
  })

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
      side="bottom"
    >
      <Drawer.Trigger asChild>
        <Button>Filters</Button>
      </Drawer.Trigger>
      <Drawer.Content title="Filter Products">
        <div className="flex flex-col gap-4">
          <FormField label='Price Range' id='priceRange' className="space-y-2">
            <Select
              name="priceRange"
              value={filters.priceRange}
              onChange={handleFilterChange}
              options={[
                { value: 'all', label: 'All Prices' },
                { value: 'budget', label: 'Budget (Under $50)' },
                { value: 'mid', label: 'Mid-range ($50-$200)' },
                { value: 'premium', label: 'Premium ($200+)' },
              ]}
              required
            />
          </FormField>

          <FormField label='Category' id='category' className="space-y-2">
            <Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              options={[
                { value: 'all', label: 'All Categories' },
                { value: 'electronics', label: 'Electronics' },
                { value: 'clothing', label: 'Clothing' },
                { value: 'home', label: 'Home & Garden' },
              ]}
              required
            />
          </FormField>

          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              variant="tertiary"
              onClick={() => {
                setFilters({ priceRange: 'all', category: 'all' })
              }}
            >
              Reset
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer>
  )
}