# Luma UI

Complete Luma UI package - includes design tokens and Angular components.

## Installation

### Option A: Complete Package (Recommended for most users)

```bash
npm install luma
```

### Option B: Individual Packages (For granular control)

```bash
npm install @luma/tokens @luma/components
```

## Usage

### Importing Components

```typescript
import { ButtonDirective, CardComponent } from 'luma';
```

### Importing Styles

```css
/* Option 1: Via meta-package (recommended) */
@import "luma/tokens/luma.css";
@import "luma/tokens/luma-dark.css";

/* Option 2: Direct from tokens package */
@import "@luma/tokens/luma.css";
@import "@luma/tokens/luma-dark.css";
```

Both options are equivalent - the meta-package `luma` resolves automatically to `@luma/tokens`.

## What's Included

- **@luma/tokens** - Design tokens, Tailwind CSS configuration
- **@luma/components** - Angular components (Button, Card, etc.)

## Documentation

Visit [GitHub](https://github.com/youruser/luma) for full documentation.

## License

MIT
