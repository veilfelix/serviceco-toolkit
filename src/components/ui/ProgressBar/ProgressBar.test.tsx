import { render, screen } from '@testing-library/react'
import ProgressBar from './ProgressBar'

describe('ProgressBar', () => {
  it('renders correctly with default props', () => {
    render(<ProgressBar />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-valuetext', '0%')
  })

  it('renders with specified value and max', () => {
    render(<ProgressBar value={25} max={50} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '25')
    expect(progressBar).toHaveAttribute('aria-valuemax', '50')
    expect(progressBar).toHaveAttribute('aria-valuetext', '50%') // 25/50 = 50%
  })

  it('renders with indeterminate state', () => {
    render(<ProgressBar indeterminate />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).not.toHaveAttribute('aria-valuenow')
    expect(progressBar).toHaveAttribute('aria-busy', 'true')
    
    // Check that the indeterminate animation class is applied
    const indicator = progressBar.firstChild as HTMLElement
    expect(indicator.className).toContain('animate-indeterminate')
  })

  it('does not exceed max value', () => {
    render(<ProgressBar value={150} max={100} />)
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '100')
    expect(progressBar).toHaveAttribute('aria-valuetext', '100%')
  })

  it('does not go below 0', () => {
    render(<ProgressBar value={-10} max={100} />)

    const updatedProgressBar = screen.getByRole('progressbar')
    expect(updatedProgressBar).toHaveAttribute('aria-valuenow', '0')
    expect(updatedProgressBar).toHaveAttribute('aria-valuetext', '0%')
  })

  it('renders label when provided', () => {
    render(<ProgressBar label="Loading..." />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows value label when showValueLabel is true', () => {
    render(<ProgressBar value={75} label="Progress" showValueLabel />)
    
    expect(screen.getByText('Progress')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('uses custom value formatter when provided', () => {
    const customFormatter = (value: number, max: number) => `${value} of ${max} steps completed`
    render(<ProgressBar 
      value={3} 
      max={10} 
      label="Steps" 
      showValueLabel 
      valueFormatter={customFormatter}
    />)
    
    expect(screen.getByText('Steps')).toBeInTheDocument()
    expect(screen.getByText('3 of 10 steps completed')).toBeInTheDocument()
    
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuetext', '3 of 10 steps completed')
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(<ProgressBar size="sm" />)
    
    let progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('h-1')
    
    rerender(<ProgressBar size="default" />)
    progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('h-[var(--progress-height)]')
    
    rerender(<ProgressBar size="lg" />)
    progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveClass('h-3')
  })

  it('applies color variants correctly', () => {
    const { rerender } = render(<ProgressBar value={50} color="primary" />)
    
    let indicator = screen.getByRole('progressbar').firstChild as HTMLElement
    expect(indicator).toHaveClass('bg-progress-primary')
    
    rerender(<ProgressBar value={50} color="secondary" />)
    indicator = screen.getByRole('progressbar').firstChild as HTMLElement
    expect(indicator).toHaveClass('bg-progress-secondary')
    
    rerender(<ProgressBar value={50} color="success" />)
    indicator = screen.getByRole('progressbar').firstChild as HTMLElement
    expect(indicator).toHaveClass('bg-progress-success')
    
    rerender(<ProgressBar value={50} color="warning" />)
    indicator = screen.getByRole('progressbar').firstChild as HTMLElement
    expect(indicator).toHaveClass('bg-progress-warning')
    
    rerender(<ProgressBar value={50} color="danger" />)
    indicator = screen.getByRole('progressbar').firstChild as HTMLElement
    expect(indicator).toHaveClass('bg-progress-danger')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(<ProgressBar className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
    expect(container.firstChild).toHaveClass('w-full')
  })

  it('passes additional props to the div element', () => {
    render(<ProgressBar data-testid="test-progress" />)
    
    expect(screen.getByTestId('test-progress')).toBeInTheDocument()
  })
})