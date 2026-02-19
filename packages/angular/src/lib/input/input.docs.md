---
name: Input
type: directive
selector: input[lumaInput]
category: Form
description: Text input directive with variants, sizes, and built-in Angular Forms validation support
inputs:
  - name: lmSize
    type: "'sm' | 'md' | 'lg'"
    default: "'md'"
    description: Size variant of the input
  - name: lmError
    type: 'boolean'
    default: 'false'
    description: Manual error state override
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Disabled state
  - name: lmRequired
    type: 'boolean'
    default: 'false'
    description: Required state
directives:
  - name: LmLabelDirective
    selector: label[lumaLabel]
    description: Label directive with required indicator support
    inputs:
      - name: for
        type: string
        description: ID of associated input element
      - name: lmRequired
        type: boolean
        description: Shows required indicator (*)
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        description: Label size variant
  - name: LmHelperTextDirective
    selector: '[lumaHelperText]'
    description: Helper text directive for displaying hints
    inputs:
      - name: lmSize
        type: "'sm' | 'md'"
        description: Helper text size variant
  - name: LmErrorTextDirective
    selector: '[lumaErrorText]'
    description: Error text directive for validation messages
    inputs:
      - name: lmSize
        type: "'sm' | 'md'"
        description: Error text size variant
---

# Input

## Purpose

The Input component is a foundational form element designed to collect user text input with built-in support for variants, sizes, validation states, and seamless Angular Forms integration. It follows the Neo-Minimal design philosophy, prioritizing visual silence, functional whitespace, and calm interactions.

The component is **compositional**, with separate directives for label, helper text, and error messages, enabling maximum flexibility and reuse across different form components (select, textarea, etc.).

## Usage Examples

### Basic Input

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmInputDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-basic-input-example',
  imports: [
    ReactiveFormsModule,
    LmInputDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="email">Email</label>
      <input
        lumaInput
        [formControl]="emailControl"
        id="email"
        type="email"
        placeholder="Enter your email"
      />
      <span lumaHelperText>We'll never share your email.</span>
    </div>
  `,
})
export class BasicInputExample {
  emailControl = new FormControl('');
}
```

### Input Sizes

```html
<!-- Small -->
<input lumaInput lmSize="sm" placeholder="Small input" />

<!-- Medium (Default) -->
<input lumaInput lmSize="md" placeholder="Medium input" />

<!-- Large -->
<input lumaInput lmSize="lg" placeholder="Large input" />
```

### Input with Error State

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmInputDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-error-input-example',
  imports: [
    ReactiveFormsModule,
    LmInputDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="error-email">Email</label>
      <input
        lumaInput
        [formControl]="emailControl"
        id="error-email"
        type="email"
      />
      @if (emailControl.invalid && emailControl.touched) {
        <span lumaErrorText>Please enter a valid email address.</span>
      }
    </div>
  `,
})
export class ErrorInputExample implements OnInit {
  emailControl = new FormControl('invalid email', [Validators.email]);

  ngOnInit(): void {
    this.emailControl.markAsTouched();
  }
}
```

### Disabled State

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmInputDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-disabled-example',
  imports: [
    ReactiveFormsModule,
    LmInputDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <!-- Disabled via FormControl.disable() — the recommended approach -->
      <label lumaLabel for="disabled-input">Disabled Input</label>
      <input
        lumaInput
        [formControl]="disabledControl"
        id="disabled-input"
        placeholder="Disabled input"
      />
      <span lumaHelperText>This input is disabled</span>
    </div>
  `,
})
export class DisabledExample {
  disabledControl = new FormControl({ value: '', disabled: true });
}
```

### Label with Required Indicator

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmInputDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-required-input-example',
  imports: [
    ReactiveFormsModule,
    LmInputDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel [lmRequired]="true" for="required-name">Full Name</label>
      <input
        lumaInput
        [formControl]="nameControl"
        id="required-name"
        type="text"
        placeholder="Enter your full name"
      />
      <span lumaHelperText>This field is required</span>
    </div>
  `,
})
export class RequiredInputExample {
  nameControl = new FormControl('', [Validators.required]);
}
```

### Custom Label Sizes

```html
<!-- Small label -->
<label lumaLabel for="small-input" lmSize="sm">Small Label</label>
<input lumaInput id="small-input" lmSize="sm" />

<!-- Large label -->
<label lumaLabel for="large-input" lmSize="lg">Large Label</label>
<input lumaInput id="large-input" lmSize="lg" />
```

## Accessibility

The Input component is built with accessibility as a foundational requirement, following WCAG AA standards:

### ARIA Attributes

- **`aria-invalid`**: Automatically set to `true` when input has error (manual or form validation)
- **`aria-describedby`**: Can be set programmatically to connect helper/error text
- **Auto-generated IDs**: Each input, label, helper, and error text gets unique ID for proper association

### Keyboard Navigation

- Full keyboard support via native HTML input element
- Tab navigation works naturally
- Focus border changes color to indicate focus

### Required Fields

- Visual indicator (red asterisk) via label `lmRequired` input
- Semantic `required` attribute via input `lmRequired` input
- Both visual and programmatic indication

### Error Identification

- **Visual**: Red border when in error state
- **Textual**: Error message via `lumaErrorText` directive
- **Programmatic**: `aria-invalid` attribute for assistive technologies

### Color Contrast

- All text meets WCAG AA minimum contrast (4.5:1)
- Border colors meet 3:1 contrast against backgrounds
- Focus border meets 3:1 contrast requirement

### Touch Targets

- Minimum 44x44px touch area for mobile users
- Generous padding (`px-4` for medium) ensures comfortable interaction

### Screen Reader Support

- Labels programmatically associated via `for` attribute
- Helper text connected via `aria-describedby` (when set)
- Error messages announced when `aria-invalid` changes

## Neo-Minimal Principles

The Input component embodies Neo-Minimal design philosophy:

### Visual Silence

- **Clear structure**: Visible border without visual noise
- **Subtle border color** (`border-border`): Defines boundary without competing with content
- **No shadows**: Structure achieved through space and light borders, not depth effects

### Functional Whitespace

- **Generous padding**: `px-4` for medium creates comfortable touch targets and breathing room
- **Spacing hierarchy**: `mb-1.5` between label/input, `mt-1` for helper/error text
- **No compacting**: Inputs are never squeezed to "fit more" - space is intentional

### Calm Interactions

- **Smooth transitions**: `transition-colors duration-200` provides gentle feedback
- **Subtle hover**: `hover:border-border` acknowledges interaction without distraction
- **Border color change**: Gentle feedback without additional visual elements

### Light as Structure

- **Focus border changes color**: Not through shadow or additional elements, but through color transition
- **Border defines structure**: Clear boundaries through minimal border styling
- **Transparency for states**: `/50`, `/80` opacity modifiers create subtle state changes

### Color as Action

- **Primary color on focus**: Signals interactivity and current focus
- **Destructive color on error**: Clear semantic meaning without explanation
- **Neutral borders**: `border-border` for structure, not decoration or hierarchy

### Silent Accessibility

- **Focus indicator feels natural**: Not an "accessibility mode" - just good design
- **Required asterisk integrated**: Part of the design language, not added as afterthought
- **Error styling cohesive**: Destructive color + border + message work as unified system

### Runtime Customization

- **Token-based radius**: Uses `var(--radius-3/4/5)` instead of hardcoded values
- **Global theming**: Change all inputs by overriding CSS variables
- **No rebuild required**: Customization happens at runtime via CSS

### Design Decision: Border Color Change vs Focus Ring

Unlike buttons and other interactive components, inputs use a **border color change** for focus feedback instead of an external ring. This design decision aligns with the Neo-Minimal principle of visual silence:

- **Inputs are structural elements**: Not actions like buttons, but form fields where content is entered
- **Subtle color shift provides adequate feedback**: Changing the border from `border-border` (gray) to `border-ring` (purple/blue) clearly indicates focus without additional visual elements
- **Eliminates mechanical geometry**: No external ring that appears suddenly, maintaining organic flow
- **Reduces visual noise**: One element (border) changing color is "quieter" than adding a new element (ring with offset)

This is a conscious divergence from the focus pattern used in other interactive components, chosen specifically because inputs prioritize content entry over action execution.

## Semantic Token Usage

Inputs use the following semantic tokens:

**Base styling:**

- **Border:** `border-border` (neutral gray, structural)
- **Background:** `bg-transparent` (clean, minimal)
- **Hover:** `hover:border-border` (subtle interaction feedback)

**States:**

- **Error:** `border-destructive`, `focus-visible:border-destructive`
- **Placeholder:** `placeholder:text-muted-foreground`
- **Disabled:** `opacity-50`, `cursor-not-allowed`, `bg-input`

**Common tokens:**

- **Border radius:** Controlled by `lmSize` input (sm uses `--radius-3`, md uses `--radius-4`, lg uses `--radius-5`)
- **Focus border:** `border-ring` (calm color change)
- **Spacing:** Padding-based sizing (px-2.5 for sm, px-3 for md, px-3.5 for lg)

All inputs use standard Tailwind utilities that reference Luma's semantic tokens, making them easy to customize without touching component code.

## Integration with Angular Forms

The Input directive implements `ControlValueAccessor`, providing seamless integration with Angular's Reactive and Template-driven Forms:

### Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <input lumaInput formControlName="email" />
    </form>
  `,
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
```

### Auto-validation Detection

The directive automatically detects Angular Forms validation state:

- When `invalid` AND `touched`: Shows error styling
- Updates `aria-invalid` attribute automatically
- No manual error state management required

### Manual Error Override

For custom validation logic outside Angular Forms:

```html
<input lumaInput [lmError]="customErrorCondition" />
```

## Best Practices

### Do's

- ✅ Connect labels via `for` attribute (accessibility)
- ✅ Show helper text for non-obvious inputs (clarity)
- ✅ Use error text for validation feedback (user guidance)
- ✅ Match label and input sizes (visual consistency)
- ✅ Use appropriate size variants for different contexts
- ✅ Provide clear, specific error messages

### Don'ts

- ❌ Don't skip labels (accessibility violation)
- ❌ Don't show error before user interaction (frustrating UX)
- ❌ Don't use vague error messages ("Invalid input")
- ❌ Don't override focus border color (accessibility requirement)
- ❌ Don't use custom styling that conflicts with the design system

## Browser Support

The Input component works in all modern browsers:

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Related Components

- **Select** (upcoming): Will use the same label/helper/error directives
- **Textarea** (upcoming): Compatible with `lumaInput` directive
- **Checkbox** (upcoming): Will share label directive patterns
- **Radio** (upcoming): Will share label directive patterns
