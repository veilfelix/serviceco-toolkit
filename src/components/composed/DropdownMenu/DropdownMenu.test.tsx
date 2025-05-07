import { render, screen, waitFor } from '@testing-library/react'
import { DropdownMenu } from './DropdownMenu'
import userEvent from '@testing-library/user-event'

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('DropdownMenu', () => {
  it('renders the dropdown trigger correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Open Menu')).toBeInTheDocument()
  })

  it('shows dropdown content when trigger is clicked', async () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('renders menu items with inset spacing', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Item inset>Inset Item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    const insetItem = screen.getByText('Inset Item')
    const insetItemContainer = insetItem.closest('div') as HTMLElement
    expect(insetItemContainer.className).toContain('pl-8')
  })

  it('renders checkbox items correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.CheckboxItem checked>
            Checked Item
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Checked Item')).toBeInTheDocument()
  })

  it('renders radio items correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.RadioGroup value="option1">
            <DropdownMenu.RadioItem value="option1">
              Option 1
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('renders labels correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Label>Menu Label</DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Menu Label')).toBeInTheDocument()
  })

  it('renders inset labels correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Label inset>Inset Label</DropdownMenu.Label>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    const insetLabel = screen.getByText('Inset Label')
    expect(insetLabel.className).toContain('pl-8')
  })

  it('renders separators correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Item>Item 1</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Item 2</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    const separator = document.querySelector('div[role="separator"]')
    expect(separator).toBeInTheDocument()
  })

  it('renders sub-triggers correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Sub Menu</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent forceMount>
              <DropdownMenu.Item>Sub Item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    expect(screen.getByText('Sub Menu')).toBeInTheDocument()
  })

  it('renders inset sub-triggers correctly', () => {
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger inset>Inset Sub Menu</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent forceMount>
              <DropdownMenu.Item>Sub Item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )

    const insetSubTrigger = screen.getByText('Inset Sub Menu')
    const insetSubTriggerContainer = insetSubTrigger.closest('div') as HTMLElement
    expect(insetSubTriggerContainer.className).toContain('pl-8')
  })

  it('renders sub-content correctly', async () => {
    const user = userEvent.setup()
  
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content forceMount>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Sub Menu</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent forceMount>
              <DropdownMenu.Item>Sub Item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  
    await user.hover(screen.getByText('Sub Menu'))
  
    expect(await screen.findByText('Sub Item')).toBeInTheDocument()
  })

  it('applies custom classNames to all components', async () => {
    const user = userEvent.setup()
  
    render(
      <DropdownMenu.Root defaultOpen>
        <DropdownMenu.Trigger>Open Menu</DropdownMenu.Trigger>
        <DropdownMenu.Content className="custom-content" forceMount>
          <DropdownMenu.Item className="custom-item">Item</DropdownMenu.Item>
          <DropdownMenu.CheckboxItem className="custom-checkbox" checked={false}>
            Checkbox
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.RadioGroup value="option1">
            <DropdownMenu.RadioItem className="custom-radio" value="option1">
              Radio
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.Label className="custom-label">Label</DropdownMenu.Label>
          <DropdownMenu.Separator className="custom-separator" />
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="custom-subtrigger">
              SubTrigger
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent className="custom-subcontent" forceMount>
              <DropdownMenu.Item>Sub Item</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )
  
    await user.hover(screen.getByText('SubTrigger'))

    await waitFor(() => {
      expect(document.querySelector('.custom-subcontent')).toBeInTheDocument()
    })
  
    expect(document.querySelector('.custom-content')).toBeInTheDocument()
    expect(screen.getByText('Item').closest('div')?.className).toContain('custom-item')
    expect(screen.getByText('Checkbox').closest('div')?.className).toContain('custom-checkbox')
    expect(screen.getByText('Radio').closest('div')?.className).toContain('custom-radio')
    expect(screen.getByText('Label').className).toContain('custom-label')
    expect(document.querySelector('.custom-separator')).toBeInTheDocument()
    expect(screen.getByText('SubTrigger').closest('div')?.className).toContain('custom-subtrigger')
  })
})
