import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '@/lib/api/contentful'
import Seo from '@/components/composed/Seo/Seo'
import Container from '@/components/ui/Container/Container'
import Heading from '@/components/ui/Heading/Heading'
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import RichText from '@/components/ui/RichText/RichText'
import Card from '@/components/ui/Card/Card'

/**
 * [slug].tsx is the dynamic page renderer for CMS-driven content.
 * It fetches and renders a Contentful "Page" entry based on the slug in the URL.
 *
 * We disable the `no-explicit-any` rule here because Contentful's dynamic typing and SDK limitations
 * make it difficult to enforce a precise static type for `page`. Using `getEntries<T>()` with
 * `EntrySkeletonType` or custom field typing leads to structural mismatches and compilation errors.
 * Until the schema is stabilized or a custom wrapper is introduced, we rely on `any` for flexibility.
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
  
  return { paths, fallback: 'blocking' }
}
  

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entries = await client.getEntries({
    content_type: 'page',
    'fields.slug': params?.slug
  })

  if (!entries.items.length) {
    return { notFound: true }
  }

  return {
    props: {
      page: entries.items[0].fields
    }
  }
}