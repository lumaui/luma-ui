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

## Customizing

### Global Override

\`\`\`css
:root {
  --color-border: oklch(0.90 0.01 290);  /* Darker border */
  --color-muted: oklch(0.95 0.01 290);  /* Darker fill */
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
