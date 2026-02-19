---
name: Select
type: component
selector: luma-select
category: Form
description: A combobox-style select with real-time filtering. When opened, the trigger transforms into a search input. Supports single-select and multi-select with checkboxes. Fully integrated with Angular Reactive Forms.
inputs:
  - name: lmSize
    type: "'sm' | 'md' | 'lg'"
    default: "'md'"
    description: Size variant controlling height, padding, and text size
  - name: lmMultiple
    type: 'boolean'
    default: 'false'
    description: Enables multi-select mode. Selected values are emitted as an array and options show checkboxes
  - name: lmPlaceholder
    type: 'string'
    default: "'Select…'"
    description: Text shown in the trigger when no value is selected
  - name: lmSearchPlaceholder
    type: 'string'
    default: "'Search…'"
    description: Placeholder text inside the search input when the dropdown is open
  - name: lmDisabled
    type: 'boolean'
    default: 'false'
    description: Disables the select. Also set automatically by FormControl.disable()
  - name: lmRequired
    type: 'boolean'
    default: 'false'
    description: Sets aria-required on the trigger for accessibility
  - name: lmError
    type: 'boolean'
    default: 'false'
    description: Forces error visual state. Also derived automatically from FormControl validity + touched state
directives:
  - name: luma-select-option
    selector: luma-select-option
    description: An option inside luma-select. Projects its text content as the visible label.
    inputs:
      - name: lmValue
        type: 'unknown'
        required: true
        description: The value emitted when this option is selected
      - name: lmDisabled
        type: 'boolean'
        default: 'false'
        description: Disables this individual option
---

# Select

## Purpose

A combobox-style select component that balances discoverability with efficiency. When the user opens the dropdown, the trigger area transforms into an inline text input — no separate search box, no visual disruption. Options filter in real time as the user types.

Two selection modes: **single** (closes on pick, shows a checkmark) and **multi** (stays open, accumulates values, shows mini checkboxes). In multi-select mode, selected items appear as individually-dismissible chips inside the trigger. Each chip has a small dismiss button to remove the item without reopening the dropdown. Pressing `Backspace` with an empty search removes the last chip.

Integrates with Angular Reactive Forms via `ControlValueAccessor`. Error state derives automatically from `FormControl` validity and touched state.

## Usage Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmSelectComponent,
  LmSelectOptionComponent,
  LmLabelDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-basic-select-example',
  imports: [
    ReactiveFormsModule,
    LmSelectComponent,
    LmSelectOptionComponent,
    LmLabelDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="fruit-select">Favourite fruit</label>
      <luma-select
        id="fruit-select"
        [formControl]="fruitControl"
        lmPlaceholder="Select a fruit…"
      >
        <luma-select-option [lmValue]="'apple'">Apple</luma-select-option>
        <luma-select-option [lmValue]="'banana'">Banana</luma-select-option>
        <luma-select-option [lmValue]="'cherry'">Cherry</luma-select-option>
        <luma-select-option [lmValue]="'grape'">Grape</luma-select-option>
        <luma-select-option [lmValue]="'mango'">Mango</luma-select-option>
      </luma-select>
    </div>
  `,
})
export class BasicSelectExample {
  fruitControl = new FormControl<string | null>(null);
}
```

### Multi-Select

```typescript
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  LmSelectComponent,
  LmSelectOptionComponent,
  LmLabelDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-multi-select-example',
  imports: [
    ReactiveFormsModule,
    LmSelectComponent,
    LmSelectOptionComponent,
    LmLabelDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel for="colors-select">Favourite colours</label>
      <luma-select
        id="colors-select"
        [formControl]="colorsControl"
        [lmMultiple]="true"
        lmPlaceholder="Select colours…"
      >
        <luma-select-option [lmValue]="'red'">Red</luma-select-option>
        <luma-select-option [lmValue]="'green'">Green</luma-select-option>
        <luma-select-option [lmValue]="'blue'">Blue</luma-select-option>
        <luma-select-option [lmValue]="'yellow'">Yellow</luma-select-option>
        <luma-select-option [lmValue]="'purple'">Purple</luma-select-option>
      </luma-select>
    </div>
  `,
})
export class MultiSelectExample {
  colorsControl = new FormControl<string[]>([]);
}
```

### Sizes

```typescript
import { Component } from '@angular/core';
import {
  LmSelectComponent,
  LmSelectOptionComponent,
  LmLabelDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-select-sizes-example',
  imports: [LmSelectComponent, LmSelectOptionComponent, LmLabelDirective],
  template: `
    <div class="w-full max-w-sm space-y-4">
      <div class="space-y-1.5">
        <label lumaLabel lmSize="sm" for="select-sm">Small</label>
        <luma-select id="select-sm" lmSize="sm" lmPlaceholder="Small select">
          <luma-select-option [lmValue]="'a'">Option A</luma-select-option>
          <luma-select-option [lmValue]="'b'">Option B</luma-select-option>
        </luma-select>
      </div>
      <div class="space-y-1.5">
        <label lumaLabel lmSize="md" for="select-md">Medium</label>
        <luma-select id="select-md" lmSize="md" lmPlaceholder="Medium select">
          <luma-select-option [lmValue]="'a'">Option A</luma-select-option>
          <luma-select-option [lmValue]="'b'">Option B</luma-select-option>
        </luma-select>
      </div>
      <div class="space-y-1.5">
        <label lumaLabel lmSize="lg" for="select-lg">Large</label>
        <luma-select id="select-lg" lmSize="lg" lmPlaceholder="Large select">
          <luma-select-option [lmValue]="'a'">Option A</luma-select-option>
          <luma-select-option [lmValue]="'b'">Option B</luma-select-option>
        </luma-select>
      </div>
    </div>
  `,
})
export class SelectSizesExample {}
```

### Error State

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmSelectComponent,
  LmSelectOptionComponent,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-select-error-example',
  imports: [
    ReactiveFormsModule,
    LmSelectComponent,
    LmSelectOptionComponent,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  template: `
    <div class="w-full max-w-sm space-y-1.5">
      <label lumaLabel [lmRequired]="true" for="required-select">Country</label>
      <luma-select
        id="required-select"
        [formControl]="requiredControl"
        lmPlaceholder="Select a country…"
      >
        <luma-select-option [lmValue]="'us'">United States</luma-select-option>
        <luma-select-option [lmValue]="'uk'">United Kingdom</luma-select-option>
        <luma-select-option [lmValue]="'ca'">Canada</luma-select-option>
        <luma-select-option [lmValue]="'au'">Australia</luma-select-option>
      </luma-select>
      @if (requiredControl.invalid && requiredControl.touched) {
        <span lumaErrorText>Please select a country.</span>
      }
    </div>
  `,
})
export class SelectErrorExample implements OnInit {
  requiredControl = new FormControl<string | null>(null, Validators.required);

  ngOnInit(): void {
    this.requiredControl.markAsTouched();
  }
}
```

## Accessibility

- Trigger has `role="combobox"` with `aria-expanded`, `aria-haspopup="listbox"`, and `aria-controls` pointing to the listbox.
- The listbox has `role="listbox"` and `aria-multiselectable` in multi-select mode.
- Each option has `role="option"`, `aria-selected`, and `aria-disabled`.
- Keyboard: `Enter`/`Space`/`ArrowDown` opens the dropdown. Inside the search input, `ArrowDown`/`ArrowUp` navigate, `Enter` selects, `Escape` closes, `Tab` closes and moves focus. `Backspace` on an empty search removes the last selected chip.
- Each chip dismiss button has `aria-label="Remove {label}"` for screen readers.
- Trigger receives focus when the dropdown closes.

## Neo-Minimal Principles

The combobox pattern eliminates the cognitive split between "type to search" and "click to select" by unifying them into one gesture. The trigger's border and dimensions match `lumaInput` exactly — the select is typographically invisible until needed. The floating listbox uses a fixed shadow and subtle border rather than heavy elevation, preserving visual hierarchy without announcing itself.
