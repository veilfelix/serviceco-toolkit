import { render, screen } from '@testing-library/react'
import Heading from './Heading'

describe('Heading', () => {
  it('renders as h2 by default', () => {
    render(<Heading>Default heading</Heading>)
    const el = screen.getByText('Default heading')
    expect(el.tagName).toBe('H2')
  })

  it('renders with specified heading level', () => {
    render(<Heading as="h4">Custom heading</Heading>)
    const el = screen.getByText('Custom heading')
    expect(el.tagName).toBe('H4')
  })

  it('applies additional className', () => {
    render(<Heading className="text-red-500">Styled heading</Heading>)
    const el = screen.getByText('Styled heading')
    expect(el).toHaveClass('text-red-500')
  })
})
