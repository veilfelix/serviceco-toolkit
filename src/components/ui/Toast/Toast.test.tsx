import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toast } from './Toast'
import { ToastProvider, useSimplifiedToast } from './ToastProvider'

// Mock timers for testing animations and auto-dismiss
jest.useFakeTimers()

describe('Toast', () => {
  it('renders toast with content correctly', () => {
    render(
      <ToastProvider>
        <Toast>Toast message</Toast>
      </ToastProvider>
    )
    
    expect(screen.getByText('Toast message')).toBeInTheDocument()
  })

  it('renders toast with title when provided', () => {
    render(
      <ToastProvider>
        <Toast title="Toast Title">Toast message</Toast>
      </ToastProvider>
    )
    
    expect(screen.getByText('Toast Title')).toBeInTheDocument()
    expect(screen.getByText('Toast message')).toBeInTheDocument()
  })

  it('renders toast with custom icon when provided', () => {
    const icon = <svg data-testid="test-icon" />
    
    render(
      <ToastProvider>
        <Toast icon={icon}>Toast with icon</Toast>
      </ToastProvider>
    )
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
  })

  it('renders default icon based on variant', () => {
    const { rerender } = render(
      <ToastProvider>
        <Toast variant="success">Success toast</Toast>
      </ToastProvider>
    )
    
    // Success variant should have an icon (SVG)
    const successToast = screen.getByText('Success toast').closest('[role="region"]')
    expect(successToast?.querySelector('svg')).toBeInTheDocument()
    
    // Test other variants
    rerender(
      <ToastProvider>
        <Toast variant="error">Error toast</Toast>
      </ToastProvider>
    )
    const errorToast = screen.getByText('Error toast').closest('[role="region"]')
    expect(errorToast?.querySelector('svg')).toBeInTheDocument()
    
    rerender(
      <ToastProvider>
        <Toast variant="warning">Warning toast</Toast>
      </ToastProvider>
    )
    const warningToast = screen.getByText('Warning toast').closest('[role="region"]')
    expect(warningToast?.querySelector('svg')).toBeInTheDocument()
    
    rerender(
      <ToastProvider>
        <Toast variant="info">Info toast</Toast>
      </ToastProvider>
    )
    const infoToast = screen.getByText('Info toast').closest('[role="region"]')
    expect(infoToast?.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onOpenChange when close button is clicked', () => {
    const mockOnOpenChange = jest.fn()
    
    render(
      <ToastProvider>
        <Toast onOpenChange={mockOnOpenChange}>Dismissible toast</Toast>
      </ToastProvider>
    )
    
    const dismissButton = screen.getByRole('button', { name: /close/i })
    fireEvent.click(dismissButton)
    
    // onOpenChange should be called
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })
})

describe('useToastAPI hook', () => {
  const ToastAPIDemo = () => {
    const toast = useSimplifiedToast()

    return (
      <div>
        <button onClick={() => toast.show('Default Toast')}>Show Default</button>
        <button onClick={() => toast.success('Success Toast')}>Show Success</button>
        <button onClick={() => toast.error('Error Toast')}>Show Error</button>
        <button onClick={() => toast.warning('Warning Toast')}>Show Warning</button>
        <button onClick={() => toast.info('Info Toast')}>Show Info</button>
      </div>
    )
  }

  it('shows toasts using useToastAPI with correct variants', () => {
    render(
      <ToastProvider>
        <ToastAPIDemo />
      </ToastProvider>
    )

    // Success toast
    fireEvent.click(screen.getByText('Show Success'))
    expect(screen.getByText('Success Toast')).toBeInTheDocument()

    // Error toast
    fireEvent.click(screen.getByText('Show Error'))
    expect(screen.getByText('Error Toast')).toBeInTheDocument()
  })
})


// Cleanup
afterAll(() => {
  jest.useRealTimers()
})