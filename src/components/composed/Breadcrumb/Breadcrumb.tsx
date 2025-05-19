import React, { createContext, useContext, forwardRef } from 'react'
import Link from '../../ui/Link/Link'
import { cn } from '../../../utils/classNames'

// Context for breadcrumb state
const BreadcrumbContext = createContext<{
  separator: React.ReactNode
}>({
  separator: '/',
})

// Main Breadcrumb component props
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Separator element to display between breadcrumb items.
   * Accepts a string or any React node.
   * @default '/'
   */
  separator?: React.ReactNode
  /**
   * Breadcrumb items to render inside the navigation.
   * Typically composed of Breadcrumb.Item components.
   */
  children: React.ReactNode
  /**
   * Additional class names to apply to the breadcrumb container.
   */
  className?: string
}

// Breadcrumb Item props
export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  /**
   * URL to link to. If provided and `isCurrent` is false, the item will render as a clickable link.
   */
  href?: string
  /**
   * Marks the item as the current page in the breadcrumb.
   * When true, the item is not clickable and will receive `aria-current="page"`.
   * @default false
   */
  isCurrent?: boolean
  /**
   * Additional class names to apply to the breadcrumb item.
   */
  className?: string
}


// Main breadcrumb container
const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', children, className, ...props }, ref) => {
    return (
      <BreadcrumbContext.Provider value={{ separator }}>
        <nav
          ref={ref}
          aria-label="Breadcrumb"
          className={cn('flex', className)}
          {...props}
        >
          <ol className="flex flex-wrap items-center">
            {children}
          </ol>
        </nav>
      </BreadcrumbContext.Provider>
    )
  }
)

Breadcrumb.displayName = 'Breadcrumb'

// Individual breadcrumb item
const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ href, isCurrent = false, children, className, ...props }, ref) => {
    const { separator } = useContext(BreadcrumbContext)
    
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-center text-sm',
          className
        )}
        {...props}
      >
        {href && !isCurrent ? (
          <>
            <Link
              href={href}
              className="font-medium no-underline text-primary hover:text-primary/80 hover:underline focus:underline"
              aria-current={isCurrent ? 'page' : undefined}
            >
              {children}
            </Link>
            <span className="mx-2 text-foreground font-medium flex-shrink-0" aria-hidden="true">
              {separator}
            </span>
          </>
        ) : (
          <span 
            className="text-primary font-semibold"
            aria-current={isCurrent ? 'page' : undefined}
          >
            {children}
          </span>
        )}
      </li>
    )
  }
)

BreadcrumbItem.displayName = 'BreadcrumbItem'

// BreadcrumbEllipsis for truncated paths
interface BreadcrumbEllipsisProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string
}

const BreadcrumbEllipsis = forwardRef<HTMLLIElement, BreadcrumbEllipsisProps>(
  ({ className, ...props }, ref) => {
    const { separator } = useContext(BreadcrumbContext)
    
    return (
      <li
        ref={ref}
        className={cn(
          'flex items-center text-sm',
          className
        )}
        {...props}
      >
        <span className="text-foreground/70">...</span>
        <span className="mx-2 text-foreground/70 flex-shrink-0" aria-hidden="true">
          {separator}
        </span>
      </li>
    )
  }
)

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis'

// Compound component exports
export { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbEllipsis
}