---
name: Modal
type: component
selector: luma-modal
category: Feedback
description: Dialog overlay with semantic tokens and smooth animations.
imports:
  - name: LmModalComponent
    module: '@lumaui/angular'
  - name: LmModalOverlayComponent
    module: '@lumaui/angular'
  - name: LmModalContainerComponent
    module: '@lumaui/angular'
  - name: LmModalCloseComponent
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
    type: 'boolean | null'
    default: 'null'
    description: Controlled open state (null = uncontrolled mode)
  - name: lmDefaultOpen
    type: boolean
    default: 'false'
    description: Default open state for uncontrolled mode
  - name: lmSize
    type: "'sm' | 'md' | 'lg' | 'xl' | 'full'"
    default: "'md'"
    description: Modal width variant
  - name: lmCloseOnOverlay
    type: boolean
    default: 'true'
    description: Close modal when clicking the overlay
  - name: lmCloseOnEscape
    type: boolean
    default: 'true'
    description: Close modal when pressing Escape key
outputs:
  - name: lmOpenChange
    type: EventEmitter<boolean>
    description: Emits when open state changes
methods:
  - name: open
    signature: 'open(): void'
    description: Open the modal programmatically
  - name: close
    signature: 'close(): void'
    description: Close the modal programmatically
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

<!-- Different modal sizes -->

<luma-modal lmSize="sm">Small</luma-modal>
<luma-modal lmSize="md">Medium (default)</luma-modal>
<luma-modal lmSize="lg">Large</luma-modal>
<luma-modal lmSize="xl">Extra Large</luma-modal>
<luma-modal lmSize="full">Full Width</luma-modal>
\`\`\`

### Scrollable Content

\`\`\`html
<luma-modal [(lmOpen)]="isOpen">
<luma-modal-overlay>
<luma-modal-container>
<luma-modal-close />

<div lumaModalHeader>
<h2 lumaModalTitle>Terms of Service</h2>
</div>
<div lumaModalContent [lmScrollable]="true">
<!-- Long content that scrolls -->
<p>Section 1...</p>
<p>Section 2...</p>
<!-- More sections -->
</div>
<div lumaModalFooter>
<button lumaButton (click)="isOpen = false">Accept</button>
</div>
</luma-modal-container>
</luma-modal-overlay>
</luma-modal>
\`\`\`

### Uncontrolled Mode

\`\`\`html

<!-- Modal with internal state management -->

<luma-modal #modal [lmDefaultOpen]="false">
<luma-modal-overlay>
<luma-modal-container>

<div lumaModalContent>
<p>Are you sure you want to proceed?</p>
</div>
<div lumaModalFooter>
<button lumaButton lmVariant="ghost" (click)="modal.close()">
No
</button>
<button lumaButton lmVariant="primary" (click)="modal.close()">
Yes
</button>
</div>
</luma-modal-container>
</luma-modal-overlay>
</luma-modal>

<!-- Open via template reference -->

<button lumaButton (click)="modal.open()">Open Confirmation</button>
\`\`\`

### Footer Alignment

\`\`\`html
<luma-modal [(lmOpen)]="isOpen">
<luma-modal-overlay>
<luma-modal-container>

<div lumaModalHeader>
<h2 lumaModalTitle>Footer Alignment</h2>
</div>
<div lumaModalContent>
<p>Different footer button alignments</p>
</div>
<!-- Options: start | center | end (default) | between -->
<div lumaModalFooter [lmAlign]="'start'">
<button lumaButton>Cancel</button>
<button lumaButton lmVariant="primary">Confirm</button>
</div>
</luma-modal-container>
</luma-modal-overlay>
</luma-modal>
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
