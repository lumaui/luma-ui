import { Directive, computed, input } from '@angular/core';
import { modalContentVariants } from '@lumaui/core';

/**
 * Modal content directive
 *
 * Container for the main modal content.
 * Supports scrolling when content exceeds available space.
 *
 * @example
 * ```html
 * <div lumaModalContent>
 *   Content that doesn't scroll
 * </div>
 *
 * <div lumaModalContent [lmScrollable]="true">
 *   Long content that scrolls...
 * </div>
 * ```
 */
@Directive({
  selector: '[lumaModalContent]',
  host: {
    '[class]': 'classes()',
  },
})
export class ModalContentDirective {
  /** Enable scroll when content overflows */
  lmScrollable = input<boolean>(true);

  /** Computed classes from CVA */
  classes = computed(() =>
    modalContentVariants({
      scrollable: this.lmScrollable(),
    }),
  );
}
