import { render, screen } from '@testing-library/react'
import Heading from '@/components/ui/Heading/Heading'
import React from 'react'

describe('Heading', () => {
  it('renders as an h2 by default', () => {
    render(<Heading>Default heading</Heading>)
    const element = screen.getByText('Default heading')
    expect(element.tagName).toBe('H2')
    expect(element).toHaveClass('text-3xl')
  })

  it('renders as specified heading tag', () => {
    render(<Heading as="h4">Custom heading</Heading>)
    const element = screen.getByText('Custom heading')
    expect(element.tagName).toBe('H4')
    expect(element).toHaveClass('text-xl')
  })

  it('merges additional classes', () => {
    render(<Heading className="text-red-500">Styled heading</Heading>)
    const element = screen.getByText('Styled heading')
    expect(element).toHaveClass('text-red-500')
  })
})
