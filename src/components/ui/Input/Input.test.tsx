import { render, screen, fireEvent } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  it('renders correctly with given placeholder', () => {
    render(<Input placeholder="Test placeholder" />)
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument()
  })

  it('handles input correctly', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })

  it('applies disabled attribute correctly', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('applies the correct type attribute', () => {
    render(<Input type="email" placeholder="Email input" />)
    const input = screen.getByPlaceholderText('Email input')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Input className="custom-class" />
    )
    const input = container.firstChild as HTMLElement
    expect(input.className).toContain('custom-class')
  })

  it('applies error styling when error prop is true', () => {
    const { container } = render(
      <Input error placeholder="Error input" />
    )
    const input = container.firstChild as HTMLElement
    expect(input.className).toContain('border-destructive')
  })
})