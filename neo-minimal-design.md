# Neo-Minimal Design Guide

Este guia define os princípios estruturais, visuais e comportamentais para criar interfaces com simplicidade calma e intencional.

---

## Filosofia Central

O Neo-Minimalismo evolui o minimalismo clássico, adicionando **humanidade, fluidez e contexto**.

**Rejeita:**

- Rigidez excessiva
- Geometria mecânica
- Interfaces que parecem frameworks genéricos

**Busca:**

- Calma visual
- Continuidade
- Sensação orgânica e natural

> **Regra fundamental:** Se um elemento pode ser removido sem perda funcional ou semântica, ele não deveria existir.

---

## Princípios Fundamentais

### 1. Silêncio Visual

Silêncio visual é um **estado intencional**, não ausência de design.

**Princípios:**

- Elementos não competem entre si
- Hierarquia é percebida sem esforço
- Layout comunica antes do estilo

**Regras:**

- Nunca adicione um efeito apenas para "destacar"
- Se algo precisa chamar atenção para ser compreendido, está mal resolvido
- Priorize relações espaciais sobre cores ou efeitos

---

### 2. Espaço em Branco Funcional

O espaço em branco é **estrutura invisível**.

**Deve:**

- Criar hierarquia
- Substituir bordas, divisores e sombras
- Controlar ritmo e fluxo de leitura

> Espaço não é vazio — é linguagem.

**Diretrizes:**

- Prefira espaçamento progressivo a linhas
- Aumente espaço entre grupos, não dentro deles
- Nunca compacte para "caber mais"

---

### 3. Forma e Geometria

**Bordas Orgânicas e Suaves:**

O sistema evita cantos duros e geometrias excessivamente técnicas.

- Curvas devem sugerir **continuidade**, não rigidez
- Bordas levemente generosas são preferíveis à precisão matemática
- Formas devem parecer desenhadas, não calculadas

> A interface deve fluir — não encaixar mecanicamente.

⚠️ Não existe raio fixo obrigatório. O raio correto é aquele que **não chama atenção para si mesmo**.

---

## Diretrizes Visuais

### 4. Luz como Estrutura

Luz é usada como **textura e hierarquia**, nunca como ornamento.

**Princípios:**

- Gradientes sutis substituem bordas
- Diferenças de luminosidade criam profundidade
- Transparência cria camadas

**Regras:**

- Nunca use sombra como solução primária
- Evite sombras duras ou deslocadas
- Prefira variações dentro da mesma família de cores

> Se a profundidade é percebida antes da forma, está errado.

---

### 5. Cor

**Filosofia:**

Cor no Neo-Minimalismo é **editorial**, não promocional.

- Levemente dessaturada
- Próxima do cinza
- Confortável aos olhos por longos períodos

**Uso correto:**

- Cor define **ação**, não estrutura
- Cor nunca define profundidade
- Cor nunca substitui hierarquia espacial

**Tons neutros:**

- Branco puro deve ser evitado como base
- Prefira brancos quentes e cinzas suaves
- Contraste é sempre progressivo

---

### 6. Tipografia

Tipografia é o **componente visual primário** do sistema.

**Princípios:**

- Clareza acima de personalidade
- Ritmo antes de impacto
- Leitura contínua, não em blocos

**Diretrizes:**

- Hierarquia criada por tamanho, não peso
- Evite negrito excessivo
- Line-height sempre generoso

> Se a tipografia falha, nenhum layout pode salvar.

---

## Padrões de Interação

### 7. Interações Calmas

Interações devem **responder**, não distrair.

**Princípios:**

- Feedback gentil
- Transições curtas e naturais
- Sem surpresas

**Regras:**

- Nunca use escala como feedback
- Evite animações elásticas ou chamativas
- Estados devem parecer consequências naturais da ação

> A melhor interação é aquela que você mal percebe.

---

### 8. Acessibilidade Silenciosa

Acessibilidade deve ser **inerente**, não um modo extra.

- Contraste confortável
- Estados de foco discretos e claros
- Área de toque confortável

Nada deve parecer um "recurso de acessibilidade" — deve apenas parecer correto.

---

## Guia Prático

### ✓ O que Fazer

- [ ] Sempre comece pelo layout
- [ ] Use espaço como ferramenta primária
- [ ] Questione cada efeito visual
- [ ] Projete para sessões longas de uso
- [ ] Teste em ambientes de baixa luz
- [ ] Valide hierarquia sem cor (escala de cinza)
- [ ] Prefira transições de 150-200ms com ease-out

### ✗ O que Não Fazer

- [ ] Copiar padrões de design systems populares
- [ ] Resolver hierarquia com sombra ou cor
- [ ] Criar componentes auto-explicativos demais
- [ ] Tratar UI como vitrine
- [ ] Usar animações bounce ou spring
- [ ] Depender de bordas para separar elementos
- [ ] Usar mais de 3 níveis de contraste

---

## Aplicação em Código

### Escala de Espaçamento

```css
:root {
  /* Base unit: 4px */
  --space-1: 0.25rem; /* 4px - micro ajustes */
  --space-2: 0.5rem; /* 8px - espaço interno tight */
  --space-3: 0.75rem; /* 12px - espaço interno padrão */
  --space-4: 1rem; /* 16px - espaço entre elementos */
  --space-6: 1.5rem; /* 24px - espaço entre grupos */
  --space-8: 2rem; /* 32px - seções */
  --space-12: 3rem; /* 48px - áreas principais */
  --space-16: 4rem; /* 64px - separação máxima */
}
```

### Paleta de Cores Neutras

```css
:root {
  /* Fundos - nunca branco puro */
  --surface-1: oklch(0.985 0.002 90); /* fundo principal */
  --surface-2: oklch(0.97 0.003 90); /* cards, elevação 1 */
  --surface-3: oklch(0.95 0.004 90); /* elevação 2 */

  /* Textos - nunca preto puro */
  --text-primary: oklch(0.2 0.005 90); /* texto principal */
  --text-secondary: oklch(0.45 0.005 90); /* texto secundário */
  --text-muted: oklch(0.65 0.003 90); /* texto desabilitado */

  /* Bordas - sutis */
  --border-subtle: oklch(0.9 0.005 90);
  --border-default: oklch(0.85 0.008 90);
}
```

### Transições

```css
:root {
  /* Durações - curtas e responsivas */
  --duration-fast: 100ms; /* micro-interações */
  --duration-base: 150ms; /* padrão */
  --duration-slow: 250ms; /* transições maiores */

  /* Timing functions - sempre desaceleração natural */
  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-out-soft: cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* Exemplo de uso */
.button {
  transition:
    background-color var(--duration-base) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}
```

### Tipografia

```css
:root {
  /* Escala tipográfica - hierarquia por tamanho */
  --text-xs: 0.75rem; /* 12px - labels, captions */
  --text-sm: 0.875rem; /* 14px - texto secundário */
  --text-base: 1rem; /* 16px - corpo */
  --text-lg: 1.125rem; /* 18px - destaque sutil */
  --text-xl: 1.25rem; /* 20px - subtítulos */
  --text-2xl: 1.5rem; /* 24px - títulos de seção */
  --text-3xl: 2rem; /* 32px - títulos principais */

  /* Line heights - sempre generosos */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Font weights - uso moderado */
  --font-normal: 400;
  --font-medium: 500; /* prefira este ao bold */
  --font-semibold: 600; /* use com moderação */
}
```

### Raios de Borda

```css
:root {
  /* Raios - orgânicos, não matemáticos */
  --radius-sm: 0.375rem; /* 6px - elementos pequenos */
  --radius-md: 0.5rem; /* 8px - botões, inputs */
  --radius-lg: 0.75rem; /* 12px - cards */
  --radius-xl: 1rem; /* 16px - modais, containers */
  --radius-full: 9999px; /* pills, avatares */
}
```

### Sombras (Uso Mínimo)

```css
:root {
  /* Sombras - sutis, apenas quando necessário */
  --shadow-sm: 0 1px 2px oklch(0.2 0.01 90 / 0.04);
  --shadow-md: 0 2px 8px oklch(0.2 0.01 90 / 0.06);
  --shadow-lg: 0 8px 24px oklch(0.2 0.01 90 / 0.08);

  /* Prefira estas alternativas a sombras: */
  /* 1. Diferença de cor de fundo */
  /* 2. Bordas sutis */
  /* 3. Espaçamento */
}
```

---

## Estados Interativos

```css
/* Botão seguindo Neo-Minimal */
.button {
  background: var(--surface-2);
  color: var(--text-primary);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-subtle);
  transition: all var(--duration-base) var(--ease-out);
}

/* Hover - mudança sutil, não dramática */
.button:hover {
  background: var(--surface-3);
  border-color: var(--border-default);
}

/* Focus - visível mas não intrusivo */
.button:focus-visible {
  outline: 2px solid oklch(0.55 0.1 230 / 0.4);
  outline-offset: 2px;
}

/* Active - feedback imediato, sem escala */
.button:active {
  background: var(--surface-3);
  transform: translateY(1px);
}

/* Disabled - dessaturado, não apenas opaco */
.button:disabled {
  color: var(--text-muted);
  pointer-events: none;
}
```

---

## Checklist de Validação

Antes de finalizar qualquer interface, valide:

### Hierarquia Visual

- [ ] A hierarquia é clara em escala de cinza?
- [ ] Elementos importantes são distinguidos por posição/tamanho, não cor?
- [ ] O olho segue um caminho natural?

### Espaçamento

- [ ] Grupos são separados por espaço, não linhas?
- [ ] O espaçamento é progressivo (maior entre grupos)?
- [ ] Não há áreas "apertadas"?

### Interações

- [ ] Transições são imperceptíveis (<200ms)?
- [ ] Não há animações que distraem?
- [ ] Estados são consequências naturais?

### Acessibilidade

- [ ] Contraste mínimo 4.5:1 para texto?
- [ ] Focus rings visíveis?
- [ ] Área de toque ≥44px?

### Longa Duração

- [ ] Confortável para uso por horas?
- [ ] Funciona em ambientes escuros?
- [ ] Não causa fadiga visual?

---

## Regra Final

> **Se um elemento pode ser removido sem perda funcional ou semântica, ele não deveria existir.**

Este sistema de design não busca atenção. Ele constrói **confiança silenciosa, continuidade e presença**.
