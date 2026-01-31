import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import {
  AccordionItemComponent,
  AccordionGroupComponent,
  AccordionTriggerDirective,
  AccordionTitleDirective,
  AccordionIconDirective,
  AccordionContentDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-accordion-previews',
  imports: [
    AccordionItemComponent,
    AccordionGroupComponent,
    AccordionTriggerDirective,
    AccordionTitleDirective,
    AccordionIconDirective,
    AccordionContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-standalone') {
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
      @case ('visual-variants') {
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

          <!-- Bordered Variant -->
          <div>
            <p class="text-xs lm-text-secondary mb-2 font-medium">Bordered</p>
            <luma-accordion-item lmVariant="bordered">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Bordered Variant</span>
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
      @case ('custom-trigger-layout') {
        <luma-accordion-item class="w-full">
          <div lumaAccordionTrigger>
            <!-- Icon with soft background -->
            <div
              class="w-10 h-10 rounded-lg lm-bg-primary/10 flex items-center justify-center shrink-0"
            >
              <svg
                class="w-5 h-5 lm-text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            <!-- Title and description -->
            <div class="flex-1 text-left min-w-0">
              <span lumaAccordionTitle>Lightning Fast Performance</span>
              <p class="text-sm lm-text-secondary mt-0.5 truncate">
                Optimized for speed and efficiency
              </p>
            </div>

            <!-- Chevron -->
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
              Our components are built with performance in mind, using OnPush
              change detection and optimized rendering strategies for smooth
              user experiences.
            </p>
          </div>
        </luma-accordion-item>
      }
      @case ('controlled-group-single-mode') {
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
      @case ('controlled-group-multiple-mode') {
        <div class="w-full space-y-3">
          <div class="text-xs lm-text-secondary px-1">
            Active:
            <code class="lm-bg-surface-base px-1.5 py-0.5 rounded font-mono">{{
              multipleValue().length ? multipleValue().join(', ') : 'none'
            }}</code>
          </div>
          <luma-accordion-group
            [lmValue]="multipleValue()"
            (lmValueChange)="multipleValue.set($any($event))"
          >
            <luma-accordion-item lmId="feature-1">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Feature One</span>
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
              <div lumaAccordionContent>Details about feature one.</div>
            </luma-accordion-item>
            <luma-accordion-item lmId="feature-2">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Feature Two</span>
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
              <div lumaAccordionContent>Details about feature two.</div>
            </luma-accordion-item>
            <luma-accordion-item lmId="feature-3">
              <div lumaAccordionTrigger>
                <span lumaAccordionTitle>Feature Three</span>
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
              <div lumaAccordionContent>Details about feature three.</div>
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

  // State for Controlled Group (Single Mode)
  singleValue = signal<string>('item-1');

  // State for Controlled Group (Multiple Mode)
  multipleValue = signal<string[]>(['feature-1']);
}
