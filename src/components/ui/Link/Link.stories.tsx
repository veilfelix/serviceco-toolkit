import type { Meta, StoryObj } from '@storybook/react'
import Link from './Link'
import { ExternalLink } from 'lucide-react'

const meta: Meta<typeof Link> = {
  title: 'UI/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      description: 'URL to navigate to',
      control: 'text',
    },
    variant: {
      description: 'Link style variant',
      control: 'select',
      options: ['default', 'primary', 'muted', 'destructive'],
      defaultValue: 'default',
    },
    external: {
      description: 'Force external link behavior',
      control: 'boolean',
    },
    showExternalIcon: {
      description: 'Show external link icon',
      control: 'boolean',
    },
    children: {
      description: 'Link content',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Link>

export const Playground: Story = {
  args: {
    href: '#',
    children: 'Link',
    variant: 'default',
    showExternalIcon: false,
  },
}

export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
    variant: 'default',
  },
}

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Primary Link',
    variant: 'primary',
  },
}

export const Muted: Story = {
  args: {
    href: '#',
    children: 'Muted Link',
    variant: 'muted',
  },
}

export const Destructive: Story = {
  args: {
    href: '#',
    children: 'Destructive Link',
    variant: 'destructive',
  },
}

export const InternalLink: Story = {
  args: {
    href: '/internal-page',
    children: 'Internal Page',
  },
}

export const ExternalLinkStory: Story = {
  name: 'External Link',
  args: {
    href: 'https://example.com',
    children: 'External Website',
  },
}

export const ExternalLinkWithIcon: Story = {
  args: {
    href: 'https://example.com',
    children: 'External Website with Icon',
    showExternalIcon: true,
  },
}

export const MailtoLink: Story = {
  args: {
    href: 'mailto:info@example.com',
    children: 'Send Email',
  },
}

export const TelLink: Story = {
  args: {
    href: 'tel:+1234567890',
    children: 'Call Us',
  },
}

export const CustomStyling: Story = {
  args: {
    href: '#',
    children: 'Custom Styled Link',
    className: 'text-lg italic',
  },
}

export const PreventDefault: Story = {
  args: {
    href: '#',
    children: 'No-op Link (onClick shown in Actions tab)',
    preventDefault: true,
    onClick: () => {/* Action logged to Storybook actions panel */},
  },
}

export const LinkGroup: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="/internal" variant="default">Internal Link (default)</Link>
      <Link href="/internal" variant="primary">Internal Link (primary)</Link>
      <Link href="/internal" variant="muted">Internal Link (muted)</Link>
      <Link href="/internal" variant="destructive">Internal Link (destructive)</Link>
      <Link href="https://example.com" variant="default">External Link</Link>
      <Link href="https://example.com" variant="primary" showExternalIcon>External Link with Icon</Link>
      <Link href="mailto:info@example.com">Email Link</Link>
      <Link href="tel:+1234567890">Phone Link</Link>
    </div>
  ),
}

export const UsageWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Link href="https://example.com" className="inline-flex items-center gap-2">
        Visit Website <ExternalLink className="h-4 w-4" />
      </Link>
      <Link href="https://example.com" showExternalIcon>
        Automatic External Icon
      </Link>
    </div>
  ),
}

export const LinkInText: Story = {
  render: () => (
    <div className="max-w-md text-foreground">
      <p className="mb-4">
        This is a paragraph with a{' '}
        <Link href="#" variant="primary">primary link</Link>{' '}
        inside it. Links can be seamlessly integrated with text content while maintaining proper styling and focus states.
      </p>
      <p>
        Need help? Visit our{' '}
        <Link href="#" variant="default">help center</Link>{' '}
        or{' '}
        <Link href="mailto:support@example.com">contact support</Link>.
      </p>
    </div>
  ),
}