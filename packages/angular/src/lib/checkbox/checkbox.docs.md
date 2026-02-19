---
name: Checkbox
type: directive
selector: input[type="checkbox"][lumaCheckbox]
category: Form
description: A styled checkbox input that integrates with Angular Reactive Forms. Supports error states and disabled states with calm, intentional visual feedback.
inputs:
  - name: lmError
    type: 'boolean'
    default: 'false'
    description: Forces the error state regardless of form control validity
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Disables the checkbox (also responds to FormControl.disable())
  - name: lmRequired
    type: 'boolean'
    default: 'false'
    description: Marks the checkbox as required via the required attribute
---

# Checkbox

## Purpose

The checkbox directive enhances native `<input type="checkbox">` elements with Neo-Minimal styling and full Angular Forms integration. It replaces the browser's native appearance with a calm, intentional design that provides clear visual feedback for all states.

## Usage Examples

### Basic Checkbox

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LmCheckboxDirective, LmLabelDirective } from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule, LmCheckboxDirective, LmLabelDirective],
  template: `
    <div class="flex items-center gap-2">
      <input
        type="checkbox"
        lumaCheckbox
        [formControl]="agreedControl"
        id="agree"
      />
      <label lumaLabel for="agree">I agree to the terms</label>
    </div>
  `,
})
export class ExampleComponent {
  agreedControl = new FormControl(false);
}
```

### Checkbox States

```html
<div class="space-y-3">
  <!-- Default unchecked -->
  <div class="flex items-center gap-2">
    <input type="checkbox" lumaCheckbox id="cb-default" />
    <label lumaLabel for="cb-default">Default</label>
  </div>

  <!-- Pre-checked -->
  <div class="flex items-center gap-2">
    <input type="checkbox" lumaCheckbox id="cb-checked" checked />
    <label lumaLabel for="cb-checked">Checked</label>
  </div>

  <!-- Disabled unchecked -->
  <div class="flex items-center gap-2">
    <input type="checkbox" lumaCheckbox id="cb-disabled" [lmDisabled]="true" />
    <label lumaLabel for="cb-disabled">Disabled</label>
  </div>

  <!-- Disabled checked -->
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      lumaCheckbox
      id="cb-disabled-checked"
      [lmDisabled]="true"
      checked
    />
    <label lumaLabel for="cb-disabled-checked">Disabled Checked</label>
  </div>
</div>
```

### Checkbox with Error State

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmCheckboxDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [
    ReactiveFormsModule,
    LmCheckboxDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  template: `
    <div class="space-y-1.5">
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          lumaCheckbox
          [formControl]="requiredControl"
          id="terms"
        />
        <label lumaLabel for="terms">Accept terms and conditions</label>
      </div>
      @if (requiredControl.invalid && requiredControl.touched) {
        <span lumaErrorText>You must accept the terms to continue.</span>
      }
    </div>
  `,
})
export class ExampleComponent implements OnInit {
  requiredControl = new FormControl(false, [Validators.requiredTrue]);

  ngOnInit(): void {
    this.requiredControl.markAsTouched();
  }
}
```

## Accessibility

- Uses native `<input type="checkbox">` element for full browser and assistive technology support
- Auto-generates a unique `id` attribute (`luma-checkbox-N`) for label association
- Sets `aria-invalid` reactively based on the computed error state
- Supports `aria-describedby` via `setDescribedBy()` for helper and error text association
- Focus ring uses `ring-ring` token for consistent, visible keyboard navigation indicators

## Neo-Minimal Principles

The checkbox follows Neo-Minimalism by using a clean SVG checkmark via `background-image` in the directive's scoped styles — no extra DOM elements, no wrappers. The checked state transition is subtle (`transition-colors duration-200`). The error state changes only the border and fill color, not the shape or size. Disabled states reduce opacity to communicate unavailability without aggressive visual treatment.
