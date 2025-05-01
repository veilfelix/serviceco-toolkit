import React, { JSX } from 'react'

/**
 * A visually hidden skip link for screen reader and keyboard users.
 *
 * Helps users bypass repetitive navigation by jumping straight to the main content.
 *
 * Accessibility best practices recommend this for all layout templates.
 *
 * This component is small but **critical** for accessibility (WCAG 2.1).
 *
 * In a future design system:
 * - It may be visually styled to match the brand
 * - Or kept as-is if your design system includes a11y primitives
 */
export default function SkipLink(): JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only absolute top-2 left-2 bg-white text-blue-600 p-2 rounded z-50"
    >
      Skip to main content
    </a>
  )
}
