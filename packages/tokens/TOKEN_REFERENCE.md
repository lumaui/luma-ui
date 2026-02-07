# Luma Token Reference - Quick Guide

**Radix-inspired design tokens for maximum flexibility**

---

## Primary Scale (12 steps)

**Key Concept:** Step 5 is the BASE COLOR (your brand's main color)

| Step | Usage | Example Classes |
|------|-------|----------------|
| 1 | Very light backgrounds | `bg-primary-1` |
| 2 | **Light containers, secondary buttons** | `bg-primary-2`, `hover:bg-primary-2` |
| 3 | **Hover states** | `hover:bg-primary-3` |
| 4 | Interactive elements | `bg-primary-4` |
| **5** | **PRIMARY BUTTONS (solid)** | `bg-primary-5` |
| 6 | **Primary hover** | `hover:bg-primary-6` |
| 7 | **Borders, active states** | `border-primary-7`, `active:bg-primary-7` |
| 8 | Active borders | `border-primary-8` |
| 9 | **Focus rings, indicators** | `ring-primary-9`, `bg-primary-9` |
| 10 | High emphasis | `bg-primary-10` |
| 11 | High-contrast text | `text-primary-11` |
| 12 | **Text on light backgrounds** | `text-primary-12` |

---

## Common Patterns

### Buttons

```typescript
// Primary (solid)
'bg-primary-5 text-white hover:bg-primary-6 active:bg-primary-7'

// Secondary (light background)
'bg-primary-2 text-primary-12 hover:bg-primary-3 border border-primary-7'

// Outline
'border border-primary-7 text-primary-12 hover:bg-primary-2'

// Ghost
'text-primary-12 hover:bg-primary-2'

// Destructive
'bg-destructive-background text-destructive-foreground hover:bg-destructive-background/90'
```

---

### Cards

```typescript
// Default card
'bg-white border border-gray-200 rounded-[var(--radius-5)] shadow-[var(--shadow-2)]'

// Elevated card
'bg-white border border-gray-200 rounded-[var(--radius-5)] shadow-[var(--shadow-3)]'

// Ghost card (no border/shadow)
'bg-white border border-transparent rounded-[var(--radius-5)]'
```

---

### Badges

```typescript
// Default (light)
'bg-primary-2 text-primary-12 rounded-[var(--radius-2)]'

// Primary (solid)
'bg-primary-5 text-white rounded-[var(--radius-2)]'

// Outline
'border border-primary-7 text-primary-12 rounded-[var(--radius-2)]'

// Success
'bg-success-background text-success-foreground'

// Warning
'bg-warning-background text-warning-foreground'

// Destructive
'bg-destructive-background text-destructive-foreground'
```

---

### Tooltips

```typescript
'bg-gray-900 text-gray-50 rounded-[var(--radius-3)] shadow-[var(--shadow-3)]'
```

---

### Modals

```typescript
// Overlay
'bg-black/80'

// Container
'bg-white border border-gray-200 rounded-[var(--radius-6)] shadow-[var(--shadow-6)]'
```

---

### Toasts

```typescript
// Info
'bg-primary-2 text-primary-12 border border-primary-7 rounded-[var(--radius-4)] shadow-[var(--shadow-4)]'

// Success
'bg-success-background text-success-foreground rounded-[var(--radius-4)] shadow-[var(--shadow-4)]'

// Warning
'bg-warning-background text-warning-foreground rounded-[var(--radius-4)] shadow-[var(--shadow-4)]'

// Error
'bg-destructive-background text-destructive-foreground rounded-[var(--radius-4)] shadow-[var(--shadow-4)]'
```

---

## Radius Scale (6 steps)

| Step | Value | Usage | Example |
|------|-------|-------|---------|
| 1 | 2px | Minimal | `rounded-[var(--radius-1)]` |
| 2 | 4px | **Badges, pills** | `rounded-[var(--radius-2)]` |
| 3 | 6px | **Tooltips, small elements** | `rounded-[var(--radius-3)]` |
| 4 | 8px | **Buttons, inputs, toasts (default)** | `rounded-[var(--radius-4)]` |
| 5 | 12px | **Cards, containers** | `rounded-[var(--radius-5)]` |
| 6 | 16px | **Modals, dialogs** | `rounded-[var(--radius-6)]` |

---

## Shadow Scale (6 steps)

| Step | Usage | Example |
|------|-------|---------|
| 1 | Inset shadow, subtle depth | `shadow-[var(--shadow-1)]` |
| 2 | **Cards, subtle elevation** | `shadow-[var(--shadow-2)]` |
| 3 | **Hover cards, tooltips** | `shadow-[var(--shadow-3)]` |
| 4 | **Popovers, toasts** | `shadow-[var(--shadow-4)]` |
| 5 | Modals, dialogs | `shadow-[var(--shadow-5)]` |
| 6 | **Maximum elevation (modals)** | `shadow-[var(--shadow-6)]` |

---

## Semantic Colors

**Format:** `{semantic}-background` and `{semantic}-foreground`

```typescript
// Destructive (errors, delete buttons)
'bg-destructive-background text-destructive-foreground'

// Warning (caution, alerts)
'bg-warning-background text-warning-foreground'

// Success (confirmations, positive feedback)
'bg-success-background text-success-foreground'
```

---

## Focus States

**Always use primary-9 for focus rings:**

```typescript
'focus-visible:ring-2 focus-visible:ring-primary-9 focus-visible:ring-offset-2'
```

---

## Gray Scale (Tailwind defaults)

**Use Tailwind's default gray scale - no custom tokens needed:**

```typescript
// Backgrounds
'bg-gray-50'   // Very light
'bg-gray-100'  // Light (tabs pills background)
'bg-gray-900'  // Dark (tooltip background)

// Text
'text-gray-600'  // Muted text (descriptions, secondary info)
'text-gray-900'  // Primary text

// Borders
'border-gray-200'  // Standard borders
```

---

## CSS Variable Reference

### Primary Scale

```css
--color-primary-1: oklch(0.98 0.010 300);
--color-primary-2: oklch(0.94 0.020 300);
--color-primary-3: oklch(0.88 0.035 300);
--color-primary-4: oklch(0.78 0.060 300);
--color-primary-5: oklch(0.48 0.090 300); /* BASE COLOR */
--color-primary-6: oklch(0.43 0.085 300);
--color-primary-7: oklch(0.38 0.080 300);
--color-primary-8: oklch(0.33 0.075 300);
--color-primary-9: oklch(0.28 0.065 300);
--color-primary-10: oklch(0.23 0.055 300);
--color-primary-11: oklch(0.18 0.045 300);
--color-primary-12: oklch(0.13 0.030 300);
```

### Radius

```css
--radius-1: 0.125rem;  /* 2px */
--radius-2: 0.25rem;   /* 4px */
--radius-3: 0.375rem;  /* 6px */
--radius-4: 0.5rem;    /* 8px */
--radius-5: 0.75rem;   /* 12px */
--radius-6: 1rem;      /* 16px */
```

### Shadows

```css
--shadow-1: inset 0 0 0 1px var(--color-gray-a5), inset 0 1.5px 2px 0 var(--color-gray-a2);
--shadow-2: 0 0 0 1px var(--color-gray-a3), 0 1px 1px 0 var(--color-gray-a2), 0 2px 1px -1px var(--color-black-a1);
--shadow-3: 0 0 0 1px var(--color-gray-a3), 0 2px 3px -2px var(--color-gray-a3), 0 3px 12px -4px var(--color-black-a2);
--shadow-4: 0 0 0 1px var(--color-gray-a3), 0 8px 40px var(--color-black-a1), 0 12px 32px -16px var(--color-gray-a3);
--shadow-5: 0 0 0 1px var(--color-gray-a3), 0 12px 60px var(--color-black-a3), 0 12px 32px -16px var(--color-gray-a5);
--shadow-6: 0 0 0 1px var(--color-gray-a3), 0 12px 60px var(--color-black-a3), 0 16px 64px var(--color-gray-a2);
```

### Alpha Colors (for shadows)

```css
--color-gray-a2: oklch(0.5 0 0 / 0.02);
--color-gray-a3: oklch(0.5 0 0 / 0.03);
--color-gray-a5: oklch(0.5 0 0 / 0.05);
--color-gray-a7: oklch(0.5 0 0 / 0.07);
--color-black-a1: oklch(0 0 0 / 0.05);
--color-black-a2: oklch(0 0 0 / 0.10);
--color-black-a3: oklch(0 0 0 / 0.15);
```

### Semantic Colors

```css
/* Destructive */
--color-destructive-background: oklch(0.63 0.10 28);
--color-destructive-foreground: oklch(1 0 0);

/* Warning */
--color-warning-background: oklch(0.80 0.09 95);
--color-warning-foreground: oklch(0.22 0.014 290);

/* Success */
--color-success-background: oklch(0.72 0.07 155);
--color-success-foreground: oklch(1 0 0);
```

---

## Migration from Old Tokens

| Old Token | New Token | Notes |
|-----------|-----------|-------|
| `bg-primary` | `bg-primary-5` | Step 5 is base color |
| `text-primary-foreground` | `text-white` | Use Tailwind |
| `hover:bg-primary/90` | `hover:bg-primary-6` | Darker hover |
| `bg-secondary` | `bg-primary-2` | Light background |
| `text-secondary-foreground` | `text-primary-12` | High-contrast text |
| `bg-accent` | `bg-primary-9` | Accent states |
| `bg-muted` | `bg-gray-100` | Use Tailwind |
| `text-muted-foreground` | `text-gray-600` | Use Tailwind |
| `bg-card` | `bg-white` | Use Tailwind |
| `text-card-foreground` | `text-gray-900` | Use Tailwind |
| `border-border` | `border-gray-200` | Use Tailwind |
| `rounded-md` | `rounded-[var(--radius-4)]` | 8px radius |
| `rounded-lg` | `rounded-[var(--radius-5)]` | 12px radius |
| `shadow-sm` | `shadow-[var(--shadow-2)]` | Card shadow |
| `shadow-md` | `shadow-[var(--shadow-3)]` | Tooltip shadow |
| `shadow-lg` | `shadow-[var(--shadow-6)]` | Modal shadow |

---

## Tips & Best Practices

### 1. Use Step 5 as Your Base

Always start with `primary-5` for solid backgrounds. This is your brand color.

```typescript
// ✅ Correct
'bg-primary-5 text-white'

// ❌ Avoid
'bg-primary-9 text-white' // Too dark for primary button
```

---

### 2. Hover States Go Darker

For solid buttons, hover state goes to step 6 (darker).

```typescript
'bg-primary-5 hover:bg-primary-6 active:bg-primary-7'
```

---

### 3. Light Backgrounds Use Steps 1-3

For ghost buttons, secondary buttons, and light backgrounds:

```typescript
'bg-primary-2 hover:bg-primary-3'
```

---

### 4. High Contrast Text = Step 12

For text on light backgrounds:

```typescript
'bg-primary-2 text-primary-12'
```

---

### 5. Focus Rings = Step 9

Always use step 9 for focus indicators:

```typescript
'focus-visible:ring-primary-9'
```

---

### 6. Borders = Step 7

For borders on light backgrounds:

```typescript
'border border-primary-7'
```

---

### 7. Match Shadow to Component Size

- Small elements (badges, tooltips) → `shadow-1` or `shadow-2`
- Medium elements (cards, buttons) → `shadow-2` or `shadow-3`
- Large elements (modals, popovers) → `shadow-4` to `shadow-6`

---

### 8. Match Radius to Component Size

- Small elements (badges) → `radius-2` (4px)
- Medium elements (buttons, inputs) → `radius-4` (8px)
- Large elements (cards) → `radius-5` (12px)
- Extra large (modals) → `radius-6` (16px)

---

## Dark Mode

**Purple Dark Theme Values:**

```css
/* Primary scale is INVERTED in dark mode */
--color-primary-1: oklch(0.13 0.030 300);  /* Very dark */
--color-primary-5: oklch(0.72 0.120 300);  /* BASE - brighter in dark mode */
--color-primary-12: oklch(0.98 0.020 300); /* Nearly white */

/* Semantic colors adjusted */
--color-destructive-background: oklch(0.55 0.12 28);
--color-warning-background: oklch(0.70 0.10 95);
--color-success-background: oklch(0.65 0.08 155);
```

**Note:** Step 5 becomes BRIGHTER in dark mode for better contrast on dark backgrounds.

---

## Available Themes

**Current:**
- ✅ Purple (light + dark)

**Coming Soon:**
- Blue
- Green
- Cyan
- Orange
- Pink

**Usage:**

```css
/* Import purple theme */
@import '@lumaui/tokens/build/luma-purple.css';

/* Dark mode */
@import '@lumaui/tokens/build/luma-purple-dark.css';
```

---

**End of Token Reference**
