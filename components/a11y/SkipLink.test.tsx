import { render, screen } from '@testing-library/react'
import SkipLink from './SkipLink'

describe('SkipLink', () => {
  it('renders a skip link with correct href and label', () => {
    render(<SkipLink />)
    const link = screen.getByText(/Skip to main content/i)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
    expect(link).toHaveClass('sr-only')
  })
})