# @lumaui/angular

Angular components for **Luma UI** - a Neo-Minimal design system built with calm, intentional simplicity.

## Features

- Neo-Minimal design philosophy
- Dark theme support out of the box
- Type-safe variants with class-variance-authority
- Angular 19+ standalone components
- Tailwind CSS v4 compatible

## Installation

```bash
npm install @lumaui/angular @lumaui/tokens
```

### Peer Dependencies

These are automatically installed with Angular projects:

```bash
npm install class-variance-authority
```

## Setup

### 1. Import Styles

Add to your `styles.css`:

```css
@import '@lumaui/tokens/styles.css';

/* Optional: Dark theme support */
@import '@lumaui/tokens/styles/dark.css';
```

### 2. Configure Tailwind (Required)

Add the library to your Tailwind content paths in `tailwind.config.js`:

```js
export default {
  content: ['./src/**/*.{html,ts}', './node_modules/@lumaui/**/*.{js,ts,mjs}'],
};
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
