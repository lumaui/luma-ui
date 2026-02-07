import { Directive, computed } from '@angular/core';
import { cardHeaderVariants } from '@lumaui/core';

@Directive({
  selector: '[lumaCardHeader]',
  host: {
    '[class]': 'classes()',
  },
})
export class LmCardHeaderDirective {
  // Computed class string
  classes = computed(() => cardHeaderVariants());
}
