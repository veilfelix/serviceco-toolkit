import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Pagination from '@/components/ui/Pagination/Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      description: 'Total number of pages',
      control: 'number',
      defaultValue: 10,
    },
    currentPage: {
      description: 'Current page (1-based)',
      control: 'number',
      defaultValue: 1,
    },
    onPageChange: {
      description: 'Callback function when page changes',
      action: 'page changed',
    },
    siblingCount: {
      description: 'Number of pages to show on each side of the current page',
      control: 'number',
      defaultValue: 1,
    },
    showFirstLast: {
      description: 'Show first and last page buttons',
      control: 'boolean',
      defaultValue: true,
    },
    showPrevNext: {
      description: 'Show previous and next page buttons',
      control: 'boolean',
      defaultValue: true,
    },
    pageSize: {
      description: 'Current page size/limit',
      control: 'number',
      defaultValue: 10,
    },
    pageSizeOptions: {
      description: 'Available page size options',
      control: { type: 'object' },
      defaultValue: [5, 10, 20, 50],
    },
    onPageSizeChange: {
      description: 'Callback function when page size changes',
      action: 'page size changed',
    },
    ariaLabel: {
      description: 'Accessible label for pagination component',
      control: 'text',
      defaultValue: 'Pagination',
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

// Base story with controls
export const Playground: Story = {
  args: {
    totalPages: 10,
    currentPage: 1,
    siblingCount: 1,
    showFirstLast: true,
    showPrevNext: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
  },
}

// Interactive Pagination Example using React state
export const InteractivePagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalItems = 243
  const totalPages = Math.ceil(totalItems / pageSize)

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="text-center">
        <p>Page {currentPage} of {totalPages}</p>
        <p>Showing {pageSize} items per page, {totalItems} total items</p>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}

// Variants

export const WithoutPageSize: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    pageSize: undefined,
    pageSizeOptions: undefined,
  },
}

export const ManyPages: Story = {
  args: {
    totalPages: 50,
    currentPage: 25,
  },
}

export const WithoutFirstLastButtons: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    showFirstLast: false,
  },
}

export const WithoutPrevNextButtons: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    showPrevNext: false,
  },
}

export const MinimalControls: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    showFirstLast: false,
    showPrevNext: false,
    pageSize: undefined,
    pageSizeOptions: undefined,
  },
}

export const LargerSiblingCount: Story = {
  args: {
    totalPages: 20,
    currentPage: 10,
    siblingCount: 3,
  },
}

export const CustomStyles: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    className: 'bg-gray-100 p-4 rounded-lg',
  },
}