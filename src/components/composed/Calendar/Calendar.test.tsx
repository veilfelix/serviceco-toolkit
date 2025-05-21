import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from './Calendar'
import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'
import { initTestI18n } from '@/utils/i18n'

function renderWithProvider(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

describe('Calendar', () => {
  beforeEach(() => {
    initTestI18n({
      en: {
        composed: {
          calendar: {
            previousYear: 'Go to previous year',
            previousMonth: 'Go to previous month',
            goToToday: 'Go to today',
            today: 'Today',
            nextMonth: 'Go to next month',
            nextYear: 'Go to next year',
            selected: '(selected)'
          }
        },
        datePicker: {
          clearDate: 'Clear date',
          selectDate: 'Select date',
        },
        ui: {
          requiredIndicator: '*',
        },
      },
      fr: {
        composed: {
          calendar: {
            previousYear: 'Aller à l\'année précédente',
            previousMonth: 'Aller au mois précédent',
            goToToday: 'Aller à aujourd\'hui',
            today: 'Aujourd\'hui',
            nextMonth: 'Aller au mois suivant',
            nextYear: 'Aller à l\'année suivante',
            selected: '(sélectionné)'
          }
        },
        datePicker: {
          clearDate: 'Effacer la date',
          selectDate: 'Choisir une date',
        },
      },
    })
  })

  it('renders with default props', () => {
    renderWithProvider(<Calendar />)
    expect(screen.getByText(/^\w+ \d{4}$/)).toBeInTheDocument() // e.g. "May 2025"
  })

  it('displays weekday headers', () => {
    renderWithProvider(<Calendar />)
    const weekdayHeaders = screen.getAllByText(/^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/i)
    expect(weekdayHeaders.length).toBeGreaterThanOrEqual(7)
  })

  it('renders 42 day cells (6 weeks grid)', () => {
    renderWithProvider(<Calendar />)
    // Get all buttons that are for days, not navigation
    const dayButtons = screen.getAllByRole('button').filter(btn => {
      // Filter to get only buttons that are days (contain a number as text content)
      return /^\d+$/.test(btn.textContent || '')
    })
    expect(dayButtons.length).toBe(42)
  })  

  it('navigates to previous and next month', () => {
    renderWithProvider(<Calendar />)
    const initialLabel = screen.getByText(/^\w+ \d{4}$/).textContent

    const nextBtn = screen.getByLabelText(i18n.t('composed:calendar.nextMonth'))
    fireEvent.click(nextBtn)
    const newLabel = screen.getByText(/^\w+ \d{4}$/).textContent
    expect(newLabel).not.toBe(initialLabel)

    const prevBtn = screen.getByLabelText(i18n.t('composed:calendar.previousMonth'))
    fireEvent.click(prevBtn)
    expect(screen.getByText(initialLabel!)).toBeInTheDocument()
  })

  it('goes to today when clicking the Today button', () => {
    renderWithProvider(<Calendar month={0} year={2000} />)
    expect(screen.getByText('Jan 2000')).toBeInTheDocument()

    const todayBtn = screen.getByLabelText(i18n.t('composed:calendar.goToToday'))
    fireEvent.click(todayBtn)

    const today = new Date()
    const expectedLabel = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric'
    }).format(today)

    expect(screen.getByText(expectedLabel)).toBeInTheDocument()
  })

  it('disables days based on function', () => {
    renderWithProvider(<Calendar disabled={(d: { getDate: () => number }) => d.getDate() === 15} />)
    const day15 = screen.getAllByRole('button').find(btn =>
      btn.textContent === '15' && btn.getAttribute('aria-disabled') === 'true'
    )
    expect(day15).toBeDefined()
  })

  it('highlights today with ring class', () => {
    const today = new Date()
    renderWithProvider(<Calendar today={today} />)
    const todayButton = screen.getAllByRole('button').find(btn =>
      // Check for the today's day number
      btn.textContent === today.getDate().toString() &&
      // Make sure it has the ring class which is unique to today
      btn.className.includes('ring-1')
    )
    expect(todayButton).toHaveClass('ring-1')
  })

  it('highlights selected date', () => {
    const selected = new Date(2023, 5, 10)
    renderWithProvider(<Calendar month={5} year={2023} selected={selected} />)
    const selectedDay = screen.getAllByRole('button').find(btn =>
      btn.textContent === '10'
    )
    expect(selectedDay).toHaveClass('bg-calendar-selected-bg')
  })
})
