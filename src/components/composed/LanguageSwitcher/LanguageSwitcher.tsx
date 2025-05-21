'use client'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Select from '@/components/ui/Select/Select'
import { JSX } from 'react'
import { getLocales } from '@/utils/i18n'
import { cn } from '@/utils/classNames'

const locales = getLocales()

export interface LanguageSwitcherProps {
  /**
   * Optional additional CSS classes
   */
  className?: string
  /**
   * If true, displays short locale codes like 'EN' instead of full labels
   */
  compact?: boolean
}

/**
 * A language selector component integrated with i18n routing and design system styling.
 *
 * This component displays a language dropdown and switches locales using Next.js router.
 * It supports the custom `<Select />` component and uses `next-i18next` for translation.
 *
 * Example:
 *
 * ```tsx
 * <LanguageSwitcher className="ml-auto" />
 * <LanguageSwitcher compact />
 * ```
 *
 * Translations for full labels should be defined under:
 *
 * ```json
 * {
 *   "language": {
 *     "en": "English",
 *     "fr": "Français",
 *     "switch": "Change language"
 *   }
 * }
 * ```
 */
export default function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps): JSX.Element {
  const { i18n, t } = useTranslation()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value
    const path = router.asPath
    i18n.changeLanguage(newLocale)
    router.push(path, path, { locale: newLocale })
  }

  const options = locales.map((lng) => ({
    value: lng,
    label: compact ? lng.toUpperCase() : t(`language.${lng}`),
  }))

  return (
    <Select
      options={options}
      value={i18n.language}
      onChange={handleChange}
      className={cn(compact ? 'w-20' : 'w-36', className)}
      size="sm"
      aria-label={t('language.switch')}
    />
  )
}
