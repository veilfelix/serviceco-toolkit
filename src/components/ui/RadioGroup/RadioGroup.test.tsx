import { render, screen, fireEvent } from '@testing-library/react'
import RadioGroup from './RadioGroup'

describe('RadioGroup', () => {
  const mockOnChange = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders radio options correctly', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    )
    
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument()
  })

  it('checks the option matching the value prop', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    )
    
    expect(screen.getByLabelText('Option 1')).toBeChecked()
    expect(screen.getByLabelText('Option 2')).not.toBeChecked()
  })

  it('calls onChange with the new value when an option is selected', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    )
    
    fireEvent.click(screen.getByLabelText('Option 2'))
    expect(mockOnChange).toHaveBeenCalledWith('option2')
  })

  it('does not call onChange when a disabled option is clicked', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" disabled />
      </RadioGroup>
    )
    
    fireEvent.click(screen.getByLabelText('Option 2'))
    expect(mockOnChange).not.toHaveBeenCalled()
  })

  it('applies disabled styles to disabled radio items', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" disabled />
      </RadioGroup>
    )
    
    const disabledInput = screen.getByLabelText('Option 2')
    expect(disabledInput).toBeDisabled()
    
    const disabledLabel = screen.getByText('Option 2')
    expect(disabledLabel.className).toContain('opacity-50')
    expect(disabledLabel.className).toContain('cursor-not-allowed')
  })

  it('applies custom className to RadioGroup container', () => {
    const { container } = render(
      <RadioGroup value="option1" onChange={mockOnChange} className="custom-container">
        <RadioGroup.Item value="option1" label="Option 1" />
      </RadioGroup>
    )
    
    const radioGroupElement = container.firstChild as HTMLElement
    expect(radioGroupElement.className).toContain('custom-container')
  })

  it('applies custom classNames to RadioGroup.Item components', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item 
          value="option1" 
          label="Option 1" 
          className="custom-item"
          inputClassName="custom-input"
          labelClassName="custom-label"
        />
      </RadioGroup>
    )
    
    // Check container class
    const container = screen.getByLabelText('Option 1').closest('div')
    expect(container).toHaveClass('custom-item')
    
    // Check input class
    const input = screen.getByLabelText('Option 1')
    expect(input).toHaveClass('custom-input')
    
    // Check label class
    const label = screen.getByText('Option 1')
    expect(label).toHaveClass('custom-label')
  })

  it('assigns role="radiogroup" to the container for accessibility', () => {
    const { container } = render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
      </RadioGroup>
    )
    
    const radioGroupElement = container.firstChild as HTMLElement
    expect(radioGroupElement).toHaveAttribute('role', 'radiogroup')
  })

  it('generates a unique name for radio inputs if none is provided', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange}>
        <RadioGroup.Item value="option1" label="Option 1" />
        <RadioGroup.Item value="option2" label="Option 2" />
      </RadioGroup>
    )
    
    const firstInput = screen.getByLabelText('Option 1')
    const secondInput = screen.getByLabelText('Option 2')
    
    // Both inputs should have the same name value
    expect(firstInput.getAttribute('name')).toBeTruthy()
    expect(firstInput.getAttribute('name')).toEqual(secondInput.getAttribute('name'))
  })

  it('uses the provided name for radio inputs when specified', () => {
    render(
      <RadioGroup value="option1" onChange={mockOnChange} name="test-radio-group">
        <RadioGroup.Item value="option1" label="Option 1" />
      </RadioGroup>
    )
    
    const input = screen.getByLabelText('Option 1')
    expect(input).toHaveAttribute('name', 'test-radio-group')
  })
})