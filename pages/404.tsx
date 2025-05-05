import Container from '@/components/ui/Container/Container'
import Link from 'next/link'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'

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
    <Container className="py-16 text-center">
      <Heading as="h1" className="mb-4">404 - Page Not Found</Heading>
      <Text as="p" className="mb-8">Oops! The page you are looking for doesn&apos;t exist.</Text>
      <Link href="/" className="text-blue-600 underline">
        Back to home page
      </Link>
    </Container>
  )
}
