import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Text from '@/components/ui/Text/Text'
import ButtonLink from '@/components/ui/ButtonLink/ButtonLink'
import { useTranslation } from 'next-i18next'
import { GetStaticProps } from 'next'
import { withSharedNamespaces } from '@/utils/i18nSSR'

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
  const { t } = useTranslation('error')

  return (
    <Container className="py-16 text-center">
      <Heading as="h1">{t('404.title')}</Heading>
      <Text as="p">{t('404.message')}</Text>
      <ButtonLink href="/" variant="primary" size="lg">
        {t('404.cta')}
      </ButtonLink>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: await withSharedNamespaces(locale ?? 'en'),
  }
}