# Styling Page: Before & After Shiki Highlighting

## Visual Comparison

### Before (Plain Text)

```
┌─────────────────────────────────────────┐
│ CSS                                     │
├─────────────────────────────────────────┤
│ .element {                              │
│   border-radius: var(--radius-1);       │
│ }                                       │
└─────────────────────────────────────────┘
```

- Monospaced text
- Single color (muted gray)
- No syntax highlighting
- Generic code block appearance

### After (Shiki Highlighted)

```
┌─────────────────────────────────────────┐
│                                     CSS │ ← Language label
├─────────────────────────────────────────┤
│ .element {                              │ ← Purple selector
│   border-radius: var(--radius-1);       │ ← Blue property, cyan var()
│ }                                       │ ← Gray bracket
└─────────────────────────────────────────┘
```

- Syntax-aware colors:
  - Purple: `.element` (selector)
  - Blue: `border-radius` (property)
  - Cyan: `var()` (function)
  - Gray: `{`, `}`, `;` (punctuation)
- Theme-aware:
  - Light mode: `min-light` theme
  - Dark mode: `nord` theme

## Component Changes

### CodeBlockComponent Template

#### Before

```html
<!-- Single rendering path - always plain text -->
<div class="lm-bg-code border lm-border-code lm-rounded-code overflow-hidden">
  <div class="px-4 py-2 border-b lm-border-code">
    <span class="text-xs lm-text-code opacity-70">{{ languageLabel() }}</span>
  </div>
  <div class="p-4 overflow-x-auto">
    <pre class="text-xs font-mono leading-relaxed lm-text-code">
      <code>{{ code() }}</code>
    </pre>
  </div>
</div>
```

#### After

```html
<!-- Conditional rendering - Shiki preferred, plain text fallback -->
@if (safeHighlightedCode()) {
<!-- Shiki highlighted code (build-time) -->
<div class="rounded-lg overflow-hidden border border-border">
  <div class="bg-card">
    <div
      class="overflow-x-auto text-sm [&_code]:font-mono"
      [innerHTML]="safeHighlightedCode()"
    ></div>
  </div>
</div>
} @else {
<!-- Fallback: plain text (existing code) -->
<div class="lm-bg-code border lm-border-code lm-rounded-code overflow-hidden">
  <!-- ... original template ... -->
</div>
}
```

### TokenPreviewComponent

#### Before

```typescript
@Component({
  template: `
    <app-code-block
      [code]="token().cssExample"
      language="css"
      [showLineNumbers]="false"
    />
  `,
})
export class TokenPreviewComponent {
  token = input.required<TokenPreviewData>();
}
```

#### After

```typescript
@Component({
  template: `
    <app-code-block
      [code]="token().cssExample"
      [highlightedCode]="highlightedCssExample()"  <!-- NEW -->
      language="css"
      [showLineNumbers]="false"
    />
  `,
})
export class TokenPreviewComponent {
  private docsRegistry = inject(DocsRegistryService);

  token = input.required<TokenPreviewData>();

  // NEW: Fetch highlighted code from registry
  readonly highlightedCssExample = computed<string | undefined>(() => {
    const token = this.token();
    if (!token?.cssExample) return undefined;

    const blockId = token.name.toLowerCase().replace(/\s+/g, '-') + '-example';
    return this.docsRegistry.getHighlightedStylingCode(blockId);
  });
}
```

## Data Flow

### Before

```
styling-page.component.ts (radiusTokens/shadowTokens)
    ↓
token-preview.component.ts (displays token)
    ↓
code-block.component.ts (renders plain text)
    ↓
Browser (monochrome code)
```

### After

```
Build Time:
  styling-page.component.ts (radiusTokens/shadowTokens)
      ↓
  generate-docs-registry.ts (extracts cssExample)
      ↓
  Shiki (highlights CSS)
      ↓
  docs-registry.json (stores highlighted HTML)

Runtime:
  token-preview.component.ts (displays token)
      ↓
  docs-registry.service.ts (fetches highlighted code)
      ↓
  code-block.component.ts (renders Shiki HTML)
      ↓
  Browser (colorful syntax-highlighted code)
```

## Registry JSON Structure

### Before

```json
{
  "components": [...],
  "customizingBlocks": [...],
  "gettingStartedBlocks": [...]
}
```

### After

```json
{
  "components": [...],
  "customizingBlocks": [...],
  "gettingStartedBlocks": [...],
  "stylingBlocks": [                    // ← NEW
    {
      "id": "radius-1-example",
      "code": ".element {\\n  border-radius: var(--radius-1);\\n}",
      "language": "css",
      "highlightedCode": "<pre class=\"shiki shiki-themes min-light nord\" ...>...</pre>"
    },
    // ... 11 more blocks
  ]
}
```

## Color Breakdown

### Shiki min-light Theme (Light Mode)

- **Selectors**: `#6F42C1` (purple)
- **Properties**: `#1976D2` (blue)
- **Functions**: `#6F42C1` (purple)
- **Punctuation**: `#24292E` (dark gray)
- **Background**: `#ffffff` (white)

### Shiki nord Theme (Dark Mode)

- **Selectors**: `#8FBCBB` (cyan)
- **Properties**: `#D8DEE9` (light blue-gray)
- **Functions**: `#88C0D0` (blue)
- **Punctuation**: `#ECEFF4` (off-white)
- **Background**: `#2e3440` (dark gray)

## Example Output

### Radius 1 Token

**Plain Text (Before):**

```
CSS
.element {
  border-radius: var(--radius-1);
}
```

**Shiki HTML (After):**

```html
<pre
  class="shiki shiki-themes min-light nord"
  style="background-color:#ffffff;--shiki-dark-bg:#2e3440ff;..."
  data-language="CSS"
>
  <div class="shiki-language-label" aria-hidden="true">CSS</div>
  <code>
    <span class="line">
      <span style="color:#6F42C1">.</span>
      <span style="color:#6F42C1">element</span>
      <span style="color:#24292E"> {</span>
      <span style="color:#1976D2">  border-radius</span>
      <span style="color:#D32F2F">:</span>
      <span style="color:#6F42C1"> var</span>
      <span style="color:#1976D2">(</span>
      <span style="color:#1976D2">--radius-1</span>
      <span style="color:#1976D2">)</span>
      <span style="color:#24292E">;</span>
      <span style="color:#24292E">}</span>
    </span>
  </code>
</pre>
```

## User Experience Impact

### Before

- ❌ CSS examples looked like generic text blocks
- ❌ No visual distinction between code elements
- ❌ Inconsistent with Customizing/Getting Started pages
- ❌ Harder to parse code structure at a glance

### After

- ✅ CSS examples have professional syntax highlighting
- ✅ Clear visual distinction (selectors, properties, values)
- ✅ Consistent with all other documentation pages
- ✅ Easier to understand code structure instantly
- ✅ Matches user expectations for modern documentation

## Performance

### Bundle Size Impact

- Registry JSON increase: ~25KB (12 highlighted blocks)
- No runtime highlighting library needed (already using Shiki for other pages)
- Minimal incremental cost

### Runtime Performance

- Build-time highlighting (zero runtime cost)
- HTML pre-generated and cached in JSON
- No client-side parsing or tokenization

## Backward Compatibility

### CodeBlockComponent

```typescript
// Still works without highlightedCode
<app-code-block [code]="myCode" language="css" />
// Renders plain text fallback

// Now also works with Shiki highlighting
<app-code-block
  [code]="myCode"
  [highlightedCode]="myHighlightedCode"
  language="css"
/>
// Renders Shiki HTML if highlightedCode is provided
```

### Existing Usages

- All existing `app-code-block` usages continue to work
- No breaking changes
- Opt-in enhancement via `highlightedCode` input

## Summary

| Aspect                 | Before                     | After                               |
| ---------------------- | -------------------------- | ----------------------------------- |
| **Styling**            | Plain monochrome text      | Syntax-highlighted with colors      |
| **Theme Support**      | Single appearance          | Light/dark theme aware              |
| **Consistency**        | Different from other pages | Matches Customizing/Getting Started |
| **User Experience**    | Generic code blocks        | Professional, polished appearance   |
| **Maintainability**    | Manual updates needed      | Auto-generated from component data  |
| **Performance**        | N/A                        | Build-time (zero runtime cost)      |
| **Blocks Highlighted** | 0                          | 12 (6 radius + 6 shadow)            |
