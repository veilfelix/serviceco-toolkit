import type { Meta, StoryObj } from '@storybook/react'
import { Tabs } from '@/components/composed/Tabs/Tabs'

// Since we have a compound component, we'll focus on the Root for the meta info
const meta: Meta<typeof Tabs.Root> = {
  title: 'Components/Composed/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      description: 'The value of the tab that should be active when initially rendered',
      control: 'text',
    },
    value: {
      description: 'The controlled value of the tab to activate',
      control: 'text',
    },
    onValueChange: {
      description: 'Callback invoked when the value changes',
      action: 'valueChanged',
    },
    orientation: {
      description: 'The orientation of the component',
      control: 'radio',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
    dir: {
      description: 'The reading direction of the tabs',
      control: 'radio',
      options: ['ltr', 'rtl'],
    },
    activationMode: {
      description: 'Determines when tab content is activated',
      control: 'radio',
      options: ['automatic', 'manual'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs.Root>

// Base story with controls
export const Playground: Story = {
  render: (args) => (
    <Tabs.Root {...args} defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Password</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-4 space-y-4 w-80">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p>Manage your account preferences and personal information.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-4 space-y-4 w-80">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p>Update your password and security preferences.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-4 space-y-4 w-80">
          <h3 className="text-lg font-medium">General Settings</h3>
          <p>Configure your application settings and preferences.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

// Default example
export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-4">Content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-4">Content for Tab 2</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-4">Content for Tab 3</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs implementation with three tabs and simple content.',
      },
    },
  },
}

// Styled tab content
export const StyledContent: Story = {
  render: () => (
    <Tabs.Root defaultValue="overview">
      <Tabs.List className="w-full">
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="features">Features</Tabs.Trigger>
        <Tabs.Trigger value="pricing">Pricing</Tabs.Trigger>
        <Tabs.Trigger value="faq">FAQ</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="overview">
        <div className="p-6 space-y-4 bg-[hsl(var(--background))] border rounded-md mt-4 shadow-sm">
          <h3 className="text-xl font-bold">Product Overview</h3>
          <p>Comprehensive overview of our product offering and capabilities.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>All-in-one solution for service companies</li>
            <li>Intuitive dashboard and reporting</li>
            <li>Mobile-friendly design</li>
          </ul>
        </div>
      </Tabs.Content>
      <Tabs.Content value="features">
        <div className="p-6 space-y-4 bg-[hsl(var(--background))] border rounded-md mt-4 shadow-sm">
          <h3 className="text-xl font-bold">Key Features</h3>
          <p>Explore the powerful features that make our product stand out.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="pricing">
        <div className="p-6 space-y-4 bg-[hsl(var(--background))] border rounded-md mt-4 shadow-sm">
          <h3 className="text-xl font-bold">Pricing Plans</h3>
          <p>Find the perfect plan for your business needs.</p>
        </div>
      </Tabs.Content>
      <Tabs.Content value="faq">
        <div className="p-6 space-y-4 bg-[hsl(var(--background))] border rounded-md mt-4 shadow-sm">
          <h3 className="text-xl font-bold">Frequently Asked Questions</h3>
          <p>Get answers to the most common questions about our service.</p>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

// Disabled tab
export const DisabledTab: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Active Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>Disabled Tab</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Another Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-4">Content for the Active Tab</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-4">Content for the Disabled Tab (not accessible)</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-4">Content for Another Tab</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
}

// Custom styled tabs
export const CustomStyling: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List className="bg-[hsl(var(--primary))] rounded-t-md border-b-0">
        <Tabs.Trigger 
          value="tab1" 
          className="text-[hsl(var(--primary-foreground))] data-[state=active]:bg-white data-[state=active]:text-[hsl(var(--primary))]"
        >
          Custom Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="tab2"
          className="text-[hsl(var(--primary-foreground))] data-[state=active]:bg-white data-[state=active]:text-[hsl(var(--primary))]"
        >
          Custom Tab 2
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content 
        value="tab1"
        className="border border-[hsl(var(--primary))] rounded-b-md p-4"
      >
        <div>Custom styled content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content 
        value="tab2"
        className="border border-[hsl(var(--primary))] rounded-b-md p-4"
      >
        <div>Custom styled content for Tab 2</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
}