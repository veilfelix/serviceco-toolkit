import React from 'react'
import { render, screen } from '@testing-library/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbEllipsis } from './Breadcrumb'

describe('Breadcrumb', () => {
  it('renders a breadcrumb navigation with correct ARIA attributes', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/products">Products</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
      </Breadcrumb>
    )

    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(nav).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    
    const currentPageItem = screen.getByText('Current Page')
    expect(currentPageItem).toHaveAttribute('aria-current', 'page')
  })

  it('renders with custom separator', () => {
    render(
      <Breadcrumb separator=">">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Current Page</BreadcrumbItem>
      </Breadcrumb>
    )

    const separator = screen.getByText('>')
    expect(separator).toBeInTheDocument()
  })

  it('renders with ellipsis for truncated paths', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbEllipsis />
        <BreadcrumbItem href="/products/category">Category</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Product</BreadcrumbItem>
      </Breadcrumb>
    )

    const ellipsis = screen.getByText('...')
    expect(ellipsis).toBeInTheDocument()
  })

  it('applies custom className to components', () => {
    const { container } = render(
      <Breadcrumb className="custom-breadcrumb">
        <BreadcrumbItem href="/" className="custom-item">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent className="custom-current">Current Page</BreadcrumbItem>
      </Breadcrumb>
    )

    expect(container.querySelector('.custom-breadcrumb')).toBeInTheDocument()
    expect(container.querySelector('.custom-item')).toBeInTheDocument()
    expect(container.querySelector('.custom-current')).toBeInTheDocument()
  })
})