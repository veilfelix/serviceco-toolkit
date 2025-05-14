import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import DatePicker from './DatePicker'
import Button from '@/components/ui/Button/Button'
import Stack from '@/components/ui/Stack/Stack'

// Simple date utility functions to use instead of date-fns
const formatDate = (date: Date, formatStr: string): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  if (formatStr === 'yyyy-MM-dd') {
    return `${year}-${month}-${day}`
  } else if (formatStr === 'MM/dd/yyyy') {
    return `${month}/${day}/${year}`
  } else if (formatStr === 'MMM d, yyyy') {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[date.getMonth()]} ${date.getDate()}, ${year}`
  } else {
    return date.toLocaleDateString()
  }
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const subDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() - days)
  return result
}

const meta: Meta<typeof DatePicker> = {
  title: 'Composed/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'date',
      description: 'The selected date value',
    },
    minDate: {
      control: 'date', 
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date', 
    },
    locale: {
      control: 'text',
      description: 'Locale for date formatting',
    },
    time: {
      control: 'boolean',
      description: 'Include time selection',
    },
    format: {
      control: 'text',
      description: 'Date format string (date-fns format)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    label: {
      control: 'text', 
      description: 'Input label',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

// Base DatePicker with playground controls
export const Playground: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'MM/DD/YYYY',
    format: 'MM/dd/yyyy',
    error: false,
    disabled: false,
    required: false,
  },
}

// Basic usage example with useState
const BasicExample = () => {
  const [date, setDate] = useState<Date | null>(null)
  
  return (
    <div className="space-y-4 w-72">
      <DatePicker
        value={date}
        onChange={setDate}
        label="Event Date"
        placeholder="Select a date..."
      />
      
      <div className="text-sm">
        {date ? (
          <p>Selected date: {date.toLocaleDateString()}</p>
        ) : (
          <p>No date selected</p>
        )}
      </div>
    </div>
  )
}

export const Basic: Story = {
  render: () => <BasicExample />,
  parameters: {
    docs: {
      description: {
        story: 'A basic DatePicker with onChange handler to track selected date.',
      },
    },
  },
}

// DatePicker with custom format
const CustomFormatExample = () => {
  const formats = [
    'MM/dd/yyyy',
    'dd/MM/yyyy',
    'yyyy-MM-dd',
    'MMM d, yyyy',
    'MMMM do, yyyy',
    'EEEE, MMMM do, yyyy',
  ]
  
  const [date, setDate] = useState<Date | null>(new Date())
  const [selectedFormat, setSelectedFormat] = useState<string>(formats[0])
  
  return (
    <div className="space-y-4 w-80">
      <DatePicker
        value={date}
        onChange={setDate}
        label="Date with custom format"
        format={selectedFormat}
      />
      
      <div className="grid grid-cols-2 gap-2">
        {formats.map((fmt) => (
          <Button
            key={fmt}
            variant={selectedFormat === fmt ? 'primary' : 'tertiary'}
            size="sm"
            onClick={() => setSelectedFormat(fmt)}
          >
            {fmt}
          </Button>
        ))}
      </div>
      
      <div className="text-sm mt-2">
        {date && (
          <p>Formatted: {formatDate(date, selectedFormat)}</p>
        )}
      </div>
    </div>
  )
}

export const CustomFormat: Story = {
  render: () => <CustomFormatExample />,
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with different date format patterns to choose from.',
      },
    },
  },
}

// DatePicker with min and max dates
const MinMaxExample = () => {
  const today = new Date()
  const [date, setDate] = useState<Date | null>(today)
  
  const minDate = subDays(today, 7) // 7 days ago
  const maxDate = addDays(today, 30) // 30 days in future
  
  return (
    <div className="space-y-2 w-72">
      <DatePicker
        value={date}
        onChange={setDate}
        label="Restricted Date Range"
        minDate={minDate}
        maxDate={maxDate}
      />
      
      <div className="text-xs text-muted-foreground">
        <p>Only dates between {formatDate(minDate, 'MMM d, yyyy')} and {formatDate(maxDate, 'MMM d, yyyy')} can be selected.</p>
      </div>
    </div>
  )
}

export const MinMaxDates: Story = {
  render: () => <MinMaxExample />,
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with minimum and maximum selectable dates.',
      },
    },
  },
}

// Different states (error, disabled, required)
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-72">
      <DatePicker
        label="Normal State"
        placeholder="Select a date..."
      />
      
      <DatePicker
        label="Error State"
        placeholder="Select a date..."
        error={true}
        errorMessage="This field is required"
      />
      
      <DatePicker
        label="Disabled State"
        placeholder="Select a date..."
        disabled={true}
        value={new Date()}
      />
      
      <DatePicker
        label="Required Field"
        placeholder="Select a date..."
        required={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DatePicker shown in various states: normal, error, disabled, and required.',
      },
    },
  },
}

// DatePicker with localization
const LocalizationExample = () => {
  const locales = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'fr-FR', name: 'French' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'de-DE', name: 'German' },
    { code: 'ja-JP', name: 'Japanese' },
  ]
  
  const [date, setDate] = useState<Date | null>(new Date())
  const [locale, setLocale] = useState<string>('en-US')
  
  return (
    <div className="space-y-4 w-80">
      <DatePicker
        value={date}
        onChange={setDate}
        label={`Date (${locale})`}
        locale={locale}
        format="P" // Locale's default date format
      />
      
      <div className="flex flex-wrap gap-2">
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
    </div>
  )
}

export const Localization: Story = {
  render: () => <LocalizationExample />,
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with different locale options for internationalization.',
      },
    },
  },
}

// Form integration example
const FormIntegrationExample = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: null as Date | null,
    message: '',
  })
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    eventDate: '',
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors = {
      name: formData.name ? '' : 'Name is required',
      email: formData.email ? '' : 'Email is required',
      eventDate: formData.eventDate ? '' : 'Date is required',
    }
    
    setErrors(newErrors)
    
    if (!newErrors.name && !newErrors.email && !newErrors.eventDate) {
      alert(`Form submitted:\nName: ${formData.name}\nEmail: ${formData.email}\nDate: ${formData.eventDate?.toLocaleDateString()}`)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-80 p-4 border rounded-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name<span className="ml-1 text-destructive">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && (
          <div className="text-sm text-destructive mt-1">{errors.name}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email<span className="ml-1 text-destructive">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <div className="text-sm text-destructive mt-1">{errors.email}</div>
        )}
      </div>
      
      <DatePicker
        label="Event Date*"
        value={formData.eventDate}
        onChange={(date) => setFormData({...formData, eventDate: date})}
        error={!!errors.eventDate}
        errorMessage={errors.eventDate}
        format="MMM d, yyyy"
      />
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full border rounded px-3 py-2 h-24"
        />
      </div>
      
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  )
}

export const FormIntegration: Story = {
  render: () => <FormIntegrationExample />,
  parameters: {
    docs: {
      description: {
        story: 'DatePicker integrated into a form with validation and submission handling.',
      },
    },
  },
}

// Multiple DatePickers for start and end dates
const DateRangeExample = () => {
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  
  return (
    <div className="space-y-2 w-72">
      <Stack>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate || undefined}
          placeholder="Select start date"
        />
        
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || undefined}
          placeholder="Select end date"
          disabled={!startDate}
        />
      </Stack>
      
      {startDate && endDate && (
        <div className="text-sm mt-2">
          <p>Selected range: {formatDate(startDate, 'MMM d, yyyy')} to {formatDate(endDate, 'MMM d, yyyy')}</p>
        </div>
      )}
    </div>
  )
}

export const DateRange: Story = {
  render: () => <DateRangeExample />,
  parameters: {
    docs: {
      description: {
        story: 'Using two DatePickers to create a date range selector with constraints.',
      },
    },
  },
}