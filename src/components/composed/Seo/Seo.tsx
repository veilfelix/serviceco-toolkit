import Head from 'next/head'
import { JSX } from 'react'

type SeoProps = {
  title: string
  description?: string
  image?: string
  noIndex?: boolean
}

/**
 * This SEO component is a reusable component that injects <title> and <meta> tags into the <head> of the document.
 * It should be used on every page of the site to ensure consistent metadata and optimal SEO performance.
 *
 * Accepts props like `title`, `description`, `image`, and `noIndex` to customize the metadata per page.
 */
export default function Seo({ title, description, image, noIndex = false }: SeoProps): JSX.Element {
  const siteName = 'ServiceCo Toolkit'
  const fullTitle = `${title} | ${siteName}`
  const defaultImage = '/favicon.ico'

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Default page description'} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ''} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ''} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  )
}