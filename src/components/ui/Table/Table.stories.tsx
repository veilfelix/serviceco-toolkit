import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
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
import Badge from '@/components/ui/Badge/Badge'

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['default', 'striped', 'bordered', 'minimal'],
      control: { type: 'select' },
      description: 'The visual style of the table',
      table: {
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      description: 'The size variant of the table',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Whether the header should stick to the top when scrolling',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    highlightOnHover: {
      control: 'boolean',
      description: 'Whether rows should change color when hovered',
      table: {
        defaultValue: { summary: 'false' }
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Table>

// Sample data for all examples
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Active', role: 'Editor' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Pending', role: 'User' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'Active', role: 'Admin' }
]

// Basic table example
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    stickyHeader: false,
    highlightOnHover: true
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  row.status === 'Active'
                    ? 'success'
                    : row.status === 'Inactive'
                      ? 'danger'
                      : 'warning'
                }
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="text-center">
            Total: {sampleData.length} users
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

// Striped variant
export const Striped: Story = {
  args: {
    variant: 'striped',
    size: 'md',
    highlightOnHover: true
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  row.status === 'Active'
                    ? 'success'
                    : row.status === 'Inactive'
                      ? 'danger'
                      : 'warning'
                }
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Bordered variant
export const Bordered: Story = {
  args: {
    variant: 'bordered',
    size: 'md'
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  row.status === 'Active'
                    ? 'success'
                    : row.status === 'Inactive'
                      ? 'danger'
                      : 'warning'
                }
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Minimal variant
export const Minimal: Story = {
  args: {
    variant: 'minimal',
    size: 'md'
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  row.status === 'Active'
                    ? 'success'
                    : row.status === 'Inactive'
                      ? 'danger'
                      : 'warning'
                }
              >
                {row.status}
              </Badge>
            </TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="text-lg font-medium mb-sm">Small Size</h3>
        <Table variant="default" size="sm">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.slice(0, 3).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Medium Size (Default)</h3>
        <Table variant="default" size="md">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.slice(0, 3).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-sm">Large Size</h3>
        <Table variant="default" size="lg">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.slice(0, 3).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// With sticky header
export const StickyHeader: Story = {
  args: {
    variant: 'default',
    size: 'md',
    stickyHeader: true,
    maxHeight: '400px',
    highlightOnHover: true
  },
  render: (args) => (
    <div>
      <Table {...args}>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(15)].map((_, i) => {
            const rowData = sampleData[i % sampleData.length]
            return (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{rowData.name}</TableCell>
                <TableCell>{rowData.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      rowData.status === 'Active'
                        ? 'success'
                        : rowData.status === 'Inactive'
                          ? 'danger'
                          : 'warning'
                    }
                  >
                    {rowData.status}
                  </Badge>
                </TableCell>
                <TableCell>{rowData.role}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

// With sortable headers
export const SortableTable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortState, setSortState] = useState<{
      column: string
      direction: 'asc' | 'desc' | undefined
    }>({
      column: 'name',
      direction: 'asc'
    })

    const handleSort = (columnId: string) => {
      setSortState((prev) => ({
        column: columnId,
        direction:
          prev.column === columnId
            ? prev.direction === 'asc'
              ? 'desc'
              : prev.direction === 'desc'
                ? undefined
                : 'asc'
            : 'asc'
      }))
    }

    // Sort the data based on the current sort state
    const sortedData = [...sampleData].sort((a, b) => {
      if (sortState.direction === undefined) return 0
      
      const aValue = a[sortState.column as keyof typeof a]
      const bValue = b[sortState.column as keyof typeof b]
      
      if (sortState.direction === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return (
      <Table variant="default" size="md" highlightOnHover>
        <TableHeader>
          <TableRow>
            <TableSortableHeader
              columnId="id"
              sortDirection={sortState.column === 'id' ? sortState.direction : undefined}
              onSort={handleSort}
            >
              ID
            </TableSortableHeader>
            <TableSortableHeader
              columnId="name"
              sortDirection={sortState.column === 'name' ? sortState.direction : undefined}
              onSort={handleSort}
            >
              Name
            </TableSortableHeader>
            <TableSortableHeader
              columnId="email"
              sortDirection={sortState.column === 'email' ? sortState.direction : undefined}
              onSort={handleSort}
            >
              Email
            </TableSortableHeader>
            <TableSortableHeader
              columnId="status"
              sortDirection={sortState.column === 'status' ? sortState.direction : undefined}
              onSort={handleSort}
            >
              Status
            </TableSortableHeader>
            <TableSortableHeader
              columnId="role"
              sortDirection={sortState.column === 'role' ? sortState.direction : undefined}
              onSort={handleSort}
            >
              Role
            </TableSortableHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    row.status === 'Active'
                      ? 'success'
                      : row.status === 'Inactive'
                        ? 'danger'
                        : 'warning'
                  }
                >
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}