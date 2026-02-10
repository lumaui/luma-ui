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

### Custom Styled with Tailwind

\`\`\`html

<!-- Custom card with Tailwind utilities and CSS variable overrides -->

<luma-card
lmVariant="elevated"
class="max-w-md overflow-hidden border-l-4 border-l-primary [--shadow-3:0_4px_12px_0_oklch(0.5_0.1_300_/_0.12)]"

>

  <!-- Header with gradient background -->
  <div class="relative -mx-6 -mt-6 mb-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 py-5 border-b border-border/50">
    <div lumaCardHeader>
      <h3 lumaCardTitle lmSize="lg" class="text-primary-9">
        Premium Feature Card
      </h3>
      <p lumaCardDescription lmSize="md" class="text-foreground/70">
        Fully customized with Tailwind utilities
      </p>
    </div>
  </div>

  <!-- Content section -->
  <div lumaCardContent class="space-y-4">
    <p class="text-sm leading-relaxed text-muted-foreground">
      This card demonstrates advanced customization using Tailwind's utility classes
      alongside Luma's semantic design tokens. Notice the custom border, shadow override,
      and gradient header.
    </p>

    <!-- Feature list -->
    <ul class="space-y-2 text-sm">
      <li class="flex items-start gap-2">
        <svg class="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-foreground">Custom border accent with semantic primary color</span>
      </li>
      <li class="flex items-start gap-2">
        <svg class="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-foreground">Scoped CSS variable override for shadow depth</span>
      </li>
      <li class="flex items-start gap-2">
        <svg class="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-foreground">Gradient header with negative margin compensation</span>
      </li>
    </ul>

    <!-- Stats grid -->
    <div class="grid grid-cols-3 gap-3 pt-2">
      <div class="rounded-md bg-primary-2 px-3 py-2 text-center border border-primary/10">
        <div class="text-lg font-semibold text-primary-9">24</div>
        <div class="text-xs text-primary-9/70">Features</div>
      </div>
      <div class="rounded-md bg-success/10 px-3 py-2 text-center border border-success/20">
        <div class="text-lg font-semibold text-success">98%</div>
        <div class="text-xs text-success/70">Uptime</div>
      </div>
      <div class="rounded-md bg-warning/10 px-3 py-2 text-center border border-warning/20">
        <div class="text-lg font-semibold text-warning">Fast</div>
        <div class="text-xs text-warning/70">Speed</div>
      </div>
    </div>

  </div>

  <!-- Custom footer (no directive needed) -->
  <div class="flex items-center justify-between gap-3 pt-4 border-t border-border/50 -mx-6 -mb-6 px-6 py-4 bg-muted/20">
    <button class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
      Learn More
    </button>
    <button lumaButton lmVariant="default" lmSize="sm">
      Get Started
    </button>
  </div>
</luma-card>
\`\`\`

## Customizing

### Global Override

\`\`\`css
:root {
--color-card: oklch(0.99 0.002 290); /_ Off-white _/
--radius-lg: 1rem; /_ More rounded _/
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
