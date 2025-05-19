import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/classNames'

export type SeparatorOrientation = 'horizontal' | 'vertical'
export type SeparatorThickness = 'thin' | 'regular' | 'thick'
export type SeparatorColor = 'default' | 'muted' | 'accent' | 'primary'

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the separator, either horizontal or vertical.
   * @default 'horizontal'
   */
  orientation?: SeparatorOrientation
  /**
   * Visual thickness of the separator.
   * @default 'regular'
   */
  thickness?: SeparatorThickness
  /**
   * Color theme of the separator.
   * @default 'default'
   */
  color?: SeparatorColor
  /**
   * Optional text label displayed in the center of a horizontal separator.
   * Ignored if orientation is vertical.
   */
  label?: string
  /**
   * Whether the separator is purely decorative (accessibility).
   * If true, it will not be announced by screen readers.
   * @default false
   */
  decorative?: boolean
  /**
   * Additional class names to apply to the separator.
   */
  className?: string
}


const Separator = forwardRef<HTMLDivElement, SeparatorProps>(({
  orientation = 'horizontal',
  thickness = 'regular',
  color = 'default',
  label,
  decorative = false,
  className,
  ...props
}, ref) => {
  const thicknessClass =
  orientation === 'horizontal'
    ? {
      thin: 'h-px min-h-[1px] w-full',
      regular: 'h-[var(--separator-thickness-regular)] min-h-[var(--separator-thickness-regular)] w-full',
      thick: 'h-[var(--separator-thickness-thick)] min-h-[var(--separator-thickness-thick)] w-full',
    }[thickness]
    : {
      thin: 'w-px min-w-[1px] h-full',
      regular: 'w-[var(--separator-thickness-regular)] min-w-[var(--separator-thickness-regular)] h-full',
      thick: 'w-[var(--separator-thickness-thick)] min-w-[var(--separator-thickness-thick)] h-full',
    }[thickness]

  const colorClass = {
    default: 'bg-border',
    muted: 'bg-muted',
    accent: 'bg-accent',
    primary: 'bg-primary',
  }[color]

  if (label && orientation === 'vertical') {
    console.warn('Separator with label only supports horizontal orientation')
  }

  const baseProps: HTMLAttributes<HTMLDivElement> = {
    ...props,
  }

  if (decorative) {
    baseProps['aria-hidden'] = 'true'
  } else {
    baseProps.role = 'separator'
    baseProps['aria-orientation'] = orientation
  }

  return label && orientation === 'horizontal' ? (
    <div ref={ref} className={cn('flex items-center gap-[var(--separator-gap)] min-h-[1.5em]', className)} {...baseProps}>
      <div className={cn('flex-1', thicknessClass, colorClass)} />
      <span className="text-sm text-muted-foreground whitespace-nowrap px-[var(--separator-label-padding-x)]">{label}</span>
      <div className={cn('flex-1', thicknessClass, colorClass)} />
    </div>
  ) : (
    <div className={cn(thicknessClass, colorClass, className)} {...baseProps} />
  )
})

Separator.displayName = 'Separator'

export default Separator
