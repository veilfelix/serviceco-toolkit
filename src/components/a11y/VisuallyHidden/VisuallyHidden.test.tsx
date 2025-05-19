import { render, screen } from '@testing-library/react'
import VisuallyHidden from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders children correctly', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText('Hidden text')).toBeInTheDocument()
  })

  it('applies sr-only classes', () => {
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    const element = container.firstChild as HTMLElement
    
    expect(element).toHaveClass('absolute')
    expect(element).toHaveClass('w-px')
    expect(element).toHaveClass('h-px')
    expect(element).toHaveClass('p-0')
    expect(element).toHaveClass('-m-px')
    expect(element).toHaveClass('overflow-hidden')
    expect(element).toHaveClass('whitespace-nowrap')
    expect(element).toHaveClass('border-0')
    expect(element).toHaveClass('clip')
    expect(element).toHaveClass('clip-path-[inset(50%)]')
  })

  it('applies custom className if provided', () => {
    const { container } = render(
      <VisuallyHidden className="custom-class">Hidden text</VisuallyHidden>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders as span by default', () => {
    const { container } = render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('renders as a different element when "as" prop is provided', () => {
    const { container } = render(
      <VisuallyHidden as="div">Hidden text</VisuallyHidden>
    )
    expect(container.firstChild?.nodeName).toBe('DIV')
  })

  it('passes additional props to the underlying element', () => {
    render(
      <VisuallyHidden data-testid="hidden-element">Hidden text</VisuallyHidden>
    )
    expect(screen.getByTestId('hidden-element')).toBeInTheDocument()
  })

  it('forwards ref to the underlying element', () => {
    const ref = jest.fn()
    render(<VisuallyHidden ref={ref}>Hidden text</VisuallyHidden>)
    expect(ref).toHaveBeenCalled()
  })
})