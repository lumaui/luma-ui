import { Directive, computed } from '@angular/core';
import { cardContentVariants } from '@lumaui/core';

@Directive({
  selector: '[lumaCardContent]',
  host: {
    '[class]': 'classes()',
  },
})
export class LmCardContentDirective {
  // Computed class string
  classes = computed(() => cardContentVariants());
}
