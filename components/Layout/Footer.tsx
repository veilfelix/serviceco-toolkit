import React, { JSX } from 'react'

/**
 * This Footer component is a temporary placeholder to ease development by providing the app with a basic Layout
 */
export default function Footer(): JSX.Element {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-8">
      <div className="container text-center text-sm">
        © {new Date().getFullYear()} ServiceCo. All rights reserved.
      </div>
    </footer>
  )
}
