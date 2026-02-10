import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  LmTabsComponent,
  LmTabsListDirective,
  LmTabsPanelDirective,
  LmTabsTriggerDirective,
} from '@lumaui/angular';

import { AccordionPreviewsComponent } from '../previews/accordion-previews.component';
import { BadgePreviewsComponent } from '../previews/badge-previews.component';
import { ButtonPreviewsComponent } from '../previews/button-previews.component';
import { CardPreviewsComponent } from '../previews/card-previews.component';
import { ModalPreviewsComponent } from '../previews/modal-previews.component';
import { TabsPreviewsComponent } from '../previews/tabs-previews.component';
import { ToastPreviewsComponent } from '../previews/toast-previews.component';
import { TooltipPreviewsComponent } from '../previews/tooltip-previews.component';

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
    ToastPreviewsComponent,
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-lg overflow-hidden border border-border">
      <luma-tabs [lmDefaultValue]="defaultTab()" [lmLazy]="false">
        <!-- Header with tabs -->
        <div class="px-4 py-2">
          <div lumaTabsList class="flex gap-4">
            @if (isPreviewable()) {
              <button lumaTabsTrigger="preview" class="text-xs font-medium">
                Preview
              </button>
            }
            <button lumaTabsTrigger="code" class="text-xs font-medium">
              Code
            </button>
          </div>
        </div>

        <!-- Preview Panel -->
        @if (isPreviewable()) {
          <div
            lumaTabsPanel="preview"
            class="p-6 flex items-center justify-center min-h-[140px]"
          >
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
              @case ('toast') {
                <app-toast-previews [exampleId]="exampleId()" />
              }
              @default {
                <div class="lm-text-secondary text-sm">
                  Preview not available
                </div>
              }
            }
          </div>
        }

        <!-- Code Panel -->
        <div lumaTabsPanel="code">
          @if (sanitizedCode()) {
            <div
              class="p-4 overflow-x-auto text-sm [&_code]:font-mono"
              [innerHTML]="sanitizedCode()"
            ></div>
          } @else {
            <pre
              class="p-4 overflow-x-auto text-sm"
            ><code class="font-mono lm-text-primary whitespace-pre">{{ code() }}</code></pre>
          }
        </div>
      </luma-tabs>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class ExamplePreviewComponent {
  private readonly sanitizer = inject(DomSanitizer);

  componentSlug = input.required<string>();
  exampleId = input.required<string>();
  code = input.required<string>();
  language = input<string>('html');
  highlightedCode = input<string | undefined>();

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

  // Computed para determinar a tab padrão baseado no tipo de linguagem
  defaultTab = computed(() => (this.isPreviewable() ? 'preview' : 'code'));

  /**
   * Sanitized version of highlightedCode that bypasses Angular's default HTML sanitization.
   * This is safe because:
   * 1. The HTML comes from our build process (Shiki), not user input
   * 2. Shiki is a trusted library that generates safe HTML
   * 3. We only bypass sanitization for inline style attributes used for syntax colors
   */
  readonly sanitizedCode = computed(() => {
    const code = this.highlightedCode();
    if (!code) return null;
    return this.sanitizer.bypassSecurityTrustHtml(code);
  });
}
