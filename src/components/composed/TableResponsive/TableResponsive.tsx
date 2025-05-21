'use client'

import React, { forwardRef, useState, useEffect, ReactNode, Ref, JSX } from 'react'
import { cn } from '@/utils/classNames'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableVariant,
  TableSize
} from '@/components/ui/Table/Table'

// Define display modes for the responsive table
export type TableResponsiveMode = 'auto' | 'stack' | 'scroll' | 'hybrid'

export interface ColumnDefinition<T> {
  /**
   * Unique identifier for the column
   */
  id: string
  /**
   * Header text to display
   */
  header: React.ReactNode
  /**
   * Optional custom accessor function to get cell data
   */
  accessor?: (row: T, index: number) => ReactNode;
  /**
   * Whether to hide this column on mobile
   * @default false
   */
  hideOnMobile?: boolean
  /**
   * Optional CSS classes to apply to cells in this column
   */
  className?: string
  /**
   * Optional CSS classes to apply to the header cell
   */
  headerClassName?: string
}

export interface TableResponsiveProps<T> {
  /**
   * Data array to render in the table
   */
  data: T[];
  /**
   * Column definitions that describe how to render each column
   */
  columns: ColumnDefinition<T>[];
  /**
   * Display mode for the responsive behavior
   * - 'auto' (default): Automatically switches between table and stacked card view based on screen width.
   * - 'stack': Always stack on mobile devices (card-like view)
   * - 'scroll': Always use horizontal scrolling
   * - `'hybrid'`: Keeps the table layout but hides selected columns on smaller screens (`hideOnMobile`).
   * @default 'auto'
   */
  mode?: TableResponsiveMode
  /**
   * Custom component to render for each mobile-stacked row
   * Takes the row data and renders a custom view
   */
  mobileRowRenderer?: (row: T, index: number) => React.ReactNode
  /**
   * Whether to show headers in stacked mobile view
   * @default true
   */
  showMobileHeaders?: boolean
  /**
   * The breakpoint at which to switch to mobile view
   * @default 'md'
   */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /**
   * Custom classes for mobile cards (only applies in stack mode)
   */
  mobileCardClassName?: string
  /**
   * Optional function to get a unique key for each row
   * @default (row, index) => index
   */
  getRowKey?: (row: T, index: number) => React.Key
  /**
   * Additional CSS classes
   */
  className?: string
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
}

/**
 * A high-level responsive table component that adapts to different screen sizes and display modes.
 *
 * This component renders a traditional `<Table>` layout on larger screens,
 * and switches to a stacked card view or horizontal scroll mode on smaller screens,
 * depending on the selected `mode`.
 *
 * ### Supported Modes:
 * - `'auto'` (default): Automatically switches between table and stacked card view based on screen width.
 * - `'stack'`: Always stack on mobile devices (card-like view)
 * - `'scroll'`: Always use horizontal scrolling
 * - `'hybrid'`: Keeps the table layout but hides selected columns on smaller screens (`hideOnMobile`).
 *
 * ### Features:
 * - Fully typed with generic `T` (data row type).
 * - Accepts a `columns` definition array with optional `accessor`.
 * - Optional `mobileRowRenderer` for full control over how stacked rows render on mobile.
 * - Responsive behavior based on Tailwind breakpoints (`sm`, `md`, etc.).
 *
 * ### Example Usage:
 *
 * ```tsx
 * <TableResponsive
 *   data={[{ id: 1, name: 'Alice' }]}
 *   columns={[
 *     { id: 'id', header: 'ID', accessor: (row) => row.id },
 *     { id: 'name', header: 'Name', accessor: (row) => row.name }
 *   ]}
 *   mode="auto"
 * />
 * ```
 *
 * ### Mobile View Example (with fallback rendering):
 * On small screens, when `mode` is set to `'stack'` or `'auto'`, data is rendered as vertical cards.
 * Each row is displayed as a list of key-value pairs using the column `header` as label.
 *
 * For example, this row:
 * `{ id: 1, name: 'Alice' }`  
 * with columns:
 * `[{ id: 'id', header: 'ID' }, { id: 'name', header: 'Name' }]`
 *
 * Will render as:
 * 
 * ID  
 * 1  
 *
 * Name  
 * Alice  
 *
 * This fallback rendering works out of the box using the column definitions.
 * 
 * Or, if a `mobileRowRenderer` is provided, you can override this layout completely.
 * This is useful when you want a more compact card UI, custom grouping, etc.
 *
 * **Note:** This component is **composed** and is best suited
 * for high-level page layouts or data-heavy modules that require responsive behavior out of the box.
 */
function TableResponsiveInner<T extends Record<string, unknown>>(
  {
    data = [],
    columns = [],
    mode = 'auto',
    mobileRowRenderer,
    showMobileHeaders = true,
    breakpoint = 'md',
    mobileCardClassName,
    getRowKey = (_, index) => index,
    variant = 'default',
    size = 'md',
    stickyHeader = false,
    maxHeight,
    highlightOnHover = false,
    className,
    ...props
  }: TableResponsiveProps<T>,
  ref: React.Ref<HTMLTableElement>
) {
  // State to track if we're in mobile view
  const [isMobileView, setIsMobileView] = useState(false)

  // Determine if we need to set up the resize observer
  useEffect(() => {
    if (mode === 'scroll') {
      // Always desktop view in scroll mode
      setIsMobileView(false)
      return
    }

    // Get the breakpoint value
    const breakpointValue = getComputedStyle(document.documentElement)
      .getPropertyValue(`--breakpoint-${breakpoint}`)
      .trim()

    // Create a resize handler to detect when we cross the breakpoint
    const checkForMobile = () => {
      const width = window.innerWidth
      const breakpointPixels = parseInt(breakpointValue, 10)
      setIsMobileView(width < breakpointPixels)
    }

    // Check once on mount
    checkForMobile()

    // Set up the resize handler
    window.addEventListener('resize', checkForMobile)

    // Clean up
    return () => {
      window.removeEventListener('resize', checkForMobile)
    }
  }, [mode, breakpoint])

  // Function to render a mobile card view
  const renderMobileCards = () => {
    return (
      <div className="w-full space-y-sm">
        {data.map((row, rowIndex) => {
          // If a custom mobile renderer is provided, use it
          if (mobileRowRenderer) {
            return (
              <div
                key={getRowKey(row, rowIndex)}
                className={cn(
                  'border rounded-md p-md bg-background',
                  mobileCardClassName
                )}
              >
                {mobileRowRenderer(row, rowIndex)}
              </div>
            )
          }

          // Otherwise, render the default stacked view
          return (
            <div
              key={getRowKey(row, rowIndex)}
              className={cn(
                'border rounded-md p-md bg-background',
                mobileCardClassName
              )}
            >
              <dl className="grid gap-y-sm">
                {columns
                  .filter(col => !col.hideOnMobile)
                  .map((column) => {
                    const cellValue = column.accessor
                      ? column.accessor(row, rowIndex)
                      : row[column.id]

                    return (
                      <div key={column.id} className="flex flex-col">
                        {showMobileHeaders && (
                          <dt className="font-medium text-sm text-muted-foreground mb-xs">
                            {column.header}
                          </dt>
                        )}
                        <dd className={cn('text-foreground', column.className)}>
                          {cellValue as React.ReactNode}
                        </dd>
                      </div>
                    )
                  })}
              </dl>
            </div>
          )
        })}
      </div>
    )
  }

  // Function to render the desktop table view
  const renderDesktopTable = () => {
    return (
      <Table
        ref={ref}
        variant={variant}
        size={size}
        stickyHeader={stickyHeader}
        maxHeight={maxHeight}
        highlightOnHover={highlightOnHover}
        className={className}
        {...props}
      >
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead
                key={column.id}
                className={cn(column.hideOnMobile && 'hidden md:table-cell', column.headerClassName)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={getRowKey(row, rowIndex)}>
              {columns.map(column => {
                const cellValue = column.accessor
                  ? column.accessor(row, rowIndex)
                  : row[column.id]

                return (
                  <TableCell
                    key={column.id}
                    className={cn(
                      column.hideOnMobile && 'hidden md:table-cell',
                      column.className
                    )}
                  >
                    {cellValue as React.ReactNode}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  // Function to render the hybrid mode
  const renderHybridTable = () => {
    // In hybrid mode, we render a horizontally scrollable table,
    // but some columns can be hidden on smaller screens using `hideOnMobile`.
    // Unlike `stack` mode, the layout stays tabular — it doesn't switch to vertical cards.
    return (
      <div className="w-full overflow-auto">
        <Table
          ref={ref}
          variant={variant}
          size={size}
          stickyHeader={stickyHeader}
          maxHeight={maxHeight}
          highlightOnHover={highlightOnHover}
          className={cn('min-w-full', className)}
          {...props}
        >
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.id}
                  className={cn(column.hideOnMobile && 'hidden md:table-cell', column.headerClassName)}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={getRowKey(row, rowIndex)}>
                {columns.map(column => {
                  const cellValue = column.accessor
                    ? column.accessor(row, rowIndex)
                    : row[column.id]

                  return (
                    <TableCell
                      key={column.id}
                      className={cn(
                        column.hideOnMobile && 'hidden md:table-cell',
                        column.className
                      )}
                    >
                      {cellValue as React.ReactNode}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  // Determine which render function to use based on mode and current view
  const renderTableContent = () => {
    if (mode === 'scroll') {
      return (
        <div className="w-full overflow-auto">
          {renderDesktopTable()}
        </div>
      )
    } else if (mode === 'hybrid') {
      return renderHybridTable()
    } else if (mode === 'stack' && isMobileView) {
      return renderMobileCards()
    } else if (mode === 'auto') {
      return isMobileView ? renderMobileCards() : renderDesktopTable()
    }

    // Default to desktop view
    return renderDesktopTable()
  }

  return (
    <div className="w-full">
      {renderTableContent()}
    </div>
  )
}

const TableResponsive = forwardRef(TableResponsiveInner) as <T>(
  props: TableResponsiveProps<T> & { ref?: Ref<HTMLTableElement> }
) => JSX.Element

export default TableResponsive