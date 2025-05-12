/**
 * Utility functions for image handling
 * This module contains safe, performance-friendly utilities for image operations.
 */

/**
 * Mock blur data URLs for different types of images
 * These can be used in storybook stories and tests
 */
export const mockBlurData = {
  landscape: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiM3NGI5ZmYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjMjU2N2E3IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDQwMHYzMDBIMHoiLz48L3N2Zz4=',
  portrait: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmNjOTgiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZjg5NzYxIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDMwMHY0MDBIMHoiLz48L3N2Zz4=',
  square: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNhOGZmOTgiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjNTZhNzQzIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDQwMHY0MDBIMHoiLz48L3N2Zz4=',
  widescreen: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiM5ODkxZmYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjNDMzZGE3IiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDY0MHYzNjBIMHoiLz48L3N2Zz4=',
}

/**
 * Demo image placeholders - hardcoded values for common demo image sources
 * This avoids any runtime processing for publicly available demo images
 */
export const demoPlaceholders = {
  // Picsum Photos placeholders
  picsum: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNjY2MiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjOWE5YTlhIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBmaWxsPSJ1cmwoI2EpIiBkPSJNMCAwaDQwMHYzMDBIMHoiLz48L3N2Zz4=',
  // Add other demo image sources as needed
}

/**
 * Generic fallback placeholder for when no specific blur data is available
 */
export const fallbackPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjY2NjIi8+PC9zdmc+'

/**
 * Returns a blur placeholder (blurDataURL) for a given image URL.
 *
 * This utility is safe to use at runtime and guarantees:
 * - Mock blur data in test environments (e.g. Jest)
 * - Hardcoded base64 placeholders for known demo images (e.g. picsum.photos)
 * - A generic fallback for all other cases
 *
 * This function does NOT generate blurDataURLs dynamically.
 * For production images, you must pre-generate the blur using the CLI script:
 *   /scripts/generate-blur-placeholder.ts
 *
 * For full documentation and usage best practices, see:
 * docs/blur-placeholders.md
 *
 * @param imageUrl URL of the image
 * @returns A safe, pre-defined blur placeholder
 */
export function getBlurDataUrl(imageUrl: string): string {
  // For tests, return mock data based on image name patterns
  if (process.env.NODE_ENV === 'test') {
    if (imageUrl.includes('portrait')) return mockBlurData.portrait
    if (imageUrl.includes('square')) return mockBlurData.square
    if (imageUrl.includes('widescreen')) return mockBlurData.widescreen
    return mockBlurData.landscape
  }

  // For picsum demo images
  if (imageUrl.includes('picsum.photos')) {
    return demoPlaceholders.picsum
  }
  
  // For all other cases, return a generic fallback
  // In a real app, you should pre-generate these values at build time
  // using the CLI tool
  return fallbackPlaceholder
}