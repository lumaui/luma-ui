---
name: Button
type: directive
selector: button[lumaButton], a[lumaButton]
category: Form
description: Versatile, accessible button element that follows Neo-Minimal design principles with calm interactions and visual silence.
imports:
  - name: LmButtonDirective
    module: '@lumaui/angular'
inputs:
  - name: lmVariant
    type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'"
    default: "'primary'"
    description: Visual style variant of the button
  - name: lmSize
    type: "'sm' | 'md' | 'lg'"
    default: "'md'"
    description: Size of the button (sm=12px, md=14px, lg=16px font size)
  - name: lmRadius
    type: "'default' | 'square' | 'full'"
    default: "'default'"
    description: Border radius of the button (default uses radius-4 token, square is sharp corners, full is pill shape)
  - name: lmDisabled
    type: boolean
    default: 'false'
    description: Whether the button is disabled
  - name: lmType
    type: "'button' | 'submit' | 'reset'"
    default: "'button'"
    description: HTML button type attribute
---

# Button

## Purpose

The Button component provides a versatile, accessible button element that follows Neo-Minimal design principles with calm interactions and visual silence. It uses **semantic tokens** for styling, making it easy to customize without touching component code.

## Semantic Token Usage

Buttons use the following semantic tokens:

- **Primary variant:** `bg-primary`, `text-primary-foreground`
- **Secondary variant:** `bg-secondary`, `text-secondary-foreground`
- **Outline variant:** `border-input`, `bg-background`, `hover:bg-accent`
- **Ghost variant:** `hover:bg-accent`, `hover:text-accent-foreground`
- **Destructive variant:** `bg-destructive`, `text-destructive-foreground`

All variants share common tokens for:

- **Border radius:** Controlled by `lmRadius` input (default uses `--radius-4`)
- **Focus ring:** `ring-ring` (uses `--color-ring`)
- **Spacing:** Padding-based sizing (not fixed height) for natural button dimensions

## Size Specifications

| Size | Font Size        | Padding X   | Padding Y     | Height          |
| ---- | ---------------- | ----------- | ------------- | --------------- |
| sm   | 12px (text-xs)   | 12px (px-3) | 8px (py-2)    | Natural (~28px) |
| md   | 14px (text-sm)   | 16px (px-4) | 10px (py-2.5) | Natural (~34px) |
| lg   | 16px (text-base) | 20px (px-5) | 12px (py-3)   | Natural (~40px) |

**Note:** Border radius is now controlled independently via the `lmRadius` input (not size-dependent). Buttons use padding-based sizing (not fixed `h-*` classes) to accommodate text naturally. This follows Neo-Minimal principles of organic form over rigid geometry.

## States

- **Default**: Base appearance with calm visual presence
- **Hover**: Gentle background color transition with inline opacity modifier (`hover:bg-primary/90`)
- **Focus**: Clear ring outline for keyboard navigation
- **Active**: No special styling (hover state persists)
- **Disabled**: Reduced opacity (50%) with disabled cursor

## Usage Examples

### Basic Button

```html
<button lumaButton>Click me</button>
```

### Variants

```html
<button lumaButton lmVariant="primary">Primary</button>
<button lumaButton lmVariant="secondary">Secondary</button>
<button lumaButton lmVariant="outline">Outline</button>
<button lumaButton lmVariant="ghost">Ghost</button>
<button lumaButton lmVariant="destructive">Delete</button>
```

### Sizes

```html
<button lumaButton lmSize="sm">Small (12px)</button>
<button lumaButton lmSize="md">Medium (14px)</button>
<button lumaButton lmSize="lg">Large (16px)</button>
```

### Radius Options

```html
<button lumaButton lmRadius="default">Default (8px)</button>
<button lumaButton lmRadius="square">Square (no radius)</button>
<button lumaButton lmRadius="full">Pill Shape</button>
```

### Combining Size and Radius

```html
<!-- Small pill button -->
<button lumaButton lmSize="sm" lmRadius="full">Small Pill</button>

<!-- Large square button -->
<button lumaButton lmSize="lg" lmRadius="square">Large Square</button>
```

### Disabled State

```html
<button lumaButton [lmDisabled]="true">Disabled</button>
```

### Link as Button

```html
<a lumaButton href="/path" lmVariant="primary">Link Button</a>
```

## Customizing

Buttons use **semantic tokens** that can be customized at any scope without touching component code.

### Pattern 1: Global Theme Override

Change button colors across your entire application:

```css
/* In your global styles.css */
:root {
  --color-primary: oklch(0.6 0.15 180); /* Cyan brand color */
  --color-primary-foreground: oklch(1 0 0); /* White text */
  --radius-md: 0.25rem; /* Sharper corners (4px) */
}
/* All primary buttons automatically use cyan */
```

### Pattern 2: Component Instance Override

Override colors for a specific button using `className`:

```html
<button lumaButton className="bg-accent hover:bg-accent/80">
  Custom Color Button
</button>

<button lumaButton className="rounded-full">Pill Button</button>
```

### Pattern 3: Scoped Override

Apply custom colors to buttons in specific sections:

```css
/* Only buttons in the header */
.header {
  --color-primary: oklch(0.7 0.12 340); /* Pink */
}

/* Only buttons in cards */
.card-actions {
  --radius-md: 1rem; /* More rounded */
}
```

### Pattern 4: Dark Theme

Buttons automatically adapt to dark mode:

```css
.dark {
  --color-primary: oklch(0.72 0.12 300);
  --color-primary-foreground: oklch(1 0 0);
  /* Buttons automatically use dark theme colors */
}
```

### Available Customization Tokens

| Token                        | Default (Light)             | Default (Dark)             | Affects                        |
| ---------------------------- | --------------------------- | -------------------------- | ------------------------------ |
| `--color-primary`            | oklch(0.48 0.09 300)        | oklch(0.72 0.12 300)       | Primary variant background     |
| `--color-primary-foreground` | oklch(1 0 0)                | oklch(1 0 0)               | Primary variant text           |
| `--color-secondary`          | oklch(0.97 0.006 290)       | oklch(0.22 0.008 290)      | Secondary variant background   |
| `--color-destructive`        | oklch(0.63 0.10 28)         | oklch(0.72 0.12 28)        | Destructive variant background |
| `--color-accent`             | oklch(0.65 0.10 232)        | oklch(0.78 0.09 232)       | Ghost/outline hover background |
| `--color-border`             | oklch(0.97 0.006 290)       | oklch(0.28 0.01 290)       | Outline variant border         |
| `--radius-4`                 | 0.5rem (8px)                | 0.5rem (8px)               | Border radius                  |
| `--color-ring`               | oklch(0.55 0.10 300 / 0.35) | oklch(0.78 0.12 300 / 0.4) | Focus ring                     |

## Neo-Minimal Principles

The button design embodies core Neo-Minimal values:

- **Visual Silence**: Colors are slightly desaturated, close to gray, comfortable for long viewing
- **Calm Interactions**: Transitions are gentle (200ms ease-out) with no scale or elastic effects
- **Organic Geometry**: Border radius is generous enough to feel "drawn" not "calculated"
- **Functional Whitespace**: Padding uses standard Tailwind scale for consistent rhythm
- **Silent Accessibility**: Focus states are clear but discrete, touch areas are comfortable (44px+)

## Accessibility

- ✅ **WCAG AA compliant**: All variants meet 4.5:1 contrast ratio
- ✅ **Keyboard accessible**: Full keyboard navigation with visible focus states
- ✅ **Screen reader friendly**: Proper ARIA attributes and semantic HTML
- ✅ **Touch-friendly**: Minimum touch target size of 44x44px
- ✅ **Disabled state**: Properly communicated via `disabled` attribute
- ✅ **Focus visible**: 2px ring with sufficient contrast (WCAG 2.4.7, 2.4.11)

## Implementation Notes

- Uses Angular 20+ signal-based inputs (`input()`)
- Styled with **semantic tokens** via standard Tailwind CSS utilities
- Type-safe variants via class-variance-authority (CVA)
- OnPush change detection for optimal performance
- Works as both `<button>` and `<a>` elements
- Zero component-specific tokens - fully customizable via semantic tokens

## Shiki Enhancement Demo

This section demonstrates the new syntax highlighting features powered by Shiki v3 transformers.

### Line Highlighting

Highlight specific lines using meta syntax `{1,3-5}`:

```typescript {1,5-7}
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-example',
  template: `
    <button lumaButton lmVariant="primary">Primary</button>
    <button lumaButton lmVariant="secondary">Secondary</button>
  `,
})
```

### Line Numbers

Add line numbers using `{lineNumbers}` meta:

```typescript {lineNumbers}
import { Component } from '@angular/core';
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-button-example',
  template: ` <button lumaButton>Click me</button> `,
  imports: [LmButtonDirective],
})
export class ButtonExampleComponent {}
```

### Diff Highlighting

Show code changes using `[!code ++]` and `[!code --]`:

```typescript
- <button lumaButton variant="danger">Delete</button>  // [!code --]
+ <button lumaButton lmVariant="destructive">Delete</button>  // [!code ++]

- <button lumaButton size="large">Big Button</button>  // [!code --]
+ <button lumaButton lmSize="lg">Big Button</button>  // [!code ++]
```

### Focus Lines

Focus on specific lines using `[!code focus]`:

```typescript
function handleButtonClick(event: Event) {
  // [!code focus:3]
  const button = event.target as HTMLButtonElement;
  button.disabled = true;
  performAction().finally(() => (button.disabled = false));
}
```

### Combined Features

Line numbers + highlighting + diff together:

```typescript {lineNumbers} {2,6-8}
import { LmButtonDirective } from '@lumaui/angular';

- const buttonVariants = ['primary', 'danger', 'success'];  // [!code --]
+ const buttonVariants = ['primary', 'destructive', 'secondary'];  // [!code ++]

@Component({
  template: `
    <button lumaButton [lmVariant]="variant">Click</button>
  `,
})
```
