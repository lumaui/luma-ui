import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  input,
} from '@angular/core';
import { modalCloseVariants } from '@lumaui/core';
import { MODAL_CONTEXT } from './modal.tokens';

/**
 * Modal close button component
 *
 * Provides a styled close button with an X icon.
 * Can be customized with different content via ng-content.
 *
 * @example
 * ```html
 * <!-- Default X icon -->
 * <luma-modal-close />
 *
 * <!-- Custom aria label -->
 * <luma-modal-close lmAriaLabel="Fechar modal" />
 *
 * <!-- Custom icon -->
 * <luma-modal-close>
 *   <svg>...</svg>
 * </luma-modal-close>
 * ```
 */
@Component({
  selector: 'luma-modal-close',
  template: `
    <button
      type="button"
      [attr.aria-label]="ariaLabel()"
      [class]="classes()"
      (click)="modal.close()"
    >
      <ng-content>
        <svg
          viewBox="0 0 24 24"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'contents',
  },
})
export class LmModalCloseComponent {
  readonly modal = inject(MODAL_CONTEXT);

  /** Accessible label for the close button */
  lmAriaLabel = input<string>('Close modal');

  /** Computed aria label */
  ariaLabel = computed(() => this.lmAriaLabel());

  /** Computed classes from CVA */
  classes = computed(() => modalCloseVariants());
}
