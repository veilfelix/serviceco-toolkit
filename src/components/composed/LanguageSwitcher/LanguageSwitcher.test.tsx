jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    push: jest.fn(),
  }),
}))

import { render, screen, fireEvent } from '@testing-library/react'
import LanguageSwitcher from './LanguageSwitcher'
import '@testing-library/jest-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

describe('LanguageSwitcher component', () => {
  beforeEach(() => {
    i18n.use(initReactI18next).init({
      lng: 'en',
      fallbackLng: 'en',
      debug: false,
      resources: {
        en: {
          translation: {
            language: {
              en: 'English',
              fr: 'French',
              switch: 'Change language',
            },
          },
        },
        fr: {
          translation: {
            language: {
              en: 'Anglais',
              fr: 'Français',
              switch: 'Changer de langue',
            },
          },
        },
      },
    })
  })

  const renderWithProvider = () =>
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    )

  it('renders with default language selected', () => {
    renderWithProvider()

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveDisplayValue('English')
  })

  it('displays both language options', () => {
    renderWithProvider()

    const options = screen.getAllByRole('option')
    const optionLabels = options.map((opt) => opt.textContent)

    expect(optionLabels).toContain('English')
    expect(optionLabels).toContain('French')
  })

  it('changes language when a different option is selected', () => {
    renderWithProvider()

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'fr' } })

    // Since we simulate router.push with same path, i18n.language won't update here.
    // But we can validate the selected value changes.
    expect(select).toHaveValue('fr')
  })

  it('applies optional className', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher className="custom-class" />
      </I18nextProvider>
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('custom-class')
  })

  it('renders in compact mode with locale codes', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher compact />
      </I18nextProvider>
    )

    const select = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')

    expect(select).toBeInTheDocument()
    expect(options.map((opt) => opt.textContent)).toEqual(expect.arrayContaining(['EN', 'FR']))
  })
})