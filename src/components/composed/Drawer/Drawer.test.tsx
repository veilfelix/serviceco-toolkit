import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Drawer } from './Drawer'
import Button from '@/components/ui/Button/Button'
import '@testing-library/jest-dom'
import { useState } from 'react'

describe('Drawer component', () => {
  it('renders the trigger and opens the drawer', async () => {
    render(
      <Drawer>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content title="Test Drawer" description="for testing">
          <p>Drawer content</p>
        </Drawer.Content>
      </Drawer>
    )

    expect(screen.getByText('Open Drawer')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Open Drawer'))
    expect(await screen.findByText('Test Drawer')).toBeInTheDocument()
    expect(screen.getByText('Drawer content')).toBeInTheDocument()
  })

  it('respects the "side" prop visually', async () => {
    render(
      <Drawer side="left">
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content title="Left Drawer" description="for testing">
          <p>Left side content</p>
        </Drawer.Content>
      </Drawer>
    )

    fireEvent.click(screen.getByText('Open Drawer'))
    const dialog = await screen.findByRole('dialog')
    expect(dialog).toHaveClass('left-0')
  })

  it('does not render the overlay when showOverlay is false', async () => {
    render(
      <Drawer showOverlay={false} open>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content title="Overlay Test" description="for testing">
          <p>No overlay</p>
        </Drawer.Content>
      </Drawer>
    )

    // Ensure no overlay is in the DOM
    const overlays = document.querySelectorAll('[data-state]')
    overlays.forEach(el => {
      expect(el).not.toHaveClass('bg-drawer-overlay-background')
    })
  })

  it('calls onOpenChange when the drawer is toggled', () => {
    const handleOpenChange = jest.fn()

    render(
      <Drawer onOpenChange={handleOpenChange}>
        <Drawer.Trigger asChild>
          <Button>Toggle</Button>
        </Drawer.Trigger>
        <Drawer.Content title="Change Handler" description="for testing" />
      </Drawer>
    )

    fireEvent.click(screen.getByText('Toggle'))
    expect(handleOpenChange).toHaveBeenCalledWith(true)
  })

  it('closes on Escape key by default', async () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(true)
      return (
        <Drawer open={open} onOpenChange={setOpen}>
          <Drawer.Trigger asChild>
            <Button>Open</Button>
          </Drawer.Trigger>
          <Drawer.Content title="Escape Close Test" description="for testing">
            <p>Escape should close me</p>
          </Drawer.Content>
        </Drawer>
      )
    }

    render(<Wrapper />)

    expect(screen.getByText('Escape should close me')).toBeInTheDocument()

    // simulate escape
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })

    // wait for it to unmount
    await waitFor(() =>
      expect(screen.queryByText('Escape should close me')).not.toBeInTheDocument()
    )
  })
})
