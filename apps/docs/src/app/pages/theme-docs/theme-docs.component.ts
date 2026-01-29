import { Component, computed, inject } from '@angular/core';
import {
  DocsRegistryService,
  ThemeToken,
} from '../../services/docs-registry.service';

import { ActivatedRoute } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-theme-docs',
  imports: [SidebarComponent],
  template: `
    <div class="max-w-7xl mx-auto flex mt-16">
      <app-sidebar />
      <div class="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        @if (themePage(); as page) {
          <!-- Header -->
          <div class="mb-8 sm:mb-12">
            <div class="flex items-center gap-3 mb-3 sm:mb-4">
              <span
                class="text-xs px-2 py-1 rounded-full lm-bg-surface-base border lm-border-text-secondary/10 lm-text-secondary"
              >
                Theme
              </span>
            </div>
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-semibold lm-text-primary mb-3 sm:mb-4"
            >
              {{ page.name }}
            </h1>
            <p
              class="text-sm sm:text-base md:text-lg lm-text-secondary leading-relaxed"
            >
              {{ page.description }}
            </p>
          </div>

          <!-- Purpose Section -->
          @if (page.sections.purpose) {
            <section class="mb-8 sm:mb-12">
              <h2 class="text-lg sm:text-xl font-medium lm-text-primary mb-4">
                Purpose
              </h2>
              <div
                class="lm-text-secondary leading-relaxed whitespace-pre-line"
              >
                {{ page.sections.purpose }}
              </div>
            </section>
          }

          <!-- Token Groups -->
          <section class="mb-8 sm:mb-12">
            <h2 class="text-lg sm:text-xl font-medium lm-text-primary mb-6">
              Tokens
            </h2>

            @for (group of page.groups; track group.name) {
              <div class="mb-8">
                <h3
                  class="text-base font-medium lm-text-primary mb-4 pb-2 border-b lm-border-text-secondary/10"
                >
                  {{ group.name }}
                </h3>

                <div class="overflow-x-auto">
                  <table class="w-full text-left">
                    <thead>
                      <tr class="lm-text-secondary">
                        <th class="pb-3 pr-4 font-medium text-sm">Token</th>
                        <th class="pb-3 pr-4 font-medium text-sm">Light</th>
                        @if (hasDarkValues(group.tokens)) {
                          <th class="pb-3 pr-4 font-medium text-sm">Dark</th>
                        }
                        <th class="pb-3 font-medium text-sm">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (token of group.tokens; track token.name) {
                        <tr class="text-sm table-row-striped">
                          <td class="py-3 pr-4">
                            <code
                              class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded cursor-pointer hover:lm-bg-primary-50/10 transition-colors"
                              (click)="copyToClipboard(token.name)"
                              (keyup)="onCodeKeyup($event, token.name)"
                              tabindex="0"
                              title="Click to copy"
                            >
                              {{ token.name }}
                            </code>
                          </td>
                          <td class="py-3 pr-4">
                            <div class="flex items-center gap-2">
                              @if (isColor(token.type)) {
                                <span
                                  class="w-5 h-5 rounded shrink-0"
                                  [style.background]="token.value"
                                ></span>
                              }
                              <code class="font-mono text-xs lm-text-secondary">
                                {{ token.value }}
                              </code>
                            </div>
                          </td>
                          @if (hasDarkValues(group.tokens)) {
                            <td class="py-3 pr-4">
                              @if (token.darkValue) {
                                <div class="flex items-center gap-2">
                                  @if (isColor(token.type)) {
                                    <span
                                      class="w-5 h-5 rounded shrink-0"
                                      [style.background]="token.darkValue"
                                    ></span>
                                  }
                                  <code
                                    class="font-mono text-xs lm-text-secondary"
                                  >
                                    {{ token.darkValue }}
                                  </code>
                                </div>
                              } @else {
                                <span class="lm-text-secondary/50">—</span>
                              }
                            </td>
                          }
                          <td class="py-3 lm-text-secondary">
                            {{ token.description }}
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </section>

          <!-- Neo-Minimal Section -->
          @if (page.sections.neoMinimal) {
            <section class="mb-8 sm:mb-12">
              <h2 class="text-lg sm:text-xl font-medium lm-text-primary mb-4">
                Neo-Minimal Principles
              </h2>
              <div
                class="lm-text-secondary leading-relaxed whitespace-pre-line"
              >
                {{ page.sections.neoMinimal }}
              </div>
            </section>
          }

          <!-- Usage Section -->
          @if (page.sections.usage) {
            <section class="mb-8 sm:mb-12">
              <h2 class="text-lg sm:text-xl font-medium lm-text-primary mb-4">
                Usage
              </h2>
              <div
                class="lm-text-secondary leading-relaxed whitespace-pre-line"
              >
                {{ page.sections.usage }}
              </div>
            </section>
          }
        } @else {
          <div class="text-center py-16">
            <h2 class="text-xl font-medium lm-text-primary mb-2">
              Theme page not found
            </h2>
            <p class="lm-text-secondary">
              The requested theme documentation could not be found.
            </p>
          </div>
        }
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
