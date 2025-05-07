import { HTMLAttributes, forwardRef, JSX } from 'react'
import { cn } from '@/utils/classNames'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Card component with a compound component pattern for flexible layout.
 *
 * Example:
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <Card.Title>Card Title</Card.Title>
 *     <Card.Description>Card description text</Card.Description>
 *   </Card.Header>
 *   <Card.Content>Main content goes here</Card.Content>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)] border border-[hsl(var(--border))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] shadow',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card header content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-[var(--spacing-md)]', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Card title content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <h3
        ref={ref}
        className={cn('text-[var(--font-lg)] font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
    )
  }
)

CardTitle.displayName = 'CardTitle'

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Card description content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <p
        ref={ref}
        className={cn('text-[var(--font-sm)] text-[hsl(var(--muted-foreground))]', className)}
        {...props}
      >
        {children}
      </p>
    )
  }
)

CardDescription.displayName = 'CardDescription'

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={cn('p-[var(--spacing-md)] pt-0', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardContent.displayName = 'CardContent'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card footer content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref): JSX.Element => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-[var(--spacing-md)] pt-0', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardFooter.displayName = 'CardFooter'

interface CardComponent extends ReturnType<typeof forwardRef<HTMLDivElement, CardProps>> {
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Content: typeof CardContent
  Footer: typeof CardFooter
}

const CardWithSubcomponents = Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}) as CardComponent

export default CardWithSubcomponents