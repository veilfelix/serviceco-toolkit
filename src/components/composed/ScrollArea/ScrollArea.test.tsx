import { render, screen } from '@testing-library/react'
import ScrollArea from './ScrollArea'

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('ScrollArea', () => {
  it('renders children correctly', () => {
    render(
      <ScrollArea>
        <div data-testid="scroll-content">Scroll content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll-content')).toBeInTheDocument()
  })

  it('applies custom className to root element', () => {
    const { container } = render(
      <ScrollArea className="custom-root-class">
        <div>Scroll content</div>
      </ScrollArea>
    )
    expect(container.querySelector('.custom-root-class')).toBeInTheDocument()
  })

  it('applies custom viewportClassName to viewport element', () => {
    render(
      <ScrollArea viewportClassName="custom-viewport-class">
        <div>Scroll content</div>
      </ScrollArea>
    )
    expect(document.querySelector('.custom-viewport-class')).toBeInTheDocument()
  })

  it('renders with vertical orientation by default', () => {
    const { container } = render(
      <ScrollArea type="always">
        <div style={{ height: '200vh' }}>Scroll content</div>
      </ScrollArea>
    )
    expect(container.querySelector('[data-orientation="vertical"]')).toBeInTheDocument()
    expect(container.querySelector('[data-orientation="horizontal"]')).not.toBeInTheDocument()
  })

  it('renders with horizontal orientation when specified', () => {
    const { container } = render(
      <ScrollArea orientation="horizontal" type="always">
        <div style={{ width: '200vw' }}>Scroll content</div>
      </ScrollArea>
    )
    expect(container.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument()
    expect(container.querySelector('[data-orientation="vertical"]')).not.toBeInTheDocument()
  })

  it('renders with both scrollbars when orientation is "both"', () => {
    const { container } = render(
      <ScrollArea orientation="both" type="always">
        <div style={{ width: '200vw', height: '200vh' }}>Scroll content</div>
      </ScrollArea>
    )
    expect(container.querySelector('[data-orientation="horizontal"]')).toBeInTheDocument()
    expect(container.querySelector('[data-orientation="vertical"]')).toBeInTheDocument()
  })

  it('applies the type attribute to the root element', () => {
    const { container } = render(
      <ScrollArea type="always">
        <div>Scroll content</div>
      </ScrollArea>
    )
    const root = container.firstChild as HTMLElement
    expect(root.getAttribute('data-type')).toBe('always')
  })

  it('renders with minimal scrollbar style when specified', () => {
    const { container } = render(
      <ScrollArea scrollbarStyle="minimal" type="always">
        <div style={{ height: '200vh' }}>Scroll content</div>
      </ScrollArea>
    )
    const root = container.firstChild as HTMLElement
    expect(root.style.getPropertyValue('--scrollbar-size')).toBe('4px')

    const scrollbar = container.querySelector('[data-orientation="vertical"]') as HTMLElement
    expect(scrollbar).toBeInTheDocument()
    expect(scrollbar.className).toContain('bg-transparent')
  })

  it('forwards additional props to the root element', () => {
    render(
      <ScrollArea data-testid="scroll-area-root">
        <div>Scroll content</div>
      </ScrollArea>
    )
    expect(screen.getByTestId('scroll-area-root')).toBeInTheDocument()
  })
})
