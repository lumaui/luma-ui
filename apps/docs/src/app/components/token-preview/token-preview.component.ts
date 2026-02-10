import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CodeBlockComponent } from '../code-block/code-block.component';
import { CommonModule } from '@angular/common';
import { DocsRegistryService } from '../../services/docs-registry.service';

export interface TokenPreviewData {
  name: string;
  description: string;
  value: string;
  category: 'shadow' | 'radius';
  cssExample: string;
}

@Component({
  selector: 'app-token-preview',
  imports: [CommonModule, CodeBlockComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8">
      <h4 class="text-base font-semibold text-foreground mb-2">
        {{ token().name }} - {{ token().description }}
      </h4>

      <!-- Visual Preview -->
      <div
        class="bg-gray-1 rounded-lg p-10 flex items-center justify-center border border-border"
      >
        @if (token().category === 'shadow') {
          <div
            class="w-[120px] h-[80px] bg-background rounded-lg"
            [style.box-shadow]="token().value"
          ></div>
        } @else if (token().category === 'radius') {
          <div
            class="w-[120px] h-[80px] bg-primary/20"
            [style.border-radius]="token().value"
          ></div>
        }
      </div>

      <!-- Code Example with Shiki Highlighting -->
      <app-code-block
        [code]="token().cssExample"
        [highlightedCode]="highlightedCssExample()"
        language="css"
        [showLineNumbers]="false"
      />
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class TokenPreviewComponent {
  private docsRegistry = inject(DocsRegistryService);

  token = input.required<TokenPreviewData>();

  /** Get highlighted CSS example from registry */
  readonly highlightedCssExample = computed<string | undefined>(() => {
    const token = this.token();
    if (!token?.cssExample) return undefined;

    // Create ID based on token name (matches convention in generate-docs-registry.ts)
    const blockId = token.name.toLowerCase().replace(/\s+/g, '-') + '-example';
    return this.docsRegistry.getHighlightedStylingCode(blockId);
  });
}
