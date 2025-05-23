import { render, screen, fireEvent } from '@testing-library/react'
import Switch from './Switch'

describe('Switch', () => {
  const mockOnCheckedChange = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders switch without label correctly', () => {
    render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} />)

    const switchInput = screen.getByRole('checkbox')
    expect(switchInput).toBeInTheDocument()
    expect(switchInput).not.toBeChecked()
  })

  it('renders switch with label correctly', () => {
    render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} label="Test Label" />)
  
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('reflects the checked state correctly', () => {
    const { rerender } = render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} />)

    let switchInput = screen.getByRole('checkbox')
    expect(switchInput).not.toBeChecked()

    rerender(<Switch checked={true} onCheckedChange={mockOnCheckedChange} />)

    switchInput = screen.getByRole('checkbox')
    expect(switchInput).toBeChecked()
  })

  it('calls onCheckedChange when toggled', () => {
    render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} />)

    const switchInput = screen.getByRole('checkbox')
    fireEvent.click(switchInput)

    expect(mockOnCheckedChange).toHaveBeenCalledTimes(1)
    expect(mockOnCheckedChange).toHaveBeenCalledWith(true)
  })

  it('does not call onCheckedChange when toggled while disabled', () => {
    render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} disabled />)

    const switchInput = screen.getByRole('checkbox')
    fireEvent.click(switchInput)

    expect(mockOnCheckedChange).not.toHaveBeenCalled()
  })

  it('applies disabled attribute when disabled is true', () => {
    render(<Switch checked={false} onCheckedChange={mockOnCheckedChange} disabled />)

    const switchInput = screen.getByRole('checkbox')
    expect(switchInput).toBeDisabled()
  })

  it('renders label to the right by default', () => {
    const { container } = render(
      <Switch checked={false} onCheckedChange={mockOnCheckedChange} label="Right Label" />
    )

    const wrapperDiv = container.firstChild as HTMLElement
    expect(wrapperDiv.className).toContain('flex-row')
    expect(wrapperDiv.className).not.toContain('flex-row-reverse')
  })

  it('renders label to the left when labelPosition is "left"', () => {
    const { container } = render(
      <Switch checked={false} onCheckedChange={mockOnCheckedChange} label="Left Label" labelPosition="left" />
    )

    const wrapperDiv = container.firstChild as HTMLElement
    expect(wrapperDiv.className).toContain('flex-row-reverse')
  })

  it('applies custom className correctly', () => {
    const { container } = render(
      <Switch checked={false} onCheckedChange={mockOnCheckedChange} className="custom-class" />
    )

    const switchElement = container.querySelector('.inline-flex')
    expect(switchElement?.className).toContain('custom-class')
  })

  it('applies custom labelClassName correctly', () => {
    render(
      <Switch
        checked={false}
        onCheckedChange={mockOnCheckedChange}
        label="Custom Label"
        labelClassName="custom-label-class"
      />
    )
  
    const labelText = screen.getByText('Custom Label')
    expect(labelText.className).toContain('custom-label-class')
  })

  it('applies different sizes correctly', () => {
    const { rerender, container } = render(
      <Switch checked={false} onCheckedChange={mockOnCheckedChange} visualSize="sm" />
    )

    let trackElement = container.querySelector('div[class*="rounded-full transition-colors"]')
    expect(trackElement?.className).toContain('h-[var(--switch-sm-track-height)]')

    rerender(<Switch checked={false} onCheckedChange={mockOnCheckedChange} visualSize="md" />)
    trackElement = container.querySelector('div[class*="rounded-full transition-colors"]')
    expect(trackElement?.className).toContain('h-[var(--switch-md-track-height)]')

    rerender(<Switch checked={false} onCheckedChange={mockOnCheckedChange} visualSize="lg" />)
    trackElement = container.querySelector('div[class*="rounded-full transition-colors"]')
    expect(trackElement?.className).toContain('h-[var(--switch-lg-track-height)]')
  })

  it('uses provided id or generates one if not provided', () => {
    const { rerender } = render(
      <Switch checked={false} onCheckedChange={mockOnCheckedChange} id="custom-id" label="Test" />
    )
  
    let input = screen.getByRole('checkbox')
    expect(input).toHaveAttribute('id', 'custom-id')
  
    rerender(<Switch checked={false} onCheckedChange={mockOnCheckedChange} label="Test" />)
  
    input = screen.getByRole('checkbox')
    const label = screen.getByText('Test').closest('label')
  
    expect(input).toHaveAttribute('id')
    expect(label).toHaveAttribute('for', input.getAttribute('id'))
  })
})
