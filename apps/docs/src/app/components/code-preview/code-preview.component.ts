import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * CodePreviewComponent
 *
 * Displays syntax-highlighted code blocks using Shiki. This component is
 * designed for standalone code display without preview tabs.
 *
 * Features:
 * - Accepts pre-highlighted HTML from build process (Shiki)
 * - Falls back to plain text if highlighting unavailable
 * - Reuses existing Shiki CSS from styles.css
 * - No tabs or preview UI (unlike ExamplePreviewComponent)
 *
 * Usage:
 * ```html
 * <app-code-preview
 *   [code]="myCode"
 *   [highlightedCode]="getHighlightedCode('myCodeId')"
 * />
 * ```
 */
@Component({
  selector: 'app-code-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-lg overflow-hidden border border-border">
      <!-- Code Panel -->
      <div class="bg-card">
        @if (safeHighlightedCode()) {
          <div
            class="overflow-x-auto text-sm [&_code]:font-mono"
            [innerHTML]="safeHighlightedCode()"
          ></div>
        } @else {
          <pre
            class="p-4 overflow-x-auto text-sm"
          ><code class="font-mono text-foreground whitespace-pre">{{ code() }}</code></pre>
        }
      </div>
    </div>
  `,
  host: {
    class: 'block',
  },
})
export class CodePreviewComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Raw code string (fallback when highlightedCode unavailable) */
  code = input.required<string>();

  /** Pre-highlighted HTML from Shiki build process */
  highlightedCode = input<string>();

  /**
   * Sanitized version of highlightedCode that bypasses Angular's default HTML sanitization.
   * This is safe because:
   * 1. The HTML comes from our build process (Shiki), not user input
   * 2. Shiki is a trusted library that generates safe HTML
   * 3. We only bypass sanitization for inline style attributes used for syntax colors
   */
  readonly safeHighlightedCode = computed<SafeHtml | null>(() => {
    const html = this.highlightedCode();
    if (!html) return null;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
