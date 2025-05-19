import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from './Calendar'

describe('Calendar', () => {
  it('renders with default props', () => {
    render(<Calendar />)
    expect(screen.getByText(/^\w+ \d{4}$/)).toBeInTheDocument() // e.g. "May 2025"
  })

  it('displays weekday headers', () => {
    render(<Calendar />)
    const weekdayHeaders = screen.getAllByText(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/i)
    expect(weekdayHeaders.length).toBeGreaterThanOrEqual(7)
  })

  it('renders 42 day cells (6 weeks grid)', () => {
    render(<Calendar />)
    const dayButtons = screen.getAllByRole('button').filter(btn =>
      btn.getAttribute('aria-label')?.match(/\d{4}-\d{2}-\d{2}/)
    )
    expect(dayButtons.length).toBe(42)
  })  

  it('navigates to previous and next month', () => {
    render(<Calendar />)
    const initialLabel = screen.getByText(/^\w+ \d{4}$/).textContent

    const nextBtn = screen.getByLabelText('Go to next month')
    fireEvent.click(nextBtn)
    const newLabel = screen.getByText(/^\w+ \d{4}$/).textContent
    expect(newLabel).not.toBe(initialLabel)

    const prevBtn = screen.getByLabelText('Go to previous month')
    fireEvent.click(prevBtn)
    expect(screen.getByText(initialLabel!)).toBeInTheDocument()
  })

  it('goes to today when clicking the Today button', () => {
    render(<Calendar month={0} year={2000} />)
    expect(screen.getByText('Jan 2000')).toBeInTheDocument()

    const todayBtn = screen.getByLabelText('Go to today')
    fireEvent.click(todayBtn)

    const today = new Date()
    const expectedLabel = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(today)

    expect(screen.getByText(expectedLabel)).toBeInTheDocument()
  })

  it('disables days based on function', () => {
    render(<Calendar disabled={(d: { getDate: () => number }) => d.getDate() === 15} />)
    const day15 = screen.getAllByRole('button').find(btn =>
      btn.textContent === '15' && btn.getAttribute('aria-disabled') === 'true'
    )
    expect(day15).toBeDefined()
  })

  it('highlights today with ring class', () => {
    const today = new Date()
    render(<Calendar today={today} />)
    const todayButton = screen.getAllByRole('button').find(btn =>
      btn.getAttribute('aria-label')?.includes(today.toLocaleDateString())
    )
    expect(todayButton).toHaveClass('ring-1')
  })

  it('highlights selected date', () => {
    const selected = new Date(2023, 5, 10)
    render(<Calendar month={5} year={2023} selected={selected} />)
    const selectedDay = screen.getAllByRole('button').find(btn =>
      btn.textContent === '10'
    )
    expect(selectedDay).toHaveClass('bg-calendar-selected-bg')
  })
})
