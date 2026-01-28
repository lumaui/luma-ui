import { Directive, input, computed } from '@angular/core';
import {
  cardDescriptionVariants,
  type CardDescriptionSize,
} from '@lumaui/core';

@Directive({
  selector: '[lumaCardDescription]',
  host: {
    '[class]': 'classes()',
  },
})
export class CardDescriptionDirective {
  // Signal-based inputs with lm prefix (Angular 20+)
  lmSize = input<CardDescriptionSize>('normal');

  // Computed class string
  classes = computed(() => cardDescriptionVariants({ size: this.lmSize() }));
}
