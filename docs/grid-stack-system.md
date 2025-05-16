# Grid & Stack System

This project includes two flexible layout primitives designed to simplify spacing and structure: `Grid` and `Stack`. These components abstract away common layout patterns using CSS Grid and Flexbox, while preserving full control through a consistent, token-based design system.

Both components are built with utility-first conventions and responsive capabilities.

---

## 🔲 Grid

The `Grid` component is a wrapper around native CSS Grid that offers intuitive props to control column count, spacing, flow, alignment, and responsiveness.

### Basic Usage

```tsx
<Grid columns={3} gap="md">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</Grid>
```

### Props

### Grid Props

| Prop          | Type                                                                          | Default     | Description                                                                 |
| ------------- | ----------------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------------- |
| `columns`     | `1`–`12` \| `'auto-fill'` \| `'auto-fit'`                                     | `1`         | Number of columns or responsive auto layout.                                |
| `responsive`  | `Partial<Record<Breakpoint, GridColumns>>`                                    | –           | Object that sets different column counts per breakpoint (`sm`, `md`, etc.). |
| `gap`         | `'none'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'`                              | `'md'`      | Overall spacing between grid items.                                         |
| `gapX`        | same as `gap`                                                                 | –           | Horizontal spacing override. Takes precedence over `gap`.                   |
| `gapY`        | same as `gap`                                                                 | –           | Vertical spacing override. Takes precedence over `gap`.                     |
| `align`       | `'start'` \| `'center'` \| `'end'` \| `'stretch'` \| `'baseline'`             | `'stretch'` | Vertical alignment of items.                                                |
| `justify`     | `'start'` \| `'center'` \| `'end'` \| `'between'` \| `'around'` \| `'evenly'` | `'start'`   | Horizontal alignment of items.                                              |
| `flow`        | `'row'` \| `'col'` \| `'dense'` \| `'row-dense'` \| `'col-dense'`             | –           | Defines how items fill the grid (direction and compaction).                 |
| `minColWidth` | `string`                                                                      | `'250px'`   | Minimum column width used with `auto-fill` or `auto-fit`.                   |
| `className`   | `string`                                                                      | –           | Additional Tailwind classes for the outer grid container.                   |
| `as`          | `div` \| `section` \| `main` \| etc.                                          | `'div'`     | Allows rendering as a different semantic HTML tag.                          |

### Interdependent Props

- When using `columns="auto-fill"` or `columns="auto-fit"`, the `minColWidth` prop **must be provided** to control the minimum size of each column.
    
- `gapX` and `gapY` will override `gap` if set.
    

### Examples

```tsx
<Grid columns="auto-fit" minColWidth="200px" gap="lg">
  <Card />
  <Card />
</Grid>

<Grid columns={3} gapX="sm" gapY="lg" justify="center">
  <Card />
  <Card />
  <Card />
</Grid>
```

---

### Fractional Column Layouts (Custom Widths per Child)

While the `columns` prop defines the number of equal-width columns in the grid, you can override individual item widths using Tailwind’s `col-span-*` utilities — as long as the `Grid` has enough columns to span across.

**Example:**

```tsx
<Grid columns={12} gap="md">
  <div className="col-span-4">1/3 width</div>
  <div className="col-span-8">2/3 width</div>

  <div className="col-span-6">1/2 width</div>
  <div className="col-span-6">1/2 width</div>

  <div className="col-span-3">1/4 width</div>
  <div className="col-span-9">3/4 width</div>
</Grid>
```

---

## 📏 Stack

The `Stack` component is a flexible layout utility based on `flex` that simplifies vertical or horizontal alignment of components with consistent spacing.

By default, it renders `flex-col` to stack elements vertically. It supports horizontal layouts via the `direction` prop, and responsive layout switching via `directionBreakpoint`.

---

### Basic Usage

```tsx
<Stack gap="sm">
  <Label>Name</Label>
  <Input />
</Stack>
```

```tsx
<Stack direction="row" gap="md" align="center">
  <Icon />
  <Text>Loading...</Text>
</Stack>
```

---

### Props

|Prop|Type|Default|Description|
|---|---|---|---|
|`children`|`ReactNode`|–|Stack content.|
|`direction`|`'row'` \| `'column'` \| `'row-reverse'` \| `'column-reverse'`|`'column'`|Direction of layout (main axis).|
|`gap`|`'none'` \| `'xs'` \| `'sm'` \| `'md'` \| `'lg'`|`'md'`|Gap between items. Ignored if only one child.|
|`align`|`'start'` \| `'center'` \| `'end'` \| `'stretch'` \| `'baseline'`|`'stretch'`|Cross-axis alignment (affects `align-items`).|
|`justify`|`'start'` \| `'center'` \| `'end'` \| `'between'` \| `'around'` \| `'evenly'`|`'start'`|Main-axis alignment (affects `justify-content`).|
|`directionBreakpoint`|`'xs'` \| `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'`|–|For responsive stacks. When defined and `direction="column"`, switches to `row` at that breakpoint.|
|`as`|`ElementType`|`'div'`|HTML element to render (e.g. `'form'`, `'section'`).|
|`className`|`string`|–|Additional Tailwind or utility classes.|

---

### Notes

- If the stack contains only a single child, `gap` will not be applied to avoid unnecessary spacing.
    
- Use `directionBreakpoint` to make a stack responsive. For example, vertical on mobile and horizontal from `md` up.
    
- `align` controls the **cross-axis** (i.e., horizontal in a vertical stack).
    
- `justify` controls the **main axis** (i.e., vertical in a vertical stack).
    

---

### Examples

```tsx
// Vertical stack with default settings
<Stack gap="lg" className="p-md">
  <Heading>Section Title</Heading>
  <Text>This section uses a vertical Stack layout.</Text>
</Stack>
```

```tsx
// Horizontal stack for inputs
<Stack direction="row" gap="sm" align="center">
  <Label htmlFor="search">Search</Label>
  <Input id="search" />
</Stack>
```

```tsx
// Responsive layout: column → row at md breakpoint
<Stack direction="column" directionBreakpoint="md" gap="md">
  <Card>Item A</Card>
  <Card>Item B</Card>
  <Card>Item C</Card>
</Stack>
```

```tsx
// Stretch items to fill parent (e.g., full-height sidebar menu)
<Stack justify="between" className="h-full">
  <Logo />
  <NavLinks />
  <UserMenu />
</Stack>
```
---

## Summary

|Situation|Solution|
|---|---|
|Uniform grid with fixed columns|`<Grid columns={3} gap="md">...</Grid>`|
|Responsive grid that adapts|`<Grid columns="auto-fit" minColWidth="200px" />`|
|Grid with spacing only on x or y|Use `gapX="sm"` or `gapY="lg"`|
|Vertical stack with consistent gap|`<Stack gap="md">...</Stack>`|
|Horizontal stack with aligned items|`<Stack direction="row" align="center" gap="sm">...</Stack>`|
|Responsive stack switching to row|`<Stack direction="column" directionBreakpoint="md">...</Stack>`|
|Stretch items to fill vertical space|`<Stack justify="between" className="h-full">...</Stack>`|
|Centered grid layout|`<Grid columns={3} justify="center">...</Grid>`|

---

## File Structure Overview

```
src/
├── components/
│   └── ui/
│       ├── Grid/Grid.tsx      ← Grid layout primitive
│       └── Stack/Stack.tsx    ← Stack layout primitive
```

This system allows structured and semantic layout creation, while keeping spacing consistent and easy to maintain.