import fs from 'node:fs'
import path from 'node:path'

/**
 * This test ensures that breakpoints are consistent across:
 * - theme/index.css
 * - theme/tokens.ts
 * - tailwind.config.js
 */

function parseBreakpointsFromIndexCSS() {
  const content = fs.readFileSync(path.resolve(__dirname, '../theme/index.css'), 'utf-8')
  const regex = /--breakpoint-([\w]+):\s*([\d.]+px);/g
  const breakpoints: Record<string, string> = {}
  let match
  while ((match = regex.exec(content)) !== null) {
    breakpoints[match[1]] = match[2]
  }
  return breakpoints
}

function parseBreakpointsFromTokensTS() {
  const content = fs.readFileSync(path.resolve(__dirname, '../theme/tokens.ts'), 'utf-8')
  const breakpoints: Record<string, string> = {}
  let inBreakpoints = false

  for (const line of content.split('\n')) {
    if (line.includes('export const breakpoints')) {
      inBreakpoints = true
      continue
    }
    if (inBreakpoints && line.includes('}')) break

    if (inBreakpoints) {
      const regex = /([\w'"]+):\s*['"]([\d.]+px)['"]/
      const match = regex.exec(line)
      if (match) {
        const key = match[1].replace(/['"]/g, '')
        breakpoints[key] = match[2]
      }
    }
  }

  return breakpoints
}

function parseBreakpointsFromTailwindConfig() {
  const content = fs.readFileSync(path.resolve(__dirname, '../../tailwind.config.js'), 'utf-8')
  const breakpoints: Record<string, string> = {}
  let inScreens = false

  for (const line of content.split('\n')) {
    if (line.includes('screens: {')) {
      inScreens = true
      continue
    }
    if (inScreens && line.includes('}')) break

    if (inScreens) {
      const regex = /([\w'"]+):\s*['"]([\d.]+px)['"]/
      const match = regex.exec(line)
      if (match) {
        const key = match[1].replace(/['"]/g, '')
        breakpoints[key] = match[2]
      }
    }
  }

  return breakpoints
}

function compare(a: Record<string, string>, b: Record<string, string>) {
  const aKeys = Object.keys(a).sort()
  const bKeys = Object.keys(b).sort()
  if (JSON.stringify(aKeys) !== JSON.stringify(bKeys)) return false
  for (const key of aKeys) {
    if (a[key] !== b[key]) return false
  }
  return true
}

describe('Breakpoint consistency', () => {
  it('should match between index.css, tokens.ts and tailwind.config.js', () => {
    const css = parseBreakpointsFromIndexCSS()
    const tokens = parseBreakpointsFromTokensTS()
    const config = parseBreakpointsFromTailwindConfig()
    expect(compare(css, tokens)).toBe(true)
    expect(compare(css, config)).toBe(true)
    expect(compare(tokens, config)).toBe(true)
  })
})
