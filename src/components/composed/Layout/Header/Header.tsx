import Link from '@/components/ui/Link/Link'
import { cn } from '@/utils/classNames'
import { JSX } from 'react'

/**
 * This Header component is a temporary placeholder to ease development by providing the app with a basic Layout.
 * Hence why no unit test was implemented for that component.
 */
export default function Header(): JSX.Element {
  const HeaderLinkClasses = 'text-primary-foreground hover:text-primary-foreground/80'
  return (
    <header className="bg-primary text-primary-foreground py-[var(--header-padding-y)]">
      <div className="container flex justify-between items-center">
        <Link href="/"
          className={cn(
            'text-xl font-[700]',
            HeaderLinkClasses
          )}
        >
          ServiceCo
        </Link>
        <nav className="space-x-[var(--header-nav-item-gap)]">
          <Link href="/services" className={HeaderLinkClasses}>Services</Link>
          <Link href="/blog" className={HeaderLinkClasses}>Blog</Link>
          <Link href="/contact" className={HeaderLinkClasses}>Contact</Link>
        </nav>
      </div>
    </header>
  )
}
