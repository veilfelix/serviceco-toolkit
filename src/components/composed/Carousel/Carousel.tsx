'use client'

import { HTMLAttributes, ReactNode, TouchEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/classNames'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import VisuallyHidden from '@/components/a11y/VisuallyHidden/VisuallyHidden'
import Button from '@/components/ui/Button/Button'
import { useTranslation } from 'next-i18next'

export type CarouselVariant = 'default' | 'banner'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children to be rendered inside the carousel (typically Carousel.Item components)
   */
  children: ReactNode
  /**
   * The visual variant of the carousel
   * @default 'default'
   */
  variant?: CarouselVariant
  /**
   * Show navigation arrows
   * @default true
   */
  showArrows?: boolean
  /**
   * Show pagination indicators
   * @default true
   */
  showIndicators?: boolean
  /**
   * Enable autoplay
   * @default false
   */
  autoplay?: boolean
  /**
   * Autoplay interval in milliseconds
   * @default 5000
   */
  autoplayInterval?: number
  /**
   * Pause autoplay on hover
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * Pause autoplay when the carousel is not in viewport
   * @default true
   */
  pauseOnInvisible?: boolean
  /**
   * Enable infinite looping of slides
   * @default true
   */
  loop?: boolean
  /**
   * Enable touch/mouse drag to swipe between slides
   * @default true
   */
  enableSwipe?: boolean
  /**
   * Enable keyboard navigation
   * @default true
   */
  enableKeyboardNavigation?: boolean
  /**
   * Optional callback when active slide changes
   */
  onSlideChange?: (index: number) => void
  /**
   * Optional function to render a custom slide
   */
  renderSlide?: (item: ReactNode, index: number, isActive: boolean) => ReactNode
  /**
   * Additional class names to apply to the carousel
   */
  className?: string
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to be displayed within the carousel item
   */
  children: ReactNode
  /**
   * Additional class names to apply to the carousel item
   */
  className?: string
}

/**
 * A flexible, accessible carousel component for displaying images, banners, cards, or any content.
 * 
 * Features:
 * - Keyboard accessible navigation
 * - Touch swipe support
 * - Autoplay with pause controls
 * - Pagination indicators
 * - Responsive behavior
 * 
 * Example:
 * 
 * ```tsx
 * <Carousel autoplay>
 *   <Carousel.Item>Slide 1</Carousel.Item>
 *   <Carousel.Item>Slide 2</Carousel.Item>
 *   <Carousel.Item>Slide 3</Carousel.Item>
 * </Carousel>
 * ```
 */
function Carousel({
  children,
  variant = 'default',
  showArrows = true,
  showIndicators = true,
  autoplay = false,
  autoplayInterval = 5000,
  pauseOnHover = true,
  pauseOnInvisible = true,
  loop = true,
  enableSwipe = true,
  enableKeyboardNavigation = true,
  onSlideChange,
  renderSlide,
  className,
  ...props
}: CarouselProps) {
  const { t } = useTranslation('composed')
  const slides = Array.isArray(children) ? children : [children]
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Determine if arrows should be shown based on props and viewport
  const showArrowControls = showArrows && (isMobile ? false : true)

  // Navigate to a specific slide
  const goToSlide = useCallback((index: number) => {
    let nextIndex = index
    
    // Handle loop wrapping
    if (index < 0) {
      nextIndex = loop ? slides.length - 1 : 0
    } else if (index >= slides.length) {
      nextIndex = loop ? 0 : slides.length - 1
    }
    
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex)
      onSlideChange?.(nextIndex)
    }
  }, [activeIndex, loop, onSlideChange, slides.length])

  // Navigate to the previous slide
  const goToPrevious = useCallback(() => {
    goToSlide(activeIndex - 1)
  }, [activeIndex, goToSlide])

  // Navigate to the next slide
  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1)
  }, [activeIndex, goToSlide])

  // Setup autoplay
  useEffect(() => {
    if (autoplay && !isPaused) {
      intervalRef.current = setInterval(() => {
        goToNext()
      }, autoplayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoplay, autoplayInterval, goToNext, isPaused])

  // Pause autoplay when not visible in the viewport
  useEffect(() => {
    if (!pauseOnInvisible || !autoplay) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    if (carouselRef.current) {
      observer.observe(carouselRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [autoplay, pauseOnInvisible])

  // Handle keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current || 
          carouselRef.current?.contains(document.activeElement)) {
        switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNext()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(slides.length - 1)
          break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [enableKeyboardNavigation, goToNext, goToPrevious, goToSlide, slides.length])

  // Touch event handlers for swipe support
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!enableSwipe) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!enableSwipe) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!enableSwipe || touchStart === null || touchEnd === null) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Mouse event handlers for pause on hover
  const handleMouseEnter = () => {
    if (pauseOnHover && autoplay) {
      setIsPaused(true)
    }
  }

  const handleMouseLeave = () => {
    if (pauseOnHover && autoplay) {
      setIsPaused(false)
    }
  }

  // Apply variant-specific styles
  const variantStyles: Record<CarouselVariant, string> = {
    default: 'rounded-md',
    banner: 'rounded-none'
  }

  return (
    <div
      ref={carouselRef}
      role={(enableKeyboardNavigation || enableSwipe) ? 'region' : undefined}
      aria-label={(enableKeyboardNavigation || enableSwipe) ? t('carousel.label') : undefined}
      tabIndex={(enableKeyboardNavigation || enableSwipe) ? 0 : undefined}
      className={cn(
        'relative w-full overflow-hidden',
        variantStyles[variant],
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-roledescription={t('carousel.roledescription')}
      {...props}
    >
      <div className="relative h-full w-full">
        {/* Slides container */}
        <div 
          className="flex h-full transition-transform duration-[var(--carousel-slide-transition-duration)] ease-[var(--carousel-slide-transition-timing)]"
          style={{ 
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex
            
            return renderSlide ? (
              renderSlide(slide, index, isActive)
            ) : (
              <div
                key={index}
                className="min-w-full flex-shrink-0 flex-grow-0"
                aria-roledescription={t('carousel.slide')}
                aria-label={t('carousel.slidePosition', { current: index + 1, total: slides.length })}
                aria-hidden={!isActive}
              >
                {slide}
              </div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        {showArrowControls && slides.length > 1 && (
          <>
            <Button
              className="absolute left-4 top-1/2 h-[var(--carousel-control-size)] w-[var(--carousel-control-size)] -translate-y-1/2 rounded-full bg-carousel-control-bg p-0 text-carousel-control-color hover:bg-carousel-control-hover-bg"
              onClick={goToPrevious}
              aria-label={t('carousel.previousSlide')}
            >
              <ChevronLeft />
            </Button>
            <Button
              className="absolute right-4 top-1/2 h-[var(--carousel-control-size)] w-[var(--carousel-control-size)] -translate-y-1/2 rounded-full bg-carousel-control-bg p-0 text-carousel-control-color hover:bg-carousel-control-hover-bg"
              onClick={goToNext}
              aria-label={t('carousel.nextSlide')}
            >
              <ChevronRight />
            </Button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-[var(--carousel-indicator-gap)]">
            {slides.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-[var(--carousel-indicator-size)] w-[var(--carousel-indicator-size)] rounded-full transition-all duration-200',
                  index === activeIndex
                    ? 'bg-carousel-indicator-active-color h-[var(--carousel-indicator-active-size)] w-[var(--carousel-indicator-active-size)]'
                    : 'bg-carousel-indicator-color'
                )}
                onClick={() => goToSlide(index)}
                aria-label={t('carousel.goToSlide', { number: index + 1 })}
                aria-current={index === activeIndex}
              >
                <VisuallyHidden>
                  {index === activeIndex
                    ? t('carousel.slideCurrentPosition', { number: index + 1 })
                    : t('carousel.slideNumber', { number: index + 1 })}
                </VisuallyHidden>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CarouselItem({ children, className, ...props }: CarouselItemProps) {
  return (
    <div 
      className={cn('h-full w-full flex-shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Attach Item component to Carousel
Carousel.Item = CarouselItem

export default Carousel