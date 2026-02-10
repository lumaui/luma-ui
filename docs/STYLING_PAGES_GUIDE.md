# Styling Pages Guide

Quick reference for the new styling documentation structure.

## Page Structure

```
/docs/getting-started    ← Entry point (installation, setup)
/docs/styling            ← Visual reference (token displays)
/docs/customizing        ← Technical guide (CSS variables, Tailwind)
```

---

## Styling Page (`/docs/styling`)

**Purpose:** Visual reference of design tokens

**Target Audience:** Designers and developers browsing tokens

**Content:**

- Philosophy explanation (Tailwind-first, semantic tokens)
- Compact color grids (step numbers, no token names)
- Visual previews for radius and shadows
- Links to Customizing page for implementation

**Components Used:**

- `ColorGridComponent` - Compact 6-column grid
- `TokenPreviewComponent` - Visual demo + code

**Key Feature:** Visual ONLY - no token names, no copy buttons

---

## Customizing Page (`/docs/customizing`)

**Purpose:** Complete technical customization reference

**Target Audience:** Developers implementing customization

**Content:**

- All 57 tokens with CSS variable names
- 6 customization patterns with Shiki-highlighted code
- Primary colors (12 tokens)
- Gray scale (12 tokens)
- Surface colors (4 tokens)
- Semantic states (6 tokens)
- Radius (6 tokens)
- Shadows (6 tokens)
- Typography (1 token)
- For Designers section
- For Developers section

**Key Feature:** 100% Shiki syntax highlighting coverage

---

## New Components

### ColorGridComponent

**Location:** `apps/docs/src/app/components/color-grid/color-grid.component.ts`

**Props:**

```typescript
title: string              // Section title
description: string        // Section description
colors: ColorSwatch[]      // Array of color swatches
```

**ColorSwatch Interface:**

```typescript
{
  step: number; // 1-12 (or custom numbering)
  value: string; // OKLCH color value
  description: string; // Use case description
}
```

**Layout:**

- 6 columns on desktop (lg+)
- 4 columns on tablet (md)
- 3 columns on mobile (sm)
- 48×48px circular swatches
- Hover scale effect (1.05)

**Example:**

```html
<app-color-grid
  title="Primary Color Scale"
  description="12-step color scale for nuanced color usage"
  [colors]="primaryColors"
/>
```

---

### TokenPreviewComponent

**Location:** `apps/docs/src/app/components/token-preview/token-preview.component.ts`

**Props:**

```typescript
token: TokenPreviewData;
```

**TokenPreviewData Interface:**

```typescript
{
  name: string; // Token name (e.g., "Radius 4")
  description: string; // Description (e.g., "Medium (8px) - buttons")
  value: string; // CSS value
  category: 'shadow' | 'radius';
  cssExample: string; // Code example for Shiki
}
```

**Features:**

- 120×80px visual preview
- Shadow: white card with shadow applied
- Radius: primary/20 background with border-radius
- Shiki code block below preview

**Example:**

```html
<app-token-preview [token]="radiusToken" />
```

---

## Code Examples

### Adding New Color Scale

```typescript
// In component
readonly customColors: ColorSwatch[] = [
  { step: 1, value: 'oklch(0.99 0.05 220)', description: 'Lightest' },
  { step: 2, value: 'oklch(0.92 0.08 220)', description: 'Light' },
  // ... more steps
];

// In template
<app-color-grid
  title="Custom Color Scale"
  description="Custom theme colors"
  [colors]="customColors"
/>
```

### Adding New Token Preview

```typescript
// In component
readonly customToken: TokenPreviewData = {
  name: 'Custom Shadow',
  description: 'Ultra-high elevation',
  value: '0 20px 40px 0 oklch(0 0 0 / 0.15)',
  category: 'shadow',
  cssExample: `.modal {\n  box-shadow: var(--custom-shadow);\n}`,
};

// In template
<app-token-preview [token]="customToken" />
```

---

## Maintenance

### When to Update Styling Page

- New color scale added to tokens
- New radius or shadow token created
- Visual changes to token appearance

**Action:** Update color/token arrays in `StylingPageComponent`

### When to Update Customizing Page

- New tokens added to system
- New customization pattern discovered
- Technical implementation changes

**Action:** Add new code examples with Shiki highlighting

### When to Update Both Pages

- Major token system refactor
- Breaking changes to token names
- New token categories added

---

## Best Practices

### Styling Page

- Keep visual reference clean and scannable
- NO technical details (CSS variable names)
- Use descriptions to explain use cases
- Link to Customizing page for implementation

### Customizing Page

- List ALL tokens (complete reference)
- Show CSS variable names explicitly
- Use Shiki for ALL code examples
- Provide multiple patterns for different use cases

### New Components

- ColorGridComponent: Visual display only
- TokenPreviewComponent: Visual + code
- Keep components simple and reusable

---

## Troubleshooting

### Color Grid Not Showing

**Issue:** Colors appear as empty circles

**Fix:** Check that `value` in ColorSwatch is valid OKLCH

```typescript
// ❌ Wrong
{ step: 1, value: 'purple', description: '...' }

// ✅ Correct
{ step: 1, value: 'oklch(0.48 0.09 300)', description: '...' }
```

### Token Preview Not Rendering

**Issue:** Preview box is empty

**Fix:** Verify `category` is either 'shadow' or 'radius'

```typescript
// ❌ Wrong
{ category: 'color', ... }

// ✅ Correct
{ category: 'shadow', ... }
```

### Shiki Not Highlighting

**Issue:** Code blocks show plain text

**Fix:** Ensure CodeBlockComponent is imported and language is specified

```typescript
imports: [CodeBlockComponent]

// In template
<app-code-block
  [code]="exampleCode"
  language="css"  // ← Must specify language
/>
```

### Sidebar Order Wrong

**Issue:** Styling appears before Getting Started

**Fix:** Check `sidebar.component.html` - correct order:

```html
<a routerLink="/docs/getting-started">Getting Started</a>
<a routerLink="/docs/styling">Styling</a>
<a routerLink="/docs/customizing">Customizing</a>
```

---

## Related Files

**Components:**

- `apps/docs/src/app/components/color-grid/color-grid.component.ts`
- `apps/docs/src/app/components/token-preview/token-preview.component.ts`
- `apps/docs/src/app/components/code-block/code-block.component.ts`

**Pages:**

- `apps/docs/src/app/pages/styling-page/styling-page.component.ts`
- `apps/docs/src/app/pages/customizing-page/customizing-page.component.ts`

**Routing:**

- `apps/docs/src/app/app.routes.ts`
- `apps/docs/src/app/app.routes.server.ts`

**Navigation:**

- `apps/docs/src/app/components/sidebar/sidebar.component.html`

---

## Quick Commands

```bash
# Build docs
npx nx build docs

# Serve docs (dev mode)
npm run dev

# Lint
npx nx lint docs

# Check bundle size
npx nx build docs --configuration=production --stats-json
```

---

**Last Updated:** 2026-02-10
