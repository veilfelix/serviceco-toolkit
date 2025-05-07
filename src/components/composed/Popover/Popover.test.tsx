import { render, screen } from '@testing-library/react'
import { Popover } from './Popover'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('Popover', () => {
  it('renders the popover trigger correctly', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    expect(screen.getByText('Open Popover')).toBeInTheDocument()
  })

  it('shows popover content when forceMount is used', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })

  it('renders close button when showClose is true', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content showClose forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    expect(screen.getByLabelText('Close')).toBeInTheDocument()
  })

  it('does not render close button when showClose is false', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content showClose={false} forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    expect(screen.queryByLabelText('Close')).not.toBeInTheDocument()
  })

  it('renders arrow component correctly', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content forceMount>
          <Popover.Arrow data-testid="popover-arrow" />
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    const arrow = screen.getByTestId('popover-arrow')
    expect(arrow).toBeInTheDocument()
    expect(arrow.tagName.toLowerCase()).toBe('svg')
  })

  it('applies custom className to Content', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content className="custom-popover-content" forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    const contentElement = screen.getByText('Popover content').closest('[class*="custom-popover-content"]')
    expect(contentElement).toBeInTheDocument()
  })

  it('applies custom className to Arrow', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content forceMount>
          <Popover.Arrow className="custom-arrow" data-testid="popover-arrow" />
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    const arrow = screen.getByTestId('popover-arrow')
    expect(arrow.getAttribute('class')).toContain('custom-arrow')
  })

  it('applies alignment and side properties', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content
          align="start"
          side="top"
          sideOffset={10}
          data-testid="popover-content"
          forceMount
        >
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    const content = screen.getByTestId('popover-content')
    expect(content).toHaveAttribute('data-align', 'start')
    expect(content).toHaveAttribute('data-side', 'top')
  })

  it('renders with anchor element', () => {
    render(
      <Popover.Root defaultOpen>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Anchor asChild>
          <div data-testid="anchor-element">Anchor</div>
        </Popover.Anchor>
        <Popover.Content forceMount>
          <p>Popover content</p>
        </Popover.Content>
      </Popover.Root>
    )

    expect(screen.getByTestId('anchor-element')).toBeInTheDocument()
    expect(screen.getByText('Popover content')).toBeInTheDocument()
  })
})
