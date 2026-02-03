import { Directive, computed, inject, input } from '@angular/core';
import { modalTitleVariants } from '@lumaui/core';
import { MODAL_CONTEXT } from './modal.tokens';

/**
 * Modal title directive
 *
 * Provides consistent typography for modal titles.
 * Automatically links to aria-labelledby on the modal container.
 *
 * @example
 * ```html
 * <h2 lumaModalTitle>Modal Title</h2>
 * <h2 lumaModalTitle lmSize="lg">Large Title</h2>
 * ```
 */
@Directive({
  selector: '[lumaModalTitle]',
  host: {
    '[attr.id]': 'titleId()',
    '[class]': 'classes()',
  },
})
export class LmModalTitleDirective {
  private readonly modal = inject(MODAL_CONTEXT);

  /** Title size variant */
  lmSize = input<'sm' | 'md' | 'lg'>('md');

  /** ID for aria-labelledby connection */
  titleId = computed(() => `${this.modal.modalId}-title`);

  /** Computed classes from CVA */
  classes = computed(() =>
    modalTitleVariants({
      size: this.lmSize(),
    }),
  );
}
