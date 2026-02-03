import {
  Injectable,
  ApplicationRef,
  Injector,
  createComponent,
  ComponentRef,
  inject,
  signal,
  computed,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import {
  TOAST_CONFIG,
  Toast,
  ToastOptions,
  ToastRef,
  ToastRefImpl,
  ToastVariant,
} from './toast.tokens';
import { LmToastContainerComponent } from './toast-container.component';

/**
 * ToastService
 *
 * Injectable service for showing toast notifications programmatically.
 * Provides convenience methods for info, success, warning, and error toasts.
 *
 * @example
 * ```typescript
 * private toast = inject(ToastService);
 *
 * showSuccess() {
 *   this.toast.success('Changes saved successfully!');
 * }
 *
 * showError() {
 *   this.toast.error('Failed to save', {
 *     title: 'Error',
 *     duration: 0
 *   });
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LmToastService implements OnDestroy {
  private readonly config = inject(TOAST_CONFIG);
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly liveAnnouncer = inject(LiveAnnouncer);

  private readonly _toasts = signal<Toast[]>([]);
  private containerRef: ComponentRef<LmToastContainerComponent> | null = null;
  private nextId = 0;
  private readonly toastRefs = new Map<string, ToastRefImpl>();

  /** Observable list of current toasts */
  readonly toasts = computed(() => this._toasts());

  ngOnDestroy(): void {
    this.destroyContainer();
  }

  /**
   * Show a toast notification
   * @param options - Toast configuration options
   * @returns ToastRef for programmatic control
   */
  show(options: ToastOptions): ToastRef {
    this.ensureContainer();

    const toast: Toast = {
      id: `toast-${this.nextId++}`,
      message: options.message,
      title: options.title ?? '',
      variant: options.variant ?? 'info',
      position: options.position ?? this.config.position,
      duration: options.duration ?? this.config.duration,
      dismissible: options.dismissible ?? this.config.dismissible,
      pauseOnHover: options.pauseOnHover ?? this.config.pauseOnHover,
      role: options.role ?? (options.variant === 'error' ? 'alert' : 'status'),
      createdAt: Date.now(),
      isExiting: false,
    };

    // Enforce max visible limit
    const currentToasts = this._toasts();
    if (currentToasts.length >= this.config.maxVisible) {
      // Remove oldest toast
      const oldest = currentToasts[0];
      this.dismiss(oldest.id);
    }

    this._toasts.update((toasts) => [...toasts, toast]);
    this.announceToast(toast);

    const toastRef = new ToastRefImpl(toast.id, (id) => this.dismiss(id));
    this.toastRefs.set(toast.id, toastRef);

    return toastRef;
  }

  /**
   * Show info toast
   * @param message - Toast message
   * @param options - Additional options
   */
  info(message: string, options?: Partial<ToastOptions>): ToastRef {
    return this.show({ ...options, message, variant: 'info' });
  }

  /**
   * Show success toast
   * @param message - Toast message
   * @param options - Additional options
   */
  success(message: string, options?: Partial<ToastOptions>): ToastRef {
    return this.show({ ...options, message, variant: 'success' });
  }

  /**
   * Show warning toast
   * @param message - Toast message
   * @param options - Additional options
   */
  warning(message: string, options?: Partial<ToastOptions>): ToastRef {
    return this.show({ ...options, message, variant: 'warning' });
  }

  /**
   * Show error toast
   * @param message - Toast message
   * @param options - Additional options
   */
  error(message: string, options?: Partial<ToastOptions>): ToastRef {
    return this.show({ ...options, message, variant: 'error' });
  }

  /**
   * Dismiss a specific toast
   * @param id - Toast ID to dismiss
   */
  dismiss(id: string): void {
    // Mark as exiting for animation
    this._toasts.update((toasts) =>
      toasts.map((t) => (t.id === id ? { ...t, isExiting: true } : t)),
    );

    // Remove after animation completes (200ms)
    setTimeout(() => {
      this._toasts.update((toasts) => toasts.filter((t) => t.id !== id));

      // Notify ref
      const toastRef = this.toastRefs.get(id);
      if (toastRef) {
        toastRef._notifyDismissed();
        this.toastRefs.delete(id);
      }
    }, 200);
  }

  /**
   * Dismiss all toasts
   */
  dismissAll(): void {
    const ids = this._toasts().map((t) => t.id);
    ids.forEach((id) => this.dismiss(id));
  }

  /**
   * Ensure toast container exists in DOM
   */
  private ensureContainer(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.containerRef) return;

    this.containerRef = createComponent(LmToastContainerComponent, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    // Pass toasts signal to container
    this.containerRef.instance._toasts = this._toasts;
    this.containerRef.instance._onDismiss = (id: string) => this.dismiss(id);

    this.appRef.attachView(this.containerRef.hostView);
    this.document.body.appendChild(this.containerRef.location.nativeElement);
  }

  /**
   * Remove container from DOM
   */
  private destroyContainer(): void {
    if (this.containerRef) {
      this.appRef.detachView(this.containerRef.hostView);
      this.containerRef.destroy();
      this.containerRef = null;
    }
  }

  /**
   * Announce toast to screen readers
   */
  private announceToast(toast: Toast): void {
    const prefix = this.getVariantPrefix(toast.variant);
    const message = toast.title
      ? `${prefix}: ${toast.title}. ${toast.message}`
      : `${prefix}: ${toast.message}`;

    const politeness = toast.variant === 'error' ? 'assertive' : 'polite';
    this.liveAnnouncer.announce(message, politeness);
  }

  /**
   * Get announcement prefix for variant
   */
  private getVariantPrefix(variant: ToastVariant): string {
    const prefixes: Record<ToastVariant, string> = {
      info: 'Information',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
    };
    return prefixes[variant];
  }
}
