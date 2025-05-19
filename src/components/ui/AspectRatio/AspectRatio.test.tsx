import { render, screen } from '@testing-library/react'
import AspectRatio from './AspectRatio'

describe('AspectRatio', () => {
  it('renders children correctly', () => {
    render(
      <AspectRatio>
        <div data-testid="child">Child content</div>
      </AspectRatio>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('applies default 1:1 ratio with correct padding', () => {
    const { container } = render(
      <AspectRatio>
        <div>Child content</div>
      </AspectRatio>
    )
    const container1 = container.firstChild as HTMLElement
    expect(container1).toHaveStyle('padding-bottom: 100%')
  })

  it('applies 16:9 aspect ratio with correct padding', () => {
    const { container } = render(
      <AspectRatio ratio={16/9}>
        <div>Child content</div>
      </AspectRatio>
    )
    const container1 = container.firstChild as HTMLElement
    // 1 / (16/9) = 0.5625 → 56.25%
    expect(container1).toHaveStyle('padding-bottom: 56.25%')
  })

  it('applies 4:3 aspect ratio with correct padding', () => {
    const { container } = render(
      <AspectRatio ratio={4/3}>
        <div>Child content</div>
      </AspectRatio>
    )
    const container1 = container.firstChild as HTMLElement
    // 1 / (4/3) = 0.75 → 75%
    expect(container1).toHaveStyle('padding-bottom: 75%')
  })

  it('applies custom className if provided', () => {
    const { container } = render(
      <AspectRatio className="custom-class">
        <div>Child content</div>
      </AspectRatio>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders as a different element when "as" prop is provided', () => {
    const { container } = render(
      <AspectRatio as="section">
        <div>Child content</div>
      </AspectRatio>
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('passes additional props to the underlying element', () => {
    render(
      <AspectRatio data-testid="aspect-element">
        <div>Child content</div>
      </AspectRatio>
    )
    expect(screen.getByTestId('aspect-element')).toBeInTheDocument()
  })

  it('forwards ref to the underlying element', () => {
    const ref = jest.fn()
    render(
      <AspectRatio ref={ref}>
        <div>Child content</div>
      </AspectRatio>
    )
    expect(ref).toHaveBeenCalled()
  })

  it('positions children absolutely inside the container', () => {
    const { container } = render(
      <AspectRatio>
        <div data-testid="child">Child content</div>
      </AspectRatio>
    )
    const childContainer = container.firstChild?.firstChild as HTMLElement
    expect(childContainer).toHaveClass('absolute')
    expect(childContainer).toHaveClass('inset-0')
  })
})