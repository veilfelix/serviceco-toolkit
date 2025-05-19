/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta, StoryObj } from '@storybook/react'
import Sidebar from './Sidebar'
import {
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  HelpCircle,
  Bell,
  LogOut,
  User,
} from 'lucide-react'
import Avatar from '@/components/ui/Avatar/Avatar'
import Text from '@/components/ui/Text/Text'
import Badge from '@/components/ui/Badge/Badge'
import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const meta: Meta<typeof Sidebar> = {
  title: 'Composed/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsible',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    defaultDisplay: {
      control: 'select',
      options: ['expanded', 'collapsed', 'auto'],
      description: 'Initial display state of the sidebar',
      table: {
        defaultValue: { summary: 'expanded' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Whether the sidebar should transform into a drawer on mobile',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    position: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the sidebar',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    border: {
      control: 'boolean',
      description: 'Whether to show a border on the sidebar',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

const DefaultComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background">
      <Sidebar.MobileTrigger
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-40"
      />
      <Sidebar
        {...args}
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<FileText size={18} />}>
              Documents
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<BarChart3 size={18} />}>
              Analytics
            </Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section title="Settings">
            <Sidebar.Item href="#" icon={<Settings size={18} />}>
              General
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Bell size={18} />}>
              Notifications
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<HelpCircle size={18} />}>
              Help & Support
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div className="flex items-center gap-3 w-full px-[var(--sidebar-item-padding-x)]">
            <Avatar size="sm">
              <Avatar.Image src="https://i.pravatar.cc/300" alt="User" />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Text className="truncate">John Doe</Text>
              <Text className="text-muted-foreground truncate">john@example.com</Text>
            </div>
            <LogOut
              size={18}
              className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            />
          </div>
        </Sidebar.Footer>
      </Sidebar>
      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Main content area. The sidebar can be collapsed using the button in the top corner.
        </p>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <DefaultComponent {...args} />,
}


const RightPositionComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background">
      <Sidebar.MobileTrigger
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((prev) => !prev)}
        className="fixed top-4 right-4 z-40"
      />

      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Main content area. The sidebar can be collapsed using the button in the top corner.
        </p>
      </div>

      <Sidebar
        {...args}
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<FileText size={18} />}>
              Documents
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<BarChart3 size={18} />}>
              Analytics
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    </div>
  )
}

export const RightPosition: Story = {
  args: {
    position: 'right',
  },
  render: (args) => <RightPositionComponent {...args} />,
}


const InitiallyCollapsedComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background">
      <Sidebar.MobileTrigger
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-40"
      />

      <Sidebar
        {...args}
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<FileText size={18} />}>
              Documents
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<BarChart3 size={18} />}>
              Analytics
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>

      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Main content area. The sidebar starts in collapsed state.
        </p>
      </div>
    </div>
  )
}

export const InitiallyCollapsed: Story = {
  args: {
    defaultDisplay: 'collapsed',
  },
  render: (args) => <InitiallyCollapsedComponent {...args} />,
}


const NonCollapsibleComponent = (args: any) => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background">
      {isMobile && (
        <Sidebar.MobileTrigger
          isOpen={mobileOpen}
          toggle={() => setMobileOpen((prev) => !prev)}
          className="fixed top-4 left-4 z-40"
        />
      )}

      <Sidebar
        {...args}
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>

      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          This sidebar cannot be collapsed (no toggle button).
        </p>
      </div>
    </div>
  )
}

export const NonCollapsible: Story = {
  args: {
    collapsible: false,
  },
  render: (args) => <NonCollapsibleComponent {...args} />,
}


const WithNotificationsComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background relative">
      <Sidebar.MobileTrigger
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((prev) => !prev)}
        className="fixed top-4 left-4 z-40"
      />
      <Sidebar
        {...args}
        responsive
        defaultDisplay="expanded"
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              <div className="flex items-center justify-between w-full">
                <span>Users</span>
                <Badge variant="primary" className="ml-2">3</Badge>
              </div>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Bell size={18} />}>
              <div className="flex items-center justify-between w-full">
                <span>Notifications</span>
                <Badge variant="danger" className="ml-2">5</Badge>
              </div>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<FileText size={18} />}>
              <div className="flex items-center justify-between w-full">
                <span>Documents</span>
                <Badge variant="warning" className="ml-2">New</Badge>
              </div>
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Sidebar with notification badges.
        </p>
      </div>
    </div>
  )
}

export const WithNotifications: Story = {
  render: (args) => <WithNotificationsComponent {...args} />,
}


const WithCustomSectionsComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-[600px] flex bg-background relative">
      <Sidebar.MobileTrigger
        isOpen={mobileOpen}
        toggle={() => setMobileOpen((prev) => !prev)}
        className="absolute top-4 left-4 z-50"
      />
      <Sidebar
        {...args}
        responsive
        isMobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((prev) => !prev)}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section title="Main">
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section title="Content">
            <Sidebar.Item href="#" icon={<FileText size={18} />}>
              Documents
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<BarChart3 size={18} />}>
              Analytics
            </Sidebar.Item>
          </Sidebar.Section>
          <Sidebar.Section title="Account">
            <Sidebar.Item href="#" icon={<User size={18} />}>
              Profile
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Settings size={18} />}>
              Settings
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<HelpCircle size={18} />}>
              Help & Support
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
        <Sidebar.Footer>
          <div className="flex items-center gap-3 w-full px-[var(--sidebar-item-padding-x)] ">
            <Avatar size="sm">
              <Avatar.Image src="https://i.pravatar.cc/300" alt="User" />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <Text className="truncate">John Doe</Text>
              <Text className="text-muted-foreground truncate">john@example.com</Text>
            </div>
            <LogOut
              size={18}
              className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            />
          </div>
        </Sidebar.Footer>
      </Sidebar>
      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Sidebar with multiple titled sections.
        </p>
      </div>
    </div>
  )
}

export const WithCustomSections: Story = {
  render: (args) => <WithCustomSectionsComponent {...args} />,
}


const WithDisabledItemsComponent = (args: any) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const toggleMobile = () => setMobileOpen((prev) => !prev)

  return (
    <div className="h-[600px] flex bg-background relative">
      {isMobile && (
        <Sidebar.MobileTrigger
          isOpen={mobileOpen}
          toggle={toggleMobile}
          className="fixed top-4 left-4 z-40"
        />
      )}
      <Sidebar
        {...args}
        responsive
        isMobileOpen={mobileOpen}
        onMobileToggle={toggleMobile}
      >
        <Sidebar.Header>
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
              S
            </div>
            <span>ServiceCo</span>
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Section>
            <Sidebar.Item href="#" icon={<Home size={18} />} active>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<Users size={18} />}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<FileText size={18} />} disabled>
              Documents
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={<BarChart3 size={18} />} disabled>
              Analytics
            </Sidebar.Item>
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
      <div className="flex-1 p-6 pt-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-muted-foreground">
          Sidebar with some disabled items.
        </p>
      </div>
    </div>
  )
}

export const WithDisabledItems: Story = {
  render: (args) => <WithDisabledItemsComponent {...args} />,
}
