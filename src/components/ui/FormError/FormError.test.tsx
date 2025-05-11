import { render, screen } from '@testing-library/react'
import FormError from './FormError'

describe('FormError', () => {
  it('renders correctly with given error message', () => {
    render(<FormError>Error message</FormError>)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })

  it('includes role="alert" for accessibility', () => {
    render(<FormError>Error message</FormError>)
    const errorMessage = screen.getByRole('alert')
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent('Error message')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <FormError className="custom-class">Error message</FormError>
    )
    const errorElement = container.firstChild as HTMLElement
    expect(errorElement.className).toContain('custom-class')
    expect(errorElement.className).toContain('text-destructive')
  })

  it('passes additional props to the paragraph element', () => {
    render(<FormError data-testid="test-error">Error message</FormError>)
    expect(screen.getByTestId('test-error')).toBeInTheDocument()
  })
})