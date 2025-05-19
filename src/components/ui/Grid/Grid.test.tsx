import { render, screen } from '@testing-library/react'
import Grid from './Grid'

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div data-testid="item-1">Item 1</div>
        <div data-testid="item-2">Item 2</div>
      </Grid>
    )
    expect(screen.getByTestId('item-1')).toBeInTheDocument()
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
  })

  it('applies the default grid-cols-1 class', () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('grid-cols-1')
  })

  it('applies grid-cols-3 class for columns={3}', () => {
    const { container } = render(
      <Grid columns={3}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('grid-cols-3')
  })

  it('applies the default medium gap', () => {
    const { container } = render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('gap-md')
  })

  it('applies gap="xs" when specified', () => {
    const { container } = render(
      <Grid gap="xs">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('gap-xs')
  })

  it('applies gap="sm" when specified', () => {
    const { container } = render(
      <Grid gap="sm">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('gap-sm')
  })

  it('applies gap="lg" when specified', () => {
    const { container } = render(
      <Grid gap="lg">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('gap-lg')
  })

  it('applies different column and row gaps when specified', () => {
    const { container } = render(
      <Grid gapX="sm" gapY="lg">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('gap-x-sm')
    expect(container.firstChild).toHaveClass('gap-y-lg')
  })

  it('applies align="center" when specified', () => {
    const { container } = render(
      <Grid align="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('items-center')
  })

  it('applies justify="center" when specified', () => {
    const { container } = render(
      <Grid justify="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('justify-items-center')
  })

  it('applies grid-flow-row-dense when flow="row-dense"', () => {
    const { container } = render(
      <Grid flow="row-dense">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('grid-flow-row-dense')
  })

  it('applies responsive column classes', () => {
    const { container } = render(
      <Grid responsive={{ sm: 2, md: 3, lg: 4 }}>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('sm:grid-cols-2')
    expect(container.firstChild).toHaveClass('md:grid-cols-3')
    expect(container.firstChild).toHaveClass('lg:grid-cols-4')
  })

  it('renders as a different element when "as" prop is provided', () => {
    const { container } = render(
      <Grid as="section">
        <div>Item</div>
      </Grid>
    )
    expect(container.firstChild?.nodeName).toBe('SECTION')
  })

  it('merges custom className with default styles', () => {
    const { container } = render(
      <Grid className="custom-class">
        <div>Item</div>
      </Grid>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('passes additional props to the div element', () => {
    render(
      <Grid data-testid="grid-element">
        <div>Item</div>
      </Grid>
    )
    expect(screen.getByTestId('grid-element')).toBeInTheDocument()
  })
})