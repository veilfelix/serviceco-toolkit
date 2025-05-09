import { render, screen } from '@testing-library/react'
import RichText from './RichText'

describe('RichText', () => {
  it('renders children inside a div with prose classes', () => {
    render(<RichText><p>This is rich text.</p></RichText>)
    const element = screen.getByText('This is rich text.')
    expect(element.tagName).toBe('P')
    expect(element.closest('div')).toHaveClass('prose', 'max-w-none', 'text-foreground')
  })

  it('applies additional class names if provided', () => {
    render(<RichText className="custom-class"><p>Extra class test</p></RichText>)
    const element = screen.getByText('Extra class test')
    expect(element.closest('div')).toHaveClass('custom-class')
  })
})
