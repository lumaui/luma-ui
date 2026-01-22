# Button

## Purpose
The Button component provides a versatile, accessible button element that follows Neo-Minimal design principles with calm interactions and visual silence.

## Inputs
- `variant`: 'primary' | 'outline' | 'ghost' | 'danger' - Visual variant
  - **primary**: Solid background, high emphasis
  - **outline**: Transparent background with border, medium emphasis
  - **ghost**: Subtle background, low emphasis
  - **danger**: Destructive actions, high emphasis
- `size`: 'sm' | 'md' | 'lg' | 'full' - Size variant
  - **sm**: Small button for compact layouts
  - **md**: Default size for most use cases
  - **lg**: Large button for primary actions
  - **full**: Full-width button
- `disabled`: boolean - Disables the button interaction
- `type`: 'button' | 'submit' | 'reset' - HTML button type

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
<button lumaButton variant="primary">Primary</button>
<button lumaButton variant="outline">Outline</button>
<button lumaButton variant="ghost">Ghost</button>
<button lumaButton variant="danger">Delete</button>
```

### Sizes
```html
<button lumaButton size="sm">Small</button>
<button lumaButton size="md">Medium</button>
<button lumaButton size="lg">Large</button>
<button lumaButton size="full">Full Width</button>
```

### Disabled State
```html
<button lumaButton [disabled]="true">Disabled</button>
```

### Link as Button
```html
<a lumaButton href="/path" variant="primary">Link Button</a>
```

## Customizing Button Radius

The button border-radius is controlled by the `--luma-button-radius` CSS variable, which defaults to `var(--luma-radius-md)` (10px).

### Override Globally

Override the button border-radius in your global styles or component:

```css
/* In your global styles.css */
:root {
  --luma-button-radius: 4px;  /* More sharp */
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
