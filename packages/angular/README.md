# @lumaui/angular

Angular components for **Luma UI** - a Neo-Minimal design system built with calm, intentional simplicity.

## Features

- Neo-Minimal design philosophy
- Dark theme support out of the box
- Type-safe variants with class-variance-authority
- Angular 19+ standalone components
- Tailwind CSS v4 compatible
- **Fully customizable via CSS tokens**

## Customization

All components are **fully customizable** through CSS custom properties (tokens). Override any design token in your CSS to match your brand:

```css
:root {
  /* Customize button colors */
  --luma-button-primary-bg: oklch(0.6 0.15 250);
  --luma-button-primary-bg-hover: oklch(0.55 0.14 250);

  /* Customize card styles */
  --luma-card-background: oklch(0.98 0 0);
  --luma-card-radius: 16px;

  /* Customize spacing and typography */
  --luma-button-padding-x-md: 1.5rem;
  --luma-button-padding-y-md: 0.75rem;
}
```

This token-based architecture means you can adapt every aspect of the design system - colors, spacing, borders, shadows, and more - without modifying component code.

## Prerequisites

### Install Tailwind CSS

Before installing Luma UI, you need to set up Tailwind CSS v4 in your Angular project.

Follow the official guide: **[Tailwind CSS Angular Installation](https://tailwindcss.com/docs/installation/framework-guides/angular)**

## Installation

After Tailwind CSS is configured, install Luma UI:

```bash
npm install @lumaui/angular
```

> **Note:** `@lumaui/tokens` and `@lumaui/core` are installed automatically as dependencies.

## Setup

### Import Styles

Add to your `styles.css`:

```css
@import 'tailwindcss';
@import '@lumaui/tokens';

/* Optional: Dark theme support */
@import '@lumaui/tokens/dark.css';
```

## Usage

### Button

```typescript
import { ButtonDirective } from '@lumaui/angular';

@Component({
  imports: [ButtonDirective],
  template: `
    <button lumaButton lmVariant="primary" lmSize="md">Click me</button>
  `,
})
export class MyComponent {}
```

**Variants:** `primary` | `outline` | `ghost` | `danger`

**Sizes:** `sm` | `md` | `lg` | `full`

**Inputs:**

| Input        | Type                                            | Default     | Description           |
| ------------ | ----------------------------------------------- | ----------- | --------------------- |
| `lmVariant`  | `'primary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style variant  |
| `lmSize`     | `'sm' \| 'md' \| 'lg' \| 'full'`                | `'md'`      | Size variant          |
| `lmDisabled` | `boolean`                                       | `false`     | Disabled state        |
| `lmType`     | `'button' \| 'submit' \| 'reset'`               | `'button'`  | Button type attribute |

### Card

```typescript
import {
  CardComponent,
  CardHeaderDirective,
  CardTitleDirective,
  CardDescriptionDirective,
  CardContentDirective,
} from '@lumaui/angular';

@Component({
  imports: [
    CardComponent,
    CardHeaderDirective,
    CardTitleDirective,
    CardDescriptionDirective,
    CardContentDirective,
  ],
  template: `
    <luma-card lmVariant="default">
      <div lumaCardHeader>
        <h3 lumaCardTitle lmSize="large">Card Title</h3>
        <p lumaCardDescription>Optional description</p>
      </div>
      <div lumaCardContent>Your content here</div>
    </luma-card>
  `,
})
export class MyComponent {}
```

**Card Variants:** `default` | `shadow` | `nested` | `preview`

## Components Reference

| Component                  | Selector                              | Description          |
| -------------------------- | ------------------------------------- | -------------------- |
| `ButtonDirective`          | `button[lumaButton]`, `a[lumaButton]` | Styled button/link   |
| `CardComponent`            | `luma-card`                           | Card container       |
| `CardHeaderDirective`      | `[lumaCardHeader]`                    | Card header section  |
| `CardTitleDirective`       | `[lumaCardTitle]`                     | Card title           |
| `CardDescriptionDirective` | `[lumaCardDescription]`               | Card description     |
| `CardContentDirective`     | `[lumaCardContent]`                   | Card content section |

## Dark Theme

Toggle dark theme by adding the `dark` class to your document:

```typescript
// Enable dark theme
document.documentElement.classList.add('dark');

// Disable dark theme
document.documentElement.classList.remove('dark');
```

## Input Naming Convention

All Luma inputs use the `lm` prefix to avoid conflicts with native HTML attributes:

| Input        | Type    | Default    | Description           |
| ------------ | ------- | ---------- | --------------------- |
| `lmVariant`  | string  | varies     | Visual style variant  |
| `lmSize`     | string  | `'md'`     | Size variant          |
| `lmDisabled` | boolean | `false`    | Disabled state        |
| `lmType`     | string  | `'button'` | Button type attribute |

## Design Philosophy

Luma follows **Neo-Minimalism** principles:

- **Visual Silence** - Elements don't compete for attention
- **Functional Whitespace** - Space creates hierarchy
- **Calm Interactions** - Gentle, natural feedback
- **Silent Accessibility** - Accessibility is inherent, not an afterthought

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
