import { render, screen } from '@testing-library/react'
import SkipLink from '@/components/a11y/SkipLink'
import React from 'react'

describe('SkipLink', () => {
  it('renders a skip link with correct href and label', () => {
    render(<SkipLink />)
    const link = screen.getByText(/Skip to main content/i)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
    expect(link).toHaveClass('sr-only')
  })
})