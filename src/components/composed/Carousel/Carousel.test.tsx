import { render, screen, fireEvent, act } from '@testing-library/react'
import Carousel from './Carousel'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null
  readonly rootMargin: string = ''
  readonly thresholds: number[] = []

  observe = jest.fn()
  unobserve = jest.fn()
  disconnect = jest.fn()
  takeRecords = jest.fn()

  constructor() {}
}

window.IntersectionObserver = MockIntersectionObserver

// Mock matchMedia to handle responsive behavior tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    initTestI18n({
      en: {
        composed: {
          carousel: {
            label: 'carousel',
            roledescription: 'carousel',
            slide: 'slide',
            slidePosition: 'Slide {{current}} of {{total}}',
            previousSlide: 'Previous slide',
            nextSlide: 'Next slide',
            goToSlide: 'Go to slide {{number}}',
            slideCurrentPosition: 'Slide {{number}} (current)',
            slideNumber: 'Slide {{number}}'
          }
        },
        datePicker: {
          clearDate: 'Clear date',
          selectDate: 'Select date',
        },
        ui: {
          requiredIndicator: '*',
        },
      },
      fr: {
        composed: {
          carousel: {
            label: 'carrousel',
            roledescription: 'carrousel',
            slide: 'diapositive',
            slidePosition: 'Diapositive {{current}} sur {{total}}',
            previousSlide: 'Diapositive précédente',
            nextSlide: 'Diapositive suivante',
            goToSlide: 'Aller à la diapositive {{number}}',
            slideCurrentPosition: 'Diapositive {{number}} (actuelle)',
            slideNumber: 'Diapositive {{number}}'
          }
        },
        datePicker: {
          clearDate: 'Effacer la date',
          selectDate: 'Choisir une date',
        },
      },
    })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the carousel with slides', () => {
    renderWithProvider(
      <Carousel data-testid="carousel">
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
        <Carousel.Item>Slide 3</Carousel.Item>
      </Carousel>
    )

    const carousel = screen.getByTestId('carousel')
    expect(carousel).toBeInTheDocument()
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('renders navigation controls when showArrows is true', () => {
    renderWithProvider(
      <Carousel showArrows={true}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
  })

  it('does not render navigation controls when showArrows is false', () => {
    renderWithProvider(
      <Carousel showArrows={false}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
  })

  it('renders indicators when showIndicators is true', () => {
    renderWithProvider(
      <Carousel showIndicators={true}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
        <Carousel.Item>Slide 3</Carousel.Item>
      </Carousel>
    )

    // Find all indicator buttons
    const indicators = screen.getAllByLabelText(/Go to slide/i)
    expect(indicators.length).toBe(3)
  })

  it('does not render indicators when showIndicators is false', () => {
    renderWithProvider(
      <Carousel showIndicators={false}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    expect(screen.queryByLabelText(/Go to slide/i)).not.toBeInTheDocument()
  })

  it('navigates to the next slide when clicking the next button', () => {
    renderWithProvider(
      <Carousel>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    // Initially, Slide 1 is active
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    // After clicking next, Slide 2 should be visible
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('navigates to the previous slide when clicking the previous button', () => {
    renderWithProvider(
      <Carousel>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    // Move to slide 2
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    // Go back to slide 1
    const prevButton = screen.getByLabelText('Previous slide')
    fireEvent.click(prevButton)

    // Slide 1 should be visible again
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('advances slides automatically when autoplay is enabled', () => {
    renderWithProvider(
      <Carousel autoplay autoplayInterval={1000}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    // Initially, Slide 1 is active
    expect(screen.getByText('Slide 1')).toBeInTheDocument()

    // Advance time by more than the autoplay interval
    act(() => {
      jest.advanceTimersByTime(1100)
    })

    // After time passes, Slide 2 should be active
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('navigates to a specific slide when clicking an indicator', () => {
    renderWithProvider(
      <Carousel>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
        <Carousel.Item>Slide 3</Carousel.Item>
      </Carousel>
    )

    // Find the indicator for slide 3
    const thirdIndicator = screen.getByLabelText('Go to slide 3')
    fireEvent.click(thirdIndicator)

    // Slide 3 should now be visible
    expect(screen.getByText('Slide 3')).toBeInTheDocument()
  })

  it('supports keyboard navigation when enabled', () => {
    renderWithProvider(
      <Carousel enableKeyboardNavigation={true}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
        <Carousel.Item>Slide 3</Carousel.Item>
      </Carousel>
    )

    // Get carousel and focus it
    const carousel = screen.getByRole('region', { name: /carousel/i })
    carousel.focus()

    // Press right arrow to go to next slide
    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    expect(screen.getByText('Slide 2')).toBeInTheDocument()

    // Press right arrow again to go to slide 3
    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    expect(screen.getByText('Slide 3')).toBeInTheDocument()

    // Press left arrow to go back to slide 2
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('wraps around to the first slide when reaching the end with loop enabled', () => {
    renderWithProvider(
      <Carousel loop={true}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    // Go to slide 2
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    // Click next again, should wrap to slide 1
    fireEvent.click(nextButton)
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('stays on the last slide when reaching the end with loop disabled', () => {
    renderWithProvider(
      <Carousel loop={false}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    // Go to slide 2
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    // Click next again, should stay on slide 2
    fireEvent.click(nextButton)
    expect(screen.getByText('Slide 2')).toBeInTheDocument()
  })

  it('applies custom className to the carousel', () => {
    const { container } = renderWithProvider(
      <Carousel className="test-custom-class">
        <Carousel.Item>Slide 1</Carousel.Item>
      </Carousel>
    )

    const carouselElement = container.firstChild as HTMLElement
    expect(carouselElement.className).toContain('test-custom-class')
  })

  it('applies variant-specific styles', () => {
    const { container: defaultContainer } = renderWithProvider(
      <Carousel variant="default">
        <Carousel.Item>Default Variant</Carousel.Item>
      </Carousel>
    )

    const { container: bannerContainer } = renderWithProvider(
      <Carousel variant="banner">
        <Carousel.Item>Banner Variant</Carousel.Item>
      </Carousel>
    )

    const defaultCarousel = defaultContainer.firstChild as HTMLElement
    const bannerCarousel = bannerContainer.firstChild as HTMLElement

    expect(defaultCarousel.className).toContain('rounded-md')
    expect(bannerCarousel.className).toContain('rounded-none')
  })

  it('calls onSlideChange callback when the active slide changes', () => {
    const onSlideChangeMock = jest.fn()

    renderWithProvider(
      <Carousel onSlideChange={onSlideChangeMock}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)

    expect(onSlideChangeMock).toHaveBeenCalledWith(1)
  })

  it('correctly handles touch swipe gestures when enableSwipe is true', () => {
    renderWithProvider(
      <Carousel enableSwipe={true}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    const carousel = screen.getByRole('region', { name: /carousel/i })

    // Simulate swipe left to go to next slide
    fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 200 }] })
    fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 50 }] })
    fireEvent.touchEnd(carousel)

    expect(screen.getByText('Slide 2')).toBeInTheDocument()

    // Simulate swipe right to go back to previous slide
    fireEvent.touchStart(carousel, { targetTouches: [{ clientX: 50 }] })
    fireEvent.touchMove(carousel, { targetTouches: [{ clientX: 200 }] })
    fireEvent.touchEnd(carousel)

    expect(screen.getByText('Slide 1')).toBeInTheDocument()
  })

  it('renders using a custom renderSlide function when provided', () => {
    const customRenderSlide = jest.fn((slide, index, isActive) => (
      <div key={index} data-testid={`custom-slide-${index}`} data-active={isActive}>
        {slide}
      </div>
    ))

    renderWithProvider(
      <Carousel renderSlide={customRenderSlide}>
        <Carousel.Item>Slide 1</Carousel.Item>
        <Carousel.Item>Slide 2</Carousel.Item>
      </Carousel>
    )

    expect(customRenderSlide).toHaveBeenCalled()
    expect(screen.getByTestId('custom-slide-0')).toBeInTheDocument()
    expect(screen.getByTestId('custom-slide-0').getAttribute('data-active')).toBe('true')
    expect(screen.getByTestId('custom-slide-1')).toBeInTheDocument()
    expect(screen.getByTestId('custom-slide-1').getAttribute('data-active')).toBe('false')
  })

  it('renders CarouselItem correctly', () => {
    const { container } = renderWithProvider(
      <Carousel.Item className="test-item-class">Test Content</Carousel.Item>
    )

    const itemElement = container.firstChild as HTMLElement
    expect(itemElement.className).toContain('test-item-class')
    expect(itemElement.className).toContain('h-full w-full flex-shrink-0')
    expect(itemElement.textContent).toBe('Test Content')
  })
})