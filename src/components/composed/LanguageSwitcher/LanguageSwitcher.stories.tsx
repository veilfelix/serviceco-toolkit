import type { Meta, StoryObj } from '@storybook/react'
import LanguageSwitcher from './LanguageSwitcher'
import { I18nextProvider } from 'react-i18next'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Minimal in-memory i18n setup for Storybook
i18n
  .use(initReactI18next)
  .init({
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

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Composed/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof LanguageSwitcher>

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export const Playground: Story = {
  render: () => (
    <Wrapper>
      <LanguageSwitcher />
    </Wrapper>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <Wrapper>
      <LanguageSwitcher className="w-52 border-primary rounded-xl shadow-md" />
    </Wrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how to apply custom styles to the LanguageSwitcher using the `className` prop.',
      },
    },
  },
}

export const Compact: Story = {
  render: () => (
    <Wrapper>
      <LanguageSwitcher compact />
    </Wrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Displays a more compact version of the language switcher, using locale codes (e.g., EN, FR) instead of full language names.',
      },
    },
  },
}


