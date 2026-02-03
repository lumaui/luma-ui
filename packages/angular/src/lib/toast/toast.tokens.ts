import { InjectionToken } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Toast variant types
 */
export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Toast position options
 */
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

/**
 * Toast configuration options passed to ToastService.show()
 */
export interface ToastOptions {
  /** Toast message (required) */
  message: string;

  /** Optional title */
  title?: string;

  /** Visual variant */
  variant?: ToastVariant;

  /** Screen position */
  position?: ToastPosition;

  /** Auto-close duration in milliseconds (0 = no auto-close) */
  duration?: number;

  /** Show close button */
  dismissible?: boolean;

  /** Pause timer on hover */
  pauseOnHover?: boolean;

  /** ARIA role override */
  role?: 'alert' | 'status';
}

/**
 * Internal toast representation with all required fields
 */
export interface Toast extends Required<Omit<ToastOptions, 'role'>> {
  /** Unique identifier */
  id: string;

  /** Creation timestamp */
  createdAt: number;

  /** Whether toast is currently animating out */
  isExiting: boolean;

  /** ARIA role */
  role: 'alert' | 'status';
}

/**
 * Toast reference for programmatic control
 */
export interface ToastRef {
  /** Unique toast ID */
  readonly id: string;

  /** Dismiss this toast */
  dismiss(): void;

  /** Observable that emits when dismissed */
  readonly afterDismissed: Observable<void>;
}

/**
 * Internal toast reference implementation
 */
export class ToastRefImpl implements ToastRef {
  private readonly _afterDismissed = new Subject<void>();

  constructor(
    public readonly id: string,
    private readonly dismissFn: (id: string) => void,
  ) {}

  dismiss(): void {
    this.dismissFn(this.id);
  }

  get afterDismissed(): Observable<void> {
    return this._afterDismissed.asObservable();
  }

  /** @internal Called when toast is actually dismissed */
  _notifyDismissed(): void {
    this._afterDismissed.next();
    this._afterDismissed.complete();
  }
}

/**
 * Global toast configuration
 */
export interface ToastConfig {
  /** Default position */
  position: ToastPosition;

  /** Default duration in milliseconds */
  duration: number;

  /** Default dismissible state */
  dismissible: boolean;

  /** Maximum visible toasts */
  maxVisible: number;

  /** Pause on hover by default */
  pauseOnHover: boolean;
}

/**
 * Default toast configuration
 */
export const DEFAULT_TOAST_CONFIG: ToastConfig = {
  position: 'top-right',
  duration: 5000,
  dismissible: true,
  maxVisible: 5,
  pauseOnHover: true,
};

/**
 * Injection token for global toast configuration
 */
export const TOAST_CONFIG = new InjectionToken<ToastConfig>('ToastConfig', {
  providedIn: 'root',
  factory: () => DEFAULT_TOAST_CONFIG,
});

/**
 * Provider function for custom toast configuration
 */
export function provideToastConfig(config: Partial<ToastConfig>) {
  return {
    provide: TOAST_CONFIG,
    useValue: { ...DEFAULT_TOAST_CONFIG, ...config },
  };
}
