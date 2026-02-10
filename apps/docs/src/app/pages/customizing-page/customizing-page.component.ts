import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { CodePreviewComponent } from '../../components/code-preview/code-preview.component';
import { DocsRegistryService } from '../../services/docs-registry.service';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-customizing-page',
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
            Customizing
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed">
            Learn how to customize Luma's design tokens using CSS variables and
            Tailwind utilities. All tokens can be overridden at runtime without
            rebuilding your application.
          </p>
        </div>

        <!-- Overview -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            Overview
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-4">
            Luma uses <strong>CSS custom properties</strong> (CSS variables) for
            all design tokens. This enables powerful runtime customization
            patterns:
          </p>
          <div class="bg-muted/30 rounded-lg p-6 space-y-3 my-6">
            <ul class="space-y-2 text-sm text-muted-foreground">
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span
                  ><strong class="text-foreground"
                    >Global theme overrides:</strong
                  >
                  Change one token, update all components</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span
                  ><strong class="text-foreground"
                    >Component-specific styling:</strong
                  >
                  Use Tailwind utilities for instance-level customization</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span
                  ><strong class="text-foreground">Scoped overrides:</strong>
                  Apply custom tokens to specific sections of your app</span
                >
              </li>
              <li class="flex items-start gap-3">
                <span class="text-primary font-bold text-lg leading-none mt-0.5"
                  >✓</span
                >
                <span
                  ><strong class="text-foreground"
                    >Dark theme customization:</strong
                  >
                  Different values for light and dark modes</span
                >
              </li>
            </ul>
          </div>
        </section>

        <!-- All Customizable Tokens -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            All Customizable Tokens
          </h2>
          <p class="text-muted-foreground leading-relaxed mb-6">
            Complete reference of all 57 design tokens available for
            customization.
          </p>

          <!-- Primary Colors -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Primary Color Scale (12 steps)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Radix UI inspired 12-step scale. Step 5 is the base brand color.
            </p>
            <app-code-preview
              [code]="primaryColorsExample"
              [highlightedCode]="getHighlightedCode('primaryColorsExample')"
            />
          </div>

          <!-- Gray Scale -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Gray Scale (12 steps)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Theme-independent neutral colors for structural elements.
            </p>
            <app-code-preview
              [code]="grayColorsExample"
              [highlightedCode]="getHighlightedCode('grayColorsExample')"
            />
          </div>

          <!-- Surface Colors -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Surface Colors
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Background and foreground colors for app surfaces.
            </p>
            <app-code-preview
              [code]="surfaceColorsExample"
              [highlightedCode]="getHighlightedCode('surfaceColorsExample')"
            />
          </div>

          <!-- Semantic States -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Semantic State Colors
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Colors for destructive, warning, and success states.
            </p>
            <app-code-preview
              [code]="semanticColorsExample"
              [highlightedCode]="getHighlightedCode('semanticColorsExample')"
            />
          </div>

          <!-- Border Radius -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Border Radius (6 tokens)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Consistent rounded corners across components.
            </p>
            <app-code-preview
              [code]="radiusExample"
              [highlightedCode]="getHighlightedCode('radiusExample')"
            />
          </div>

          <!-- Shadows -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Shadows (6 tokens)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Elevation levels for depth hierarchy.
            </p>
            <app-code-preview
              [code]="shadowsExample"
              [highlightedCode]="getHighlightedCode('shadowsExample')"
            />
          </div>

          <!-- Typography -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold text-foreground mb-3">
              Typography (1 token)
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Base font family with fallback stack.
            </p>
            <app-code-preview
              [code]="typographyExample"
              [highlightedCode]="getHighlightedCode('typographyExample')"
            />
          </div>
        </section>

        <!-- Customization Patterns -->
        <section class="mb-16">
          <h2
            class="text-2xl font-semibold text-foreground mb-4 tracking-tight border-b border-border pb-2"
          >
            Customization Patterns
          </h2>

          <!-- Pattern 1: Global Theme Override -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Override Primary Color
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Change your brand color globally by overriding the primary token
              in your app's CSS. This affects all buttons, badges, toasts, and
              any component using <code class="text-xs">bg-primary</code>.
            </p>
            <app-code-preview
              [code]="globalOverrideExample"
              [highlightedCode]="getHighlightedCode('globalOverrideExample')"
            />
          </div>

          <!-- Pattern 2: Component-Specific Overrides -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Component-Specific Overrides
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Use Tailwind utilities via the
              <code class="text-xs">class</code> or
              <code class="text-xs">className</code> prop to customize
              individual component instances without affecting others.
            </p>
            <app-code-preview
              [code]="componentOverrideExample"
              [highlightedCode]="getHighlightedCode('componentOverrideExample')"
            />
          </div>

          <!-- Pattern 3: Dark Theme Customization -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Dark Theme Customization
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Customize token values specifically for dark mode. These values
              apply automatically when
              <code class="text-xs">&lt;html class="dark"&gt;</code> is set.
            </p>
            <app-code-preview
              [code]="darkThemeExample"
              [highlightedCode]="getHighlightedCode('darkThemeExample')"
            />
          </div>

          <!-- Pattern 4: Scoped Token Overrides -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Scoped Token Overrides
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Apply custom token values to specific sections of your app. All
              Luma components inside the scoped selector will use the overridden
              values.
            </p>
            <app-code-preview
              [code]="scopedOverrideExample"
              [highlightedCode]="getHighlightedCode('scopedOverrideExample')"
            />
          </div>

          <!-- Pattern 5: Using Tailwind Utilities -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Using Tailwind Utilities
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              All semantic tokens are available as standard Tailwind utilities.
              Use them to compose custom styles without writing CSS.
            </p>
            <app-code-preview
              [code]="tailwindUtilitiesExample"
              [highlightedCode]="getHighlightedCode('tailwindUtilitiesExample')"
            />
          </div>

          <!-- Pattern 6: Opacity Modifiers -->
          <div class="mb-10">
            <h3 class="text-lg font-semibold text-foreground mb-3">
              Opacity Modifiers
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              Tailwind's inline opacity modifiers work with all Luma semantic
              tokens. Use them for subtle backgrounds, hover states, and layered
              effects.
            </p>
            <app-code-preview
              [code]="opacityModifiersExample"
              [highlightedCode]="getHighlightedCode('opacityModifiersExample')"
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
export class CustomizingPageComponent {
  private readonly registryService = inject(DocsRegistryService);

  // Get highlighted code from registry
  private readonly customizingBlocks = this.registryService.customizingBlocks;

  // Helper to get highlighted code for a specific block
  getHighlightedCode = (blockId: string): string | undefined => {
    return this.customizingBlocks().find((b) => b.id === blockId)
      ?.highlightedCode;
  };

  // Primary Colors Example
  readonly primaryColorsExample = `:root {
  /* Primary Color Scale (12 steps) */
  --color-primary-1: oklch(1 0 300);           /* Lightest */
  --color-primary-2: oklch(0.94 0.020 300);
  --color-primary-3: oklch(0.88 0.035 300);
  --color-primary-4: oklch(0.78 0.060 300);
  --color-primary-5: oklch(0.48 0.090 300);    /* BASE COLOR */
  --color-primary-6: oklch(0.43 0.085 300);
  --color-primary-7: oklch(0.38 0.080 300);
  --color-primary-8: oklch(0.33 0.075 300);
  --color-primary-9: oklch(0.28 0.065 300);
  --color-primary-10: oklch(0.23 0.055 300);
  --color-primary-11: oklch(0.18 0.045 300);
  --color-primary-12: oklch(0.13 0.030 300);   /* Darkest */
}`;

  // Gray Colors Example
  readonly grayColorsExample = `:root {
  /* Gray Scale (12 steps) - Theme-independent */
  --color-gray-1: oklch(0.99 0.000 0);         /* Lightest */
  --color-gray-2: oklch(0.98 0.000 0);
  --color-gray-3: oklch(0.95 0.000 0);         /* Border color */
  --color-gray-4: oklch(0.92 0.000 0);
  --color-gray-5: oklch(0.89 0.000 0);
  --color-gray-6: oklch(0.86 0.000 0);
  --color-gray-7: oklch(0.82 0.000 0);
  --color-gray-8: oklch(0.76 0.000 0);
  --color-gray-9: oklch(0.60 0.000 0);
  --color-gray-10: oklch(0.57 0.000 0);
  --color-gray-11: oklch(0.45 0.000 0);        /* Muted text */
  --color-gray-12: oklch(0.20 0.000 0);        /* Darkest */
}`;

  // Surface Colors Example
  readonly surfaceColorsExample = `:root {
  /* Surface Colors */
  --color-background: oklch(1 0 0);                  /* App background */
  --color-foreground: oklch(0.22 0.014 290);         /* Primary text */
  --color-popover: oklch(0.13 0.030 300);            /* Tooltip bg */
  --color-popover-foreground: oklch(1 0 0);          /* Tooltip text */
}`;

  // Semantic Colors Example
  readonly semanticColorsExample = `:root {
  /* Semantic State Colors */
  --color-destructive: oklch(0.63 0.10 28);          /* Error/delete */
  --color-destructive-foreground: oklch(1 0 0);      /* Text on destructive */
  --color-warning: oklch(0.80 0.09 95);              /* Warning/caution */
  --color-warning-foreground: oklch(0.22 0.014 290); /* Text on warning */
  --color-success: oklch(0.72 0.07 155);             /* Success/confirm */
  --color-success-foreground: oklch(1 0 0);          /* Text on success */
}`;

  // Radius Example
  readonly radiusExample = `:root {
  /* Border Radius (6 tokens) */
  --radius-1: 0.125rem;  /* 2px - minimal */
  --radius-2: 0.25rem;   /* 4px - badges, pills */
  --radius-3: 0.375rem;  /* 6px - tooltips */
  --radius-4: 0.5rem;    /* 8px - buttons, inputs (default) */
  --radius-5: 0.75rem;   /* 12px - cards */
  --radius-6: 1rem;      /* 16px - modals */
}`;

  // Shadows Example
  readonly shadowsExample = `:root {
  /* Shadows (6 elevation levels) */
  --shadow-1: inset 0 0 0 1px oklch(0.5 0 0 / 0.03);
  --shadow-2: 0 1px 2px 0 oklch(0 0 0 / 0.03), 0 0 0 1px oklch(0.5 0 0 / 0.02);
  --shadow-3: 0 2px 4px 0 oklch(0 0 0 / 0.04), 0 0 0 1px oklch(0.5 0 0 / 0.02);
  --shadow-4: 0 4px 8px 0 oklch(0 0 0 / 0.06), 0 0 0 1px oklch(0.5 0 0 / 0.02);
  --shadow-5: 0 8px 16px 0 oklch(0 0 0 / 0.08), 0 0 0 1px oklch(0.5 0 0 / 0.02);
  --shadow-6: 0 16px 32px 0 oklch(0 0 0 / 0.10), 0 0 0 1px oklch(0.5 0 0 / 0.02);
}`;

  // Typography Example
  readonly typographyExample = `:root {
  /* Typography */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}`;

  // Global Override Example
  readonly globalOverrideExample = `:root {
  --color-primary: oklch(0.60 0.15 180);  /* Cyan instead of purple */
  --color-primary-foreground: oklch(1 0 0);
}

/* Now all buttons, badges, toasts, and links use cyan */`;

  // Component Override Example
  readonly componentOverrideExample = `<!-- Custom button with accent color -->
<button lumaButton class="bg-accent hover:bg-accent/80">
  Custom Button
</button>

<!-- Card with muted background and accent border -->
<luma-card class="bg-muted border-accent">
  Custom Card
</luma-card>

<!-- Multiple overrides -->
<div class="bg-primary/10 text-primary border-2 border-primary/20 rounded-lg p-4">
  Custom Container
</div>`;

  // Dark Theme Example
  readonly darkThemeExample = `.dark {
  --color-primary: oklch(0.75 0.12 340);  /* Pink in dark mode */
  --color-background: oklch(0.15 0.006 290);
  --color-foreground: oklch(0.98 0.000 0);
}

/* Automatically applies when <html class="dark"> */`;

  // Scoped Override Example
  readonly scopedOverrideExample = `.my-feature {
  --color-primary: oklch(0.70 0.12 340);  /* Pink theme */
  --radius-4: 0.25rem;  /* Sharper corners */
  --shadow-3: 0 4px 6px -1px oklch(0 0 0 / 0.1);
}

/* All Luma components inside .my-feature use these values */`;

  // Tailwind Utilities Example
  readonly tailwindUtilitiesExample = `<!-- Background colors -->
<div class="bg-primary">Primary background</div>
<div class="bg-secondary">Secondary background</div>
<div class="bg-muted">Muted background</div>

<!-- Text colors -->
<p class="text-foreground">Primary text</p>
<p class="text-muted-foreground">Secondary text</p>
<p class="text-primary">Branded text</p>

<!-- Border colors -->
<div class="border border-border">Default border</div>
<div class="border-2 border-primary">Primary border</div>

<!-- Border radius -->
<div class="rounded-md">Medium radius (--radius-4)</div>
<div class="rounded-lg">Large radius (--radius-5)</div>`;

  // Opacity Modifiers Example
  readonly opacityModifiersExample = `<!-- Subtle backgrounds -->
<div class="bg-primary/10">10% opacity primary</div>
<div class="bg-destructive/20">20% opacity destructive</div>

<!-- Hover states -->
<button class="bg-primary hover:bg-primary/90">
  Hover darkens slightly
</button>

<!-- Layered effects -->
<div class="bg-primary/5 border border-primary/20">
  <p class="text-primary/85">Subtle branded container</p>
</div>

<!-- Complex composition -->
<div class="bg-muted/50 backdrop-blur-sm border border-border/50">
  Glass morphism effect
</div>`;

  // For Developers Examples
  readonly standardUtilitiesExample = `<button lumaButton class="bg-accent hover:bg-accent/80">
  Custom Button
</button>`;

  readonly overrideTokenExample = `:root {
  --color-primary: oklch(0.60 0.15 180);
}`;

  readonly composeUtilitiesExample = `<div class="bg-primary/10 text-primary/85 border-primary/20 p-4 rounded-lg">
  Container with composed utilities
</div>`;
}
