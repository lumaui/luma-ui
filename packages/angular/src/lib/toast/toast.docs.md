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
  - name: info
    signature: 'info(message: string, options?: Partial<ToastOptions>): ToastRef'
    description: Show an info toast notification
  - name: success
    signature: 'success(message: string, options?: Partial<ToastOptions>): ToastRef'
    description: Show a success toast notification
  - name: warning
    signature: 'warning(message: string, options?: Partial<ToastOptions>): ToastRef'
    description: Show a warning toast notification
  - name: error
    signature: 'error(message: string, options?: Partial<ToastOptions>): ToastRef'
    description: Show an error toast notification
  - name: dismissAll
    signature: 'dismissAll(): void'
    description: Dismiss all visible toasts
globalConfig:
  provider: provideToastConfig
  description: Configure default toast behavior at the application level.
  code: |
    import { ApplicationConfig } from '@angular/core';
    import { provideToastConfig } from '@lumaui/angular';

    export const appConfig: ApplicationConfig = {
      providers: [
        provideToastConfig({
          position: 'bottom-right',
          duration: 5000,
        }),
      ],
    };
  options:
    - name: position
      type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'"
      default: "'top-right'"
      description: Default position for all toasts
    - name: duration
      type: number
      default: 5000
      description: Default auto-dismiss duration in milliseconds (0 = no auto-dismiss)
    - name: dismissible
      type: boolean
      default: true
      description: Show close button on toasts
    - name: maxVisible
      type: number
      default: 5
      description: Maximum number of toasts visible at once
    - name: pauseOnHover
      type: boolean
      default: true
      description: Pause auto-dismiss timer when hovering over toast
---

# Toast

## Purpose

Service for showing temporary notifications. Uses semantic tokens for consistent coloring.

## Variants

Toasts come in four semantic variants with **soft, editorial colors** that maintain Neo-Minimal principles:

- **Info** (`info`): Soft purple tint for general notifications
- **Success** (`success`): Soft mint tint for confirmations
- **Warning** (`warning`): Soft amber tint for warnings
- **Error** (`error`): Soft red tint for errors

Each variant uses 10-15% opacity backgrounds with darker semantic text colors that maintain the variant's color identity while ensuring excellent readability.

**Semantic Token Usage:**

- **Info:** `bg-primary/10`, `text-primary/85`, `border-primary/30`
- **Success:** `bg-success/10`, `text-success/75`, `border-success/30`
- **Warning:** `bg-warning/15`, `text-warning/70`, `border-warning/30`
- **Error:** `bg-destructive/10`, `text-destructive/80`, `border-destructive/30`

All variants use darker versions of their semantic colors (via opacity modifiers) to maintain color identity while achieving WCAG AA contrast standards (4.5:1+). This approach preserves visual distinction between variants—purple for info, green for success, amber for warning, red for error—while ensuring optimal readability.

## Usage Examples

### Basic Toast

\`\`\`html
<button lumaButton lmVariant="primary" (click)="toast.info('Operation successful')">
Show Toast
</button>
\`\`\`

### All Variants

\`\`\`html

<div class="flex flex-wrap gap-2">
  <button lumaButton lmVariant="outline" (click)="toast.info('Information')">
    Info
  </button>
  <button lumaButton lmVariant="outline" (click)="toast.success('Success!')">
    Success
  </button>
  <button lumaButton lmVariant="outline" (click)="toast.warning('Warning!')">
    Warning
  </button>
  <button lumaButton lmVariant="outline" (click)="toast.error('Error!')">
    Error
  </button>
</div>
\`\`\`

### Persistent Toast

\`\`\`html

<div class="flex flex-wrap gap-2">
  <button lumaButton lmVariant="primary" (click)="toast.info('Processing...', { duration: 0 })">
    Show Persistent Toast
  </button>
  <button lumaButton lmVariant="ghost" (click)="toast.dismissAll()">
    Dismiss All
  </button>
</div>
\`\`\`

### Different Positions

\`\`\`html

<div class="grid grid-cols-3 gap-2">
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Top left', { position: 'top-left' })">
    top-left
  </button>
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Top center', { position: 'top-center' })">
    top-center
  </button>
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Top right', { position: 'top-right' })">
    top-right
  </button>
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Bottom left', { position: 'bottom-left' })">
    bottom-left
  </button>
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Bottom center', { position: 'bottom-center' })">
    bottom-center
  </button>
  <button lumaButton lmVariant="outline" lmSize="sm" (click)="toast.success('Bottom right', { position: 'bottom-right' })">
    bottom-right
  </button>
</div>
\`\`\`

### Toast with Title

\`\`\`html
<button lumaButton lmVariant="outline" (click)="toast.error('Unable to connect to server', { title: 'Connection Failed' })">
Show Toast with Title
</button>
\`\`\`

## Customizing

### Global Override

\`\`\`css
:root {
--color-success: oklch(0.65 0.15 150); /_ Brighter green _/
--color-destructive: oklch(0.70 0.15 30); /_ Brighter red _/
}
\`\`\`

## Accessibility

- ✅ ARIA live regions
- ✅ Auto-dismiss (configurable timeout)
- ✅ Keyboard dismissible
- ✅ Screen reader announcements
- ✅ High contrast text (5:1 ratio - WCAG AA compliant)

## Neo-Minimal Design Principles

Toast colors follow the Neo-Minimal philosophy that **"color defines action, not structure"**:

- **Soft opacity-based backgrounds** (10-15%) reduce visual weight while maintaining semantic meaning
- **Darker semantic text colors** maintain color identity (purple, green, amber, red) while ensuring readability
- **Subtle borders** (30% opacity) provide gentle definition without competing for attention
- **Notifications inform without demanding** - toasts should be calm, not promotional or urgent

The semantic color-coding comes from both the background tint AND the text color, reinforcing the notification type without being aggressive. Each variant maintains its visual personality (info = purple family, success = green family, warning = amber family, error = red family) while achieving WCAG AA contrast standards. This approach differentiates toasts (passive information) from buttons (active calls-to-action), ensuring the interface maintains visual silence and functional whitespace.

## Implementation Notes

- Service-based API
- Positioned top-right by default
- Uses semantic tokens exclusively
- Stacking support with animations
- Soft colors via opacity modifiers
