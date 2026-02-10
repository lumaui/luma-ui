import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Card wrapper variants - semantic styling with Tailwind utilities
 */
export const cardVariants = cva(
  [
    // Base layout
    'relative',
    'w-full',
    // Semantic styling
    'rounded-[var(--radius-5)]',
    'border',
    'border-border',
    'bg-card',
    'text-card-foreground',
    // Padding - moved from content to wrapper for flexibility
    'p-6',
  ],
  {
    variants: {
      variant: {
        // Default card - simple border with subtle shadow
        default: ['shadow-[var(--shadow-2)]'],
        // Elevated card with medium shadow
        elevated: ['shadow-[var(--shadow-3)]'],
        // Ghost card - no border
        ghost: ['border-transparent', 'shadow-none'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Card content area - layout without padding (padding on wrapper)
 */
export const cardContentVariants = cva(['flex', 'flex-col', 'gap-4', 'mt-4']);

/**
 * Card header - typically contains title and description
 */
export const cardHeaderVariants = cva(['flex', 'flex-col', 'gap-1.5']);

/**
 * Card title - prominent heading
 */
export const cardTitleVariants = cva(
  ['font-semibold', 'leading-none', 'tracking-tight'],
  {
    variants: {
      size: {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

/**
 * Card description - supporting text
 */
export const cardDescriptionVariants = cva(
  ['text-sm', 'text-muted-foreground'],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

// Export types
export type CardVariants = VariantProps<typeof cardVariants>;
export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>;
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;
export type CardDescriptionVariants = VariantProps<
  typeof cardDescriptionVariants
>;

export type CardVariant = NonNullable<CardVariants['variant']>;
export type CardTitleSize = NonNullable<CardTitleVariants['size']>;
export type CardDescriptionSize = NonNullable<CardDescriptionVariants['size']>;
