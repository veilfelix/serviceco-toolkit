import { ButtonSize, ButtonVariant, getButtonClassNames } from '@/utils/getButtonClassNames'
import { AnchorHTMLAttributes, JSX } from 'react'

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link content
   */
  children: React.ReactNode
  /**
   * Visual variant
   */
  variant?: ButtonVariant
  /**
   * Visual size
   */
  size?: ButtonSize
  /**
   * Whether the link is disabled visually and functionally
   */
  disabled?: boolean
  /**
   * Extra Tailwind CSS classes
   */
  className?: string
}

/**
 * A styled `<a>` element with button appearance and variants.
 * Maintains full a11y and keyboard navigation support.
 *
 * Example:
 *
 * ```tsx
 * <ButtonLink href="/about" variant="secondary" size="lg">
 *   Learn more
 * </ButtonLink>
 * ```
 */
export default function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  ...rest
}: ButtonLinkProps): JSX.Element {
  const buttonClasses = getButtonClassNames({ variant, size, disabled, className })

  return (
    <a
      className={buttonClasses}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          e.stopPropagation()
        } else {
          onClick?.(e)
        }
      }}
      {...rest} // ✅ n’inclut plus `onClick`
    >
      {children}
    </a>
  )
}
