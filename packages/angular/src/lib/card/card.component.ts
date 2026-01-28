import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  cardVariants,
  cardContentVariants,
  type CardVariant,
} from '@lumaui/core';

@Component({
  selector: 'luma-card',
  templateUrl: './card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  /**
   * Card visual style variant
   * - default: Gradient border wrapper style (default)
   * - shadow: Elevated card with shadow for primary content
   * - nested: Subtle background for sections within cards
   * - preview: For documentation examples
   */
  lmVariant = input<CardVariant>('default');

  // Computed class strings based on variant
  wrapperClasses = computed(() => cardVariants({ variant: this.lmVariant() }));
  contentClasses = computed(() =>
    cardContentVariants({ variant: this.lmVariant() }),
  );
}
