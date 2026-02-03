import {
  Component,
  ChangeDetectionStrategy,
  input,
  computed,
} from '@angular/core';

import { toastCloseVariants, ToastVariant } from '@lumaui/core';

/**
 * ToastCloseComponent
 *
 * Close button for toast notifications.
 * Styled according to the toast variant.
 *
 * @internal Used by ToastItemComponent
 */
@Component({
  selector: 'luma-toast-close',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="lm-size-toast-close"
      aria-hidden="true"
    >
      <path
        d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
      />
    </svg>
  `,
  host: {
    type: 'button',
    '[class]': 'classes()',
    'aria-label': 'Close notification',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastCloseComponent {
  /** Toast variant for styling */
  lmVariant = input<ToastVariant>('info');

  /** CSS classes */
  protected readonly classes = computed(() =>
    toastCloseVariants({ variant: this.lmVariant() }),
  );
}
