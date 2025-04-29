import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles clicks', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies primary style by default', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.firstChild as HTMLElement

    expect(button.className).toContain('bg-blue-600')
  })

  it('applies secondary style when variant is secondary', () => {
    const { container } = render(<Button variant="secondary">Click me</Button>)
    const button = container.firstChild as HTMLElement

    expect(button.className).toContain('bg-gray-200')
  })

  it('applies disabled style when disabled', () => {
    const { container } = render(<Button disabled>Click me</Button>)
    const button = container.firstChild as HTMLElement

    expect(button.className).toContain('cursor-not-allowed')
    expect(button).toBeDisabled()
  })
})
