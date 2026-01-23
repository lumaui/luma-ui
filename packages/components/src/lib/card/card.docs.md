# Card

## Purpose

The Card component provides a flexible, composable container for grouping related content with a distinctive gradient border technique that follows Neo-Minimal design principles. Built using a compositional architecture with semantic directives.

## Architecture

The Card uses a **compositional design** with a main component and four semantic directives:

- `<luma-card>`: Main container with gradient border technique
- `[lumaCardHeader]`: Structural directive for header region with spacing
- `[lumaCardTitle]`: Title with size variants
- `[lumaCardDescription]`: Subtitle/description with size variants
- `[lumaCardContent]`: Semantic marker for main content region

## Component API

### CardComponent

No inputs - structural container only.

### CardTitleDirective

- `size`: 'small' | 'normal' | 'large' - Title size variant
  - **small**: `text-sm` - Compact cards or secondary information
  - **normal**: `text-lg` (default) - Standard card titles
  - **large**: `text-2xl` - Hero cards or primary emphasis

### CardDescriptionDirective

- `size`: 'small' | 'normal' | 'large' - Description size variant
  - **small**: `text-xs` - Compact cards or tertiary information
  - **normal**: `text-sm` (default) - Standard descriptions
  - **large**: `text-base` - Emphasis or standalone descriptions

### CardHeaderDirective

No inputs - provides structural spacing (`mb-4`).

### CardContentDirective

No inputs - semantic marker with no styles applied for maximum flexibility.

## States

The Card is a **non-interactive presentational component** with no interactive states. It maintains a single visual state that adapts to theme (light/dark).

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

### Size Variants

```html
<!-- Small compact card -->
<luma-card>
  <div lumaCardHeader>
    <h4 lumaCardTitle size="small">Compact Card</h4>
    <p lumaCardDescription size="small">Brief description.</p>
  </div>
  <div lumaCardContent>
    <p>Content</p>
  </div>
</luma-card>

<!-- Large hero card -->
<luma-card>
  <div lumaCardHeader>
    <h2 lumaCardTitle size="large">Hero Card</h2>
    <p lumaCardDescription size="large">Prominent description for emphasis.</p>
  </div>
  <div lumaCardContent>
    <p>Primary content area.</p>
  </div>
</luma-card>
```

### Stats Card

```html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle size="small">Total Revenue</h3>
  </div>
  <div lumaCardContent>
    <p class="text-3xl font-bold">$45,231.89</p>
    <p class="text-xs text-text-secondary">+20.1% from last month</p>
  </div>
</luma-card>
```

### Minimal Card (No Header)

```html
<luma-card>
  <div lumaCardContent>
    <p>Simple content without header or title.</p>
  </div>
</luma-card>
```

### Card with Custom Content

```html
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>User Profile</h3>
    <p lumaCardDescription>Manage your account settings</p>
  </div>
  <div lumaCardContent>
    <div class="flex items-center gap-4">
      <img src="avatar.jpg" alt="Avatar" class="w-12 h-12 rounded-full" />
      <div>
        <p class="font-medium">John Doe</p>
        <p class="text-sm text-text-secondary">john@example.com</p>
      </div>
    </div>
  </div>
</luma-card>
```

## Gradient Border Technique

The Card uses a **distinctive gradient border technique** that aligns with Neo-Minimal principles:

**How it works:**

1. Outer wrapper has `p-[1px]` padding + `bg-gradient-to-b` gradient
2. Inner content has matching border-radius (slightly smaller for visual precision)
3. Gradient creates a subtle "light as structure" effect instead of hard borders

**Visual effect:**

- Light mode: Subtle gradient from light gray to slightly darker gray
- Dark mode: Inverted gradient for depth perception
- No hard borders, shadows, or mechanical separators
- Depth is perceived through luminosity differences

This technique exemplifies the Neo-Minimal principle: **"Light as Structure, not decoration"**.

## Customizing Card Tokens

The card appearance is controlled by design tokens defined in `@luma/tokens`:

### Available Tokens

- `--luma-card-background`: Inner card background color
- `--luma-card-gradient-from`: Top gradient color (border effect)
- `--luma-card-gradient-to`: Bottom gradient color (border effect)
- `--luma-card-padding`: Inner content padding

### Override Globally

```css
/* In your global styles.css */
:root {
  --luma-card-background: #ffffff;
  --luma-card-gradient-from: oklch(0.95 0 0);
  --luma-card-gradient-to: oklch(0.85 0 0);
  --luma-card-padding: 24px;
}
```

### Override Per Theme

```css
/* Light mode */
:root {
  --luma-card-background: #fafafa;
}

/* Dark mode */
.dark {
  --luma-card-background: oklch(0.15 0 0);
  --luma-card-gradient-from: oklch(0.25 0 0);
  --luma-card-gradient-to: oklch(0.18 0 0);
}
```

### Override Per Context

```css
/* Cards in sidebar - more compact */
.sidebar {
  --luma-card-padding: 16px;
}

/* Cards in hero section - more prominent gradient */
.hero {
  --luma-card-gradient-from: oklch(0.9 0.02 230);
  --luma-card-gradient-to: oklch(0.85 0.01 230);
}
```

## Neo-Minimal Principles

The Card design embodies core Neo-Minimal values:

- **Visual Silence**: Gradient border is subtle, never demands attention
- **Light as Structure**: Luminosity differences create depth without shadows
- **Functional Whitespace**: Generous padding (`24px` default) creates hierarchy
- **Form & Geometry**: Rounded corners (`18px`) feel organic, not calculated
- **Organic Geometry**: Gradient flows naturally, avoiding hard mechanical lines
- **Editorial Color**: No brand colors in structure - neutral tones only
- **Compositional Architecture**: Directives compose semantically, not through rigid templates

## Accessibility

- ✅ **Semantic HTML**: Proper heading hierarchy with `<h2>`, `<h3>`, `<h4>` elements
- ✅ **Color contrast**: Background and text meet WCAG AA 4.5:1 minimum
- ✅ **Readable typography**: Generous line-height and spacing for comfortable reading
- ✅ **Theme support**: Both light and dark modes maintain accessibility standards
- ✅ **Flexible structure**: No enforced heading levels - adapt to your document outline

**Accessibility Notes:**

- Use appropriate heading levels (`<h2>`, `<h3>`, etc.) with `lumaCardTitle` directive
- Ensure descriptions provide meaningful context for screen reader users
- Maintain logical heading hierarchy in your document

## Implementation Notes

- Uses Angular 20+ signal-based computed values (`computed()`)
- Styled with Tailwind CSS v4 utilities referencing design tokens
- Type-safe variant types exported: `CardTitleVariants`, `CardDescriptionVariants`
- OnPush change detection for optimal performance
- Compositional architecture allows flexible content projection
- Gradient border technique uses nested div structure with precise border-radius calculation

## When to Use Card

**Good use cases:**

- Grouping related information (user profiles, stats, settings)
- Creating visual hierarchy in dashboard layouts
- Presenting discrete content blocks (blog post previews, product listings)
- Containing forms or interactive elements in a defined region

**Avoid using Card when:**

- Content doesn't need visual separation (use whitespace instead)
- Creating overly nested card-within-card layouts (violates visual silence)
- Every element needs a container (over-containerization)
- A simple list would suffice

**Remember:** Per Neo-Minimal principles, "If an element can be removed without functional or semantic loss, it shouldn't exist."

## Composition Best Practices

**Directive usage:**

- `lumaCardHeader` is optional - omit for minimal cards
- `lumaCardTitle` and `lumaCardDescription` work independently - use one or both
- `lumaCardContent` is a semantic marker - use for clarity, not required
- Directives can be applied to any element - not restricted to `<div>`

**Flexible composition:**

```html
<!-- Valid: Header with title only -->
<luma-card>
  <div lumaCardHeader>
    <h3 lumaCardTitle>Just a Title</h3>
  </div>
  <p>Content without explicit lumaCardContent directive</p>
</luma-card>

<!-- Valid: No header at all -->
<luma-card>
  <p>Minimal card with only content</p>
</luma-card>

<!-- Valid: Custom elements with directives -->
<luma-card>
  <header lumaCardHeader>
    <h2 lumaCardTitle size="large">Custom Header Element</h2>
    <span lumaCardDescription>Using semantic HTML5</span>
  </header>
  <article lumaCardContent>
    <p>Content in article element</p>
  </article>
</luma-card>
```

## Design Token Reference

| Token                       | Default Value             | Purpose               |
| --------------------------- | ------------------------- | --------------------- |
| `--luma-card-background`    | `oklch(0.99 0 0)` (light) | Inner card background |
| `--luma-card-gradient-from` | `oklch(0.95 0 0)` (light) | Top gradient edge     |
| `--luma-card-gradient-to`   | `oklch(0.88 0 0)` (light) | Bottom gradient edge  |
| `--luma-card-padding`       | `24px`                    | Inner content padding |

**Note:** Dark theme values are defined in `card.dark.json` and automatically applied via `.dark` selector.
