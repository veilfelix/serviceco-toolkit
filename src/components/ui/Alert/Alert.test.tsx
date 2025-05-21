import { render, screen, fireEvent } from '@testing-library/react'
import Alert from './Alert'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('Alert', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        datePicker: {
          clearDate: 'Clear date',
          selectDate: 'Select date',
        },
        ui: {
          alert: {
            dismiss: 'Dismiss alert'
          },
          requiredIndicator: '*',
        },
      },
      fr: {
        datePicker: {
          clearDate: 'Effacer la date',
          selectDate: 'Choisir une date',
        },
        ui: {
          alert: {
            dismiss: 'Fermer l\'alerte'
          }
        },
      },
    })
  })

  it('renders alert with content correctly', () => {
    renderWithProvider(<Alert>Alert content</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('renders alert with title when provided', () => {
    renderWithProvider(<Alert title="Alert Title">Alert content</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Alert Title')).toBeInTheDocument()
    expect(screen.getByText('Alert content')).toBeInTheDocument()
  })

  it('renders alert with icon when provided', () => {
    const icon = <svg data-testid="test-icon" />
    
    renderWithProvider(<Alert icon={icon}>Alert with icon</Alert>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders dismissible alert with dismiss button when dismissible is true', () => {
    const mockOnDismiss = jest.fn()
    
    renderWithProvider(
      <Alert dismissible onDismiss={mockOnDismiss}>
        Dismissible alert
      </Alert>
    )
    
    const dismissButton = screen.getByRole('button', { name: /dismiss alert/i })
    expect(dismissButton).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', () => {
    const mockOnDismiss = jest.fn()
    
    renderWithProvider(
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
    
    renderWithProvider(
      <Alert dismissible={false} onDismiss={mockOnDismiss}>
        Non-dismissible alert
      </Alert>
    )
    
    expect(screen.queryByRole('button', { name: /dismiss alert/i })).not.toBeInTheDocument()
  })

  it('does not render dismiss button when onDismiss is not provided', () => {
    renderWithProvider(
      <Alert dismissible>
        Alert without onDismiss
      </Alert>
    )
    
    expect(screen.queryByRole('button', { name: /dismiss alert/i })).not.toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { rerender, container } = renderWithProvider(<Alert variant="default">Default alert</Alert>)
    
    let alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-muted')
    
    rerender(<Alert variant="success">Success alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-alert-success-bg')
    
    rerender(<Alert variant="warning">Warning alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-alert-warning-bg')
    
    rerender(<Alert variant="error">Error alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-alert-error-bg')
    
    rerender(<Alert variant="info">Info alert</Alert>)
    alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('bg-alert-info-bg')
  })

  it('applies custom className correctly', () => {
    const { container } = renderWithProvider(
      <Alert className="custom-alert-class">Custom class alert</Alert>
    )
    
    const alert = container.firstChild as HTMLElement
    expect(alert.className).toContain('custom-alert-class')
  })

  it('passes additional props to the alert div', () => {
    renderWithProvider(<Alert data-testid="test-alert">Test Alert</Alert>)
    
    expect(screen.getByTestId('test-alert')).toBeInTheDocument()
    expect(screen.getByTestId('test-alert')).toHaveTextContent('Test Alert')
  })
})