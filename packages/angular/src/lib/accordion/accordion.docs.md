---
name: Accordion
type: component
selector: luma-accordion-item
category: Layout
description: Expandable content sections with smooth animations and full accessibility support
imports:
  - name: LmAccordionGroupComponent
    module: '@lumaui/angular'
  - name: LmAccordionItemComponent
    module: '@lumaui/angular'
  - name: LmAccordionTriggerDirective
    module: '@lumaui/angular'
  - name: LmAccordionTitleDirective
    module: '@lumaui/angular'
  - name: LmAccordionIconDirective
    module: '@lumaui/angular'
  - name: LmAccordionContentDirective
    module: '@lumaui/angular'
inputs:
  - name: lmVariant
    type: "'default' | 'bordered' | 'filled'"
    default: "'default'"
    description: Visual style variant
  - name: lmId
    type: 'string'
    default: "''"
    description: Unique identifier (required when using AccordionGroup)
  - name: lmOpen
    type: 'boolean'
    default: 'false'
    description: Initial/controlled open state
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Whether the accordion item is disabled
directives:
  - name: AccordionTriggerDirective
    selector: div[lumaAccordionTrigger]
    description: Div element that toggles the accordion (uses role="button" for accessibility)
  - name: AccordionTitleDirective
    selector: '[lumaAccordionTitle]'
    description: Typography directive for the accordion title
    inputs:
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        default: "'md'"
        description: Title size variant
  - name: AccordionIconDirective
    selector: 'span[lumaAccordionIcon], div[lumaAccordionIcon]'
    description: Wrapper element with rotation animation for the chevron/icon
  - name: AccordionContentDirective
    selector: '[lumaAccordionContent]'
    description: Content area with fade animation
tokenGroups:
  - name: Item
    tokens:
      - name: --luma-accordion-item-radius
        value: 18px
        description: Border radius for accordion items
      - name: --luma-accordion-item-radius-bordered
        value: 18px
        description: Bordered variant border radius
      - name: --luma-accordion-item-border
        value: oklch(0.92 0.008 265)
        description: Border color
      - name: --luma-accordion-item-border-hover
        value: oklch(0.85 0.01 265)
        description: Border color on hover
      - name: --luma-accordion-item-background
        value: transparent
        description: Item background color
      - name: --luma-accordion-item-shadow
        value: 0 4px 12px oklch(0.22 0.01 265 / 0.08)
        description: Shadow for card variant
      - name: --luma-accordion-item-gap
        value: 0.5rem
        description: Gap between accordion items
  - name: Trigger
    tokens:
      - name: --luma-accordion-trigger-background
        value: transparent
        description: Trigger background
      - name: --luma-accordion-trigger-background-hover
        value: oklch(0.99 0 0)
        description: Trigger hover background
      - name: --luma-accordion-trigger-background-active
        value: oklch(0.97 0.005 265)
        description: Trigger active/click background
      - name: --luma-accordion-trigger-padding-x
        value: 1rem
        description: Trigger horizontal padding
      - name: --luma-accordion-trigger-padding-y
        value: 0.875rem
        description: Trigger vertical padding
      - name: --luma-accordion-trigger-gap
        value: 0.5rem
        description: Gap between trigger elements
  - name: Title
    tokens:
      - name: --luma-accordion-title-color
        value: oklch(0.22 0.01 265)
        description: Title text color
      - name: --luma-accordion-title-font-size
        value: 1rem
        description: Title font size (md)
      - name: --luma-accordion-title-font-size-sm
        value: 0.875rem
        description: Title font size (sm)
      - name: --luma-accordion-title-font-size-lg
        value: 1.125rem
        description: Title font size (lg)
      - name: --luma-accordion-title-font-weight
        value: '500'
        description: Title font weight
      - name: --luma-accordion-title-line-height
        value: '1.375'
        description: Title line height
      - name: --luma-accordion-title-letter-spacing
        value: '0'
        description: Title letter spacing
  - name: Icon
    tokens:
      - name: --luma-accordion-icon-color
        value: oklch(0.55 0.01 265)
        description: Icon color
      - name: --luma-accordion-icon-size
        value: 1rem
        description: Icon size
      - name: --luma-accordion-icon-rotation
        value: 180deg
        description: Icon rotation when open
      - name: --luma-accordion-icon-transition-duration
        value: 200ms
        description: Icon transition duration
  - name: Content
    tokens:
      - name: --luma-accordion-content-background
        value: transparent
        description: Content background
      - name: --luma-accordion-content-color
        value: oklch(0.45 0.01 265)
        description: Content text color
      - name: --luma-accordion-content-font-size
        value: 0.875rem
        description: Content font size (14px)
      - name: --luma-accordion-content-line-height
        value: '1.625'
        description: Content line height
      - name: --luma-accordion-content-padding-x
        value: 1rem
        description: Content horizontal padding
      - name: --luma-accordion-content-padding-top
        value: 0.25rem
        description: Content top padding
      - name: --luma-accordion-content-padding-bottom
        value: 1rem
        description: Content bottom padding
  - name: Transition
    tokens:
      - name: --luma-accordion-transition-duration
        value: 200ms
        description: Main transition duration
      - name: --luma-accordion-transition-duration-content
        value: 150ms
        description: Content fade transition duration
      - name: --luma-accordion-transition-timing
        value: ease-out
        description: Animation timing function
  - name: Focus
    tokens:
      - name: --luma-accordion-focus-ring-width
        value: 2px
        description: Focus ring width
      - name: --luma-accordion-focus-ring-color
        value: oklch(0.54 0.1 230 / 0.25)
        description: Focus ring color
      - name: --luma-accordion-focus-ring-offset
        value: 2px
        description: Focus ring offset
  - name: Bordered Variant
    tokens:
      - name: --luma-accordion-bordered-background
        value: transparent
        description: Bordered variant background
      - name: --luma-accordion-bordered-background-hover
        value: transparent
        description: Bordered variant hover background
      - name: --luma-accordion-bordered-radius
        value: 18px
        description: Bordered variant border radius
  - name: Filled Variant
    tokens:
      - name: --luma-accordion-filled-background
        value: oklch(0.99 0 0)
        description: Filled variant background color
      - name: --luma-accordion-filled-background-hover
        value: oklch(0.97 0.005 265)
        description: Filled variant hover background
      - name: --luma-accordion-filled-border
        value: transparent
        description: Filled variant border color
      - name: --luma-accordion-filled-border-hover
        value: transparent
        description: Filled variant hover border color
      - name: --luma-accordion-filled-radius
        value: 18px
        description: Filled variant border radius
customization:
  intro: The accordion appearance can be customized using CSS variables. All visual properties are exposed as tokens for maximum flexibility.
  examples:
    - title: Global Override
      overrideType: global
      description: Override accordion tokens in your global styles
      code: |
        :root {
          --luma-accordion-icon-rotation: 90deg;
          --luma-accordion-transition-duration: 150ms;
          --luma-accordion-item-radius: 8px;
        }
    - title: Theme Override
      overrideType: theme
      description: Apply different values for light and dark themes
      code: |
        /* Light mode */
        :root {
          --luma-accordion-item-border: oklch(0.92 0.008 265);
          --luma-accordion-trigger-background-hover: oklch(0.97 0.005 265);
        }

        /* Dark mode */
        .dark {
          --luma-accordion-item-border: oklch(0.35 0.01 265);
          --luma-accordion-trigger-background-hover: oklch(0.22 0.01 265);
        }
    - title: Context Override
      overrideType: component
      description: Scope changes to specific contexts using CSS selectors or data attributes
      code: |
        /* FAQ section with specific styling */
        .faq-section {
          --luma-accordion-item-radius: 0;
          --luma-accordion-title-font-weight: 600;
        }

        /* Style based on state */
        luma-accordion-item[data-state="open"] {
          --luma-accordion-item-border: oklch(0.54 0.1 230);
        }

        /* Style based on variant */
        luma-accordion-item[data-variant="filled"] {
          --luma-accordion-filled-background: oklch(0.97 0.005 265);
        }
---

# Accordion

## Purpose

The Accordion component provides expandable content sections following Neo-Minimal design principles. It uses a compositional architecture with separate directives for maximum flexibility and customization.

The component supports both standalone usage and controlled groups, allowing for complex business logic like "first item always open" or "maximum 2 items open".

## Usage Examples

### Basic Standalone

```html
<luma-accordion-item>
  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>What is Luma UI?</span>
    <span lumaAccordionIcon>
      <svg viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>

  <div lumaAccordionContent>
    <p>Luma UI is a Neo-Minimal design system for Angular applications.</p>
  </div>
</luma-accordion-item>
```

### Visual Variants

```html
<!-- Default: subtle styling -->
<luma-accordion-item lmVariant="default">
  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>Default Variant</span>
    <span lumaAccordionIcon>
      <svg viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
  <div lumaAccordionContent>Content here...</div>
</luma-accordion-item>

<!-- Bordered: visible border with border radius -->
<luma-accordion-item lmVariant="bordered">
  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>Bordered Variant</span>
    <span lumaAccordionIcon>
      <svg viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
  <div lumaAccordionContent>Content here...</div>
</luma-accordion-item>

<!-- Filled: unified solid background -->
<luma-accordion-item lmVariant="filled">
  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>Filled Variant</span>
    <span lumaAccordionIcon>
      <svg viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
  <div lumaAccordionContent>Content here...</div>
</luma-accordion-item>
```

### Custom Trigger Layout

```html
<luma-accordion-item>
  <div lumaAccordionTrigger>
    <!-- Icon with soft background -->
    <div
      class="w-10 h-10 rounded-lg lm-bg-primary/10 flex items-center justify-center"
    >
      <svg class="w-5 h-5 lm-text-primary">...</svg>
    </div>

    <!-- Title and description -->
    <div class="flex-1 text-left">
      <span lumaAccordionTitle>Feature Title</span>
      <p class="text-sm lm-text-secondary mt-0.5">Brief description</p>
    </div>

    <!-- Chevron icon -->
    <span lumaAccordionIcon>
      <svg viewBox="0 0 24 24" class="w-4 h-4">
        <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>

  <div lumaAccordionContent>
    <p>Detailed content goes here...</p>
  </div>
</luma-accordion-item>
```

### Controlled Group (Single Mode)

```html
<luma-accordion-group
  [lmValue]="activeItem()"
  (lmValueChange)="activeItem.set($event)"
>
  <luma-accordion-item lmId="item-1">
    <div lumaAccordionTrigger>
      <span lumaAccordionTitle>First Item</span>
      <span lumaAccordionIcon>
        <svg viewBox="0 0 24 24" class="w-4 h-4">
          <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <div lumaAccordionContent>Content for item 1</div>
  </luma-accordion-item>

  <luma-accordion-item lmId="item-2">...</luma-accordion-item>
  <luma-accordion-item lmId="item-3">...</luma-accordion-item>
</luma-accordion-group>
```

### Controlled Group (Multiple Mode)

```html
<luma-accordion-group
  [lmValue]="openItems()"
  (lmValueChange)="openItems.set($event)"
>
  <luma-accordion-item lmId="feature-1">
    <div lumaAccordionTrigger>
      <span lumaAccordionTitle>Feature One</span>
      <span lumaAccordionIcon>
        <svg viewBox="0 0 24 24" class="w-4 h-4">
          <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
    <div lumaAccordionContent>Details about feature one</div>
  </luma-accordion-item>

  <luma-accordion-item lmId="feature-2">...</luma-accordion-item>
  <luma-accordion-item lmId="feature-3">...</luma-accordion-item>
</luma-accordion-group>
```

## Accessibility

The accordion component follows WAI-ARIA Accordion Pattern:

| Attribute         | Element | Description                               |
| ----------------- | ------- | ----------------------------------------- |
| `aria-expanded`   | Trigger | Indicates open/closed state               |
| `aria-controls`   | Trigger | References the content panel ID           |
| `aria-labelledby` | Content | References the trigger ID                 |
| `aria-disabled`   | Trigger | Indicates disabled state                  |
| `aria-hidden`     | Icon    | Hides decorative icon from screen readers |
| `role="region"`   | Content | Defines content as a region               |
| `hidden`          | Content | Hides content when closed                 |

### Keyboard Navigation

| Key         | Action                             |
| ----------- | ---------------------------------- |
| `Enter`     | Toggle accordion                   |
| `Space`     | Toggle accordion                   |
| `Tab`       | Move to next focusable element     |
| `Shift+Tab` | Move to previous focusable element |

## Customizing

The accordion appearance can be customized using CSS variables. All visual properties are exposed as tokens for maximum flexibility.

### Override Globally

Override accordion tokens in your global styles:

```css
:root {
  --luma-accordion-icon-rotation: 90deg;
  --luma-accordion-transition-duration: 150ms;
  --luma-accordion-item-radius: 8px;
}
```

### Override Per Theme

Apply different values for light and dark themes:

```css
/* Light mode */
:root {
  --luma-accordion-item-border: oklch(0.92 0.008 265);
  --luma-accordion-trigger-background-hover: oklch(0.97 0.005 265);
}

/* Dark mode */
.dark {
  --luma-accordion-item-border: oklch(0.35 0.01 265);
  --luma-accordion-trigger-background-hover: oklch(0.22 0.01 265);
}
```

### Override Per Component

Scope changes to specific contexts using CSS selectors or data attributes:

```css
/* FAQ section with specific styling */
.faq-section {
  --luma-accordion-item-radius: 0;
  --luma-accordion-title-font-weight: 600;
}

/* Style based on state */
luma-accordion-item[data-state='open'] {
  --luma-accordion-item-border: oklch(0.54 0.1 230);
}

/* Style based on variant */
luma-accordion-item[data-variant='filled'] {
  --luma-accordion-filled-background: oklch(0.97 0.005 265);
}
```

## Neo-Minimal Principles

The Accordion component embodies Neo-Minimal design:

- **Visual Silence**: Subtle border and hover states that don't compete for attention
- **Calm Interactions**: Smooth 200ms ease-out transitions for natural feel
- **Functional Whitespace**: Generous padding creates hierarchy without borders
- **Silent Accessibility**: ARIA attributes and focus rings are built-in, not afterthoughts
- **Form & Geometry**: Soft corners (18px radius) suggest continuity, not rigidity
