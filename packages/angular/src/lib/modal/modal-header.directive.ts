import { Directive, computed } from '@angular/core';
import { modalHeaderVariants } from '@lumaui/core';

/**
 * Modal header directive
 *
 * Container for modal title and close button.
 * Provides consistent padding and border styling.
 *
 * @example
 * ```html
 * <div lumaModalHeader>
 *   <h2 lumaModalTitle>Modal Title</h2>
 *   <luma-modal-close />
 * </div>
 * ```
 */
@Directive({
  selector: '[lumaModalHeader]',
  host: {
    '[class]': 'classes()',
  },
})
export class LmModalHeaderDirective {
  /** Computed classes from CVA */
  classes = computed(() => modalHeaderVariants());
}
