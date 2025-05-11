import type { Meta, StoryObj } from '@storybook/react'
import { JSX, useState } from 'react'
import { DropdownMenu } from '@/components/composed/DropdownMenu/DropdownMenu'
import Button from '@/components/ui/Button/Button'
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  Mail, 
  MessageSquare,
  PlusCircle, 
  UserPlus, 
  ChevronDown, 
  Cloud, 
  ChevronsUpDown,
  Clipboard,
  ClipboardCheck,
  Github,
  LifeBuoy
} from 'lucide-react'
import type { Decorator } from '@storybook/react'

const meta: Meta<typeof DropdownMenu.Content> = {
  title: 'Components/Composed/DropdownMenu',
  component: DropdownMenu.Content,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      description: 'The alignment of the dropdown menu relative to its trigger',
      control: 'select',
      options: ['start', 'center', 'end'],
      defaultValue: 'end',
    },
    side: {
      description: 'The side of the trigger to display the dropdown menu',
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: 'bottom',
    },
    sideOffset: {
      description: 'The vertical offset of the dropdown menu',
      control: 'number',
      defaultValue: 4,
    },
    className: {
      description: 'Additional CSS classes for the content',
      control: 'text',
    },
  },
  decorators: [
    ((Story, context): JSX.Element => {
      if (context.args?.children) {
        return (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="primary">Open Menu</Button>
            </DropdownMenu.Trigger>
            <Story />
          </DropdownMenu.Root>
        )
      }

      return <Story />
    }) as Decorator,
  ]
}

export default meta
type Story = StoryObj<typeof DropdownMenu.Content>

// Base story with controls
export const Playground: Story = {
  args: {
    align: 'end',
    side: 'bottom',
    sideOffset: 4,
    children: (
      <>
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Logout</DropdownMenu.Item>
      </>
    ),
  },
}

// Basic menu
export const Basic: Story = {
  args: {
    children: (
      <>
        <DropdownMenu.Item>Profile</DropdownMenu.Item>
        <DropdownMenu.Item>Settings</DropdownMenu.Item>
        <DropdownMenu.Item>Help</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Logout</DropdownMenu.Item>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic dropdown menu with simple text items.',
      },
    },
  },
}

// With icons
export const WithIcons: Story = {
  args: {
    children: (
      <>
        <DropdownMenu.Item>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenu.Item>
      </>
    ),
  },
}

// With disabled items
export const WithDisabledItems: Story = {
  args: {
    children: (
      <>
        <DropdownMenu.Item>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item disabled>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing (Unavailable)</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenu.Item>
      </>
    ),
  },
}

// With checkbox items
export const WithCheckboxItems = () => {
  const [showStatusBar, setShowStatusBar] = useState(true)
  const [showActivityBar, setShowActivityBar] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="primary">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Appearance</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Activity Bar
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

// With radio items
export const WithRadioItemsComponent = () => {
  const [position, setPosition] = useState('bottom')

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="primary">
          <ChevronsUpDown className="mr-2 h-4 w-4" />
          <span>Position</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.RadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
          <DropdownMenu.RadioItem value="left">Left</DropdownMenu.RadioItem>
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

// With submenus
export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="primary">
          <span>Options</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Item>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenu.Item>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Mail className="mr-2 h-4 w-4" />
            <span>Messages</span>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="w-48">
            <DropdownMenu.Item>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Chat</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Message</span>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Add Contact</span>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>
            <Cloud className="mr-2 h-4 w-4" />
            <span>Cloud Storage</span>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent className="w-48">
            <DropdownMenu.Item>
              <Clipboard className="mr-2 h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <ClipboardCheck className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// With groups
export const WithGroups: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="primary">
          <span>Help</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Group>
          <DropdownMenu.Label>Documentation</DropdownMenu.Label>
          <DropdownMenu.Item>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Getting Started</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>API Reference</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Label>Support</DropdownMenu.Label>
          <DropdownMenu.Item>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Contact Us</span>
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}

// With labels and inset items
export const WithLabelsAndInset: Story = {
  render: () => (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="primary">Account</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56">
        <DropdownMenu.Label>My Account</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item inset>Profile</DropdownMenu.Item>
        <DropdownMenu.Item inset>Settings</DropdownMenu.Item>
        <DropdownMenu.Item inset>Keyboard shortcuts</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Teams</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item inset>Create a team</DropdownMenu.Item>
        <DropdownMenu.Item inset>Join a team</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item inset>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  ),
}