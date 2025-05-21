'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { Toast, ToastAction, ToastProps, ToastVariant, ToastViewport } from './Toast'
import { useTranslation } from 'next-i18next'

export { Toast, ToastAction, ToastViewport }
export type { ToastProps, ToastVariant }

/**
 * Position options for the toast container
 */
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'

interface Toast {
  id: string
  props: Omit<ToastProps, 'id'>
}

/**
 * Toast context interface for managing toast notifications
 */
interface ToastContextValue {
  /**
   * Add a new toast notification
   */
  toast: (props: Omit<ToastProps, 'id'>) => string
  /**
   * Remove a toast by its ID
   */
  dismiss: (id: string) => void
  /**
   * Remove all current toasts
   */
  dismissAll: () => void
  /**
   * Current active toasts
   */
  toasts: Toast[]
}

// Create context with default values
const ToastContext = createContext<ToastContextValue>({
  toast: () => '',
  dismiss: () => {},
  dismissAll: () => {},
  toasts: [],
})

/**
 * Hook to use the toast functionality
 */
export const useToast = () => useContext(ToastContext)

/**
 * Position style map for toast viewport
 */
const POSITION_STYLES: Record<ToastPosition, string> = {
  'top-right': 'top-0 right-0 flex-col items-end',
  'top-left': 'top-0 left-0 flex-col items-start',
  'bottom-right': 'bottom-0 right-0 flex-col-reverse items-end',
  'bottom-left': 'bottom-0 left-0 flex-col-reverse items-start',
  'top-center': 'top-0 left-1/2 -translate-x-1/2 flex-col items-center',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center',
}

interface ToastProviderComponentProps {
  /**
   * Children to render
   */
  children: React.ReactNode
  /**
   * Position of toasts on the screen
   */
  position?: ToastPosition
  /**
   * Default duration for toasts
   */
  defaultDuration?: number
  /**
   * Default swipe direction based on position
   */
  swipeDirection?: 'right' | 'left' | 'up' | 'down'
  /**
   * Available hot keys - note: Radix UI accepts hotkeys in format { hide: string[] }
   * but we use { dismiss: string[] } for better semantics
   */
  hotkeys?: {
    dismiss?: string[]
  }
}

/**
 * Provider component with enhanced API for managing toast notifications
 */
export function ToastProviderComponent({
  children,
  position = 'top-right',
  defaultDuration = 5000,
  swipeDirection = 'right',
  hotkeys,
}: ToastProviderComponentProps) {
  const { t } = useTranslation('ui')
  const [toasts, setToasts] = useState<Toast[]>([])

  // Add a new toast
  const toast = useCallback((props: Omit<ToastProps, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast = {
      id,
      props: {
        ...props,
        duration: props.duration ?? defaultDuration,
      },
    }

    setToasts((prev) => [...prev, newToast])
    return id
  }, [defaultDuration])

  // Remove a toast by ID
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  // Remove all toasts
  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  // Determine swipe direction based on position if not explicitly set
  const getSwipeDirection = () => {
    if (swipeDirection) return swipeDirection
    
    if (position.includes('right')) return 'right'
    if (position.includes('left')) return 'left'
    if (position.includes('top')) return 'up'
    return 'down'
  }

  // Context value with toast management functions
  const contextValue = {
    toast,
    dismiss,
    dismissAll,
    toasts,
  }

  // We need to extract radix properties without hotkeys
  // as it's not part of the component's props type
  const providerProps: React.ComponentPropsWithoutRef<typeof ToastPrimitives.Provider> = {
    duration: defaultDuration,
    swipeDirection: getSwipeDirection(),
    label: t('toast.notifications'),
  }

  // Cast to any to allow hotkeys to be passed if defined
  const augmentedProps = hotkeys ? {
    ...providerProps,
    hotkeys: { hide: hotkeys.dismiss }
  } : providerProps

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastPrimitives.Provider 
        {...augmentedProps}
      >
        {children}
        {toasts.map(({ id, props }) => (
          <Toast
            key={id}
            {...props}
            onOpenChange={(open) => {
              if (!open) dismiss(id)
              props.onOpenChange?.(open)
            }}
          />
        ))}
        <ToastViewport className={POSITION_STYLES[position]} />
      </ToastPrimitives.Provider>
    </ToastContext.Provider>
  )
}

export function useSimplifiedToast() {
  const { toast } = useToast()

  return {
    show: (message: string, options?: Omit<ToastProps, 'children'>) => {
      return toast({ children: message, ...options })
    },
    success: (message: string, options?: Omit<ToastProps, 'children' | 'variant'>) => {
      return toast({ variant: 'success', children: message, ...options })
    },
    error: (message: string, options?: Omit<ToastProps, 'children' | 'variant'>) => {
      return toast({ variant: 'error', children: message, ...options })
    },
    warning: (message: string, options?: Omit<ToastProps, 'children' | 'variant'>) => {
      return toast({ variant: 'warning', children: message, ...options })
    },
    info: (message: string, options?: Omit<ToastProps, 'children' | 'variant'>) => {
      return toast({ variant: 'info', children: message, ...options })
    },
  }
}


/**
 * Main export for Toast Provider Component for improved DX
 */
export { ToastProviderComponent as ToastProvider }