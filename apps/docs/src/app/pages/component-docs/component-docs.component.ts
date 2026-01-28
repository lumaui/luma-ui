import { Component, computed, inject, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '@lumaui/angular';
import { DocsRegistryService } from '../../services/docs-registry.service';
import { ExamplePreviewComponent } from '../../components/example-preview/example-preview.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type TabType = 'examples' | 'tokens' | 'customizing' | 'api';

@Component({
  selector: 'app-component-docs',
  imports: [SidebarComponent, ExamplePreviewComponent, CardComponent],
  template: `
    <div class="max-w-7xl mx-auto flex mt-16">
      <app-sidebar />
      <div class="flex-1 px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        @if (component(); as comp) {
          <!-- Header -->
          <div class="mb-8 sm:mb-12">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-semibold lm-text-primary mb-3 sm:mb-4"
            >
              {{ comp.name }}
            </h1>
            <p
              class="text-sm sm:text-base md:text-lg lm-text-secondary leading-relaxed"
            >
              {{ comp.description }}
            </p>
            <div class="mt-4 flex items-center gap-4 text-sm lm-text-secondary">
              <span
                class="px-2.5 py-1 rounded-full lm-bg-surface-base border lm-border-text-secondary/10"
              >
                {{ comp.type }}
              </span>
              <code
                class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded"
                >{{ comp.selector }}</code
              >
            </div>
          </div>

          <!-- Tabs -->
          <div
            class="border-b lm-border-text-secondary/10 mb-6 sm:mb-8 overflow-x-auto"
          >
            <nav class="flex gap-6 sm:gap-8 min-w-max">
              <button
                (click)="setActiveTab('examples')"
                [class.active]="activeTab() === 'examples'"
                class="tab-button pb-3 text-sm sm:text-base whitespace-nowrap border-b-2 transition-colors"
              >
                Examples
              </button>
              <button
                (click)="setActiveTab('tokens')"
                [class.active]="activeTab() === 'tokens'"
                class="tab-button pb-3 text-sm sm:text-base whitespace-nowrap border-b-2 transition-colors"
              >
                Tokens
              </button>
              @if (
                comp.customization && comp.customization.examples.length > 0
              ) {
                <button
                  (click)="setActiveTab('customizing')"
                  [class.active]="activeTab() === 'customizing'"
                  class="tab-button pb-3 text-sm sm:text-base whitespace-nowrap border-b-2 transition-colors"
                >
                  Customizing
                </button>
              }
              <button
                (click)="setActiveTab('api')"
                [class.active]="activeTab() === 'api'"
                class="tab-button pb-3 text-sm sm:text-base whitespace-nowrap border-b-2 transition-colors"
              >
                API
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          @switch (activeTab()) {
            @case ('examples') {
              <div class="space-y-8">
                @for (example of comp.examples; track example.title) {
                  <section>
                    <h3 class="text-lg font-medium lm-text-primary mb-4">
                      {{ example.title }}
                    </h3>
                    <app-example-preview
                      [componentSlug]="comp.slug"
                      [exampleId]="slugify(example.title)"
                      [code]="example.code"
                      [language]="example.language || 'html'"
                    />
                  </section>
                }
              </div>
            }
            @case ('tokens') {
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead>
                    <tr
                      class="border-b lm-border-text-secondary/10 lm-text-secondary"
                    >
                      <th class="pb-3 pr-6 font-medium text-sm">Token</th>
                      <th class="pb-3 pr-6 font-medium text-sm">Value</th>
                      <th class="pb-3 font-medium text-sm">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-text-secondary/5">
                    @for (token of comp.tokens; track token.name) {
                      <tr class="text-sm">
                        <td class="py-3 pr-6">
                          <code
                            class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded"
                            >{{ token.name }}</code
                          >
                        </td>
                        <td class="py-3 pr-6">
                          <div class="flex items-center gap-2">
                            @if (isColor(token.value)) {
                              <span
                                class="w-4 h-4 rounded border lm-border-text-secondary/20"
                                [style.background]="token.value"
                              ></span>
                            }
                            <code class="font-mono text-xs lm-text-secondary">{{
                              token.value
                            }}</code>
                          </div>
                        </td>
                        <td class="py-3 lm-text-secondary">
                          {{ token.description }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
            @case ('customizing') {
              <div class="space-y-8">
                <!-- Introduction -->
                @if (comp.customization.intro) {
                  <p class="lm-text-secondary leading-relaxed">
                    {{ comp.customization.intro }}
                  </p>
                }

                <!-- Customization Examples -->
                @for (
                  example of comp.customization.examples;
                  track example.title
                ) {
                  <section class="space-y-3">
                    <div class="flex items-center gap-3">
                      <h3 class="text-base font-medium lm-text-primary">
                        {{ example.title }}
                      </h3>
                      <span
                        class="text-xs px-2 py-0.5 rounded-full bg-surface-elevated lm-text-secondary"
                      >
                        {{ getOverrideLabel(example.overrideType) }}
                      </span>
                    </div>
                    @if (example.description) {
                      <p class="text-sm lm-text-secondary">
                        {{ example.description }}
                      </p>
                    }
                    <luma-card lmVariant="preview">
                      <div class="-m-5 overflow-hidden rounded-[inherit]">
                        <div
                          class="px-4 py-2 flex items-center justify-between border-b lm-border-text-secondary/5"
                        >
                          <span class="text-xs lm-text-secondary font-mono"
                            >CSS</span
                          >
                          <button
                            (click)="copyCode(example.code)"
                            class="text-xs lm-text-secondary hover:lm-text-primary transition-colors flex items-center gap-1.5"
                          >
                            <svg
                              class="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                              />
                            </svg>
                            <span>Copy</span>
                          </button>
                        </div>
                        <pre
                          class="p-4 overflow-x-auto text-sm"
                        ><code class="font-mono lm-text-primary whitespace-pre">{{ example.code }}</code></pre>
                      </div>
                    </luma-card>
                  </section>
                }
              </div>
            }
            @case ('api') {
              <div class="space-y-8">
                <!-- Inputs -->
                @if (comp.inputs.length > 0) {
                  <section>
                    <h3 class="text-lg font-medium lm-text-primary mb-4">
                      Inputs
                    </h3>
                    <div class="overflow-x-auto">
                      <table class="w-full text-left">
                        <thead>
                          <tr
                            class="border-b lm-border-text-secondary/10 lm-text-secondary"
                          >
                            <th class="pb-3 pr-6 font-medium text-sm">Name</th>
                            <th class="pb-3 pr-6 font-medium text-sm">Type</th>
                            <th class="pb-3 pr-6 font-medium text-sm">
                              Default
                            </th>
                            <th class="pb-3 font-medium text-sm">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-text-secondary/5">
                          @for (input of comp.inputs; track input.name) {
                            <tr class="text-sm">
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded"
                                  >{{ input.name }}</code
                                >
                              </td>
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-text-secondary"
                                  >{{ input.type }}</code
                                >
                              </td>
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-text-secondary"
                                  >{{ input.default }}</code
                                >
                              </td>
                              <td class="py-3 lm-text-secondary">
                                {{ input.description }}
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </section>
                }

                <!-- Selector -->
                <section>
                  <h3 class="text-lg font-medium lm-text-primary mb-4">
                    Selector
                  </h3>
                  <code
                    class="font-mono text-sm lm-bg-surface-base px-3 py-2 rounded block"
                    >{{ comp.selector }}</code
                  >
                </section>
              </div>
            }
          }
        } @else {
          <div class="text-center py-16">
            <h2 class="text-xl font-medium lm-text-primary mb-2">
              Component not found
            </h2>
            <p class="lm-text-secondary">
              The requested component documentation could not be found.
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

      .tab-button {
        border-bottom-color: transparent;
        color: var(--luma-color-text-secondary);
      }

      .tab-button:hover {
        color: var(--luma-color-text-primary);
        border-bottom-color: var(--luma-color-text-secondary);
      }

      .tab-button.active {
        color: var(--luma-color-primary);
        border-bottom-color: var(--luma-color-primary);
      }
    `,
  ],
})
export class ComponentDocsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly registry = inject(DocsRegistryService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
  );

  readonly component = computed(() => {
    const slug = this.slug();
    if (!slug) return undefined;
    return this.registry.getComponent(slug);
  });

  readonly activeTab = signal<TabType>('examples');

  setActiveTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  slugify(title: string): string {
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
}
