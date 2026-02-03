// Toast public API
export { LmToastService } from './toast.service';
export { LmToastContainerComponent } from './toast-container.component';
export { LmToastItemComponent } from './toast-item.component';
export { LmToastCloseComponent } from './toast-close.component';

// Type exports (isolatedModules requires 'export type')
export type {
  ToastVariant,
  ToastPosition,
  ToastOptions,
  Toast,
  ToastRef,
  ToastConfig,
} from './toast.tokens';

// Value exports
export {
  DEFAULT_TOAST_CONFIG,
  TOAST_CONFIG,
  provideToastConfig,
} from './toast.tokens';

// Re-export variant types from core
export type {
  ToastContainerVariants,
  ToastItemVariants,
  ToastIconVariants,
  ToastCloseVariants,
  ToastState,
} from '@lumaui/core';
