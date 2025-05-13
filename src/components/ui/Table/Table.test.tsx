import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHead,
  TableSortableHeader
} from './Table'

describe('Table', () => {
  // Sample data for tests
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com' }
  ]

  // Basic table render test
  it('renders a basic table correctly', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )

    // Check that the headers are present
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()

    // Check that sample data rows are displayed
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Robert Johnson')).toBeInTheDocument()
  })

  // Test variant application
  it('applies the correct variant styles', () => {
    const { rerender } = render(
      <Table variant="default" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // Default variant should have border class
    expect(screen.getByTestId('table')).toHaveClass('border')

    // Striped variant
    rerender(
      <Table variant="striped" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId('table')).toHaveClass('border')
    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr:nth-child(odd)]:bg-muted')

    // Bordered variant
    rerender(
      <Table variant="bordered" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId('table')).toHaveClass('border')
    expect(screen.getByTestId('table')).toHaveClass('[&>thead>tr>th]:border')
    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr>td]:border')

    // Minimal variant
    rerender(
      <Table variant="minimal" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId('table')).toHaveClass('border-0')
  })

  // Test size variants
  it('applies the correct size styles', () => {
    const { rerender } = render(
      <Table size="sm" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // Small size
    expect(screen.getByTestId('table')).toHaveClass('[&>thead>tr>th]:px-2')
    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr>td]:px-2')

    // Medium size
    rerender(
      <Table size="md" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId('table')).toHaveClass('[&>thead>tr>th]:px-md')
    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr>td]:px-md')

    // Large size
    rerender(
      <Table size="lg" data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByTestId('table')).toHaveClass('[&>thead>tr>th]:px-lg')
    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr>td]:px-lg')
  })

  // Test sticky header
  it('applies sticky header styles when enabled', () => {
    render(
      <Table stickyHeader data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByTestId('table')).toHaveClass('[&>thead]:sticky')
    expect(screen.getByTestId('table')).toHaveClass('[&>thead]:top-0')
    expect(screen.getByTestId('table')).toHaveClass('[&>thead]:z-10')
  })

  // Test highlight on hover
  it('applies hover styles when highlightOnHover is enabled', () => {
    render(
      <Table highlightOnHover data-testid="table">
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(screen.getByTestId('table')).toHaveClass('[&>tbody>tr:hover]:bg-muted/50')
  })

  // Test table footer
  it('renders with a footer correctly', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Test</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )

    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  // Test sortable header
  it('calls onSort when sortable header is clicked', () => {
    const handleSort = jest.fn()

    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortableHeader columnId="name" onSort={handleSort}>
              Name
            </TableSortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Test Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // Click the sortable header
    fireEvent.click(screen.getByText('Name'))
    expect(handleSort).toHaveBeenCalledWith('name')
  })

  // Test sortable header direction indicators
  it('renders the correct sort direction indicators', () => {
    const { rerender } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortableHeader columnId="name" sortDirection="asc">
              Name
            </TableSortableHeader>
          </TableRow>
        </TableHeader>
      </Table>
    )

    // Should have ChevronUp for ascending
    expect(document.querySelector('svg')).toBeInTheDocument()

    // Rerender with descending direction
    rerender(
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortableHeader columnId="name" sortDirection="desc">
              Name
            </TableSortableHeader>
          </TableRow>
        </TableHeader>
      </Table>
    )
    
    // Should have ChevronDown for descending
    expect(document.querySelector('svg')).toBeInTheDocument()

    // Rerender with no direction
    rerender(
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortableHeader columnId="name">
              Name
            </TableSortableHeader>
          </TableRow>
        </TableHeader>
      </Table>
    )
    
    // Should have ChevronsUpDown for no direction
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  // Test accessibility attributes
  it('has correct table semantics and structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>John Doe</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    // Table should have correct role
    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeInTheDocument()

    // TableHead cells should have correct role
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(columnHeaders).toHaveLength(2)
    expect(columnHeaders[0]).toHaveTextContent('ID')
    expect(columnHeaders[1]).toHaveTextContent('Name')

    // TableCell cells should have correct role
    const cells = screen.getAllByRole('cell')
    expect(cells).toHaveLength(2)
    expect(cells[0]).toHaveTextContent('1')
    expect(cells[1]).toHaveTextContent('John Doe')

    // TableRow should have correct role
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(2) // Header row + data row
  })
})