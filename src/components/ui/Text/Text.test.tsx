import { render, screen } from '@testing-library/react'
import Text from '@/components/ui/Text/Text'

describe('Text', () => {
  it('renders as a paragraph by default', () => {
    render(<Text>This is a paragraph.</Text>)
    const element = screen.getByText('This is a paragraph.')
    expect(element.tagName).toBe('P')
  })

  it('can render as a span', () => {
    render(<Text as="span">This is a span.</Text>)
    const element = screen.getByText('This is a span.')
    expect(element.tagName).toBe('SPAN')
  })

  it('merges additional classes', () => {
    render(<Text className="text-red-500">Styled text</Text>)
    const element = screen.getByText('Styled text')
    expect(element).toHaveClass('text-red-500')
  })
})
