/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from '@testing-library/react'
import Image from './Image'
import { mockBlurData } from '@/utils/imageUtils'

// Mock next/image
jest.mock('next/image', () => {
  const NextImageMock = ({
    src,
    alt,
    className,
    width,
    height,
    fill,
    priority,
    onError,
    blurDataURL,
    ...rest
  }: {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
    fill?: boolean
    priority?: boolean
    blurDataURL?: string
    onError?: () => void
    [key: string]: unknown
  }) => {
    return (
      <img
        src={src as string}
        alt={alt}
        className={className}
        width={width}
        height={height}
        data-testid="next-image"
        data-fill={fill ? 'true' : undefined}
        data-priority={priority ? 'true' : undefined}
        data-blur={blurDataURL || undefined}
        {...rest}
        onClick={() => {
          if (onError) onError()
        }}
      />
    )
  }
  NextImageMock.displayName = 'NextImage'
  return NextImageMock
})


describe('Image', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
  }

  it('renders correctly with required props', () => {
    render(<Image {...defaultProps} />)
    const image = screen.getByTestId('next-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('uses explicit width and height when provided', () => {
    render(<Image {...defaultProps} width={200} height={150} />)
    const wrapper = screen.getByTestId('next-image').parentElement
    expect(wrapper).toHaveStyle('width: 200px')
    expect(wrapper).toHaveStyle('height: 150px')
  })

  it('applies correct styles for object-fit prop', () => {
    const { rerender } = render(<Image {...defaultProps} objectFit="contain" />)
    let image = screen.getByTestId('next-image')
    expect(image.className).toContain('object-contain')

    rerender(<Image {...defaultProps} objectFit="cover" />)
    image = screen.getByTestId('next-image')
    expect(image.className).toContain('object-cover')
  })

  it('applies correct styles for variant prop', () => {
    const { rerender } = render(<Image {...defaultProps} variant="rounded" />)
    let wrapper = screen.getByTestId('next-image').parentElement
    expect(wrapper?.className).toContain('rounded-md')

    rerender(<Image {...defaultProps} variant="bordered" />)
    wrapper = screen.getByTestId('next-image').parentElement
    expect(wrapper?.className).toContain('border-border')
  })

  it('calculates correct padding for aspect ratio', () => {
    const { rerender } = render(<Image {...defaultProps} ratio="16:9" />)
    let wrapper = screen.getByTestId('next-image').parentElement?.parentElement
    expect(wrapper).toHaveStyle('padding-bottom: 56.25%')

    rerender(<Image {...defaultProps} ratio="4:3" />)
    wrapper = screen.getByTestId('next-image').parentElement?.parentElement
    expect(wrapper).toHaveStyle('padding-bottom: 75%')

    rerender(<Image {...defaultProps} ratio="1:1" />)
    wrapper = screen.getByTestId('next-image').parentElement?.parentElement
    expect(wrapper).toHaveStyle('padding-bottom: 100%')
  })

  it('uses fill mode when ratio is provided', () => {
    render(<Image {...defaultProps} ratio="16:9" />)
    const image = screen.getByTestId('next-image')
    expect(image.getAttribute('data-fill')).toBe('true')
  })

  it('shows fallback when image fails to load', () => {
    render(<Image {...defaultProps} />)
    const image = screen.getByTestId('next-image')
    fireEvent.click(image)
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument()
    expect(screen.getByText((content) => content.includes('image failed to load'))).toBeInTheDocument()
  })

  it('shows custom fallback when provided and image fails to load', () => {
    render(
      <Image
        {...defaultProps}
        fallback={<div data-testid="custom-fallback">Custom fallback</div>}
      />
    )
    const image = screen.getByTestId('next-image')
    fireEvent.click(image)
    expect(screen.queryByTestId('next-image')).not.toBeInTheDocument()
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
  })

  it('applies custom className to the image', () => {
    render(<Image {...defaultProps} className="custom-class" />)
    const image = screen.getByTestId('next-image')
    expect(image.className).toContain('custom-class')
  })

  it('applies custom wrapperClassName to the wrapper div', () => {
    render(<Image {...defaultProps} wrapperClassName="wrapper-class" />)
    const wrapper = screen.getByTestId('next-image').parentElement
    expect(wrapper?.className).toContain('wrapper-class')
  })

  it('forwards props to Next.js Image', () => {
    render(<Image {...defaultProps} />)
    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('src', '/test-image.jpg')
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('automatically applies blur placeholder when blurDataURL is provided', () => {
    render(
      <Image
        {...defaultProps}
        blurDataURL={mockBlurData.landscape}
      />
    )
    const image = screen.getByTestId('next-image')
    expect(image).toHaveAttribute('placeholder', 'blur')
    expect(image.getAttribute('data-blur')).toBe(mockBlurData.landscape)
  })
})
