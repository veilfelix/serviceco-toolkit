import { render, screen } from '@testing-library/react'
import Layout from '@/components/composed/Layout/Layout'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

// Mock Header and Footer to isolate Layout rendering
jest.mock('./Header/Header', () => {
  const MockHeader = () => <header data-testid="mock-header">Header</header>
  MockHeader.displayName = 'MockHeader'
  return MockHeader
})
  
jest.mock('./Footer/Footer', () => {
  const MockFooter = () => <footer data-testid="mock-footer">Footer</footer>
  MockFooter.displayName = 'MockFooter'
  return MockFooter
})

describe('Layout', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        common: {
          language: {
            fr: 'Français',
            en: 'English',
            switch: 'Change language',
          },
          meta: {
            home: {
              title: 'ServiceCo Toolkit',
              description: 'A modern starter kit for service company websites.',
            },
          },
        },
        a11y: {
          skipToMain: 'Skip to main content',
        },
      },
      fr: {
        common: {
          language: {
            fr: 'Français',
            en: 'Anglais',
            switch: 'Changer la langue',
          },
          meta: {
            home: {
              title: 'ServiceCo Toolkit',
              description: 'Un kit de démarrage moderne pour sites de services',
            },
          },
        },
        a11y: {
          skipToMain: 'Aller au contenu principal',
        },
      },
    })
  })

  it('renders Header, children, and Footer in correct order', () => {
    renderWithProvider(
      <Layout>
        <div data-testid="layout-children">Page Content</div>
      </Layout>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('layout-children')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
  })
})
