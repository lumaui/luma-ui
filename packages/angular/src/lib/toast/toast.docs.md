---
name: Toast
type: service
selector: LmToastService
category: Feedback
description: Notification service with semantic token variants.
imports:
  - name: LmToastService
    module: '@lumaui/angular'
methods:
  - name: show
    signature: 'show(message: string, variant?: ToastVariant)'
    description: Show a toast notification
---

# Toast

## Purpose

Service for showing temporary notifications. Uses semantic tokens for consistent coloring.

## Semantic Token Usage

**Variants:**
- **Info:** `bg-primary`, `text-primary-foreground`
- **Success:** `bg-success`, `text-success-foreground`
- **Warning:** `bg-warning`, `text-warning-foreground`
- **Error:** `bg-destructive`, `text-destructive-foreground`

## Usage Examples

### Basic Toast

\`\`\`typescript
@Component({...})
export class MyComponent {
  toast = inject(LmToastService);
  
  showToast() {
    this.toast.show('Operation successful', 'success');
  }
}
\`\`\`

### All Variants

\`\`\`typescript
this.toast.show('Information', 'info');
this.toast.show('Success!', 'success');
this.toast.show('Warning!', 'warning');
this.toast.show('Error!', 'error');
\`\`\`

## Customizing

### Global Override

\`\`\`css
:root {
  --color-success: oklch(0.65 0.15 150);  /* Brighter green */
  --color-destructive: oklch(0.70 0.15 30);  /* Brighter red */
}
\`\`\`

## Accessibility

- ✅ ARIA live regions
- ✅ Auto-dismiss (configurable timeout)
- ✅ Keyboard dismissible
- ✅ Screen reader announcements

## Implementation Notes

- Service-based API
- Positioned top-right by default
- Uses semantic tokens exclusively
- Stacking support with animations
