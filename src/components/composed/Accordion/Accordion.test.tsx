import { render, screen, fireEvent } from '@testing-library/react'
import { Accordion } from './Accordion'

describe('Accordion', () => {
  const renderSingleAccordion = () => {
    return render(
      <Accordion.Root type="single" collapsible defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Trigger 2</Accordion.Trigger>
          <Accordion.Content forceMount>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  }

  it('renders accordion items correctly', () => {
    renderSingleAccordion()
    expect(screen.getByText('Trigger 1')).toBeInTheDocument()
    expect(screen.getByText('Trigger 2')).toBeInTheDocument()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('expands the item with defaultValue initially', () => {
    renderSingleAccordion()
    const content1 = screen.getByText('Content 1')
    expect(content1.parentElement).toHaveAttribute('data-state', 'open')
  })

  it('toggles content visibility when trigger is clicked', () => {
    renderSingleAccordion()

    const trigger2 = screen.getByText('Trigger 2')
    fireEvent.click(trigger2)

    const content1 = screen.getByText('Content 1')
    const content2 = screen.getByText('Content 2')
    expect(content1.parentElement).toHaveAttribute('data-state', 'closed')
    expect(content2.parentElement).toHaveAttribute('data-state', 'open')
  })

  it('collapses the open item when its trigger is clicked again (with collapsible=true)', () => {
    renderSingleAccordion()

    const trigger1 = screen.getByText('Trigger 1')
    fireEvent.click(trigger1)

    const content1 = screen.getByText('Content 1')
    expect(content1.parentElement).toHaveAttribute('data-state', 'closed')
  })

  it('allows multiple items to be open with type="multiple"', () => {
    render(
      <Accordion.Root type="multiple" defaultValue={['item-1']}>
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
          <Accordion.Trigger>Trigger 2</Accordion.Trigger>
          <Accordion.Content forceMount>Content 2</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )

    fireEvent.click(screen.getByText('Trigger 2'))

    expect(screen.getByText('Content 1').parentElement).toHaveAttribute('data-state', 'open')
    expect(screen.getByText('Content 2').parentElement).toHaveAttribute('data-state', 'open')
  })

  it('applies custom className to Item', () => {
    const { container } = render(
      <Accordion.Root type="single">
        <Accordion.Item value="item-1" className="custom-item-class">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )
  
    const item = container.querySelector('.custom-item-class')
    expect(item).toBeInTheDocument()
  })  

  it('applies custom className to Trigger', () => {
    render(
      <Accordion.Root type="single">
        <Accordion.Item value="item-1">
          <Accordion.Trigger className="custom-trigger-class">Trigger 1</Accordion.Trigger>
          <Accordion.Content forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )

    const trigger = screen.getByText('Trigger 1')
    expect(trigger.className).toContain('custom-trigger-class')
  })

  it('applies custom className to Content', () => {
    render(
      <Accordion.Root type="single" defaultValue="item-1">
        <Accordion.Item value="item-1">
          <Accordion.Trigger>Trigger 1</Accordion.Trigger>
          <Accordion.Content className="custom-content-class" forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )

    const content = screen.getByText('Content 1').parentElement
    expect(content?.className).toContain('custom-content-class')
  })

  it('renders custom icon when provided', () => {
    const customIcon = <span data-testid="custom-icon">+</span>

    render(
      <Accordion.Root type="single">
        <Accordion.Item value="item-1">
          <Accordion.Trigger icon={customIcon}>Trigger 1</Accordion.Trigger>
          <Accordion.Content forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('passes additional props to Radix components', () => {
    render(
      <Accordion.Root type="single" data-testid="accordion-root">
        <Accordion.Item value="item-1" data-testid="accordion-item">
          <Accordion.Trigger data-testid="accordion-trigger">Trigger 1</Accordion.Trigger>
          <Accordion.Content data-testid="accordion-content" forceMount>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    )

    expect(screen.getByTestId('accordion-root')).toBeInTheDocument()
    expect(screen.getByTestId('accordion-item')).toBeInTheDocument()
    expect(screen.getByTestId('accordion-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('accordion-content')).toBeInTheDocument()
  })
})
