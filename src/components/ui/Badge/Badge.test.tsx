import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('renders correctly with given text', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('applies primary variant styles by default', () => {
    const { container } = render(<Badge>Primary Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-[hsl(var(--primary))]')
    expect(badge.className).toContain('text-[hsl(var(--primary-foreground))]')
  })

  it('applies secondary variant styles when specified', () => {
    const { container } = render(<Badge variant="secondary">Secondary Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-[hsl(var(--secondary))]')
    expect(badge.className).toContain('text-[hsl(var(--secondary-foreground))]')
  })

  it('applies outline variant styles when specified', () => {
    const { container } = render(<Badge variant="outline">Outline Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('border-[hsl(var(--input))]')
    expect(badge.className).toContain('bg-transparent')
  })

  it('applies success variant styles when specified', () => {
    const { container } = render(<Badge variant="success">Success Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-green-500')
    expect(badge.className).toContain('text-white')
  })

  it('applies warning variant styles when specified', () => {
    const { container } = render(<Badge variant="warning">Warning Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-yellow-500')
    expect(badge.className).toContain('text-black')
  })

  it('applies danger variant styles when specified', () => {
    const { container } = render(<Badge variant="danger">Danger Badge</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('bg-[hsl(var(--destructive))]')
    expect(badge.className).toContain('text-[hsl(var(--destructive-foreground))]')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Badge className="custom-class">Custom Badge</Badge>
    )
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain('custom-class')
  })

  it('passes additional props to the span element', () => {
    render(<Badge data-testid="test-badge">Test Badge</Badge>)
    expect(screen.getByTestId('test-badge')).toBeInTheDocument()
  })
})