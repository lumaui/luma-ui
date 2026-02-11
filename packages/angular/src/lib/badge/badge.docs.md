---
name: Badge
type: directive
selector: span[lumaBadge], div[lumaBadge]
category: Feedback
description: Small status indicators and labels. Minimal by design with two variants and flexible radius options.
imports:
  - name: LmBadgeDirective
    module: '@lumaui/angular'
inputs:
  - name: lmVariant
    type: "'default' | 'outline'"
    default: "'default'"
    description: Visual style variant
  - name: lmRadius
    type: "'default' | 'square' | 'full'"
    default: "'default'"
    description: Border radius variant
---

# Badge

## Purpose

Small, inline status indicators and labels. Designed with intentional minimalism: two variants provide visual structure, while semantic meaning (success, warning, error) is communicated through context and can be styled with Tailwind utilities when needed.

## Usage Examples

### Variants

```html
<span lumaBadge>Default</span>
<span lumaBadge lmVariant="outline">Outline</span>
```

### Radius Options

```html
<span lumaBadge lmRadius="default">Default</span>
<span lumaBadge lmRadius="square">Square</span>
<span lumaBadge lmRadius="full">Full</span>
```

### Custom with Tailwind

```html
<span lumaBadge class="bg-purple-500 text-white border-purple-600">
  Custom Colors
</span>
<span
  lumaBadge
  class="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent"
>
  Gradient Badge
</span>
```

## Accessibility

- ✅ **Semantic HTML**: Uses `<span>` or `<div>` appropriately
- ✅ **Sufficient contrast**: All variants meet WCAG AA standards (4.5:1)
- ✅ **Readable size**: 12px minimum text size

## Implementation Notes

- Inline element by default (`inline-flex`)
- Uses semantic tokens for base styling
- Fully customizable via `class` attribute
- Semantic states (success, warning, error) applied via Tailwind when needed
- Works with any Angular host element
