import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders correctly with given text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events properly', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies disabled attribute correctly', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('has type=button by default', () => {
    render(<Button>Default Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('allows type override', () => {
    render(<Button type="submit">Submit Button</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    )
    const button = container.firstChild as HTMLElement
    expect(button.className).toContain('custom-class')
  })
})
