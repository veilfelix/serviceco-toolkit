import { render, screen } from '@testing-library/react'
import Spinner from './Spinner'

describe('Spinner', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />)
    const spinner = screen.getByRole('status')
    expect(spinner).toBeInTheDocument()
    expect(spinner.getAttribute('aria-label')).toBe('Loading')
    expect(spinner.firstChild).toHaveClass('sr-only')
    expect(spinner.firstChild).toHaveTextContent('Loading')
  })

  it('applies primary variant styles by default', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('border-primary/30')
    expect(spinner.className).toContain('border-t-primary')
  })

  it('applies secondary variant styles when specified', () => {
    const { container } = render(<Spinner variant="secondary" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('border-secondary/30')
    expect(spinner.className).toContain('border-t-secondary')
  })

  it('applies muted variant styles when specified', () => {
    const { container } = render(<Spinner variant="muted" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('border-muted-foreground/30')
    expect(spinner.className).toContain('border-t-muted-foreground')
  })

  it('applies white variant styles when specified', () => {
    const { container } = render(<Spinner variant="white" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('border-white/30')
    expect(spinner.className).toContain('border-t-white')
  })

  it('applies the correct size styles based on size prop', () => {
    const { container: smContainer } = render(<Spinner size="sm" />)
    const smSpinner = smContainer.firstChild as HTMLElement
    expect(smSpinner.className).toContain('h-4 w-4 border-2')

    const { container: mdContainer } = render(<Spinner size="md" />)
    const mdSpinner = mdContainer.firstChild as HTMLElement
    expect(mdSpinner.className).toContain('h-6 w-6 border-2')

    const { container: lgContainer } = render(<Spinner size="lg" />)
    const lgSpinner = lgContainer.firstChild as HTMLElement
    expect(lgSpinner.className).toContain('h-8 w-8 border-4')

    const { container: xlContainer } = render(<Spinner size="xl" />)
    const xlSpinner = xlContainer.firstChild as HTMLElement
    expect(xlSpinner.className).toContain('h-12 w-12 border-4')
  })

  it('applies correct layout styles based on layout prop', () => {
    const { container: inlineContainer } = render(<Spinner layout="inline" />)
    const inlineSpinner = inlineContainer.firstChild as HTMLElement
    expect(inlineSpinner.className).toContain('inline-block')

    const { container: centerContainer } = render(<Spinner layout="center" />)
    const centerSpinner = centerContainer.firstChild as HTMLElement
    expect(centerSpinner.className).toContain('mx-auto block')
  })

  it('uses inline layout by default', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('inline-block')
  })

  it('applies custom aria-label when provided', () => {
    render(<Spinner ariaLabel="Processing" />)
    const spinner = screen.getByRole('status')
    expect(spinner.getAttribute('aria-label')).toBe('Processing')
    expect(spinner.firstChild).toHaveTextContent('Processing')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(<Spinner className="custom-class" />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('custom-class')
  })

  it('passes additional props to the div element', () => {
    render(<Spinner data-testid="test-spinner" />)
    expect(screen.getByTestId('test-spinner')).toBeInTheDocument()
  })

  it('has animate-spin class for animation', () => {
    const { container } = render(<Spinner />)
    const spinner = container.firstChild as HTMLElement
    expect(spinner.className).toContain('animate-spin')
  })
})