import { render, screen, fireEvent } from '@testing-library/react'
import ButtonLink from './ButtonLink'

describe('ButtonLink', () => {
  it('renders correctly with text', () => {
    render(<ButtonLink href="#">Visit site</ButtonLink>)
    const link = screen.getByText('Visit site')
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '#')
  })

  it('prevents default on click when disabled', () => {
    const handleClick = jest.fn()
    render(
      <ButtonLink href="#" disabled onClick={handleClick}>
        Disabled
      </ButtonLink>
    )

    const link = screen.getByText('Disabled')
    fireEvent.click(link)
    expect(handleClick).not.toHaveBeenCalled()
    expect(link).toHaveAttribute('aria-disabled', 'true')
    expect(link).toHaveAttribute('tabindex', '-1')
  })

  it('applies custom className', () => {
    render(
      <ButtonLink href="#" className="custom-class">
        Click
      </ButtonLink>
    )
    expect(screen.getByText('Click')).toHaveClass('custom-class')
  })
})
