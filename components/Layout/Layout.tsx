import React, { JSX } from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import SkipLink from '../a11y/SkipLink'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}