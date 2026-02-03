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
    type: "'primary' | 'outline' | 'ghost' | 'danger'"
    default: "'primary'"
    description: Visual style variant of the button
  - name: lmSize
    type: "'sm' | 'md' | 'lg' | 'full'"
    default: "'md'"
    description: Size of the button
  - name: lmDisabled
    type: boolean
    default: 'false'
    description: Whether the button is disabled
  - name: lmType
    type: "'button' | 'submit' | 'reset'"
    default: "'button'"
    description: HTML button type attribute
tokenGroups:
  - name: Primary Variant
    tokens:
      - name: --luma-button-primary-bg
        value: oklch(0.54 0.1 230)
        description: Primary button background
      - name: --luma-button-primary-bg-hover
        value: oklch(0.49 0.09 230)
        description: Primary button hover background
      - name: --luma-button-primary-bg-active
        value: oklch(0.44 0.08 230)
        description: Primary button active background
      - name: --luma-button-primary-text
        value: oklch(1 0 0)
        description: Primary button text color
  - name: Outline Variant
    tokens:
      - name: --luma-button-outline-border
        value: oklch(0.97 0 0)
        description: Outline button border color
      - name: --luma-button-outline-border-hover
        value: oklch(0.45 0.01 265)
        description: Outline button hover border
      - name: --luma-button-outline-bg-hover
        value: oklch(0.99 0 0)
        description: Outline button hover background
      - name: --luma-button-outline-text
        value: oklch(0.22 0.01 265)
        description: Outline button text color
  - name: Ghost Variant
    tokens:
      - name: --luma-button-ghost-bg
        value: transparent
        description: Ghost button background
      - name: --luma-button-ghost-bg-hover
        value: oklch(0.99 0 0)
        description: Ghost button hover background
      - name: --luma-button-ghost-text
        value: oklch(0.22 0.01 265)
        description: Ghost button text color
  - name: Danger Variant
    tokens:
      - name: --luma-button-danger-bg
        value: oklch(0.62 0.11 25)
        description: Danger button background
      - name: --luma-button-danger-bg-hover
        value: oklch(0.50 0.09 25)
        description: Danger button hover background
      - name: --luma-button-danger-bg-active
        value: oklch(0.44 0.08 25)
        description: Danger button active background
      - name: --luma-button-danger-text
        value: oklch(1 0 0)
        description: Danger button text color
  - name: Sizing
    tokens:
      - name: --luma-button-padding-x-sm
        value: 1rem
        description: Small button horizontal padding
      - name: --luma-button-padding-x-md
        value: 1.5rem
        description: Medium button horizontal padding
      - name: --luma-button-padding-x-lg
        value: 2rem
        description: Large button horizontal padding
      - name: --luma-button-padding-y-sm
        value: 0.5rem
        description: Small button vertical padding
      - name: --luma-button-padding-y-md
        value: 0.75rem
        description: Medium button vertical padding
      - name: --luma-button-padding-y-lg
        value: 1rem
        description: Large button vertical padding
  - name: Radius & Transition
    tokens:
      - name: --luma-button-radius
        value: 10px
        description: Button border radius
      - name: --luma-button-transition-duration
        value: 200ms
        description: Transition duration
      - name: --luma-button-transition-timing
        value: ease-out
        description: Transition timing function (Neo-Minimal)
  - name: Focus
    tokens:
      - name: --luma-button-focus-ring-width
        value: 2px
        description: Focus ring width (WCAG 2.4.7 minimum)
      - name: --luma-button-focus-ring-color
        value: oklch(0.63 0.14 232.13 / 0.45)
        description: Focus ring color
---

# Button

## Purpose

The Button component provides a versatile, accessible button element that follows Neo-Minimal design principles with calm interactions and visual silence.

## States

- **Default**: Base appearance with calm visual presence
- **Hover**: Gentle background color transition, no scale or shadow
- **Focus**: Clear ring outline for keyboard navigation
- **Active**: Slightly darker background on click
- **Disabled**: Reduced opacity (50%) with disabled cursor

## Usage Examples

### Basic Button

```html
<button lumaButton>Click me</button>
```

### Variants

```html
<button lumaButton lmVariant="primary">Primary</button>
<button lumaButton lmVariant="outline">Outline</button>
<button lumaButton lmVariant="ghost">Ghost</button>
<button lumaButton lmVariant="danger">Delete</button>
```

### Sizes

```html
<button lumaButton lmSize="sm">Small</button>
<button lumaButton lmSize="md">Medium</button>
<button lumaButton lmSize="lg">Large</button>
<button lumaButton lmSize="full">Full Width</button>
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

The button appearance can be customized using CSS variables. The most common customization is the border-radius, controlled by `--luma-button-radius`.

### Override Globally

Override the button border-radius in your global styles or component:

```css
/* In your global styles.css */
:root {
  --luma-button-radius: 4px; /* More sharp */
}
```

### Override Per Theme

Apply different radius values for light and dark themes:

```css
/* Light mode - subtle rounding */
:root {
  --luma-button-radius: 8px;
}

/* Dark mode - more pronounced rounding */
.dark {
  --luma-button-radius: 16px;
}
```

### Override Per Component

Scope the radius change to specific contexts:

```css
/* Only buttons in the header */
.header {
  --luma-button-radius: 4px;
}

/* Only buttons in cards */
.card {
  --luma-button-radius: 12px;
}
```

**Default value:** `var(--luma-radius-md)` → `10px`

## Use Cases

### Submit Form Button

Trigger form submission with loading state feedback.

```typescript
@Component({
  template: `
    <form (ngSubmit)="onSubmit()">
      <button lumaButton lmVariant="primary" [lmDisabled]="isLoading()">
        {{ isLoading() ? 'Saving...' : 'Save Changes' }}
      </button>
    </form>
  `,
})
export class FormComponent {
  isLoading = signal(false);

  async onSubmit() {
    this.isLoading.set(true);
    await this.api.save();
    this.isLoading.set(false);
  }
}
```

### Confirmation Action

Use danger variant for destructive actions with confirmation.

```typescript
@Component({
  template: `
    <button lumaButton lmVariant="danger" (click)="confirmDelete()">
      Delete Account
    </button>
  `,
})
export class DeleteComponent {
  confirmDelete() {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.accountService.delete();
    }
  }
}
```

### Navigation Link

Use anchor element for page navigation.

```html
<a lumaButton lmVariant="ghost" routerLink="/settings"> Go to Settings </a>
```

## Neo-Minimal Principles

The button design embodies core Neo-Minimal values:

- **Visual Silence**: Colors are slightly desaturated, close to gray, comfortable for long viewing
- **Calm Interactions**: Transitions are gentle (150ms) with no scale or elastic effects
- **Organic Geometry**: Border radius is generous enough to feel "drawn" not "calculated"
- **Functional Whitespace**: Padding uses design tokens for consistent rhythm
- **Silent Accessibility**: Focus states are clear but discrete, touch areas are comfortable (44px+)

## Accessibility

- ✅ **WCAG AA compliant**: All variants meet 4.5:1 contrast ratio
- ✅ **Keyboard accessible**: Full keyboard navigation with visible focus states
- ✅ **Screen reader friendly**: Proper ARIA attributes and semantic HTML
- ✅ **Touch-friendly**: Minimum touch target size of 44x44px
- ✅ **Disabled state**: Properly communicated via `disabled` attribute

## Implementation Notes

- Uses Angular 20+ signal-based inputs (`input()`)
- Styled with Tailwind CSS v4 arbitrary values
- Type-safe variants via class-variance-authority (CVA)
- OnPush change detection for optimal performance
- Works as both `<button>` and `<a>` elements
