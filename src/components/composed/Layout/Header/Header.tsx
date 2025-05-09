import { JSX } from 'react'
import Link from 'next/link'

/**
 * This Header component is a temporary placeholder to ease development by providing the app with a basic Layout.
 * Hence why no unit test was implemented for that component.
 */
export default function Header(): JSX.Element {
  return (
    <header className="bg-primary text-primary-foreground py-[var(--header-padding-y)]">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-xl font-[var(--header-title-font-weight)]">
          ServiceCo
        </Link>
        <nav className="space-x-[var(--header-nav-item-gap)]">
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
