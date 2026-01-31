import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { BadgeDirective } from '@lumaui/angular';

@Component({
  selector: 'app-badge-previews',
  imports: [BadgeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('examples') {
        <div class="flex flex-wrap gap-3 justify-center">
          <span lumaBadge>Label</span>
          <span lumaBadge class="bg-blue-100 text-blue-800 border-blue-200"
            >Info</span
          >
          <span lumaBadge class="bg-green-100 text-green-800 border-green-200"
            >Success</span
          >
          <span
            lumaBadge
            class="bg-yellow-100 text-yellow-800 border-yellow-200"
            >Warning</span
          >
          <span lumaBadge class="bg-red-100 text-red-800 border-red-200"
            >Error</span
          >
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
export class BadgePreviewsComponent {
  exampleId = input.required<string>();
}
