---
name: Badge
type: directive
selector: '[lumaBadge]'
category: Layout
description: A layout container for compact labels. Provides structural styling (padding, radius, typography) while the user controls colors via Tailwind or CSS classes.
imports:
  - name: LmBadgeDirective
    module: '@lumaui/angular'
tokenGroups:
  - name: Typography
    tokens:
      - name: --luma-badge-font-size
        value: '14px'
        description: Badge font size
      - name: --luma-badge-font-weight
        value: '500'
        description: Badge font weight (medium)
  - name: Spacing
    tokens:
      - name: --luma-badge-padding-x
        value: '15px'
        description: Badge horizontal padding
      - name: --luma-badge-padding-y
        value: '5px'
        description: Badge vertical padding
  - name: Border
    tokens:
      - name: --luma-badge-radius
        value: '9999px'
        description: Badge border radius (pill shape)
      - name: --luma-badge-border-width
        value: '1px'
        description: Badge border width
---

# Badge

## Purpose

The Badge directive is a layout container for compact labels. Following the Neo-Minimal principle that "colors are the user's responsibility", the badge provides only structural styling (padding, radius, typography) while the consumer controls colors through Tailwind or CSS classes.

## Usage Examples

### Examples

```html
<span lumaBadge>Label</span>
<span lumaBadge class="bg-blue-100 text-blue-800 border-blue-200">Info</span>
<span lumaBadge class="bg-green-100 text-green-800 border-green-200"
  >Success</span
>
<span lumaBadge class="bg-yellow-100 text-yellow-800 border-yellow-200"
  >Warning</span
>
<span lumaBadge class="bg-red-100 text-red-800 border-red-200">Error</span>
```

## Customizing

Override badge layout tokens in your global styles:

```css
:root {
  --luma-badge-radius: 4px; /* Sharp corners instead of pill */
  --luma-badge-border-width: 2px; /* Thicker border */
}
```

## Neo-Minimal Principles

The badge design embodies core Neo-Minimal values:

- **Layout-only**: Provides structure without imposing color opinions
- **User Control**: Consumer has full control over visual appearance
- **Organic Geometry**: Pill-shaped radius creates flowing, non-mechanical appearance
- **Functional Whitespace**: Compact padding maintains readability without crowding

## Accessibility

- Badges are semantic `<span>` elements by default
- Color is never the only indicator - text content provides meaning
- For count badges, consider adding `aria-label` for screen readers: `<span lumaBadge aria-label="24 new notifications">24</span>`

## Implementation Notes

- Uses Angular 20+ signal-based architecture
- Styled with Tailwind CSS v4 custom utilities
- Works on any inline element (`span`, `div`, etc.)
- Non-interactive by design - no hover/focus states
