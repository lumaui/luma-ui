// Toast public API
export { ToastService } from './toast.service';
export { ToastContainerComponent } from './toast-container.component';
export { ToastItemComponent } from './toast-item.component';
export { ToastCloseComponent } from './toast-close.component';

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
