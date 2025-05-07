import { JSX } from 'react'
import { cn } from '@/utils/classNames'

export type HeadingProps = {
  /**
   * The semantic tag to use for the heading (h1–h6)
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * Heading content
   */
  children: React.ReactNode
  /**
   * Additional class names
   */
  className?: string
}

/**
 * A semantic and styled heading component (h1–h6).
 *
 * Automatically applies consistent typography tokens via TailwindCSS.
 *
 * Example:
 * 
 * ```tsx
 * <Heading as="h2">Section title</Heading>
 * ```
 */
export default function Heading({
  as: Tag = 'h2',
  children,
  className,
}: HeadingProps): JSX.Element {
  const base = 'font-bold text-[hsl(var(--foreground))]'
  const sizes = {
    h1: 'text-4xl md:text-5xl',
    h2: 'text-3xl md:text-4xl',
    h3: 'text-2xl md:text-3xl',
    h4: 'text-xl md:text-2xl',
    h5: 'text-lg md:text-xl',
    h6: 'text-base md:text-lg',
  }

  return <Tag className={cn(base, sizes[Tag], className)}>{children}</Tag>
}
