import clsx, { ClassValue } from 'clsx'

/**
 * Utility function to conditionally join CSS class names together
 */
export function cn(...classes: ClassValue[]) {
  return clsx(classes)
}