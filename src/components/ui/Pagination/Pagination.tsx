import { HTMLAttributes, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/utils/classNames'
import Button from '@/components/ui/Button/Button'
import Select, { SelectOption } from '@/components/ui/Select/Select'

export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Total number of pages
   */
  totalPages: number
  /**
   * Current page (1-based)
   */
  currentPage: number
  /**
   * Callback function when page changes
   */
  onPageChange: (page: number) => void
  /**
   * Number of pages to show on each side of the current page
   * @default 1
   */
  siblingCount?: number
  /**
   * Show first and last page buttons
   * @default true
   */
  showFirstLast?: boolean
  /**
   * Show previous and next page buttons
   * @default true
   */
  showPrevNext?: boolean
  /**
   * Current page size/limit
   */
  pageSize?: number
  /**
   * Available page size options
   */
  pageSizeOptions?: number[]
  /**
   * Callback function when page size changes
   */
  onPageSizeChange?: (pageSize: number) => void
  /**
   * Accessible label for pagination component
   * @default "Pagination"
   */
  ariaLabel?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * A component for navigating through paginated content.
 * 
 * Supports previous/next, first/last, ellipsis, and configurable page size selection.
 */
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  pageSize,
  pageSizeOptions,
  onPageSizeChange,
  ariaLabel = 'Pagination',
  className = '',
  ...props
}: PaginationProps) {
  // Validate props
  const validatedCurrentPage = Math.max(1, Math.min(currentPage, totalPages))
  const validatedSiblingCount = Math.max(1, siblingCount)

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page)
      }
    },
    [currentPage, onPageChange, totalPages]
  )

  const handlePageSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newSize = Number(event.target.value)
      if (onPageSizeChange && !isNaN(newSize)) {
        onPageSizeChange(newSize)
      }
    },
    [onPageSizeChange]
  )

  // Generate the range of page numbers to display
  const pageRange = useMemo(() => {
    // Always show at least siblingCount pages on each side when possible
    const startPage = Math.max(1, validatedCurrentPage - validatedSiblingCount)
    const endPage = Math.min(totalPages, validatedCurrentPage + validatedSiblingCount)
    
    // Create an array of pages to show
    const range: Array<number | 'ellipsis'> = []
    
    // Add first page if not already included and we need to show ellipsis
    if (startPage > 1) {
      range.push(1)
      if (startPage > 2) {
        range.push('ellipsis')
      }
    }
    
    // Add the range of pages
    for (let i = startPage; i <= endPage; i++) {
      range.push(i)
    }
    
    // Add last page if not already included and we need to show ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        range.push('ellipsis')
      }
      range.push(totalPages)
    }
    
    return range
  }, [validatedCurrentPage, totalPages, validatedSiblingCount])
  
  // If there's only one page, don't render pagination
  if (totalPages <= 1) {
    return null
  }

  const pageSizeSelectOptions: SelectOption[] = (pageSizeOptions ?? []).map((size) => ({
    value: size.toString(),
    label: size.toString(),
  }))  

  return (
    <nav
      aria-label={ariaLabel}
      className={cn('flex flex-wrap items-center justify-between gap-4', className)}
      {...props}
    >
      <div className="flex items-center flex-wrap">
        {/* First page button */}
        {showFirstLast && (
          <PaginationButton
            onClick={() => handlePageChange(1)}
            disabled={validatedCurrentPage === 1}
            aria-label="Go to first page"
            title="First page"
          >
            <ChevronsLeft className="h-[var(--pagination-icon-size)] w-[var(--pagination-icon-size)]" />
          </PaginationButton>
        )}
        
        {/* Previous page button */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => handlePageChange(validatedCurrentPage - 1)}
            disabled={validatedCurrentPage === 1}
            aria-label="Go to previous page"
            title="Previous page"
          >
            <ChevronLeft className="h-[var(--pagination-icon-size)] w-[var(--pagination-icon-size)]" />
          </PaginationButton>
        )}
        
        {/* Page numbers */}
        <div className="flex items-center">
          {pageRange.map((page, i) => 
            page === 'ellipsis' ? (
              <span 
                key={`ellipsis-${i}`}
                className="flex h-[var(--pagination-item-size)] w-[var(--pagination-item-size)] items-center justify-center text-[var(--pagination-font-size)]"
                aria-hidden="true"
              >
                &hellip;
              </span>
            ) : (
              <PaginationButton
                key={`page-${page}`}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={page === validatedCurrentPage ? 'page' : undefined}
                active={page === validatedCurrentPage}
              >
                {page}
              </PaginationButton>
            )
          )}
        </div>
        
        {/* Next page button */}
        {showPrevNext && (
          <PaginationButton
            onClick={() => handlePageChange(validatedCurrentPage + 1)}
            disabled={validatedCurrentPage === totalPages}
            aria-label="Go to next page"
            title="Next page"
          >
            <ChevronRight className="h-[var(--pagination-icon-size)] w-[var(--pagination-icon-size)]" />
          </PaginationButton>
        )}
        
        {/* Last page button */}
        {showFirstLast && (
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            disabled={validatedCurrentPage === totalPages}
            aria-label="Go to last page"
            title="Last page"
          >
            <ChevronsRight className="h-[var(--pagination-icon-size)] w-[var(--pagination-icon-size)]" />
          </PaginationButton>
        )}
      </div>
      
      {/* Page size selector */}
      {pageSize && pageSizeOptions && onPageSizeChange && (
        <div className="flex items-center gap-3">
          <label htmlFor="page-size-select" className="text-sm font-medium">
            Per page:
          </label>
          <Select
            id="page-size-select"
            options={pageSizeSelectOptions}
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            aria-label="Items per page"
            className="min-w-[var(--pagination-selector-min-width)]"
          />
        </div>
      )}
    </nav>
  )
}

// Helper component for pagination buttons
type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

function PaginationButton({ 
  active = false, 
  children, 
  className = '',
  ...props 
}: PaginationButtonProps) {
  return (
    <Button
      variant={active ? 'primary' : 'tertiary'}
      size="sm"
      className={cn(
        'h-8 w-8',
        'sm:h-[var(--pagination-item-size)] sm:w-[var(--pagination-item-size)] rounded-[var(--pagination-item-radius)] p-0 m-[var(--pagination-item-margin)] text-[var(--pagination-font-size)] font-[var(--pagination-font-weight)]',
        active && 'bg-[var(--pagination-active-bg)] text-[theme(pagination.active-text)]',
        !active && !props.disabled && 'hover:bg-[var(--pagination-hover-bg)]',
        props.disabled && 'opacity-[var(--pagination-disabled-opacity)]',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}