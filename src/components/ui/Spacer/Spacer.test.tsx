import { render } from '@testing-library/react'
import Spacer from './Spacer'

describe('Spacer', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Spacer />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild).toHaveClass('h-md')
    expect(container.firstChild).toHaveClass('block')
    expect(container.firstChild).toHaveClass('w-full')
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies vertical orientation with correct size', () => {
    const { container } = render(<Spacer orientation="vertical" size="lg" />)
    expect(container.firstChild).toHaveClass('h-lg')
    expect(container.firstChild).toHaveClass('block')
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('applies horizontal orientation with correct size', () => {
    const { container } = render(<Spacer orientation="horizontal" size="sm" />)
    expect(container.firstChild).toHaveClass('w-sm')
    expect(container.firstChild).toHaveClass('inline-block')
    expect(container.firstChild).not.toHaveClass('w-full')
  })

  it('applies custom className if provided', () => {
    const { container } = render(<Spacer className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders as a different element when "as" prop is provided', () => {
    const { container } = render(<Spacer as="span" />)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('passes additional props to the underlying element', () => {
    const { container } = render(<Spacer data-testid="spacer-element" />)
    expect(container.firstChild).toHaveAttribute('data-testid', 'spacer-element')
  })

  it('applies xs size correctly', () => {
    const { container } = render(<Spacer size="xs" />)
    expect(container.firstChild).toHaveClass('h-xs')
  })

  it('applies md size correctly', () => {
    const { container } = render(<Spacer size="md" />)
    expect(container.firstChild).toHaveClass('h-md')
  })
})