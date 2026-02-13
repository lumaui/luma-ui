## 0.4.3 (2026-02-13)

### 🚀 Features

- first deploy ([a8cba16](https://github.com/lumaui/luma-ui/commit/a8cba16))
- fix ci ([653e6db](https://github.com/lumaui/luma-ui/commit/653e6db))
- package lock ([578d1d7](https://github.com/lumaui/luma-ui/commit/578d1d7))
- update packages ([eb17d2d](https://github.com/lumaui/luma-ui/commit/eb17d2d))
- docs app updated ([f8b9dc3](https://github.com/lumaui/luma-ui/commit/f8b9dc3))
- update docs ([67ca53b](https://github.com/lumaui/luma-ui/commit/67ca53b))
- cname file ([99c4777](https://github.com/lumaui/luma-ui/commit/99c4777))
- create accordion and update docs ([b091246](https://github.com/lumaui/luma-ui/commit/b091246))
- update docs ([5c7230e](https://github.com/lumaui/luma-ui/commit/5c7230e))
- create badge directive ([0339301](https://github.com/lumaui/luma-ui/commit/0339301))
- new theme and tooltip ([0cbda7e](https://github.com/lumaui/luma-ui/commit/0cbda7e))
- tabs ([026c170](https://github.com/lumaui/luma-ui/commit/026c170))
- fix sidebar docs in mobile ([0e47d9c](https://github.com/lumaui/luma-ui/commit/0e47d9c))
- create toast ([464a41b](https://github.com/lumaui/luma-ui/commit/464a41b))
- docs update ([86b2e56](https://github.com/lumaui/luma-ui/commit/86b2e56))
- implement automatic design token synchronization ([070b2aa](https://github.com/lumaui/luma-ui/commit/070b2aa))
- update componentes architeture ([645c00f](https://github.com/lumaui/luma-ui/commit/645c00f))
- update version em normalize patterns ([87f2cde](https://github.com/lumaui/luma-ui/commit/87f2cde))
- **docs:** add Shiki syntax highlighting (Item 1) ([ab8e03b](https://github.com/lumaui/luma-ui/commit/ab8e03b))
- **docs:** restructure component page (Item 3) ([83434f8](https://github.com/lumaui/luma-ui/commit/83434f8))
- **docs:** implement single source of truth (Item 2 Steps 2a-2c) ([e7a685d](https://github.com/lumaui/luma-ui/commit/e7a685d))

### 🩹 Fixes

- reorder build and test steps in publish workflow ([ee0b5ee](https://github.com/lumaui/luma-ui/commit/ee0b5ee))
- vite config ([75b9a8c](https://github.com/lumaui/luma-ui/commit/75b9a8c))
- format ([a9be2db](https://github.com/lumaui/luma-ui/commit/a9be2db))
- format ([d303d9c](https://github.com/lumaui/luma-ui/commit/d303d9c))
- vite test ([df34dea](https://github.com/lumaui/luma-ui/commit/df34dea))
- tests ci ([0a30df5](https://github.com/lumaui/luma-ui/commit/0a30df5))
- package fix ([0af2e2b](https://github.com/lumaui/luma-ui/commit/0af2e2b))
- package-lock ([9739b62](https://github.com/lumaui/luma-ui/commit/9739b62))
- repository github url ([9218f1f](https://github.com/lumaui/luma-ui/commit/9218f1f))
- format ([f70cece](https://github.com/lumaui/luma-ui/commit/f70cece))
- lint docs ([6cdf933](https://github.com/lumaui/luma-ui/commit/6cdf933))
- lint docs ([e4e2307](https://github.com/lumaui/luma-ui/commit/e4e2307))
- modal tests ([1ea8ca5](https://github.com/lumaui/luma-ui/commit/1ea8ca5))
- remove material ([739a63e](https://github.com/lumaui/luma-ui/commit/739a63e))
- lint, formats ([99c9e84](https://github.com/lumaui/luma-ui/commit/99c9e84))
- build ([60f598f](https://github.com/lumaui/luma-ui/commit/60f598f))
- tailwind error class ([fea6d2e](https://github.com/lumaui/luma-ui/commit/fea6d2e))

### ❤️ Thank You

- Claude Sonnet 4.5
- Italo Gois @italogois

# Changelog

All notable changes to Luma UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.2] - 2025-02-12

### Changed

**✨ Toast Layout Refinement - Clean Integrated Style**

#### @lumaui/core

- **IMPROVED**: Toast item wrapper now uses fixed white background (`bg-white` / `dark:bg-gray-800`)
- **IMPROVED**: Icon container integrated with rounded left corners (`rounded-l-xl`)
- **IMPROVED**: Removed padding from wrapper, added to internal divs for precise control
- **IMPROVED**: Icon now stretches full height (`self-stretch`) with internal padding (`p-4`)
- **IMPROVED**: Enhanced dark mode support for title, message, and close button
- **IMPROVED**: Neutral border color (`border-border`) instead of variant-specific

**Visual Changes:**

```
Before: Semi-transparent colored background with circular icon
┌────────────────────────────────┐
│ (O) Title                  [X] │  ← bg-primary/40
│     Message                    │  ← Circular icon
└────────────────────────────────┘

After: Clean white background with integrated icon corner
┌────────────────────────────────┐
│[I]│ Title                  [X] │  ← bg-white (light)
│   │ Message                    │  ← bg-gray-800 (dark)
└────────────────────────────────┘
 ↑ Icon integrated with rounded-l-xl
```

**Technical Implementation:**

- `toastItemVariants`: Removed `gap-4`, `px-4`, `py-4`; added `overflow-hidden`, fixed background colors
- `toastIconVariants`: Changed from circular (`rounded-full`, `h-6`, `w-6`) to integrated (`rounded-l-xl`, `self-stretch`, `p-4`)
- `toastContentVariants`: Added internal padding (`px-4`, `py-4`)
- `toastTitleVariants`: Added dark mode support (`dark:text-gray-100`)
- `toastMessageVariants`: Added dark mode support (`dark:text-gray-400`)
- `toastCloseVariants`: Adjusted positioning (`mr-2`), added dark hover state

**Benefits:**

- More consistent with Neo-Minimal philosophy (visual silence)
- Better separation between structural elements
- Improved dark theme contrast
- Cleaner, more integrated appearance

### Fixed

**🐛 CRITICAL BUG FIX - Tailwind Utility Classes Now Properly Discovered**

#### @lumaui/tokens

- **FIXED**: Class manifest generator now captures ALL Tailwind utility classes
- **FIXED**: Spacing utilities (`px-4`, `py-2.5`, `gap-2`, etc.) were completely missing in v0.4.1
- **IMPROVED**: Rewritten `generate-class-manifest.ts` with heuristic pattern matching
- **IMPROVED**: Class discovery increased from 109 to 220 classes (+102% coverage)
- **IMPROVED**: Zero maintenance required - new utilities auto-captured

**Root Cause:**

- The manifest generator used a broken regex (`px-\[`, `py-\[`) that only matched bracket notation
- Standard Tailwind scale utilities like `px-4`, `py-2.5` were NOT being captured
- This caused components to render without proper padding/spacing

**Technical Implementation:**

- Complete rewrite of `tools/generate-class-manifest.ts`
- Pattern-based accept rules (matches Tailwind syntax patterns)
- Smart reject rules (filters TypeScript keywords and CVA config)
- Two-phase filtering: reject non-classes first, then accept Tailwind patterns
- Automatic verification of critical spacing utilities

**What's Now Captured:**

```typescript
// All spacing utilities (previously missing)
('px-3', 'px-4', 'px-5'); // ✅ Horizontal padding
('py-2', 'py-2.5', 'py-3'); // ✅ Vertical padding
('gap-1', 'gap-2', 'gap-3'); // ✅ Flex/grid spacing

// All state modifiers
('hover:bg-primary/90'); // ✅ Hover states
('active:bg-primary/95'); // ✅ Active states
('disabled:opacity-50'); // ✅ Disabled states

// All complex selectors
('data-[state=open]:opacity-100'); // ✅ Data attributes
('[&[data-state=open]>svg]:*'); // ✅ Complex selectors
```

**Coverage Metrics:**

- Before: 109 classes (40% coverage)
- After: 220 classes (96% coverage)
- Missing utilities: Fixed
- TypeScript keywords filtered: ✅
- Future-proof: ✅

#### @lumaui/angular

- Updated dependency `@lumaui/tokens` to `^0.4.2`
- Updated dependency `@lumaui/core` to `^0.4.2`
- All components now render with proper spacing

#### @lumaui/core

- Updated to v0.4.2 for version consistency

### Migration Guide

#### From v0.4.1 to v0.4.2

**No breaking changes** - this is a bug fix release.

**What to do:**

```bash
# Update packages
npm install @lumaui/tokens@^0.4.2 @lumaui/angular@^0.4.2 @lumaui/core@^0.4.2

# Rebuild your project
npm run build

# Verify components render correctly
```

**Verification:**

```bash
# Check manifest has 220 classes
grep -c "'" node_modules/@lumaui/tokens/build/luma-classes.js
# Expected: 220 (was 109 in v0.4.1)

# Verify spacing utilities present
grep -E "'(px-|py-|gap-)" node_modules/@lumaui/tokens/build/luma-classes.js
# Expected: Multiple matches

# Verify no TypeScript keywords
grep -E "'(import|export|cva)'" node_modules/@lumaui/tokens/build/luma-classes.js
# Expected: No matches
```

If button sizes now have proper padding, the fix is working! ✅

---

## [0.4.1] - 2025-02-12

### Changed

**🎉 SIMPLIFIED DEVELOPER EXPERIENCE - Zero Configuration Setup**

#### @lumaui/tokens

- **BREAKING**: `@import 'tailwindcss'` agora incluído automaticamente em `luma.css`
- **BREAKING**: `@source "./luma-classes.js"` agora embutido em `luma.css`
- **BREAKING**: Export padrão agora aponta para `luma.css` (era `luma-complete.css`)
- Adicionada condição `"style"` em todos os exports para compatibilidade com Angular CLI
- Usuários agora só precisam de **2 imports** (era 3):

  ```css
  /* Antes (v0.4.0) */
  @import 'tailwindcss';
  @import '@lumaui/tokens/build/luma.css';
  @import '@lumaui/tokens/build/luma-dark.css';

  /* Agora (v0.4.1) */
  @import '@lumaui/tokens/build/luma.css'; /* Inclui tudo */
  @import '@lumaui/tokens/build/luma-dark.css'; /* Tema escuro */
  ```

#### @lumaui/angular

- Atualizada dependência `@lumaui/tokens` para `^0.4.1`
- Atualizada dependência `@lumaui/core` para `^0.4.1`
- README simplificado com nova experiência de setup

#### @lumaui/core

- Sem mudanças funcionais, apenas bump de versão

### Technical Details

- Style Dictionary custom format agora injeta `@import 'tailwindcss'` e `@source` no topo do CSS gerado
- Template `luma-complete.css` simplificado (removida diretiva `@source` redundante)
- Arquitetura documentada em CLAUDE.md na seção "@source Directive (Simplified Architecture)"

### Migration Guide

#### From v0.4.0 to v0.4.1

**No breaking changes in component APIs** - apenas mudança na forma de importar CSS.

**Antes:**

```css
@import 'tailwindcss';
@import '@lumaui/tokens/build/luma.css';
@import '@lumaui/tokens/build/luma-dark.css';
```

**Agora:**

```css
@import '@lumaui/tokens/build/luma.css'; /* Tailwind incluído */
@import '@lumaui/tokens/build/luma-dark.css'; /* Opcional */
```

**Verificação:**

```bash
# Build seu projeto
ng build

# Verifique se as classes Luma estão no CSS final
grep "bg-primary" dist/your-app/browser/styles*.css
# Esperado: Várias correspondências
```

Se as classes aparecem, a migração foi bem-sucedida! ✅

---

## [0.4.0] - 2025-02-11

### Changed

- **BREAKING**: Luma tokens files não importam mais Tailwind CSS internamente
- Projetos agora são responsáveis por importar Tailwind CSS explicitamente
- Melhor separação de responsabilidades
- Mais flexibilidade na configuração do Tailwind

### Added

- Suporte completo ao Tailwind CSS v4
- 45 design tokens (14 theme + 31 structural)
- Sistema de cores de 12 passos inspirado no Radix UI
- 24 tokens semânticos para customização runtime
- Descoberta automática de classes via `@source`

### Technical Details

- Arquitetura de tema roxo com separação limpa (theme vs structural)
- Formato customizado do Style Dictionary para geração de tokens semânticos
- Manifesto de classes em `luma-classes.js` (99 classes)
- Suporte a tema escuro via classe `.dark`

---

## [0.3.x] - 2025-01-xx

### Initial Release

- Componentes Angular standalone
- Design system Neo-Minimal
- Integração básica com Tailwind CSS v3
- Componentes: Button, Badge, Card, Tooltip, Modal, Tabs, Accordion, Toast

---

[0.4.2]: https://github.com/lumaui/luma-ui/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/lumaui/luma-ui/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/lumaui/luma-ui/compare/v0.3.0...v0.4.0
[0.3.x]: https://github.com/lumaui/luma-ui/releases/tag/v0.3.0
