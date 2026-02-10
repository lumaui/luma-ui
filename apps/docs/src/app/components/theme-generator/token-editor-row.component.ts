import {
  Component,
  input,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import {
  Token,
  ThemeGeneratorService,
} from '../../services/theme-generator.service';
import { parse, converter, type Oklch } from 'culori';

@Component({
  selector: 'app-token-editor-row',
  imports: [],
  templateUrl: './token-editor-row.component.html',
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
    const h =
      (color.c ?? 0) === 0 || color.h === undefined || isNaN(color.h)
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
