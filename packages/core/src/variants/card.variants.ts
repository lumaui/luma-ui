import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Card wrapper variants with support for different card styles
 */
export const cardVariants = cva(
  [
    // Base classes for all card variants
    'relative',
    'flex',
    'h-full',
    'w-full',
  ],
  {
    variants: {
      variant: {
        // Default card style with solid border
        default: ['lm-rounded-lg', 'border', 'lm-border-neutral-60'],
        // Shadow card - elevated with shadow
        shadow: [
          'lm-rounded-card-shadow',
          'lm-bg-card-shadow',
          'border',
          'lm-border-card-shadow',
          'lm-shadow-card-shadow',
        ],
        // Nested card - subtle background for sections within cards
        nested: [
          'lm-rounded-card-nested',
          'lm-bg-card-nested',
          'border',
          'lm-border-card-nested',
        ],
        // Preview card - for documentation examples
        preview: [
          'lm-rounded-card-preview',
          'lm-bg-card-preview',
          'border',
          'lm-border-card-preview',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

/**
 * Card content area variants
 */
export const cardContentVariants = cva(
  ['lm-text-primary', 'flex', 'flex-col', 'h-full', 'w-full'],
  {
    variants: {
      variant: {
        // Content inside default wrapper uses same radius
        default: ['lm-rounded-lg', 'lm-bg-card-background', 'lm-p-card'],
        // Shadow/nested/preview cards have padding directly
        shadow: ['lm-p-card'],
        nested: ['lm-p-card'],
        preview: ['lm-p-card'],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const cardTitleVariants = cva(
  ['font-medium', 'tracking-tight', 'mb-1', 'lm-text-primary'],
  {
    variants: {
      size: {
        small: ['text-sm'],
        normal: ['text-lg'],
        large: ['text-2xl'],
      },
    },
    defaultVariants: {
      size: 'normal',
    },
  },
);

export const cardDescriptionVariants = cva(['lm-text-secondary', 'mb-5'], {
  variants: {
    size: {
      small: ['text-xs'],
      normal: ['text-sm'],
      large: ['text-base'],
    },
  },
  defaultVariants: {
    size: 'normal',
  },
});

export type CardVariants = VariantProps<typeof cardVariants>;
export type CardContentVariants = VariantProps<typeof cardContentVariants>;
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;
export type CardDescriptionVariants = VariantProps<
  typeof cardDescriptionVariants
>;
export type CardVariant = NonNullable<CardVariants['variant']>;
export type CardTitleSize = NonNullable<CardTitleVariants['size']>;
export type CardDescriptionSize = NonNullable<CardDescriptionVariants['size']>;
