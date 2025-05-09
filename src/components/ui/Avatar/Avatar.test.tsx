import { render, screen } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('renders avatar with image correctly', () => {
    render(
      <Avatar>
        <Avatar.Image src="/test-image.jpg" alt="Test User" />
      </Avatar>
    )
    
    const image = screen.getByAltText('Test User')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('renders avatar with fallback correctly', () => {
    render(
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
    )
    
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { rerender, container } = render(
      <Avatar size="xs">
        <Avatar.Fallback>XS</Avatar.Fallback>
      </Avatar>
    )
    
    let avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('h-[var(--avatar-size-xs)] w-[var(--avatar-size-xs)]')
    
    rerender(
      <Avatar size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
    )
    avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('h-[var(--avatar-size-sm)] w-[var(--avatar-size-sm)]')
    
    rerender(
      <Avatar size="md">
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
    )
    avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('h-[var(--avatar-size-md)] w-[var(--avatar-size-md)]')
    
    rerender(
      <Avatar size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    )
    avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('h-[var(--avatar-size-lg)] w-[var(--avatar-size-lg)]')
    
    rerender(
      <Avatar size="xl">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    )
    avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('h-[var(--avatar-size-xl)] w-[var(--avatar-size-xl)]')
  })

  it('applies shape classes correctly', () => {
    const { rerender, container } = render(
      <Avatar shape="circle">
        <Avatar.Fallback>C</Avatar.Fallback>
      </Avatar>
    )
    
    let avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('rounded-full')
    
    rerender(
      <Avatar shape="square">
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
    )
    avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('rounded-[var(--radius-md)]')
  })

  it('applies bordered style when bordered is true', () => {
    const { container } = render(
      <Avatar bordered>
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar>
    )
    
    const avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('ring-[var(--avatar-border-width)]')
  })

  it('renders status indicator when status is not "none"', () => {
    const { rerender, container } = render(
      <Avatar status="online">
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar>
    )
    
    // Check for the status indicator
    let statusIndicator = container.querySelector('span')
    expect(statusIndicator).toBeInTheDocument()
    expect(statusIndicator?.className).toContain('bg-[hsl(var(--avatar-status-color-online))]')
    
    rerender(
      <Avatar status="offline">
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar>
    )
    statusIndicator = container.querySelector('span')
    expect(statusIndicator?.className).toContain('bg-[hsl(var(--muted-foreground))]')
    
    rerender(
      <Avatar status="away">
        <Avatar.Fallback>A</Avatar.Fallback>
      </Avatar>
    )
    statusIndicator = container.querySelector('span')
    expect(statusIndicator?.className).toContain('bg-[hsl(var(--avatar-status-color-away))]')
    
    rerender(
      <Avatar status="busy">
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar>
    )
    statusIndicator = container.querySelector('span')
    expect(statusIndicator?.className).toContain('bg-[hsl(var(--avatar-status-color-busy))]')
  })

  it('does not render status indicator when status is "none"', () => {
    const { container } = render(
      <Avatar status="none">
        <Avatar.Fallback>N</Avatar.Fallback>
      </Avatar>
    )
    
    const statusIndicator = container.querySelector('span')
    expect(statusIndicator).not.toBeInTheDocument()
  })

  it('applies fallback color schemes correctly', () => {
    const { rerender } = render(
      <Avatar>
        <Avatar.Fallback colorScheme="gray">G</Avatar.Fallback>
      </Avatar>
    )
    
    let fallback = screen.getByText('G')
    expect(fallback.className).toContain('bg-[hsl(var(--muted))]')
    
    rerender(
      <Avatar>
        <Avatar.Fallback colorScheme="primary">P</Avatar.Fallback>
      </Avatar>
    )
    fallback = screen.getByText('P')
    expect(fallback.className).toContain('bg-[hsl(var(--primary))]')
    
    rerender(
      <Avatar>
        <Avatar.Fallback colorScheme="secondary">S</Avatar.Fallback>
      </Avatar>
    )
    fallback = screen.getByText('S')
    expect(fallback.className).toContain('bg-[hsl(var(--secondary))]')
  })

  it('applies random color for random colorScheme', () => {
    // Since now we're using a semantic token for the random color
    render(
      <Avatar>
        <Avatar.Fallback colorScheme="random">R</Avatar.Fallback>
      </Avatar>
    )
    
    const fallback = screen.getByText('R')
    expect(fallback.className).toContain('bg-[hsl(var(--avatar-fallback-color-')
  })

  it('merges custom className with default styles for Avatar', () => {
    const { container } = render(
      <Avatar className="custom-avatar-class">
        <Avatar.Fallback>C</Avatar.Fallback>
      </Avatar>
    )
    
    const avatar = container.firstChild as HTMLElement
    expect(avatar.className).toContain('custom-avatar-class')
  })

  it('merges custom className with default styles for AvatarImage', () => {
    render(
      <Avatar>
        <Avatar.Image 
          src="/test-image.jpg" 
          alt="Test User" 
          className="custom-image-class" 
        />
      </Avatar>
    )
    
    const image = screen.getByAltText('Test User')
    expect(image.className).toContain('custom-image-class')
  })

  it('merges custom className with default styles for AvatarFallback', () => {
    render(
      <Avatar>
        <Avatar.Fallback className="custom-fallback-class">FB</Avatar.Fallback>
      </Avatar>
    )
    
    const fallbackContainer = screen.getByText('FB')
    expect(fallbackContainer.className).toContain('custom-fallback-class')
  })

  it('passes additional props to Avatar', () => {
    render(
      <Avatar data-testid="test-avatar">
        <Avatar.Fallback>TA</Avatar.Fallback>
      </Avatar>
    )
    
    expect(screen.getByTestId('test-avatar')).toBeInTheDocument()
  })

  it('passes additional props to AvatarImage', () => {
    render(
      <Avatar>
        <Avatar.Image 
          src="/test-image.jpg" 
          alt="Test User" 
          data-testid="test-image" 
        />
      </Avatar>
    )
    
    expect(screen.getByTestId('test-image')).toBeInTheDocument()
  })

  it('passes additional props to AvatarFallback', () => {
    render(
      <Avatar>
        <Avatar.Fallback data-testid="test-fallback">TF</Avatar.Fallback>
      </Avatar>
    )
    
    expect(screen.getByTestId('test-fallback')).toBeInTheDocument()
  })
})