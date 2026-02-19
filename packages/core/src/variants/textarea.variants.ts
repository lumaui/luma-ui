import { cva, type VariantProps } from 'class-variance-authority';

export const textareaVariants = cva(
  [
    // Layout
    'w-full',

    // Typography
    'font-normal',
    'placeholder:text-muted-foreground',

    // Transitions (calm interactions — Neo-Minimal)
    'transition-colors',
    'duration-200',

    // Base styling
    'border',
    'bg-transparent',

    // Resize: vertical only — prevents horizontal layout disruption
    'resize-y',

    // Focus state
    'focus:outline-none',
    'focus-visible:outline-none',

    // Disabled state
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-4',
    'disabled:border-gray-5',
    'disabled:resize-none',

    // Readonly state
    'read-only:bg-[--color-gray-9]',
    'read-only:border-transparent',
    'read-only:cursor-default',
    'read-only:resize-none',
  ],
  {
    variants: {
      size: {
        sm: [
          'min-h-20',
          'py-1.5',
          'px-2.5',
          'text-xs',
          'rounded-[var(--radius-3)]',
        ],
        md: [
          'min-h-24',
          'py-2',
          'px-3',
          'text-sm',
          'rounded-[var(--radius-4)]',
        ],
        lg: [
          'min-h-32',
          'py-2.5',
          'px-3.5',
          'text-base',
          'rounded-[var(--radius-5)]',
        ],
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

export type TextareaVariants = VariantProps<typeof textareaVariants>;
export type TextareaSize = NonNullable<TextareaVariants['size']>;
