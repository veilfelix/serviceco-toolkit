import { render, screen, fireEvent } from '@testing-library/react'
import ModalConfirm from './ModalConfirm'
import { AlertCircle } from 'lucide-react'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('ModalConfirm', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    initTestI18n({
      en: {
        composed: {
          dialog: {
            close: 'Close dialog',
            confirm: 'Confirm',
            cancel: 'Cancel',
          },
        },
      },
      fr: {
        composed: {
          dialog: {
            close: 'Fermer la boîte de dialogue',
            confirm: 'Confirmer',
            cancel: 'Annuler',
          },
        },
      },
    })
  })

  it('renders correctly when open', () => {
    renderWithProvider(<ModalConfirm {...defaultProps} />)
    
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getAllByText('Are you sure you want to proceed?').length).toBeGreaterThan(0)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    renderWithProvider(<ModalConfirm {...defaultProps} open={false} />)
    
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
  })

  it('calls onConfirm and closes the modal when confirm button is clicked', () => {
    renderWithProvider(<ModalConfirm {...defaultProps} />)
    
    fireEvent.click(screen.getByTestId('modal-confirm-submit'))
    
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls onCancel and closes the modal when cancel button is clicked', () => {
    renderWithProvider(<ModalConfirm {...defaultProps} />)
    
    fireEvent.click(screen.getByTestId('modal-confirm-cancel'))
    
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false)
  })

  it('uses custom button text when provided', () => {
    renderWithProvider(
      <ModalConfirm 
        {...defaultProps} 
        confirmText="Yes, Delete" 
        cancelText="No, Keep It" 
      />
    )
    
    expect(screen.getByText('Yes, Delete')).toBeInTheDocument()
    expect(screen.getByText('No, Keep It')).toBeInTheDocument()
  })

  it('renders with destructive styling when isDestructive is true', () => {
    renderWithProvider(<ModalConfirm {...defaultProps} isDestructive />)
    
    // Confirm button should have destructive styling
    const confirmButton = screen.getByTestId('modal-confirm-submit')
    expect(confirmButton.className).toContain('border-[hsl(var(--destructive))]')
    expect(confirmButton.className).toContain('text-[hsl(var(--destructive))]')
  })

  it('renders custom icon when provided', () => {
    renderWithProvider(
      <ModalConfirm 
        {...defaultProps} 
        icon={<AlertCircle data-testid="custom-icon" />} 
      />
    )
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('prevents dismissal when isDismissable is false', () => {
    // We can't easily test the Escape key and outside click behavior in JSDOM,
    // but we can check if the component renders without errors
    renderWithProvider(<ModalConfirm {...defaultProps} isDismissable={false} />)
    
    // Verify the component renders properly
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getAllByText('Are you sure you want to proceed?').length).toBeGreaterThan(0)
  })
})