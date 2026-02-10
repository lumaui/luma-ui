import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

/**
 * Supported languages for code blocks
 */
export type CodeLanguage =
  | 'css'
  | 'typescript'
  | 'html'
  | 'json'
  | 'bash'
  | 'text';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class CodeBlockComponent {
  private sanitizer = inject(DomSanitizer);

  /** Code content to display */
  code = input.required<string>();

  /** Programming language for syntax highlighting */
  language = input<CodeLanguage>('text');

  /** Whether to show line numbers */
  showLineNumbers = input<boolean>(false);

  /** Optional title/label for the code block */
  title = input<string>('');

  /** Optional pre-highlighted HTML from Shiki (build-time highlighting) */
  highlightedCode = input<string | undefined>(undefined);

  /** Language display label */
  languageLabel = computed(() => {
    const labelMap: Record<CodeLanguage, string> = {
      css: 'CSS',
      typescript: 'TypeScript',
      html: 'HTML',
      json: 'JSON',
      bash: 'Bash',
      text: 'Text',
    };
    return labelMap[this.language()];
  });

  /** Split code into lines for line number display */
  codeLines = computed(() => {
    return this.code().split('\n');
  });

  /** Safe HTML for Shiki highlighted code */
  readonly safeHighlightedCode = computed<SafeHtml | null>(() => {
    const html = this.highlightedCode();
    if (!html) return null;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });
}
