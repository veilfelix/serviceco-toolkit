import { render, screen, fireEvent } from '@testing-library/react'
import Slider from './Slider'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

const mockRect = (element: Element, left: number, width: number) => {
  const originalGetBoundingClientRect = element.getBoundingClientRect
  jest.spyOn(element, 'getBoundingClientRect').mockImplementation(() => ({
    left,
    width,
    right: left + width,
    top: 0,
    bottom: 0,
    height: 0,
    x: left,
    y: 0,
    toJSON: () => {},
  }))
  return () => {
    element.getBoundingClientRect = originalGetBoundingClientRect
  }
}

describe('Slider', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        ui: {
          requiredIndicator: '*',
          tooltip: 'Tooltip',
        },
      },
      fr: {
        ui: {
          requiredIndicator: '*',
          tooltip: 'Info-bulle',
        },
      },
    })
  })

  // Single value slider tests
  describe('Single value slider', () => {
    it('renders correctly with default props', () => {
      renderWithProvider(<Slider aria-label="Test slider" />)
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('aria-valuenow', '0')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
    })

    it('renders with provided value', () => {
      renderWithProvider(<Slider value={50} aria-label="Test slider" />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('calls onChange when track is clicked', () => {
      const handleChange = jest.fn()
      const { container } = renderWithProvider(
        <Slider value={0} onChange={handleChange} aria-label="Test slider" />
      )
      
      const track = container.querySelector('div[role="presentation"]')
      if (!track) throw new Error('Track not found')
      
      // Mock the getBoundingClientRect for the track
      const cleanup = mockRect(track, 0, 200)
      
      // Click in the middle (50%)
      fireEvent.click(track, { clientX: 100 })
      
      expect(handleChange).toHaveBeenCalledWith(50)
      cleanup()
    })

    it('updates value with keyboard arrow keys', async () => {
      const handleChange = jest.fn()
      renderWithProvider(
        <Slider 
          value={50} 
          onChange={handleChange} 
          step={5}
          aria-label="Test slider" 
        />
      )
      
      const thumb = screen.getByRole('slider')
      
      // Right arrow should increment by one step
      fireEvent.keyDown(thumb, { key: 'ArrowRight' })
      expect(handleChange).toHaveBeenCalledWith(55)
      
      // Left arrow should decrement by one step
      fireEvent.keyDown(thumb, { key: 'ArrowLeft' })
      expect(handleChange).toHaveBeenCalledWith(45)
      
      // Home key should set to min
      fireEvent.keyDown(thumb, { key: 'Home' })
      expect(handleChange).toHaveBeenCalledWith(0)
      
      // End key should set to max
      fireEvent.keyDown(thumb, { key: 'End' })
      expect(handleChange).toHaveBeenCalledWith(100)
    })

    it('displays label when provided', () => {
      renderWithProvider(<Slider label="Volume" />)
      const label = screen.getByText('Volume')
      expect(label).toBeInTheDocument()
      expect(label.tagName).toBe('LABEL')
    })
  })

  // Range slider tests
  describe('Range slider', () => {
    it('renders with two thumbs for range values', () => {
      renderWithProvider(<Slider range={[25, 75]} aria-label="Test range slider" />)
      const thumbs = screen.getAllByRole('slider')
      expect(thumbs).toHaveLength(2)
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '25')
      expect(thumbs[1]).toHaveAttribute('aria-valuenow', '75')
    })

    it('calls onRangeChange when track is clicked', () => {
      const handleRangeChange = jest.fn()
      const { container } = renderWithProvider(
        <Slider range={[25, 75]} onRangeChange={handleRangeChange} aria-label="Test range slider" />
      )
      
      const track = container.querySelector('div[role="presentation"]')
      if (!track) throw new Error('Track not found')
      
      // Mock the getBoundingClientRect for the track
      const cleanup = mockRect(track, 0, 200)
      
      // Click near the first handle (closer to 25% than 75%)
      fireEvent.click(track, { clientX: 40 })
      expect(handleRangeChange).toHaveBeenCalledWith([20, 75])
      
      // Click near the second handle
      fireEvent.click(track, { clientX: 160 })
      expect(handleRangeChange).toHaveBeenCalledWith([25, 80])
      
      cleanup()
    })

    it('updates range values with keyboard arrow keys', () => {
      const handleRangeChange = jest.fn()
      renderWithProvider(
        <Slider 
          range={[25, 75]} 
          onRangeChange={handleRangeChange} 
          step={5}
          aria-label="Test range slider" 
        />
      )
      
      const thumbs = screen.getAllByRole('slider')
      
      // Left thumb - increase value
      fireEvent.keyDown(thumbs[0], { key: 'ArrowRight' })
      expect(handleRangeChange).toHaveBeenCalledWith([30, 75])
      
      // Right thumb - decrease value
      fireEvent.keyDown(thumbs[1], { key: 'ArrowLeft' })
      expect(handleRangeChange).toHaveBeenCalledWith([25, 70])
      
      // Left thumb can't exceed right thumb value
      fireEvent.keyDown(thumbs[0], { key: 'End' })
      expect(handleRangeChange).toHaveBeenCalledWith([75, 75])
      
      // Right thumb can't go below left thumb value
      fireEvent.keyDown(thumbs[1], { key: 'Home' })
      expect(handleRangeChange).toHaveBeenCalledWith([25, 25])
    })
  })

  // Variant and size tests
  describe('Variants and sizes', () => {
    it('applies correct size classes', () => {
      const { container, rerender } = renderWithProvider(<Slider size="sm" />)
      let track = container.querySelector('div[role="presentation"]')
      expect(track).toHaveClass('h-[0.125rem]')
      
      rerender(<Slider size="md" />)
      track = container.querySelector('div[role="presentation"]')
      expect(track).toHaveClass('h-[var(--slider-track-height)]')
      
      rerender(<Slider size="lg" />)
      track = container.querySelector('div[role="presentation"]')
      expect(track).toHaveClass('h-[0.375rem]')
    })

    it('applies variant classes correctly', () => {
      const { container, rerender } = renderWithProvider(<Slider variant="primary" />)
      let track = container.querySelector('div[role="presentation"]')
      let range = track?.firstChild
      
      expect(track).toHaveClass('bg-muted')
      expect(range).toHaveClass('bg-primary')
      
      rerender(<Slider variant="secondary" />)
      track = container.querySelector('div[role="presentation"]')
      range = track?.firstChild
      
      expect(track).toHaveClass('bg-muted')
      expect(range).toHaveClass('bg-secondary')
    })
  })

  // Accessibility tests
  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      renderWithProvider(<Slider value={42} label="Volume control" />)
      const slider = screen.getByRole('slider')
      
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '42')
      expect(slider).toHaveAttribute('aria-label', 'Volume control')
      expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
      expect(slider).toHaveAttribute('aria-disabled', 'false')
    })

    it('is focusable and navigable with keyboard', () => {
      renderWithProvider(<Slider value={50} />)
      const slider = screen.getByRole('slider')
      
      expect(slider).toHaveAttribute('tabIndex', '0')
      slider.focus()
      expect(document.activeElement).toBe(slider)
    })

    it('has correct disabled state', () => {
      renderWithProvider(<Slider disabled value={50} />)
      const slider = screen.getByRole('slider')
      
      expect(slider).toHaveAttribute('aria-disabled', 'true')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })

    it('formats values with formatValue prop', () => {
      const formatValue = (val: number) => `$${val}`
      renderWithProvider(<Slider value={50} formatValue={formatValue} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuetext', '$50')
    })
  })

  // Additional features tests
  describe('Additional features', () => {
    it('renders min/max labels when enabled', () => {
      renderWithProvider(<Slider showMinMaxLabels min={10} max={90} />)
      
      expect(screen.getByText('10')).toBeInTheDocument()
      expect(screen.getByText('90')).toBeInTheDocument()
    })

    it('formats min/max labels with formatValue', () => {
      const formatValue = (val: number) => `$${val}`
      renderWithProvider(<Slider showMinMaxLabels min={10} max={90} formatValue={formatValue} />)
      
      expect(screen.getByText('$10')).toBeInTheDocument()
      expect(screen.getByText('$90')).toBeInTheDocument()
    })

    it('shows tooltip on focus when showTooltip is "focus"', async () => {
      renderWithProvider(<Slider value={50} showTooltip="focus" />)
      
      const slider = screen.getByRole('slider')
      fireEvent.focus(slider)
      
      expect(screen.getByText('50')).toBeInTheDocument()
      
      fireEvent.blur(slider)
      expect(screen.queryByText('50')).not.toBeInTheDocument()
    })

    it('shows tooltip always when showTooltip is "always"', () => {
      renderWithProvider(<Slider value={50} showTooltip="always" />)
      expect(screen.getByText('50')).toBeInTheDocument()
    })
  })
})