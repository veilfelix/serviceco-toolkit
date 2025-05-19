import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import TableResponsive, { ColumnDefinition, TableResponsiveProps } from './TableResponsive'
import Badge from '@/components/ui/Badge/Badge'
import { Eye, Edit, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button/Button'

type UserData = {
  id: number
  name: string
  email: string
  status: string
  role: string
  lastLogin?: string
  department?: string
  salary?: string
  location?: string
}

const TableResponsiveTyped = TableResponsive as unknown as React.FC<TableResponsiveProps<UserData>>

const meta: Meta<typeof TableResponsiveTyped> = {
  title: 'Composed/TableResponsive',
  component: TableResponsiveTyped,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    }
  },
  argTypes: {
    mode: {
      options: ['auto', 'stack', 'scroll', 'hybrid'],
      control: { type: 'select' },
      description: 'Responsive display mode',
      table: {
        defaultValue: { summary: 'auto' }
      }
    },
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
    showMobileHeaders: {
      control: 'boolean',
      description: 'Whether to show header labels in stacked mobile view',
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    breakpoint: {
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: { type: 'select' },
      description: 'The breakpoint at which to switch to mobile view',
      table: {
        defaultValue: { summary: 'md' }
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
type Story = StoryObj<typeof TableResponsiveTyped>

// Sample data for all examples
const sampleData: UserData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', role: 'User' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', status: 'Active', role: 'Editor' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', status: 'Pending', role: 'User' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', status: 'Active', role: 'Admin' }
]

// Column definitions for the examples
const standardColumns: ColumnDefinition<UserData>[] = [
  {
    id: 'id',
    header: 'ID',
    accessor: (row: UserData) => row.id
  },
  {
    id: 'name',
    header: 'Name',
    accessor: (row: UserData) => row.name
  },
  {
    id: 'email',
    header: 'Email',
    accessor: (row: UserData) => row.email
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row: UserData) => (
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
    )
  },
  {
    id: 'role',
    header: 'Role',
    accessor: (row: UserData) => row.role
  }
]

// Auto mode (default)
export const Auto: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'auto',
    variant: 'default',
    size: 'md',
    highlightOnHover: true,
    showMobileHeaders: true,
    breakpoint: 'md'
  }
}

// Stack mode
export const Stack: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'stack',
    variant: 'default',
    size: 'md'
  }
}

// Scroll mode
export const Scroll: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'scroll',
    variant: 'default',
    size: 'md'
  },
  render: (args) => (
    <div className="max-w-[350px] mx-auto p-md border border-dashed border-muted">
      <p className="text-sm text-muted-foreground mb-md">
        This container is 350px wide to demonstrate horizontal scrolling
      </p>
      <TableResponsiveTyped {...args} />
    </div>
  )
}

// Hybrid mode with selective column hiding
export const Hybrid: Story = {
  args: {
    data: sampleData,
    columns: [
      {
        id: 'id',
        header: 'ID',
        accessor: (row: UserData) => row.id
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (row: UserData) => row.name
      },
      {
        id: 'email',
        header: 'Email',
        accessor: (row: UserData) => row.email,
        hideOnMobile: true
      },
      {
        id: 'status',
        header: 'Status',
        accessor: (row: UserData) => (
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
        )
      },
      {
        id: 'role',
        header: 'Role',
        accessor: (row: UserData) => row.role,
        hideOnMobile: true
      }
    ],
    mode: 'hybrid',
    variant: 'default',
    size: 'md',
    highlightOnHover: true
  },
  render: (args) => (
    <div className="max-w-[500px] mx-auto p-md border border-dashed border-muted">
      <p className="text-sm text-muted-foreground mb-md">
        Resize the window to see how only certain columns hide on mobile
      </p>
      <TableResponsiveTyped {...args} />
    </div>
  )
}

// With custom mobile renderer
export const CustomMobileRenderer: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'stack',
    mobileRowRenderer: (row: UserData) => (
      <div className="flex flex-col space-y-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-md">
            <span className="font-bold">{row.name}</span>
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
          </div>
          <div>#{row.id}</div>
        </div>
        <div className="text-sm text-muted-foreground">{row.email}</div>
        <div className="text-sm">Role: {row.role}</div>
        <div className="flex gap-sm mt-sm">
          <Button variant="tertiary" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button variant="tertiary" size="sm">
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button variant="primary" size="sm">
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    ),
    variant: 'default',
    size: 'md'
  }
}

// Different styling for cards
export const CustomCardStyling: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'stack',
    variant: 'default',
    size: 'md',
    mobileCardClassName: 'bg-muted shadow-sm rounded-lg border-primary/20 hover:border-primary transition-colors'
  }
}

// With expanded data set
export const ExpandedDataSet: Story = {
  args: {
    data: [
      ...sampleData,
      { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', status: 'Active', role: 'Designer' },
      { id: 7, name: 'David Lee', email: 'david@example.com', status: 'Inactive', role: 'Manager' },
      { id: 8, name: 'Lisa Wang', email: 'lisa@example.com', status: 'Pending', role: 'Developer' },
      { id: 9, name: 'Kevin Chen', email: 'kevin@example.com', status: 'Active', role: 'Support' },
      { id: 10, name: 'Amanda Taylor', email: 'amanda@example.com', status: 'Active', role: 'QA' }
    ],
    columns: standardColumns,
    mode: 'auto',
    variant: 'striped',
    size: 'md',
    highlightOnHover: true,
    stickyHeader: true,
    maxHeight: '400px'
  }
}

// Without mobile headers
export const WithoutMobileHeaders: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'stack',
    variant: 'default',
    size: 'md',
    showMobileHeaders: false
  }
}

// With different breakpoints
export const DifferentBreakpoint: Story = {
  args: {
    data: sampleData,
    columns: standardColumns,
    mode: 'auto',
    variant: 'default',
    size: 'md',
    breakpoint: 'lg' // Will switch to mobile layout at a larger screen size
  }
}

// Complex table with many columns
export const ComplexTable: Story = {
  args: {
    data: sampleData.map(item => ({
      ...item,
      lastLogin: `2023-05-${10 + item.id}`,
      department: ['Marketing', 'Engineering', 'Sales', 'Support', 'HR'][item.id - 1],
      salary: `$${60000 + (item.id * 5000)}`,
      location: ['New York', 'London', 'Tokyo', 'Berlin', 'Sydney'][item.id - 1]
    })),
    columns: [
      {
        id: 'id',
        header: 'ID',
        accessor: (row: UserData) => row.id
      },
      {
        id: 'name',
        header: 'Name',
        accessor: (row: UserData) => row.name
      },
      {
        id: 'email',
        header: 'Email',
        accessor: (row: UserData) => row.email,
        hideOnMobile: true
      },
      {
        id: 'status',
        header: 'Status',
        accessor: (row: UserData) => (
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
        )
      },
      {
        id: 'role',
        header: 'Role',
        accessor: (row: UserData) => row.role
      },
      {
        id: 'department',
        header: 'Department',
        accessor: (row: UserData) => row.department,
        hideOnMobile: true
      },
      {
        id: 'location',
        header: 'Location',
        accessor: (row: UserData) => row.location,
        hideOnMobile: true
      },
      {
        id: 'salary',
        header: 'Salary',
        accessor: (row: UserData) => row.salary,
        hideOnMobile: true
      },
      {
        id: 'lastLogin',
        header: 'Last Login',
        accessor: (row: UserData) => row.lastLogin,
        hideOnMobile: true
      }
    ],
    mode: 'auto',
    variant: 'bordered',
    size: 'md',
    highlightOnHover: true
  }
}