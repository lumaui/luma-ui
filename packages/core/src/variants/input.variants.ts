import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
  [
    // Layout
    'w-full',

    // Typography
    'font-normal',
    'placeholder:text-muted-foreground',

    // Transitions (calm interactions)
    'transition-colors',
    'duration-200',

    // Base styling (formerly "outline" variant)
    'border',
    'bg-transparent',

    // Focus state (formerly "focus" variant)
    'focus:outline-none',

    // Accessibility
    'focus-visible:outline-none',

    // Disabled statez
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-4',
    'disabled:border-gray-5',

    // Readonly state
    'read-only:bg-[--color-gray-9]',
    'read-only:border-transparent',
    'read-only:cursor-default',
  ],
  {
    variants: {
      size: {
        sm: ['h-8', 'px-2.5', 'text-xs', 'rounded-[var(--radius-3)]'],
        md: ['h-10', 'px-3', 'text-sm', 'rounded-[var(--radius-4)]'],
        lg: ['h-12', 'px-3.5', 'text-base', 'rounded-[var(--radius-5)]'],
      },
      error: {
        true: ['border-destructive', 'focus-visible:border-destructive'],
        false: [
          'border-gray-5',
          'hover:border-gray-9',
          'focus-visible:border-gray-9',
        ],
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  },
);

export type InputVariants = VariantProps<typeof inputVariants>;
export type InputSize = NonNullable<InputVariants['size']>;
