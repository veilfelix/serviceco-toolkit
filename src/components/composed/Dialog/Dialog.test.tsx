import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '@/components/composed/Dialog/Dialog'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('Dialog', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        composed: {
          dialog: {
            close: 'Close',
          },
        },
      },
      fr: {
        composed: {
          dialog: {
            close: 'Fermer',
          },
        },
      },
    })
  })

  it('opens and closes correctly', async () => {
    renderWithProvider(
      <Dialog.Root>
        <Dialog.Trigger>Open Modal</Dialog.Trigger>
        <Dialog.Content title="Test Title" description="This is a test Dialog">
          <p>Modal Content</p>
        </Dialog.Content>
      </Dialog.Root>
    )

    const trigger = screen.getByText('Open Modal')
    await userEvent.click(trigger)

    expect(await screen.findByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeVisible()

    const closeBtn = screen.getByRole('button', { name: /close/i })
    await userEvent.click(closeBtn)

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument()
  })
})
