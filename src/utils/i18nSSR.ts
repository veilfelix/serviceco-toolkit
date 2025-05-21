import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { defaultNamespaces } from './i18nNamespaces.generated'

/**
 * Loads shared and page-specific namespaces for i18next SSR.
 *
 * This function should never be imported into a client-side component
 * 
 * @param locale - The active locale from Next.js context
 * @param extraNamespaces - Any additional namespaces used in the page
 */
export async function withSharedNamespaces(locale: string, extraNamespaces: string[] = []) {
  const allNamespaces = [...defaultNamespaces, ...extraNamespaces]
  return await serverSideTranslations(locale, allNamespaces)
}
