import { ElementType, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'none'
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type StackResponsiveBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface BaseStackProps extends HTMLAttributes<HTMLElement> {
  /**
   * The content to be arranged in the stack
   */
  children: ReactNode
  /**
   * The direction to arrange children - vertical (column) or horizontal (row)
   * @default 'column'
   */
  direction?: StackDirection
  /**
   * The amount of space between child elements
   * @default 'md'
   */
  gap?: StackGap
  /**
   * Cross-axis alignment of children
   * @default 'stretch'
   */
  align?: StackAlign
  /**
   * Main-axis alignment of children
   * @default 'start'
   */
  justify?: StackJustify
  /**
   * Additional CSS class to apply
   */
  className?: string
  /**
   * Breakpoint at which to switch from vertical to horizontal layout
   * Only applies when direction starts as 'column'
   */
  directionBreakpoint?: StackResponsiveBreakpoint
}

interface AsComponentProps extends BaseStackProps {
  /**
   * Render the stack as a different HTML element
   * @default 'div'
   */
  as?: ElementType
}

export type StackProps = AsComponentProps

/**
 * Stack component to arrange children vertically or horizontally with consistent spacing.
 * By default, it creates a vertical stack. For horizontal stacks, set `direction="row"`.
 *
 * Example:
 *
 * ```tsx
 * <Stack gap="md">
 *   <Button>First item</Button>
 *   <Button>Second item</Button>
 * </Stack>
 *
 * <Stack direction="row" gap="sm" align="center">
 *   <Spinner size="sm" />
 *   <p>Loading...</p>
 * </Stack>
 * ```
 *
 * For full documentation, see: ./docs/grid-stack-system.md
 */
const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      children,
      direction = 'column',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      className = '',
      directionBreakpoint,
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

    // Skip gap styling when there's only a single child or no children
    // to avoid unnecessary spacing
    const hasMultipleChildren = Array.isArray(children) && children.length > 1

    // Gap utilities based on the theme tokens
    const gapStyles: Record<StackGap, string> = {
      xs: 'gap-xs',
      sm: 'gap-sm',
      md: 'gap-md',
      lg: 'gap-lg',
      none: 'gap-0'
    }

    // Direction utilities 
    const directionStyles: Record<StackDirection, string> = {
      'row': 'flex-row',
      'column': 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse'
    }

    // Alignment utilities
    const alignStyles: Record<StackAlign, string> = {
      'start': 'items-start',
      'center': 'items-center',
      'end': 'items-end',
      'stretch': 'items-stretch',
      'baseline': 'items-baseline'
    }

    // Justify utilities
    const justifyStyles: Record<StackJustify, string> = {
      'start': 'justify-start',
      'center': 'justify-center',
      'end': 'justify-end',
      'between': 'justify-between',
      'around': 'justify-around',
      'evenly': 'justify-evenly'
    }

    // Responsive direction change
    let responsiveDirection = ''
    if (directionBreakpoint && direction === 'column') {
      responsiveDirection = `${directionBreakpoint}:flex-row`
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'flex',
          directionStyles[direction],
          hasMultipleChildren && gapStyles[gap],
          alignStyles[align],
          justifyStyles[justify],
          responsiveDirection,
          className
        )}
        {...props}
      >
        {hasChildren ? children : null}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'

export default Stack