import { cva, type VariantProps } from 'class-variance-authority';

export const labelVariants = cva(
  [
    // Base styles
    'block',
    'font-medium',
    'text-foreground',
  ],
  {
    variants: {
      size: {
        sm: ['text-xs'],
        md: ['text-sm'],
        lg: ['text-base'],
      },
      required: {
        true: ["after:content-['*']", 'after:ml-1', 'after:text-destructive'],
        false: [],
      },
      inline: {
        true: ['mb-0', 'leading-none'],
        false: [],
      },
    },
    defaultVariants: {
      size: 'md',
      required: false,
      inline: false,
    },
  },
);

export type LabelVariants = VariantProps<typeof labelVariants>;
export type LabelSize = NonNullable<LabelVariants['size']>;
