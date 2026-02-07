import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { cardVariants, type CardVariant } from '@lumaui/core';

@Component({
  selector: 'luma-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LmCardComponent {
  /**
   * Card visual style variant
   * - default: Simple border card
   * - elevated: Card with shadow elevation
   * - subtle: Muted background card
   */
  lmVariant = input<CardVariant>('default');

  // Computed class string based on variant
  classes = computed(() => cardVariants({ variant: this.lmVariant() }));
}
