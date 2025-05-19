# Design System Overview

This project includes a lightweight but extensible design system that integrates seamlessly with Tailwind CSS and custom CSS variables. It provides reusable UI primitives with consistent styling, tokenization, and accessibility baked in.

---

## Tech Stack

| Tool                               | Purpose                                                                      |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| **Tailwind CSS**                   | Utility-first styling and atomic class generation                            |
| **Custom CSS Variables** (`:root`) | Theme tokens (colors, radii, spacing, etc.) defined in `src/theme/index.css` |
| **@tailwindcss/forms**             | Normalize and restyle form elements                                          |
| **@tailwindcss/typography**        | Prose utility for rich text content                                          |
| **clsx** + `cn()` utility          | Conditional, readable class composition                                      |
| **Radix UI**                       | Headless accessible primitives used in `components/composed/` (e.g. Accordion, Dialog, DropdownMenu) |

---

## How It Works

The design system follows a few key conventions:

* **CSS tokens** are declared in `:root` using meaningful names, e.g.:

  ```css
  :root {
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
  }
  ```

* **Tailwind config** maps `theme(colors)` to these variables:

  ```ts
  colors: {
    primary: 'hsl(var(--primary))',
    'primary-foreground': 'hsl(var(--primary-foreground))',
  }
  ```

* When using a **Tailwind class**, the HSL is automatically injected:

  ```tsx
  <button className="bg-primary text-primary-foreground">Click me</button>
  ```

* When writing **custom styles or inline overrides**, you must explicitly reference the variable:

  ```tsx
  style={{ backgroundColor: 'hsl(var(--primary))' }}
  ```

### Why `tokens.ts` Exists

The file `src/theme/tokens.ts` is used to **re-export design tokens** from `index.css` as TypeScript constants.

This is helpful when:

* You need to access token values **in JS/TS logic** (e.g. for chart colors, animations, or runtime styles)
* You want to maintain **type-safe references** to shared design values
* You’re working outside of Tailwind's utility class context (e.g. raw inline styles)

**Example usage:**

```
import { COLORS } from '@/theme/tokens'

element.style.backgroundColor = `hsl(${COLORS.primary})`
```

Note that this file does **not affect Tailwind** in any way, Tailwind only reads from `theme/index.css` via PostCSS. It does **not** read values from TypeScript.

In other words:
`tokens.ts` is for **JavaScript & TypeScript**,
`index.css` is for **Tailwind & CSS**.

### Why Some Tokens Are Mapped in Tailwind But Not Available as Classes

Certain design tokens (e.g. `--switch-sm-thumb-size`, `--dialog-content-z-index`) are included in `tailwind.config.js` under custom namespaces like `switchSize`, `dialog`, `accordion`, etc., but **are not intended to be used directly via Tailwind classes** like `bg-...` or `text-...`.

Instead, they serve the following purposes:

* **They make tokens available via `theme(...)` inside arbitrary value brackets.**
  Example:
  ```
  className="rounded-[theme(switchSize.sm-thumb-size)]"
  ```

* **They enable consistent value access across Tailwind and raw CSS.**
  Example:
  ```
  style={{ zIndex: 'var(--dialog-content-z-index)' }}
  ```

This is especially useful for components like Dialog, Tabs, Accordion, or Popover that rely on layout-specific or animation-specific tokens that don't belong to any semantic Tailwind utility.

### Why We Use a Tailwind Safelist

Tailwind’s build process uses a "purge" system to remove unused classes from the final CSS. This works great for static class names, but it can **silently strip out dynamically generated or conditionally used classes** — especially those built via `clsx`, `cn()`, or string interpolation (e.g. ``col-span-${x}``).

This becomes problematic when building a design system with flexible layouts, grid spans, or component variants that aren't always referenced in static HTML.

To avoid these bugs, we’ve defined a **safelist of patterns** in `tailwind.config.js`. This ensures that essential utility classes like:

- `col-span-4`, `row-span-2`, `gap-md`
- `text-muted`, `bg-primary`, `rounded-md`
- `justify-between`, `items-center`, etc.

...are always included in the final build, even if they don’t appear explicitly in the code during build time.

This approach adds a negligible CSS weight (~10–20kB) and guarantees stability across composed components and Storybook examples.

**See:** [`tailwind.config.js → safelist`](../../tailwind.config.js)


## Why are we using HSL Instead of Hex?

Using `hsl(var(--...))` allows:

* Better theming (light/dark or brand variants)
* Easier color manipulation (opacity, saturation tweaks)
* Dynamic design without hardcoded hex values

**Example:**

```css
--destructive: 0 72% 51%;
```

Then use in JSX:

```tsx
<div className="text-[hsl(var(--destructive))]">Danger zone</div>
```

---

## How to Customize the Theme for a New Project

If you fork this repo to adapt the design system to a new brand or project, here’s a suggested flow:

1. **Start with tokens in `src/theme/index.css`**
   * Change colors, font sizes, spacing, radii, etc.
   * Stick to the existing structure to stay compatible with Tailwind and components.

2. **Update Tailwind mapping in `tailwind.config.js`**
   * Ensure your new tokens are properly exposed in the `theme()` section (e.g. `colors`, `spacing`, `borderRadius`).
   * Use `hsl(var(--...))` or `theme(...)` when needed.

3. **Update `src/theme/tokens.ts`**
   * If you're referencing tokens in JavaScript or TypeScript (e.g. in charts), reflect your changes here.

4. **Test components using Storybook**
   * Run `npm run storybook` and visually confirm your overrides look correct.
   * You may need to adjust a few variant-specific styles in `components/ui/`.

5. **Use utility-first overrides consistently**
   * Prefer utility classes mapped to your tokens.
   * Use raw `hsl(var(--...))` or `theme(...)` in component overrides when necessary (e.g. specificity or interpolation).

This process ensures your design system remains maintainable, flexible, and consistent across all components.

---

## Structure & Token Mapping

| Layer                   | Location                      | Purpose                                           |
| ----------------------- | ----------------------------- | ------------------------------------------------- |
| `src/``theme/index.css` | Global design tokens          | All CSS variables (`--primary`, `--radius`, etc.) |
| `tailwind.config.js`    | Token mapping                 | Maps CSS vars to Tailwind utilities               |
| `src/theme/tokens.ts`   | Optional TypeScript constants | For programmatic use (e.g., charts, JS styles)    |

### Special Cases:

* Tailwind classes only exist for mapped keys (e.g. `bg-primary`) — others must use `hsl(var(--...))`
* Some dynamic utilities (like spacing or radius) may use `[theme(...)]` syntax, e.g.:

  ```tsx
  className="pt-[theme(spacing.lg)]"
  ```
* For📘 things like `focus:ring-[hsl(var(--ring))]`, we manually inject the variable

---

## `cn()` Utility

The `cn()` function wraps `clsx()` to build class strings conditionally.

```ts
// utils/classNames.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Example:**

```tsx
cn(
  'bg-primary',
  isActive && 'ring-2',
  className
)
```

This will return a space-separated string of valid classes and automatically merge duplicates.

---

## Component Styling Philosophy

* Components should use **Tailwind classes mapped to tokens** whenever possible:

  ```tsx
  <button className="bg-primary text-primary-foreground rounded-[var(--button-border-radius)]">
    Submit
  </button>
  ```

* When overriding a component **from the outside** (via `className`), you may need to use a raw CSS var for specificity:

  ```tsx
  <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent)/80)]" />
  ```

* This avoids Tailwind's default specificity from winning over your custom intent.

---

## Summary

| Situation                      | Solution                                      |
| ------------------------------ | --------------------------------------------- |
| Use a primary background color | `bg-primary`                                  |
| Override with a custom color   | `bg-[hsl(var(--...))]`                        |
| Dynamic padding                | `pt-[theme(spacing.sm)]`                      |
| Inline style                   | `style={{ color: 'hsl(var(--foreground))' }}` |
| Custom text color fallback     | `text-[color:var(--custom)]`                  |

---

## File Structure Overview

```
src/
├── theme/
│   ├── index.css         ← Global CSS variables
│   ├── tokens.ts         ← Token re-export (TS)
├── utils/
│   └── classNames.ts     ← `cn()` function
├── components/
│   └── ui/               ← UI primitives (Button, Input, etc.)
│   └── composed/         ← Composed components using Radix-Ui (Accordion, Dialog, DropdownMenu, etc.)
├── styles/
│   └── globals.css       ← Tailwind base layer imports
tailwind.config.js        ← Tailwind token mapping
```
