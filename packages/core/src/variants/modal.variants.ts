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
    'bg-black/80',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0',
  ],
);

/**
 * Modal Container Variants
 * Dialog box that contains modal content
 */
export const modalContainerVariants = cva(
  [
    'fixed',
    'left-[50%]',
    'top-[50%]',
    'z-50',
    'translate-x-[-50%]',
    'translate-y-[-50%]',
    'grid',
    'w-full',
    'gap-4',
    'border',
    'border-gray-200',
    'bg-white',
    'p-6',
    'shadow-[var(--shadow-6)]',
    'duration-200',
    'data-[state=open]:animate-in',
    'data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0',
    'data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95',
    'data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2',
    'data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2',
    'data-[state=open]:slide-in-from-top-[48%]',
    'rounded-[var(--radius-6)]',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        full: 'max-w-[95vw] h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Modal Header Variants
 * Container for title and close button
 */
export const modalHeaderVariants = cva([
  'flex',
  'flex-col',
  'gap-1.5',
  'text-center',
  'sm:text-left',
]);

/**
 * Modal Title Variants
 * Typography for modal title
 */
export const modalTitleVariants = cva(
  ['text-lg', 'font-semibold', 'leading-none', 'tracking-tight'],
);

/**
 * Modal Description Variants
 * Supporting text below title
 */
export const modalDescriptionVariants = cva([
  'text-sm',
  'text-gray-600',
]);

/**
 * Modal Content Variants
 * Main content area with optional scrolling
 */
export const modalContentVariants = cva([
  'max-h-[60vh]',
  'overflow-y-auto',
]);

/**
 * Modal Footer Variants
 * Container for action buttons
 */
export const modalFooterVariants = cva(
  ['flex', 'gap-2'],
  {
    variants: {
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
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
  'right-4',
  'top-4',
  'rounded-sm',
  'opacity-70',
  'ring-offset-2',
  'transition-opacity',
  'hover:opacity-100',
  'focus:outline-none',
  'focus:ring-2',
  'focus:ring-primary-9',
  'focus:ring-offset-2',
  'disabled:pointer-events-none',
  'data-[state=open]:bg-primary-2',
  'data-[state=open]:text-gray-600',
]);

// Type exports
export type ModalOverlayVariants = VariantProps<typeof modalOverlayVariants>;
export type ModalContainerVariants = VariantProps<
  typeof modalContainerVariants
>;
export type ModalHeaderVariants = VariantProps<typeof modalHeaderVariants>;
export type ModalTitleVariants = VariantProps<typeof modalTitleVariants>;
export type ModalDescriptionVariants = VariantProps<typeof modalDescriptionVariants>;
export type ModalContentVariants = VariantProps<typeof modalContentVariants>;
export type ModalFooterVariants = VariantProps<typeof modalFooterVariants>;
export type ModalCloseVariants = VariantProps<typeof modalCloseVariants>;

// Convenience types
export type ModalSize = NonNullable<ModalContainerVariants['size']>;
export type ModalFooterAlign = NonNullable<ModalFooterVariants['align']>;
