import { cva, type VariantProps } from 'class-variance-authority';

export const radioVariants = cva(
  [
    // Layout
    'h-4',
    'w-4',
    'shrink-0',

    // Reset native appearance
    'appearance-none',

    // Shape (circle)
    'rounded-full',
    'border',

    // Cursor
    'cursor-pointer',

    // Transitions (calm interactions)
    'transition-colors',
    'duration-200',

    // Focus state
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-ring',
    'focus-visible:ring-offset-2',

    // Disabled state
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
  ],
  {
    variants: {
      // Mutually exclusive error variant — default border classes live in `error: false`
      // to avoid Tailwind v4 cascade conflicts (see Form Directive Architecture notes)
      error: {
        true: ['border-destructive'],
        false: [
          'border-gray-5',
          'hover:border-gray-9',
          'checked:border-primary',
        ],
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export type RadioVariants = VariantProps<typeof radioVariants>;
