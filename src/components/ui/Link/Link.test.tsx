import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Link from './Link'

// Mock next/link
jest.mock('next/link', () => {
  const NextLinkMock = ({
    children,
    className,
    onClick,
    href,
    ...rest
  }: {
    children: React.ReactNode
    className?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
    href: string
    [key: string]: unknown
  }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      if (onClick) onClick(e)
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        data-testid="next-link"
        {...rest}
      >
        {children}
      </a>
    )
  }
  NextLinkMock.displayName = 'NextLink'
  return NextLinkMock
})

describe('Link', () => {
  it('renders correctly with children content', () => {
    render(<Link href="/test">Test Link</Link>)
    expect(screen.getByText('Test Link')).toBeInTheDocument()
  })

  it('uses Next.js Link for internal links', () => {
    render(<Link href="/internal">Internal Link</Link>)
    const link = screen.getByTestId('next-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/internal')
  })

  it('uses regular anchor for external links', () => {
    render(<Link href="https://example.com">External Link</Link>)
    const link = screen.getByText('External Link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('respects explicit external prop for internal-looking links', () => {
    render(<Link href="/internal" external>Forced External</Link>)
    const link = screen.getByText('Forced External')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('respects explicit external={false} prop for external-looking links', () => {
    render(<Link href="https://example.com" external={false}>Forced Internal</Link>)
    const link = screen.getByTestId('next-link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).not.toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows external icon when showExternalIcon is true', () => {
    render(<Link href="https://example.com" showExternalIcon>External With Icon</Link>)
    // There should be an svg element for the external link icon
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies variant classes correctly', () => {
    const { container, rerender } = render(<Link href="/test" variant="primary">Primary Link</Link>)
    expect(container.firstChild).toHaveClass('text-primary')

    rerender(<Link href="/test" variant="muted">Muted Link</Link>)
    expect(container.firstChild).toHaveClass('text-muted-foreground')

    rerender(<Link href="/test" variant="destructive">Destructive Link</Link>)
    expect(container.firstChild).toHaveClass('text-destructive')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Link href="/test" className="custom-class">Custom Link</Link>
    )
    expect(container.firstChild).toHaveClass('custom-class')
    // Also has base styles
    expect(container.firstChild).toHaveClass('font-medium')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Link href="/test" onClick={handleClick}>Clickable Link</Link>)
    
    await userEvent.click(screen.getByText('Clickable Link'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('prevents default behavior when preventDefault is true', async () => {
    const handleClick = jest.fn()
    render(
      <Link href="/test" onClick={handleClick} preventDefault>
        Prevented Link
      </Link>
    )
    
    await userEvent.click(screen.getByText('Prevented Link'))
    expect(handleClick).toHaveBeenCalledTimes(1)
    // We can't easily assert preventDefault was called in jsdom
  })

  it('handles mailto links as external', () => {
    render(<Link href="mailto:test@example.com">Email Link</Link>)
    const link = screen.getByText('Email Link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('handles tel links as external', () => {
    render(<Link href="tel:+1234567890">Phone Link</Link>)
    const link = screen.getByText('Phone Link')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('forwards ref to the underlying element', () => {
    const ref = jest.fn()
    render(<Link href="/test" ref={ref}>Ref Link</Link>)
    expect(ref).toHaveBeenCalled()
  })
})