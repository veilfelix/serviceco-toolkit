'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect if a media query matches
 * 
 * @param query The media query to match
 * @returns Boolean indicating if the query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Set initial value on mount
    const matchQueryList = window.matchMedia(query)
    setMatches(matchQueryList.matches)

    // Define the handler
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Subscribe to change event
    matchQueryList.addEventListener('change', handleChange)
    
    // Cleanup on unmount
    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}