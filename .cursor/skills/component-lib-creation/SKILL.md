---
name: "Lumo · Component Creation Protocol"
description: "Define como componentes Angular devem ser criados, estruturados, documentados e testados no Design System Lumo."
---

# Overview


# Lumo · Component Creation Protocol

## Objetivo
Esta Rule garante que **todo componente Angular no Lumo** seja criado de forma consistente, escalável e acessível, obedecendo ao Design System sem repetir princípios já definidos no `Lumo · Core Principles`.

---

## Estrutura de Arquivos
Todo componente deve conter:

```
<component-name>
<component-name>.component.ts
<component-name>.component.html
<component-name>.component.spec.ts
<component-name>.docs.md
```


- **Angular 20+**: Standalone é padrão.
- **TailwindCSS**: Todo estilo deve ser via classes Tailwind.
- **Documentação** (`.docs.md`):
  - Propósito do componente
  - Todos os **inputs** e **outputs**
  - Exemplos de uso
  - Estados: default, hover, focus, active, disabled

---

## Processo de Criação


1. Definir **intenção e papel** do componente (Estrutural, Interativo ou Informacional)
2. Definir **layout e espaçamento mínimo**
3. Definir **estados visuais essenciais** (hover, active, focus, disabled)
4. Criar arquivos seguindo a **estrutura técnica e documentação**
5. Implementar **acessibilidade moderna**:
   - ARIA attributes e roles corretos
   - Foco lógico e visível
   - Contraste adequado (mínimo 4.5:1 para texto)
   - Área de clique touch-friendly
6. Testar **funcionalidade e acessibilidade**
7. Revisar **consistência com o sistema**
8. Publicar como **pacote npm**:
```
export * from './<component-name>/<component-name>.component';
```


## Padrões de Acessibildiade

1. ARIA roles e labels corretos
2. Keyboard navigation lógica
3. Foco visível e gerenciável
4. Contraste adequado
5. Responsivo e touch-friendly

## Antipadrões a Evitar

1. Componentes que só funcionam isoladamente
2. Dependência de sombra ou borda para hierarquia
3. Cor de marca em fundo ou borda estrutural
4. Padding, altura ou radius fora da escala semântica
5. Componentes que exigem explicação para serem compreendidos
