import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Toast Container Variants
 * Fixed-position container that holds all toasts
 */
export const toastContainerVariants = cva(
  [
    'fixed',
    'z-[100]',
    'flex',
    'flex-col',
    'pointer-events-none',
    'lm-gap-toast-stack',
  ],
  {
    variants: {
      position: {
        'top-left': ['top-4', 'left-4', 'items-start'],
        'top-center': ['top-4', 'left-1/2', '-translate-x-1/2', 'items-center'],
        'top-right': ['top-4', 'right-4', 'items-end'],
        'bottom-left': [
          'bottom-4',
          'left-4',
          'items-start',
          'flex-col-reverse',
        ],
        'bottom-center': [
          'bottom-4',
          'left-1/2',
          '-translate-x-1/2',
          'items-center',
          'flex-col-reverse',
        ],
        'bottom-right': [
          'bottom-4',
          'right-4',
          'items-end',
          'flex-col-reverse',
        ],
      },
    },
    defaultVariants: {
      position: 'top-right',
    },
  },
);

/**
 * Toast Item Variants
 * Individual toast notification styling
 */
export const toastItemVariants = cva(
  [
    // Layout
    'flex',
    'items-start',
    'pointer-events-auto',
    // Sizing
    'lm-rounded-toast',
    'lm-shadow-toast',
    'lm-px-toast',
    'lm-py-toast',
    'lm-gap-toast',
    'lm-max-w-toast',
    'lm-min-w-toast',
    // Border (defaults to transparent)
    'lm-border-toast',
    'border-solid',
    // Transitions
    'transition-[opacity,transform]',
    'lm-duration-toast',
    'lm-ease-toast',
  ],
  {
    variants: {
      variant: {
        info: [
          'lm-bg-toast-info',
          'lm-text-toast-info',
          'lm-border-toast-info',
        ],
        success: [
          'lm-bg-toast-success',
          'lm-text-toast-success',
          'lm-border-toast-success',
        ],
        warning: [
          'lm-bg-toast-warning',
          'lm-text-toast-warning',
          'lm-border-toast-warning',
        ],
        error: [
          'lm-bg-toast-error',
          'lm-text-toast-error',
          'lm-border-toast-error',
        ],
      },
      state: {
        entering: [
          'opacity-100',
          'translate-x-0',
          'translate-y-0',
          'scale-100',
        ],
        visible: ['opacity-100', 'translate-x-0', 'translate-y-0', 'scale-100'],
        exiting: ['opacity-0', 'scale-95'],
      },
    },
    compoundVariants: [
      // Initial state for entering animations (will be animated to 'entering')
      {
        state: 'entering',
        class: [],
      },
    ],
    defaultVariants: {
      variant: 'info',
      state: 'visible',
    },
  },
);

/**
 * Toast Icon Variants
 * Icon container with variant-specific colors
 */
export const toastIconVariants = cva(['shrink-0', 'lm-size-toast-icon'], {
  variants: {
    variant: {
      info: ['lm-text-toast-icon-info'],
      success: ['lm-text-toast-icon-success'],
      warning: ['lm-text-toast-icon-warning'],
      error: ['lm-text-toast-icon-error'],
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

/**
 * Toast Content Variants
 * Container for title and message
 */
export const toastContentVariants = cva([
  'flex',
  'flex-col',
  'flex-1',
  'min-w-0',
]);

/**
 * Toast Title Variants
 * Title text styling
 */
export const toastTitleVariants = cva([
  'lm-text-size-toast-title',
  'lm-font-toast-title',
  'lm-leading-toast-title',
]);

/**
 * Toast Message Variants
 * Message text styling
 */
export const toastMessageVariants = cva([
  'lm-text-size-toast-message',
  'lm-leading-toast-message',
]);

/**
 * Toast Close Button Variants
 * Close button styling with variant-specific hover colors
 */
export const toastCloseVariants = cva(
  [
    'shrink-0',
    'p-1',
    'lm-rounded-toast-close',
    'transition-colors',
    'lm-duration-toast',
    'focus:outline-none',
    'focus-visible:lm-ring-focus',
    'cursor-pointer',
    '-mr-1',
    '-mt-1',
  ],
  {
    variants: {
      variant: {
        info: [
          'lm-text-toast-close-info',
          'hover:lm-text-toast-close-info-hover',
        ],
        success: [
          'lm-text-toast-close-success',
          'hover:lm-text-toast-close-success-hover',
        ],
        warning: [
          'lm-text-toast-close-warning',
          'hover:lm-text-toast-close-warning-hover',
        ],
        error: [
          'lm-text-toast-close-error',
          'hover:lm-text-toast-close-error-hover',
        ],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

// Type exports
export type ToastContainerVariants = VariantProps<
  typeof toastContainerVariants
>;
export type ToastItemVariants = VariantProps<typeof toastItemVariants>;
export type ToastIconVariants = VariantProps<typeof toastIconVariants>;
export type ToastContentVariants = VariantProps<typeof toastContentVariants>;
export type ToastTitleVariants = VariantProps<typeof toastTitleVariants>;
export type ToastMessageVariants = VariantProps<typeof toastMessageVariants>;
export type ToastCloseVariants = VariantProps<typeof toastCloseVariants>;

// Convenience types
export type ToastPosition = NonNullable<ToastContainerVariants['position']>;
export type ToastVariant = NonNullable<ToastItemVariants['variant']>;
export type ToastState = NonNullable<ToastItemVariants['state']>;
