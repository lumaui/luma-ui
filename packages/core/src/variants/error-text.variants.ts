import { cva, type VariantProps } from 'class-variance-authority';

export const errorTextVariants = cva(
  [
    // Base styles
    'block',
    'text-destructive',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs', 'mt-1'],
        md: ['text-sm', 'mt-1.5'],
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

export type ErrorTextVariants = VariantProps<typeof errorTextVariants>;
export type ErrorTextSize = NonNullable<ErrorTextVariants['size']>;
