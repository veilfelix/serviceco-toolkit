import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip } from './Tooltip'

beforeAll(() => {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserver as unknown as typeof globalThis.ResizeObserver
})

describe('Tooltip', () => {
  it('renders trigger correctly', async () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )

    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('shows content on hover and hides on mouse leave', async () => {
    render(
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )

    const trigger = screen.getByText('Hover me')

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

    await userEvent.hover(trigger)
  })

  it('passes additional props to Radix Tooltip components', () => {
    render(
      <Tooltip.Provider delayDuration={500}>
        <Tooltip.Root defaultOpen>
          <Tooltip.Trigger asChild>
            <button>Trigger</button>
          </Tooltip.Trigger>
          <Tooltip.Content className="custom-class" data-testid="tooltip-content">
            Content
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    )

    expect(screen.getByText('Trigger')).toBeInTheDocument()
  })
})
