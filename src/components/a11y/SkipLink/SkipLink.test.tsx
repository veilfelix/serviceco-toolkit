import { render, screen } from '@testing-library/react'
import SkipLink from '@/components/a11y/SkipLink/SkipLink'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('SkipLink', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        a11y: {
          skipLink: {
            mainContent: 'Skip to main content'
          }
        },
        datePicker: {
          clearDate: 'Clear date',
          selectDate: 'Select date',
        },
        ui: {
          requiredIndicator: '*',
        },
      },
      fr: {
        a11y: {
          skipLink: {
            mainContent: 'Passer au contenu principal'
          }
        },
        datePicker: {
          clearDate: 'Effacer la date',
          selectDate: 'Choisir une date',
        },
      },
    })
  })

  it('renders a skip link with correct href and label', () => {
    renderWithProvider(<SkipLink />)
    const link = screen.getByText(/Skip to main content/i)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
    expect(link).toHaveClass('sr-only')
  })
})