import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from './Sidebar'
import { Home } from 'lucide-react'

// Mock the useMediaQuery hook
jest.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(() => false)
}))

describe('Sidebar', () => {
  it('renders correctly with default props', () => {
    render(
      <Sidebar data-testid="sidebar">
        <Sidebar.Header>Header</Sidebar.Header>
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toBeInTheDocument()
    expect(sidebar).toHaveClass('bg-sidebar-background')
    expect(sidebar).toHaveClass('w-[var(--sidebar-width)]')
    expect(sidebar).toHaveClass('border-r')
    
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
  
  it('applies right position correctly', () => {
    render(
      <Sidebar position="right" data-testid="sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveClass('border-l')
    expect(sidebar).not.toHaveClass('border-r')
  })
  
  it('does not render toggle button when collapsible is false', () => {
    render(
      <Sidebar collapsible={false} data-testid="sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toBeInTheDocument()
    expect(screen.queryByLabelText('Collapse sidebar')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Expand sidebar')).not.toBeInTheDocument()
  })
  
  it('renders in collapsed state when defaultDisplay is collapsed', () => {
    render(
      <Sidebar defaultDisplay="collapsed" data-testid="sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveClass('w-[var(--sidebar-collapsed-width)]')
    expect(sidebar).not.toHaveClass('w-[var(--sidebar-width)]')
  })
  
  it('toggles between expanded and collapsed states when toggle button is clicked', () => {
    render(
      <Sidebar data-testid="sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).toHaveClass('w-[var(--sidebar-width)]')
    
    // Find the toggle button and click it
    const toggleButton = screen.getByLabelText('Collapse sidebar')
    fireEvent.click(toggleButton)
    
    expect(sidebar).toHaveClass('w-[var(--sidebar-collapsed-width)]')
    
    // Now it should show the expand button
    const expandButton = screen.getByLabelText('Expand sidebar')
    fireEvent.click(expandButton)
    
    expect(sidebar).toHaveClass('w-[var(--sidebar-width)]')
  })
  
  it('does not render border when border prop is false', () => {
    render(
      <Sidebar border={false} data-testid="sidebar">
        <Sidebar.Content>Content</Sidebar.Content>
      </Sidebar>
    )
    
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar).not.toHaveClass('border-r')
    expect(sidebar).not.toHaveClass('border-l')
  })
})

describe('Sidebar.Header', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <Sidebar.Header data-testid="header">Header Content</Sidebar.Header>
      </Sidebar>
    )
    
    const header = screen.getByTestId('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('h-[var(--sidebar-header-height)]')
    expect(header).toHaveClass('flex')
    expect(header).toHaveClass('items-center')
    expect(screen.getByText('Header Content')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    render(
      <Sidebar>
        <Sidebar.Header data-testid="header" className="custom-class">Header</Sidebar.Header>
      </Sidebar>
    )
    
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('custom-class')
  })
})

describe('Sidebar.Content', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <Sidebar.Content data-testid="content">Content</Sidebar.Content>
      </Sidebar>
    )
    
    const content = screen.getByTestId('content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('flex-1')
    expect(content).toHaveClass('flex')
    expect(content).toHaveClass('flex-col')
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    render(
      <Sidebar>
        <Sidebar.Content data-testid="content" className="custom-class">Content</Sidebar.Content>
      </Sidebar>
    )
    
    const content = screen.getByTestId('content')
    expect(content).toHaveClass('custom-class')
  })
})

describe('Sidebar.Section', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Section data-testid="section">Section Content</Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const section = screen.getByTestId('section')
    expect(section).toBeInTheDocument()
    expect(screen.getByText('Section Content')).toBeInTheDocument()
  })
  
  it('renders title when provided', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Section data-testid="section" title="Section Title">
            Section Content
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    )
    
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.getByText('Section Content')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Section data-testid="section" className="custom-class">
            Section Content
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const section = screen.getByTestId('section')
    expect(section).toHaveClass('custom-class')
  })
})

describe('Sidebar.Item', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item">Item</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    expect(item).toBeInTheDocument()
    expect(screen.getByText('Item')).toBeInTheDocument()
  })
  
  it('renders as a link when href is provided', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item href="/dashboard" data-testid="item">Dashboard</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    expect(item.tagName).toBe('A')
    expect(item).toHaveAttribute('href', '/dashboard')
  })
  
  it('renders with active styles when active prop is true', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item" active>Active Item</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    expect(item).toHaveClass('bg-sidebar-item-active')
    expect(item).toHaveClass('text-sidebar-item-active-text')
  })
  
  it('renders with disabled styles when disabled prop is true', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item" disabled>Disabled Item</Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    expect(item).toHaveClass('opacity-50')
    expect(item).toHaveClass('cursor-not-allowed')
  })
  
  it('renders icon when provided', () => {
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item" icon={<Home data-testid="icon" />}>
            Home
          </Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
  
  it('calls onClick when item is clicked', () => {
    const handleClick = jest.fn()
    
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item" onClick={handleClick}>
            Clickable Item
          </Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    fireEvent.click(item)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('does not call onClick when disabled item is clicked', () => {
    const handleClick = jest.fn()
    
    render(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Item data-testid="item" disabled onClick={handleClick}>
            Disabled Item
          </Sidebar.Item>
        </Sidebar.Content>
      </Sidebar>
    )
    
    const item = screen.getByTestId('item')
    fireEvent.click(item)
    
    expect(handleClick).not.toHaveBeenCalled()
  })
})

describe('Sidebar.Footer', () => {
  it('renders correctly', () => {
    render(
      <Sidebar>
        <Sidebar.Footer data-testid="footer">Footer</Sidebar.Footer>
      </Sidebar>
    )
    
    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('min-h-[var(--sidebar-footer-height)]')
    expect(footer).toHaveClass('mt-auto')
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
  
  it('renders separator when withSeparator is true', () => {
    render(
      <Sidebar>
        <Sidebar.Footer data-testid="footer" withSeparator>
          Footer
        </Sidebar.Footer>
      </Sidebar>
    )
    
    // Assuming some styling that can be checked, depends on Separator implementation
    expect(document.querySelector('[role="separator"]')).toBeInTheDocument()
  })
  
  it('does not render separator when withSeparator is false', () => {
    render(
      <Sidebar>
        <Sidebar.Footer data-testid="footer" withSeparator={false}>
          Footer
        </Sidebar.Footer>
      </Sidebar>
    )
    
    expect(document.querySelector('[role="separator"]')).not.toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    render(
      <Sidebar>
        <Sidebar.Footer data-testid="footer" className="custom-class">
          Footer
        </Sidebar.Footer>
      </Sidebar>
    )
    
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveClass('custom-class')
  })
})