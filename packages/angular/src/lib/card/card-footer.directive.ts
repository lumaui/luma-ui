import { Directive, computed } from '@angular/core';
import { cardFooterVariants } from '@lumaui/core';

@Directive({
  selector: '[lumaCardFooter]',
  host: {
    '[class]': 'classes()',
  },
})
export class LmCardFooterDirective {
  // Computed class string
  classes = computed(() => cardFooterVariants());
}
