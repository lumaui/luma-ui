import { Directive } from '@angular/core';

@Directive({
  selector: '[lumaCardHeader]',
  host: {
    class: 'mb-4',
  },
})
export class LmCardHeaderDirective {
  // Structural directive for semantic card header region
  // Provides bottom margin for spacing between header and content
}
