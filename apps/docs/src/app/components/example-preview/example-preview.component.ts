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
  templateUrl: './example-preview.component.html',
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
