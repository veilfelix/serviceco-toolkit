import React, { JSX } from 'react'
import { cn } from '@/utils/classNames'

type TextProps = {
  as?: 'p' | 'span' | 'div'
  children: React.ReactNode
  className?: string
}

/**
 * Text is a lightweight wrapper for paragraph-like content, styled with Tailwind’s `prose` utility.
 *
 * It ensures consistent spacing, font size, and readable line lengths for body content.
 *
 * If a design system is introduced later:
 * - This can be replaced or wrapped with a standard `Text` component
 * - Or kept for use in markdown/contentful-rendered pages
 */
export default function Text({ as: Tag = 'p', children, className }: TextProps): JSX.Element {
  return <Tag className={cn('prose prose-sm text-foreground', className)}>{children}</Tag>
}
