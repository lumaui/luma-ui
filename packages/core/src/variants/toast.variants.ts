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
 * Individual toast notification styling
 */
export const toastItemVariants = cva(
  [
    'flex',
    'items-start',
    'gap-3',
    'pointer-events-auto',
    'rounded-[var(--radius-4)]',
    'shadow-[var(--shadow-4)]',
    'px-4',
    'py-3',
    'min-w-[320px]',
    'max-w-md',
    'border',
    'transition-all',
    'duration-300',
  ],
  {
    variants: {
      variant: {
        info: ['bg-primary/10', 'text-primary', 'border-primary/30'],
        success: ['bg-success/10', 'text-success', 'border-success/30'],
        warning: ['bg-warning/15', 'text-warning', 'border-warning/30'],
        error: [
          'bg-destructive/10',
          'text-destructive',
          'border-destructive/30',
        ],
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
 * Icon container with variant-specific colors
 */
export const toastIconVariants = cva(['shrink-0', 'h-5', 'w-5'], {
  variants: {
    variant: {
      info: ['text-primary/85'],
      success: ['text-success/75'],
      warning: ['text-warning/70'],
      error: ['text-destructive/80'],
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
  'gap-1',
  'flex-1',
  'min-w-0',
]);

/**
 * Toast Title Variants
 * Title text styling
 */
export const toastTitleVariants = cva([
  'text-sm',
  'font-semibold',
  'leading-none',
]);

/**
 * Toast Message Variants
 * Message text styling
 */
export const toastMessageVariants = cva(['text-sm', 'leading-relaxed']);

/**
 * Toast Close Button Variants
 * Close button styling with variant-specific hover colors
 */
export const toastCloseVariants = cva(
  [
    'shrink-0',
    'rounded-md',
    'p-1',
    'opacity-70',
    'transition-opacity',
    'hover:opacity-100',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary',
    'cursor-pointer',
    '-mr-1',
    '-mt-0.5',
  ],
  {
    variants: {
      variant: {
        info: ['text-primary'],
        success: ['text-success'],
        warning: ['text-warning'],
        error: ['text-destructive'],
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
