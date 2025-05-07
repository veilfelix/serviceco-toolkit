import { render, screen, fireEvent } from '@testing-library/react'
import Alert from './Alert'

describe('Alert', () => {
  it('renders alert with content correctly', () => {
    render(<Alert>Alert content</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('renders alert with title when provided', () => {
    render(<Alert title="Alert Title">Alert content</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('renders alert with icon when provided', () => {
    const icon = <svg data-testid="test-icon" />
    
    render(<Alert icon={icon}>Alert with icon</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders dismissible alert with dismiss button when dismissible is true', () => {
    const mockOnDismiss = jest.fn()
    
    render(
      <Alert dismissible onDismiss={mockOnDismiss}>
        Dismissible alert
      </Alert>
    )
    
    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    expect(dismissButton).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const mockOnDismiss = jest.fn()
    
    render(
      <Alert dismissible onDismiss={mockOnDismiss}>
        Dismissible alert
      </Alert>
    )
    
    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    fireEvent.click(dismissButton)
    
    expect(mockOnDismiss).toHaveBeenCalledTimes(1)
  })

  it('does not render dismiss button when dismissible is false', () => {
    const mockOnDismiss = jest.fn()
    
    render(
      <Alert dismissible={false} onDismiss={mockOnDismiss}>
        Non-dismissible alert
      </Alert>
    )
    
    expect(screen.queryByRole('button', { name: /dismiss alert/i })).not.toBeInTheDocument()
  })

  it('does not render dismiss button when onDismiss is not provided', () => {
    render(
      <Alert dismissible>
        Alert without onDismiss
      </Alert>
    )
    
    expect(screen.queryByRole('button', { name: /dismiss alert/i })).not.toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender, container } = render(<Alert variant="default">Default alert</Alert>)
    
    let alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-[hsl(var(--muted))]')
    
    rerender(<Alert variant="success">Success alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-green-50')
    
    rerender(<Alert variant="warning">Warning alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-yellow-50')
    
    rerender(<Alert variant="error">Error alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-red-50')
    
    rerender(<Alert variant="info">Info alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-blue-50')
  })

  it('applies custom className correctly', () => {
    const { container } = render(
      <Alert className="custom-alert-class">Custom class alert</Alert>
    )
    
    const alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('custom-alert-class')
  })

  it('passes additional props to the alert div', () => {
    render(<Alert data-testid="test-alert">Test Alert</Alert>)
    
    expect(screen.getByTestId('test-alert')).toBeInTheDocument()
    expect(screen.getByTestId('test-alert')).toHaveTextContent('Test Alert')
  })
})