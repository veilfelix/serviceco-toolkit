import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination', () => {
  const defaultProps = {
    totalPages: 10,
    currentPage: 5,
    onPageChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(<Pagination {...defaultProps} />)
    
    // Should have first, prev, next, last controls
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument()
    
    // Current page should be marked as current
    const currentPageButton = screen.getByLabelText('Page 5')
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
    
    // Should have neighboring pages
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 6')).toBeInTheDocument()
  })

  it('does not render if only one page exists', () => {
    const { container } = render(<Pagination totalPages={1} currentPage={1} onPageChange={jest.fn()} />)
    expect(container.firstChild).toBeNull()
  })

  it('calls onPageChange when a page is clicked', () => {
    render(<Pagination {...defaultProps} />)
    
    fireEvent.click(screen.getByLabelText('Page 6'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(6)
    
    fireEvent.click(screen.getByLabelText('Go to next page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(6)
    
    fireEvent.click(screen.getByLabelText('Go to previous page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4)
    
    fireEvent.click(screen.getByLabelText('Go to first page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1)
    
    fireEvent.click(screen.getByLabelText('Go to last page'))
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(10)
  })

  it('disables navigation buttons appropriately', () => {
    render(<Pagination totalPages={10} currentPage={1} onPageChange={jest.fn()} />)
    
    expect(screen.getByLabelText('Go to first page')).toBeDisabled()
    expect(screen.getByLabelText('Go to previous page')).toBeDisabled()
    expect(screen.getByLabelText('Go to next page')).not.toBeDisabled()
    expect(screen.getByLabelText('Go to last page')).not.toBeDisabled()
  })

  it('renders with custom siblingCount', () => {
    render(<Pagination {...defaultProps} siblingCount={2} />)
    
    // Should show more neighboring pages
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 4')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 6')).toBeInTheDocument()
    expect(screen.getByLabelText('Page 7')).toBeInTheDocument()
  })

  it('hides first/last buttons when showFirstLast is false', () => {
    render(<Pagination {...defaultProps} showFirstLast={false} />)
    
    expect(screen.queryByLabelText('Go to first page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Go to last page')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument()
  })

  it('hides prev/next buttons when showPrevNext is false', () => {
    render(<Pagination {...defaultProps} showPrevNext={false} />)
    
    expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Go to first page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to last page')).toBeInTheDocument()
  })

  it('displays page size selector when props are provided', () => {
    const onPageSizeChange = jest.fn()
    render(
      <Pagination
        {...defaultProps}
        pageSize={10}
        pageSizeOptions={[5, 10, 20, 50]}
        onPageSizeChange={onPageSizeChange}
      />
    )
    
    const selector = screen.getByLabelText('Items per page')
    expect(selector).toBeInTheDocument()
    expect(selector).toHaveValue('10')
    
    // Test page size change
    fireEvent.change(selector, { target: { value: '20' } })
    expect(onPageSizeChange).toHaveBeenCalledWith(20)
  })

  it('does not display page size selector when required props are missing', () => {
    render(<Pagination {...defaultProps} />)
    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument()
    
    render(<Pagination {...defaultProps} pageSize={10} />)
    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument()
    
    render(<Pagination {...defaultProps} pageSize={10} pageSizeOptions={[5, 10, 20]} />)
    expect(screen.queryByLabelText('Items per page')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Pagination {...defaultProps} className="custom-class" />)
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('uses custom aria-label', () => {
    render(<Pagination {...defaultProps} ariaLabel="Custom pagination" />)
    expect(screen.getByLabelText('Custom pagination')).toBeInTheDocument()
  })

  it('handles ellipsis display correctly', () => {
    render(<Pagination totalPages={20} currentPage={10} siblingCount={1} onPageChange={jest.fn()} />)
    
    // Should show ellipsis for distant pages
    const ellipsisElements = screen.getAllByText('…')
    expect(ellipsisElements.length).toBe(2) // One for start, one for end
  })
})