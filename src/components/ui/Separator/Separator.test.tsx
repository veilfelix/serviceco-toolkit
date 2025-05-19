import { render, screen } from '@testing-library/react'
import Separator from './Separator'

describe('Separator', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Separator data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    
    expect(separator).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('bg-border')
  })

  it('renders horizontal separator by default', () => {
    const { container } = render(<Separator />)
    const line = container.querySelector('div > div')
    
    expect(line).toHaveClass('w-full')
  })

  it('renders vertical separator when orientation is vertical', () => {
    const { container } = render(<Separator orientation="vertical" />)
    
    expect(container.firstChild).toHaveClass('h-full')
    expect(container.firstChild).not.toHaveClass('flex-col')
  })

  it('applies correct thickness classes', () => {
    const { container: thin } = render(<Separator thickness="thin" />)
    const { container: regular } = render(<Separator thickness="regular" />)
    const { container: thick } = render(<Separator thickness="thick" />)
    
    expect(thin.querySelector('div')!).toHaveClass('h-px')
    expect(regular.querySelector('div')!).toHaveClass('h-[var(--separator-thickness-regular)]')
    expect(thick.querySelector('div')!).toHaveClass('h-[var(--separator-thickness-thick)]')
  })

  it('applies correct color classes', () => {
    const { container: defaultColor } = render(<Separator color="default" />)
    const { container: muted } = render(<Separator color="muted" />)
    const { container: accent } = render(<Separator color="accent" />)
    const { container: primary } = render(<Separator color="primary" />)
    
    expect(defaultColor.querySelector('div > div')).toHaveClass('bg-border')
    expect(muted.querySelector('div > div')).toHaveClass('bg-muted')
    expect(accent.querySelector('div > div')).toHaveClass('bg-accent')
    expect(primary.querySelector('div > div')).toHaveClass('bg-primary')
  })

  it('renders with a label when provided', () => {
    const { container } = render(<Separator label="Section" />)
    const labelText = screen.getByText('Section')
    
    expect(labelText).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('flex', 'items-center')
    
    // Should have two separator lines (before and after label)
    const lines = container.querySelectorAll('.bg-border')
    expect(lines.length).toBe(2)
  })

  it('sets correct ARIA attributes when not decorative', () => {
    render(<Separator decorative={false} data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    
    expect(separator).toHaveAttribute('role', 'separator')
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal')
    expect(separator).not.toHaveAttribute('aria-hidden')
  })

  it('sets correct ARIA attributes with vertical orientation when not decorative', () => {
    render(<Separator orientation="vertical" decorative={false} data-testid="separator" />)
    const separator = screen.getByTestId('separator')
    
    expect(separator).toHaveAttribute('role', 'separator')
    expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    expect(separator).not.toHaveAttribute('aria-hidden')
  })

  it('merges custom className with default classes', () => {
    const { container } = render(<Separator className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('bg-border')
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('forwards additional props to the root element', () => {
    render(<Separator data-testid="test" aria-label="separator" />)
    const separator = screen.getByTestId('test')
    
    expect(separator).toHaveAttribute('aria-label', 'separator')
  })
})