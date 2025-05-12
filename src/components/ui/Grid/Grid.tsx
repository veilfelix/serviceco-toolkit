import { ElementType, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto-fill' | 'auto-fit'
export type GridGap = 'xs' | 'sm' | 'md' | 'lg' | 'none'
export type GridAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type GridJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type GridResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type GridFlow = 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense'
export type GridAutoColumns = 'auto' | 'min' | 'max' | 'fr'
export type GridAutoRows = 'auto' | 'min' | 'max' | 'fr'

interface BaseGridProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to be arranged in the grid
   */
  children: ReactNode

  /**
   * The number of columns to create
   * Special values:
   * - 'auto-fill': Create as many columns as can fit with the minmax settings
   * - 'auto-fit': Create as many columns as can fit, collapsing empty columns
   * @default 1
   */
  columns?: GridColumns

  /**
   * The number of columns at each breakpoint
   * e.g., { sm: 2, md: 3, lg: 4 }
   */
  responsive?: Partial<Record<GridResponsiveBreakpoint, GridColumns>>

  /**
   * The gap between grid items
   * @default 'md'
   */
  gap?: GridGap

  /**
   * Different column and row gap values
   * e.g., { column: 'md', row: 'lg' }
   */
  gapX?: GridGap
  gapY?: GridGap
  
  /**
   * Cross-axis alignment of children (align-items)
   * @default 'stretch'
   */
  align?: GridAlign
  
  /**
   * Main-axis alignment of children (justify-items)
   * @default 'start'
   */
  justify?: GridJustify
  
  /**
   * Flow direction of the grid
   */
  flow?: GridFlow
  
  /**
   * Minimum size of auto-generated columns (for auto-fill/auto-fit)
   * @default '250px'
   */
  minColWidth?: string
  
  /**
   * Additional CSS class to apply
   */
  className?: string
}

interface AsComponentProps extends BaseGridProps {
  /**
   * Render the grid as a different HTML element
   * @default 'div'
   */
  as?: ElementType
}

export type GridProps = AsComponentProps

/**
 * Grid component for creating flexible grid layouts with CSS Grid.
 * Supports fixed column counts, responsive behavior, and auto-fill/auto-fit layouts.
 *
 * Example:
 *
 * ```tsx
 * <Grid columns={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * <Grid 
 *   columns="auto-fill" 
 *   minColWidth="200px" 
 *   gap="lg"
 *   responsive={{ md: 2, lg: 3 }}
 * >
 *   <ProductCard />
 *   <ProductCard />
 * </Grid>
 * ```
 *
 * For full documentation, see: ./docs/grid-stack-system.md
 */
const Grid = forwardRef<HTMLElement, GridProps>(
  (
    {
      children,
      columns = 1,
      responsive,
      gap = 'md',
      gapX,
      gapY,
      align = 'stretch',
      justify = 'start',
      flow,
      minColWidth = '250px',
      className = '',
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    // Only show children if there are any
    const hasChildren = Boolean(
      children && 
      ((Array.isArray(children) && children.length > 0) || 
      (!Array.isArray(children) && children))
    )

    // Gap utilities based on the theme tokens
    const gapStyles: Record<GridGap, string> = {
      xs: 'gap-xs',
      sm: 'gap-sm',
      md: 'gap-md',
      lg: 'gap-lg',
      none: 'gap-0'
    }

    // Column gap utilities
    const colGapStyles: Record<GridGap, string> = {
      xs: 'gap-x-xs',
      sm: 'gap-x-sm',
      md: 'gap-x-md',
      lg: 'gap-x-lg',
      none: 'gap-x-0'
    }

    // Row gap utilities
    const rowGapStyles: Record<GridGap, string> = {
      xs: 'gap-y-xs',
      sm: 'gap-y-sm',
      md: 'gap-y-md',
      lg: 'gap-y-lg',
      none: 'gap-y-0'
    }

    // Alignment utilities (align-items)
    const alignStyles: Record<GridAlign, string> = {
      'start': 'items-start',
      'center': 'items-center',
      'end': 'items-end',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline'
    }

    // Justify utilities (justify-items)
    const justifyStyles: Record<GridJustify, string> = {
      'start': 'justify-items-start',
      'center': 'justify-items-center',
      'end': 'justify-items-end',
      'between': '',
      'around': '',
      'evenly': ''
    }

    // Grid flow utilities
    const flowStyles: Record<GridFlow, string> = {
      'row': 'grid-flow-row',
      'col': 'grid-flow-col',
      'dense': 'grid-flow-dense',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense'
    }

    // Explicitly map cols classes to make sure Tailwind compiles them
    const staticColumnClasses: Record<number, string> = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    }
    
    // Generate grid columns class
    const getGridColumns = (cols: GridColumns): string => {
      if (typeof cols === 'number') {
        return staticColumnClasses[cols] || 'grid-cols-1'
      }
      
      return 'grid-cols-1'
    }
    
    // Generate responsive grid columns classes
    const getResponsiveClasses = (): string[] => {
      if (!responsive) return []
      
      const breakpoints = Object.keys(responsive) as GridResponsiveBreakpoint[]
      return breakpoints.map(breakpoint => {
        const breakpointCols = responsive[breakpoint]
        if (!breakpointCols) return ''
        return `${breakpoint}:${getGridColumns(breakpointCols)}`
      }).filter(Boolean)
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'grid',
          typeof columns === 'number' ? `grid-cols-${columns}` : '',
          gapX ? colGapStyles[gapX] : gapY ? colGapStyles[gap] : gapStyles[gap],
          gapY ? rowGapStyles[gapY] : gapX ? rowGapStyles[gap] : '',
          alignStyles[align],
          justifyStyles[justify],
          flow ? flowStyles[flow] : '',
          ...getResponsiveClasses(),
          className
        )}
        style={
          typeof columns === 'string' && (columns === 'auto-fill' || columns === 'auto-fit')
            ? { gridTemplateColumns: `repeat(${columns}, minmax(${minColWidth}, 1fr))` }
            : undefined
        }
        {...props}
      >
        {hasChildren ? children : null}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'

export default Grid