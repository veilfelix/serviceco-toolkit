/**
 * CLI tool to enforce and autofix 'use client' annotations for client-side components.
 *
 * This script is intended for use during development or as part of a pre-commit hook.
 * It scans relevant source files (components, hooks, etc.), detects usage of client-only
 * features (React hooks, browser APIs, etc.), and ensures the file begins with `'use client'`.
 *
 * If missing, the directive is automatically inserted and the file is re-staged.
 *
 * Usage:
 *   node scripts/lint-use-client.js
 *
 * Why enforce this statically?
 * - To avoid subtle runtime errors when migrating to the Next.js App Router.
 * - To future-proof components against server-client boundary issues.
 * - To reduce manual oversight and improve DX.
 *
 * Learn more in `/docs/use-client.md`
 */

const fs = require('fs')
const path = require('path')
const glob = require('fast-glob')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { execSync } = require('child_process')

const CLIENT_KEYWORDS = [
  'useState',
  'useEffect',
  'useLayoutEffect',
  'useInsertionEffect',
  'useRef',
  'useReducer',
  'useCallback',
  'useMemo',
  'useTranslation',
  'useRouter',
  'useForm',
  'useMediaQuery',
  'useIntersectionObserver',
  'useDrag',
  'useGesture',
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'navigator',
  'location',
  'history',
  'matchMedia',
  'ResizeObserver',
  'IntersectionObserver',
  'setTimeout',
  'setInterval',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'addEventListener',
  'removeEventListener',
]

const TARGET_FILES = [
  'src/components/**/*.{ts,tsx}',
  'src/hooks/**/*.{ts,tsx}',
  'src/lib/**/*.{ts,tsx}',
  '!**/*.test.tsx',
  '!**/*.test.ts',
  '!**/*.stories.tsx',
  '!**/*.stories.ts',
  '!src/pages/**/*',
]

async function main() {
  const files = await glob(TARGET_FILES)
  const violations = []

  for (const file of files) {
    const code = fs.readFileSync(file, 'utf-8')
    const hasUseClient = code.trimStart().startsWith("'use client'") || code.trimStart().startsWith('"use client"')

    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['typescript', 'jsx'],
    })

    let isClient = false

    traverse(ast, {
      enter(path) {
        if (
          path.isIdentifier() &&
          CLIENT_KEYWORDS.includes(path.node.name)
        ) {
          isClient = true
          path.stop()
        }
      },
    })

    if (isClient && !hasUseClient) {
      violations.push(file)

      const updated = `'use client'\n\n${code}`
      fs.writeFileSync(file, updated, 'utf-8')

      execSync(`git add ${file}`)
      console.log(`✨ Auto-added 'use client' and staged ${file}`)
    }
  }

  if (violations.length > 0) {
    console.error('\n🚨 These files use client-only features but were missing `\'use client\'`:\n')
    violations.forEach((f) => console.error(`- ${f}`))
    process.exit(1)
  } else {
    console.log('✅ All client components are properly annotated.')
  }
}

main()
