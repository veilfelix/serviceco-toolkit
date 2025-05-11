import { render, screen, fireEvent } from '@testing-library/react'
import Textarea from './Textarea'

describe('Textarea', () => {
  it('renders correctly with given placeholder', () => {
    render(<Textarea placeholder="Test placeholder" />)
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('handles input correctly', () => {
    const handleChange = jest.fn()
    render(<Textarea onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(textarea).toHaveValue('test value')
  })

  it('applies disabled attribute correctly', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />)
    const textarea = screen.getByPlaceholderText('Disabled textarea')
    expect(textarea).toBeDisabled()
  })

  it('handles rows attribute correctly', () => {
    render(<Textarea rows={6} placeholder="Textarea with rows" />)
    const textarea = screen.getByPlaceholderText('Textarea with rows')
    expect(textarea).toHaveAttribute('rows', '6')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Textarea className="custom-class" />
    )
    const textarea = container.firstChild as HTMLElement
    expect(textarea.className).toContain('custom-class')
  })

  it('applies error styling when error prop is true', () => {
    const { container } = render(
      <Textarea error placeholder="Error textarea" />
    )
    const textarea = container.firstChild as HTMLElement
    expect(textarea.className).toContain('border-destructive')
  })
})