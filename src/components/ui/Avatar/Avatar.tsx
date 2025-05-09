import { HTMLAttributes, ImgHTMLAttributes, JSX, ReactNode } from 'react'
import { cn } from '@/utils/classNames'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the avatar
   */
  size?: AvatarSize
  /**
   * Shape of the avatar
   */
  shape?: 'circle' | 'square'
  /**
   * Optional border
   */
  bordered?: boolean
  /**
   * Status indicator in the bottom-right corner
   */
  status?: 'online' | 'offline' | 'away' | 'busy' | 'none'
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Children (usually AvatarImage or AvatarFallback)
   */
  children: ReactNode
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Image source URL
   */
  src: string
  /**
   * Alt text for the image
   */
  alt: string
  /**
   * Additional CSS classes
   */
  className?: string
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Fallback content (usually initials or icon)
   */
  children: ReactNode
  /**
   * Optional color scheme for the fallback
   */
  colorScheme?: 'gray' | 'primary' | 'secondary' | 'random'
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Avatar component that displays a user's profile picture, initials, or fallback icon.
 *
 * Example:
 *
 * ```tsx
 * <Avatar>
 *   <Avatar.Image src="/path/to/image.jpg" alt="User Name" />
 *   <Avatar.Fallback>UN</Avatar.Fallback>
 * </Avatar>
 * ```
 */
function Avatar({
  size = 'md',
  shape = 'circle',
  bordered = false,
  status = 'none',
  className,
  children,
  ...props
}: AvatarProps): JSX.Element {
  const sizeStyles: Record<AvatarSize, string> = {
    xs: 'h-[var(--avatar-size-xs)] w-[var(--avatar-size-xs)] text-sm',
    sm: 'h-[var(--avatar-size-sm)] w-[var(--avatar-size-sm)] text-sm',
    md: 'h-[var(--avatar-size-md)] w-[var(--avatar-size-md)] text-base',
    lg: 'h-[var(--avatar-size-lg)] w-[var(--avatar-size-lg)] text-lg',
    xl: 'h-[var(--avatar-size-xl)] w-[var(--avatar-size-xl)] text-lg',
  }

  const shapeStyles: Record<'circle' | 'square', string> = {
    circle: 'rounded-full',
    square: 'rounded-md',
  }

  const statusStyles: Record<Exclude<NonNullable<AvatarProps['status']>, 'none'>, string> = {
    online: 'bg-[hsl(var(--avatar-status-color-online))]',
    offline: 'bg-muted-foreground',
    away: 'bg-[hsl(var(--avatar-status-color-away))]',
    busy: 'bg-[hsl(var(--avatar-status-color-busy))]',
  }  

  const statusSizeStyles: Record<AvatarSize, string> = {
    xs: 'h-[var(--avatar-status-size-xs)] w-[var(--avatar-status-size-xs)]',
    sm: 'h-[var(--avatar-status-size-sm)] w-[var(--avatar-status-size-sm)]',
    md: 'h-[var(--avatar-status-size-md)] w-[var(--avatar-status-size-md)]',
    lg: 'h-[var(--avatar-status-size-lg)] w-[var(--avatar-status-size-lg)]',
    xl: 'h-[var(--avatar-status-size-xl)] w-[var(--avatar-status-size-xl)]',
  }

  return (
    <div
      className={cn(
        'relative inline-flex [flex-shrink:var(--avatar-shrink)] [overflow:var(--avatar-overflow)]',
        sizeStyles[size],
        shapeStyles[shape],
        bordered && 'ring-[var(--avatar-border-width)] ring-background',
        className
      )}
      {...props}
    >
      {children}
      
      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-[var(--avatar-status-border-radius)] ring-[var(--avatar-status-border-width)] ring-background',
            statusStyles[status],
            statusSizeStyles[size]
          )}
        />
      )}
    </div>
  )
}

/**
 * Avatar image component that displays the user's profile picture.
 */
function AvatarImage({ src, alt, className, ...props }: AvatarImageProps): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('h-[var(--avatar-image-height)] w-[var(--avatar-image-width)] object-[var(--avatar-image-fit)]', className)}
      {...props}
    />
  )
}

/**
 * Avatar fallback component that displays when the image is not available.
 */
function AvatarFallback({
  children,
  colorScheme = 'gray',
  className,
  ...props
}: AvatarFallbackProps): JSX.Element {
  const colorSchemes: Record<AvatarFallbackProps['colorScheme'] & string, string> = {
    gray: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    random: '',
  }

  // Generate a deterministic background color if colorScheme is 'random'
  let randomColorClass = ''
  if (colorScheme === 'random') {
    const randomColorOptions = [
      'bg-[hsl(var(--avatar-fallback-color-blue-bg))] text-[hsl(var(--avatar-fallback-color-blue-text))]',
      'bg-[hsl(var(--avatar-fallback-color-green-bg))] text-[hsl(var(--avatar-fallback-color-green-text))]',
      'bg-[hsl(var(--avatar-fallback-color-yellow-bg))] text-[hsl(var(--avatar-fallback-color-yellow-text))]',
      'bg-[hsl(var(--avatar-fallback-color-red-bg))] text-[hsl(var(--avatar-fallback-color-red-text))]',
    ]
  
    const hash = children?.toString().charCodeAt(0) ?? 0
    const index = Math.abs(hash) % randomColorOptions.length
    randomColorClass = randomColorOptions[index]
  }  

  return (
    <div
      className={cn(
        'flex h-[var(--avatar-fallback-height)] w-[var(--avatar-fallback-width)] items-center justify-center font-[var(--avatar-fallback-font-weight)]',
        colorScheme === 'random' ? randomColorClass : colorSchemes[colorScheme],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Attach subcomponents
Avatar.Image = AvatarImage
Avatar.Fallback = AvatarFallback

export default Avatar