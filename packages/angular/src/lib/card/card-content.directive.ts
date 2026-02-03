import { Directive } from '@angular/core';

@Directive({
  selector: '[lumaCardContent]',
  host: {
    class: '',
  },
})
export class LmCardContentDirective {
  // Semantic marker for card content region
  // No styles applied to preserve maximum flexibility
  // Maintained for backward compatibility and semantic HTML structure
}
