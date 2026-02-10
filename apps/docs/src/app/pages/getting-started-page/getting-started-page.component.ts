import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CodePreviewComponent } from '../../components/code-preview/code-preview.component';
import { DocsRegistryService } from '../../services/docs-registry.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-getting-started-page',
  imports: [SidebarComponent, CodePreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 md:mt-16">
      <app-sidebar />
      <div class="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <!-- Hero -->
        <div class="mb-12">
          <h1
            class="text-4xl font-bold text-foreground mb-4 tracking-tight leading-tight"
          >
            Getting Started
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Get up and running with Luma UI in minutes. Follow these simple
            steps to integrate our Neo-Minimal design system into your Angular
            application.
          </p>
        </div>

        <!-- Prerequisites -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            Prerequisites
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Before installing Luma UI, ensure you have the following set up in
            your project:
          </p>
          <div class="bg-muted/30 rounded-lg p-6 space-y-3 my-6">
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span>
                  <strong class="text-foreground">Angular 20+:</strong>
                  Luma UI requires Angular 20 or higher with standalone
                  components support
                </span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span>
                  <strong class="text-foreground">Tailwind CSS v4:</strong>
                  Our design tokens are built on Tailwind CSS v4.
                  <a
                    href="https://tailwindcss.com/docs/installation"
                    class="text-primary hover:underline"
                    target="_blank"
                    rel="noopener"
                  >
                    Install Tailwind CSS
                  </a>
                  if you haven't already
                </span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span>
                  <strong class="text-foreground">Node.js & npm:</strong>
                  Ensure you have Node.js 18+ and npm 9+ installed
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Installation -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            Installation
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Install the Luma UI package via npm:
          </p>
          <app-code-preview
            [code]="installCommand"
            [highlightedCode]="getHighlightedCode('installCommand')"
          />
        </section>

        <!-- Setup -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            Setup
          </h2>

          <!-- Import CSS Tokens -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              1. Import Design Tokens
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Import the Luma CSS tokens in your global stylesheet to enable all
              design tokens and theme variables:
            </p>
            <app-code-preview
              [code]="importTokensExample"
              [highlightedCode]="getHighlightedCode('importTokensExample')"
            />
          </div>

          <!-- Configure Tailwind (if needed) -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              2. Configure Tailwind CSS
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              If you haven't set up Tailwind CSS yet, follow the
              <a
                href="https://tailwindcss.com/docs/installation/framework-guides/angular"
                class="text-primary hover:underline"
                target="_blank"
                rel="noopener"
              >
                official Tailwind installation guide for Angular </a
              >. Once installed, Luma's design tokens are automatically
              available as standard Tailwind utilities (e.g.,
              <code class="text-xs bg-muted/30 px-1.5 py-0.5 rounded"
                >bg-primary</code
              >,
              <code class="text-xs bg-muted/30 px-1.5 py-0.5 rounded"
                >text-foreground</code
              >,
              <code class="text-xs bg-muted/30 px-1.5 py-0.5 rounded"
                >rounded-md</code
              >).
            </p>
            <p class="text-sm text-muted-foreground">
              No additional Tailwind configuration is needed for Luma—the tokens
              are pre-compiled and ready to use after importing them in Step 1.
            </p>
          </div>

          <!-- Dark Theme (optional) -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              3. Enable Dark Theme (Optional)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              For dark theme support, import the dark theme tokens and toggle
              the <code class="text-xs">dark</code> class on your root element:
            </p>
            <app-code-preview
              [code]="darkThemeExample"
              [highlightedCode]="getHighlightedCode('darkThemeExample')"
            />
          </div>
        </section>

        <!-- First Component -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            First Usage
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Import and use a Luma component in your Angular application. Here's
            a simple example using the Button component:
          </p>

          <!-- TypeScript Import -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Import in Component
            </h3>
            <app-code-preview
              [code]="firstComponentTsExample"
              [highlightedCode]="getHighlightedCode('firstComponentTsExample')"
            />
          </div>

          <!-- HTML Usage -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Use in Template
            </h3>
            <app-code-preview
              [code]="firstComponentHtmlExample"
              [highlightedCode]="
                getHighlightedCode('firstComponentHtmlExample')
              "
            />
          </div>
        </section>
      </div>
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
