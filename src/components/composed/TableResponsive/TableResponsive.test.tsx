import React from 'react'
import { render, screen, act } from '@testing-library/react'
import TableResponsive from './TableResponsive'

// Mock resize observer
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock window.innerWidth
const originalInnerWidth = window.innerWidth

// Define a type for our test data
interface TestUser {
  id: number
  name: string
  email: string
  status: string
  role: string
}

// Sample data for tests
const sampleData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User' }
]

// Sample columns for tests
const sampleColumns = [
  {
    id: 'id',
    header: 'ID',
    accessor: (row: TestUser) => row.id
  },
  {
    id: 'name',
    header: 'Name',
    accessor: (row: TestUser) => row.name
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row: TestUser) => row.email
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row: TestUser) => row.status
  },
  {
    id: 'role',
    header: 'Role',
    accessor: (row: TestUser) => row.role
  }
]

describe('TableResponsive', () => {
  beforeAll(() => {
    // Mock ResizeObserver
    global.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
    
    // Mock getComputedStyle
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: () => '768px'
      })
    })
  })

  afterEach(() => {
    // Reset the window's inner width after each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth
    })
  })

  // Test basic table rendering
  it('renders a basic table correctly in desktop mode', () => {
    // Set innerWidth to desktop size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024
    })

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="auto"
      />
    )

    // Check that headers are present
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    
    // Check that data is displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
  })

  // Test switching to mobile view
  it('switches to stacked card-like view in mobile mode', () => {
    // Set innerWidth to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    })

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="stack"
      />
    )

    // In mobile card view, we should have dt elements for headers
    const headerElements = screen.getAllByText('Name')
    expect(headerElements.length).toBeGreaterThanOrEqual(1)
    
    // And multiple instances of each header (one per card)
    const statusHeaders = screen.getAllByText('Status')
    expect(statusHeaders.length).toBeGreaterThanOrEqual(1)
  })

  // Test scroll mode
  it('applies scroll mode correctly', () => {
    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="scroll"
      />
    )

    // Should render as a table even in mobile view
    expect(screen.getByRole('table')).toBeInTheDocument()
    
    // Container should have overflow-auto class
    const container = screen.getByRole('table').parentElement
    expect(container).toHaveClass('overflow-auto')
  })

  // Test hybrid mode with column hiding
  it('hides specific columns in hybrid mode on mobile', () => {
    // Set innerWidth to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    })

    const columnsWithHiding = [
      {
        id: 'id',
        header: 'ID',
        accessor: (row: TestUser) => row.id
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (row: TestUser) => row.name
      },
      {
        id: 'email',
        header: 'Email',
        accessor: (row: TestUser) => row.email,
        hideOnMobile: true
      }
    ]

    render(
      <TableResponsive 
        data={sampleData}
        columns={columnsWithHiding}
        mode="hybrid"
      />
    )

    // Table should still render
    expect(screen.getByRole('table')).toBeInTheDocument()
    
    // Check if cells have appropriate classes for responsive hiding
    const cells = document.querySelectorAll('td')
    const emailCells = Array.from(cells).filter(cell => 
      cell.textContent?.includes('@') && cell.classList.contains('hidden')
    )
    
    expect(emailCells.length).toBeGreaterThan(0)
  })

  // Test custom mobile renderer
  it('uses custom mobile renderer when provided', () => {
    // Set innerWidth to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    })

    const customText = 'Custom Mobile View'
    const customRenderer = () => <div data-testid="custom-mobile">{customText}</div>

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="stack"
        mobileRowRenderer={customRenderer}
      />
    )

    // Should use the custom renderer
    expect(screen.getAllByTestId('custom-mobile')).toHaveLength(sampleData.length)
    expect(screen.getAllByText(customText)).toHaveLength(sampleData.length)
  })

  // Test without mobile headers
  it('does not show headers in mobile view when showMobileHeaders is false', () => {
    // Set innerWidth to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 480
    })

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="stack"
        showMobileHeaders={false}
      />
    )

    // When showMobileHeaders is false, there should be no dt elements
    const dtElements = document.querySelectorAll('dt')
    expect(dtElements.length).toBe(0)
  })

  // Test custom breakpoint
  it('respects custom breakpoint for responsive behavior', async () => {
    // Set innerWidth to a size between md and lg
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 900
    })

    // Mock getComputedStyle for a custom lg breakpoint
    Object.defineProperty(window, 'getComputedStyle', {
      value: () => ({
        getPropertyValue: () => '1024px'
      })
    })

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="auto"
        breakpoint="lg"
      />
    )

    // Should be in mobile view because our width (900) is less than lg (1024)
    await act(async () => {
      // Giving time for the effect to run
      await new Promise(resolve => setTimeout(resolve, 0))
    })

    const dlElements = document.querySelectorAll('dl')
    expect(dlElements.length).toBeGreaterThan(0)
  })

  // Test custom CSS classes
  it('applies custom CSS classes correctly', () => {
    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="scroll"
        className="custom-table-class"
        mobileCardClassName="custom-card-class"
      />
    )

    // Table should have the custom class
    const table = screen.getByRole('table')
    expect(table).toHaveClass('custom-table-class')
  })

  // Test with empty data
  it('handles empty data gracefully', () => {
    render(
      <TableResponsive 
        data={[]}
        columns={sampleColumns}
        mode="auto"
      />
    )

    // Should still render the table structure
    expect(screen.getByRole('table')).toBeInTheDocument()
    
    // But no data rows
    const rows = document.querySelectorAll('tbody tr')
    expect(rows.length).toBe(0)
  })

  // Test column-specific styling
  it('applies column-specific styling', () => {
    const columnsWithClasses = [
      {
        id: 'id',
        header: 'ID',
        accessor: (row: TestUser) => row.id,
        className: 'custom-cell',
        headerClassName: 'custom-header'
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (row: TestUser) => row.name
      }
    ]

    render(
      <TableResponsive 
        data={sampleData}
        columns={columnsWithClasses}
        mode="auto"
      />
    )

    // Check if the custom classes are applied
    const headerCells = document.querySelectorAll('th')
    const dataCells = document.querySelectorAll('td')
    
    expect(headerCells[0]).toHaveClass('custom-header')
    expect(dataCells[0]).toHaveClass('custom-cell')
  })

  // Test custom row key function
  it('uses custom row key function when provided', () => {
    const getRowKey = jest.fn((row: TestUser) => `custom-key-${row.id}`)

    render(
      <TableResponsive 
        data={sampleData}
        columns={sampleColumns}
        mode="auto"
        getRowKey={getRowKey}
      />
    )

    // The key function should be called for each row
    expect(getRowKey).toHaveBeenCalledTimes(sampleData.length)
  })
})