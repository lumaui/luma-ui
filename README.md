# Luma UI

Neo-Minimal design system for Angular applications.

[![npm version](https://img.shields.io/npm/v/@lumaui/angular.svg)](https://www.npmjs.com/package/@lumaui/angular)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-19+-dd0031.svg)](https://angular.io/)

## What is Luma?

Luma is a design system built on **Neo-Minimalism** - a design philosophy that creates interfaces with calm, intentional simplicity. It provides design tokens and Angular components that prioritize:

- **Visual Silence** - Elements don't compete; hierarchy is perceived effortlessly
- **Functional Whitespace** - Space as invisible structure, not empty filler
- **Calm Interactions** - Gentle feedback with natural transitions
- **Silent Accessibility** - WCAG AA compliance built into the design, not bolted on

## Features

- Design tokens with automatic light/dark theme support
- Angular 19+ standalone components
- Type-safe variants with [class-variance-authority](https://cva.style/)
- OKLCH color space for perceptually uniform colors
- Tailwind CSS v4 integration
- WCAG AA accessibility standards

## Packages

| Package                                                            | Description                                 |
| ------------------------------------------------------------------ | ------------------------------------------- |
| [`@lumaui/tokens`](https://www.npmjs.com/package/@lumaui/tokens)   | Design tokens compiled via Style Dictionary |
| [`@lumaui/angular`](https://www.npmjs.com/package/@lumaui/angular) | Angular components and directives           |
| [`@lumaui/core`](https://www.npmjs.com/package/@lumaui/core)       | Framework-agnostic CVA variant definitions  |

## Quick Start

### Installation

```bash
npm install @lumaui/angular
```

### Setup

Add the tokens to your global styles (e.g., `styles.css`):

```css
@import 'tailwindcss';
@import '@lumaui/tokens';
@import '@lumaui/tokens/dark.css'; /* Optional: dark theme */
```

### Usage

```typescript
import { Component } from '@angular/core';
import { ButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [ButtonDirective],
  template: `
    <button lumaButton lmVariant="primary" lmSize="md">Click me</button>
  `,
})
export class ExampleComponent {}
```

## Components

### Button

Directive-based button with multiple variants and sizes.

```html
<!-- Variants: primary, outline, ghost, danger -->
<button lumaButton lmVariant="primary">Primary</button>
<button lumaButton lmVariant="outline">Outline</button>
<button lumaButton lmVariant="ghost">Ghost</button>
<button lumaButton lmVariant="danger">Danger</button>

<!-- Sizes: sm, md, lg, full -->
<button lumaButton lmSize="sm">Small</button>
<button lumaButton lmSize="lg">Large</button>
```

### Card

Compositional card with directives for header, title, description, and content.

```html
<luma-card lmVariant="default">
  <div lumaCardHeader>
    <h3 lumaCardTitle>Card Title</h3>
    <p lumaCardDescription>Card description text</p>
  </div>
  <div lumaCardContent>Card content goes here.</div>
</luma-card>
```

## Customization

Override design tokens via CSS custom properties:

```css
:root {
  --luma-button-radius: 4px;
  --luma-button-primary-bg: oklch(0.6 0.15 250);
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

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines, Neo-Minimal design principles, and contribution standards.

## Links

- [GitHub Repository](https://github.com/lumaui/luma-ui)
- [Report Issues](https://github.com/lumaui/luma-ui/issues)

## License

MIT
