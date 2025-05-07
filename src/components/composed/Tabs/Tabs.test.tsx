import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

describe('Tabs', () => {
  it('renders triggers and initial active tab content', () => {
    render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
        <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
      </Tabs.Root>
    )

    expect(screen.getByText('Tab 1')).toBeInTheDocument()
    expect(screen.getByText('Tab 2')).toBeInTheDocument()
    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument()
  })

  it('switches content when tab is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
        <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
      </Tabs.Root>
    )

    expect(screen.getByText('Content for Tab 1')).toBeInTheDocument()
    expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument()

    await user.click(screen.getByText('Tab 2'))

    expect(screen.getByText('Content for Tab 2')).toBeInTheDocument()
    expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument()
  })

  it('applies custom className to Tabs List component', () => {
    const { container } = render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List className="custom-list-class">
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
      </Tabs.Root>
    )

    const tabsList = container.querySelector('[class*="custom-list-class"]')
    expect(tabsList).toBeInTheDocument()
  })

  it('applies custom className to Tabs Trigger component', () => {
    render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1" className="custom-trigger-class">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
      </Tabs.Root>
    )

    const tabTrigger = screen.getByText('Tab 1')
    expect(tabTrigger.className).toContain('custom-trigger-class')
  })

  it('applies custom className to Tabs Content component', () => {
    const { container } = render(
      <Tabs.Root defaultValue="tab1">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="custom-content-class">
          Content for Tab 1
        </Tabs.Content>
      </Tabs.Root>
    )

    const tabContent = container.querySelector('[class*="custom-content-class"]')
    expect(tabContent).toBeInTheDocument()
  })
})
