import { Component, Input, signal, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentDirective } from '../../../../../../packages/components/src';

@Component({
  selector: 'app-code-preview',
  standalone: true,
  imports: [CommonModule, CardComponent, CardContentDirective],
  templateUrl: './code-preview.component.html',
  styles: [`
    :host {
      display: block;
    }

    pre {
      margin: 0;
      font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
    }

    code {
      white-space: pre;
      display: block;
      line-height: 1.5;
    }
  `]
})
export class CodePreviewComponent {
  @Input({ required: true }) code!: string;
  @Input() language = 'typescript';
  @Input({ required: true }) preview!: TemplateRef<unknown>;
  @Input() title?: string;

  showCode = signal(false);
  copied = signal(false);

  toggleCode() {
    this.showCode.update(v => !v);
  }

  async copyCode() {
    try {
      await navigator.clipboard.writeText(this.code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }
}
