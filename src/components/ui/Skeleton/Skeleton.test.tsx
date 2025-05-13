import { render, screen } from '@testing-library/react'
import Skeleton from './Skeleton'

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { container } = render(<Skeleton />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveClass('bg-skeleton-bg')
    expect(skeleton).toHaveClass('rounded-[var(--skeleton-border-radius)]') // rect shape by default
    expect(skeleton).toHaveClass('animate-pulse') // pulse animation by default
    expect(skeleton).toHaveAttribute('aria-hidden', 'true') // accessibility
  })

  it('renders with rect shape', () => {
    const { container } = render(<Skeleton shape="rect" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveClass('rounded-[var(--skeleton-border-radius)]')
  })

  it('renders with text shape', () => {
    const { container } = render(<Skeleton shape="text" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveClass('rounded-[var(--skeleton-border-radius)]')
  })

  it('renders with circle shape', () => {
    const { container } = render(<Skeleton shape="circle" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveClass('rounded-[var(--skeleton-circle-border-radius)]')
  })

  it('applies pulse animation styles', () => {
    const { container } = render(<Skeleton animation="pulse" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('applies wave animation styles', () => {
    const { container } = render(<Skeleton animation="wave" />)
    const skeleton = container.firstChild as HTMLElement
    
    // Check that the wave animation class is applied
    expect(skeleton.className).toContain('[&::before]:absolute')
    expect(skeleton.className).toContain('[&::before]:animate-')
  })

  it('applies no animation when specified', () => {
    const { container } = render(<Skeleton animation="none" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).not.toHaveClass('animate-pulse')
    expect(skeleton.className).not.toContain('[&::before]:animate-')
  })

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width="200px" height="100px" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveStyle('width: 200px')
    expect(skeleton).toHaveStyle('height: 100px')
  })

  it('applies numeric width and height as pixels', () => {
    const { container } = render(<Skeleton width={200} height={100} />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveStyle('width: 200px')
    expect(skeleton).toHaveStyle('height: 100px')
  })

  it('renders multiple skeleton items with specified count', () => {
    const { container } = render(<Skeleton count={3} />)
    
    // The container should be a flex div with children
    const skeletonContainer = container.firstChild as HTMLElement
    expect(skeletonContainer).toHaveClass('flex')
    expect(skeletonContainer.childNodes.length).toBe(3)
  })

  it('applies custom gap between multiple items', () => {
    const { container } = render(<Skeleton count={2} gap="1rem" />)
    const skeletonContainer = container.firstChild as HTMLElement
    
    expect(skeletonContainer).toHaveStyle('gap: 1rem')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(<Skeleton className="custom-class" />)
    const skeleton = container.firstChild as HTMLElement
    
    expect(skeleton).toHaveClass('custom-class')
    expect(skeleton).toHaveClass('bg-skeleton-bg') // Still has default class
  })

  it('passes additional props to the div element', () => {
    render(<Skeleton data-testid="test-skeleton" />)
    
    expect(screen.getByTestId('test-skeleton')).toBeInTheDocument()
  })
})