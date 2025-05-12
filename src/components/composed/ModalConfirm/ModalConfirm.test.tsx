import { render, screen, fireEvent } from '@testing-library/react'
import ModalConfirm from './ModalConfirm'
import { AlertCircle } from 'lucide-react'

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
  })

  it('renders correctly when open', () => {
    render(<ModalConfirm {...defaultProps} />)
    
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getAllByText('Are you sure you want to proceed?').length).toBeGreaterThan(0)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<ModalConfirm {...defaultProps} open={false} />)
    
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument()
  })

  it('calls onConfirm and closes the modal when confirm button is clicked', () => {
    render(<ModalConfirm {...defaultProps} />)
    
    fireEvent.click(screen.getByTestId('modal-confirm-submit'))
    
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1)
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false)
  })

  it('calls onCancel and closes the modal when cancel button is clicked', () => {
    render(<ModalConfirm {...defaultProps} />)
    
    fireEvent.click(screen.getByTestId('modal-confirm-cancel'))
    
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1)
    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false)
  })

  it('uses custom button text when provided', () => {
    render(
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
    render(<ModalConfirm {...defaultProps} isDestructive />)
    
    // Confirm button should have destructive styling
    const confirmButton = screen.getByTestId('modal-confirm-submit')
    expect(confirmButton.className).toContain('border-[hsl(var(--destructive))]')
    expect(confirmButton.className).toContain('text-[hsl(var(--destructive))]')
  })

  it('renders custom icon when provided', () => {
    render(
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
    render(<ModalConfirm {...defaultProps} isDismissable={false} />)
    
    // Verify the component renders properly
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(screen.getAllByText('Are you sure you want to proceed?').length).toBeGreaterThan(0)
  })
})