import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LmButtonDirective,
  LmCardComponent,
  LmCardContentDirective,
  LmCardDescriptionDirective,
  LmCardHeaderDirective,
  LmCardTitleDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-card-previews',
  imports: [
    LmButtonDirective,
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-card') {
        <luma-card>
          <div lumaCardHeader>
            <h3 lumaCardTitle>Card Title</h3>
            <p lumaCardDescription>
              This is a description of the card content.
            </p>
          </div>
          <div lumaCardContent>
            <p>Main content goes here.</p>
          </div>
        </luma-card>
      }
      @case ('variants') {
        <div class="space-y-4">
          <luma-card lmVariant="default">
            <div lumaCardHeader>
              <h3 lumaCardTitle>Default Variant</h3>
              <p lumaCardDescription>Standard card with border</p>
            </div>
            <div lumaCardContent>
              <p>Default card content.</p>
            </div>
          </luma-card>

          <luma-card lmVariant="elevated">
            <div lumaCardHeader>
              <h3 lumaCardTitle>Elevated Variant</h3>
              <p lumaCardDescription>Card with subtle shadow</p>
            </div>
            <div lumaCardContent>
              <p>Elevated card content.</p>
            </div>
          </luma-card>
        </div>
      }
      @case ('custom-styled-with-tailwind') {
        <!-- Custom card with Tailwind utilities and CSS variable overrides -->
        <luma-card
          lmVariant="elevated"
          class="max-w-md overflow-hidden border-l-4 border-l-primary [--shadow-3:0_4px_12px_0_oklch(0.5_0.1_300_/_0.12)]"
        >
          <!-- Header with gradient background -->
          <div
            class="relative -mx-6 -mt-6 mb-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 py-5 border-b border-border/50"
          >
            <div lumaCardHeader>
              <h3 lumaCardTitle lmSize="lg" class="text-primary-9">
                Premium Feature Card
              </h3>
              <p lumaCardDescription lmSize="md" class="text-foreground/70">
                Fully customized with Tailwind utilities
              </p>
            </div>
          </div>

          <!-- Content section -->
          <div lumaCardContent class="space-y-4">
            <p class="text-sm leading-relaxed text-muted-foreground">
              This card demonstrates advanced customization using Tailwind's
              utility classes alongside Luma's semantic design tokens. Notice
              the custom border, shadow override, and gradient header.
            </p>

            <!-- Feature list -->
            <ul class="space-y-2 text-sm">
              <li class="flex items-start gap-2">
                <svg
                  class="w-5 h-5 text-success mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-foreground"
                  >Custom border accent with semantic primary color</span
                >
              </li>
              <li class="flex items-start gap-2">
                <svg
                  class="w-5 h-5 text-success mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-foreground"
                  >Scoped CSS variable override for shadow depth</span
                >
              </li>
              <li class="flex items-start gap-2">
                <svg
                  class="w-5 h-5 text-success mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-foreground"
                  >Gradient header with negative margin compensation</span
                >
              </li>
            </ul>

            <!-- Stats grid -->
            <div class="grid grid-cols-3 gap-3 pt-2">
              <div
                class="rounded-md bg-primary-2 px-3 py-2 text-center border border-primary/10"
              >
                <div class="text-lg font-semibold text-primary-9">24</div>
                <div class="text-xs text-primary-9/70">Features</div>
              </div>
              <div
                class="rounded-md bg-success/10 px-3 py-2 text-center border border-success/20"
              >
                <div class="text-lg font-semibold text-success">98%</div>
                <div class="text-xs text-success/70">Uptime</div>
              </div>
              <div
                class="rounded-md bg-warning/10 px-3 py-2 text-center border border-warning/20"
              >
                <div class="text-lg font-semibold text-warning">Fast</div>
                <div class="text-xs text-warning/70">Speed</div>
              </div>
            </div>
          </div>

          <!-- Custom footer (no directive needed) -->
          <div
            class="flex items-center justify-between gap-3 pt-4 border-t border-border/50 -mx-6 -mb-6 px-6 py-4 bg-muted/20"
          >
            <button
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Learn More
            </button>
            <button lumaButton lmVariant="primary" lmSize="sm">
              Get Started
            </button>
          </div>
        </luma-card>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class CardPreviewsComponent {
  exampleId = input.required<string>();
}
