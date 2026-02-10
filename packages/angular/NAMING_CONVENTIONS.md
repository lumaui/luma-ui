# Convenções de Nomenclatura - Luma Design System

## 📋 Regras de Nomenclatura

Todos os componentes do Luma Design System devem seguir estas convenções para manter consistência e identificação clara da origem dos componentes.

### 1. Seletores de Componentes

**Prefixo obrigatório:** `luma`

**Formato:** `kebab-case`

**Exemplos válidos:**

```typescript
@Component({
  selector: 'luma-button',      // ✅ Correto
  selector: 'luma-card',         // ✅ Correto
  selector: 'luma-input-field',  // ✅ Correto
  selector: 'luma-data-table',   // ✅ Correto
})
```

**Exemplos inválidos:**

```typescript
@Component({
  selector: 'button',           // ❌ Sem prefixo
  selector: 'lib-button',       // ❌ Prefixo errado
  selector: 'my-button',        // ❌ Prefixo errado
  selector: 'lumaButton',       // ❌ Formato errado (deve ser kebab-case)
})
```

### 2. Seletores de Diretivas

**Prefixo obrigatório:** `luma`

**Formato:** `camelCase`

**Exemplos válidos:**

```typescript
@Directive({
  selector: '[lumaTooltip]',      // ✅ Correto
  selector: '[lumaHighlight]',    // ✅ Correto
  selector: '[lumaAutoFocus]',    // ✅ Correto
})
```

**Exemplos inválidos:**

```typescript
@Directive({
  selector: '[tooltip]',          // ❌ Sem prefixo
  selector: '[libTooltip]',       // ❌ Prefixo errado
  selector: '[luma-tooltip]',     // ❌ Formato errado (deve ser camelCase)
})
```

### 3. Nomes de Classes

**Prefixo obrigatório:** `Lm`

**Sufixo obrigatório:** `Component` ou `Directive`

**Formato:** `PascalCase`

**Exemplos válidos:**

```typescript
export class LmButtonDirective {} // ✅ Correto
export class LmCardComponent {} // ✅ Correto
export class LmTooltipDirective {} // ✅ Correto
export class LmTabsComponent {} // ✅ Correto
```

**Exemplos inválidos:**

```typescript
export class Button {} // ❌ Sem prefixo e sem sufixo
export class ButtonComponent {} // ❌ Sem prefixo Lm
export class LmButtonComp {} // ❌ Sufixo errado
export class lm_button_directive {} // ❌ Formato errado
```

### 4. Estrutura de Arquivos

**Padrão:**

```
packages/angular/src/lib/
├── button/
│   ├── button.directive.ts       # Classe: LmButtonDirective
│   ├── button.directive.spec.ts  # Testes
│   ├── button.docs.md            # Documentação
│   └── index.ts                  # Exports
└── card/
    ├── card.component.ts         # Classe: LmCardComponent
    ├── card.component.html       # Template
    ├── card.component.spec.ts    # Testes
    ├── card.docs.md              # Documentação
    └── index.ts                  # Exports
```

### 5. Exports Públicos

**Arquivo:** `packages/angular/src/index.ts`

```typescript
// ✅ Exportar componentes e diretivas públicos
export * from './lib/button';
export * from './lib/card';
```

## 🔍 Validação Automática

O ESLint está configurado para validar automaticamente estas regras:

```javascript
// packages/angular/eslint.config.mjs
{
  '@angular-eslint/directive-selector': [
    'error',
    {
      type: 'attribute',
      prefix: 'luma',           // ✅ Obrigatório
      style: 'camelCase',
    },
  ],
  '@angular-eslint/component-selector': [
    'error',
    {
      type: 'element',
      prefix: 'luma',           // ✅ Obrigatório
      style: 'kebab-case',
    },
  ],
  '@angular-eslint/component-class-suffix': [
    'error',
    {
      suffixes: ['Component'],  // ✅ Obrigatório
    },
  ],
}
```

## 💡 Benefícios

1. **Identificação Clara**: Ao usar `<luma-button>`, fica explícito que é do Luma Design System
2. **Evita Conflitos**: O prefixo previne colisões com outros componentes
3. **Manutenibilidade**: Padrão consistente facilita manutenção
4. **Documentação Visual**: O código se auto-documenta
5. **Rastreabilidade**: Fácil identificar origem dos componentes no projeto

## 🚀 Uso em Projetos

Quando importado em outros projetos:

```typescript
import { LmButtonDirective, LmCardComponent } from '@lumaui/angular';

@Component({
  imports: [LmButtonDirective, LmCardComponent],
  template: `
    <!-- Claramente identificável como componente Luma -->
    <button lumaButton lmVariant="primary">Click me</button>
    <luma-card>
      <h3>Card content</h3>
    </luma-card>
  `
})
```

## ✅ Checklist para Novos Componentes

Antes de criar um novo componente, verifique:

- [ ] Selector usa prefixo `luma-`
- [ ] Selector está em `kebab-case`
- [ ] Classe tem sufixo `Component` ou `Directive`
- [ ] Classe está em `PascalCase`
- [ ] Arquivos seguem o padrão `nome.component.ts`
- [ ] Componente está exportado em `src/index.ts`
- [ ] ESLint não reporta erros (`npm run lint:components`)

## 📚 Referências

- [Angular Style Guide](https://angular.dev/style-guide)
- [Nx Best Practices](https://nx.dev/recipes/tips-n-tricks/eslint)
- [Luma Core Principles](.cursor/skills/luma-core-principles/SKILL.md)
