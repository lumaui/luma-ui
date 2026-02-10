import { Component, computed, inject } from '@angular/core';
import {
  DocsRegistryService,
  ThemeToken,
} from '../../services/docs-registry.service';

import { ActivatedRoute } from '@angular/router';
import { LmCardComponent } from '@lumaui/angular';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-theme-docs',
  imports: [SidebarComponent, LmCardComponent],
  templateUrl: './theme-docs.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ThemeDocsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly registry = inject(DocsRegistryService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
  );

  readonly themePage = computed(() => {
    const slug = this.slug();
    if (!slug) return undefined;
    return this.registry.getThemePage(slug);
  });

  isColor(type: string): boolean {
    return type === 'color';
  }

  hasDarkValues(tokens: ThemeToken[]): boolean {
    return tokens.some((t) => t.darkValue !== undefined);
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  onCodeKeyup(event: KeyboardEvent, text: string): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.copyToClipboard(text);
    }
  }
}
