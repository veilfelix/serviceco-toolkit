import { JSX } from 'react'
import { cn } from '@/utils/classNames'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
  className?: string
}

/**
 * This heading component is a basic typographic component used to render semantic HTML headings (h1–h6).
 *
 * This lightweight version is meant as a foundation. Once a design system like ShadCN or Tailwind UI is adopted,
 * we may choose to:
 * - Replace this with a system-provided `<Heading />` component
 * - OR wrap their component to preserve consistent sizing and spacing
 * - OR keep this for simple use-cases and markdown content rendering
 *
 * For now, this helps enforce consistent heading sizes and tag usage across the app.
 */
export default function Heading({ as: Tag = 'h2', children, className }: HeadingProps): JSX.Element {
  const base = 'font-bold text-foreground'
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
