import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'whitespace-nowrap',
    'text-xs',
    'font-medium',
    'border',
    'px-2',
    'py-0.5',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-primary-2',
          'text-primary-12',
          'border-transparent',
        ],
        outline: [
          'bg-transparent',
          'text-primary-12',
          'border-primary-7',
        ],
      },
      radius: {
        default: ['rounded-[var(--radius-4)]'],  // 8px - uses radius-4 token
        square: ['rounded-none'],                // 0px - sharp corners
        full: ['rounded-full'],                  // 9999px - pill shape
      },
    },
    defaultVariants: {
      variant: 'default',
      radius: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type BadgeVariant = NonNullable<BadgeVariants['variant']>;
export type BadgeRadius = NonNullable<BadgeVariants['radius']>;
