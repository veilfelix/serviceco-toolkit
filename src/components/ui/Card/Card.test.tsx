import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Card', () => {
  it('renders card with content correctly', () => {
    render(
      <Card>
        <Card.Content>Card content</Card.Content>
      </Card>
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders card with header correctly', () => {
    render(
      <Card>
        <Card.Header className="custom-header-class" data-testid="card-header">
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card Description')).toBeInTheDocument()
  })

  it('renders card with footer correctly', () => {
    render(
      <Card>
        <Card.Footer className="custom-footer-class" data-testid="card-footer">Footer content</Card.Footer>
      </Card>
    )
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('renders a full card with all components', () => {
    render(
      <Card>
        <Card.Header className="custom-header-class" data-testid="card-header">
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card.Header>
        <Card.Content className="custom-content-class" data-testid="card-content">Content</Card.Content>
        <Card.Footer className="custom-footer-class" data-testid="card-footer">Footer</Card.Footer>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    const { container } = render(
      <Card className="custom-class">
        <Card.Content className="custom-content-class" data-testid="card-content">Content</Card.Content>
      </Card>
    )
    const card = container.firstChild as HTMLElement
    expect(card.className).toContain('custom-class')
  })

  it('applies custom className to Card.Header', () => {
    render(
      <Card>
        <Card.Header className="custom-header-class" data-testid="card-header">
          <Card.Title>Title</Card.Title>
        </Card.Header>
      </Card>
    )
    const header = screen.getByTestId('card-header')
    expect(header.className).toContain('custom-header-class')
  })

  it('applies custom className to Card.Title', () => {
    render(
      <Card>
        <Card.Header className="custom-header-class" data-testid="card-header">
          <Card.Title className="custom-title-class">Title</Card.Title>
        </Card.Header>
      </Card>
    )
    const title = screen.getByText('Title')
    expect(title.className).toContain('custom-title-class')
  })

  it('applies custom className to Card.Description', () => {
    render(
      <Card>
        <Card.Header className="custom-header-class" data-testid="card-header">
          <Card.Description className="custom-description-class">Description</Card.Description>
        </Card.Header>
      </Card>
    )
    const description = screen.getByText('Description')
    expect(description.className).toContain('custom-description-class')
  })

  it('applies custom className to Card.Content', () => {
    render(
      <Card>
        <Card.Content className="custom-content-class" data-testid="card-content">Content</Card.Content>
      </Card>
    )
    const content = screen.getByTestId('card-content')
    expect(content.className).toContain('custom-content-class')
  })

  it('applies custom className to Card.Footer', () => {
    render(
      <Card>
        <Card.Footer className="custom-footer-class" data-testid="card-footer">Footer</Card.Footer>
      </Card>
    )
    const footer = screen.getByTestId('card-footer')
    expect(footer.className).toContain('custom-footer-class')
  })
})