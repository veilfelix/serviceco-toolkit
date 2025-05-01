import { render, screen, fireEvent } from '@testing-library/react'
import Button, { ButtonVariant } from './Button'

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

  it('applies primary variant styles by default', () => {
    const { container } = render(<Button>Click me</Button>)
    const button = container.firstChild as HTMLElement
    
    expect(button.className).toContain('bg-blue-600')
    expect(button.className).toContain('text-white')
  })

  // Test for each variant
  const variants: ButtonVariant[] = ['primary', 'secondary', 'tertiary']
  
  test.each(variants)('applies the correct styles for %s variant', (variant) => {
    const { container } = render(
      <Button variant={variant}>Button</Button>
    )
    const button = container.firstChild as HTMLElement
    
    // Test for specific styles based on variant
    if (variant === 'primary') {
      expect(button.className).toContain('bg-blue-600')
      expect(button.className).toContain('text-white')
    } else if (variant === 'secondary') {
      expect(button.className).toContain('bg-gray-200')
      expect(button.className).toContain('text-gray-800')
      expect(button.className).toContain('border-gray-300')
    } else if (variant === 'tertiary') {
      expect(button.className).toContain('bg-transparent')
      expect(button.className).toContain('text-blue-600')
      expect(button.className).toContain('border-blue-600')
    }
  })

  it('applies disabled styles when disabled', () => {
    const { container } = render(<Button disabled>Click me</Button>)
    const button = container.firstChild as HTMLElement
    
    expect(button.className).toContain('opacity-50')
    expect(button.className).toContain('cursor-not-allowed')
    expect(button).toBeDisabled()
  })

  it('applies different sizes correctly', () => {
    const { container: smContainer } = render(<Button size="sm">Small</Button>)
    const { container: mdContainer } = render(<Button size="md">Medium</Button>)
    const { container: lgContainer } = render(<Button size="lg">Large</Button>)
    
    const smButton = smContainer.firstChild as HTMLElement
    const mdButton = mdContainer.firstChild as HTMLElement
    const lgButton = lgContainer.firstChild as HTMLElement
    
    expect(smButton.className).toContain('px-3')
    expect(smButton.className).toContain('text-sm')
    
    expect(mdButton.className).toContain('px-4')
    expect(mdButton.className).toContain('text-base')
    
    expect(lgButton.className).toContain('px-6')
    expect(lgButton.className).toContain('text-lg')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    )
    const button = container.firstChild as HTMLElement
    
    expect(button.className).toContain('custom-class')
    expect(button.className).toContain('bg-blue-600') // Default styles still present
  })

  it('passes through additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Test Button">
        Click me
      </Button>
    )
    const button = screen.getByTestId('custom-button')
    
    expect(button).toHaveAttribute('aria-label', 'Test Button')
  })

  it('has type=button by default', () => {
    render(<Button>Default Button</Button>)
    expect(screen.getByText('Default Button')).toHaveAttribute('type', 'button')
  })

  it('allows type override', () => {
    render(<Button type="submit">Submit Button</Button>)
    expect(screen.getByText('Submit Button')).toHaveAttribute('type', 'submit')
  })
})