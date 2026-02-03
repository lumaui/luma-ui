import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { LmBadgeDirective } from '@lumaui/angular';

@Component({
  selector: 'app-badge-previews',
  imports: [LmBadgeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('examples') {
        <div class="flex flex-wrap gap-3 justify-center">
          <span lumaBadge>Label</span>
          <span
            lumaBadge
            style="
              background-color: color-mix(in oklch, var(--luma-color-primary-50) 15%, white);
              color: var(--luma-color-primary-60);
              border-color: color-mix(in oklch, var(--luma-color-primary-50) 30%, white);
            "
            >Info</span
          >
          <span
            lumaBadge
            style="
              background-color: color-mix(in oklch, var(--luma-color-success-50) 15%, white);
              color: var(--luma-color-success-60);
              border-color: color-mix(in oklch, var(--luma-color-success-50) 30%, white);
            "
            >Success</span
          >
          <span
            lumaBadge
            style="
              background-color: color-mix(in oklch, var(--luma-color-warning-50) 15%, white);
              color: var(--luma-color-warning-60);
              border-color: color-mix(in oklch, var(--luma-color-warning-50) 30%, white);
            "
            >Warning</span
          >
          <span
            lumaBadge
            style="
              background-color: color-mix(in oklch, var(--luma-color-error-50) 15%, white);
              color: var(--luma-color-error-60);
              border-color: color-mix(in oklch, var(--luma-color-error-50) 30%, white);
            "
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
