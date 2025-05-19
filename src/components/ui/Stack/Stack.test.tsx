import { render, screen } from '@testing-library/react'
import Stack from './Stack'

describe('Stack', () => {
  it('renders children correctly', () => {
    render(
      <Stack>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </Stack>
    )
    expect(screen.getByTestId('item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
  })

  it('applies the default column direction', () => {
    const { container } = render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('flex-col')
  })

  it('applies row direction when specified', () => {
    const { container } = render(
      <Stack direction="row">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('flex-row')
  })

  it('applies row-reverse direction when specified', () => {
    const { container } = render(
      <Stack direction="row-reverse">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('flex-row-reverse')
  })

  it('applies column-reverse direction when specified', () => {
    const { container } = render(
      <Stack direction="column-reverse">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('flex-col-reverse')
  })

  it('applies the default medium gap', () => {
    const { container } = render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('gap-md')
  })

  it('applies gap="xs" when specified', () => {
    const { container } = render(
      <Stack gap="xs">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('gap-xs')
  })

  it('applies gap="sm" when specified', () => {
    const { container } = render(
      <Stack gap="sm">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('gap-sm')
  })

  it('applies gap="lg" when specified', () => {
    const { container } = render(
      <Stack gap="lg">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('gap-lg')
  })

  it('applies gap="none" when specified', () => {
    const { container } = render(
      <Stack gap="none">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('gap-0')
  })

  it('applies align="center" when specified', () => {
    const { container } = render(
      <Stack align="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('items-center')
  })

  it('applies align="start" when specified', () => {
    const { container } = render(
      <Stack align="start">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('items-start')
  })

  it('applies align="end" when specified', () => {
    const { container } = render(
      <Stack align="end">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('items-end')
  })

  it('applies align="baseline" when specified', () => {
    const { container } = render(
      <Stack align="baseline">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('items-baseline')
  })

  it('applies justify="center" when specified', () => {
    const { container } = render(
      <Stack justify="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('justify-center')
  })

  it('applies justify="between" when specified', () => {
    const { container } = render(
      <Stack justify="between">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('justify-between')
  })

  it('applies justify="around" when specified', () => {
    const { container } = render(
      <Stack justify="around">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('justify-around')
  })

  it('applies justify="evenly" when specified', () => {
    const { container } = render(
      <Stack justify="evenly">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('justify-evenly')
  })

  it('applies responsive direction change', () => {
    const { container } = render(
      <Stack directionBreakpoint="md">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('md:flex-row')
  })

  it('renders as a different element when "as" prop is provided', () => {
    const { container } = render(
      <Stack as="section">
        <div>Item</div>
      </Stack>
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('applies custom className if provided', () => {
    const { container } = render(
      <Stack className="custom-class">
        <div>Item</div>
      </Stack>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('does not apply gap when there is only one child', () => {
    const { container } = render(
      <Stack>
        <div>Single Item</div>
      </Stack>
    )
    expect(container.firstChild).not.toHaveClass('gap-md')
  })

  it('passes additional props to the underlying element', () => {
    render(
      <Stack data-testid="stack-element">
        <div>Item</div>
      </Stack>
    )
    expect(screen.getByTestId('stack-element')).toBeInTheDocument()
  })
})