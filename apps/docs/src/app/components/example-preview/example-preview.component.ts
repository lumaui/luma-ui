import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';

import { AccordionPreviewsComponent } from '../previews/accordion-previews.component';
import { BadgePreviewsComponent } from '../previews/badge-previews.component';
import { ButtonPreviewsComponent } from '../previews/button-previews.component';
import { CardComponent } from '@lumaui/angular';
import { CardPreviewsComponent } from '../previews/card-previews.component';
import { TooltipPreviewsComponent } from '../previews/tooltip-previews.component';
import { TabsPreviewsComponent } from '../previews/tabs-previews.component';
import { ModalPreviewsComponent } from '../previews/modal-previews.component';

type TabType = 'preview' | 'code';

@Component({
  selector: 'app-example-preview',
  imports: [
    AccordionPreviewsComponent,
    BadgePreviewsComponent,
    ButtonPreviewsComponent,
    CardPreviewsComponent,
    TooltipPreviewsComponent,
    TabsPreviewsComponent,
    ModalPreviewsComponent,
    CardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <luma-card lmVariant="preview">
      <div class="-m-5 overflow-hidden rounded-[inherit]">
        <!-- Header with tabs and copy button -->
        <div
          class="px-4 py-2 flex items-center justify-between border-b lm-border-neutral-70"
        >
          <div class="flex gap-4">
            @if (isPreviewable()) {
              <button
                (click)="setActiveTab('preview')"
                class="text-xs font-medium transition-colors"
                [class]="
                  activeTab() === 'preview'
                    ? 'text-primary'
                    : 'lm-text-secondary hover:lm-text-primary'
                "
              >
                Preview
              </button>
            }
            <button
              (click)="setActiveTab('code')"
              class="text-xs font-medium transition-colors"
              [class]="
                activeTab() === 'code'
                  ? 'text-primary'
                  : 'lm-text-secondary hover:lm-text-primary'
              "
            >
              Code
            </button>
          </div>
          <button
            (click)="copyCode()"
            class="text-xs lm-text-secondary hover:lm-text-primary transition-colors flex items-center gap-1.5"
          >
            @if (copied()) {
              <svg
                class="w-3.5 h-3.5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Copied!</span>
            } @else {
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span>Copy</span>
            }
          </button>
        </div>

        <!-- Content Area -->
        @switch (activeTab()) {
          @case ('preview') {
            <div class="p-6 flex items-center justify-center min-h-[140px]">
              @switch (componentSlug()) {
                @case ('button') {
                  <app-button-previews [exampleId]="exampleId()" />
                }
                @case ('card') {
                  <div class="w-full max-w-lg">
                    <app-card-previews [exampleId]="exampleId()" />
                  </div>
                }
                @case ('accordion') {
                  <div class="w-full max-w-lg">
                    <app-accordion-previews [exampleId]="exampleId()" />
                  </div>
                }
                @case ('badge') {
                  <app-badge-previews [exampleId]="exampleId()" />
                }
                @case ('tooltip') {
                  <app-tooltip-previews [exampleId]="exampleId()" />
                }
                @case ('tabs') {
                  <div class="w-full max-w-lg">
                    <app-tabs-previews [exampleId]="exampleId()" />
                  </div>
                }
                @case ('modal') {
                  <div class="w-full max-w-xl">
                    <app-modal-previews [exampleId]="exampleId()" />
                  </div>
                }
                @default {
                  <div class="lm-text-secondary text-sm">
                    Preview not available
                  </div>
                }
              }
            </div>
          }
          @case ('code') {
            <pre
              class="p-4 overflow-x-auto text-sm"
            ><code class="font-mono lm-text-primary whitespace-pre">{{ code() }}</code></pre>
          }
        }
      </div>
    </luma-card>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ExamplePreviewComponent {
  componentSlug = input.required<string>();
  exampleId = input.required<string>();
  code = input.required<string>();
  language = input<string>('html');

  activeTab = signal<TabType>('preview');
  copied = signal(false);

  isPreviewable = computed(() => {
    const lang = this.language();
    // CSS, TypeScript, and JavaScript examples are code-only
    return (
      lang !== 'css' &&
      lang !== 'typescript' &&
      lang !== 'ts' &&
      lang !== 'javascript' &&
      lang !== 'js'
    );
  });

  constructor() {
    // Set initial tab based on previewability
    effect(() => {
      if (!this.isPreviewable()) {
        this.activeTab.set('code');
      }
    });
  }

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
