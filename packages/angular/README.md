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
/* Import Luma design tokens (light theme + component classes) */
@import '@lumaui/tokens/build/luma.css';

/* Optional: Dark theme support */
@import '@lumaui/tokens/build/luma-dark.css';
```

**That's it!** The `luma.css` file includes everything needed:

- ✅ Tailwind CSS v4 base
- ✅ Design tokens (@theme block with 45 tokens)
- ✅ Component class manifest (@source directive)
- ✅ Automatic class discovery (99 component classes)

**Alternative (convenience bundle):**

```css
/* Single import for both light and dark themes */
@import '@lumaui/tokens/build/luma-complete.css';
```

---

**Verify it works:**

After setting up, check your compiled CSS includes component classes:

```bash
# Build your Angular app
ng build

# Check for Luma component classes in output
grep -o "bg-primary" dist/your-app/browser/styles*.css
# Expected: Multiple matches (bg-primary, hover:bg-primary/90, etc.)
```

If you see the classes, setup is correct! ✅

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
