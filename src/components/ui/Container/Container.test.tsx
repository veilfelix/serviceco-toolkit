import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <p data-testid="inside">Inside container</p>
      </Container>
    )
    expect(screen.getByTestId('inside')).toBeInTheDocument()
  })

  it('applies custom className if provided', () => {
    const { container } = render(
      <Container className="custom-class">
        <p>Content</p>
      </Container>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })
})
