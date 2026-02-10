---
name: Accordion
type: component
selector: luma-accordion-item
category: Layout
description: Expandable content sections with smooth animations using semantic tokens.
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
    type: "'default' | 'filled'"
    default: "'default'"
    description: Visual style variant
  - name: lmOpen
    type: boolean
    default: 'false'
    description: Whether the accordion is open
---

# Accordion

## Purpose

Expandable content sections with smooth height animations. Uses semantic tokens for consistent styling.

## Semantic Token Usage

- **Border:** `border-border`
- **Filled background:** `bg-muted/50`
- **Text:** `text-foreground`, `text-muted-foreground`
- **Hover:** `hover:underline`

## Usage Examples

### Basic Accordion

\`\`\`html
<luma-accordion-item [lmOpen]="true">

  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>Section Title</span>
    <span lumaAccordionIcon>▼</span>
  </div>
  <div lumaAccordionContent>
    <p>Content goes here</p>
  </div>
</luma-accordion-item>
\`\`\`

### Variants

\`\`\`html

<!-- Default (border-bottom) -->

<luma-accordion-item lmVariant="default">...</luma-accordion-item>

<!-- Filled (background color) -->

<luma-accordion-item lmVariant="filled">...</luma-accordion-item>
\`\`\`

### Accordion Group

\`\`\`html
<luma-accordion-group>
<luma-accordion-item lmId="item-1">
<div lumaAccordionTrigger>
<span lumaAccordionTitle>First</span>
</div>
<div lumaAccordionContent>Content 1</div>
</luma-accordion-item>

  <luma-accordion-item lmId="item-2">
    <div lumaAccordionTrigger>
      <span lumaAccordionTitle>Second</span>
    </div>
    <div lumaAccordionContent>Content 2</div>
  </luma-accordion-item>
</luma-accordion-group>
\`\`\`

### Custom Styled

```html
<!-- Custom accordion with Tailwind utility classes and scoped CSS variables -->
<luma-accordion-item
  lmVariant="filled"
  class="mb-3 overflow-hidden rounded-lg border-primary/20"
>
  <div
    lumaAccordionTrigger
    class="px-5 py-4 hover:bg-primary/5 transition-colors"
  >
    <span lumaAccordionTitle lmSize="lg" class="font-semibold text-primary-9">
      Custom Project Features
    </span>
    <span lumaAccordionIcon class="text-primary-9 h-5 w-5"> ▼ </span>
  </div>

  <div lumaAccordionContent class="px-5 pb-4">
    <div class="space-y-3 pt-1">
      <p class="text-sm leading-relaxed">
        This accordion demonstrates custom styling with Tailwind utilities. You
        can override colors, spacing, and typography while maintaining the
        component's functionality.
      </p>

      <!-- Feature badges using semantic tokens -->
      <div class="flex flex-wrap gap-2 pt-2">
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-2 text-primary-9 border border-primary/20"
        >
          <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            />
          </svg>
          Responsive Design
        </span>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20"
        >
          <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            />
          </svg>
          Accessibility
        </span>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning border border-warning/20"
        >
          <svg class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            />
          </svg>
          Dark Mode
        </span>
      </div>

      <!-- Info callout -->
      <div class="mt-3 rounded-md bg-muted/30 px-4 py-3 border border-border">
        <p class="text-xs text-muted-foreground leading-relaxed">
          <strong class="font-medium text-foreground">Tip:</strong>
          Combine Luma's semantic tokens with Tailwind's utility classes for
          rapid customization while maintaining design system consistency.
        </p>
      </div>
    </div>
  </div>
</luma-accordion-item>
```

## Customizing

### Global Override

\`\`\`css
:root {
--color-border: oklch(0.90 0.01 290); /_ Darker border _/
--color-muted: oklch(0.95 0.01 290); /_ Darker fill _/
}
\`\`\`

## Accessibility

- ✅ Keyboard navigation (Enter/Space to toggle)
- ✅ ARIA attributes (expanded, controls)
- ✅ Focus-visible states
- ✅ Screen reader friendly

## Implementation Notes

- Smooth height animation using CSS grid
- Uses semantic tokens exclusively
- OnPush change detection
- Supports single or multiple open items (via AccordionGroup)
