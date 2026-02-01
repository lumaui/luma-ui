import { ButtonDirective, TooltipDirective } from '@lumaui/angular';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip-previews',
  imports: [TooltipDirective, ButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-tooltip') {
        <div class="flex justify-center">
          <button
            lumaButton
            lmVariant="primary"
            [lumaTooltip]="'Save your changes testing large text'"
          >
            Save
          </button>
        </div>
      }
      @case ('positioned-tooltips') {
        <div class="flex flex-wrap gap-4 justify-center items-center">
          <button
            lumaButton
            lmVariant="outline"
            [lumaTooltip]="'Above'"
            lmPosition="top"
          >
            Top
          </button>
          <button
            lumaButton
            lmVariant="outline"
            [lumaTooltip]="'Below'"
            lmPosition="bottom"
          >
            Bottom
          </button>
          <button
            lumaButton
            lmVariant="outline"
            [lumaTooltip]="'Left side'"
            lmPosition="left"
          >
            Left
          </button>
          <button
            lumaButton
            lmVariant="outline"
            [lumaTooltip]="'Right side'"
            lmPosition="right"
          >
            Right
          </button>
        </div>
      }
      @case ('html-content') {
        <div class="flex justify-center">
          <span
            class="underline decoration-dotted cursor-help"
            [lumaTooltip]="'<strong>Bold</strong> and <em>italic</em> text'"
            [lmHtml]="true"
          >
            Rich content tooltip
          </span>
        </div>
      }
      @case ('click-trigger-mobile-friendly') {
        <div class="flex justify-center">
          <button
            lumaButton
            lmVariant="ghost"
            [lumaTooltip]="
              'Click/tap to toggle this tooltip. Works great on mobile!'
            "
            lmTrigger="click"
          >
            ? Click me
          </button>
        </div>
      }
      @case ('with-delay') {
        <div class="flex justify-center">
          <button
            lumaButton
            lmVariant="outline"
            [lumaTooltip]="'Appears after 300ms'"
            [lmDelay]="300"
          >
            Delayed tooltip
          </button>
        </div>
      }
      @case ('on-any-element') {
        <div class="flex flex-wrap gap-6 justify-center items-center">
          <div
            class="p-4 border lm-border-neutral-60 rounded-lg cursor-help"
            [lumaTooltip]="'Tooltip on a div element'"
          >
            Hover this div
          </div>
          <span
            class="underline decoration-dotted cursor-help"
            [lumaTooltip]="'Tooltip on a span'"
          >
            Hover this span
          </span>
          <a
            href="#"
            class="text-blue-600 underline"
            [lumaTooltip]="'Tooltip on a link'"
            (click)="$event.preventDefault()"
          >
            Hover this link
          </a>
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
export class TooltipPreviewsComponent {
  exampleId = input.required<string>();
}
