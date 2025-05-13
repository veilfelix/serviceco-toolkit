import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Calendar, { CalendarEvent } from './Calendar'
import Button from '@/components/ui/Button/Button'
import { cn } from '@/utils/classNames'
import { Star, Bell, CalendarClock } from 'lucide-react'

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    month: {
      description: 'Initial displayed month (0-11)',
      control: { type: 'number', min: 0, max: 11 },
    },
    year: {
      description: 'Initial displayed year',
      control: { type: 'number', min: 2000, max: 2030 },
    },
    today: {
      description: 'Current date to highlight as "today"',
      control: 'date',
    },
    selected: {
      description: 'Selected date(s)',
      control: 'date',
    },
    disabled: {
      description: 'Dates that are disabled',
      control: 'object',
    },
    events: {
      description: 'Calendar events to display',
      control: 'object',
    },
    allowNavigation: {
      description: 'Allow navigation between months/years',
      control: 'boolean',
    },
    locale: {
      description: 'Locale for names and formatting',
      control: 'text',
    },
    firstDayOfWeek: {
      description: 'First day of the week (0 = Sunday, 1 = Monday)',
      control: { type: 'number', min: 0, max: 6 },
    },
  },
}

export default meta
type Story = StoryObj<typeof Calendar>

// Base story with controls
export const Playground: Story = {
  args: {
    today: new Date(),
    selected: null,
    disabled: [],
    events: [],
    allowNavigation: true,
    locale: 'en-US',
    firstDayOfWeek: 0,
  },
}

// Basic calendar example
export const BasicCalendar: Story = {
  render: () => <Calendar />,
  parameters: {
    docs: {
      description: {
        story: 'A basic calendar with default settings, showing the current month.',
      },
    },
  },
}

// Date selection example
const DateSelectionDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="space-y-4">
      <Calendar
        selected={selectedDate}
        onSelect={(date: Date) => setSelectedDate(date)}
      />

      <div className="text-center">
        {selectedDate ? (
          <p>Selected date: {selectedDate.toLocaleDateString()}</p>
        ) : (
          <p>No date selected</p>
        )}
      </div>
    </div>
  )
}

export const DateSelection: Story = {
  render: () => <DateSelectionDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with interactive date selection.',
      },
    },
  },
}

// Disabled dates example
export const DisabledDates: Story = {
  render: () => {
    // Disable weekends and specific dates
    const isWeekend = (date: Date) => {
      const day = date.getDay()
      return day === 0 || day === 6
    }
    
    const specificDates = [
      new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    ]
    
    const isDisabled = (date: Date) => {
      return isWeekend(date) || specificDates.some(
        disabledDate => 
          disabledDate.getDate() === date.getDate() &&
          disabledDate.getMonth() === date.getMonth() &&
          disabledDate.getFullYear() === date.getFullYear()
      )
    }
    
    return (
      <div className="space-y-4">
        <Calendar disabled={isDisabled} />
        <p className="text-sm text-muted-foreground">
          Weekends and the 15th/20th are disabled
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with disabled dates (weekends and specific dates).',
      },
    },
  },
}

const WithEventsDemo = () => {
  const today = new Date()
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()

  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(thisYear, thisMonth, 5),
      type: 'work',
    },
    {
      id: 2,
      title: 'Doctor Appointment',
      date: new Date(thisYear, thisMonth, 12),
      type: 'personal',
    },
    {
      id: 3,
      title: 'Conference',
      date: new Date(thisYear, thisMonth, 15),
      type: 'work',
    },
    {
      id: 4,
      title: 'Birthday Party',
      date: new Date(thisYear, thisMonth, 18),
      type: 'personal',
    },
  ]

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvents, setSelectedEvents] = useState<CalendarEvent[]>([])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)

    const eventsOnDate = events.filter((event) => {
      const eventDate = event.date
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      )
    })

    setSelectedEvents(eventsOnDate)
  }

  return (
    <div className="space-y-4">
      <Calendar
        events={events}
        onSelect={handleDateSelect}
        selected={selectedDate}
      />

      <div className="mt-4">
        {selectedDate && selectedEvents.length > 0 ? (
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">
              Events on {selectedDate.toLocaleDateString()}:
            </h3>
            <ul className="space-y-2">
              {selectedEvents.map((event) => (
                <li key={event.id} className="flex items-center gap-2">
                  {event.type === 'work' ? (
                    <CalendarClock className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Star className="h-4 w-4 text-yellow-500" />
                  )}
                  <span>{event.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : selectedDate ? (
          <p>No events on {selectedDate.toLocaleDateString()}</p>
        ) : (
          <p>Select a date to view events</p>
        )}
      </div>
    </div>
  )
}

export const WithEvents: Story = {
  render: () => <WithEventsDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with events that can be selected to view details.',
      },
    },
  },
}

// Custom rendering for days
export const CustomDayRendering: Story = {
  render: () => {
    const today = new Date()
    const thisMonth = today.getMonth()
    const thisYear = today.getFullYear()
    
    const importantDates = [
      new Date(thisYear, thisMonth, 5),
      new Date(thisYear, thisMonth, 15),
      new Date(thisYear, thisMonth, 25),
    ]
    
    const reminderDates = [
      new Date(thisYear, thisMonth, 10),
      new Date(thisYear, thisMonth, 20),
    ]
    
    const isImportantDate = (date: Date) => {
      return importantDates.some(
        importantDate => 
          importantDate.getDate() === date.getDate() &&
          importantDate.getMonth() === date.getMonth() &&
          importantDate.getFullYear() === date.getFullYear()
      )
    }
    
    const isReminderDate = (date: Date) => {
      return reminderDates.some(
        reminderDate => 
          reminderDate.getDate() === date.getDate() &&
          reminderDate.getMonth() === date.getMonth() &&
          reminderDate.getFullYear() === date.getFullYear()
      )
    }
    
    const renderDay = (day: Date) => {
      const dayNum = day.getDate()
      
      if (isImportantDate(day)) {
        return (
          <div className="flex flex-col items-center">
            <span>{dayNum}</span>
            <Star className="h-3 w-3 text-yellow-500" />
          </div>
        )
      }
      
      if (isReminderDate(day)) {
        return (
          <div className="flex flex-col items-center">
            <span>{dayNum}</span>
            <Bell className="h-3 w-3 text-red-500" />
          </div>
        )
      }
      
      return <span>{dayNum}</span>
    }
    
    return (
      <div className="space-y-4">
        <Calendar renderDay={renderDay} />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span>Important Date (5th, 15th, 25th)</span>
          </div>
          <div className="flex items-center gap-1">
            <Bell className="h-3 w-3 text-red-500" />
            <span>Reminder (10th, 20th)</span>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with custom rendering for specific days.',
      },
    },
  },
}

// Date range selection
const DateRangeSelectionDemo = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({
    from: new Date(),
    to: undefined,
  })

  const handleSelect = (date: Date) => {
    if (!dateRange.from) {
      setDateRange({ from: date, to: undefined })
      return
    }

    if (dateRange.from && !dateRange.to) {
      if (date < dateRange.from) {
        setDateRange({ from: date, to: dateRange.from })
      } else {
        setDateRange({ ...dateRange, to: date })
      }
      return
    }

    setDateRange({ from: date, to: undefined })
  }

  return (
    <div className="space-y-4">
      <Calendar
        selected={dateRange}
        onSelect={handleSelect}
      />

      <div className="text-center text-sm">
        {dateRange.from && !dateRange.to && (
          <p>
            Start date: {dateRange.from.toLocaleDateString()}
            <br />
            Click another date to select the end date
          </p>
        )}

        {dateRange.from && dateRange.to && (
          <p>
            Selected range: {dateRange.from.toLocaleDateString()} to{' '}
            {dateRange.to.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export const DateRangeSelection: Story = {
  render: () => <DateRangeSelectionDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with date range selection (start and end dates).',
      },
    },
  },
}

// Localized calendar example
const LocalizedCalendarDemo = () => {
  const [locale, setLocale] = useState('en-US')

  const locales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ar-SA', name: 'Arabic' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        {locales.map((l) => (
          <Button
            key={l.code}
            variant={locale === l.code ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => setLocale(l.code)}
          >
            {l.name}
          </Button>
        ))}
      </div>

      <Calendar
        locale={locale}
        firstDayOfWeek={locale === 'en-US' ? 0 : 1}
      />
    </div>
  )
}

export const LocalizedCalendar: Story = {
  render: () => <LocalizedCalendarDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar with different locales to display translated month/day names.',
      },
    },
  },
}

// Multiple months view
export const MultipleMonths: Story = {
  render: () => {
    const today = new Date()
    const thisMonth = today.getMonth()
    const thisYear = today.getFullYear()
    
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Calendar
          month={thisMonth}
          year={thisYear}
          allowNavigation={false}
        />
        
        <Calendar
          month={(thisMonth + 1) % 12}
          year={thisMonth === 11 ? thisYear + 1 : thisYear}
          allowNavigation={false}
        />
        
        <Calendar
          month={(thisMonth + 2) % 12}
          year={thisMonth >= 10 ? thisYear + 1 : thisYear}
          allowNavigation={false}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Display multiple months at once for date range planning.',
      },
    },
  },
}

// Calendar with custom styling
export const CustomStyling: Story = {
  render: () => {
    return (
      <Calendar
        className="custom-calendar max-w-md bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg rounded-xl p-1"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderDay={(day: { getDate: () => any }) => {
          const date = day.getDate()
          
          return (
            <div className={cn(
              'flex items-center justify-center h-full w-full rounded-full transition-transform hover:scale-110',
              date % 3 === 0 && 'text-blue-600 font-bold',
              date % 3 === 1 && 'text-green-600', 
              date % 3 === 2 && 'text-purple-600',
            )}>
              {date}
            </div>
          )
        }}
      />
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with custom styling for both the container and day cells.',
      },
    },
  },
}

// Calendar in a form
const CalendarInFormDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-4 border rounded-md p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Select a date
          </label>
          <div className="border rounded-md p-2">
            <Calendar
              selected={selectedDate}
              onSelect={(date: Date) => setSelectedDate(date)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Enter your message"
          />
        </div>

        <Button type="button" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  )
}

export const CalendarInForm: Story = {
  render: () => <CalendarInFormDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Calendar embedded in a form for date selection.',
      },
    },
  },
}

// Integration example with other components
const IntegrationExampleDemo = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const today = new Date()
  const thisMonth = today.getMonth()
  const thisYear = today.getFullYear()

  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(thisYear, thisMonth, 5, 10, 30),
      duration: 60,
      type: 'work',
    },
    {
      id: 2,
      title: 'Doctor Appointment',
      date: new Date(thisYear, thisMonth, 12, 15, 0),
      duration: 45,
      type: 'personal',
    },
    {
      id: 3,
      title: 'Conference',
      date: new Date(thisYear, thisMonth, 15, 9, 0),
      duration: 480,
      type: 'work',
    },
    {
      id: 4,
      title: 'Birthday Party',
      date: new Date(thisYear, thisMonth, 18, 18, 30),
      duration: 120,
      type: 'personal',
    },
  ]

  return (
    <div className="max-w-2xl border rounded-md shadow-md overflow-hidden">
      <div className="bg-primary text-primary-foreground p-4">
        <h2 className="text-xl font-semibold">Event Calendar</h2>
        <p className="text-sm opacity-90">Manage your schedule</p>
      </div>

      <div className="p-4">
        <Calendar
          events={events}
          selected={selectedDate}
          onSelect={(date: Date) => setSelectedDate(date)}
        />
      </div>
    </div>
  )
}

export const IntegrationExample: Story = {
  render: () => <IntegrationExampleDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete integration example showing calendar with multiple views and event details.',
      },
    },
  },
}
