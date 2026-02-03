import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  computed,
  signal,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

import {
  toastItemVariants,
  toastIconVariants,
  toastContentVariants,
  toastTitleVariants,
  toastMessageVariants,
  ToastState,
} from '@lumaui/core';
import { Toast, ToastVariant } from './toast.tokens';
import { LmToastCloseComponent } from './toast-close.component';

/**
 * ToastItemComponent
 *
 * Individual toast notification with timer and icon.
 *
 * @internal Created by ToastContainerComponent
 */
@Component({
  selector: 'luma-toast-item',
  template: `
    <!-- Icon -->
    <div [class]="iconClasses()">
      @switch (toast().variant) {
        @case ('info') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clip-rule="evenodd"
            />
          </svg>
        }
        @case ('success') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clip-rule="evenodd"
            />
          </svg>
        }
        @case ('warning') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        }
        @case ('error') {
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
              clip-rule="evenodd"
            />
          </svg>
        }
      }
    </div>

    <!-- Content -->
    <div [class]="contentClasses()">
      @if (toast().title) {
        <div [class]="titleClasses()">{{ toast().title }}</div>
      }
      <div [class]="messageClasses()">{{ toast().message }}</div>
    </div>

    <!-- Close button -->
    @if (toast().dismissible) {
      <luma-toast-close [lmVariant]="toast().variant" (click)="onClose()" />
    }
  `,
  host: {
    '[class]': 'itemClasses()',
    '[attr.role]': 'toast().role',
    '[attr.aria-live]': 'toast().variant === "error" ? "assertive" : "polite"',
    '[attr.aria-atomic]': '"true"',
    '[tabindex]': 'hasInteractiveElements() ? 0 : -1',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(keydown.escape)': 'onEscapeKey()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LmToastCloseComponent],
})
export class LmToastItemComponent implements OnInit, OnDestroy {
  /** Toast data */
  toast = input.required<Toast>();

  /** Emits when toast should be dismissed */
  dismiss = output<string>();

  /** Timer subscription */
  private timerSubscription: Subscription | null = null;

  /** Remaining time in ms */
  private remainingTime = signal(0);

  /** Whether timer is paused */
  private isPaused = signal(false);

  /** Animation state */
  private animationState = signal<ToastState>('entering');

  /** Item CSS classes */
  protected readonly itemClasses = computed(() =>
    toastItemVariants({
      variant: this.toast().variant,
      state: this.toast().isExiting ? 'exiting' : this.animationState(),
    }),
  );

  /** Icon CSS classes */
  protected readonly iconClasses = computed(() =>
    toastIconVariants({ variant: this.toast().variant }),
  );

  /** Content CSS classes */
  protected readonly contentClasses = computed(() => toastContentVariants());

  /** Title CSS classes */
  protected readonly titleClasses = computed(() => toastTitleVariants());

  /** Message CSS classes */
  protected readonly messageClasses = computed(() => toastMessageVariants());

  /** Whether toast has interactive elements */
  protected readonly hasInteractiveElements = computed(
    () => this.toast().dismissible,
  );

  ngOnInit(): void {
    // Start animation
    requestAnimationFrame(() => {
      this.animationState.set('visible');
    });

    // Start timer if duration > 0
    const duration = this.toast().duration;
    if (duration > 0) {
      this.startTimer(duration);
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /** Start auto-close timer */
  private startTimer(duration: number): void {
    this.remainingTime.set(duration);

    this.timerSubscription = interval(100)
      .pipe(
        takeWhile(() => this.remainingTime() > 0),
        filter(() => !this.isPaused()),
      )
      .subscribe(() => {
        this.remainingTime.update((t) => t - 100);
        if (this.remainingTime() <= 0) {
          this.dismissToast();
        }
      });
  }

  /** Stop timer */
  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  /** Dismiss this toast */
  private dismissToast(): void {
    this.dismiss.emit(this.toast().id);
  }

  /** Handle close button click */
  protected onClose(): void {
    this.dismissToast();
  }

  /** Pause timer on mouse enter */
  protected onMouseEnter(): void {
    if (this.toast().pauseOnHover) {
      this.isPaused.set(true);
    }
  }

  /** Resume timer on mouse leave */
  protected onMouseLeave(): void {
    this.isPaused.set(false);
  }

  /** Pause timer on focus */
  protected onFocus(): void {
    this.isPaused.set(true);
  }

  /** Resume timer on blur */
  protected onBlur(): void {
    this.isPaused.set(false);
  }

  /** Dismiss on Escape key */
  protected onEscapeKey(): void {
    if (this.toast().dismissible) {
      this.dismissToast();
    }
  }
}
