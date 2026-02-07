---
name: Card
type: component
selector: luma-card
category: Layout
description: Container component for grouping related content with semantic token styling.
imports:
  - name: LmCardComponent
    module: '@lumaui/angular'
  - name: LmCardTitleDirective
    module: '@lumaui/angular'
  - name: LmCardDescriptionDirective
    module: '@lumaui/angular'
  - name: LmCardHeaderDirective
    module: '@lumaui/angular'
  - name: LmCardContentDirective
    module: '@lumaui/angular'
  - name: LmCardFooterDirective
    module: '@lumaui/angular'
inputs:
  - name: lmVariant
    type: "'default' | 'elevated' | 'subtle'"
    default: "'default'"
    description: Visual style variant
---

# Card

## Purpose

Container component for grouping related content. Uses semantic tokens for consistent, customizable styling.

## Semantic Token Usage

- **Background:** `bg-card`, `text-card-foreground`
- **Border:** `border-border`
- **Radius:** `rounded-lg` (uses `--radius-lg`)
- **Shadow (elevated):** `shadow-sm`

**Variants:**
- **Default:** Basic card with border
- **Elevated:** Adds `shadow-sm` for depth
- **Subtle:** Uses `bg-muted` instead of `bg-card`

## Usage Examples

### Basic Card

\`\`\`html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Title</h3>
    <p lumaCardDescription>Description</p>
  </div>
  <div lumaCardContent>
    <p>Content goes here</p>
  </div>
</luma-card>
\`\`\`

### Variants

\`\`\`html
<luma-card lmVariant="default">Default</luma-card>
<luma-card lmVariant="elevated">Elevated</luma-card>
<luma-card lmVariant="subtle">Subtle</luma-card>
\`\`\`

### With Footer

\`\`\`html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Confirm Action</h3>
  </div>
  <div lumaCardContent>
    <p>Are you sure?</p>
  </div>
  <div lumaCardFooter>
    <button lumaButton lmVariant="outline">Cancel</button>
    <button lumaButton>Confirm</button>
  </div>
</luma-card>
\`\`\`

## Customizing

### Global Override

\`\`\`css
:root {
  --color-card: oklch(0.99 0.002 290);  /* Off-white */
  --radius-lg: 1rem;  /* More rounded */
}
\`\`\`

### Instance Override

\`\`\`html
<luma-card className="border-accent shadow-lg">
  Custom Card
</luma-card>
\`\`\`

## Title & Description Sizes

**CardTitle:**
- `lmSize="sm"`: Small title
- `lmSize="md"`: Medium (default)
- `lmSize="lg"`: Large title

**CardDescription:**
- `lmSize="sm"`: Small text
- `lmSize="md"`: Medium (default)

## Accessibility

- ✅ Semantic HTML structure
- ✅ Proper heading hierarchy
- ✅ Focus-visible states for interactive elements

## Implementation Notes

- Component-based (not directive)
- Uses semantic tokens exclusively  
- Flexible layout with directives
- OnPush change detection
