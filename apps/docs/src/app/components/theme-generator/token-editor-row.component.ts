import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { Token, ThemeGeneratorService } from '../../services/theme-generator.service';
import { parse, converter, type Oklch } from 'culori';

@Component({
  selector: 'app-token-editor-row',
  imports: [],
  template: `
    <div
      class="flex flex-col gap-2 rounded-lg p-3 transition-colors"
      [class.bg-accent]="token().isModified"
      [class.border-l-2]="token().isModified"
      [class.border-primary]="token().isModified"
    >
      <!-- Token Name -->
      <div class="flex items-center justify-between gap-2">
        <code class="text-xs text-foreground font-mono">
          {{ token().name }}
        </code>
        @if (token().isModified) {
          <button
            type="button"
            (click)="reset()"
            class="text-xs text-primary hover:underline"
            aria-label="Reset token"
          >
            Reset
          </button>
        }
      </div>

      <!-- Dependencies Info -->
      @if (token().dependencies.length > 0) {
        <div class="text-xs text-muted-foreground">
          References:
          @for (dep of token().dependencies; track dep; let last = $last) {
            <code class="font-mono">{{ dep }}</code>
            @if (!last) {
              <span>, </span>
            }
          }
        </div>
      }

      <!-- Cascaded Warning -->
      @if (token().isCascaded && !token().isModified) {
        <div class="flex items-center gap-1 text-xs text-destructive">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
            />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <span>Cascaded from dependency</span>
        </div>
      }

      <!-- Editor Controls -->
      <div class="flex items-center gap-2">
        @if (isColorToken()) {
          <!-- Color Swatch + Picker -->
          <div class="relative">
            <input
              type="color"
              [value]="hexColor()"
              (input)="onColorChange($event)"
              class="h-8 w-8 cursor-pointer rounded-md border border-border"
              [attr.aria-label]="'Color picker for ' + token().name"
            />
          </div>
        }

        <!-- Text Input -->
        <input
          type="text"
          [value]="editValue()"
          (input)="onInputChange($event)"
          (blur)="onValueChange()"
          (keydown.enter)="onValueChange()"
          class="flex-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          [class.border-red-500]="!isValidValue()"
          [attr.aria-label]="'Value for ' + token().name"
        />
      </div>

      <!-- Validation Error -->
      @if (!isValidValue() && editValue() !== token().currentValue) {
        <div class="text-xs text-red-500">
          Invalid value format
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenEditorRowComponent {
  token = input.required<Token>();
  private themeService = inject(ThemeGeneratorService);

  private localEditValue = signal('');
  readonly editValue = computed(() => {
    // Use local value if set, otherwise use token's current value
    const local = this.localEditValue();
    return local || this.token()?.currentValue || '';
  });

  readonly isColorToken = computed(() => {
    const token = this.token();
    if (!token) return false;
    const value = token.currentValue;
    return (
      value.includes('oklch') ||
      value.includes('rgb') ||
      value.includes('#') ||
      value === 'transparent'
    );
  });

  readonly hexColor = computed(() => {
    const token = this.token();
    if (!token) return '#000000';
    const value = token.currentValue;
    if (value === 'transparent') return '#000000';

    try {
      // Try to parse as OKLCH
      const color = parse(value);
      if (color) {
        // Convert to hex for color picker
        const toRgb = converter('rgb');
        const rgb = toRgb(color);
        if (rgb) {
          const r = Math.round(rgb.r * 255);
          const g = Math.round(rgb.g * 255);
          const b = Math.round(rgb.b * 255);
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
      }
    } catch {
      // Fallback
    }

    return '#000000';
  });

  onColorChange(event: Event): void {
    const hex = (event.target as HTMLInputElement).value;

    try {
      // Convert hex to OKLCH
      const rgb = parse(hex);
      if (rgb) {
        const toOklch = converter('oklch');
        const oklchColor = toOklch(rgb);
        if (oklchColor) {
          // Custom OKLCH formatter to ensure correct format
          const formatted = this.formatOklch(oklchColor);
          if (formatted) {
            this.localEditValue.set(formatted);
            this.themeService.updateToken(this.token().name, formatted);
          }
        }
      }
    } catch (error) {
      console.error('Color conversion failed:', error);
    }
  }

  /**
   * Formats OKLCH color object to CSS string
   * Ensures proper format: oklch(L C H) or oklch(L C H / A)
   * Uses 'none' for hue when chroma is 0 (achromatic colors per CSS Color Module Level 4)
   */
  private formatOklch(color: Oklch): string {
    // Use toFixed(2) for fixed precision (eliminates floating point errors like 1.0000000000000002)
    const l = Number((color.l ?? 0).toFixed(2));
    const c = Number((color.c ?? 0).toFixed(2));

    // Use 'none' for hue when chroma is 0 (achromatic/gray colors) or hue is undefined/NaN
    // Per CSS Color Module Level 4 spec for achromatic colors
    const h = (color.c ?? 0) === 0 || color.h === undefined || isNaN(color.h)
      ? 'none'
      : Math.round(color.h);

    if (color.alpha !== undefined && color.alpha < 1) {
      return `oklch(${l} ${c} ${h} / ${color.alpha})`;
    }

    return `oklch(${l} ${c} ${h})`;
  }

  onValueChange(): void {
    const newValue = this.editValue().trim();

    if (!this.isValidValue()) {
      // Reset to current value if invalid
      this.localEditValue.set('');
      return;
    }

    if (newValue !== this.token().currentValue) {
      this.themeService.updateToken(this.token().name, newValue);
      this.localEditValue.set('');
    }
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.localEditValue.set(value);
  }

  isValidValue(): boolean {
    const value = this.editValue().trim();
    if (!value) return false;

    // Basic validation - accept most CSS values
    // More strict validation could be added per token type
    return value.length > 0;
  }

  reset(): void {
    this.themeService.resetToken(this.token().name);
    this.localEditValue.set('');
  }
}
