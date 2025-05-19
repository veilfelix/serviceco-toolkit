import React, { forwardRef, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, TableHTMLAttributes } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/utils/classNames'

// Define common variants
export type TableVariant = 'default' | 'striped' | 'bordered' | 'minimal'
export type TableSize = 'sm' | 'md' | 'lg'

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  /**
   * Table content
   */
  children: React.ReactNode
  /**
   * Visual variant
   */
  variant?: TableVariant
  /**
   * Size variant
   */
  size?: TableSize
  /**
   * Make header sticky when scrolling. 
   * Only applies when `maxHeight` is defined.
   */
  stickyHeader?: boolean
  /**
   * Maximum height for the scrollable table container.
   * Only applies when `stickyHeader` is true.
   * Accepts any valid CSS value like "400px", "60vh", "25rem", etc.
   */
  maxHeight?: string
  /**
   * Enable hover state styling on rows
   */
  highlightOnHover?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Main Table component
 */
const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      stickyHeader = false,
      maxHeight,
      highlightOnHover = false,
      className,
      ...props
    },
    ref
  ) => {
    // Table variant styles
    const variantStyles: Record<TableVariant, string> = {
      default: 'border',
      striped: 'border [&>tbody>tr:nth-child(odd)]:bg-muted',
      bordered: 'border [&>thead>tr>th]:border [&>tbody>tr>td]:border',
      minimal: 'border-0'
    }

    // Table size styles
    const sizeStyles: Record<TableSize, string> = {
      sm: '[&>thead>tr>th]:px-2 [&>thead>tr>th]:py-sm [&>tbody>tr>td]:px-2 [&>tbody>tr>td]:py-sm text-sm',
      md: '[&>thead>tr>th]:px-md [&>thead>tr>th]:py-sm [&>tbody>tr>td]:px-md [&>tbody>tr>td]:py-sm',
      lg: '[&>thead>tr>th]:px-lg [&>thead>tr>th]:py-md [&>tbody>tr>td]:px-lg [&>tbody>tr>td]:py-md'
    }

    return (
      <div
        className={'relative w-full overflow-auto'}
        style={stickyHeader && maxHeight ? { maxHeight } : undefined}
      >
        <table
          ref={ref}
          className={cn(
            // Base styles
            'w-full border-collapse bg-background text-foreground',
            // Apply variant styles
            variantStyles[variant],
            // Apply size styles
            sizeStyles[size],
            // Apply hover effect if enabled
            highlightOnHover && '[&>tbody>tr:hover]:bg-muted/50',
            // Apply sticky header if enabled
            stickyHeader && '[&>thead]:sticky [&>thead]:top-0 [&>thead]:z-10 [&>thead]:bg-background',
            // Allow custom classes to override
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  }
)

Table.displayName = 'Table'

/**
 * Table header component
 */
const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('border-b font-medium', className)} {...props} />
  )
)

TableHeader.displayName = 'TableHeader'

/**
 * Table body component
 */
const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <tbody ref={ref} className={cn('', className)} {...props} />
)

TableBody.displayName = 'TableBody'

/**
 * Table footer component
 */
const TableFooter = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t bg-muted/50 font-medium text-foreground', className)}
      {...props}
    />
  )
)

TableFooter.displayName = 'TableFooter'

/**
 * Table row component
 */
const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn('border-b transition-colors data-[state=selected]:bg-muted', className)}
      {...props}
    />
  )
)

TableRow.displayName = 'TableRow'

/**
 * Table cell component
 */
const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn('align-middle [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
)

TableCell.displayName = 'TableCell'

/**
 * Table header cell component
 */
const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-10 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
)

TableHead.displayName = 'TableHead'

export interface TableSortableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * Current sort direction: 'asc', 'desc', or undefined (not sorted)
   */
  sortDirection?: 'asc' | 'desc' | undefined
  /**
   * Column name or ID for sorting reference
   */
  columnId?: string
  /**
   * Callback when sort direction is changed
   */
  onSort?: (columnId: string) => void
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Sortable table header cell component
 */
const TableSortableHeader = forwardRef<HTMLTableCellElement, TableSortableHeaderProps>(
  ({ children, sortDirection, columnId = '', onSort, className, ...props }, ref) => {
    const handleSort = () => {
      if (onSort && columnId) {
        onSort(columnId)
      }
    }

    return (
      <th
        ref={ref}
        className={cn(
          'group h-10 text-left align-middle font-medium cursor-pointer select-none',
          className
        )}
        onClick={handleSort}
        {...props}
      >
        <div className="flex items-center gap-1">
          {children}
          <span className="ml-1 flex items-center">
            {sortDirection === 'asc' ? (
              <ChevronUp className="h-4 w-4" />
            ) : sortDirection === 'desc' ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronsUpDown className="h-4 w-4 opacity-0 group-hover:opacity-50" />
            )}
          </span>
        </div>
      </th>
    )
  }
)

TableSortableHeader.displayName = 'TableSortableHeader'

// Attach all components to Table
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableHead,
  TableSortableHeader
}