import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

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
  /** Code content to display */
  code = input.required<string>();

  /** Programming language for syntax highlighting */
  language = input<CodeLanguage>('text');

  /** Whether to show line numbers */
  showLineNumbers = input<boolean>(false);

  /** Optional title/label for the code block */
  title = input<string>('');

  /** Copy state for feedback */
  copied = false;

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

  /** Copy code to clipboard */
  async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
