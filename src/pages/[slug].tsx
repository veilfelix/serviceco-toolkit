import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '@/lib/api/contentful'
import Seo from '@/components/composed/Seo/Seo'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import RichText from '@/components/ui/RichText/RichText'
import Card from '@/components/ui/Card/Card'
import { withSharedNamespaces } from '@/utils/i18nSSR'

/**
 * [slug].tsx is the dynamic page renderer for CMS-driven content.
 * It fetches and renders a Contentful "Page" entry based on the slug in the URL.
 *
 * We disable the `no-explicit-any` rule here because Contentful's dynamic typing and SDK limitations
 * make it difficult to enforce a precise static type for `page`. Using `getEntries<T>()` with
 * `EntrySkeletonType` or custom field typing leads to structural mismatches and compilation errors.
 * Until the schema is stabilized or a custom wrapper is introduced, we rely on `any` for flexibility.
 *
 * TODO: Internationalization for CMS pages
 *
 * This file currently renders CMS-driven pages (from Contentful) in a single locale.
 * To support i18n:
 *   - We need to localize the Contentful model ("Page") and its key fields (title, slug, etc.).
 *   - We must include `locale` in `getStaticProps` and `getStaticPaths` to fetch content in the correct language.
 *   - We should also call `serverSideTranslations(locale, [...])` to load any shared i18n namespaces (e.g. 'common').
 *
 * We can implement this at the same time as the CMS-level translation override system,
 * which will allow text keys like `page.metaTitleKey` to resolve dynamically from Contentful
 * instead of using static i18n files.
 *
 * That override system will likely use `i18next`, and combine:
 *   1. `useTranslation()` for fallback/default keys
 *   2. a custom utility to resolve Contentful-provided keys per locale at runtime (e.g. `page.titleKey`)
 *
 * This ensures that non-technical users can manage translations directly from the CMS,
 * while still benefiting from fallback behavior and i18n file versioning.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ page }: { page: any }) {
  return (
    <>
      <Seo
        title={page.metaTitle || page.title}
        description={page.metaDescription}
        image={page.metaImage?.fields.file.url}
        noIndex={page.noIndex}
      />
      <Container fullWidth>
        {page.heroImage && (
          <Image
            src={`https:${page.heroImage.fields.file.url}`}
            alt={page.heroImage.fields.title || ''}
            width={2560}
            height={400}
            className="w-full h-[400px] object-cover"
          />
        )}
      </Container>
      <Container>
        <Heading as="h1" className="mt-8">{page.title}</Heading>
        <Card>
          <Card.Content className="pt-6">
            <RichText>{documentToReactComponents(page.description)}</RichText>
          </Card.Content>
        </Card>
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries = await client.getEntries({ content_type: 'page' })
  
  const paths = entries.items
    .filter((item) => typeof item.fields.slug === 'string')
    .map((item) => ({
      params: { slug: item.fields.slug as string },
    }))
  
  return { 
    paths, 
    fallback: 'blocking',
  }
}
  

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const entries = await client.getEntries({
    content_type: 'page',
    'fields.slug': params?.slug,
  })

  if (!entries.items.length) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await withSharedNamespaces(locale ?? 'en')),
      page: entries.items[0].fields,
    },
  }
}
