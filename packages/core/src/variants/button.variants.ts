import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    // Layout
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',

    // Typography
    'font-medium',
    'whitespace-nowrap',

    // Transitions (calm interactions)
    'transition-colors',
    'duration-200',

    // Accessibility
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Disabled state
    'disabled:pointer-events-none',
    'disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary',
          'text-white',
          'hover:bg-primary/90',
          'active:bg-primary/95',
        ],
        secondary: [
          'bg-secondary',
          'text-secondary-foreground',
          'hover:bg-secondary/80',
          'active:bg-secondary/90',
        ],
        outline: [
          'border',
          'text-primary',
          'border-primary',
          'hover:bg-primary/10',
          'active:bg-primary/10',
        ],
        ghost: [
          'text-primary',
          'hover:bg-primary/10',
          'active:bg-primary/90',
        ],
        destructive: [
          'bg-destructive',
          'text-destructive-foreground',
          'hover:bg-destructive/90',
          'active:bg-destructive/95',
        ],
      },
      size: {
        sm: [
          'text-xs',        // 12px
          'px-3',           // 12px
          'py-2',           // 8px
        ],
        md: [
          'text-sm',        // 14px
          'px-4',           // 16px
          'py-2.5',         // 10px
        ],
        lg: [
          'text-base',      // 16px
          'px-5',           // 20px
          'py-3',           // 12px
        ],
      },
      radius: {
        default: ['rounded-[var(--radius-4)]'],  // 8px - uses radius-4 token
        square: ['rounded-none'],                // 0px - sharp corners
        full: ['rounded-full'],                  // 9999px - pill shape
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariants['variant']>;
export type ButtonSize = NonNullable<ButtonVariants['size']>;
export type ButtonRadius = NonNullable<ButtonVariants['radius']>;
