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

- **`packages/tokens`** (`@luma/tokens`): Design tokens managed with Style Dictionary
  - Tokens defined in JSON files in `src/core/` and `src/components/`
  - Separate light and dark theme files (`.json` and `.dark.json`)
  - Compiled CSS exports in `build/`: `luma.css`, `luma-dark.css`
  - Tokens cover colors, spacing, typography, transitions, and component-specific values

- **`packages/components`** (`@luma/components`): Angular standalone components
  - Each component follows a feature-folder structure (`lib/button/`, `lib/card/`)
  - Components use class-variance-authority (CVA) for type-safe variant management
  - Exports are managed via `src/index.ts` with individual component index files

- **`packages/luma`** (`luma`): Meta-package that aggregates tokens + components
  - Re-exports everything from `@luma/tokens` and `@luma/components`
  - Main entry point for consuming the design system
  - Handles CSS file exports for themes

- **`apps/playground`**: Development/showcase Angular SSR application
  - Used for testing and demonstrating components
  - Runs with Angular's dev server and supports SSR

### Key Design Patterns

**Component Architecture:**
- All components are Angular standalone (no NgModules)
- Use CVA for variant management with TypeScript type safety
- Components export both the component class and supporting directives/types
- Tailwind CSS classes reference design tokens (e.g., `rounded-luma-md`, `text-luma-base`)

**Styling Approach:**
- Tailwind CSS v4 with PostCSS plugin (`@tailwindcss/postcss`)
- Custom design tokens as Tailwind utilities (prefixed with `luma-`)
- CSS variables for theme values (defined in tokens package)
- No component-scoped CSS; styles are applied via class composition

**Nx Task Orchestration:**
- Build targets use dependency graph (`dependsOn: ["^build"]`)
- Inferred tasks for linting, testing via Nx plugins
- Caching enabled for build, lint, and test targets

### Design Tokens with Style Dictionary

Luma uses **Style Dictionary** to manage design tokens across light and dark themes. This provides a scalable, maintainable way to define and transform design values.

**Token Organization:**

```
packages/tokens/
├── src/
│   ├── core/                    # Global tokens (colors, spacing, typography)
│   │   ├── colors.json          # Light theme colors
│   │   ├── colors.dark.json     # Dark theme colors
│   │   ├── spacing.json
│   │   ├── typography.json
│   │   └── transitions.json
│   │
│   └── components/              # Component-specific tokens
│       ├── button/
│       │   ├── button.json      # Light theme button tokens
│       │   └── button.dark.json # Dark theme button tokens
│       ├── card/
│       └── badge/
│
├── build/                       # Generated output (git-ignored)
│   ├── luma.css                 # Compiled light theme
│   └── luma-dark.css            # Compiled dark theme
│
├── config.js                    # Style Dictionary config (light theme)
└── config.dark.js               # Style Dictionary config (dark theme)
```

**Token Format:**

Tokens are defined in JSON using the [Design Tokens Format](https://design-tokens.github.io/community-group/format/):

```json
{
  "luma": {
    "button": {
      "primary": {
        "bg": {
          "value": "{luma.color.primary}",
          "type": "color",
          "description": "Primary button background"
        },
        "bg-hover": {
          "value": "{luma.color.primary-hover}",
          "type": "color",
          "description": "Primary button hover background"
        }
      }
    }
  }
}
```

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
npm run build         # Build both light and dark themes
npm run build:light   # Build only light theme
npm run build:dark    # Build only dark theme
npm run watch         # Watch mode for both themes
```

**Important:** Tokens are automatically built when building the playground app (via Nx dependency graph). You only need to manually build tokens if:
- You're developing tokens in isolation
- You want to see generated CSS immediately
- You're debugging token generation

**Output:**

Style Dictionary generates:
- CSS custom properties with `--luma-*` prefix
- Tailwind utilities for each token (e.g., `@utility bg-button-primary-bg`)
- Light theme in `@theme` block, dark theme in `.dark` selector

**Adding New Tokens:**

1. Create token JSON file in appropriate directory (`src/core/` or `src/components/<name>/`)
2. Create matching `.dark.json` file if token needs dark theme override
3. Update `config.js` and `config.dark.js` source arrays to include new files
4. Run `npm run build` to generate CSS
5. Use tokens in components via Tailwind utilities or CSS variables

### Token Creation Best Practices

When creating tokens for new components, follow these critical rules to ensure all interactive states work correctly and utilities are generated properly. These practices are based on lessons learned from real-world token implementation issues.

#### 1. Interactive State Token Patterns

Every interactive component (buttons, inputs, controls) must define tokens for all essential visual states using standard suffixes:

**Standard State Suffixes:**
- Base property (no suffix): Default state
- `-hover`: Hover/mouse-over state
- `-active`: Pressed/clicked state
- `-focus`: Keyboard focus indicator
- `-disabled`: Inactive/non-interactive state

**Complete Interactive Component Example:**

```json
{
  "luma": {
    "button": {
      "primary": {
        "bg": {
          "value": "{luma.color.primary}",
          "type": "color",
          "description": "Primary button background"
        },
        "bg-hover": {
          "value": "{luma.color.primary-hover}",
          "type": "color",
          "description": "Primary button hover background"
        },
        "bg-active": {
          "value": "{luma.color.primary-active}",
          "type": "color",
          "description": "Primary button active background"
        },
        "text": {
          "value": "{luma.color.on-primary}",
          "type": "color",
          "description": "Primary button text color"
        },
        "border": {
          "value": "transparent",
          "type": "color",
          "description": "Primary button border"
        },
        "border-hover": {
          "value": "transparent",
          "type": "color",
          "description": "Primary button hover border"
        }
      }
    }
  }
}
```

**When to Create State-Specific Tokens:**

- **Always create separate tokens** for hover/active states when the value differs from base
- **Reuse base tokens** (via reference) when states share the same value
- **Always provide dark theme overrides** (`.dark.json`) for all color tokens
- **Never assume** a state will inherit correctly—explicitly define or reference

#### 2. Style Dictionary Filter Patterns (CRITICAL)

**⚠️ CRITICAL BUG:** Using `path.includes()` to filter tokens with compound names (e.g., `'bg-hover'`, `'bg-active'`) will fail because token paths are arrays of elements, not concatenated strings.

**Why This Breaks:**

Token paths in Style Dictionary are arrays like `['luma', 'button', 'primary', 'bg-hover']`. Each element is a complete string, not split at hyphens.

```javascript
// ❌ BROKEN - Will miss 'bg-hover', 'bg-active', etc.
const bgTokens = dictionary.allTokens.filter(t =>
  t.path[2] === 'primary' && t.path.includes('bg')
);
// path.includes('bg') returns false for element 'bg-hover'
```

**Correct Pattern:**

Use `path.some()` with `startsWith()` to match token name prefixes:

```javascript
// ✅ CORRECT - Captures 'bg', 'bg-hover', 'bg-active'
const bgTokens = dictionary.allTokens.filter(t =>
  t.path[1] === 'button' &&
  t.path[2] === 'primary' &&
  t.path.some(p => typeof p === 'string' && p.startsWith('bg'))
);
```

**Complete Filter Examples:**

```javascript
// Background tokens (including hover, active states)
const bgTokens = dictionary.allTokens.filter(t =>
  t.path[1] === 'button' &&
  t.path.some(p => typeof p === 'string' && p.startsWith('bg'))
);

// Text color tokens
const textTokens = dictionary.allTokens.filter(t =>
  t.path[1] === 'button' &&
  t.path.some(p => typeof p === 'string' && p.startsWith('text'))
);

// Border tokens (including hover states)
const borderTokens = dictionary.allTokens.filter(t =>
  t.path[1] === 'button' &&
  t.path.some(p => typeof p === 'string' && p.startsWith('border'))
);
```

**Verification After Config Changes:**

```bash
# Build tokens
npm run build

# Verify hover state utilities were generated
grep "@utility.*hover" packages/tokens/build/luma.css

# Count utilities for a component (e.g., button should have 10+)
grep -c "@utility.*button" packages/tokens/build/luma.css

# List all generated utilities for inspection
grep "@utility" packages/tokens/build/luma.css | head -n 20
```

#### 3. Accessibility: Focus Ring Tokens

**⚠️ CRITICAL:** Focus rings MUST use `outline` property, NOT `box-shadow`.

**Why Outline is Required:**

- **WCAG 2.4.7 (Focus Visible):** Recommends outline-based focus indicators
- **Windows High Contrast Mode:** Only `outline` is respected; `box-shadow` disappears
- **Browser defaults:** Tailwind v4 expects outline-based focus utilities
- **Visual separation:** `outline-offset` creates better distinction from element

**Incorrect vs Correct Implementation:**

```javascript
// ❌ INCORRECT - Fails in High Contrast Mode
output += `  box-shadow: 0 0 0 var(--luma-component-focus-ring-width) var(--luma-component-focus-ring-color);\n`;

// ✅ CORRECT - Accessible focus ring
output += `  outline: var(--luma-component-focus-ring-width) solid var(--luma-component-focus-ring-color);\n`;
output += `  outline-offset: 2px;\n`;
```

**Focus Ring Token Structure:**

```json
{
  "luma": {
    "button": {
      "primary": {
        "focus": {
          "ring-width": {
            "value": "2px",
            "type": "dimension",
            "description": "Focus ring width (WCAG 2.4.7 minimum)"
          },
          "ring-color": {
            "value": "oklch(0.54 0.1 230 / 0.25)",
            "type": "color",
            "description": "Focus ring color with sufficient contrast"
          }
        }
      }
    }
  }
}
```

**Style Dictionary Formatter for Focus Rings:**

```javascript
if (token.path.includes('focus')) {
  // Generate utility for focus state
  output += `@utility ring-${utilityName} {\n`;
  output += `  outline: var(--luma-${tokenPath}-ring-width) solid var(--luma-${tokenPath}-ring-color);\n`;
  output += `  outline-offset: 2px;\n`;
  output += `}\n\n`;
}
```

**Contrast Requirements:**

- Minimum 3:1 contrast ratio between focus indicator and background (WCAG 2.4.11)
- Focus ring should be visible in both light and dark themes
- Test with Windows High Contrast Mode enabled

#### 4. Transition Token Integration

Transition tokens define timing and easing functions aligned with Neo-Minimal principles (gentle, natural animations).

**Complete Transition Specification:**

Components need BOTH duration AND timing function for smooth transitions. Use Tailwind v4 arbitrary values with underscores for spaces:

```typescript
// ❌ Incomplete - Missing timing function token
'transition-colors',
'duration-luma-base',

// ✅ Complete - Uses all transition tokens with correct syntax
'transition-[color_var(--luma-button-transition-duration)_var(--luma-button-transition-timing)]',
```

**Transition Token Structure:**

```json
{
  "luma": {
    "button": {
      "transition": {
        "duration": {
          "value": "{luma.duration.base}",
          "type": "duration",
          "description": "Button transition duration"
        },
        "timing": {
          "value": "ease-out",
          "type": "string",
          "description": "Natural deceleration curve (Neo-Minimal principle)"
        }
      }
    }
  }
}
```

**Why `ease-out`:**

Per Neo-Minimal "Calm Interactions" principle:
- Interactions should respond naturally, not mechanically
- Deceleration curves (`ease-out`) feel organic
- Avoid `ease-in` (feels sluggish) or `linear` (feels robotic)

**Tailwind v4 Arbitrary Value Syntax:**

When using CSS values with spaces in Tailwind v4, replace spaces with underscores:

```typescript
// CSS: color 150ms ease-out
// Tailwind: transition-[color_150ms_ease-out]

// With CSS variables:
'transition-[color_var(--duration)_var(--timing)]'
```

#### 5. Token Hygiene Checklist

Before committing tokens for a new component, run these verification steps to ensure all utilities are generated correctly and no unused tokens exist.

**Pre-Commit Verification Commands:**

```bash
# 1. Build tokens in watch mode during development
cd packages/tokens && npm run watch

# 2. Build tokens for verification
npm run build

# 3. Count generated utilities for your component
grep -c "@utility.*button" build/luma.css
# Expected: 10+ utilities for a complete interactive component

# 4. Verify all interactive state utilities exist
grep "@utility.*button.*hover" build/luma.css
grep "@utility.*button.*active" build/luma.css
grep "@utility.*button.*focus" build/luma.css

# 5. Check focus ring uses outline (not box-shadow)
grep -A 3 "ring-button.*focus" build/luma.css | grep outline

# 6. Verify dark theme overrides exist
grep "@utility.*button" build/luma-dark.css

# 7. Search for unused tokens (should return no results)
grep -r "luma-button-unused-token-name" ../../packages/components/src/

# 8. Validate CSS variable output
grep "^  --luma-button" build/luma.css | head -n 10
```

**Common Issues Checklist:**

Before committing, verify:

- [ ] All interactive states have corresponding tokens (base, hover, active, focus, disabled)
- [ ] Focus ring tokens generate `outline` property, not `box-shadow`
- [ ] Transition tokens include BOTH duration AND timing function
- [ ] No unused tokens remain in JSON files (tokens defined but never used)
- [ ] Dark theme overrides (`.dark.json`) exist for all color tokens
- [ ] Style Dictionary filters use `path.some()` with `startsWith()`, NOT `path.includes()`
- [ ] Utilities are generated for all hover/active/focus tokens (verify in build output)
- [ ] Token names follow kebab-case convention (`bg-hover` not `bgHover`)
- [ ] Component tokens follow naming pattern: `--luma-{component}-{variant}-{property}`

**Token Removal Guidelines:**

Per Neo-Minimal principle: "If an element can be removed without functional or semantic loss, it shouldn't exist."

Remove tokens when:
- Token is defined but never referenced in component code
- Token duplicates a core token without adding component-specific value
- Token was created for hypothetical future use but isn't needed now
- Token can be replaced by a reference to an existing token

**Quick Audit Script:**

```bash
#!/bin/bash
# Quick token audit for a component

COMPONENT="button"
TOKENS_DIR="packages/tokens/src/components/$COMPONENT"
COMPONENT_DIR="packages/components/src/lib/$COMPONENT"

echo "=== Token Audit for $COMPONENT ==="
echo ""

echo "1. Tokens defined:"
grep -r '"value"' "$TOKENS_DIR" | wc -l

echo ""
echo "2. Utilities generated:"
grep -c "@utility.*$COMPONENT" packages/tokens/build/luma.css

echo ""
echo "3. Interactive state coverage:"
grep "@utility.*$COMPONENT.*hover" packages/tokens/build/luma.css | wc -l
grep "@utility.*$COMPONENT.*active" packages/tokens/build/luma.css | wc -l
grep "@utility.*$COMPONENT.*focus" packages/tokens/build/luma.css | wc -l

echo ""
echo "4. Focus ring accessibility:"
grep -A 3 "focus" packages/tokens/build/luma.css | grep -c "outline:"

echo ""
echo "5. Unused token check (should be 0):"
# Lists tokens that aren't referenced in component code
for token in $(grep -o '"[a-z-]*":' "$TOKENS_DIR"/*.json | cut -d'"' -f2); do
  if ! grep -q "luma-$COMPONENT.*$token" "$COMPONENT_DIR"/*.ts 2>/dev/null; then
    echo "  - Potentially unused: $token"
  fi
done
```

Save this script as `scripts/audit-tokens.sh` and run with: `bash scripts/audit-tokens.sh`

**Token Naming Convention:**

- Global tokens: `--luma-{category}-{property}` (e.g., `--luma-color-primary`)
- Component tokens: `--luma-{component}-{variant}-{property}` (e.g., `--luma-button-primary-bg`)
- All tokens use kebab-case

**Benefits:**

- Single source of truth for design values
- Automatic dark theme support
- Type-safe token references (via JSON)
- Easy theme customization
- Scalable across components

## Development Commands

### Running the Development Server
```bash
npm run dev
# or
npx nx serve playground
```
Starts the playground app on http://localhost:4200 with hot reload.

### Building

Build the playground app:
```bash
npm run build          # Development build
npm run build:prod     # Production build
npx nx build playground --configuration=production
```

Build specific packages (Nx handles dependencies automatically):
```bash
npx nx build components
npx nx build tokens
```

Preview production build:
```bash
npm run preview
# Serves static files from dist/apps/playground/browser on port 4200
```

### Testing

Run tests for playground:
```bash
npm test
# or
npx nx test playground
```

Run component tests:
```bash
npm run test:components
# or
npx nx test components
```

Test uses `@angular/build:unit-test` executor with Vitest for unit testing (Analogjs integration).

### Linting

Lint playground:
```bash
npm run lint
# or
npx nx lint playground
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
npx nx e2e playground-e2e
```
Runs Playwright e2e tests for the playground app.

### Dependency Graph

```bash
npm run graph
# or
npx nx graph
```
Opens interactive visualization of project dependencies.

### Package Linking (Local Development)

For local package development and testing:

```bash
npm run link:setup     # Links all packages together
npm run link:meta      # Links only the luma meta-package
npm run link:build     # Builds and links everything
npm run unlink:all     # Removes all npm links
```

These scripts use `npm link` to create symlinks between packages for local development without publishing.

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
    'oklch(0.54 0.1 230)'
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
    customRadius
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
packages/components/src/lib/<component>/
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
    DARK_TOKENS.primary.bg
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
npx nx test components --testFile=button.directive.spec.ts

# Run all component tests
npm run test:components

# Run with coverage
npx nx test components --coverage

# Run in watch mode during development
npx nx test components --watch
```

### Angular Testing Patterns (Critical)

#### Avoiding ExpressionChangedAfterItHasBeenCheckedError

In Angular 20+ with dev mode, changing input values after `detectChanges()` causes this error.

**❌ INCORRECT (changing values in same test):**
```typescript
it('should update classes when variant changes', () => {
  hostComponent.variant = 'primary';
  fixture.detectChanges();
  expect(directive.classes()).toContain('bg-button-primary-bg');

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
    expect(directive.classes()).toContain('bg-button-primary-bg');
  });

  it('should apply outline variant classes', () => {
    hostComponent.variant = 'outline';
    fixture.detectChanges();
    expect(directive.classes()).toContain('border-button-outline-border');
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
    By.directive(ButtonDirective)
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
packages/components/src/lib/<component-name>/
  <component-name>.component.ts      # Main component with CVA variants
  <component-name>.component.html    # Template
  <component-name>.component.spec.ts # Unit tests
  <component-name>.docs.md          # Documentation
  index.ts                          # Exports
```

**Notes:**
- Angular 20+ uses standalone components by default
- All styling must use Tailwind CSS classes
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
- Follow the design tokens for spacing (`@luma/tokens`)

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

const componentVariants = cva(
  ['base', 'classes', 'using', 'tailwind'],
  {
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
  }
);

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
    })
  );
}
```

**Documentation (`<component-name>.docs.md`):**
```markdown
# Component Name

## Purpose
Brief description of the component's purpose and use case.

## Inputs
- `variant`: 'default' | 'secondary' - Visual variant
- `size`: 'sm' | 'md' | 'lg' - Size variant

## Outputs
- `clicked`: Event emitted on click

## States
- Default: Base appearance
- Hover: [description]
- Focus: [description]
- Active: [description]
- Disabled: [description]

## Usage Examples
\`\`\`html
<luma-component-name variant="default" size="md">
  Content
</luma-component-name>
\`\`\`
```

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

**Package index (`packages/components/src/index.ts`):**
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
  }
);
```

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
- Path mapping for `@lumo/components` points to source files
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
