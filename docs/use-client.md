# `'use client'` Annotation Support

This project enforces proper usage of the `'use client'` directive in React components that rely on client-side functionality. This is especially important for future compatibility with Next.js App Router and React Server Components.

---

## What Is `'use client'`?

In Next.js (App Router), files are treated as **server components by default**. If a component uses client-only features like `useState`, `useEffect`, or `window`, it **must be explicitly marked** with the directive:

```tsx
'use client'

export default function MyComponent() {
  const [open, setOpen] = useState(false)
  return <div>{open ? 'Open' : 'Closed'}</div>
}
```

Failing to do so may lead to **runtime errors**, hydration mismatches, or invisible bugs when rendering on the server.

---

## Our Approach

To ensure maintainability, safety, and migration-readiness, this project uses the following strategy:

### 🔹 1. **Development-time CLI Tool**

We provide a script to **detect and autofix missing `'use client'` directives**:

```bash
node scripts/lint-use-client.js
```

This script:

* Scans relevant `.tsx` files in `src/components/`, `src/hooks/`, and `src/lib/`
* Parses each file using Babel to detect client-only code
* Inserts `'use client'` at the top if missing
* Re-stages the modified file automatically (used in pre-commit hooks)

> ✅ This tool is intended for use during development or pre-commit.
> ❌ It is not required at runtime.

---

### 🔹 2. **Pre-commit Integration with Husky**

The script is used in the pre-commit hook defined in `.husky/pre-commit`. If any violations are found, they are:

* Automatically corrected
* Re-staged (`git add`)
* Prevented from being committed if autofix fails

This guarantees that no client-only component is ever committed without a proper `'use client'` annotation.

---

## Storybook & Testing

The `'use client'` directive **is not needed** in Storybook stories or Jest tests. These environments run in simulated browser contexts (`jsdom`) and are not compiled by Next.js.

> The script automatically ignores files like `*.stories.tsx` and `*.test.tsx`.

---

## CMS & Design-System Context

This starter is designed to be **CMS-agnostic and App Router–ready**, so:

* We do **not** rely on server-only rendering assumptions
* All interactive components are future-proofed for client/server boundaries

This helps ensure compatibility regardless of your data source or deployment model.

---

## Summary

| Task                      | Solution                                        |
| ------------------------- | ----------------------------------------------- |
| New interactive component | Write code as usual, script adds `'use client'` |
| Manual file check         | Run `node scripts/lint-use-client.js`           |
| Enforced before commit    | Automatically triggered by Husky                |
| Storybook or tests        | Annotation not required, files are ignored      |

---

## File Structure Overview

```
src/
├── components/              ← Contains all UI and composed components
├── hooks/                   ← Custom React hooks (some may be client-only)
├── lib/                     ← Misc logic or helpers (if containing JSX)
scripts/
└── lint-use-client.js       ← CLI to enforce 'use client' directive
.husky/
└── pre-commit               ← Hook that runs the lint-use-client script
```
