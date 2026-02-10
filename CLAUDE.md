# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Luma is a Neo-Minimal design system for Angular applications built with Nx monorepo architecture. It provides design tokens and reusable components styled with Tailwind CSS v4 and class-variance-authority for type-safe variants.

## Neo-Minimal Design Philosophy

This design system is built on **Neo-Minimalism**, a design philosophy that defines structural, visual, and behavioral principles for creating interfaces with calm, intentional simplicity.

### Core Purpose

Neo-Minimalism builds on classical minimalism while adding **humanity, fluidity, and context**.

**It rejects:**

- Excessive rigidity
- Mechanical geometry
- Interfaces that look like generic frameworks

**It pursues:**

- Visual calm
- Continuity
- Organic and natural feel

> **Foundational rule:** If a component violates these principles, it doesn't belong in the system—even if it looks good.

### Visual Silence

Visual silence is an **intentional state**, not the absence of design.

**Principles:**

- Elements don't compete with each other
- Hierarchy is perceived effortlessly
- Layout speaks before style

**Rules:**

- Never add an effect just to "highlight"
- If something needs to call attention to be understood, it's poorly resolved
- Prioritize spatial relationships over colors or effects

### Functional Whitespace

Whitespace is **invisible structure**.

It should:

- Create hierarchy
- Replace borders, dividers, and shadows
- Control rhythm and reading flow

> Space is not empty—it's language.

**Guidelines:**

- Prefer progressive spacing over lines
- Increase space between groups, not within them
- Never compact to "fit more"

### Form & Geometry

**Organic and Soft Edges:**

The system avoids hard corners and overly technical geometries.

- Curves should suggest **continuity**, not rigidity
- Slightly generous edges are preferable to mathematical precision
- Forms should appear drawn, not calculated

> The interface should flow—not snap together.

⚠️ There is no mandatory fixed radius. The correct radius is one that **doesn't call attention to itself**.

### Light as Structure (not decoration)

Light is used as **texture and hierarchy**, never as ornament.

**Principles:**

- Subtle gradients replace borders
- Luminosity differences create depth
- Transparency creates layers

**Rules:**

- Never use shadow as the primary solution
- Avoid hard or offset shadows
- Prefer variations within the same color family

> If depth is perceived before form, it's wrong.

### Color

**Philosophy:**

Color in Neo-Minimalism is **editorial**, not promotional.

- Slightly desaturated
- Close to gray
- Comfortable to the eyes for long periods

**Correct usage:**

- Color defines **action**, not structure
- Color never defines depth
- Color never replaces spatial hierarchy

**Neutral tones:**

- Pure white should be avoided as a base
- Prefer warm whites and soft grays
- Contrast is always progressive

### Typography as Central Element

Typography is the primary visual component of the system.

**Principles:**

- Clarity above personality
- Rhythm before impact
- Continuous reading, not blocks

**Guidelines:**

- Hierarchy created by size, not weight
- Avoid excessive bold
- Line-height always generous

> If typography fails, no layout can save it.

### Calm Interactions

Interactions should **respond**, not distract.

**Principles:**

- Gentle feedback
- Short and natural transitions
- No surprises

**Rules:**

- Never use scale as feedback
- Avoid elastic or flashy animations
- States should seem like natural consequences of the action

> The best interaction is one you barely notice.

### Silent Accessibility

Accessibility must be **inherent**, not an extra mode.

- Comfortable contrast
- Discrete and clear focus states
- Comfortable touch area

Nothing should look like an "accessibility feature"—it should just feel right.

### What to Do

- Always start with layout
- Use space as the primary tool
- Question every visual effect
- Design for long usage sessions

### What Not to Do

- Copy patterns from popular design systems
- Solve hierarchy with shadow or color
- Create overly self-explanatory components
- Treat UI as a showcase

### Final Rule

> **If an element can be removed without functional or semantic loss, it shouldn't exist.**

This design system doesn't seek attention. It builds **silent confidence, continuity, and presence**.

## Architecture

### Monorepo Structure

This is an Nx workspace organized as an npm workspaces monorepo with the following key packages:

- **`packages/tokens`** (`@lumaui/tokens`): Design tokens managed with Style Dictionary
  - **Purple theme architecture**: 12-step color scale + background/foreground
  - **14 theme tokens** in `src/themes/purple/purple.json` (light) and `purple.dark.json` (dark)
  - **Structural tokens** in `src/shared/` (radius, shadow, gray, semantic, typography)
  - Compiled CSS exports in `build/`: `luma.css`, `luma-dark.css`
  - **Zero component-specific tokens** - all components use semantic tokens directly

- **`packages/core`** (`@lumaui/core`): Framework-agnostic CVA variant definitions
  - Contains all CVA variant functions in `src/variants/` (e.g., `button.variants.ts`, `card.variants.ts`)
  - Shared between Angular components and potentially other framework adapters
  - Exports variant functions and their TypeScript types

- **`packages/angular`** (`@lumaui/angular`): Angular standalone components
  - Each component follows a feature-folder structure (`lib/button/`, `lib/card/`)
  - Components consume CVA variants from `@lumaui/core`
  - Exports are managed via `src/index.ts` with individual component index files

- **`apps/docs`**: Documentation site (Angular SSR)
  - Auto-generated from `.docs.md` files via `npm run generate-docs`
  - Includes live component previews, token reference, and theming guides
  - Runs with Angular's dev server and supports SSR/prerendering

### Key Design Patterns

**Component Architecture:**

- All components are Angular standalone (no NgModules)
- Use CVA for variant management with TypeScript type safety
- Components export both the component class and supporting directives/types
- Tailwind CSS classes reference semantic tokens (e.g., `bg-primary`, `text-foreground`, `rounded-md`)

**Styling Approach:**

- Tailwind CSS v4 with PostCSS plugin (`@tailwindcss/postcss`)
- **Semantic tokens** mapped to standard Tailwind utilities (`bg-primary`, `text-foreground`, `rounded-md`)
- CSS variables for theme values via `@theme` block
- Inline opacity modifiers (`bg-primary/90`, `hover:bg-muted/50`)
- No component-scoped CSS; styles are applied via class composition

**Nx Task Orchestration:**

- Build targets use dependency graph (`dependsOn: ["^build"]`)
- Inferred tasks for linting, testing via Nx plugins
- Caching enabled for build, lint, and test targets

### Design Tokens with Style Dictionary

Luma uses **Style Dictionary** with a **purple theme architecture** that separates theme-specific colors from structural tokens. This provides a clean, scalable foundation inspired by Radix UI's color system.

**Token Organization:**

```
packages/tokens/
├── src/
│   ├── themes/
│   │   └── purple/
│   │       ├── purple.json      # 14 theme tokens (12-step scale + surfaces)
│   │       └── purple.dark.json # 14 dark theme tokens
│   ├── shared/
│   │   ├── radius.json          # 6 border radius tokens (structural)
│   │   ├── shadow.json          # 6 box shadow tokens (structural)
│   │   ├── gray.json            # 12-step gray scale (light mode)
│   │   ├── gray.dark.json       # 12-step gray scale (dark mode)
│   │   ├── semantic.json        # 6 semantic state colors (structural)
│   │   └── typography.json      # 1 font family (structural)
│   └── index.ts                 # Exports
│
├── build/                       # Generated output (git-ignored)
│   ├── luma.css                 # Compiled light theme (3.1KB)
│   ├── luma-dark.css            # Compiled dark theme (1.8KB)
│   ├── luma-complete.css        # Complete bundle (571B)
│   └── luma-classes.js          # Class manifest
│
├── config.js                    # Style Dictionary config (light theme)
└── config.dark.js               # Style Dictionary config (dark theme)
```

**Architecture Philosophy:**

- **Clean separation**: Theme colors in `themes/`, structural tokens in `shared/`
- **45 total tokens** (14 theme + 31 structural) with zero duplication
- **12-step color scale** inspired by Radix UI for nuanced color usage
- **Semantic mapping**: Format function creates 30+ semantic aliases from base tokens
- **Scalable**: Adding new themes (blue, green) only requires copying purple theme with new colors
- Components use **standard Tailwind utilities** (`bg-primary`, not `lm-bg-button-primary`)
- **Runtime theme customization** via CSS variables

**Purple Theme Structure:**

Purple theme tokens are defined in `themes/purple/purple.json` using the [Design Tokens Format](https://design-tokens.github.io/community-group/format/):

```json
{
  "luma": {
    "primary": {
      "1": {
        "value": "oklch(0.98 0.010 300)",
        "type": "color",
        "description": "Very light tint - subtle backgrounds, disabled states"
      },
      "2": {
        "value": "oklch(0.94 0.020 300)",
        "type": "color",
        "description": "Light tint - hover states, subtle containers"
      },
      // ... steps 3-11
      "12": {
        "value": "oklch(0.13 0.030 300)",
        "type": "color",
        "description": "Darkest shade - text, links"
      }
    },
    "background": {
      "value": "oklch(1 0 0)",
      "type": "color",
      "description": "App background (white in light theme)"
    },
    "foreground": {
      "value": "oklch(0.22 0.014 290)",
      "type": "color",
      "description": "Primary text color (dark gray in light theme)"
    }
  }
}
```

**Shared Structural Tokens:**

Structural tokens in `shared/` are theme-agnostic and used by all themes:

```json
// shared/radius.json
{
  "luma": {
    "radius": {
      "1": { "value": "0.125rem", "type": "dimension", "description": "2px" },
      "4": {
        "value": "0.5rem",
        "type": "dimension",
        "description": "8px - buttons"
      },
      "5": {
        "value": "0.75rem",
        "type": "dimension",
        "description": "12px - cards"
      }
      // ... 6 radius tokens total
    }
  }
}
```

**Token Categories:**

1. **Purple Theme (14 tokens):**
   - Primary color scale: `primary.1` through `primary.12` (12 steps)
   - Surface colors: `background`, `foreground`

2. **Shared Structural tokens:**
   - **Radius (6 tokens):** `radius.1` through `radius.6`
   - **Shadow (6 tokens):** `shadow.1` through `shadow.6`
   - **Gray (12 tokens):** `gray.1` through `gray.12` (neutral scale for borders, secondary text)
   - **Semantic States (6 tokens):** `destructive`, `warning`, `success` (with foregrounds)
   - **Typography (1 token):** `font-family-base`

3. **Generated Semantic (30+ tokens):**
   - Created by format function from purple theme
   - Maps 12-step scale to semantic names (`--color-primary` → `primary.5`)
   - Derives additional colors (`secondary`, `accent`, `border`, `input`, `ring`)
   - All standard Tailwind semantic utilities work (`bg-primary`, `text-foreground`, etc.)

**Building Tokens:**

From the root directory:

```bash
npm run tokens        # Quick: build tokens via Style Dictionary
npm run build:tokens  # Build tokens package via Nx
npm run build:all     # Build all packages
```

From the tokens package:

```bash
cd packages/tokens
npm run build         # Build both light and dark themes + class manifest
npm run build:light   # Build only light theme
npm run build:dark    # Build only dark theme
npm run watch         # Watch mode for both themes
```

**Important:** Tokens are automatically built when building the docs app (via Nx dependency graph). You only need to manually build tokens if:

- You're developing tokens in isolation
- You want to see generated CSS immediately
- You're debugging token generation

**Output:**

Style Dictionary generates:

- CSS custom properties with `--color-*`, `--radius-*`, `--shadow-*` naming
- Tailwind v4 `@theme` block mapping tokens to standard utilities
- Light theme in `luma.css` (3.1KB), dark theme in `luma-dark.css` (1.8KB)
- Class manifest in `luma-classes.js`

**Generated CSS Example:**

```css
/* luma.css */
@import 'tailwindcss';

@theme {
  /* Primary Color Scale (12-step Radix-inspired) */
  --color-primary-1: oklch(0.98 0.01 300);
  --color-primary-5: oklch(0.48 0.09 300);
  --color-primary-12: oklch(0.13 0.03 300);
  /* ... steps 2-11 */

  /* Semantic Primary Mappings (from format function) */
  --color-primary: oklch(0.48 0.09 300); /* Maps to primary.5 */
  --color-primary-foreground: oklch(0.13 0.03 300); /* Maps to primary.12 */
  --color-secondary: oklch(0.94 0.02 300); /* Maps to primary.2 */
  --color-accent: oklch(0.78 0.06 300); /* Maps to primary.4 */
  /* ... */

  /* Surface Colors */
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.22 0.014 290);
  /* ... */

  /* Border Radius (from shared/radius.json) */
  --radius-1: 0.125rem;
  --radius-4: 0.5rem; /* Buttons use this */
  --radius-5: 0.75rem; /* Cards use this */
  /* ... */
}
```

**Using Tokens in Components:**

Components use **standard Tailwind utilities** that reference semantic tokens:

```typescript
// ✅ Semantic approach - standard Tailwind utilities
const buttonVariants = cva([
  'bg-primary', // Uses --color-primary
  'text-primary-foreground', // Uses --color-primary-foreground
  'rounded-md', // Uses --radius-md
  'hover:bg-primary/90', // Inline opacity modifier
]);

// ❌ Old approach - custom utilities (deprecated)
const buttonVariants = cva([
  'lm-bg-button-primary',
  'lm-text-button-primary',
  'lm-rounded-button',
]);
```

**Adding New Semantic Tokens:**

**Note:** In most cases, you should NOT add new tokens. The 24 semantic tokens cover all use cases. Only add tokens if absolutely necessary.

1. Edit `src/themes/purple/purple.json` and `purple.dark.json`
2. Add token following the semantic naming pattern
3. Run `npm run build` to regenerate CSS
4. Use via standard Tailwind utility (`bg-your-token`, `text-your-token`, etc.)

**Example - Adding a New Color:**

```json
{
  "luma": {
    "color": {
      "info": {
        "value": "oklch(0.65 0.10 232)",
        "type": "color",
        "description": "Info state color"
      },
      "info-foreground": {
        "value": "oklch(1 0 0)",
        "type": "color",
        "description": "Text on info background"
      }
    }
  }
}
```

After building, use in components:

```typescript
'bg-info text-info-foreground hover:bg-info/90';
```

### Token Import Rules (CRITICAL)

**Always import from `build/`, never from `src/`:**

```css
/* ✅ CORRECT - Use generated files */
@import '@lumaui/tokens/build/luma.css';
@import '@lumaui/tokens/build/luma-dark.css';

/* ❌ WRONG - Source files may be outdated */
@import '@lumaui/tokens/src/luma.css';
@import '@lumaui/tokens/src/luma-dark.css';
```

**Why this matters:**

- `src/` contains **source JSON files** and manual template files that may be outdated
- `build/` contains **Style Dictionary generated output** with all current tokens
- New tokens added to JSON files only appear in `build/` after running `npm run build`

**Token Flow:**

```text
src/themes/purple/purple.json  →  Style Dictionary  →  build/luma.css
        + src/shared/*.json       (config.js)          (Tailwind @theme)
```

**Customization Flow:**

```text
Override CSS variable  →  Updates all components automatically
--color-primary: red   →  buttons, badges, toasts use red
```

> **Warning:** If a new token is not appearing in the browser, check that you're importing from `build/` not `src/`. This is the most common cause of "missing token" issues.

### Runtime Theme Customization

Luma supports **runtime theme customization** - all components reference semantic tokens via CSS variables, enabling dynamic theming without rebuild.

**How it works:**

```css
/* Semantic tokens in @theme block */
@theme {
  --color-primary: oklch(0.48 0.09 300);
  --color-primary-foreground: oklch(1 0 0);
}

/* Components use standard Tailwind utilities */
.bg-primary {
  background-color: var(--color-primary);
}
```

**Benefits:**

- Override semantic tokens to customize entire theme at runtime
- No rebuild required - changes apply immediately
- Dynamic theme switching (light/dark)
- Single source of truth for all components

**Example - Custom Brand Colors:**

```css
:root {
  /* Override semantic tokens to change entire theme */
  --color-primary: oklch(0.6 0.15 180); /* Cyan brand color */
  --color-primary-foreground: oklch(1 0 0); /* White text */
}
/* All buttons, badges, toasts automatically use cyan */
```

**Component-Level Overrides:**

```typescript
// Override for specific component instance
<Button className="bg-accent hover:bg-accent/80">
  Custom Color
</Button>

// Override via CSS
.my-custom-button {
  --color-primary: oklch(0.70 0.12 340);  /* Pink */
}
```

**Technical Details:**

- All tokens are CSS variables in the `@theme` block
- Components reference variables via standard Tailwind utilities
- Dark theme overrides variables via `.dark` selector
- Changes propagate automatically to all components

**Verification:**

```bash
# Check generated CSS structure
grep "@theme" packages/tokens/build/luma.css

# Check semantic token definition
grep "color-primary:" packages/tokens/build/luma.css
# Expected: --color-primary: oklch(0.48 0.09 300);

# Check dark theme override
grep "color-primary:" packages/tokens/build/luma-dark.css
# Expected: --color-primary: oklch(0.72 0.12 300);
```

### Token Architecture (Semantic Token System)

Luma uses a **single-tier semantic token architecture** inspired by Shadcn/ui. This provides maximum simplicity while enabling powerful runtime customization.

#### **Philosophy: Semantic Over Specific**

Instead of component-specific tokens (`--luma-button-primary-bg`, `--luma-card-shadow-border`), Luma uses **24 semantic tokens** that work across all components:

```
Component-Specific (Old)  →  Semantic (New)
--luma-button-primary-bg  →  --color-primary
--luma-toast-info-bg      →  --color-primary
--luma-card-border        →  --color-border
```

**Benefits:**

- **91.8% fewer tokens** (293 → 24)
- **Easier customization** (override 1 token affects all components)
- **Standard Tailwind utilities** (`bg-primary` instead of `lm-bg-button-primary`)
- **No learning curve** (if you know Tailwind, you know Luma)

---

#### **The 24 Semantic Tokens**

**Colors (18 tokens):**

| Token                                   | Purpose              | Used By                              |
| --------------------------------------- | -------------------- | ------------------------------------ |
| `primary`, `primary-foreground`         | Main brand actions   | Buttons, links, active states        |
| `secondary`, `secondary-foreground`     | Secondary actions    | Secondary buttons, subtle highlights |
| `accent`, `accent-foreground`           | Accents & highlights | Hover states, badges                 |
| `destructive`, `destructive-foreground` | Destructive actions  | Delete buttons, error states         |
| `success`, `success-foreground`         | Success feedback     | Success toasts, confirmations        |
| `warning`, `warning-foreground`         | Warning feedback     | Warning toasts, alerts               |
| `muted`, `muted-foreground`             | Muted/disabled       | Disabled states, placeholder text    |
| `background`, `foreground`              | App background/text  | Page background, body text           |
| `card`, `card-foreground`               | Card surfaces        | Card backgrounds                     |
| `popover`, `popover-foreground`         | Elevated surfaces    | Tooltips, popovers, modals           |
| `border`                                | Borders              | All component borders                |
| `input`                                 | Input backgrounds    | Form inputs                          |
| `ring`                                  | Focus rings          | Focus indicators                     |

**Border Radius (6 tokens):**

| Token  | Value          | Usage            |
| ------ | -------------- | ---------------- |
| `none` | 0              | Sharp corners    |
| `sm`   | 0.375rem (6px) | Small elements   |
| `md`   | 0.5rem (8px)   | Default radius   |
| `lg`   | 0.75rem (12px) | Cards, modals    |
| `xl`   | 1rem (16px)    | Large containers |
| `full` | 9999px         | Pills, circles   |

**Note:** Spacing, typography, and transitions use **Tailwind's default scales** (no custom tokens needed).

---

#### **Token Mapping in Components**

Components use **standard Tailwind utilities** that reference semantic tokens:

```typescript
// Button Component
export const buttonVariants = cva([
  'bg-primary', // → var(--color-primary)
  'text-primary-foreground', // → var(--color-primary-foreground)
  'rounded-md', // → var(--radius-md)
  'hover:bg-primary/90', // → var(--color-primary) with 90% opacity
]);

// Card Component
export const cardVariants = cva([
  'bg-card', // → var(--color-card)
  'text-card-foreground', // → var(--color-card-foreground)
  'border-border', // → var(--color-border)
  'rounded-lg', // → var(--radius-lg)
]);

// Toast Component
export const toastVariants = cva({
  variants: {
    variant: {
      info: ['bg-primary', 'text-primary-foreground'], // Reuses primary
      success: ['bg-success', 'text-success-foreground'],
      warning: ['bg-warning', 'text-warning-foreground'],
      error: ['bg-destructive', 'text-destructive-foreground'],
    },
  },
});
```

**Key Insight:** Multiple components share the same semantic tokens. Changing `--color-primary` updates buttons, toasts (info variant), badges, and any other component using `bg-primary`.

---

#### **Customization Patterns**

**Pattern 1: Global Theme Override**

```css
/* Override in your app's CSS */
:root {
  --color-primary: oklch(0.6 0.15 180); /* Change brand color */
  --color-primary-foreground: oklch(1 0 0);
}
/* Affects: all buttons, toasts (info), badges, links automatically */
```

**Pattern 2: Component Instance Override**

```typescript
// Override via className prop
<Button className="bg-accent hover:bg-accent/80">
  Custom Button
</Button>

// Multiple overrides
<Card className="bg-muted border-accent">
  Custom Card
</Card>
```

**Pattern 3: Scoped Override**

```css
/* Override for specific section */
.my-feature {
  --color-primary: oklch(0.7 0.12 340); /* Pink theme */
}

/* All Luma components inside .my-feature use pink */
```

**Pattern 4: Dark Theme**

```css
/* Automatically applied when <html class="dark"> */
.dark {
  --color-primary: oklch(0.72 0.12 300);
  --color-background: oklch(0.16 0.006 290);
  /* ... all 24 tokens overridden */
}
```

---

#### **Why NOT Component-Specific Tokens?**

**Old Approach (Component-Specific):**

```json
{
  "button": {
    "primary": { "bg": "oklch(...)" },
    "secondary": { "bg": "oklch(...)" }
  },
  "toast": {
    "info": { "bg": "oklch(...)" },
    "success": { "bg": "oklch(...)" }
  }
}
// Result: 190 component tokens, hard to customize
```

**New Approach (Semantic):**

```json
{
  "color": {
    "primary": "oklch(...)",
    "success": "oklch(...)"
  }
}
// Result: 24 tokens, buttons AND toasts share colors
```

**Problems with Component-Specific:**

1. **Duplication:** Button primary-bg and Toast info-bg are often the same color
2. **Customization complexity:** Need to override 10+ tokens to change brand color
3. **Maintenance burden:** Adding a component requires creating 15-40 new tokens
4. **Cognitive load:** Developers must learn token naming for each component

**Semantic Advantages:**

1. **Reusability:** One token used by multiple components
2. **Simple customization:** Change 1 token, update all components
3. **No new tokens:** Adding components uses existing semantic tokens
4. **Familiar:** Standard Tailwind utilities (`bg-primary`, `text-foreground`)

---

#### **Token Usage Guidelines**

**✅ DO:**

- Use semantic tokens for all component styling
- Use standard Tailwind utilities (`bg-primary`, not `lm-bg-button-primary`)
- Use inline opacity modifiers (`bg-primary/90`, `hover:bg-muted/50`)
- Override tokens at runtime for dynamic theming
- Share tokens across components (button primary = toast info)

**❌ DON'T:**

- Create component-specific tokens unless absolutely necessary
- Hardcode colors in components
- Use custom utilities when standard Tailwind works
- Add tokens for "future-proofing" without current use
- Duplicate values across multiple tokens

**When to Add a New Semantic Token:**

Ask these questions:

1. **Is it used by 3+ components?** If not, use inline styles
2. **Does it represent a semantic concept?** (e.g., "success", "warning")
3. **Can it be achieved with existing tokens?** Try combinations first
4. **Is it themeable?** If not, it might not need a token

**Example - When NOT to add a token:**

```typescript
// ❌ Don't create a token for component-specific spacing
"card-nested-padding-offset": "0.875rem"

// ✅ Use Tailwind utility directly
className="p-3.5"  // or p-[0.875rem]
```

---

#### **Migration from Old Architecture**

**Old System:**

- 293 tokens (110 core + 183 component)
- Custom utilities: `lm-bg-button-primary`, `lm-rounded-card`
- Component-specific tokens in `src/components/`

**New System:**

- 24 semantic tokens
- Standard Tailwind: `bg-primary`, `rounded-md`
- Theme files: `src/themes/purple/purple.json` + shared tokens in `src/shared/`

**Breaking Changes:**

- All custom `lm-*` utilities removed
- Component-specific tokens eliminated
- Variant names standardized (e.g., `danger` → `destructive`, `bordered` → `filled`)

**Migration Steps:**

1. Replace custom utilities with standard Tailwind
2. Map old variant names to new names
3. Remove references to component-specific tokens
4. Test visual appearance in light and dark modes

See `BUILD_ERRORS_FIXED.md` for complete variant name mapping.

---

#### **Architecture Validation**

**Proof the system works:**

- ✅ **8 components migrated** (Button, Badge, Card, Tooltip, Accordion, Tabs, Modal, Toast)
- ✅ **Zero component-specific tokens** remaining
- ✅ **Build successful** (all TypeScript errors resolved)
- ✅ **CSS size stable** (2.3KB, no bloat)
- ✅ **99 classes generated**
- ✅ **Runtime theming works** (light/dark switching functional)

**Performance Metrics:**

- Token count: **-91.8%** (293 → 24)
- File count: **-92%** (25 files → 2 files)
- Class count: **-65.4%** (214 → 74)
- Build time: Stable (~36s)
- CSS size: Stable (2.3KB)

---

#### **FAQ**

**Q: What if I need a component-specific color?**
A: Use className override: `<Button className="bg-pink-500">Custom</Button>`

**Q: Can I still use component-specific tokens?**
A: Technically yes (add to theme.json), but defeats the purpose. Use semantic tokens.

**Q: How do I add a new color?**
A: Only add if it's used by 3+ components AND represents a semantic concept (like "info", "success"). Otherwise use className.

**Q: What about component variants?**
A: Variants are CSS classes, not tokens. They combine semantic tokens differently (e.g., `primary` = `bg-primary`, `outline` = `border-primary`).

**Q: Do I need to rebuild after changing tokens?**
A: Yes, to regenerate CSS. But users can override at runtime without rebuild.

**Q: Can I use Tailwind's default colors?**
A: Yes! `bg-red-500`, `text-blue-600` work alongside semantic tokens.

---

## Development Commands

### Running the Development Server

```bash
npm run dev
# or
npx nx serve docs
```

Starts the docs app on http://localhost:4200 with hot reload. The `dev` command automatically builds tokens, generates the docs registry, and starts the dev server with token watch mode.

### Building

Build the docs app:

```bash
npm run build          # Development build (generates docs + builds)
npm run build:prod     # Production build
npx nx build docs --configuration=production
```

Build specific packages (Nx handles dependencies automatically):

```bash
npx nx build angular   # Builds angular (auto-builds core + tokens deps)
npx nx build core      # Builds core package
npx nx build tokens    # Builds tokens package
```

Generate docs registry (extracts metadata from `.docs.md` files):

```bash
npm run generate-docs
```

Preview production build:

```bash
npm run preview
# Serves static files from dist/apps/docs/browser
```

### Testing

Run tests for docs app:

```bash
npm test
# or
npx nx test docs
```

Run component tests:

```bash
npm run test:components
# or
npx nx test angular
```

Run a specific test file:

```bash
npx nx test angular --testFile=tabs.spec.ts
```

Test uses `@angular/build:unit-test` executor with Vitest for unit testing (Analogjs integration).

### Linting

Lint docs app:

```bash
npm run lint
# or
npx nx lint docs
```

Lint all projects:

```bash
npm run lint:all
# or
npx nx run-many --target=lint --all
```

Uses ESLint with flat config (`eslint.config.mjs`) and Nx module boundary enforcement.

### Formatting

```bash
npm run format
```

Formats all files with Prettier (single quotes configured in `.prettierrc`).

### E2E Testing

```bash
npm run e2e
# or
npx nx e2e docs-e2e
```

Runs Playwright e2e tests for the docs app.

### Dependency Graph

```bash
npm run graph
# or
npx nx graph
```

Opens interactive visualization of project dependencies.

## Angular Code Standards

These standards ensure consistent, maintainable, and performant code across the Lumo design system.

### TypeScript

**Best Practices:**

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid `any` type; use `unknown` when type is uncertain

### Angular Patterns (v20+)

**Modern Angular Features:**

- **Standalone components**: Default in Angular 20+. Do NOT set `standalone: true` in decorators
- **Signals for state management**: Use signals for reactive state
- **Modern input/output**: Use `input()` and `output()` functions instead of `@Input()` and `@Output()` decorators
- **Computed values**: Use `computed()` for derived state
- **Change detection**: Always set `changeDetection: ChangeDetectionStrategy.OnPush`
- **Lazy loading**: Implement for feature routes
- **Dependency injection**: Use `inject()` function instead of constructor injection
- **Host bindings**: Define in `host` object of decorator (NOT `@HostBinding`/`@HostListener`)
- **Optimized images**: Use `NgOptimizedImage` for static images (not inline base64)

### Components

**Design Principles:**

- Keep components small and focused on a single responsibility
- Use inline templates for small components
- Prefer Reactive forms over template-driven forms
- Use `class` bindings (NOT `ngClass`)
- Use `style` bindings (NOT `ngStyle`)
- Use relative paths for external templates/styles

**State Management:**

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

**Best Practices:**

- Keep templates simple, avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`)
- Use async pipe to handle observables
- Do NOT write arrow functions in templates (unsupported)
- Do NOT assume globals like `new Date()` are available

### Services

**Best Practices:**

- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use `inject()` function instead of constructor injection

### Accessibility Requirements

**Mandatory Standards:**

- **MUST** pass all AXE checks
- **MUST** follow all WCAG AA minimums
- Focus management must be implemented correctly
- Color contrast must meet minimum standards (4.5:1 for text)
- ARIA attributes and roles must be correct and complete

## Testing Standards

These standards ensure design system components are properly tested, with special emphasis on **design token verification** - the core value proposition of the system.

### Testing Philosophy

Tests in a design system serve a different purpose than application tests:

1. **Contract Verification**: Tokens are the API between designers and developers
2. **Customization Proof**: Override tests prove the system is actually customizable
3. **Silent Failure Prevention**: Token changes that aren't consumed break silently
4. **Accessibility Assurance**: WCAG claims must be backed by tests

> **Foundational rule:** If a component claims a feature in documentation, there must be a test verifying it.

### Test Categories for Components

Every component MUST have tests in these categories:

#### 1. Design Token Tests (CRITICAL)

The most important tests for a design system. They verify:

- CSS variables are defined correctly
- Components actually consume the tokens
- Token overrides work (proves customization)

#### 2. Class Application Tests

Verify CVA generates correct Tailwind classes for:

- All variants (primary, outline, ghost, danger)
- All sizes (sm, md, lg, full)
- All states (default, hover, active, focus, disabled)

#### 3. Accessibility Tests

Verify WCAG compliance claims:

- Focus ring visibility (`focus-visible:ring-*`)
- Disabled state propagation
- ARIA attributes when applicable
- Keyboard navigation support

#### 4. Interactive State Tests

For interactive components (buttons, inputs):

- Hover state classes
- Active/pressed state classes
- Focus state classes
- Disabled state behavior

#### 5. Dark Theme Tests

Verify theme support:

- Dark theme token values
- Theme switching behavior
- Color contrast in both themes

### Design Token Testing Patterns

#### Pattern 1: CSS Variable Definition

Verifies the token is set on the document root:

```typescript
beforeEach(() => {
  document.documentElement.style.setProperty(
    '--luma-button-primary-bg',
    'oklch(0.54 0.1 230)',
  );
});

afterEach(() => {
  document.documentElement.style.removeProperty('--luma-button-primary-bg');
});

it('should define --luma-button-primary-bg css variable', () => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--luma-button-primary-bg')
    .trim();

  expect(value).toBe('oklch(0.54 0.1 230)');
});
```

#### Pattern 2: Token Consumption

Verifies the component has access to the token. **IMPORTANT:** CSS variables must be queried from `document.documentElement`, not child elements:

```typescript
describe('Primary Variant', () => {
  beforeEach(() => {
    hostComponent.variant = 'primary';
    fixture.detectChanges();
  });

  it('should have access to --luma-button-primary-bg token', () => {
    // ✅ CORRECT: Query document.documentElement for CSS variables
    // CSS variables are defined on root and inherited, but getComputedStyle
    // on child elements returns empty string for custom properties
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--luma-button-primary-bg')
      .trim();
    expect(value).toBe(BUTTON_TOKENS.primary.bg);
  });
});
```

**⚠️ Common Mistake:** Using `getComputedStyle(childElement)` for CSS variables returns empty string. Always use `document.documentElement`.

#### Pattern 3: Token Override

Proves customization works - the core value of a design system:

```typescript
it('should respect custom radius token override', () => {
  const customRadius = '20px';
  document.documentElement.style.setProperty(
    '--luma-button-radius',
    customRadius,
  );
  fixture.detectChanges();

  // ✅ CORRECT: Query document.documentElement, not the button element
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--luma-button-radius')
    .trim();

  expect(value).toBe(customRadius);
});
```

### Test File Structure

```
packages/angular/src/lib/<component>/
├── <component>.component.ts
├── <component>.component.html
├── <component>.component.spec.ts    # Component tests
├── <component>-directives.spec.ts   # Directive tests (if applicable)
├── <component>.docs.md
└── index.ts
```

### Test Host Components

For directives, use test host components:

```typescript
@Component({
  template: `
    <button lumaButton [variant]="variant" [size]="size" [disabled]="disabled">
      Test Button
    </button>
  `,
  imports: [ButtonDirective],
})
class ButtonTestHostComponent {
  variant: 'primary' | 'outline' | 'ghost' | 'danger' = 'primary';
  size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  disabled = false;
}
```

### Token Setup and Cleanup

**CRITICAL:** Always clean up tokens to prevent test pollution:

```typescript
const BUTTON_TOKENS = {
  primary: {
    bg: 'oklch(0.54 0.1 230)',
    bgHover: 'oklch(0.49 0.09 230)',
    text: 'oklch(1 0 0)',
  },
  // ... other variants
} as const;

function setupButtonTokens(): void {
  const root = document.documentElement;
  root.style.setProperty('--luma-button-primary-bg', BUTTON_TOKENS.primary.bg);
  // ... all tokens
}

function cleanupButtonTokens(): void {
  const root = document.documentElement;
  root.style.removeProperty('--luma-button-primary-bg');
  // ... all tokens
  root.classList.remove('dark');
}

beforeEach(() => setupButtonTokens());
afterEach(() => cleanupButtonTokens());
```

### Dark Theme Testing

```typescript
function applyDarkTheme(): void {
  document.documentElement.classList.add('dark');
  // Override with dark theme values
  document.documentElement.style.setProperty(
    '--luma-button-primary-bg',
    DARK_TOKENS.primary.bg,
  );
}

describe('Dark Theme', () => {
  beforeEach(() => applyDarkTheme());

  it('should have access to dark theme primary background', () => {
    hostComponent.variant = 'primary';
    fixture.detectChanges();

    // ✅ CORRECT: Query document.documentElement for CSS variables
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--luma-button-primary-bg')
      .trim();
    expect(value).toBe(DARK_TOKENS.primary.bg);
  });

  it('should have dark class on document element', () => {
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
});
```

### Pre-Test Checklist

Before committing component tests, verify:

- [ ] All design tokens have definition tests
- [ ] All variants have consumption tests
- [ ] At least one override test proves customization
- [ ] Dark theme tokens are tested
- [ ] Class application tests cover all CVA variants
- [ ] Disabled state is tested for interactive components
- [ ] Focus ring accessibility is verified
- [ ] `afterEach` cleans up all CSS variables
- [ ] Test host components are used for directives

### Verification Commands

```bash
# Run specific component tests
npx nx test angular --testFile=button.directive.spec.ts

# Run all component tests
npm run test:components

# Run with coverage
npx nx test angular --coverage

# Run in watch mode during development
npx nx test angular --watch
```

### Angular Testing Patterns (Critical)

#### Avoiding ExpressionChangedAfterItHasBeenCheckedError

In Angular 20+ with dev mode, changing input values after `detectChanges()` causes this error.

**❌ INCORRECT (changing values in same test):**

```typescript
it('should update classes when variant changes', () => {
  hostComponent.variant = 'primary';
  fixture.detectChanges();
  expect(directive.classes()).toContain('lm-bg-button-primary');

  // ❌ This causes ExpressionChangedAfterItHasBeenCheckedError!
  hostComponent.variant = 'outline';
  fixture.detectChanges();
});
```

**✅ CORRECT (separate tests):**

```typescript
describe('Input Reactivity', () => {
  it('should apply primary variant classes', () => {
    hostComponent.variant = 'primary';
    fixture.detectChanges();
    expect(directive.classes()).toContain('lm-bg-button-primary');
  });

  it('should apply outline variant classes', () => {
    hostComponent.variant = 'outline';
    fixture.detectChanges();
    expect(directive.classes()).toContain('lm-border-button-outline-border');
  });
});
```

#### Nested describe Blocks for Different States

**✅ CORRECT pattern for testing opposite states:**

```typescript
describe('Disabled State', () => {
  describe('when disabled', () => {
    beforeEach(() => {
      hostComponent.disabled = true;
      fixture.detectChanges();
    });

    it('should set disabled attribute', () => {
      expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('when enabled', () => {
    beforeEach(() => {
      hostComponent.disabled = false;
      fixture.detectChanges();
    });

    it('should not have disabled attribute', () => {
      expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(false);
    });
  });
});
```

#### Dedicated Test Host Components for Fixed Values

For inputs that need specific fixed values (like `type="submit"`), create dedicated test host components:

```typescript
// Dedicated test hosts with pre-set values
@Component({
  template: `<button lumaButton type="submit">Submit</button>`,
  imports: [ButtonDirective],
})
class SubmitButtonTestHostComponent {}

@Component({
  template: `<button lumaButton type="reset">Reset</button>`,
  imports: [ButtonDirective],
})
class ResetButtonTestHostComponent {}

// Register in TestBed
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      ButtonDirective,
      ButtonTestHostComponent,
      SubmitButtonTestHostComponent,
      ResetButtonTestHostComponent,
    ],
  }).compileComponents();
});

// Use separate fixtures in tests
it('should allow submit type', () => {
  const submitFixture = TestBed.createComponent(SubmitButtonTestHostComponent);
  submitFixture.detectChanges();
  const submitButton = submitFixture.debugElement.query(
    By.directive(ButtonDirective),
  );
  expect(submitButton.nativeElement.getAttribute('type')).toBe('submit');
});
```

#### Do NOT Call detectChanges() in Outer beforeEach

**❌ INCORRECT:**

```typescript
beforeEach(async () => {
  fixture = TestBed.createComponent(ButtonTestHostComponent);
  hostComponent = fixture.componentInstance;
  setupButtonTokens();
  fixture.detectChanges(); // ❌ This causes problems!
});
```

**✅ CORRECT:**

```typescript
beforeEach(async () => {
  fixture = TestBed.createComponent(ButtonTestHostComponent);
  hostComponent = fixture.componentInstance;
  buttonElement = fixture.debugElement.query(By.directive(ButtonDirective));
  directive = buttonElement.injector.get(ButtonDirective);
  setupButtonTokens();
  // ✅ Do NOT call detectChanges() here!
  // Let each test/nested describe control when to call it
});
```

### Common Test Failures

**ExpressionChangedAfterItHasBeenCheckedError:**

- **DO NOT** change input values and call `detectChanges()` multiple times in the same test
- Use separate `describe` blocks with their own `beforeEach` for each state
- Create dedicated test host components for fixed input values
- **DO NOT** call `detectChanges()` in the outer `beforeEach`

**CSS Variable returns empty string:**

- **ALWAYS** use `getComputedStyle(document.documentElement)` for CSS variables
- **NEVER** use `getComputedStyle(childElement)` to verify tokens
- CSS variables are inherited but don't appear in child element's `getComputedStyle`

**Token not defined:**

- Check `beforeEach` sets the token
- Verify token name matches exactly (case-sensitive)

**Token not consumed:**

- Verify you're using `document.documentElement` (not the component element)
- Ensure `fixture.detectChanges()` was called
- Confirm the component actually uses the class that consumes the token

**Test pollution:**

- Ensure `afterEach` removes all tokens
- Remove `.dark` class in cleanup
- Use unique token values per test if needed

### What NOT to Test

Following the Neo-Minimal principle of avoiding over-engineering:

- Don't test Tailwind CSS itself (it's a dependency)
- Don't test Angular's change detection
- Don't test CVA library internals
- Don't test exact RGB values (OKLCH conversion varies)
- Don't test animation/transition timing (flaky)

## Adding New Components

This comprehensive protocol ensures every component in Lumo is consistent, scalable, accessible, and aligned with the Neo-Minimal design philosophy.

### Required File Structure

Every component must contain these files:

```
packages/angular/src/lib/<component-name>/
  <component-name>.component.ts      # Main component (imports variants from @lumaui/core)
  <component-name>.component.html    # Template
  <component-name>.component.spec.ts # Unit tests
  <component-name>.docs.md          # Documentation
  index.ts                          # Exports

packages/core/src/variants/
  <component-name>.variants.ts       # CVA variant definitions (framework-agnostic)
```

**Notes:**

- Angular 20+ uses standalone components by default
- All styling must use Tailwind CSS classes
- CVA variants are defined in `@lumaui/core`, consumed by Angular components
- Documentation is mandatory for every component

### Component Creation Process

Follow these 8 steps when creating a new component:

#### 1. Define Component Intention and Role

Determine the component's category:

- **Structural**: Layout, containers, grids
- **Interactive**: Buttons, inputs, controls
- **Informational**: Cards, alerts, badges

#### 2. Define Layout and Minimum Spacing

- Start with layout structure
- Use whitespace as the primary tool for hierarchy
- Follow the design tokens for spacing (`@lumaui/tokens`)

#### 3. Define Essential Visual States

Every interactive component must define:

- **Default**: Base appearance
- **Hover**: Gentle feedback on mouse over
- **Focus**: Clear keyboard focus indicator
- **Active**: Pressed/activated state
- **Disabled**: Inactive state

#### 4. Create Files Following Technical Structure

**Component TypeScript (`<component-name>.component.ts`):**

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

const componentVariants = cva(['base', 'classes', 'using', 'tailwind'], {
  variants: {
    variant: {
      default: ['variant-classes'],
      secondary: ['variant-classes'],
    },
    size: {
      sm: ['size-classes'],
      md: ['size-classes'],
      lg: ['size-classes'],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

@Component({
  selector: 'luma-component-name',
  templateUrl: './component-name.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Host bindings go here, not @HostBinding
  },
})
export class ComponentNameComponent {
  // Use input() and output() functions
  variant = input<VariantProps<typeof componentVariants>['variant']>('default');
  size = input<VariantProps<typeof componentVariants>['size']>('md');

  // Computed class names
  classes = computed(() =>
    componentVariants({
      variant: this.variant(),
      size: this.size(),
    }),
  );
}
```

**Documentation (`<component-name>.docs.md`):**

Documentation files use **YAML front matter** to define metadata that powers the auto-generated docs site. The docs app reads this metadata at build time via `npm run generate-docs`.

```markdown
---
name: Component Name
type: component | directive
selector: luma-component | element[lumaDirective]
category: Form | Layout | Feedback
description: Brief description of the component's purpose
inputs:
  - name: variant
    type: "'default' | 'secondary'"
    default: "'default'"
    description: Visual style variant
  - name: size
    type: "'sm' | 'md' | 'lg'"
    default: "'md'"
    description: Size variant
tokens:
  - name: --luma-component-bg
    value: oklch(0.99 0 0)
    description: Component background color
  - name: --luma-component-text
    value: oklch(0.2 0 0)
    description: Component text color
---

# Component Name

## Purpose

Brief description of the component's purpose and use case.

## Usage Examples

### Basic Usage

\`\`\`html
<luma-component>Content</luma-component>
\`\`\`

### With Variants

\`\`\`html
<luma-component variant="secondary" size="lg">
Large secondary content
</luma-component>
\`\`\`

## Accessibility

Document accessibility features, ARIA attributes, and keyboard navigation.

## Neo-Minimal Principles

Explain how the component follows Neo-Minimal design philosophy.
```

**After creating the docs file:**

```bash
npm run generate-docs  # Regenerates apps/docs/src/generated/docs-registry.json
```

The component will automatically appear in the sidebar and be accessible at `/components/{slug}`.

#### 5. Implement Modern Accessibility

**Mandatory accessibility requirements:**

- Correct ARIA attributes and roles
- Logical and visible focus management
- Adequate contrast (minimum 4.5:1 for text)
- Touch-friendly click areas (minimum 44x44px)
- Keyboard navigation support

**Example:**

```typescript
host: {
  'role': 'button',
  '[attr.aria-label]': 'ariaLabel()',
  '[attr.aria-disabled]': 'disabled()',
  '[tabindex]': 'disabled() ? -1 : 0',
}
```

#### 6. Test Functionality and Accessibility

Create comprehensive unit tests:

```typescript
describe('ComponentNameComponent', () => {
  it('should render with default variant', () => {
    // Test implementation
  });

  it('should be keyboard accessible', () => {
    // Test focus and keyboard navigation
  });

  it('should meet accessibility standards', () => {
    // Test ARIA attributes and contrast
  });
});
```

#### 7. Review System Consistency

Before finalizing, verify:

- Component follows Neo-Minimal principles
- Spacing uses design tokens
- Colors are from the token system
- Typography follows system scale
- Interactions are calm and natural
- Component works within larger layouts

#### 8. Export in Package

**Component index (`lib/<component-name>/index.ts`):**

```typescript
export * from './<component-name>.component';
```

**Package index (`packages/angular/src/index.ts`):**

```typescript
export * from './lib/<component-name>/';
```

**Update package.json exports** if component needs separate entry point:

```json
"exports": {
  "./<component>": "./src/lib/<component>/index.ts"
}
```

### Anti-patterns to Avoid

**DO NOT create components that:**

1. Only work in isolation (not composable)
2. Depend on shadow or border for hierarchy (use whitespace)
3. Use brand color in structural background/border (color is for action)
4. Use padding, height, or radius outside the semantic scale
5. Require explanation to be understood (should be intuitive)

### CVA Variant Pattern

Use `class-variance-authority` for type-safe variant management:

```typescript
const componentVariants = cva(
  // Base classes that always apply
  ['base-class-1', 'base-class-2'],
  {
    variants: {
      // Define variant dimensions
      variant: {
        default: ['default-classes'],
        secondary: ['secondary-classes'],
      },
      size: {
        sm: ['text-sm', 'p-2'],
        md: ['text-base', 'p-4'],
        lg: ['text-lg', 'p-6'],
      },
    },
    // Compound variants for specific combinations
    compoundVariants: [
      {
        variant: 'default',
        size: 'lg',
        class: ['additional-class-for-combination'],
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);
```

### Class Naming Convention

All Luma component, directive, and service classes use the `Lm` prefix to provide a consistent namespace and prevent naming conflicts.

**Pattern:** `Lm` + PascalCase class name

| Category  | Pattern             | Example                                   |
| --------- | ------------------- | ----------------------------------------- |
| Component | `Lm{Name}Component` | `LmCardComponent`, `LmTabsComponent`      |
| Directive | `Lm{Name}Directive` | `LmButtonDirective`, `LmTooltipDirective` |
| Service   | `Lm{Name}Service`   | `LmToastService`                          |

**Complete Class List:**

| Package   | Classes                                                                                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button    | `LmButtonDirective`                                                                                                                                                                                         |
| Badge     | `LmBadgeDirective`                                                                                                                                                                                          |
| Card      | `LmCardComponent`, `LmCardTitleDirective`, `LmCardDescriptionDirective`, `LmCardHeaderDirective`, `LmCardContentDirective`                                                                                  |
| Accordion | `LmAccordionGroupComponent`, `LmAccordionItemComponent`, `LmAccordionTriggerDirective`, `LmAccordionTitleDirective`, `LmAccordionIconDirective`, `LmAccordionContentDirective`                              |
| Tooltip   | `LmTooltipDirective`                                                                                                                                                                                        |
| Tabs      | `LmTabsComponent`, `LmTabsListDirective`, `LmTabsTriggerDirective`, `LmTabsPanelDirective`, `LmTabsIndicatorComponent`                                                                                      |
| Modal     | `LmModalComponent`, `LmModalOverlayComponent`, `LmModalContainerComponent`, `LmModalCloseComponent`, `LmModalHeaderDirective`, `LmModalTitleDirective`, `LmModalContentDirective`, `LmModalFooterDirective` |
| Toast     | `LmToastService`, `LmToastContainerComponent`, `LmToastItemComponent`, `LmToastCloseComponent`                                                                                                              |

**Why the prefix:**

- Creates consistent namespace for design system classes
- Prevents naming conflicts with Angular core or third-party libraries
- Makes Luma classes easy to identify in imports and IDE autocomplete
- Follows common design system practices (similar to `Mat` prefix in Angular Material)

**Note:** Selectors remain unchanged (`lumaButton`, `luma-card`, etc.) - only TypeScript class names use the `Lm` prefix.

### Input Naming Convention

All Luma directive inputs use the `lm` prefix to clearly distinguish them from native HTML attributes and other libraries.

**Pattern:** `lm` + PascalCase of the original name

| Original   | Prefixed     | Component                                                           |
| ---------- | ------------ | ------------------------------------------------------------------- |
| `variant`  | `lmVariant`  | LmButtonDirective                                                   |
| `size`     | `lmSize`     | LmButtonDirective, LmCardTitleDirective, LmCardDescriptionDirective |
| `disabled` | `lmDisabled` | LmButtonDirective                                                   |
| `type`     | `lmType`     | LmButtonDirective                                                   |

**Usage Example:**

```html
<button lumaButton lmVariant="primary" lmSize="lg" [lmDisabled]="isLoading">
  Submit
</button>

<h3 lumaCardTitle lmSize="large">Card Title</h3>
<p lumaCardDescription lmSize="small">Description text</p>
```

**Why the prefix:**

- Differentiates Luma inputs from native HTML attributes (`disabled` vs `lmDisabled`)
- Avoids conflicts with other libraries or custom attributes
- Makes Luma usage explicit and easy to identify in templates
- Follows Angular best practices for directive input naming

**TypeScript Implementation:**

```typescript
@Directive({
  selector: 'button[lumaButton]',
  host: {
    '[attr.disabled]': 'lmDisabled() ? "" : null',
  },
})
export class LmButtonDirective {
  lmVariant = input<ButtonVariant>('primary');
  lmSize = input<ButtonSize>('md');
  lmDisabled = input<boolean>(false);
  lmType = input<'button' | 'submit' | 'reset'>('button');
}
```

### Utility Class Naming Convention

All Luma utility classes use the `lm-` prefix to clearly distinguish them from native Tailwind utilities and other libraries.

**Pattern:** `lm-` + property + token-path

| Category   | Pattern                            | Example                                  |
| ---------- | ---------------------------------- | ---------------------------------------- |
| Background | `lm-bg-{token}`                    | `lm-bg-card-product`, `lm-bg-primary-50` |
| Text       | `lm-text-{token}`                  | `lm-text-primary`, `lm-text-secondary`   |
| Border     | `lm-border-{token}`                | `lm-border-neutral-60`                   |
| Radius     | `lm-rounded-{size}`                | `lm-rounded-lg`                          |
| Shadow     | `lm-shadow-{token}`                | `lm-shadow-card-product`                 |
| Padding    | `lm-p-{token}`                     | `lm-p-card`                              |
| Gradient   | `lm-from-{token}`, `lm-to-{token}` | `lm-from-card-gradient-from`             |
| Focus      | `lm-ring-focus`                    | `lm-ring-focus`                          |

**Usage in CVA:**

```typescript
export const buttonVariants = cva([...], {
  variants: {
    variant: {
      primary: [
        'lm-bg-button-primary',
        'hover:lm-bg-button-primary-hover',
        'lm-text-button-primary',
      ],
      outline: [
        'lm-border-button-outline',
        'hover:lm-border-button-outline-hover',
        'lm-text-button-outline',
      ],
    },
  },
});
```

**Why the prefix:**

- Differentiates Luma utilities from native Tailwind classes
- Avoids conflicts with other libraries or custom utilities
- Makes Luma usage explicit and easy to identify in templates
- Easy to filter in browser DevTools (`lm-*`)
- Follows common design system practices (e.g., `tw-`, `mantine-`)

### Documentation System (Single Source of Truth)

The documentation system uses `.docs.md` files as the **single source of truth**. A build-time script extracts metadata and generates a registry that powers the docs app.

**Architecture:**

```text
packages/angular/src/lib/
├── button/
│   ├── button.directive.ts
│   └── button.docs.md          ← Source of truth
├── card/
│   ├── card.component.ts
│   └── card.docs.md            ← Source of truth
└── ...

tools/
└── generate-docs-registry.ts   ← Build-time script

apps/docs/src/
├── generated/
│   └── docs-registry.json      ← Generated at build time
└── app/
    ├── services/
    │   └── docs-registry.service.ts
    └── pages/
        └── component-docs/     ← Dynamic component
```

**Key Commands:**

```bash
npm run generate-docs    # Generate registry from .docs.md files
npm run dev              # Runs generate-docs automatically before serve
npm run build            # Runs generate-docs automatically before build
```

**Front Matter Schema:**

| Field         | Type                           | Required | Description                                   |
| ------------- | ------------------------------ | -------- | --------------------------------------------- |
| `name`        | string                         | Yes      | Display name (e.g., "Button")                 |
| `type`        | `'component'` \| `'directive'` | Yes      | Component type                                |
| `selector`    | string                         | Yes      | Angular selector                              |
| `category`    | string                         | Yes      | Sidebar category (Form, Layout, Feedback)     |
| `description` | string                         | Yes      | Brief description                             |
| `inputs`      | array                          | No       | List of input properties                      |
| `tokens`      | array                          | No       | List of CSS custom properties                 |
| `directives`  | array                          | No       | Sub-directives (for compositional components) |

**Input Schema:**

```yaml
inputs:
  - name: variant # Input name
    type: "'a' | 'b'" # TypeScript type (quoted for literals)
    default: "'a'" # Default value
    description: '...' # Description
```

**Token Schema:**

```yaml
tokens:
  - name: --luma-component-bg # CSS variable name
    value: oklch(0.99 0 0) # Default value
    description: '...' # Description
```

**Markdown Sections:**

The generator extracts these sections from the markdown content:

- `## Purpose` → `sections.purpose`
- `## Accessibility` → `sections.accessibility`
- `## Neo-Minimal Principles` → `sections.neoMinimal`
- `## Usage Examples` → `sections.usage`

Code blocks under `### Heading` become examples with the heading as title.

**Key Files:**

| File                                                                 | Purpose                                  |
| -------------------------------------------------------------------- | ---------------------------------------- |
| `tools/generate-docs-registry.ts`                                    | Parses .docs.md files and generates JSON |
| `apps/docs/src/generated/docs-registry.json`                         | Generated registry (git-ignored)         |
| `apps/docs/src/app/services/docs-registry.service.ts`                | Signal-based service for registry access |
| `apps/docs/src/app/pages/component-docs/component-docs.component.ts` | Dynamic docs page                        |
| `apps/docs/src/app/app.routes.server.ts`                             | SSR prerendering config                  |

## Important Nx Commands

Run any target for a specific project:

```bash
npx nx <target> <project-name>
```

Run a target across multiple projects:

```bash
npx nx run-many --target=<target> --projects=proj1,proj2
npx nx run-many --target=<target> --all
```

Clear Nx cache:

```bash
npx nx reset
```

## TypeScript Configuration

- Base config: `tsconfig.base.json`
- Path mappings: `@lumaui/angular`, `@lumaui/core`, `@lumaui/tokens` point to source files
- Target: ES2015, module: ESNext
- Decorators enabled for Angular

## Version Management

Release packages:

```bash
npx nx release
npx nx release --dry-run  # Preview without publishing
```

Nx release handles versioning and publishing for all packages.

## Peer Dependencies

When adding new features, ensure peer dependencies are maintained:

- Angular: `~21.0.0`
- Tailwind CSS: `^4.0.0`
- class-variance-authority: `^0.7.1`

## Code Style

- Single quotes (Prettier configured)
- ESLint with Nx module boundaries enforced
- Standalone Angular components (no NgModules)
- Type-safe variants with CVA
