import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { withSharedNamespaces } from '@/utils/i18nSSR'

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
  const { t } = useTranslation('error')

  return (
    <Container className="py-16 text-center">
      <Heading as="h1">{t('500.title')}</Heading>
      <Text as="p">{t('500.message')}</Text>
      <ButtonLink href="/" variant="primary" size="lg">
        {t('500.cta')}
      </ButtonLink>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withSharedNamespaces(locale ?? 'en'),
  }
}