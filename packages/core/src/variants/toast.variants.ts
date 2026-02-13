import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Toast Container Variants
 * Fixed-position container that holds all toasts
 */
export const toastContainerVariants = cva(
  ['fixed', 'z-[100]', 'flex', 'flex-col', 'gap-2', 'pointer-events-none'],
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
 * Individual toast notification styling with clean white background
 */
export const toastItemVariants = cva(
  [
    'flex',
    'items-center',
    'overflow-hidden',
    'pointer-events-auto',
    'rounded-xl',
    'shadow-[var(--shadow-4)]',
    'min-w-[320px]',
    'max-w-md',
    'bg-white',
    'dark:bg-gray-800',
    'transition-all',
    'duration-300',
  ],
  {
    variants: {
      variant: {
        // Variants now only affect icon color (via toastIconVariants)
        // Background is always white (light) or dark gray (dark theme)
        info: [],
        success: [],
        warning: [],
        error: [],
      },
      state: {
        entering: ['animate-in', 'slide-in-from-top-2', 'fade-in'],
        visible: ['opacity-100'],
        exiting: ['animate-out', 'slide-out-to-top-2', 'fade-out'],
      },
    },
    defaultVariants: {
      variant: 'info',
      state: 'visible',
    },
  },
);

/**
 * Toast Icon Variants
 * Integrated icon container with rounded left corners
 */
export const toastIconVariants = cva(
  [
    'shrink-0',
    'self-stretch',
    'rounded-l-xl',
    'flex',
    'items-center',
    'justify-center',
    'p-4',
    'w-auto',
  ],
  {
    variants: {
      variant: {
        info: ['bg-primary', 'text-white'],
        success: ['bg-success', 'text-white'],
        warning: ['bg-warning', 'text-white'],
        error: ['bg-destructive', 'text-white'],
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  },
);

/**
 * Toast Content Variants
 * Container for title and message with internal padding
 */
export const toastContentVariants = cva([
  'flex',
  'flex-col',
  'gap-1',
  'flex-1',
  'min-w-0',
  'px-4',
  'py-4',
]);

/**
 * Toast Title Variants
 * Title text styling with neutral colors and dark mode support
 */
export const toastTitleVariants = cva([
  'text-sm',
  'font-semibold',
  'leading-none',
  'text-gray-900',
  'dark:text-white',
]);

/**
 * Toast Message Variants
 * Message text styling with neutral colors and dark mode support
 */
export const toastMessageVariants = cva([
  'text-sm',
  'leading-relaxed',
  'text-gray-600',
  'dark:text-white',
]);

/**
 * Toast Close Button Variants
 * Close button styling with neutral gray colors
 */
export const toastCloseVariants = cva(
  [
    'shrink-0',
    'rounded-md',
    'p-1',
    'mr-2',
    'opacity-70',
    'transition-opacity',
    'hover:opacity-100',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        info: ['text-gray-500', 'hover:bg-gray-100', 'dark:hover:bg-gray-700'],
        success: [
          'text-gray-500',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-700',
        ],
        warning: [
          'text-gray-500',
          'hover:bg-gray-100',
          'dark:hover:bg-gray-700',
        ],
        error: ['text-gray-500', 'hover:bg-gray-100', 'dark:hover:bg-gray-700'],
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
