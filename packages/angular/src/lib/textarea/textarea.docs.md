---
name: Textarea
type: directive
selector: textarea[lumaTextarea]
category: Form
description: Multi-line text input directive with CVA size variants, error state, and Angular Forms integration following Neo-Minimal principles.
inputs:
  - name: lmSize
    type: "'sm' | 'md' | 'lg'"
    default: "'md'"
    description: Controls the textarea's min-height, padding, font size, and border radius
  - name: lmError
    type: 'boolean'
    default: 'false'
    description: When true, applies destructive border color and aria-invalid="true"
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Disables the textarea (also applied automatically by FormControl.disable())
  - name: lmRequired
    type: 'boolean'
    default: 'false'
    description: Sets the required attribute on the native element
directives:
  - name: lumaLabel
    selector: label[lumaLabel]
    description: Styled label with optional required indicator
    inputs:
      - name: for
        type: string
        default: "''"
        description: Associates label with a form control via for attribute
      - name: lmRequired
        type: boolean
        default: 'false'
        description: Displays a required indicator (*) after the label text
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        default: "'md'"
        description: Label font size
  - name: lumaHelperText
    selector: '[lumaHelperText]'
    description: Hint or description text displayed below the textarea
    inputs:
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        default: "'sm'"
        description: Helper text font size
  - name: lumaErrorText
    selector: '[lumaErrorText]'
    description: Validation error message displayed below the textarea
    inputs:
      - name: lmSize
        type: "'sm' | 'md' | 'lg'"
        default: "'sm'"
        description: Error text font size
---

# Textarea

## Purpose

The `lumaTextarea` directive transforms a native `<textarea>` element into a styled, accessible multi-line input that integrates seamlessly with Angular Reactive Forms. It shares the same design language as `lumaInput`, using semantic tokens for borders and background.

Vertical resize is enabled by default (`resize-y`) to let users control the field height. Horizontal resize is intentionally disabled to preserve layout integrity — a core Neo-Minimal principle.

## Usage Examples

### Basic Textarea

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmTextareaDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-basic-textarea-example',
  imports: [
    ReactiveFormsModule,
    LmTextareaDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="bio">Bio</label>
      <textarea
        lumaTextarea
        [formControl]="bioControl"
        id="bio"
        placeholder="Tell us about yourself"
      ></textarea>
      <span lumaHelperText>Maximum 500 characters.</span>
    </div>
  `,
})
export class BasicTextareaExample {
  bioControl = new FormControl('');
}
```

### Textarea Sizes

```html
<div class="w-full max-w-sm space-y-4">
  <div class="space-y-1.5">
    <label lumaLabel lmSize="sm" for="small-textarea">Small</label>
    <textarea
      lumaTextarea
      lmSize="sm"
      id="small-textarea"
      placeholder="Small textarea"
    ></textarea>
  </div>
  <div class="space-y-1.5">
    <label lumaLabel lmSize="md" for="medium-textarea">Medium</label>
    <textarea
      lumaTextarea
      lmSize="md"
      id="medium-textarea"
      placeholder="Medium textarea"
    ></textarea>
  </div>
  <div class="space-y-1.5">
    <label lumaLabel lmSize="lg" for="large-textarea">Large</label>
    <textarea
      lumaTextarea
      lmSize="lg"
      id="large-textarea"
      placeholder="Large textarea"
    ></textarea>
  </div>
</div>
```

### Textarea with Error State

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmTextareaDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-error-textarea-example',
  imports: [
    ReactiveFormsModule,
    LmTextareaDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="error-message">Message</label>
      <textarea
        lumaTextarea
        [formControl]="messageControl"
        id="error-message"
        placeholder="Enter your message"
      ></textarea>
      @if (messageControl.invalid && messageControl.touched) {
        <span lumaErrorText>Message must be at least 20 characters.</span>
      }
    </div>
  `,
})
export class ErrorTextareaExample implements OnInit {
  messageControl = new FormControl('too short', [Validators.minLength(20)]);

  ngOnInit(): void {
    this.messageControl.markAsTouched();
  }
}
```

### Disabled Textarea

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmTextareaDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-disabled-textarea-example',
  imports: [
    ReactiveFormsModule,
    LmTextareaDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="disabled-textarea">Bio</label>
      <textarea
        lumaTextarea
        [formControl]="disabledControl"
        id="disabled-textarea"
      ></textarea>
      <span lumaHelperText>This field cannot be edited.</span>
    </div>
  `,
})
export class DisabledTextareaExample {
  disabledControl = new FormControl({
    value: 'This content cannot be edited.',
    disabled: true,
  });
}
```

### Label with Required Indicator

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmTextareaDirective,
  LmLabelDirective,
  LmHelperTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-required-textarea-example',
  imports: [
    ReactiveFormsModule,
    LmTextareaDirective,
    LmLabelDirective,
    LmHelperTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel [lmRequired]="true" for="required-message"
        >Message</label
      >
      <textarea
        lumaTextarea
        [formControl]="messageControl"
        id="required-message"
        placeholder="Your message is required"
      ></textarea>
      <span lumaHelperText>This field is required</span>
    </div>
  `,
})
export class RequiredTextareaExample {
  messageControl = new FormControl('', [Validators.required]);
}
```

## Accessibility

- Auto-generates a unique `id` (`luma-textarea-N`) if none is provided
- Sets `aria-invalid` to `true`/`false` based on error state — consumed by screen readers
- Supports `aria-describedby` via `setDescribedBy()` for associating helper/error text
- Keyboard users can resize the textarea vertically using standard browser controls
- Disabled state propagates from either `lmDisabled` input or `FormControl.disable()`

## Neo-Minimal Principles

**Vertical-only resize** keeps the layout stable — horizontal resize would disrupt adjacent content and create an unpredictable experience. Users get natural control over height, matching their content needs.

**No fixed height**: Unlike `<input>`, the textarea uses `min-h-*` per size, allowing the content to breathe. The interface grows with the user's intent rather than constraining it.

**Calm error feedback**: The border color shifts from `gray-5` to `destructive` only when the error state is active. This transition is a natural consequence of the validation state, not an intrusive animation.
