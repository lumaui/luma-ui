import { Component, computed, inject } from '@angular/core';
import {
  DocImport,
  DocsRegistryService,
} from '../../services/docs-registry.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  LmCardComponent,
  LmTabsComponent,
  LmTabsIndicatorComponent,
  LmTabsListDirective,
  LmTabsPanelDirective,
  LmTabsTriggerDirective,
} from '@lumaui/angular';

import { ActivatedRoute } from '@angular/router';
import { ExamplePreviewComponent } from '../../components/example-preview/example-preview.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-component-docs',
  imports: [
    SidebarComponent,
    ExamplePreviewComponent,
    LmCardComponent,
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
    LmTabsIndicatorComponent,
  ],
  templateUrl: './component-docs.component.html',
  host: {
    class: 'block',
  },
})
export class ComponentDocsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly registry = inject(DocsRegistryService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
  );

  readonly component = computed(() => {
    const slug = this.slug();
    if (!slug) return undefined;
    return this.registry.getComponent(slug);
  });

  /**
   * Sanitized version of highlightedImportCode that bypasses Angular's default HTML sanitization.
   * This is safe because:
   * 1. The HTML comes from our build process (Shiki), not user input
   * 2. Shiki is a trusted library that generates safe HTML
   * 3. We only bypass sanitization for inline style attributes used for syntax colors
   */
  readonly sanitizedImportCode = computed(() => {
    const comp = this.component();
    if (!comp?.highlightedImportCode) return null;
    return this.sanitizer.bypassSecurityTrustHtml(comp.highlightedImportCode);
  });

  slugify(title: string): string {
    // Note: This duplicates tools/utils/slugify.ts logic
    // Cannot import from tools in Angular app due to build constraints
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  isColor(value: string): boolean {
    return (
      value.startsWith('oklch') ||
      value.startsWith('#') ||
      value.startsWith('rgb') ||
      value.startsWith('hsl')
    );
  }

  getOverrideLabel(type: 'global' | 'theme' | 'component'): string {
    const labels = {
      global: 'Global',
      theme: 'Per Theme',
      component: 'Per Component',
    };
    return labels[type];
  }

  async copyCode(code: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  /**
   * Generate TypeScript import statement from imports array
   */
  getImportStatement(imports: DocImport[]): string {
    if (!imports || imports.length === 0) return '';

    // Group imports by module
    const byModule = new Map<string, string[]>();
    for (const imp of imports) {
      const names = byModule.get(imp.module) || [];
      names.push(imp.name);
      byModule.set(imp.module, names);
    }

    // Generate import statements
    const statements: string[] = [];
    for (const [module, names] of byModule) {
      if (names.length <= 2) {
        // Single line for 1-2 imports
        statements.push(`import { ${names.join(', ')} } from '${module}';`);
      } else {
        // Multi-line for 3+ imports
        const formattedNames = names.map((n) => `  ${n},`).join('\n');
        statements.push(`import {\n${formattedNames}\n} from '${module}';`);
      }
    }

    return statements.join('\n\n');
  }
}
