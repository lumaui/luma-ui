import {
  Component,
  ChangeDetectionStrategy,
  Signal,
  computed,
} from '@angular/core';

import { toastContainerVariants, ToastPosition } from '@lumaui/core';
import { Toast } from './toast.tokens';
import { LmToastItemComponent } from './toast-item.component';

/**
 * ToastContainerComponent
 *
 * Fixed-position container that renders all active toasts.
 * Supports all 6 positions simultaneously by grouping toasts by their position.
 *
 * @internal This component is created programmatically by ToastService
 */
@Component({
  selector: 'luma-toast-container',
  template: `
    <!-- Top Left -->
    @if (toastsByPosition()['top-left'].length) {
      <div
        role="region"
        aria-label="Top left notifications"
        [class]="getPositionClasses('top-left')"
      >
        @for (toast of toastsByPosition()['top-left']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }

    <!-- Top Center -->
    @if (toastsByPosition()['top-center'].length) {
      <div
        role="region"
        aria-label="Top center notifications"
        [class]="getPositionClasses('top-center')"
      >
        @for (toast of toastsByPosition()['top-center']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }

    <!-- Top Right -->
    @if (toastsByPosition()['top-right'].length) {
      <div
        role="region"
        aria-label="Top right notifications"
        [class]="getPositionClasses('top-right')"
      >
        @for (toast of toastsByPosition()['top-right']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }

    <!-- Bottom Left -->
    @if (toastsByPosition()['bottom-left'].length) {
      <div
        role="region"
        aria-label="Bottom left notifications"
        [class]="getPositionClasses('bottom-left')"
      >
        @for (toast of toastsByPosition()['bottom-left']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }

    <!-- Bottom Center -->
    @if (toastsByPosition()['bottom-center'].length) {
      <div
        role="region"
        aria-label="Bottom center notifications"
        [class]="getPositionClasses('bottom-center')"
      >
        @for (toast of toastsByPosition()['bottom-center']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }

    <!-- Bottom Right -->
    @if (toastsByPosition()['bottom-right'].length) {
      <div
        role="region"
        aria-label="Bottom right notifications"
        [class]="getPositionClasses('bottom-right')"
      >
        @for (toast of toastsByPosition()['bottom-right']; track toast.id) {
          <luma-toast-item [toast]="toast" (dismiss)="onDismiss($event)" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmToastItemComponent],
})
export class LmToastContainerComponent {
  /** Toasts signal passed from ToastService */
  _toasts!: Signal<Toast[]>;

  /** Dismiss callback passed from ToastService */
  _onDismiss!: (id: string) => void;

  /** Group toasts by their position */
  protected readonly toastsByPosition = computed(() => {
    const groups: Record<ToastPosition, Toast[]> = {
      'top-left': [],
      'top-center': [],
      'top-right': [],
      'bottom-left': [],
      'bottom-center': [],
      'bottom-right': [],
    };

    if (!this._toasts) return groups;

    for (const toast of this._toasts()) {
      const position = toast.position as ToastPosition;
      if (groups[position]) {
        groups[position].push(toast);
      }
    }

    return groups;
  });

  /** Get CSS classes for a specific position */
  protected getPositionClasses(position: ToastPosition): string {
    return toastContainerVariants({ position });
  }

  /** Handle dismiss event from toast item */
  protected onDismiss(id: string): void {
    this._onDismiss?.(id);
  }
}
