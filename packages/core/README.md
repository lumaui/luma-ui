# @lumaui/core

Core variants and types for **Luma UI** - framework-agnostic CVA definitions for the Neo-Minimal design system.

## Overview

This package contains the variant definitions used by Luma UI components. It uses [class-variance-authority (CVA)](https://cva.style/) for type-safe variant management.

## Installation

```bash
npm install @lumaui/core class-variance-authority
```

> **Note:** Most users should install `@lumaui/angular` instead, which includes this package as a peer dependency.

## Usage

```typescript
import {
  buttonVariants,
  type ButtonVariant,
  type ButtonSize,
} from '@lumaui/core';

// Generate class string for a button
const classes = buttonVariants({
  variant: 'primary',
  size: 'md',
});
// Returns: "inline-flex items-center justify-center ... lm-bg-button-primary ..."
```

## Exports

### Button Variants

```typescript
import {
  buttonVariants,
  type ButtonVariant, // 'primary' | 'outline' | 'ghost' | 'danger'
  type ButtonSize, // 'sm' | 'md' | 'lg' | 'full'
  type ButtonVariants, // Full variant props type
} from '@lumaui/core';
```

### Card Variants

```typescript
import {
  cardVariants,
  cardContentVariants,
  cardTitleVariants,
  cardDescriptionVariants,
  type CardVariant, // 'default' | 'shadow' | 'nested' | 'preview'
  type CardTitleSize, // 'small' | 'medium' | 'large'
  type CardDescriptionSize, // 'small' | 'medium' | 'large'
} from '@lumaui/core';
```

### Types

```typescript
import {
  type Size, // 'sm' | 'md' | 'lg'
  type SizeWithFull, // 'sm' | 'md' | 'lg' | 'full'
  type InteractiveVariant, // 'primary' | 'outline' | 'ghost' | 'danger'
} from '@lumaui/core/types';
```

## Building Custom Components

You can use the variants to build components in any framework:

```typescript
// React example
import { buttonVariants } from '@lumaui/core';

function Button({ variant, size, children }) {
  return (
    <button className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
```

## Design Tokens

The generated classes reference CSS custom properties from `@lumaui/tokens`. Make sure to import the token styles in your application:

```css
@import '@lumaui/tokens/styles.css';
```

## License

MIT
