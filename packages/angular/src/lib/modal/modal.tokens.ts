import { InjectionToken, Signal } from '@angular/core';

/**
 * Modal size variants
 */
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Interface for modal context that child components/directives can access
 */
export interface ModalContext {
  /** Whether the modal is currently open */
  isOpen: Signal<boolean>;
  /** Open the modal */
  open: () => void;
  /** Close the modal */
  close: () => void;
  /** Modal size variant */
  size: Signal<ModalSize>;
  /** Whether to close on overlay click */
  closeOnOverlay: Signal<boolean>;
  /** Whether to close on Escape key */
  closeOnEscape: Signal<boolean>;
  /** Unique ID for accessibility */
  modalId: string;
}

/**
 * Injection token for modal context
 * Allows child components to access parent modal state
 */
export const MODAL_CONTEXT = new InjectionToken<ModalContext>('ModalContext');
