import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('renders correctly with given label', () => {
    render(<Checkbox label="Test label" id="test-checkbox" />)
    expect(screen.getByText('Test label')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders without label when none is provided', () => {
    render(<Checkbox id="test-checkbox" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('handles checked state correctly', () => {
    render(<Checkbox id="test-checkbox" checked onChange={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('handles change events properly', () => {
    const handleChange = jest.fn()
    render(<Checkbox id="test-checkbox" onChange={handleChange} />)
    
    fireEvent.click(screen.getByRole('checkbox'))
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('associates label with input via id', () => {
    render(<Checkbox label="Test label" id="test-checkbox" />)
    
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByText('Test label')
    
    expect(checkbox).toHaveAttribute('id', 'test-checkbox')
    expect(label).toHaveAttribute('for', 'test-checkbox')
  })

  it('applies disabled attribute correctly', () => {
    render(<Checkbox label="Disabled checkbox" id="test-checkbox" disabled />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    
    const label = screen.getByText('Disabled checkbox')
    expect(label.className).toContain('opacity-50')
    expect(label.className).toContain('cursor-not-allowed')
  })

  it('applies error styling when error prop is true', () => {
    const { container } = render(
      <Checkbox label="Error checkbox" id="test-checkbox" error />
    )
    
    const checkbox = container.querySelector('input') as HTMLElement
    expect(checkbox.className).toContain('border-destructive')
    
    const label = screen.getByText('Error checkbox')
    expect(label.className).toContain('text-destructive')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Checkbox 
        label="Custom checkbox" 
        id="test-checkbox" 
        className="custom-container"
        inputClassName="custom-input"
        labelClassName="custom-label"
      />
    )
    
    const containerDiv = container.firstChild as HTMLElement
    expect(containerDiv.className).toContain('custom-container')
    
    const input = screen.getByRole('checkbox')
    expect(input.className).toContain('custom-input')
    
    const label = screen.getByText('Custom checkbox')
    expect(label.className).toContain('custom-label')
  })
})