import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CodePreviewComponent } from '../../components/code-preview/code-preview.component';
import { DocsRegistryService } from '../../services/docs-registry.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-getting-started-page',
  imports: [SidebarComponent, CodePreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './getting-started-page.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class GettingStartedPageComponent {
  private readonly registryService = inject(DocsRegistryService);

  // Get highlighted code from registry
  private readonly gettingStartedBlocks =
    this.registryService.gettingStartedBlocks;

  // Helper to get highlighted code for a specific block
  getHighlightedCode = (blockId: string): string | undefined => {
    return this.gettingStartedBlocks().find((b) => b.id === blockId)
      ?.highlightedCode;
  };

  // Code examples as readonly properties
  readonly installCommand = `npm install @lumaui/angular`;

  readonly importTokensExample = `/* styles.css or styles.scss */
@import '@lumaui/tokens/build/luma.css';`;

  readonly darkThemeExample = `/* Import dark theme tokens */
@import '@lumaui/tokens/build/luma.css';
@import '@lumaui/tokens/build/luma-dark.css';

/* Toggle dark theme by adding 'dark' class to <html> */`;

  readonly firstComponentTsExample = `import { Component } from '@angular/core';
import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-root',
  imports: [LmButtonDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {}`;

  readonly firstComponentHtmlExample = `<button lumaButton lmVariant="primary" lmSize="md">
  Click Me
</button>

<button lumaButton lmVariant="outline" lmSize="lg">
  Secondary Action
</button>`;
}
