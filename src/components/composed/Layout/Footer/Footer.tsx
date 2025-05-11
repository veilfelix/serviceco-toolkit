import { JSX } from 'react'

/**
 * This Footer component is a temporary placeholder to ease development by providing the app with a basic Layout.
 * Hence why no unit test was implemented for that component.
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-muted text-muted-foreground py-4 mt-8">
      <div className="container text-center text-sm">
        © {new Date().getFullYear()} ServiceCo. All rights reserved.
      </div>
    </footer>
  )
}
