import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
} from '@angular/core';
import { modalOverlayVariants } from '@lumaui/core';
import { MODAL_CONTEXT } from './modal.tokens';

/**
 * Modal overlay component (backdrop)
 *
 * Provides a semi-transparent backdrop behind the modal.
 * Handles click-to-close when enabled on the parent modal.
 *
 * @example
 * ```html
 * <luma-modal [lmOpen]="isOpen()">
 *   <luma-modal-overlay>
 *     <luma-modal-container>...</luma-modal-container>
 *   </luma-modal-overlay>
 * </luma-modal>
 * ```
 */
@Component({
  selector: 'luma-modal-overlay',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '(click)': 'onOverlayClick($event)',
  },
})
export class LmModalOverlayComponent {
  private readonly modal = inject(MODAL_CONTEXT);

  /** Computed classes from CVA */
  classes = computed(() =>
    modalOverlayVariants({
      open: this.modal.isOpen(),
    }),
  );

  /**
   * Handle click on overlay (not on children)
   */
  onOverlayClick(event: MouseEvent): void {
    // Only close if clicking directly on overlay, not on children
    if (event.target === event.currentTarget && this.modal.closeOnOverlay()) {
      this.modal.close();
    }
  }
}
