import { render, screen } from '@testing-library/react'
import Layout from '@/components/Layout/Layout'
import React from 'react'

// Mock Header and Footer to isolate Layout rendering
jest.mock('./Header/Header', () => {
  const MockHeader = () => <header data-testid="mock-header">Header</header>
  MockHeader.displayName = 'MockHeader'
  return MockHeader
})
  
jest.mock('./Footer/Footer', () => {
  const MockFooter = () => <footer data-testid="mock-footer">Footer</footer>
  MockFooter.displayName = 'MockFooter'
  return MockFooter
})

describe('Layout', () => {
  it('renders Header, children, and Footer in correct order', () => {
    render(
      <Layout>
        <div data-testid="layout-children">Page Content</div>
      </Layout>
    )

    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
    expect(screen.getByTestId('layout-children')).toBeInTheDocument()
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
  })
})
