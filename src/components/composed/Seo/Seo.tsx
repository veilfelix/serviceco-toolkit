'use client'

import Head from 'next/head'
import { JSX } from 'react'
import { useTranslation } from 'next-i18next'

type SeoProps = {
  /**
   * Raw page title (overrides titleKey)
   */
  title?: string
  /**
   * Translation key for the page title (used with i18n)
   */
  titleKey?: string
  /**
   * Raw meta description (overrides descriptionKey)
   */
  description?: string
  /**
   * Translation key for the meta description
   */
  descriptionKey?: string
  /**
   * Open Graph and Twitter image URL
   */
  image?: string
  /**
   * Prevent search engines from indexing the page
   * @default false
   */
  noIndex?: boolean
}

/**
 * SEO component to inject dynamic <title> and <meta> tags into the document <head>.
 * Supports i18n translation keys and customizable metadata.
 */
export default function Seo({
  title,
  titleKey,
  description,
  descriptionKey,
  image,
  noIndex = false,
}: SeoProps): JSX.Element {
  const siteName = 'ServiceCo Toolkit'
  const defaultImage = '/favicon.ico'
  const { t } = useTranslation('common')

  const resolvedTitle = titleKey ? t(titleKey) : title || ''
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description || ''
  const fullTitle = `${resolvedTitle} | ${siteName}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Head>
  )
}