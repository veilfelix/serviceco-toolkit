'use client'

import {
  HTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
} from 'react'
import { cn } from '@/utils/classNames'
import Button from '@/components/ui/Button/Button'
import Link from '@/components/ui/Link/Link'
import Separator from '@/components/ui/Separator/Separator'
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export type SidebarPosition = 'left' | 'right'
export type SidebarSize = 'sm' | 'md' | 'lg'
export type SidebarDisplay = 'expanded' | 'collapsed' | 'auto'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to be displayed inside the sidebar
   */
  children: ReactNode
  /**
   * Whether the sidebar is collapsible
   * @default true
   */
  collapsible?: boolean
  /**
   * Initial display state of the sidebar
   * @default 'expanded'
   */
  defaultDisplay?: SidebarDisplay
  /**
   * Whether the sidebar should transform into a drawer on mobile
   * @default true
   */
  responsive?: boolean
  /**
   * Position of the sidebar
   * @default 'left'
   */
  position?: SidebarPosition
  /**
   * Whether to show a border on the sidebar
   * @default true
   */
  border?: boolean
  /**
   * Additional CSS class for the sidebar
   */
  className?: string
  /**
   * Whether the Mobile version is expanded or not
   */
  isMobileOpen?: boolean
  /**
   * Function to expand/collapse Mobile version
   */
  onMobileToggle?: () => void
}

/**
 * The `Sidebar` component provides a structured layout for navigation in application interfaces.
 * It supports optional headers, content sections, and footers, and adapts responsively to different screen sizes.
 *
 * On desktop, the sidebar can be **collapsible** or **fixed**, depending on the `collapsible` prop.
 * On mobile, if the `responsive` prop is enabled (default), the sidebar behaves like a **drawer** that can be toggled open or closed.
 * 
 * To control the mobile sidebar, pair it with the `Sidebar.MobileTrigger` component, which allows users to open or close the drawer.
 * You must manage the state manually using the `isMobileOpen` and `onMobileToggle` props.
 *
 * @example
 * 
 * ```tsx
 * const [mobileOpen, setMobileOpen] = useState(false);
 * const toggleMobile = () => setMobileOpen((prev) => !prev);
 * 
 * return (
 *   <>
 *     <Sidebar.MobileTrigger
 *       isOpen={mobileOpen}
 *       toggle={toggleMobile}
 *       className="fixed top-4 left-4 z-40"
 *     />
 *     <Sidebar
 *       isMobileOpen={mobileOpen}
 *       onMobileToggle={toggleMobile}
 *     >
 *       <Sidebar.Header>
 *         <Logo />
 *       </Sidebar.Header>
 *       <Sidebar.Content>
 *         <Sidebar.Section title="Main">
 *           <Sidebar.Item href="/" icon={<Home />} active>
 *             Dashboard
 *           </Sidebar.Item>
 *           <Sidebar.Item href="/users" icon={<Users />}>
 *             Users
 *           </Sidebar.Item>
 *         </Sidebar.Section>
 *       </Sidebar.Content>
 *       <Sidebar.Footer>
 *         <UserProfile />
 *       </Sidebar.Footer>
 *     </Sidebar>
 *   </>
 * );
 * ```
 */
const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      collapsible = true,
      defaultDisplay = 'expanded',
      responsive = true,
      position = 'left',
      border = true,
      className,
      ...props
    },
    ref
  ) => {
    const [display, setDisplay] = useState<'expanded' | 'collapsed'>(
      defaultDisplay === 'auto' || defaultDisplay === 'expanded' ? 'expanded' : 'collapsed'
    )
    const isControlled = typeof props.isMobileOpen === 'boolean'
    const [internalMobileOpen, setInternalMobileOpen] = useState(false)
    const mobileOpen = isControlled ? props.isMobileOpen : internalMobileOpen
    const isMobile = useMediaQuery('(max-width: 767px)')

    const toggleCollapsed = useCallback(() => {
      setDisplay((prev) => (prev === 'expanded' ? 'collapsed' : 'expanded'))
    }, [])

    const toggleMobileDrawer = useCallback(() => {
      if (isControlled) {
        props.onMobileToggle?.()
      } else {
        setInternalMobileOpen((prev) => !prev)
      }
    }, [isControlled, props])


    // If responsive is enabled and screen is mobile, render a drawer button
    // Otherwise, render the standard sidebar
    if (responsive && isMobile) {
      return (
        <>
          {/* Mobile drawer version */}
          <div
            className={cn(
              'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
              mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
            onClick={toggleMobileDrawer}
            aria-hidden="true"
          />

          <aside
            ref={ref as React.RefObject<HTMLDivElement>}
            className={cn(
              'fixed top-0 bottom-0 z-[var(--sidebar-z-index)] w-[var(--sidebar-width)] max-w-[90vw]',
              'bg-sidebar-background text-sidebar-foreground',
              'flex flex-col overflow-y-auto',
              'transition-transform duration-[var(--sidebar-transition-duration)]',
              'shadow-[var(--sidebar-shadow)]',
              border && 'border-r border-border',
              position === 'left'
                ? 'left-0 transform'
                : 'right-0 transform',
              position === 'left'
                ? mobileOpen
                  ? 'translate-x-0'
                  : '-translate-x-full'
                : mobileOpen
                  ? 'translate-x-0'
                  : 'translate-x-full',
              className
            )}
            {...props}
          >
            <div className="absolute right-4 top-4">
              <Button
                onClick={toggleMobileDrawer}
                aria-label="Close sidebar"
                variant="ghost"
                size="sm"
              >
                <X size={24} />
              </Button>
            </div>
            <div className="p-[var(--sidebar-padding-y)] pl-[var(--sidebar-padding-x)] pr-[calc(var(--sidebar-padding-x)+2.5rem)]">
              {children}
            </div>
          </aside>
        </>
      )
    }

    // Standard desktop sidebar
    return (
      <aside
        ref={ref as React.RefObject<HTMLDivElement>}
        className={cn(
          'relative z-[var(--sidebar-z-index)] h-full',
          'flex flex-col',
          'bg-sidebar-background text-sidebar-foreground',
          'transition-all duration-[var(--sidebar-transition-duration)]',
          border && position === 'left' && 'border-r border-border',
          border && position === 'right' && 'border-l border-border',
          display === 'expanded'
            ? 'w-[var(--sidebar-width)] overflow-y-auto'
            : 'w-[var(--sidebar-collapsed-width)] overflow-hidden',
          className 
        )}
        {...props}
      >
        {collapsible && (
          <Button
            onClick={toggleCollapsed}
            aria-label={display === 'expanded' ? 'Collapse sidebar' : 'Expand sidebar'}
            variant="ghost"
            size="sm"
            className={cn(
              'absolute top-4 transition-all duration-[var(--sidebar-transition-duration)]',
              position === 'left'
                ? display === 'expanded'
                  ? 'right-4'
                  : 'left-1/2 -translate-x-1/2'
                : display === 'expanded'
                  ? 'left-4'
                  : 'left-1/2 -translate-x-1/2'
            )}
          >
            {position === 'left' ? (
              display === 'expanded' ? (
                <ChevronLeft size={18} />
              ) : (
                <ChevronRight size={18} />
              )
            ) : display === 'expanded' ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </Button>
        )}
        
        <div
          className={cn(
            'flex-1',
            display === 'expanded'
              ? 'px-[var(--sidebar-padding-x)] pt-[var(--sidebar-padding-y)] pb-[var(--sidebar-padding-y)]'
              : 'p-1.5',
            collapsible && 'pt-[var(--button-sm-offset)]'
          )}
        >
          {children}
        </div>
      </aside>
    )
  }
)

Sidebar.displayName = 'Sidebar'

export interface SidebarMobileTriggerProps {
  isOpen: boolean
  toggle: () => void
  className?: string
}

const SidebarMobileTrigger = ({ isOpen, toggle, className }: SidebarMobileTriggerProps) => {
  return (
    <Button
      onClick={toggle}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      variant="ghost"
      size="sm"
      className={cn('lg:hidden', className)}
    >
      <Menu size={24} />
    </Button>
  )
}

SidebarMobileTrigger.displayName = 'Sidebar.MobileTrigger'


export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the header
   */
  children: ReactNode
  /**
   * Additional CSS class for the header
   */
  className?: string
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'h-[var(--sidebar-header-height)] mb-4 flex items-center',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarHeader.displayName = 'Sidebar.Header'

export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The content to display (typically sections and items)
   */
  children: ReactNode
  
  /**
   * Additional CSS class for content
   */
  className?: string
}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1 flex flex-col gap-[var(--sidebar-gap)]', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SidebarContent.displayName = 'Sidebar.Content'

export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the section
   */
  title?: string
  /**
   * Children items or content
   */
  children: ReactNode
  /**
   * Additional CSS class for section
   */
  className?: string
}

const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ title, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col', className)}
        {...props}
      >
        {title && (
          <div className="py-[var(--sidebar-section-padding-y)]">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider px-[var(--sidebar-item-padding-x)]">
              {title}
            </h3>
          </div>
        )}
        <div className="flex flex-col gap-[var(--sidebar-gap)]">
          {children}
        </div>
      </div>
    )
  }
)

SidebarSection.displayName = 'Sidebar.Section'

export interface SidebarItemBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The href for the item (converts it to a Link)
   */
  href?: string
  /**
   * Icon to display at the start of the item
   */
  icon?: ReactNode
  /**
   * The label text for the item
   */
  children: ReactNode
  /**
   * Whether the item is currently active
   * @default false
   */
  active?: boolean
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Additional CSS class for item
   */
  className?: string
  /**
   * Callback when the item is clicked
   */
  onClick?: () => void
  /**
   * External link
   * @default false
   */
  external?: boolean
}

type SidebarItemLinkProps = SidebarItemBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type SidebarItemDivProps = SidebarItemBaseProps &
  HTMLAttributes<HTMLDivElement> & {
    href?: undefined
  }

type SidebarItemProps = (SidebarItemLinkProps | SidebarItemDivProps) & {
  [key: `data-${string}`]: string | undefined
}

const SidebarItem = forwardRef<HTMLElement, SidebarItemProps>(
  (
    {
      href,
      icon,
      children,
      active = false,
      disabled = false,
      className,
      onClick,
      external = false,
      ...props
    },
    ref
  ) => {
    // const testId = (props as Record<string, unknown>)['data-testid'] as string | undefined
    const { ['data-testid']: testId, ...rest } = props
    const content = (
      <div
        data-testid={!href && testId}
        className={cn(
          'flex items-center gap-[var(--sidebar-item-gap)] h-[var(--sidebar-item-height)] px-[var(--sidebar-item-padding-x)] py-[var(--sidebar-item-padding-y)]',
          'rounded-[var(--sidebar-item-radius)] cursor-pointer',
          'transition-colors duration-200',
          'text-sidebar-item-color',
          active
            ? 'bg-sidebar-item-active text-sidebar-item-active-text'
            : 'hover:bg-sidebar-item-hover',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        onClick={disabled ? undefined : onClick}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="truncate">{children}</span>
      </div>
    )

    if (href) {
      return (
        <Link
          data-testid={testId}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className="no-underline text-current"
          external={external}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      )
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        {...(rest as HTMLAttributes<HTMLDivElement>)}
      >
        {content}
      </div>
    )
  }
)


SidebarItem.displayName = 'Sidebar.Item'

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Content of the footer
   */
  children: ReactNode
  /**
   * Whether to show a separator above the footer
   * @default true
   */
  withSeparator?: boolean
  /**
   * Additional CSS class for footer
   */
  className?: string
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, withSeparator = true, className, ...props }, ref) => {
    return (
      <>
        {withSeparator && <Separator />}
        <div
          ref={ref}
          className={cn('min-h-[var(--sidebar-footer-height)] mt-auto py-4 flex items-center', className)}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)

SidebarFooter.displayName = 'Sidebar.Footer'

const CompoundSidebar = Object.assign(Sidebar, {
  Header: SidebarHeader,
  Content: SidebarContent,
  Section: SidebarSection,
  Item: SidebarItem,
  Footer: SidebarFooter,
  MobileTrigger: SidebarMobileTrigger,
})

export default CompoundSidebar