# @lumaui/angular

Angular components for **Luma UI** - a Neo-Minimal design system built with calm, intentional simplicity.

## Features

- Neo-Minimal design philosophy
- Dark theme support out of the box
- Type-safe variants with class-variance-authority
- Angular 19+ standalone components
- Tailwind CSS v4 compatible
- Fully customizable via CSS tokens

## Prerequisites

Tailwind CSS v4 must be installed in your Angular project.

Follow the official guide: **[Tailwind CSS Angular Installation](https://tailwindcss.com/docs/installation/framework-guides/angular)**

## Installation

```bash
npm install @lumaui/angular
```

> `@lumaui/tokens` and `@lumaui/core` are installed automatically as dependencies.

## Setup

Add to your `styles.css`:

```css
@import 'tailwindcss';
@import '@lumaui/tokens';

/* Optional: Dark theme support */
@import '@lumaui/tokens/dark.css';
```

## Usage

```typescript
import {
  ButtonDirective,
  CardComponent,
  CardTitleDirective,
} from '@lumaui/angular';

@Component({
  imports: [ButtonDirective, CardComponent, CardTitleDirective],
  template: `
    <button lumaButton lmVariant="primary" lmSize="md">Click me</button>

    <luma-card lmVariant="default">
      <h3 lumaCardTitle>Card Title</h3>
    </luma-card>
  `,
})
export class MyComponent {}
```

## Documentation

For complete documentation, component reference, customization guide, and interactive examples:

**[Luma UI Documentation](https://lumaui.github.io/luma-ui/)**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
