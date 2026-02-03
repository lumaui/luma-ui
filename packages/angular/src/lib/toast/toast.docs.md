---
name: Toast
type: component
selector: ToastService
category: Feedback
description: Non-blocking notification system for displaying brief messages to users
inputs:
  - name: message
    type: 'string'
    default: 'required'
    description: Toast message content
  - name: title
    type: 'string'
    default: 'undefined'
    description: Optional toast title
  - name: variant
    type: "'info' | 'success' | 'warning' | 'error'"
    default: "'info'"
    description: Visual variant determining background color and icon
  - name: position
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'"
    default: "'top-right'"
    description: Screen position for toast display
  - name: duration
    type: 'number'
    default: '5000'
    description: Auto-close duration in milliseconds (0 = no auto-close)
  - name: dismissible
    type: 'boolean'
    default: 'true'
    description: Show close button
  - name: pauseOnHover
    type: 'boolean'
    default: 'true'
    description: Pause auto-close timer on hover
  - name: role
    type: "'alert' | 'status'"
    default: "'status' (auto: 'alert' for error variant)"
    description: ARIA role for screen reader announcements
globalConfig:
  provider: provideToastConfig
  description: Configure default toast behavior at the application level
  code: |
    import { provideToastConfig } from '@lumaui/angular';

    export const appConfig: ApplicationConfig = {
      providers: [
        provideToastConfig({
          position: 'bottom-right',
          duration: 4000,
          dismissible: true,
          maxVisible: 3,
          pauseOnHover: true,
        }),
      ],
    };
  options:
    - name: position
      type: ToastPosition
      default: "'top-right'"
      description: Default screen position
    - name: duration
      type: number
      default: '5000'
      description: Auto-close duration (0 = no auto)
    - name: dismissible
      type: boolean
      default: 'true'
      description: Show close button by default
    - name: maxVisible
      type: number
      default: '5'
      description: Maximum visible toasts
    - name: pauseOnHover
      type: boolean
      default: 'true'
      description: Pause timer on hover
tokenGroups:
  - name: Container
    tokens:
      - name: --luma-toast-container-radius
        value: var(--luma-radius-lg)
        description: Toast border radius
      - name: --luma-toast-container-shadow
        value: 0 4px 12px oklch(0 0 0 / 0.08)
        description: Toast shadow
      - name: --luma-toast-container-padding-x
        value: 16px
        description: Horizontal padding
      - name: --luma-toast-container-padding-y
        value: 12px
        description: Vertical padding
      - name: --luma-toast-container-gap
        value: 12px
        description: Gap between icon, content, and close button
      - name: --luma-toast-container-border-width
        value: 0px
        description: Toast border width
      - name: --luma-toast-container-border-color
        value: transparent
        description: Toast border color
  - name: Typography
    tokens:
      - name: --luma-toast-title-font-size
        value: 14px
        description: Toast title font size
      - name: --luma-toast-title-font-weight
        value: '500'
        description: Toast title font weight
      - name: --luma-toast-title-line-height
        value: '1.4'
        description: Toast title line height
      - name: --luma-toast-message-font-size
        value: 14px
        description: Toast message font size
      - name: --luma-toast-message-line-height
        value: '1.5'
        description: Toast message line height
  - name: Icon
    tokens:
      - name: --luma-toast-icon-size
        value: 20px
        description: Icon size
  - name: Close Button
    tokens:
      - name: --luma-toast-close-size
        value: 16px
        description: Close button icon size
      - name: --luma-toast-close-radius
        value: 4px
        description: Close button border radius
  - name: Info Variant
    tokens:
      - name: --luma-toast-info-bg
        value: oklch(0.95 0.02 232)
        description: Info variant background - soft blue tint
      - name: --luma-toast-info-text
        value: var(--luma-color-text-primary)
        description: Info variant text color
      - name: --luma-toast-info-border
        value: transparent
        description: Info variant border color
      - name: --luma-toast-info-icon-color
        value: var(--luma-color-info-50)
        description: Info variant icon color
      - name: --luma-toast-info-close-color
        value: var(--luma-color-info-60)
        description: Info variant close button color
      - name: --luma-toast-info-close-hover
        value: var(--luma-color-info-70)
        description: Info variant close button hover color
  - name: Success Variant
    tokens:
      - name: --luma-toast-success-bg
        value: oklch(0.94 0.025 155)
        description: Success variant background - soft green tint
      - name: --luma-toast-success-text
        value: var(--luma-color-text-primary)
        description: Success variant text color
      - name: --luma-toast-success-border
        value: transparent
        description: Success variant border color
      - name: --luma-toast-success-icon-color
        value: var(--luma-color-success-50)
        description: Success variant icon color
      - name: --luma-toast-success-close-color
        value: var(--luma-color-success-60)
        description: Success variant close button color
      - name: --luma-toast-success-close-hover
        value: var(--luma-color-success-70)
        description: Success variant close button hover color
  - name: Warning Variant
    tokens:
      - name: --luma-toast-warning-bg
        value: oklch(0.96 0.03 95)
        description: Warning variant background - soft yellow tint
      - name: --luma-toast-warning-text
        value: var(--luma-color-text-primary)
        description: Warning variant text color
      - name: --luma-toast-warning-border
        value: transparent
        description: Warning variant border color
      - name: --luma-toast-warning-icon-color
        value: var(--luma-color-warning-60)
        description: Warning variant icon color
      - name: --luma-toast-warning-close-color
        value: var(--luma-color-warning-60)
        description: Warning variant close button color
      - name: --luma-toast-warning-close-hover
        value: var(--luma-color-warning-70)
        description: Warning variant close button hover color
  - name: Error Variant
    tokens:
      - name: --luma-toast-error-bg
        value: oklch(0.93 0.025 28)
        description: Error variant background - soft rose tint
      - name: --luma-toast-error-text
        value: var(--luma-color-text-primary)
        description: Error variant text color
      - name: --luma-toast-error-border
        value: transparent
        description: Error variant border color
      - name: --luma-toast-error-icon-color
        value: var(--luma-color-error-50)
        description: Error variant icon color
      - name: --luma-toast-error-close-color
        value: var(--luma-color-error-60)
        description: Error variant close button color
      - name: --luma-toast-error-close-hover
        value: var(--luma-color-error-70)
        description: Error variant close button hover color
  - name: Transition
    tokens:
      - name: --luma-toast-transition-duration
        value: var(--luma-duration-base)
        description: Animation duration
      - name: --luma-toast-transition-timing
        value: cubic-bezier(0.4, 0, 0.2, 1)
        description: Animation easing
---

# Toast

## Purpose

Toast provides non-blocking notifications that appear temporarily to inform users about the result of an action or important system events. Following Neo-Minimal principles, toasts use semantic background colors and gentle animations to provide feedback without demanding attention.

## Usage Examples

### All Variants

```html
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.info('This is an info message')"
>
  Info
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Changes saved successfully!')"
>
  Success
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.warning('Your session will expire soon')"
>
  Warning
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.error('Failed to save changes')"
>
  Error
</button>
```

### Persistent Toast

```html
<button lumaButton lmVariant="primary" (click)="showPersistent()">
  Show Persistent Toast
</button>
<button lumaButton lmVariant="ghost" (click)="toast.dismissAll()">
  Dismiss All
</button>
```

### Different Positions

```html
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at top-left', { position: 'top-left' })"
>
  top-left
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at top-center', { position: 'top-center' })"
>
  top-center
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at top-right', { position: 'top-right' })"
>
  top-right
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at bottom-left', { position: 'bottom-left' })"
>
  bottom-left
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at bottom-center', { position: 'bottom-center' })"
>
  bottom-center
</button>
<button
  lumaButton
  lmVariant="outline"
  (click)="toast.success('Toast at bottom-right', { position: 'bottom-right' })"
>
  bottom-right
</button>
```

## Accessibility

- Uses `role="status"` for info/success/warning (polite announcements)
- Uses `role="alert"` for error toasts (assertive announcements)
- Screen reader announcements via Angular CDK LiveAnnouncer
- Keyboard accessible: Escape to dismiss, Tab for navigation
- Timer pauses on focus for keyboard users
- Minimum contrast ratios maintained for all variants

## Neo-Minimal Principles

The Toast component embodies Neo-Minimal design through:

- **Visual Silence**: Semantic background colors that inform without demanding attention
- **Calm Interactions**: Smooth animations with natural deceleration (ease-out)
- **Functional Whitespace**: Generous padding and gap create clear visual hierarchy
- **Silent Accessibility**: Focus states are discrete but clear, ARIA attributes ensure screen reader support
- **No Decoration**: Icons serve semantic purpose, not visual ornament

## Use Cases

### Toast with Title

Display a prominent title above the message for important notifications.

```typescript
this.toast.error('Unable to connect to server', {
  title: 'Connection Failed',
  duration: 0, // Keep open until dismissed
});
```

### Programmatic Dismiss with ToastRef

Control toasts programmatically using the returned reference.

```typescript
@Component({
  template: `
    <button lumaButton (click)="startUpload()">Start Upload</button>
  `,
})
export class UploadComponent {
  private toast = inject(ToastService);
  private uploadToast: ToastRef | null = null;

  async startUpload() {
    // Show persistent toast
    this.uploadToast = this.toast.info('Uploading file...', {
      duration: 0,
      dismissible: false,
    });

    try {
      await this.uploadService.upload(file);
      this.uploadToast.dismiss();
      this.toast.success('Upload complete!');
    } catch (error) {
      this.uploadToast.dismiss();
      this.toast.error('Upload failed');
    }
  }
}
```

### React to Toast Dismissal

Use `afterDismissed` observable to execute logic when a toast is closed.

```typescript
const toastRef = this.toast.success('Item deleted', {
  title: 'Deleted',
});

toastRef.afterDismissed.subscribe(() => {
  console.log('Toast was dismissed');
  this.analytics.track('toast_dismissed');
});
```

### Form Validation Errors

Show multiple validation errors as toasts.

```typescript
onSubmit() {
  if (this.form.invalid) {
    const errors = this.getFormErrors();

    errors.forEach((error, index) => {
      // Stagger toasts to prevent overlap
      setTimeout(() => {
        this.toast.error(error.message, {
          title: error.field,
          duration: 5000,
        });
      }, index * 200);
    });

    return;
  }

  // Submit form...
}
```

### Success After API Call

Common pattern for showing feedback after async operations.

```typescript
async saveChanges() {
  try {
    await this.api.save(this.data);
    this.toast.success('Changes saved successfully!');
  } catch (error) {
    this.toast.error(error.message || 'Failed to save changes', {
      title: 'Save Error',
      duration: 0,  // Keep visible until dismissed
    });
  }
}
```

## Customizing

### Override Globally

Customize toast appearance across your entire application:

```css
:root {
  --luma-toast-container-radius: 8px;
  --luma-toast-container-shadow: 0 2px 8px oklch(0 0 0 / 0.1);
  --luma-toast-transition-duration: 150ms;
}
```

### Override Per Theme

Apply different values for light and dark themes:

```css
/* Light mode - softer shadows */
:root {
  --luma-toast-container-shadow: 0 4px 12px oklch(0 0 0 / 0.08);
  --luma-toast-info-bg: oklch(0.95 0.02 232);
}

/* Dark mode - deeper shadows */
.dark {
  --luma-toast-container-shadow: 0 4px 12px oklch(0 0 0 / 0.24);
  --luma-toast-info-bg: oklch(0.25 0.04 232);
}
```

### Override Per Component

Scope changes to specific contexts:

```css
/* Custom "neutral" variant */
:root {
  --luma-toast-info-bg: oklch(0.96 0.005 265);
  --luma-toast-info-icon-color: oklch(0.45 0.01 265);
}
```
