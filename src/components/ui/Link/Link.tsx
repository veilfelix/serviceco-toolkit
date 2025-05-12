import { forwardRef, JSX, AnchorHTMLAttributes } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { cn } from '@/utils/classNames'
import { ExternalLink } from 'lucide-react'

export type LinkVariant = 'default' | 'primary' | 'muted' | 'destructive'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as'> {
  /**
   * The URL to navigate to
   */
  href: string
  /**
   * Optional path to be shown in the browser URL bar
   */
  as?: string
  /**
   * Link content
   */
  children: React.ReactNode
  /**
   * Visual variant for styling the link
   */
  variant?: LinkVariant
  /**
   * Force external/internal link behavior. If not specified, automatically detected.
   */
  external?: boolean
  /**
   * Whether to show an external link icon for external links
   * @default false
   */
  showExternalIcon?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * PreventDefault behavior for onClick
   */
  preventDefault?: boolean
}

/**
 * A versatile link component that automatically handles internal/external links.
 * Uses Next.js Link for internal navigation and regular anchor tags for external links.
 * Automatically applies security attributes to external links.
 *
 * Example:
 * ```tsx
 * <Link href="/about">About Us</Link>
 * <Link href="https://example.com" variant="primary">External Site</Link>
 * <Link href="https://example.com" showExternalIcon>External with Icon</Link>
 * ```
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      as,
      variant = 'default',
      children,
      external,
      showExternalIcon = false,
      className,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      onClick,
      preventDefault = false,
      ...rest
    },
    ref
  ): JSX.Element => {
    // Determine if the link is external based on the href or the explicit external prop
    const isExternal =
      external !== undefined
        ? external
        : href && (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))

    // Define variant styles
    const variantStyles: Record<LinkVariant, string> = {
      default: 'text-foreground underline hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      primary: 'text-primary underline hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      muted: 'text-muted-foreground underline hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      destructive: 'text-destructive underline hover:text-destructive/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    }

    // Base link classes
    const linkClasses = cn(
      'font-medium transition-colors',
      variantStyles[variant],
      isExternal && showExternalIcon && 'inline-flex items-center gap-1',
      className
    )

    // Handle click with optional preventDefault
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (preventDefault) {
        e.preventDefault()
      }
      onClick?.(e)
    }

    // External link - use regular anchor tag with security attributes
    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={linkClasses}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          {...rest}
        >
          {children}
          {showExternalIcon && <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
        </a>
      )
    }

    // Internal link - use Next.js Link component
    return (
      <NextLink
        href={href}
        as={as}
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        locale={locale}
        onClick={handleClick}
        className={linkClasses}
        ref={ref}
        {...rest}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = 'Link'

export default Link