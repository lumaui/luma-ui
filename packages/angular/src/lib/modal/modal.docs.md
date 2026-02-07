---
name: Modal
type: component
selector: luma-modal
category: Feedback
description: Dialog overlay with semantic tokens and smooth animations.
imports:
  - name: LmModalComponent
    module: '@lumaui/angular'
  - name: LmModalHeaderDirective
    module: '@lumaui/angular'
  - name: LmModalTitleDirective
    module: '@lumaui/angular'
  - name: LmModalContentDirective
    module: '@lumaui/angular'
  - name: LmModalFooterDirective
    module: '@lumaui/angular'
inputs:
  - name: lmOpen
    type: boolean
    default: 'false'
    description: Whether modal is open
  - name: lmSize
    type: "'sm' | 'md' | 'lg' | 'xl'"
    default: "'md'"
    description: Modal width
---

# Modal

## Purpose

Dialog overlay for focused interactions. Uses semantic tokens with data-state animations.

## Semantic Token Usage

- **Container:** `bg-background`, `border-border`, `rounded-lg`
- **Overlay:** `bg-black/80`
- **Animations:** Uses `data-[state=open/closed]` with Tailwind v4 animations

## Usage Examples

### Basic Modal

\`\`\`html
<luma-modal [(lmOpen)]="isOpen">
  <div lumaModalHeader>
    <h2 lumaModalTitle>Modal Title</h2>
  </div>
  <div lumaModalContent>
    <p>Modal content</p>
  </div>
  <div lumaModalFooter>
    <button lumaButton (click)="isOpen = false">Close</button>
  </div>
</luma-modal>
\`\`\`

### Sizes

\`\`\`html
<luma-modal lmSize="sm">Small</luma-modal>
<luma-modal lmSize="md">Medium</luma-modal>
<luma-modal lmSize="lg">Large</luma-modal>
<luma-modal lmSize="xl">Extra Large</luma-modal>
\`\`\`

## Customizing

### Global Override

\`\`\`css
:root {
  --color-background: oklch(0.99 0.002 290);
  --radius-lg: 1rem;
}
\`\`\`

## Accessibility

- ✅ Focus trap (locks focus inside modal)
- ✅ Escape key to close
- ✅ ARIA attributes (role="dialog", aria-labelledby)
- ✅ Focus restoration on close

## Implementation Notes

- Portal rendering (appended to body)
- Uses data-[state] for animations
- Semantic tokens only
- Focus management included
