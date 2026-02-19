import { cva, type VariantProps } from 'class-variance-authority';

export const helperTextVariants = cva(
  [
    // Base styles
    'block',
    'text-muted-foreground',
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

export type HelperTextVariants = VariantProps<typeof helperTextVariants>;
export type HelperTextSize = NonNullable<HelperTextVariants['size']>;
