import {
  LmCardComponent,
  LmTabsComponent,
  LmTabsIndicatorComponent,
  LmTabsListDirective,
  LmTabsPanelDirective,
  LmTabsTriggerDirective,
} from '@lumaui/angular';
import { Component, computed, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { DocsRegistryService } from '../../services/docs-registry.service';
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
  template: `
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row mt-8 md:mt-16">
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
                class="px-2.5 py-1 rounded-full lm-bg-surface-base border lm-border-neutral-70"
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
          <luma-tabs lmDefaultValue="examples">
            <div
              lumaTabsList
              class="border-b lm-border-neutral-70 mb-6 sm:mb-8 overflow-x-auto"
            >
              <button lumaTabsTrigger="examples">Examples</button>
              <button lumaTabsTrigger="tokens">Tokens</button>
              @if (
                comp.customization && comp.customization.examples.length > 0
              ) {
                <button lumaTabsTrigger="customizing">Customizing</button>
              }
              <button lumaTabsTrigger="specification">Specification</button>
              @if (comp.useCases && comp.useCases.length > 0) {
                <button lumaTabsTrigger="use-cases">Use Cases</button>
              }
              <luma-tabs-indicator />
            </div>

            <!-- Examples Panel -->
            <div lumaTabsPanel="examples" class="space-y-8">
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

            <!-- Tokens Panel -->
            <div lumaTabsPanel="tokens" class="space-y-8">
              @if (comp.tokenGroups && comp.tokenGroups.length > 0) {
                <!-- Grouped Tokens -->
                @for (group of comp.tokenGroups; track group.name) {
                  <section>
                    <h3 class="text-lg font-medium lm-text-primary mb-4 pb-2">
                      {{ group.name }}
                    </h3>

                    <!-- Desktop Table (md+) -->
                    <div class="hidden md:block overflow-x-auto">
                      <table class="w-full text-left table-fixed">
                        <thead>
                          <tr class="lm-text-secondary">
                            <th class="pb-3 pr-6 font-medium text-sm w-[40%]">
                              Token
                            </th>
                            <th class="pb-3 pr-6 font-medium text-sm w-[25%]">
                              Value
                            </th>
                            <th class="pb-3 font-medium text-sm w-[35%]">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (token of group.tokens; track token.name) {
                            <tr class="text-sm table-row-striped">
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded break-all"
                                  >{{ token.name }}</code
                                >
                              </td>
                              <td class="py-3 pr-6">
                                <div class="flex items-center gap-2">
                                  @if (isColor(token.value)) {
                                    <span
                                      class="w-4 h-4 rounded"
                                      [style.background]="token.value"
                                    ></span>
                                  }
                                  <code
                                    class="font-mono text-xs lm-text-secondary"
                                    >{{ token.value }}</code
                                  >
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

                    <!-- Mobile Cards (< md) -->
                    <div class="md:hidden space-y-3">
                      @for (token of group.tokens; track token.name) {
                        <luma-card>
                          <div class="flex items-start gap-3 mb-2">
                            @if (isColor(token.value)) {
                              <span
                                class="w-5 h-5 rounded shrink-0 mt-0.5"
                                [style.background]="token.value"
                              ></span>
                            }
                            <code
                              class="font-mono text-xs lm-text-primary break-all"
                              >{{ token.name }}</code
                            >
                          </div>
                          <p class="text-sm lm-text-secondary mb-3">
                            {{ token.description }}
                          </p>
                          <div
                            class="flex items-center gap-2 text-sm lm-text-secondary/70"
                          >
                            <span class="font-medium shrink-0">Value:</span>
                            <code class="font-mono break-all">{{
                              token.value
                            }}</code>
                          </div>
                        </luma-card>
                      }
                    </div>
                  </section>
                }
              } @else if (comp.tokens && comp.tokens.length > 0) {
                <!-- Legacy Flat Tokens - Desktop Table (md+) -->
                <div class="hidden md:block overflow-x-auto">
                  <table class="w-full text-left table-fixed">
                    <thead>
                      <tr class="lm-text-secondary">
                        <th class="pb-3 pr-6 font-medium text-sm w-[40%]">
                          Token
                        </th>
                        <th class="pb-3 pr-6 font-medium text-sm w-[25%]">
                          Value
                        </th>
                        <th class="pb-3 font-medium text-sm w-[35%]">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (token of comp.tokens; track token.name) {
                        <tr class="text-sm table-row-striped">
                          <td class="py-3 pr-6">
                            <code
                              class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded break-all"
                              >{{ token.name }}</code
                            >
                          </td>
                          <td class="py-3 pr-6">
                            <div class="flex items-center gap-2">
                              @if (isColor(token.value)) {
                                <span
                                  class="w-4 h-4 rounded"
                                  [style.background]="token.value"
                                ></span>
                              }
                              <code
                                class="font-mono text-xs lm-text-secondary"
                                >{{ token.value }}</code
                              >
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

                <!-- Legacy Flat Tokens - Mobile Cards (< md) -->
                <div class="md:hidden space-y-3">
                  @for (token of comp.tokens; track token.name) {
                    <luma-card>
                      <div class="flex items-start gap-3 mb-2">
                        @if (isColor(token.value)) {
                          <span
                            class="w-5 h-5 rounded shrink-0 mt-0.5"
                            [style.background]="token.value"
                          ></span>
                        }
                        <code
                          class="font-mono text-xs lm-text-primary break-all"
                          >{{ token.name }}</code
                        >
                      </div>
                      <p class="text-sm lm-text-secondary mb-3">
                        {{ token.description }}
                      </p>
                      <div
                        class="flex items-center gap-2 text-sm lm-text-secondary/70"
                      >
                        <span class="font-medium shrink-0">Value:</span>
                        <code class="font-mono break-all">{{
                          token.value
                        }}</code>
                      </div>
                    </luma-card>
                  }
                </div>
              } @else {
                <p class="lm-text-secondary text-sm">
                  No tokens available for this component.
                </p>
              }
            </div>

            <!-- Customizing Panel (conditional) -->
            @if (comp.customization && comp.customization.examples.length > 0) {
              <div lumaTabsPanel="customizing" class="space-y-8">
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
                          class="px-4 py-2 flex items-center justify-between border-b lm-border-neutral-70"
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

            <!-- Specification Panel -->
            <div lumaTabsPanel="specification" class="space-y-8">
              <!-- Inputs -->
              @if (comp.inputs.length > 0) {
                <section>
                  <h3 class="text-lg font-medium lm-text-primary mb-4">
                    Inputs
                  </h3>

                  <!-- Desktop Table (md+) -->
                  <div class="hidden md:block overflow-x-auto">
                    <table class="w-full text-left">
                      <thead>
                        <tr class="lm-text-secondary">
                          <th class="pb-3 pr-6 font-medium text-sm">Name</th>
                          <th class="pb-3 pr-6 font-medium text-sm">Type</th>
                          <th class="pb-3 pr-6 font-medium text-sm">Default</th>
                          <th class="pb-3 font-medium text-sm">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        @for (input of comp.inputs; track input.name) {
                          <tr class="text-sm table-row-striped">
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

                  <!-- Mobile Cards (< md) -->
                  <div class="md:hidden space-y-3">
                    @for (input of comp.inputs; track input.name) {
                      <luma-card>
                        <div class="flex items-center gap-2 mb-2">
                          <code
                            class="font-mono text-sm font-medium lm-text-primary"
                            >{{ input.name }}</code
                          >
                          @if (input.default) {
                            <span
                              class="text-xs px-1.5 py-0.5 rounded lm-bg-primary-50/10 lm-text-secondary"
                            >
                              = {{ input.default }}
                            </span>
                          }
                        </div>
                        <p class="text-sm lm-text-secondary mb-2">
                          {{ input.description }}
                        </p>
                        <code
                          class="text-sm font-mono lm-text-secondary/70 block break-all"
                        >
                          {{ input.type }}
                        </code>
                      </luma-card>
                    }
                  </div>
                </section>
              }

              <!-- Global Configuration -->
              @if (comp.globalConfig) {
                <section>
                  <h3 class="text-lg font-medium lm-text-primary mb-4">
                    Global Configuration
                  </h3>
                  <p class="lm-text-secondary text-sm mb-4">
                    {{ comp.globalConfig.description }}
                  </p>

                  <!-- Code Example -->
                  <luma-card lmVariant="preview" class="mb-6">
                    <div class="-m-5 overflow-hidden rounded-[inherit]">
                      <div
                        class="px-4 py-2 flex items-center justify-between border-b lm-border-neutral-70"
                      >
                        <span class="text-xs lm-text-secondary font-mono"
                          >app.config.ts</span
                        >
                        <button
                          (click)="copyCode(comp.globalConfig.code)"
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
                      ><code class="font-mono lm-text-primary whitespace-pre">{{ comp.globalConfig.code }}</code></pre>
                    </div>
                  </luma-card>

                  <!-- Options Table -->
                  @if (
                    comp.globalConfig.options &&
                    comp.globalConfig.options.length > 0
                  ) {
                    <h4 class="text-base font-medium lm-text-primary mb-3">
                      Configuration Options
                    </h4>

                    <!-- Desktop Table (md+) -->
                    <div class="hidden md:block overflow-x-auto">
                      <table class="w-full text-left">
                        <thead>
                          <tr class="lm-text-secondary">
                            <th class="pb-3 pr-6 font-medium text-sm">
                              Option
                            </th>
                            <th class="pb-3 pr-6 font-medium text-sm">Type</th>
                            <th class="pb-3 pr-6 font-medium text-sm">
                              Default
                            </th>
                            <th class="pb-3 font-medium text-sm">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (
                            option of comp.globalConfig.options;
                            track option.name
                          ) {
                            <tr class="text-sm table-row-striped">
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-bg-surface-base px-2 py-1 rounded"
                                  >{{ option.name }}</code
                                >
                              </td>
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-text-secondary"
                                  >{{ option.type }}</code
                                >
                              </td>
                              <td class="py-3 pr-6">
                                <code
                                  class="font-mono text-xs lm-text-secondary"
                                  >{{ option.default }}</code
                                >
                              </td>
                              <td class="py-3 lm-text-secondary">
                                {{ option.description }}
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>

                    <!-- Mobile Cards (< md) -->
                    <div class="md:hidden space-y-3">
                      @for (
                        option of comp.globalConfig.options;
                        track option.name
                      ) {
                        <luma-card>
                          <div class="flex items-center gap-2 mb-2">
                            <code
                              class="font-mono text-sm font-medium lm-text-primary"
                              >{{ option.name }}</code
                            >
                            @if (option.default) {
                              <span
                                class="text-xs px-1.5 py-0.5 rounded lm-bg-primary-50/10 lm-text-secondary"
                              >
                                = {{ option.default }}
                              </span>
                            }
                          </div>
                          <p class="text-sm lm-text-secondary mb-2">
                            {{ option.description }}
                          </p>
                          <code
                            class="text-sm font-mono lm-text-secondary/70 block break-all"
                          >
                            {{ option.type }}
                          </code>
                        </luma-card>
                      }
                    </div>
                  }
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

            <!-- Use Cases Panel (conditional) -->
            @if (comp.useCases && comp.useCases.length > 0) {
              <div lumaTabsPanel="use-cases" class="space-y-8">
                @for (useCase of comp.useCases; track useCase.title) {
                  <section>
                    <h3 class="text-lg font-medium lm-text-primary mb-2">
                      {{ useCase.title }}
                    </h3>
                    @if (useCase.description) {
                      <p class="lm-text-secondary text-sm mb-4">
                        {{ useCase.description }}
                      </p>
                    }
                    <app-example-preview
                      [componentSlug]="comp.slug"
                      [exampleId]="slugify(useCase.title)"
                      [code]="useCase.code"
                      [language]="useCase.language || 'typescript'"
                    />
                  </section>
                }
              </div>
            }
          </luma-tabs>
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
  host: {
    class: 'block',
  },
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
