import React, { useState, useEffect, useMemo, forwardRef, createContext, useContext } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { cn } from '@/utils/classNames'
import Button from '@/components/ui/Button/Button'

// Types
export interface CalendarEvent {
  /**
   * Event ID
   */
  id: string | number
  /**
   * Event title displayed on the calendar
   */
  title: string
  /**
   * Date of the event
   */
  date: Date
  /**
   * Optional additional event data
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type CalendarDate = Date | string | number
export type DateRange = { from: CalendarDate; to?: CalendarDate }

// Context for sharing calendar state
interface CalendarContextType {
  /**
   * Current date being viewed
   */
  currentDate: Date
  /**
   * Selected date(s)
   */
  selected: CalendarDate | DateRange | CalendarDate[] | null
  /**
   * Function to update selected date(s)
   */
  onSelect: (date: CalendarDate) => void
  /**
   * Disabled dates array or function
   */
  disabled?: (date: Date) => boolean
  /**
   * Array of calendar events
   */
  events?: CalendarEvent[]
  /**
   * Function to render custom day content
   */
  renderDay?: (day: Date) => React.ReactNode
  /**
   * Function to check if a day has events
   */
  hasEvents: (date: Date) => boolean
  /**
   * Get events for a specific day
   */
  getEventsForDay: (date: Date) => CalendarEvent[]
  /**
   * Current locale
   */
  locale: string
}

const CalendarContext = createContext<CalendarContextType | null>(null)

// Hook to use the calendar context
export const useCalendar = () => {
  const context = useContext(CalendarContext)
  if (!context) {
    throw new Error('useCalendar must be used within a Calendar component')
  }
  return context
}

// Props type definitions
export interface CalendarProps {
  /**
   * Initial displayed month
   */
  month?: number
  /**
   * Initial displayed year
   */
  year?: number
  /**
   * Current date to highlight as "today"
   */
  today?: Date
  /**
   * Selected date(s)
   */
  selected?: CalendarDate | DateRange | CalendarDate[] | null
  /**
   * Function to call when a date is selected
   */
  onSelect?: (date: CalendarDate) => void
  /**
   * Dates that are disabled and cannot be selected
   */
  disabled?: CalendarDate[] | ((date: Date) => boolean)
  /**
   * Calendar events to display
   */
  events?: CalendarEvent[]
  /**
   * Custom function to render day cells
   */
  renderDay?: (day: Date) => React.ReactNode
  /**
   * Allow navigation to previous/next months
   */
  allowNavigation?: boolean
  /**
   * Locale for names and formatting (default: 'en-US')
   */
  locale?: string
  /**
   * First day of the week (0 = Sunday, 1 = Monday, etc.)
   */
  firstDayOfWeek?: number
  /**
   * Custom className for styling
   */
  className?: string
  /**
   * Additional props
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

/**
 * Calendar component that renders a month view with selectable dates, navigation, and event display.
 */
const Calendar = forwardRef<HTMLDivElement, CalendarProps>(({
  month,
  year,
  today = new Date(),
  selected = null,
  onSelect = () => {},
  disabled,
  events = [],
  renderDay,
  allowNavigation = true,
  locale = 'en-US',
  firstDayOfWeek = 0, // 0 = Sunday
  className,
  ...props
}, ref) => {
  // State for managing the calendar
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date()
    return new Date(
      year ?? now.getFullYear(),
      month ?? now.getMonth(),
      1
    )
  })
  
  // Update state when props change
  useEffect(() => {
    if (month !== undefined || year !== undefined) {
      const newYear = year ?? currentDate.getFullYear()
      const newMonth = month ?? currentDate.getMonth()
      const newDate = new Date(newYear, newMonth, 1)
  
      if (
        newDate.getFullYear() !== currentDate.getFullYear() ||
        newDate.getMonth() !== currentDate.getMonth()
      ) {
        setCurrentDate(newDate)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, year])
  
  
  
  // Check if a date should be disabled
  const isDisabled = (date: Date): boolean => {
    if (!disabled) return false
    
    if (typeof disabled === 'function') {
      return disabled(date)
    }
    
    if (Array.isArray(disabled)) {
      return disabled.some(disabledDate => {
        const disabledDateObj = disabledDate instanceof Date
          ? disabledDate
          : new Date(disabledDate)
        
        return (
          disabledDateObj.getDate() === date.getDate() &&
          disabledDateObj.getMonth() === date.getMonth() &&
          disabledDateObj.getFullYear() === date.getFullYear()
        )
      })
    }
    
    return false
  }
  
  // Check if a date is selected
  const isSelected = (date: Date): boolean => {
    if (!selected) return false
    
    if (selected instanceof Date) {
      return (
        selected.getDate() === date.getDate() &&
        selected.getMonth() === date.getMonth() &&
        selected.getFullYear() === date.getFullYear()
      )
    }
    
    if (Array.isArray(selected)) {
      return selected.some(selectedDate => {
        const selectedDateObj = selectedDate instanceof Date 
          ? selectedDate 
          : new Date(selectedDate)
        
        return (
          selectedDateObj.getDate() === date.getDate() &&
          selectedDateObj.getMonth() === date.getMonth() &&
          selectedDateObj.getFullYear() === date.getFullYear()
        )
      })
    }
    
    if (typeof selected === 'object' && 'from' in selected) {
      const fromDate = selected.from instanceof Date 
        ? selected.from 
        : new Date(selected.from)
      
      const toDate = selected.to 
        ? (selected.to instanceof Date ? selected.to : new Date(selected.to)) 
        : fromDate
      
      const dateTime = date.getTime()
      return dateTime >= fromDate.getTime() && dateTime <= toDate.getTime()
    }
    
    return false
  }
  
  // Check if a date is today
  const isToday = (date: Date): boolean => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }
  
  // Determine if a day is in the current month
  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentDate.getMonth()
  }
  
  // Check if a date has events
  const hasEvents = (date: Date): boolean => {
    return events.some((event: CalendarEvent) => {
      const eventDate = event.date instanceof Date ? event.date : new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }
  
  // Get all events for a specific day
  const getEventsForDay = (date: Date): CalendarEvent[] => {
    return events.filter((event: CalendarEvent) => {
      const eventDate = event.date instanceof Date ? event.date : new Date(event.date)
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })
  }
  
  // Handle date selection
  const handleDateSelect = (date: CalendarDate) => {
    // Convert to Date object if it's not already one
    const dateObj = date instanceof Date ? date : new Date(date)
    
    if (isDisabled(dateObj)) return
    
    onSelect(date)
  }
  
  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }
  
  const goToNextMonth = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }
  
  const goToPreviousYear = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(newDate.getFullYear() - 1)
      return newDate
    })
  }
  
  const goToNextYear = () => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate)
      newDate.setFullYear(newDate.getFullYear() + 1)
      return newDate
    })
  }
  
  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
  }
  
  // Generate calendar days
  const calendarDays = useMemo(() => {
    const days: Date[] = []
    
    // Get first day of the month
    const firstDayOfMonth = new Date(currentDate)
    
    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfMonthIndex = firstDayOfMonth.getDay()
    
    // Adjust for first day of week setting
    firstDayOfMonthIndex = (firstDayOfMonthIndex + 7 - firstDayOfWeek) % 7
    
    // Get last day of the month
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )
    
    // Get total days in the month
    const daysInMonth = lastDayOfMonth.getDate()
    
    // Get the days from the previous month to fill the first week
    const prevMonth = new Date(currentDate)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    
    const daysInPrevMonth = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth() + 1,
      0
    ).getDate()
    
    // Add days from previous month
    for (let i = firstDayOfMonthIndex - 1; i >= 0; i--) {
      const day = new Date(
        prevMonth.getFullYear(),
        prevMonth.getMonth(),
        daysInPrevMonth - i
      )
      days.push(day)
    }
    
    // Add days from the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      )
      days.push(day)
    }
    
    // Add days from the next month to complete the grid
    const totalDaysNeeded = 42 // 6 rows of 7 days
    const daysToAdd = totalDaysNeeded - days.length
    
    const nextMonth = new Date(currentDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    
    for (let i = 1; i <= daysToAdd; i++) {
      const day = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        i
      )
      days.push(day)
    }
    
    return days
  }, [currentDate, firstDayOfWeek])
  
  // Generate weekday names
  const weekdayNames = useMemo(() => {
    const weekdays = []
    const date = new Date(2023, 0, 1) // Sunday
    
    // Adjust to the first day of the week
    date.setDate(date.getDate() + firstDayOfWeek)
    
    for (let i = 0; i < 7; i++) {
      weekdays.push(
        new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(date)
      )
      date.setDate(date.getDate() + 1)
    }
    
    return weekdays
  }, [locale, firstDayOfWeek])
  
  // Format the month and year for display
  const formattedMonthYear = new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(currentDate)
  
  // Context value
  const contextValue: CalendarContextType = {
    currentDate,
    selected,
    onSelect: handleDateSelect,
    disabled: isDisabled,
    events,
    renderDay,
    hasEvents,
    getEventsForDay,
    locale
  }

  const buttonClasses = 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50'
  
  return (
    <CalendarContext.Provider value={contextValue}>
      <div 
        ref={ref}
        className={cn(
          'rounded-[var(--calendar-border-radius)] border border-border shadow-[var(--calendar-shadow)] bg-background',
          'w-[var(--calendar-width)] max-w-[var(--calendar-max-width)]',
          className
        )}
        {...props}
      >
        {/* Calendar Header */}
        <div className="flex flex-row items-center justify-center p-[var(--calendar-header-padding)] border-b border-border">
          <div className="font-[var(--calendar-heading-font-weight)] font-sm">
            {formattedMonthYear}
          </div>
          {allowNavigation && (
            <div className="flex items-center space-x-1 pl-2">
              <Button
                variant="primary"
                size="sm"
                aria-label="Go to previous year"
                onClick={goToPreviousYear}
                className={cn(
                  'p-1',
                  buttonClasses
                )}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                aria-label="Go to previous month"
                onClick={goToPreviousMonth}
                className={cn(
                  'p-1',
                  buttonClasses
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                aria-label="Go to today"
                onClick={goToToday}
                className={cn(
                  'text-xs px-2 py-1',
                  buttonClasses
                )}
              >
                Today
              </Button>
              <Button
                variant="primary"
                size="sm"
                aria-label="Go to next month"
                onClick={goToNextMonth}
                className={cn(
                  'p-1',
                  buttonClasses
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="primary"
                size="sm"
                aria-label="Go to next year bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/50"
                onClick={goToNextYear}
                className={cn(
                  'p-1',
                  buttonClasses
                )}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Calendar Body */}
        <div className="p-1">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center mb-1">
            {weekdayNames.map((weekday, i) => (
              <div
                key={`weekday-${i}`}
                className="text-[var(--calendar-weekday-font-size)] font-[var(--calendar-weekday-font-weight)] text-calendar-weekday py-2"
              >
                {weekday}
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              const isDisabledDay = isDisabled(day)
              const isSelectedDay = isSelected(day)
              const isTodayDay = isToday(day)
              const hasEventsOnDay = hasEvents(day)
              const isDayInCurrentMonth = isCurrentMonth(day)
              
              return (
                <CalendarDay
                  key={`day-${i}`}
                  day={day}
                  disabled={isDisabledDay}
                  isSelected={isSelectedDay}
                  isToday={isTodayDay}
                  hasEvents={hasEventsOnDay}
                  isCurrentMonth={isDayInCurrentMonth}
                  onClick={() => handleDateSelect(day)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </CalendarContext.Provider>
  )
})

Calendar.displayName = 'Calendar'

// Calendar Day component
interface CalendarDayProps {
  day: Date
  disabled?: boolean
  isSelected?: boolean
  isToday?: boolean
  hasEvents?: boolean
  isCurrentMonth?: boolean
  onClick: () => void
}

export function CalendarDay({
  day,
  disabled = false,
  isSelected = false,
  isToday = false,
  hasEvents = false,
  isCurrentMonth = true,
  onClick,
}: CalendarDayProps) {
  const { renderDay } = useCalendar()
  
  const dayClasses = cn(
    'relative flex items-center justify-center rounded-[var(--calendar-border-radius)] h-[var(--calendar-cell-size)] w-full',
    'font-medium text-[var(--calendar-day-font-size)] transition-colors duration-[var(--calendar-transition-duration)]',
    'cursor-pointer select-none',
    {
      'bg-calendar-selected-bg text-calendar-selected-text': isSelected,
      'ring-1 ring-inset ring-calendar-today-border': isToday && !isSelected,
      'text-foreground': isCurrentMonth && !isSelected && !disabled,
      'opacity-[var(--calendar-outside-month-opacity)]': !isCurrentMonth,
      'pointer-events-none opacity-[var(--calendar-disabled-opacity)]': disabled,
      'hover:bg-calendar-day-hover': !isSelected && !disabled,
    }
  )
  
  const formattedDay = day.getDate()
  
  return (
    <div
      role="button"
      aria-disabled={disabled}
      aria-label={`${day.toLocaleDateString()} ${isSelected ? '(selected)' : ''}`}
      tabIndex={disabled ? -1 : 0}
      className={dayClasses}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {renderDay ? (
        renderDay(day)
      ) : (
        <>
          <span>{formattedDay}</span>
          {hasEvents && (
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-calendar-event-bg" />
          )}
        </>
      )}
    </div>
  )
}

export default Calendar