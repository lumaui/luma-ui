import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Modal Overlay Variants
 * Semi-transparent backdrop behind the modal
 */
export const modalOverlayVariants = cva(
  [
    'fixed',
    'inset-0',
    'z-50',
    'flex',
    'items-center',
    'justify-center',
    'lm-bg-modal-overlay',
    'transition-[opacity,visibility]',
    'lm-duration-modal',
    'lm-ease-modal',
  ],
  {
    variants: {
      open: {
        true: ['opacity-100', 'visible'],
        false: ['opacity-0', 'invisible', 'pointer-events-none'],
      },
    },
    defaultVariants: {
      open: false,
    },
  },
);

/**
 * Modal Container Variants
 * Dialog box that contains modal content
 */
export const modalContainerVariants = cva(
  [
    'relative',
    'z-50',
    'lm-bg-modal',
    'lm-rounded-modal',
    'lm-shadow-modal',
    'flex',
    'flex-col',
    'max-h-[90vh]',
    'transition-[opacity,visibility]',
    'lm-duration-modal',
    'lm-ease-modal',
    'focus:outline-none',
  ],
  {
    variants: {
      size: {
        sm: ['w-full', 'max-w-sm'],
        md: ['w-full', 'max-w-md'],
        lg: ['w-full', 'max-w-lg'],
        xl: ['w-full', 'max-w-xl'],
        full: ['w-[95vw]', 'h-[95vh]'],
      },
      open: {
        true: [
          'opacity-100',
          'translate-y-0',
          'visible',
          'transition-[opacity,transform,visibility]', // Animate transform only on open
        ],
        false: ['opacity-0', 'invisible'],
      },
    },
    defaultVariants: {
      size: 'md',
      open: false,
    },
  },
);

/**
 * Modal Header Variants
 * Container for title and close button
 */
export const modalHeaderVariants = cva([
  'relative',
  'flex',
  'items-center',
  'justify-between',
  'lm-px-modal-header',
  'lm-py-modal-header',
  'shrink-0',
]);

/**
 * Modal Title Variants
 * Typography for modal title
 */
export const modalTitleVariants = cva(
  ['lm-text-modal-title', 'lm-font-modal-title', 'leading-tight'],
  {
    variants: {
      size: {
        sm: ['text-base'],
        md: ['text-lg'],
        lg: ['text-xl'],
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Modal Content Variants
 * Main content area with optional scrolling
 */
export const modalContentVariants = cva(
  ['lm-px-modal-content', 'lm-py-modal-content', 'flex-1', 'min-h-0'],
  {
    variants: {
      scrollable: {
        true: ['overflow-y-auto'],
        false: ['overflow-visible'],
      },
    },
    defaultVariants: {
      scrollable: true,
    },
  },
);

/**
 * Modal Footer Variants
 * Container for action buttons
 */
export const modalFooterVariants = cva(
  [
    'flex',
    'items-center',
    'gap-3',
    'lm-px-modal-footer',
    'lm-py-modal-footer',
    'shrink-0',
  ],
  {
    variants: {
      align: {
        start: ['justify-start'],
        center: ['justify-center'],
        end: ['justify-end'],
        between: ['justify-between'],
      },
    },
    defaultVariants: {
      align: 'end',
    },
  },
);

/**
 * Modal Close Button Variants
 * Styled close button
 */
export const modalCloseVariants = cva([
  'absolute',
  'top-3',
  'right-3',
  'p-1.5',
  'lm-rounded-modal-close',
  'lm-text-modal-close',
  'hover:lm-bg-modal-close-hover',
  'transition-colors',
  'lm-duration-modal',
  'focus:outline-none',
  'focus-visible:lm-ring-focus',
  'cursor-pointer',
]);

// Type exports
export type ModalOverlayVariants = VariantProps<typeof modalOverlayVariants>;
export type ModalContainerVariants = VariantProps<
  typeof modalContainerVariants
>;
export type ModalHeaderVariants = VariantProps<typeof modalHeaderVariants>;
export type ModalTitleVariants = VariantProps<typeof modalTitleVariants>;
export type ModalContentVariants = VariantProps<typeof modalContentVariants>;
export type ModalFooterVariants = VariantProps<typeof modalFooterVariants>;
export type ModalCloseVariants = VariantProps<typeof modalCloseVariants>;

// Convenience types
export type ModalSize = NonNullable<ModalContainerVariants['size']>;
export type ModalFooterAlign = NonNullable<ModalFooterVariants['align']>;
