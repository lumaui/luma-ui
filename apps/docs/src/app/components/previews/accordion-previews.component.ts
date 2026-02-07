import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  LmAccordionItemComponent,
  LmAccordionGroupComponent,
  LmAccordionTriggerDirective,
  LmAccordionTitleDirective,
  LmAccordionIconDirective,
  LmAccordionContentDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-accordion-previews',
  imports: [
    LmAccordionItemComponent,
    LmAccordionGroupComponent,
    LmAccordionTriggerDirective,
    LmAccordionTitleDirective,
    LmAccordionIconDirective,
    LmAccordionContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-accordion') {
        <luma-accordion-item class="w-full">
          <div lumaAccordionTrigger>
            <span lumaAccordionTitle>What is Luma UI?</span>
            <span lumaAccordionIcon>
              <svg viewBox="0 0 24 24" class="w-4 h-4">
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
          <div lumaAccordionContent>
            <p>
              Luma UI is a Neo-Minimal design system for Angular applications,
              built with accessibility and customization in mind.
            </p>
          </div>
        </luma-accordion-item>
      }
      @case ('variants') {
        <div class="w-full space-y-6">
          <!-- Default Variant -->
          <div>
            <p class="text-xs lm-text-secondary mb-2 font-medium">Default</p>
            <luma-accordion-item lmVariant="default">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Default Variant</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Standard accordion with subtle border
              </div>
            </luma-accordion-item>
          </div>

          <!-- Filled Variant -->
          <div>
            <p class="text-xs lm-text-secondary mb-2 font-medium">Filled</p>
            <luma-accordion-item lmVariant="filled">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Filled Variant</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Accordion with visible border and border radius
              </div>
            </luma-accordion-item>
          </div>

          <!-- Filled Variant -->
          <div>
            <p class="text-xs lm-text-secondary mb-2 font-medium">Filled</p>
            <luma-accordion-item lmVariant="filled">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Filled Variant</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Unified solid background without border
              </div>
            </luma-accordion-item>
          </div>
        </div>
      }
      @case ('accordion-group') {
        <div class="w-full space-y-3">
          <div class="text-xs lm-text-secondary px-1">
            Active:
            <code class="lm-bg-surface-base px-1.5 py-0.5 rounded font-mono">{{
              singleValue() || 'none'
            }}</code>
          </div>
          <luma-accordion-group
            [lmValue]="singleValue()"
            (lmValueChange)="singleValue.set($any($event))"
          >
            <luma-accordion-item lmId="item-1">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>First Item</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Content for the first accordion item.
              </div>
            </luma-accordion-item>
            <luma-accordion-item lmId="item-2">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Second Item</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Content for the second accordion item.
              </div>
            </luma-accordion-item>
            <luma-accordion-item lmId="item-3">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Third Item</span>
                <span lumaAccordionIcon>
                  <svg viewBox="0 0 24 24" class="w-4 h-4">
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      fill="none"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              <div lumaAccordionContent>
                Content for the third accordion item.
              </div>
            </luma-accordion-item>
          </luma-accordion-group>
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
export class AccordionPreviewsComponent {
  exampleId = input.required<string>();

  // State for Controlled Group
  singleValue = signal<string>('item-1');
}
