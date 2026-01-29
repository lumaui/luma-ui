---
name: Card
type: component
selector: luma-card
category: Layout
description: Flexible, composable container for grouping related content with multiple visual variants following Neo-Minimal design principles.
inputs:
  - name: lmVariant
    type: "'default' | 'shadow' | 'nested' | 'preview'"
    default: "'default'"
    description: Card visual style variant
directives:
  - name: lumaCardHeader
    selector: '[lumaCardHeader]'
    description: Container for card header content (title and description)
  - name: lumaCardTitle
    selector: '[lumaCardTitle]'
    description: Card title with customizable size
    inputs:
      - name: lmSize
        type: "'small' | 'normal' | 'large'"
        default: "'normal'"
        description: Title size variant
  - name: lumaCardDescription
    selector: '[lumaCardDescription]'
    description: Card description text with customizable size
    inputs:
      - name: lmSize
        type: "'small' | 'normal' | 'large'"
        default: "'normal'"
        description: Description size variant
  - name: lumaCardContent
    selector: '[lumaCardContent]'
    description: Container for card main content
tokens:
  # Default variant
  - name: --luma-card-background
    value: oklch(1 0 0)
    description: Card background color
  - name: --luma-color-neutral-60
    value: oklch(0.92 0.008 265)
    description: Border color for default variant (neutral light)
  - name: --luma-card-padding
    value: 1.5rem
    description: Card internal padding
  - name: --luma-card-box-shadow
    value: 0px 2px 0 0px #e4e4e4
    description: Legacy card shadow
  # Shadow variant
  - name: --luma-card-shadow-background
    value: oklch(1 0 0)
    description: Shadow card background
  - name: --luma-card-shadow-border
    value: oklch(0.92 0.008 265)
    description: Shadow card border
  - name: --luma-card-shadow-shadow
    value: 0 8px 24px oklch(0.22 0.01 265 / 0.06)
    description: Shadow card shadow
  - name: --luma-card-shadow-radius
    value: 16px
    description: Shadow card border radius
  # Nested variant
  - name: --luma-card-nested-background
    value: oklch(0.98 0.005 265)
    description: Nested card background
  - name: --luma-card-nested-border
    value: oklch(0.92 0.008 265)
    description: Nested card border
  - name: --luma-card-nested-radius
    value: 12px
    description: Nested card border radius
  # Preview variant
  - name: --luma-card-preview-background
    value: oklch(0.98 0.005 265)
    description: Preview card background
  - name: --luma-card-preview-border
    value: oklch(0.92 0.008 265)
    description: Preview card border
  - name: --luma-card-preview-radius
    value: 12px
    description: Preview card border radius
---

# Card

## Purpose

The Card component provides a flexible, composable container for grouping related content with multiple visual variants that follow Neo-Minimal design principles. Built using a compositional architecture with semantic directives.

## Architecture

The Card uses a **compositional design** with a main component and four semantic directives:

- `<luma-card>`: Main container with configurable visual variant
- `[lumaCardHeader]`: Structural directive for header region with spacing
- `[lumaCardTitle]`: Title with size variants
- `[lumaCardDescription]`: Subtitle/description with size variants
- `[lumaCardContent]`: Semantic marker for main content region

## Component API

### CardComponent

- `lmVariant`: 'default' | 'shadow' | 'nested' | 'preview' - Card visual style
  - **default**: Solid border style with neutral color (default)
  - **shadow**: Elevated card with subtle shadow for primary content
  - **nested**: Subtle background for sections within cards
  - **preview**: For documentation examples and code previews

### CardTitleDirective

- `lmSize`: 'small' | 'normal' | 'large' - Title size variant
  - **small**: `text-sm` - Compact cards or secondary information
  - **normal**: `text-lg` (default) - Standard card titles
  - **large**: `text-2xl` - Hero cards or primary emphasis

### CardDescriptionDirective

- `lmSize`: 'small' | 'normal' | 'large' - Description size variant
  - **small**: `text-xs` - Compact cards or tertiary information
  - **normal**: `text-sm` (default) - Standard descriptions
  - **large**: `text-base` - Emphasis or standalone descriptions

### CardHeaderDirective

No inputs - provides structural spacing (`mb-4`).

### CardContentDirective

No inputs - semantic marker with no styles applied for maximum flexibility.

## Card Variants

The Card component supports four visual variants via the `lmVariant` input:

### Default

Solid border style with neutral color for clean separation (default):

```html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Default Card</h3>
    <p lumaCardDescription>Card with solid border</p>
  </div>
  <div lumaCardContent>
    <p>Content with clean border styling.</p>
  </div>
</luma-card>
```

### Shadow

Elevated card with shadow, ideal for primary content areas and main UI elements:

```html
<luma-card lmVariant="shadow">
  <div lumaCardHeader>
    <h3 lumaCardTitle>Shadow Card</h3>
    <p lumaCardDescription>Elevated card with subtle shadow</p>
  </div>
  <div lumaCardContent>
    <p>Primary content with clean, elevated appearance.</p>
  </div>
</luma-card>
```

### Nested

Subtle background for sections within other containers or cards:

```html
<luma-card lmVariant="shadow">
  <div lumaCardHeader>
    <h3 lumaCardTitle>Parent Card</h3>
  </div>
  <div lumaCardContent>
    <!-- Nested card inside -->
    <luma-card lmVariant="nested">
      <div lumaCardContent>
        <p>Nested content with subtle differentiation.</p>
      </div>
    </luma-card>
  </div>
</luma-card>
```

### Preview

For documentation examples, code showcases, and component previews:

```html
<luma-card lmVariant="preview">
  <div lumaCardContent>
    <div class="flex items-center justify-center p-8">
      <!-- Component preview -->
      <button lumaButton lmVariant="primary">Preview Button</button>
    </div>
  </div>
</luma-card>
```

## Usage Examples

### Basic Card

```html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Card Title</h3>
    <p lumaCardDescription>This is a description of the card content.</p>
  </div>
  <div lumaCardContent>
    <p>Main content goes here.</p>
  </div>
</luma-card>
```

### Stats Card

```html
<luma-card lmVariant="shadow">
  <div lumaCardHeader>
    <h3 lumaCardTitle lmSize="small">Total Revenue</h3>
  </div>
  <div lumaCardContent>
    <p class="text-3xl font-bold">$45,231.89</p>
    <p class="text-xs lm-text-secondary">+20.1% from last month</p>
  </div>
</luma-card>
```

### Minimal Card (No Header)

```html
<luma-card lmVariant="nested">
  <div lumaCardContent>
    <p>Simple content without header or title.</p>
  </div>
</luma-card>
```

### Card with Custom Content

```html
<luma-card lmVariant="shadow">
  <div lumaCardHeader>
    <h3 lumaCardTitle>User Profile</h3>
    <p lumaCardDescription>Manage your account settings</p>
  </div>
  <div lumaCardContent>
    <div class="flex items-center gap-4">
      <img src="avatar.jpg" alt="Avatar" class="w-12 h-12 rounded-full" />
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm lm-text-secondary">john@example.com</p>
      </div>
    </div>
  </div>
</luma-card>
```

### Dashboard Layout with Mixed Variants

```html
<!-- Main content card -->
<luma-card lmVariant="shadow">
  <div lumaCardHeader>
    <h2 lumaCardTitle lmSize="large">Dashboard</h2>
  </div>
  <div lumaCardContent>
    <div class="grid grid-cols-3 gap-4">
      <!-- Nested stat cards -->
      <luma-card lmVariant="nested">
        <div lumaCardContent>
          <p class="text-xs lm-text-secondary">Users</p>
          <p class="text-2xl font-bold">1,234</p>
        </div>
      </luma-card>
      <luma-card lmVariant="nested">
        <div lumaCardContent>
          <p class="text-xs lm-text-secondary">Revenue</p>
          <p class="text-2xl font-bold">$12.5k</p>
        </div>
      </luma-card>
      <luma-card lmVariant="nested">
        <div lumaCardContent>
          <p class="text-xs lm-text-secondary">Growth</p>
          <p class="text-2xl font-bold">+15%</p>
        </div>
      </luma-card>
    </div>
  </div>
</luma-card>
```

## Border Design

The **default** variant uses a clean 1px solid border that aligns with Neo-Minimal principles:

**How it works:**

1. Wrapper has `border` class for 1px border width
2. Border color uses `neutral-60` from the color palette
3. Creates subtle separation without visual noise

**Neo-Minimal alignment:**

- Minimal visual weight - border doesn't compete for attention
- Uses functional whitespace and subtle structure
- Light mode: Soft neutral gray for gentle separation
- Dark mode: Adjusted neutral for proper contrast

## Customizing

The card appearance can be customized using CSS variables defined in `@lumaui/tokens`.

### Override Globally

Override card tokens in your global styles to apply changes across your entire application:

```css
/* In your global styles.css */
:root {
  --luma-card-shadow-background: #ffffff;
  --luma-card-shadow-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  --luma-card-padding: 24px;
}
```

### Override Per Theme

Apply different card styles for light and dark themes:

```css
/* Light mode */
:root {
  --luma-card-shadow-background: #fafafa;
}

/* Dark mode */
.dark {
  --luma-card-shadow-background: oklch(0.18 0.005 265);
  --luma-card-nested-background: oklch(0.2 0.005 265);
}
```

### Override Per Component

Scope token overrides to specific contexts or containers:

```css
/* Cards in sidebar - more compact */
.sidebar {
  --luma-card-padding: 16px;
}

/* Cards in hero section - more prominent shadow */
.hero {
  --luma-card-shadow-shadow: 0 12px 32px oklch(0.22 0.01 265 / 0.1);
}
```

## Neo-Minimal Principles

The Card design embodies core Neo-Minimal values:

- **Visual Silence**: Subtle borders and shadows, never demands attention
- **Light as Structure**: Luminosity differences create depth without heavy shadows
- **Functional Whitespace**: Generous padding (`24px` default) creates hierarchy
- **Form & Geometry**: Rounded corners (`16px` product, `12px` nested) feel organic
- **Organic Geometry**: Soft edges flow naturally, avoiding hard mechanical lines
- **Editorial Color**: No brand colors in structure - neutral tones only
- **Compositional Architecture**: Directives compose semantically, not through rigid templates

## Accessibility

- **Semantic HTML**: Proper heading hierarchy with `<h2>`, `<h3>`, `<h4>` elements
- **Color contrast**: Background and text meet WCAG AA 4.5:1 minimum
- **Readable typography**: Generous line-height and spacing for comfortable reading
- **Theme support**: Both light and dark modes maintain accessibility standards
- **Flexible structure**: No enforced heading levels - adapt to your document outline

**Accessibility Notes:**

- Use appropriate heading levels (`<h2>`, `<h3>`, etc.) with `lumaCardTitle` directive
- Ensure descriptions provide meaningful context for screen reader users
- Maintain logical heading hierarchy in your document

## Implementation Notes

- Uses Angular 20+ signal-based computed values (`computed()`)
- Styled with Tailwind CSS v4 utilities referencing design tokens with `lm-` prefix
- Type-safe variant types exported: `CardVariant`, `CardTitleVariants`, `CardDescriptionVariants`
- OnPush change detection for optimal performance
- Compositional architecture allows flexible content projection

## When to Use Each Variant

| Variant   | Use Case                                               |
| --------- | ------------------------------------------------------ |
| `default` | Default styling, clean solid border with neutral color |
| `shadow`  | Primary content, main UI cards, elevated sections      |
| `nested`  | Sections within cards, grouped content, stat blocks    |
| `preview` | Documentation examples, component showcases            |

**Avoid using Card when:**

- Content doesn't need visual separation (use whitespace instead)
- Creating overly nested card-within-card layouts (violates visual silence)
- Every element needs a container (over-containerization)
- A simple list would suffice

**Remember:** Per Neo-Minimal principles, "If an element can be removed without functional or semantic loss, it shouldn't exist."

## Design Token Reference

### Default Variant Tokens

| Token                     | Default Value           | Purpose               |
| ------------------------- | ----------------------- | --------------------- |
| `--luma-card-background`  | `oklch(1 0 0)`          | Card background color |
| `--luma-color-neutral-60` | `oklch(0.92 0.008 265)` | Border color          |
| `--luma-card-padding`     | `1.5rem`                | Inner content padding |

### Shadow Variant Tokens

| Token                           | Default Value                            | Purpose         |
| ------------------------------- | ---------------------------------------- | --------------- |
| `--luma-card-shadow-background` | `oklch(1 0 0)`                           | Card background |
| `--luma-card-shadow-border`     | `oklch(0.92 0.008 265)`                  | Border color    |
| `--luma-card-shadow-shadow`     | `0 8px 24px oklch(0.22 0.01 265 / 0.06)` | Soft elevation  |
| `--luma-card-shadow-radius`     | `16px`                                   | Border radius   |

### Nested Variant Tokens

| Token                           | Default Value           | Purpose           |
| ------------------------------- | ----------------------- | ----------------- |
| `--luma-card-nested-background` | `oklch(0.98 0.005 265)` | Subtle background |
| `--luma-card-nested-border`     | `oklch(0.92 0.008 265)` | Border color      |
| `--luma-card-nested-radius`     | `12px`                  | Border radius     |

### Preview Variant Tokens

| Token                            | Default Value           | Purpose            |
| -------------------------------- | ----------------------- | ------------------ |
| `--luma-card-preview-background` | `oklch(0.98 0.005 265)` | Preview background |
| `--luma-card-preview-border`     | `oklch(0.92 0.008 265)` | Border color       |
| `--luma-card-preview-radius`     | `12px`                  | Border radius      |

**Note:** Dark theme values are defined in `card.dark.json` and automatically applied via `.dark` selector.
