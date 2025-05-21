'use client'

import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/classNames'
import Calendar from '@/components/composed/Calendar/Calendar'
import { Popover } from '@/components/composed/Popover/Popover'
import Input from '@/components/ui/Input/Input'
import Button from '@/components/ui/Button/Button'
import { format, parse, isValid, isDate } from 'date-fns'
import { enUS, frCA } from 'date-fns/locale'
import { useTranslation } from 'next-i18next'

export interface DatePickerProps {
  /**
   * The selected date value
   */
  value?: Date | string | null
  /**
   * Callback when date changes
   */
  onChange?: (date: Date | null) => void
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Locale for date formatting (default: 'en-US')
   */
  locale?: string
  /**
   * Include time selection
   */
  time?: boolean
  /**
   * Date format string (default: 'yyyy-MM-dd')
   */
  format?: string
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string
  /**
   * Input label
   */
  label?: string
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Required field
   */
  required?: boolean
  /**
   * Name attribute for the input
   */
  name?: string
  /**
   * ID attribute for the input
   */
  id?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Aria-label for the date picker
   */
  'aria-label'?: string
}

const resolveLocale = (locale: string) => {
  switch (locale) {
  case 'fr-CA':
    return frCA
  case 'en-US':
  default:
    return enUS
  }
}


/**
 * DatePicker component providing a form control for selecting dates, with optional time selection.
 * Integrates with the Calendar component and uses Popover for the dropdown interface.
 *
 * Example:
 * 
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onChange={(newDate) => setDate(newDate)}
 *   label="Event Date"
 *   format="MMM dd, yyyy"
 *   placeholder="Select a date..."
 * />
 * ```
 */
const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  value = null,
  onChange,
  minDate,
  maxDate,
  locale = 'en-US',
  time = false,
  format: formatString = 'yyyy-MM-dd',
  placeholder,
  label,
  error = false,
  errorMessage,
  disabled = false,
  required = false,
  name,
  id,
  className,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  const { t } = useTranslation('composed')

  const resolvedLocale = resolveLocale(locale)
  const resolvedFormat = formatString || 'P' // P = locale-aware pattern

  // Convert value to Date if it's a string
  const parseDate = (dateValue: Date | string | null): Date | null => {
    if (!dateValue) return null
    if (isDate(dateValue)) return dateValue as Date
    
    try {
      const parsedDate = parse(dateValue as string, formatString, new Date())
      return isValid(parsedDate) ? parsedDate : null
    } catch (e) {
      console.error(`Failed to parse date value "${dateValue}" using format "${formatString}"`, e)
      return null
    }
  }

  const [date, setDate] = useState<Date | null>(parseDate(value))
  const [inputValue, setInputValue] = useState<string>(
    date ? format(date, resolvedFormat, { locale: resolvedLocale }) : ''
  )
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resolvedPlaceholder = placeholder ?? format(new Date(2000, 0, 22), resolvedFormat, { locale: resolvedLocale })

  // Update internal state when value prop changes
  useEffect(() => {
    const newDate = parseDate(value)
    setDate(newDate)
    setInputValue(newDate ? format(newDate, resolvedFormat, { locale: resolvedLocale }) : '')
  // parseDate is defined inline and does not change — safe to omit from deps
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, formatString])

  // Handle selecting a date from the calendar
  const handleSelect = (selectedDate: Date) => {
    setDate(selectedDate)
    setInputValue(format(selectedDate, resolvedFormat, { locale: resolvedLocale }))
    
    if (onChange) {
      onChange(selectedDate)
    }
    
    if (!time) {
      setOpen(false)
    }
  }

  // Handle clearing the selected date
  const handleClear = () => {
    setDate(null)
    setInputValue('')
    
    if (onChange) {
      onChange(null)
    }
  }

  // Handle direct input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    try {
      if (value) {
        const parsed = parse(value, formatString, new Date())
        
        if (isValid(parsed)) {
          setDate(parsed)
          
          if (onChange) {
            onChange(parsed)
          }
        } else {
          setDate(null)
        }
      } else {
        setDate(null)
        
        if (onChange) {
          onChange(null)
        }
      }
    } catch (e) {
      console.error(`Invalid date input "${value}" — could not parse using format "${formatString}"`, e)
      // Invalid date format - keep the text but set date to null
      setDate(null)
    }
  }

  // Handle blur event for validation
  const handleBlur = () => {
    if (!date && inputValue) {
      // Reset invalid input
      setInputValue('')
    } else if (date) {
      // Format correctly on blur
      setInputValue(format(date, formatString))
    }
  }

  // Generate a unique ID for accessibility if not provided
  const uniqueId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`
  const labelId = `${uniqueId}-label`
  const inputId = uniqueId
  const errorId = `${uniqueId}-error`

  // Determine if the field is in an error state
  const hasError = error || !!(errorMessage && errorMessage.length > 0)

  return (
    <div 
      ref={ref} 
      className={cn(
        'flex flex-col w-[var(--datepicker-width)] max-w-[var(--datepicker-max-width)] gap-1',
        className
      )}
      {...props}
    >
      {/* Label */}
      {label && (
        <label 
          id={labelId}
          htmlFor={inputId}
          className={cn(
            'text-sm font-medium',
            hasError ? 'text-destructive' : 'text-foreground'
          )}
        >
          {label}{required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      
      {/* Date picker with popover */}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <div className="relative flex items-center">
          <Popover.Trigger asChild>
            <div className="relative w-full">
              <Input
                ref={inputRef}
                type="text"
                id={inputId}
                name={name}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder={resolvedPlaceholder}
                disabled={disabled}
                required={required}
                error={hasError}
                aria-invalid={hasError ? 'true' : 'false'}
                aria-describedby={hasError ? errorId : undefined}
                aria-label={ariaLabel || label || t('datePicker.dateSelection')}
                className={cn(
                  'pr-[var(--datepicker-input-padding-right)]'
                )}
              />
              <div className='absolute inset-y-0 right-0 flex items-center'>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => !disabled && setOpen(!open)}
                  className={cn(
                    'h-full w-[var(--datepicker-trigger-width)] text-[var(--datepicker-trigger-color)]'
                  )}
                  aria-label={t('datePicker.showCalendar')}
                  tabIndex={-1}
                >
                  <ChevronDown className='h-[var(--datepicker-icon-size)] w-[var(--datepicker-icon-size)]' />
                </Button>
              </div>
            </div>
          </Popover.Trigger>
          
          {inputValue && !disabled && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className={cn(
                'absolute right-[var(--datepicker-trigger-width)] h-full',
                'w-[var(--datepicker-clear-button-size)] text-[var(--datepicker-clear-color)]'
              )}
              aria-label={t('datePicker.clearDate')}
            >
              <X className="h-[var(--datepicker-clear-icon-size)] w-[var(--datepicker-clear-icon-size)]" />
            </Button>
          )}
        </div>
        
        <Popover.Content
          align="start"
          className={cn(
            'w-[var(--datepicker-dropdown-width)] p-[var(--datepicker-dropdown-padding)]',
            'shadow-[var(--datepicker-dropdown-shadow)]'
          )}
          sideOffset={4}
          showClose={false}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(calendarDate: Date) => {
              if (minDate && calendarDate < minDate) return true
              if (maxDate && calendarDate > maxDate) return true
              return false
            }}
            locale={locale}
            initialFocus
          />
          
          {/* Time selection could be added here if needed */}
          {time && date && (
            <div className="p-3 border-t border-border">
              {/* Time picker implementation */}
              <span className="text-sm text-muted-foreground">{t('datePicker.timeSelectionNotImplemented')}</span>
            </div>
          )}
        </Popover.Content>
      </Popover.Root>
      
      {/* Error message */}
      {hasError && errorMessage && (
        <div id={errorId} className="text-sm text-destructive mt-1">
          {errorMessage}
        </div>
      )}
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker