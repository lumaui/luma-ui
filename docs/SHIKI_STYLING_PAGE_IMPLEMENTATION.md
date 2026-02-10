# Shiki Highlighting Implementation for Styling Page

## Summary

Successfully added Shiki syntax highlighting to all CSS code examples on the Styling page (`/docs/styling`). Previously, these examples displayed as plain text. Now they feature full syntax highlighting with language labels, matching the visual style of other documentation pages.

## What Changed

### 1. Code Block Component Enhancement

**File:** `apps/docs/src/app/components/code-block/code-block.component.ts`

Added optional `highlightedCode` input to support both:

- **Shiki highlighting** (when `highlightedCode` is provided)
- **Plain text fallback** (when `highlightedCode` is undefined)

```typescript
// New input
highlightedCode = input<string | undefined>(undefined);

// Computed safe HTML for rendering
readonly safeHighlightedCode = computed<SafeHtml | null>(() => {
  const html = this.highlightedCode();
  if (!html) return null;
  return this.sanitizer.bypassSecurityTrustHtml(html);
});
```

**Template:** Now uses `@if/else` to conditionally render Shiki HTML or fallback to plain text.

### 2. Registry Generator Updates

**File:** `tools/generate-docs-registry.ts`

#### New Functions:

- `extractStylingPageCodeBlocks()` - Extracts CSS examples from `radiusTokens` and `shadowTokens` arrays
- `highlightStylingBlocks()` - Applies Shiki highlighting to extracted CSS code

#### Extraction Pattern:

```typescript
// Generates IDs like: "radius-1-example", "shadow-3-example"
const id = name.toLowerCase().replace(/\s+/g, '-') + '-example';
```

#### Registry Schema:

Added `stylingBlocks: StylingCodeBlock[]` to `DocsRegistry` interface.

**Output:** 12 new code blocks in `docs-registry.json`:

- 6 radius examples (`radius-1-example` through `radius-6-example`)
- 6 shadow examples (`shadow-1-example` through `shadow-6-example`)

### 3. Docs Registry Service

**File:** `apps/docs/src/app/services/docs-registry.service.ts`

Added:

```typescript
// New interface
export interface StylingCodeBlock {
  id: string;
  code: string;
  language: string;
  highlightedCode?: string;
}

// New computed signal
readonly stylingBlocks = computed(() => this.registry().stylingBlocks ?? []);

// Helper methods
getStylingBlock(id: string): StylingCodeBlock | undefined
getHighlightedStylingCode(blockId: string): string | undefined
```

### 4. Token Preview Component

**File:** `apps/docs/src/app/components/token-preview/token-preview.component.ts`

#### Changes:

- Inject `DocsRegistryService`
- Add computed signal to fetch highlighted code from registry
- Pass `highlightedCode` to `app-code-block`

```typescript
readonly highlightedCssExample = computed<string | undefined>(() => {
  const token = this.token();
  if (!token?.cssExample) return undefined;

  // Match ID convention from registry generator
  const blockId = token.name.toLowerCase().replace(/\s+/g, '-') + '-example';
  return this.docsRegistry.getHighlightedStylingCode(blockId);
});
```

**Template:**

```html
<app-code-block
  [code]="token().cssExample"
  [highlightedCode]="highlightedCssExample()"  <!-- NEW -->
  language="css"
  [showLineNumbers]="false"
/>
```

## Build Process

### Development Workflow

```bash
# 1. Regenerate registry (extracts and highlights CSS examples)
npm run generate-docs

# 2. Build docs app
npx nx build docs --configuration=production

# 3. Serve and verify
npm run dev
```

### What Happens at Build Time

1. **Registry Generation** (`npm run generate-docs`):
   - Reads `styling-page.component.ts`
   - Extracts all `cssExample` strings from token arrays
   - Highlights each with Shiki (using `min-light` and `nord` themes)
   - Writes to `docs-registry.json` with 12 new blocks

2. **Component Compilation**:
   - TokenPreviewComponent computes block IDs at runtime
   - Looks up highlighted code from registry
   - Passes to CodeBlockComponent

3. **Rendering**:
   - CodeBlockComponent receives both plain and highlighted code
   - Renders Shiki HTML if available (with `[innerHTML]`)
   - Falls back to plain text if not

## Verification

### Registry Check

```bash
# Verify 12 blocks were generated
cat apps/docs/src/generated/docs-registry.json | jq '.stylingBlocks | length'
# Output: 12

# Inspect block structure
cat apps/docs/src/generated/docs-registry.json | jq '.stylingBlocks[0]'
# Shows: id, code, language, highlightedCode
```

### Visual Verification

1. Navigate to `http://localhost:4200/docs/styling`
2. Scroll to "Border Radius" section
3. Verify each CSS example shows:
   - ✅ Syntax highlighting (different colors for `.element`, `{`, `:`, `var()`)
   - ✅ Language label "CSS" in top-right corner
   - ✅ Shiki theme background (light: white, dark: Nord dark gray)

## ID Naming Convention

| Token Name | Generated Block ID | Example Code                                   |
| ---------- | ------------------ | ---------------------------------------------- |
| "Radius 1" | `radius-1-example` | `.element { border-radius: var(--radius-1); }` |
| "Radius 2" | `radius-2-example` | `.badge { border-radius: var(--radius-2); }`   |
| "Shadow 1" | `shadow-1-example` | `.input { box-shadow: var(--shadow-1); }`      |
| "Shadow 6" | `shadow-6-example` | `.modal { box-shadow: var(--shadow-6); }`      |

**Regex:** `token.name.toLowerCase().replace(/\s+/g, '-') + '-example'`

## Benefits

### Consistency

- Styling page now matches visual style of Customizing and Getting Started pages
- All code examples across docs site use same Shiki themes and transformers

### Maintainability

- Single source of truth: CSS examples in `styling-page.component.ts`
- Build-time highlighting (no runtime overhead)
- Easy to add new tokens - just add to array and regenerate registry

### Backward Compatibility

- CodeBlockComponent still works without `highlightedCode`
- Existing usages are unaffected
- Graceful fallback to plain text if registry is stale

## Future Improvements

### Possible Enhancements

1. **Consolidate Components**: `CodePreviewComponent` could be removed or simplified since `CodeBlockComponent` now has highlighting
2. **Add More Tokens**: Typography, spacing tokens could get same treatment
3. **Copy Button**: Add copy-to-clipboard for CSS examples
4. **Inline Previews**: Show live CSS result next to code (already done for radius/shadow)

### Extension Pattern

To add highlighting to other pages:

1. Add extraction function in `generate-docs-registry.ts`
2. Add new block array to `DocsRegistry` interface
3. Add computed signal in `DocsRegistryService`
4. Inject service and fetch highlighted code in page component

## Technical Details

### Shiki Configuration

- **Themes**: `min-light` (light mode), `nord` (dark mode)
- **Transformers**:
  - `transformerLanguageLabel()` - Adds "CSS" label
  - `transformerLineNumbers()` - Adds line number support
  - `transformerMetaHighlight()` - Highlights specific lines
  - `transformerNotationDiff()` - Diff notation support
  - `transformerNotationFocus()` - Focus notation support

### Security

- Uses Angular's `DomSanitizer.bypassSecurityTrustHtml()` to safely render Shiki HTML
- Only applies to trusted build-time generated content
- No user input is rendered unsanitized

### Performance

- Highlighting happens at build time (not runtime)
- Minimal bundle size impact (HTML is stored as strings in JSON)
- No lazy loading needed (styling blocks are small)

## Files Modified

| File                                                                    | Changes                                               |
| ----------------------------------------------------------------------- | ----------------------------------------------------- |
| `tools/generate-docs-registry.ts`                                       | Added extraction and highlighting for styling blocks  |
| `apps/docs/src/app/services/docs-registry.service.ts`                   | Added `StylingCodeBlock` interface and helper methods |
| `apps/docs/src/app/components/code-block/code-block.component.ts`       | Added `highlightedCode` input and Shiki rendering     |
| `apps/docs/src/app/components/code-block/code-block.component.html`     | Added conditional rendering for Shiki HTML            |
| `apps/docs/src/app/components/token-preview/token-preview.component.ts` | Fetch and pass highlighted code from registry         |

## Build Output

```
Processing styling page code blocks...
Found 12 code blocks

Highlighting styling page blocks...
  ✓ radius-1-example (css)
  ✓ radius-2-example (css)
  ✓ radius-3-example (css)
  ✓ radius-4-example (css)
  ✓ radius-5-example (css)
  ✓ radius-6-example (css)
  ✓ shadow-1-example (css)
  ✓ shadow-2-example (css)
  ✓ shadow-3-example (css)
  ✓ shadow-4-example (css)
  ✓ shadow-5-example (css)
  ✓ shadow-6-example (css)
Highlighted 12 styling blocks

Registry written to: .../docs-registry.json
  Components: 8
  Theme Pages: 0
  Customizing Blocks: 16
  Getting Started Blocks: 5
  Styling Blocks: 12
  Categories: Feedback, Form, Layout
```

## Testing

### Unit Tests (Future Work)

Potential test cases for `CodeBlockComponent`:

- Should render Shiki HTML when `highlightedCode` is provided
- Should render plain text when `highlightedCode` is undefined
- Should sanitize HTML properly via DomSanitizer
- Should maintain backward compatibility with existing usage

### Manual Testing

✅ Registry generation completes successfully
✅ 12 styling blocks created with proper IDs
✅ Docs app builds without errors
✅ TypeScript compilation succeeds
✅ CSS examples display with syntax highlighting
✅ Light/dark theme switching works correctly

## Conclusion

The implementation successfully adds Shiki syntax highlighting to all CSS examples on the Styling page while maintaining backward compatibility. The solution follows the established pattern used by Customizing and Getting Started pages, ensuring consistency across the documentation site.
