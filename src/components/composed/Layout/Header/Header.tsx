import { JSX } from 'react'
import Link from 'next/link'

/**
 * This Header component is a temporary placeholder to ease development by providing the app with a basic Layout.
 * Hence why no unit test was implemented for that component.
 */
export default function Header(): JSX.Element {
  return (
    <header className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-4">
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-[var(--font-xl)] font-bold">
          ServiceCo
        </Link>
        <nav className="space-x-4">
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
