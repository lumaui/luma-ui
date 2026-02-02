import { Directive, computed, input } from '@angular/core';
import { modalFooterVariants } from '@lumaui/core';

/**
 * Modal footer directive
 *
 * Container for modal actions (buttons, etc.).
 * Provides consistent padding and flexible alignment.
 *
 * @example
 * ```html
 * <div lumaModalFooter>
 *   <button lumaButton lmVariant="ghost">Cancel</button>
 *   <button lumaButton>Confirm</button>
 * </div>
 *
 * <div lumaModalFooter lmAlign="between">
 *   <span>Left content</span>
 *   <button lumaButton>Action</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[lumaModalFooter]',
  host: {
    '[class]': 'classes()',
  },
})
export class ModalFooterDirective {
  /** Alignment of footer content */
  lmAlign = input<'start' | 'center' | 'end' | 'between'>('end');

  /** Computed classes from CVA */
  classes = computed(() =>
    modalFooterVariants({
      align: this.lmAlign(),
    }),
  );
}
