# Luma UI

Neo-Minimal design system for Angular applications.

[![npm version](https://img.shields.io/npm/v/@lumaui/angular.svg)](https://www.npmjs.com/package/@lumaui/angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-19+-dd0031.svg)](https://angular.io/)

## What is Luma?

Luma is a design system built on **Neo-Minimalism** - a design philosophy that creates interfaces with calm, intentional simplicity. It provides **24 semantic design tokens** and Angular components that prioritize:

- **Visual Silence** - Elements don't compete; hierarchy is perceived effortlessly
- **Functional Whitespace** - Space as invisible structure, not empty filler
- **Calm Interactions** - Gentle feedback with natural transitions
- **Silent Accessibility** - WCAG AA compliance built into the design, not bolted on

## Features

- **24 semantic design tokens** - Simple, runtime-customizable theme system
- **Standard Tailwind utilities** - Familiar syntax (`bg-primary`, `text-foreground`, `rounded-md`)
- **Angular 19+ standalone components** - Modern reactive patterns with signals
- **Type-safe variants** - CVA-powered variant system with TypeScript safety
- **OKLCH color space** - Perceptually uniform colors with predictable lightness
- **Automatic dark theme** - Toggle with a single class (`<html class="dark">`)
- **WCAG AA accessible** - Focus management, ARIA attributes, keyboard navigation

## Packages

| Package                                                            | Description                                |
| ------------------------------------------------------------------ | ------------------------------------------ |
| [`@lumaui/tokens`](https://www.npmjs.com/package/@lumaui/tokens)   | 24 semantic design tokens (light + dark)   |
| [`@lumaui/angular`](https://www.npmjs.com/package/@lumaui/angular) | Angular components and directives          |
| [`@lumaui/core`](https://www.npmjs.com/package/@lumaui/core)       | Framework-agnostic CVA variant definitions |

## Quick Start

### Installation

```bash
npm install @lumaui/angular
```

### Setup

Add Luma tokens to your global styles (e.g., `src/styles.css`):

```css
@import 'tailwindcss';
@import '@lumaui/tokens';
```

Dark theme support (optional):

```html
<!-- Toggle dark theme by adding 'dark' class to <html> -->
<html class="dark">
  <!-- Your app uses dark theme tokens automatically -->
</html>
```

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [LmButtonDirective],
  template: `
    <button lumaButton lmVariant="primary" lmSize="md">Click me</button>
  `,
})
export class ExampleComponent {}
```

## Components

### Button

Directive-based button with semantic color variants.

```html
<!-- Variants: primary, secondary, outline, ghost, destructive -->
<button lumaButton lmVariant="primary">Primary Action</button>
<button lumaButton lmVariant="secondary">Secondary</button>
<button lumaButton lmVariant="outline">Outline</button>
<button lumaButton lmVariant="ghost">Ghost</button>
<button lumaButton lmVariant="destructive">Delete</button>

<!-- Sizes: sm, md, lg -->
<button lumaButton lmSize="sm">Small</button>
<button lumaButton lmSize="md">Medium</button>
<button lumaButton lmSize="lg">Large</button>

<!-- States -->
<button lumaButton [lmDisabled]="true">Disabled</button>
```

### Badge

Inline status indicators with semantic variants.

```html
<span lumaBadge lmVariant="default">Default</span>
<span lumaBadge lmVariant="secondary">Secondary</span>
<span lumaBadge lmVariant="destructive">Error</span>
<span lumaBadge lmVariant="success">Success</span>
<span lumaBadge lmVariant="warning">Warning</span>
<span lumaBadge lmVariant="outline">Outline</span>
```

### Card

Compositional card with header, title, description, and content directives.

```html
<luma-card lmVariant="default">
  <div lumaCardHeader>
    <h3 lumaCardTitle lmSize="large">Card Title</h3>
    <p lumaCardDescription lmSize="default">
      Brief description of card content
    </p>
  </div>
  <div lumaCardContent>
    <p>Main card content goes here.</p>
  </div>
  <div lumaCardFooter>
    <button lumaButton lmVariant="primary">Action</button>
  </div>
</luma-card>
```

### Tooltip

Contextual information overlay.

```html
<button lumaButton lumaTooltip="Click to save changes" lmPosition="top">
  Save
</button>
```

### Modal

Dialog overlay for focused interactions.

```html
<luma-modal [(lmOpen)]="isOpen" lmSize="md">
  <div lumaModalHeader>
    <h2 lumaModalTitle>Modal Title</h2>
  </div>
  <div lumaModalContent>
    <p>Modal content</p>
  </div>
  <div lumaModalFooter>
    <button lumaButton (click)="isOpen = false">Close</button>
  </div>
</luma-modal>
```

### Tabs

Tab navigation with underline and pills variants.

```html
<luma-tabs [lmDefaultValue]="'tab-1'" lmVariant="underline">
  <div lumaTabsList>
    <button lumaTabsTrigger="tab-1">Tab 1</button>
    <button lumaTabsTrigger="tab-2">Tab 2</button>
  </div>
  <div lumaTabsPanel="tab-1">Content 1</div>
  <div lumaTabsPanel="tab-2">Content 2</div>
</luma-tabs>
```

### Accordion

Expandable content sections.

```html
<luma-accordion-item [lmOpen]="true" lmVariant="default">
  <div lumaAccordionTrigger>
    <span lumaAccordionTitle>Section Title</span>
    <span lumaAccordionIcon>▼</span>
  </div>
  <div lumaAccordionContent>
    <p>Expandable content</p>
  </div>
</luma-accordion-item>
```

### Toast

Service-based notifications.

```typescript
import { inject } from '@angular/core';
import { LmToastService } from '@lumaui/angular';

export class MyComponent {
  toast = inject(LmToastService);

  showSuccess() {
    this.toast.show('Operation successful!', 'success');
  }
}
```

## Theme Customization

Luma uses **24 semantic design tokens** for consistent, runtime-customizable theming.

### Semantic Color Tokens

| Token                        | Purpose                               |
| ---------------------------- | ------------------------------------- |
| `--color-primary`            | Primary actions (buttons, links)      |
| `--color-primary-foreground` | Text on primary backgrounds           |
| `--color-secondary`          | Secondary actions, subtle backgrounds |
| `--color-destructive`        | Destructive actions, errors           |
| `--color-muted`              | Disabled states, subtle elements      |
| `--color-background`         | App background                        |
| `--color-foreground`         | Primary text color                    |
| `--color-border`             | Borders, dividers                     |

[See all 24 tokens in CLAUDE.md](./CLAUDE.md#semantic-token-system)

### Customization Patterns

#### 1. Global Theme Override

Change colors globally (affects all components):

```css
:root {
  --color-primary: oklch(0.6 0.15 180); /* Cyan brand */
  --color-primary-foreground: oklch(1 0 0); /* White text */
}
```

#### 2. Dark Theme Customization

Customize dark theme colors:

```css
html.dark {
  --color-primary: oklch(0.75 0.12 180); /* Brighter cyan for dark mode */
  --color-background: oklch(0.15 0.005 290); /* Darker background */
}
```

#### 3. Component Instance Override

Override specific component instances using Tailwind utilities:

```html
<button lumaButton class="bg-accent hover:bg-accent/80">Custom Color</button>
```

#### 4. Scoped Theme Override

Create themed sections:

```html
<div class="theme-error">
  <!-- All buttons in this section use error colors -->
  <button lumaButton>Delete</button>
</div>
```

```css
.theme-error {
  --color-primary: var(--color-destructive);
  --color-primary-foreground: var(--color-destructive-foreground);
}
```

### Runtime Theme Switching

```typescript
export class ThemeService {
  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  setCustomTheme(primaryColor: string) {
    document.documentElement.style.setProperty('--color-primary', primaryColor);
  }
}
```

## Development

```bash
# Start the docs/playground app
npm run dev

# Build all packages
npm run build

# Run component tests
npm run test:components

# Lint all projects
npm run lint:all

# Format code
npm run format
```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Comprehensive development guide, Neo-Minimal design principles, token architecture, and contribution standards
- **Component Docs** - Each component has detailed documentation in `packages/angular/src/lib/*/`
  - Usage examples
  - Semantic token references
  - Accessibility features
  - Customization patterns

## Contributing

Luma follows strict Neo-Minimal design principles. Before contributing:

1. Read [CLAUDE.md](./CLAUDE.md) for design philosophy and technical guidelines
2. Ensure components use only the 24 semantic tokens (no component-specific tokens)
3. Follow accessibility standards (WCAG AA minimum)
4. Write comprehensive tests including token consumption and override tests

## Links

- [GitHub Repository](https://github.com/lumaui/luma-ui)
- [Report Issues](https://github.com/lumaui/luma-ui/issues)

## License

MIT
