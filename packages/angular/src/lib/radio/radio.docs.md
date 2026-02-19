---
name: Radio
type: directive
selector: input[type="radio"][lumaRadio]
category: Form
description: A styled radio button input that integrates with Angular Reactive Forms. Use multiple radio buttons with the same FormControl to create a mutually exclusive selection group.
inputs:
  - name: lmValue
    type: 'unknown'
    default: 'undefined'
    description: The value emitted to the FormControl when this radio is selected
  - name: lmError
    type: 'boolean'
    default: 'false'
    description: Forces the error state regardless of form control validity
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Disables the radio button (also responds to FormControl.disable())
  - name: lmRequired
    type: 'boolean'
    default: 'false'
    description: Marks the radio as required via the required attribute
---

# Radio

## Purpose

The radio directive enhances native `<input type="radio">` elements with Neo-Minimal styling and full Angular Forms integration. Multiple radio buttons sharing the same `name` attribute (and typically the same `FormControl`) form a mutually exclusive selection group. The inner dot indicator is rendered via scoped `box-shadow` — no extra markup required.

## Usage Examples

### Basic Radio Group

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { LmRadioDirective, LmLabelDirective } from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [ReactiveFormsModule, LmRadioDirective, LmLabelDirective],
  template: `
    <fieldset class="space-y-2 border-none p-0">
      <legend class="text-sm font-medium mb-2">Choose a plan</legend>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          lumaRadio
          lmValue="starter"
          [formControl]="planControl"
          name="plan"
          id="plan-starter"
        />
        <label lumaLabel for="plan-starter">Starter</label>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          lumaRadio
          lmValue="pro"
          [formControl]="planControl"
          name="plan"
          id="plan-pro"
        />
        <label lumaLabel for="plan-pro">Pro</label>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          lumaRadio
          lmValue="enterprise"
          [formControl]="planControl"
          name="plan"
          id="plan-enterprise"
        />
        <label lumaLabel for="plan-enterprise">Enterprise</label>
      </div>
    </fieldset>
  `,
})
export class ExampleComponent {
  planControl = new FormControl('starter');
}
```

### Radio States

```html
<div class="space-y-3">
  <!-- Unchecked -->
  <div class="flex items-center gap-2">
    <input type="radio" lumaRadio id="r-default" name="states" />
    <label lumaLabel for="r-default">Option A</label>
  </div>

  <!-- Checked -->
  <div class="flex items-center gap-2">
    <input type="radio" lumaRadio id="r-checked" name="states" checked />
    <label lumaLabel for="r-checked">Option B (selected)</label>
  </div>

  <!-- Disabled unchecked -->
  <div class="flex items-center gap-2">
    <input
      type="radio"
      lumaRadio
      id="r-disabled"
      name="states-disabled"
      [lmDisabled]="true"
    />
    <label lumaLabel for="r-disabled">Disabled</label>
  </div>

  <!-- Disabled checked -->
  <div class="flex items-center gap-2">
    <input
      type="radio"
      lumaRadio
      id="r-disabled-checked"
      name="states-disabled"
      [lmDisabled]="true"
      checked
    />
    <label lumaLabel for="r-disabled-checked">Disabled Selected</label>
  </div>
</div>
```

### Radio with Error State

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmRadioDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-example',
  imports: [
    ReactiveFormsModule,
    LmRadioDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  template: `
    <fieldset class="space-y-2 border-none p-0">
      <legend class="text-sm font-medium mb-2">Delivery method</legend>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          lumaRadio
          lmValue="email"
          [formControl]="deliveryControl"
          name="delivery-err"
          id="d-email"
        />
        <label lumaLabel for="d-email">Email</label>
      </div>
      <div class="flex items-center gap-2">
        <input
          type="radio"
          lumaRadio
          lmValue="sms"
          [formControl]="deliveryControl"
          name="delivery-err"
          id="d-sms"
        />
        <label lumaLabel for="d-sms">SMS</label>
      </div>
      @if (deliveryControl.invalid && deliveryControl.touched) {
        <span lumaErrorText>Please select a delivery method.</span>
      }
    </fieldset>
  `,
})
export class ExampleComponent implements OnInit {
  deliveryControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.deliveryControl.markAsTouched();
  }
}
```

## Accessibility

- Uses native `<input type="radio">` element for full browser and assistive technology support
- Auto-generates a unique `id` attribute (`luma-radio-N`) for label association
- Sets `aria-invalid` reactively based on the computed error state
- Supports `aria-describedby` via `setDescribedBy()` for helper and error text association
- Group semantics: use a `<fieldset>` + `<legend>` for proper screen reader group announcement
- Focus ring uses `ring-ring` token for consistent, visible keyboard navigation indicators

## Neo-Minimal Principles

The inner dot indicator is achieved with a single `box-shadow: inset 0 0 0 4px var(--color-primary)` rule in the directive's scoped styles — no wrapper elements, no pseudo-elements, no SVG. This technique uses the token system directly (`var(--color-primary)`) so the dot automatically reflects theme customization. The error state changes only the border color; the overall shape and rhythm remain constant.
