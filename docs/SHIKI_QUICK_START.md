# Shiki Enhanced Syntax Highlighting - Quick Start Guide

## 🎯 Overview

Lumo docs now use **Shiki v3** with powerful build-time transformers for enhanced code highlighting. All features are **zero-runtime-overhead** and follow Neo-Minimal design principles.

## ✨ Available Features

### 1. Language Labels (Automatic)

**What:** Every code block automatically shows its language in the top-right corner.

**How:** Just use standard code fences. No configuration needed.

````markdown
```typescript
// Shows "TypeScript" label automatically
const message = 'Hello';
```
````

**Supported Languages:** HTML, TypeScript, JavaScript, CSS, SCSS, JSON, Bash, Shell, Markdown (auto-capitalizes unknown languages)

---

### 2. Line Numbers (Opt-In)

**What:** Display line numbers in the left gutter using CSS counters.

**How:** Add `{lineNumbers}` to the code fence meta.

````markdown
```typescript {lineNumbers}
import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<div>Hello</div>`,
})
export class ExampleComponent {}
```
````

**When to Use:**

- Long code snippets (>15 lines)
- When referencing specific lines in explanations
- Tutorial/walkthrough content

---

### 3. Line Highlighting

**What:** Highlight specific lines while dimming others.

**How:** Add `{line-numbers}` to the code fence meta (comma-separated, ranges supported).

````markdown
```typescript {1,5-7}
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-demo',
  template: `
    <button lumaButton lmVariant="primary">Primary</button>
    <button lumaButton lmVariant="secondary">Secondary</button>
    <button lumaButton lmVariant="outline">Outline</button>
  `,
})
```
````

**Syntax:**

- `{1}` - Highlight line 1
- `{1,3}` - Highlight lines 1 and 3
- `{1-5}` - Highlight lines 1 through 5
- `{1,3-5,7}` - Combine singles and ranges

**When to Use:**

- Drawing attention to specific code changes
- Highlighting important lines in examples
- Teaching/tutorial content

---

### 4. Diff Highlighting

**What:** Show additions/deletions with green/red backgrounds and symbols.

**How:** Add `// [!code ++]` or `// [!code --]` at the end of lines.

````markdown
```typescript
- const old = 'removed';  // [!code --]
+ const new = 'added';  // [!code ++]

- <button variant="danger">Delete</button>  // [!code --]
+ <button lmVariant="destructive">Delete</button>  // [!code ++]
```
````

**When to Use:**

- Migration guides (showing old vs new syntax)
- Before/after comparisons
- Breaking change documentation
- Deprecation notices

---

### 5. Focus Lines

**What:** Blur non-focused lines to emphasize specific code sections.

**How:** Add `// [!code focus]` or `// [!code focus:N]` (N = number of lines to focus).

````markdown
```typescript
function processAction(action: string): void {
  console.log('Starting...');

  // [!code focus:3]
  if (action === 'delete') {
    confirmDeletion().then(() => deleteItem());
  }

  console.log('Done');
}
```
````

**When to Use:**

- Drawing attention to key logic in long functions
- Highlighting the "important part" in boilerplate-heavy code
- Contextual explanations (show context but focus on one section)

---

### 6. Combined Features

**All features work together!**

````markdown
```typescript {lineNumbers} {2,6-8}
import { LmButtonDirective } from '@lumaui/angular';
- const variants = ['primary', 'danger'];  // [!code --]
+ const variants = ['primary', 'destructive'];  // [!code ++]

@Component({
  template: `
    <button lumaButton>Click</button>
  `,
})
```
````

This example uses:

- Line numbers (`{lineNumbers}`)
- Line highlighting (`{2,6-8}`)
- Diff notation (`[!code ++]`, `[!code --]`)

---

## 🎨 Neo-Minimal Design Details

All features follow Lumo's design philosophy:

| Element               | Light Mode                 | Dark Mode                  |
| --------------------- | -------------------------- | -------------------------- |
| **Language Label**    | 50% opacity muted bg       | 30% opacity muted bg       |
| **Line Numbers**      | 60% opacity foreground     | 40% opacity foreground     |
| **Highlighted Lines** | 8% opacity primary bg      | 12% opacity primary bg     |
| **Diff Additions**    | 10% opacity success bg     | 15% opacity success bg     |
| **Diff Removals**     | 10% opacity destructive bg | 15% opacity destructive bg |
| **Focus Blur**        | 40% opacity + 0.5px blur   | 30% opacity + 0.5px blur   |

All transitions use **200ms ease-out** for calm, gentle interactions.

---

## 📝 Writing Guidelines

### DO:

✅ Use language labels for all code blocks (automatic)
✅ Add line numbers for long snippets (>15 lines)
✅ Highlight key lines in examples (2-5 lines max)
✅ Use diff for migration guides and breaking changes
✅ Use focus for long functions with one key section
✅ Combine features when they add clarity

### DON'T:

❌ Highlight too many lines (defeats the purpose)
❌ Use diff for trivial changes (just show the new way)
❌ Use focus without context (users need to see surrounding code)
❌ Add line numbers to short snippets (<10 lines)
❌ Overuse features (let code speak for itself when possible)

---

## 🔧 Development Workflow

### Adding Features to Existing Docs

1. Open the `.docs.md` file (e.g., `packages/angular/src/lib/button/button.docs.md`)
2. Find or create a code block
3. Add the desired meta syntax to the code fence
4. Regenerate docs: `npm run generate-docs`
5. View in browser: http://localhost:4200

### Example Workflow

````bash
# 1. Edit docs file
vim packages/angular/src/lib/card/card.docs.md

# 2. Add enhanced code block (e.g., with line numbers)
# ```typescript {lineNumbers}
# ... code ...
# ```

# 3. Regenerate docs
npm run generate-docs

# 4. Start dev server (if not running)
npm run dev

# 5. View at http://localhost:4200/components/card
````

### Build Commands

```bash
# Regenerate docs only
npm run generate-docs

# Full dev server (with watch mode)
npm run dev

# Production build
npm run build:prod

# Preview production build
npm run preview
```

---

## 🐛 Troubleshooting

### Language label not showing

**Cause:** Missing language in code fence
**Fix:** Add language: ` ```typescript ` instead of ` ``` `

### Line numbers not appearing

**Cause:** Missing `{lineNumbers}` meta
**Fix:** Add meta: ` ```typescript {lineNumbers} `

### Highlighting not working

**Cause:** Wrong meta syntax
**Fix:** Use `{1,3-5}` not `{lineNumbers:1,3-5}`

### Diff not showing

**Cause:** Missing comment marker
**Fix:** Add `// [!code ++]` at end of line (with space after //)

### Features not visible in browser

**Cause:** Docs not regenerated
**Fix:** Run `npm run generate-docs`

### CSS not applied

**Cause:** Browser cache
**Fix:** Hard refresh (Cmd/Ctrl+Shift+R)

---

## 📚 Examples

### Tutorial Content

Use **line numbers + highlighting**:

````markdown
```typescript {lineNumbers} {5-7}
import { Component } from '@angular/core';
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  template: ` <button lumaButton lmVariant="primary">Click me</button> `,
  imports: [LmButtonDirective],
})
export class TutorialComponent {}
```

Lines 5-7 show the template with our button component.
````

### Migration Guide

Use **diff**:

````markdown
```typescript
- import { OldButton } from './old-library';  // [!code --]
+ import { LmButtonDirective } from '@lumaui/angular';  // [!code ++]

@Component({
  template: `
-   <button oldButton variant="danger">Delete</button>  // [!code --]
+   <button lumaButton lmVariant="destructive">Delete</button>  // [!code ++]
  `,
})
```
````

### Complex Logic Explanation

Use **focus**:

````markdown
```typescript
async function handleFormSubmit(data: FormData): Promise<void> {
  showLoadingSpinner();

  try {
    // [!code focus:3]
    const result = await api.submit(data);
    updateUI(result);
    showSuccessMessage();
  } catch (error) {
    handleError(error);
  } finally {
    hideLoadingSpinner();
  }
}

The key part is lines 5-7 where we submit data and update the UI.
```
````

---

## 🎓 Learning Resources

- **Shiki Documentation:** https://shiki.style
- **Transformers Package:** https://shiki.style/packages/transformers
- **Lumo Button Docs:** http://localhost:4200/components/button (see "Shiki Enhancement Demo" section)
- **Test Document:** `/SHIKI_FEATURES_TEST.md` (comprehensive testing checklist)
- **Implementation Summary:** `/SHIKI_ENHANCEMENTS.md` (technical details)

---

## ✅ Quick Checklist

When adding enhanced code blocks:

- [ ] Choose appropriate language for code fence
- [ ] Consider if line numbers add value (>15 lines)
- [ ] Highlight only key lines (2-5 lines max)
- [ ] Use diff for migration/breaking changes
- [ ] Use focus for long snippets with one key section
- [ ] Test in both light and dark modes
- [ ] Verify in browser after regenerating docs
- [ ] Ensure accessibility (screen reader friendly)

---

**Remember:** These features are tools, not requirements. Use them when they add clarity, not just because they're available. The best documentation is clear and concise, with or without highlighting. ✨
