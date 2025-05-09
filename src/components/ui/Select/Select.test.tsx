import { render, screen, fireEvent } from '@testing-library/react'
import Select from './Select'

describe('Select', () => {
  const defaultOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  it('renders with options correctly', () => {
    render(<Select options={defaultOptions} />)
    
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toBeInTheDocument()
    
    // Check that options are rendered
    expect(screen.getByText('Chocolate')).toBeInTheDocument()
    expect(screen.getByText('Strawberry')).toBeInTheDocument()
    expect(screen.getByText('Vanilla')).toBeInTheDocument()
  })

  it('renders with placeholder when provided', () => {
    render(<Select options={defaultOptions} placeholder="Select a flavor..." />)
    
    expect(screen.getByText('Select a flavor...')).toBeInTheDocument()
  })

  it('handles selection changes correctly', () => {
    const handleChange = jest.fn()
    render(<Select options={defaultOptions} onChange={handleChange} />)
    
    const selectElement = screen.getByRole('combobox')
    fireEvent.change(selectElement, { target: { value: 'vanilla' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(selectElement).toHaveValue('vanilla')
  })

  it('applies disabled attribute correctly', () => {
    render(<Select options={defaultOptions} disabled />)
    
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toBeDisabled()
  })

  it('renders disabled options correctly', () => {
    const optionsWithDisabled = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry', disabled: true },
      { value: 'vanilla', label: 'Vanilla' },
    ]
    
    render(<Select options={optionsWithDisabled} />)
    
    // Get all option elements
    const options = screen.getAllByRole('option')
    
    // Find the strawberry option
    const strawberryOption = options.find(option => option.textContent === 'Strawberry')
    expect(strawberryOption).toHaveAttribute('disabled')
  })

  it('applies error styling when error prop is true', () => {
    const { container } = render(<Select options={defaultOptions} error />)
    
    const selectElement = container.firstChild as HTMLElement
    expect(selectElement.className).toContain('border-destructive')
  })

  it('applies size classes correctly', () => {
    const { rerender, container } = render(<Select options={defaultOptions} size="sm" />)
    
    let selectElement = container.firstChild as HTMLElement
    expect(selectElement.className).toContain('h-8')
    
    rerender(<Select options={defaultOptions} size="md" />)
    selectElement = container.firstChild as HTMLElement
    expect(selectElement.className).toContain('h-10')
    
    rerender(<Select options={defaultOptions} size="lg" />)
    selectElement = container.firstChild as HTMLElement
    expect(selectElement.className).toContain('h-12')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Select options={defaultOptions} className="custom-class" />
    )
    
    const selectElement = container.firstChild as HTMLElement
    expect(selectElement.className).toContain('custom-class')
  })

  it('applies default value correctly', () => {
    render(<Select options={defaultOptions} defaultValue="strawberry" />)
    
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveValue('strawberry')
  })

  it('forwards additional props to the select element', () => {
    render(<Select options={defaultOptions} data-testid="test-select" aria-label="Flavor" />)
    
    const selectElement = screen.getByRole('combobox')
    expect(selectElement).toHaveAttribute('data-testid', 'test-select')
    expect(selectElement).toHaveAttribute('aria-label', 'Flavor')
  })
})