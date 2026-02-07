---
name: Tooltip
type: directive
selector: '[lumaTooltip]'
category: Feedback
description: High-contrast contextual information overlay rendered via portal to avoid overflow clipping.
imports:
  - name: LmTooltipDirective
    module: '@lumaui/angular'
inputs:
  - name: lumaTooltip
    type: string
    default: "''"
    description: Tooltip content text (required)
  - name: lmPosition
    type: "'top' | 'bottom' | 'left' | 'right'"
    default: "'top'"
    description: Preferred tooltip position (auto-flips near viewport edges)
  - name: lmHtml
    type: boolean
    default: 'false'
    description: Whether to render content as HTML instead of plain text
  - name: lmTrigger
    type: "'hover' | 'click' | 'focus'"
    default: "'hover'"
    description: Trigger interaction type
  - name: lmDelay
    type: number
    default: '0'
    description: Delay in milliseconds before showing the tooltip
---

# Tooltip

## Purpose

Displays contextual information on hover/focus using a portal pattern for reliable rendering. The tooltip is appended to `document.body` with fixed positioning, ensuring it is never clipped by ancestor `overflow: hidden` containers.

## Semantic Token Usage

- **Background:** `bg-popover` (dark in light theme, light in dark theme)
- **Text:** `text-popover-foreground` (light in light theme, dark in dark theme)
- **Radius:** `rounded-md`
- **Shadow:** `shadow-md`
- **Max width:** `max-w-[360px]`

## Usage Examples

### Basic Tooltip

```html
<button lumaButton lumaTooltip="Click to save">
  Save
</button>
```

### Positioning

```html
<button lumaTooltip="Top tooltip" lmPosition="top">Hover me</button>
<button lumaTooltip="Bottom tooltip" lmPosition="bottom">Hover me</button>
<button lumaTooltip="Left tooltip" lmPosition="left">Hover me</button>
<button lumaTooltip="Right tooltip" lmPosition="right">Hover me</button>
```

### With Delay

```html
<button lumaTooltip="Appears after 300ms" [lmDelay]="300">
  Delayed Tooltip
</button>
```

### Click Trigger

```html
<button lumaTooltip="Click to toggle" lmTrigger="click">
  Click me
</button>
```

## Customizing

### Global Override

```css
:root {
  --color-popover: oklch(0.20 0.010 270);
  --color-popover-foreground: oklch(0.95 0.01 270);
  --radius-md: 0.25rem;
}
```

## Accessibility

- Keyboard accessible (shows on focus)
- ARIA `describedby` links trigger to tooltip
- Escape key dismisses tooltip
- Proper z-index (doesn't block interaction)

## Implementation Notes

- **Portal pattern:** Tooltip is rendered as a direct child of `document.body`, not the trigger element
- **Fixed positioning:** Uses `position: fixed` with JS-calculated coordinates from `getBoundingClientRect()`
- **Scroll tracking:** Listens for scroll (capture phase) and resize events to reposition while visible
- **Auto-flip:** Automatically flips to opposite side when near viewport edges
- **Zone-optimized:** Scroll/resize listeners run outside NgZone for performance
- 200ms fade transition
