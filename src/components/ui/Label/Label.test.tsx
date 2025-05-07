import { render, screen } from '@testing-library/react'
import Label from './Label'

describe('Label', () => {
  it('renders correctly with given text', () => {
    render(<Label>Email address</Label>)
    expect(screen.getByText('Email address')).toBeInTheDocument()
  })

  it('applies htmlFor attribute correctly', () => {
    render(<Label htmlFor="email">Email address</Label>)
    const label = screen.getByText('Email address')
    expect(label).toHaveAttribute('for', 'email')
  })

  it('displays required indicator when required is true', () => {
    render(<Label required>Required field</Label>)
    const requiredIndicator = screen.getByText('*')
    expect(requiredIndicator).toBeInTheDocument()
    expect(requiredIndicator).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies error styling when error prop is true', () => {
    const { container } = render(
      <Label error>Error label</Label>
    )
    const label = container.firstChild as HTMLElement
    expect(label.className).toContain('text-[hsl(var(--destructive))]')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Label className="custom-class">Custom label</Label>
    )
    const label = container.firstChild as HTMLElement
    expect(label.className).toContain('custom-class')
  })

  it('passes additional props to the label element', () => {
    render(<Label data-testid="test-label">Test Label</Label>)
    expect(screen.getByTestId('test-label')).toBeInTheDocument()
  })
})