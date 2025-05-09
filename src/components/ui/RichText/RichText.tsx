import { JSX } from 'react'
import { cn } from '@/utils/classNames'

export type RichTextProps = {
  /**
   * The textual content to render
   */
  children: React.ReactNode
  /**
   * Additional class names to apply to the element
   */
  className?: string
}

/**
 * RichText applies Tailwind Typography (`prose`) to its content.
 * Use it for rendering content coming from CMS like Contentful.
 */
export default function RichText({ children, className }: RichTextProps): JSX.Element {
  return <div className={cn('prose prose-sm text-foreground max-w-none', className)}>{children}</div>
}
