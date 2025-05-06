import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from '@/components/composed/Dialog/Dialog'

describe('Dialog', () => {
  it('opens and closes correctly', async () => {
    render(
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
