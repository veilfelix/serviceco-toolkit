import { JSX } from 'react'
import { cn } from '@/utils/classNames'

export type TextProps = {
  /**
   * The HTML tag used to render the text
   */
  as?: 'p' | 'span' | 'div'
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
 * A generic text component that uses system tokens for consistent styling.
 *
 * Applies default foreground color, and can be rendered as `p`, `span`, or `div`.
 *
 * Example:
 * ```tsx
 * <Text as="p">Some paragraph text</Text>
 * ```
 */
export default function Text({
  as: Tag = 'p',
  children,
  className,
}: TextProps): JSX.Element {
  return <Tag className={cn('text-[hsl(var(--foreground))]', className)}>{children}</Tag>
}
