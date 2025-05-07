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
    xs: 'h-6 w-6 text-[var(--font-sm)]',
    sm: 'h-8 w-8 text-[var(--font-sm)]',
    md: 'h-10 w-10 text-[var(--font-base)]',
    lg: 'h-12 w-12 text-[var(--font-lg)]',
    xl: 'h-16 w-16 text-[var(--font-lg)]',
  }

  const shapeStyles: Record<'circle' | 'square', string> = {
    circle: 'rounded-full',
    square: 'rounded-[var(--radius-md)]',
  }

  const statusStyles: Record<Exclude<NonNullable<AvatarProps['status']>, 'none'>, string> = {
    online: 'bg-green-500',
    offline: 'bg-[hsl(var(--muted-foreground))]',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  }  

  const getStatusSize = () => {
    switch (size) {
    case 'xs':
      return 'h-1.5 w-1.5'
    case 'sm':
      return 'h-2 w-2'
    case 'md':
      return 'h-2.5 w-2.5'
    case 'lg':
      return 'h-3 w-3'
    case 'xl':
      return 'h-4 w-4'
    default:
      return 'h-2.5 w-2.5'
    }
  }

  return (
    <div
      className={cn(
        'relative inline-flex shrink-0 overflow-hidden',
        sizeStyles[size],
        shapeStyles[shape],
        bordered && 'ring-2 ring-[hsl(var(--background))]',
        className
      )}
      {...props}
    >
      {children}
      
      {status !== 'none' && (
        <span
          className={cn(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-[hsl(var(--background))]',
            statusStyles[status],
            getStatusSize()
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
      className={cn('h-full w-full object-cover', className)}
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
    gray: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]',
    primary: 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]',
    secondary: 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]',
    random: '',
  }

  // Generate a deterministic background color if colorScheme is 'random'
  let randomColorClass = ''
  if (colorScheme === 'random') {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
    ]
    
    // Use a simple hash of the children string to pick a color
    let hash = 0
    const childrenStr = children?.toString() || ''
    for (let i = 0; i < childrenStr.length; i++) {
      hash = childrenStr.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    const colorIndex = Math.abs(hash) % colors.length
    randomColorClass = colors[colorIndex]
  }

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center font-medium',
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