import Link from 'next/link'

/**
 * Custom 404 Page (Not Found).
 *
 * Displayed automatically by Next.js for any route that doesn't match a valid page.
 *
 * This component improves UX and SEO by providing a branded "not found" experience.
 *
 * Can be styled to reflect your product tone or guide users toward recovery actions.
 */
export default function Custom404() {
  return (
    <div className="container text-center py-16">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Oops! The page you are looking for doesn&apos;t exist.</p>
      <Link href="/" className="text-blue-600 underline">
        Back to home page
      </Link>
    </div>
  )
}
