import { forwardRef, JSX, useCallback, useState } from 'react'
import NextImage, { ImageLoaderProps, ImageProps as NextImageProps } from 'next/image'
import { cn } from '@/utils/classNames'
import { ImageOff } from 'lucide-react'

// Common aspect ratios
export type ImageRatio = '1:1' | '4:3' | '16:9' | '21:9' | '2:3' | '3:2'

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none'

export type ImageVariant = 'default' | 'rounded' | 'bordered'

export interface ImageProps
  extends Omit<NextImageProps, 'width' | 'height' | 'alt' | 'loader' | 'placeholder'> {
  /**
   * Image source URL (required)
   */
  src: string
  /**
   * Accessible alt text (required)
   */
  alt: string
  /**
   * Sizing and layout options
   */
  width?: number
  /**
   * Sizing and layout options
   */
  height?: number
  /**
   * Apply aspect ratio instead of explicit dimensions (overrides width/height)
   */
  ratio?: ImageRatio
  /**
   * How the image is sized within its container
   * @default 'cover'
   */
  objectFit?: ImageFit
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: ImageVariant
  /**
   * Optional blur data URL for placeholder
   * When provided, placeholder="blur" will be automatically set
   */
  blurDataURL?: string
  /**
   * Optional custom fallback component when image fails to load
   */
  fallback?: React.ReactNode
  /**
   * Optional classname for the image wrapper
   */
  wrapperClassName?: string
  /**
   * Priority loading for LCP images
   * @default false
   */
  priority?: boolean
  /**
   * Optional custom loader function
   */
  customLoader?: (props: ImageLoaderProps) => string
}

/**
 * A responsive and accessible wrapper around Next.js <Image>, with design system integration.
 *
 * Features:
 * - Enforced `alt` attribute for accessibility
 * - Support for aspect ratios via padding trick (optional)
 * - Visual variants (default, rounded, bordered)
 * - Error fallback (custom or default)
 * - Automatic handling of blur placeholders via `blurDataURL`
 *   (Note: `placeholder="blur"` is set automatically when `blurDataURL` is provided)
 *
 * Example usage:
 * ```tsx
 * <Image
 *   src="/path/to/image.jpg"
 *   alt="Description of the image"
 *   ratio="16:9"
 *   variant="rounded"
 *   className="w-full"
 * />
 * ```
 *
 * See docs/blur-placeholders.md for guidance on how to use blurDataURLs effectively.
 */

const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      ratio,
      objectFit = 'cover',
      variant = 'default',
      blurDataURL,
      fallback,
      wrapperClassName,
      className,
      priority = false,
      customLoader,
      ...rest
    },
    ref
  ): JSX.Element => {
    const [hasError, setHasError] = useState(false)

    // Calculate padding based on aspect ratio
    const getPaddingTop = useCallback(() => {
      if (!ratio) return undefined

      const [numerator, denominator] = ratio.split(':').map(Number)
      const percentage = (denominator / numerator) * 100
      return `${percentage}%`
    }, [ratio])

    // Variant styling
    const variantStyles: Record<ImageVariant, string> = {
      default: '',
      rounded: 'rounded-md overflow-hidden',
      bordered: 'border border-border rounded-md overflow-hidden',
    }

    // Object fit styling
    const fitStyles: Record<ImageFit, string> = {
      fill: 'object-fill',
      contain: 'object-contain',
      cover: 'object-cover',
      none: 'object-none',
    }

    // Error handler for image load failures
    const handleError = () => {
      setHasError(true)
    }

    // Default fallback content if none provided
    const defaultFallback = (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <ImageOff className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">{alt} (image failed to load)</span>
      </div>
    )

    // For ratio-based sizing, we use a wrapper with padding trick
    if (ratio) {
      return (
        <div
          ref={ref}
          className={cn('relative w-full', variantStyles[variant], wrapperClassName)}
          style={{ paddingTop: getPaddingTop() }}
        >
          {hasError ? (
            fallback || defaultFallback
          ) : (
            <NextImage
              src={src}
              alt={alt}
              fill
              className={cn(fitStyles[objectFit], className)}
              placeholder={blurDataURL ? 'blur' : undefined}
              blurDataURL={blurDataURL}
              priority={priority}
              onError={handleError}
              loader={customLoader}
              {...rest}
            />
          )}
        </div>
      )
    }

    // For explicitly sized images without ratio
    return (
      <div
        ref={ref}
        className={cn('relative', variantStyles[variant], wrapperClassName)}
        style={{
          width: width ? `${width}px` : 'auto',
          height: height ? `${height}px` : 'auto',
        }}
      >
        {hasError ? (
          fallback || defaultFallback
        ) : (
          <NextImage
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(fitStyles[objectFit], 'h-full w-full', className)}
            placeholder={blurDataURL ? 'blur' : undefined}
            blurDataURL={blurDataURL}
            priority={priority}
            onError={handleError}
            loader={customLoader}
            {...rest}
          />
        )}
      </div>
    )
  }
)

Image.displayName = 'Image'

export default Image