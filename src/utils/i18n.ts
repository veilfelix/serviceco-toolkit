import i18nConfig from '../../next-i18next.config.js'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

/**
 * Returns the list of supported locales as defined in next-i18next.config.js
 */
export function getLocales(): string[] {
  return i18nConfig.i18n?.locales || ['en']
}

/**
 * Initializes a scoped instance of i18next for testing purposes.
 *
 * This helper is used to configure the i18n context inside Jest tests
 * without relying on external config files or global setup.
 *
 * Use it with <I18nextProvider> to render components that depend on translations.
 *
 * Example:
 *   initTestI18n({ en: { common: { hello: "Hello" } } }, 'en')
 */
export function initTestI18n(resources = {}, lng = 'en') {
  i18n.use(initReactI18next).init({
    lng,
    fallbackLng: lng,
    debug: false,
    resources,
    interpolation: {
      escapeValue: false,
    },
  })

  return i18n
}
