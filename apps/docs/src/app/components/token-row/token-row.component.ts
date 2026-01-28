import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

/**
 * Token category determines how the preview is rendered
 */
export type TokenCategory =
  | 'color'
  | 'spacing'
  | 'radius'
  | 'typography'
  | 'shadow';

/**
 * Token data structure for display
 */
export interface TokenRowData {
  /** CSS variable name, e.g., --luma-color-primary-50 */
  name: string;
  /** Token category for preview rendering */
  category: TokenCategory;
  /** Token value, e.g., oklch(0.63 0.14 232.13) */
  value: string;
  /** Optional description */
  description?: string;
}

@Component({
  selector: 'app-token-row',
  templateUrl: './token-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class TokenRowComponent {
  /** Token data to display */
  token = input.required<TokenRowData>();

  /** Copy state for feedback */
  copied = false;

  /** Extract just the token name without -- prefix */
  displayName = computed(() => {
    const name = this.token().name;
    return name.startsWith('--') ? name.slice(2) : name;
  });

  /** Get the category label */
  categoryLabel = computed(() => {
    const categoryMap: Record<TokenCategory, string> = {
      color: 'Color',
      spacing: 'Spacing',
      radius: 'Radius',
      typography: 'Typography',
      shadow: 'Shadow',
    };
    return categoryMap[this.token().category];
  });

  /** Copy token name to clipboard */
  async copyToken(): Promise<void> {
    try {
      await navigator.clipboard.writeText(`var(${this.token().name})`);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy token:', err);
    }
  }
}
