# @lumaui/tokens

Design tokens do Luma UI - Neo-Minimal para Tailwind CSS v4.

## Instalação

```bash
npm install @lumaui/tokens @lumaui/angular tailwindcss@next @tailwindcss/postcss@next
```

## Uso

### Setup Básico

**1. Configure PostCSS:**

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

**2. Importe tokens no CSS:**

```css
@import '@lumaui/tokens/luma.css';
@import '@lumaui/tokens/luma-dark.css';
```

**3. Use as classes:**

```html
<button class="lm-bg-primary text-white lm-rounded-md px-6 py-3">
  Continuar
</button>

<div class="lm-bg-surface-base lm-text-primary">
  <h1 class="lm-text-lg">Título</h1>
  <p class="lm-text-secondary">Descrição</p>
</div>
```

**Não precisa de tailwind.config.ts!** 🎉

### Customização

Para sobrescrever tokens, defina após o import:

```css
@import '@lumaui/tokens/luma.css';

@theme {
  /* Override primary color */
  --color-primary: oklch(0.6 0.15 350); /* Rosa */
}
```

### Tema Customizado

```css
@import '@lumaui/tokens/luma.css';

.theme-ocean {
  --color-primary: oklch(0.55 0.12 200); /* Azul oceano */
  --color-surface-base: oklch(0.96 0.01 200);
}
```

```html
<div class="theme-ocean">
  <button class="lm-bg-primary">Ocean Theme</button>
</div>
```

### Dark Theme

O dark theme é ativado quando a classe `.dark` é aplicada:

```html
<html class="dark">
  <!-- Todo o conteúdo usará o dark theme -->
</html>
```

Ou em um contexto específico:

```html
<div class="dark">
  <!-- Apenas este contexto usará dark theme -->
  <button class="lm-bg-primary">Dark Button</button>
</div>
```

## Tokens Disponíveis

### Cores

| Token                        | Descrição                 | Classes Geradas                                   |
| ---------------------------- | ------------------------- | ------------------------------------------------- |
| `--color-primary`            | Cor primária              | `lm-bg-primary`, `text-primary`, `border-primary` |
| `--color-primary-hover`      | Hover da cor primária     | `lm-bg-primary-hover`                             |
| `--color-primary-active`     | Active da cor primária    | `lm-bg-primary-active`                            |
| `--color-surface-base`       | Cor de fundo base         | `lm-bg-surface-base`                              |
| `--color-text-primary`       | Cor de texto primária     | `lm-text-primary`                                 |
| `--color-text-secondary`     | Cor de texto secundária   | `lm-text-secondary`                               |
| `--color-card-background`    | Background do card        | `lm-bg-card-background`                           |
| `--color-card-gradient-from` | Gradiente inicial do card | `lm-from-card-gradient-from`                      |
| `--color-card-gradient-to`   | Gradiente final do card   | `lm-to-card-gradient-to`                          |

### Tipografia

| Token                | Valor Padrão        | Classe         |
| -------------------- | ------------------- | -------------- |
| `--lm-text-sm`       | 0.75rem (12px)      | `lm-text-sm`   |
| `--lm-text-base`     | 1rem (16px)         | `lm-text-base` |
| `--lm-text-lg`       | 1.875rem (30px)     | `lm-text-lg`   |
| `--font-family-base` | Inter, system fonts | -              |

### Border Radius

| Token                | Valor Padrão | Classe              |
| -------------------- | ------------ | ------------------- |
| `--radius-luma-sm`   | 6px          | `lm-rounded-sm`     |
| `--radius-luma-md`   | 10px         | `lm-rounded-md`     |
| `--radius-luma-lg`   | 18px         | `lm-rounded-lg`     |
| `--radius-luma-full` | 9999px       | `rounded-luma-full` |

### Transições

| Token                | Valor Padrão | Classe             |
| -------------------- | ------------ | ------------------ |
| `--lm-duration-fast` | 150ms        | `lm-duration-fast` |
| `--lm-duration-base` | 200ms        | `lm-duration-base` |

### Espaçamento

| Token                    | Valor Padrão  |
| ------------------------ | ------------- |
| `--spacing-xs`           | 0.25rem (4px) |
| `--spacing-sm`           | 0.5rem (8px)  |
| `--spacing-md`           | 1rem (16px)   |
| `--spacing-lg`           | 1.5rem (24px) |
| `--spacing-xl`           | 2.5rem (40px) |
| `--spacing-card-padding` | 1.5rem (24px) |

## Formato dos Tokens (OKLCH)

Tailwind CSS v4 usa o espaço de cor OKLCH por padrão, que oferece:

- **Melhor interpolação de cores**: Transições mais suaves
- **Espaço perceptualmente uniforme**: Cores parecem ter luminosidade consistente
- **Wide-gamut support**: Suporte a cores mais vibrantes

**Formato:**

```css
--color-primary: oklch(L C H);
```

- **L** (Lightness): 0 a 1 (0 = preto, 1 = branco)
- **C** (Chroma): 0 a 0.4 (saturação)
- **H** (Hue): 0 a 360 (matiz)

**Exemplos:**

- Azul: `oklch(0.54 0.1 230)`
- Vermelho: `oklch(0.55 0.22 25)`
- Verde: `oklch(0.60 0.15 145)`

## Conversão RGB para OKLCH

Para converter suas cores RGB para OKLCH, use ferramentas online como:

- [OKLCH Color Picker](https://oklch.com/)
- [Coloraide](https://facelessuser.github.io/coloraide/)

**Aproximações:**

- RGB `50 127 179` (azul) → `oklch(0.54 0.1 230)`
- RGB `15 17 20` (preto) → `oklch(0.15 0.005 0)`
- RGB `251 251 252` (branco) → `oklch(0.99 0.001 0)`

## Benefícios do Tailwind v4

### 1. Zero Config

- Não precisa de `tailwind.config.ts`
- Tudo definido em CSS com `@theme`

### 2. Geração Automática

`--color-primary` gera automaticamente:

- `lm-bg-primary`
- `text-primary`
- `border-primary`
- `fill-primary`
- E variantes com opacidade!

### 3. Melhor Performance

- Autoprefixer incluído
- Build mais rápido
- Melhor tree-shaking

### 4. Cores Modernas

- OKLCH para cores mais vibrantes
- Melhor interpolação
- Suporte a wide-gamut

## Estrutura do Pacote

```
@lumaui/tokens/
├── src/
│   ├── luma.css           # Tokens principais (light theme)
│   ├── luma-dark.css      # Dark theme overrides
│   ├── themes/            # Legacy (deprecated)
│   │   ├── light.tokens.css
│   │   └── dark.tokens.css
│   └── index.ts           # Exports TypeScript
├── package.json
└── README.md
```

## Migração de v3 para v4

Se você está migrando de Tailwind v3:

1. **Instale Tailwind v4:**

```bash
npm uninstall tailwindcss autoprefixer
npm install tailwindcss@next @tailwindcss/postcss@next
```

2. **Atualize PostCSS:**

```javascript
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

3. **Atualize CSS:**

```css
/* Antes */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Depois */
@import '@lumaui/tokens/luma.css';
@import '@lumaui/tokens/luma-dark.css';
```

4. **Delete tailwind.config.ts** - Não é mais necessário!

5. **Classes continuam as mesmas!** 🎉

## Compatibilidade

- ✅ Tailwind CSS v4.x
- ✅ Angular 21+
- ✅ React 18+
- ✅ Vue 3+
- ✅ Nx 22+
- ✅ Todos os navegadores modernos com suporte a OKLCH

## Suporte

Para issues e contribuições: [GitHub Repository](https://github.com/seu-repo/luma)

## Licença

MIT
