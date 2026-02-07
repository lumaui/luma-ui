import { Directive, input, computed } from '@angular/core';
import { cardTitleVariants, type CardTitleSize } from '@lumaui/core';

@Directive({
  selector: '[lumaCardTitle]',
  host: {
    '[class]': 'classes()',
  },
})
export class LmCardTitleDirective {
  // Signal-based inputs with lm prefix (Angular 20+)
  lmSize = input<CardTitleSize>('md');

  // Computed class string
  classes = computed(() => cardTitleVariants({ size: this.lmSize() }));
}
