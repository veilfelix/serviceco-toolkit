import Container from '@/components/ui/Container/Container'
import Link from 'next/link'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'

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
    <Container className="py-16 text-center">
      <Heading as="h1" className="mb-4">500 - Server Error</Heading>
      <Text as="p" className="mb-8">An error has occurred. Please try again later..</Text>
      <Link href="/" className="text-blue-600 underline">
        Back to home page
      </Link>
    </Container>
  )
}
