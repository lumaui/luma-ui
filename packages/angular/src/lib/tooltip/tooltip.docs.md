---
name: Tooltip
type: directive
selector: '[lumaTooltip]'
category: Feedback
description: A modern, arrow-less tooltip directive for contextual information. Supports text and HTML content, auto-positioning, and hybrid mobile/desktop interactions.
imports:
  - name: LmTooltipDirective
    module: '@lumaui/angular'
inputs:
  - name: lumaTooltip
    type: 'string'
    default: required
    description: The content to display in the tooltip (text or HTML)
  - name: lmPosition
    type: "'top' | 'bottom' | 'left' | 'right'"
    default: "'top'"
    description: Preferred position of the tooltip relative to the trigger
  - name: lmHtml
    type: 'boolean'
    default: 'false'
    description: When true, renders the content as HTML instead of plain text
  - name: lmTrigger
    type: "'hover' | 'click' | 'focus'"
    default: "'hover'"
    description: The interaction type that shows the tooltip
  - name: lmDelay
    type: 'number'
    default: '0'
    description: Delay in milliseconds before showing the tooltip
tokenGroups:
  - name: Colors
    tokens:
      - name: --luma-tooltip-background
        value: 'oklch(0.15 0 0 / 0.9)'
        description: Tooltip background color (dark with slight transparency)
      - name: --luma-tooltip-text
        value: 'oklch(1 0 0)'
        description: Tooltip text color (white)
  - name: Typography
    tokens:
      - name: --luma-tooltip-font-size
        value: '13px'
        description: Tooltip font size
  - name: Spacing
    tokens:
      - name: --luma-tooltip-padding
        value: '8px'
        description: Uniform padding
      - name: --luma-tooltip-offset
        value: '8px'
        description: Distance from the trigger element
      - name: --luma-tooltip-max-width
        value: '400px'
        description: Maximum width for readability
  - name: Visual
    tokens:
      - name: --luma-tooltip-radius
        value: '8px'
        description: Border radius
      - name: --luma-tooltip-shadow
        value: '0 4px 12px oklch(0 0 0 / 0.15)'
        description: Subtle elevation shadow
  - name: Animation
    tokens:
      - name: --luma-tooltip-transition-duration
        value: '150ms'
        description: Animation duration
      - name: --luma-tooltip-transition-timing
        value: 'ease-out'
        description: Animation timing function
---

# Tooltip

## Purpose

The Tooltip directive provides contextual information on hover, click, or focus. Following Neo-Minimal principles, it features a modern arrow-less design with subtle animations and smart positioning that adapts to viewport boundaries.

## Usage Examples

### Basic Tooltip

```html
<button [lumaTooltip]="'Save your changes'" lumaButton>Save</button>
```

### Positioned Tooltips

```html
<button [lumaTooltip]="'Above'" lmPosition="top">Top</button>
<button [lumaTooltip]="'Below'" lmPosition="bottom">Bottom</button>
<button [lumaTooltip]="'Left side'" lmPosition="left">Left</button>
<button [lumaTooltip]="'Right side'" lmPosition="right">Right</button>
```

### HTML Content

```html
<span
  [lumaTooltip]="'<strong>Bold</strong> and <em>italic</em> text'"
  [lmHtml]="true"
>
  Rich content
</span>
```

### Click Trigger (Mobile-Friendly)

```html
<button [lumaTooltip]="'More information here'" lmTrigger="click">?</button>
```

### With Delay

```html
<button [lumaTooltip]="'Appears after 300ms'" [lmDelay]="300">Delayed</button>
```

### On Any Element

Tooltips work on any HTML element, not just buttons:

```html
<div [lumaTooltip]="'Works on divs'" class="p-4 border rounded">
  Hover this div
</div>

<span [lumaTooltip]="'Works on spans'" class="underline">
  Hover this span
</span>

<a href="/help" [lumaTooltip]="'Helpful link'"> Learn more </a>
```

## Customizing

Override tooltip tokens in your global styles:

```css
:root {
  --luma-tooltip-background: oklch(0.1 0 0 / 0.95);
  --luma-tooltip-text: oklch(1 0 0);
  --luma-tooltip-padding: 10px;
  --luma-tooltip-radius: 4px;
  --luma-tooltip-max-width: 320px;
}
```

## Neo-Minimal Principles

The tooltip design embodies core Neo-Minimal values:

- **Visual Silence**: Arrow-less design reduces visual noise and competing elements
- **Calm Interactions**: Subtle fade + scale animation (150ms ease-out) responds naturally
- **Organic Geometry**: Rounded corners create flowing, non-mechanical appearance
- **Light as Structure**: Shadow provides depth without hard edges

## Accessibility

- **ARIA Integration**: Automatically sets `aria-describedby` on the trigger element
- **Keyboard Support**: Shows on focus for keyboard users, dismissible with Escape
- **Touch-Friendly**: Hybrid behavior with tap-to-toggle on touch devices
- **Screen Readers**: Content is exposed via the tooltip's `role="tooltip"` attribute

## Mobile Behavior

The tooltip implements a hybrid interaction model:

- **Desktop**: Hover to show, mouse leave to hide
- **Touch Devices**: Tap to toggle, tap outside to dismiss
- **Focus**: Always shows on focus for keyboard accessibility

This ensures a consistent experience across all device types without requiring separate implementations.

## Auto-Flip

When the tooltip would overflow the viewport, it automatically flips to the opposite position. For example, a `top` tooltip near the top of the screen will flip to `bottom`.

## Implementation Notes

- Uses Angular 20+ signal-based architecture with `input()` and `signal()`
- Platform-aware with SSR support via `isPlatformBrowser` checks
- GPU-accelerated animations using `transform` and `opacity`
- Auto-cleanup on component destruction
- Position recalculation via `requestAnimationFrame` for smooth updates
