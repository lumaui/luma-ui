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
  templateUrl: './token-preview.component.html',
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
