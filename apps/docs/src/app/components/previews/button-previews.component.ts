import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-button-previews',
  imports: [ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-button') {
        <div class="flex justify-center">
          <button lumaButton>Click me</button>
        </div>
      }
      @case ('variants') {
        <div class="flex flex-wrap gap-4 justify-center">
          <button lumaButton lmVariant="primary">Primary</button>
          <button lumaButton lmVariant="outline">Outline</button>
          <button lumaButton lmVariant="ghost">Ghost</button>
          <button lumaButton lmVariant="danger">Delete</button>
        </div>
      }
      @case ('sizes') {
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4 justify-center">
            <button lumaButton lmSize="sm">Small</button>
            <button lumaButton lmSize="md">Medium</button>
            <button lumaButton lmSize="lg">Large</button>
          </div>
          <div>
            <button lumaButton lmSize="full">Full Width</button>
          </div>
        </div>
      }
      @case ('disabled-state') {
        <div class="flex justify-center">
          <button lumaButton [lmDisabled]="true">Disabled</button>
        </div>
      }
      @case ('link-as-button') {
        <div class="flex justify-center">
          <a lumaButton href="#" lmVariant="primary">Link Button</a>
        </div>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class ButtonPreviewsComponent {
  exampleId = input.required<string>();
}
