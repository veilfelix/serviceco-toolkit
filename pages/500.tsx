import Link from 'next/link'

/**
 * Custom 500 Page (Internal Server Error).
 *
 * Displayed automatically by Next.js when an unexpected server error occurs.
 *
 * Provides a fallback UI in production, preventing blank or cryptic error screens.
 *
 * You can enhance this to capture errors with a service like Sentry, Datadog, etc.
 */
export default function Custom500() {
  return (
    <div className="container text-center py-16">
      <h1 className="text-5xl font-bold mb-4">500 - Server Error</h1>
      <p className="mb-8">An error has occurred. Please try again later..</p>
      <Link href="/" className="text-blue-600 underline">
        Back to home page
      </Link>
    </div>
  )
}
