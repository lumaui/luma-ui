import { cva, type VariantProps } from 'class-variance-authority';

export const tooltipVariants = cva(
  [
    // Base positioning
    'absolute',
    'z-50',
    // Styling
    'lm-bg-tooltip',
    'lm-text-tooltip',
    'lm-text-size-tooltip',
    'lm-rounded-tooltip',
    'lm-p-tooltip',
    'lm-shadow-tooltip',
    'w-max',
    'lm-max-w-tooltip',
    // Animation base
    'transition-[opacity,transform]',
    'lm-duration-tooltip',
    'lm-ease-tooltip',
    // Prevent interaction when hidden
    'pointer-events-none',
    // Typography
    'whitespace-normal',
    'text-center',
  ],
  {
    variants: {
      position: {
        top: [
          'bottom-full',
          'left-1/2',
          '-translate-x-1/2',
          'mb-[var(--luma-tooltip-offset)]',
        ],
        bottom: [
          'top-full',
          'left-1/2',
          '-translate-x-1/2',
          'mt-[var(--luma-tooltip-offset)]',
        ],
        left: [
          'right-full',
          'top-1/2',
          '-translate-y-1/2',
          'mr-[var(--luma-tooltip-offset)]',
        ],
        right: [
          'left-full',
          'top-1/2',
          '-translate-y-1/2',
          'ml-[var(--luma-tooltip-offset)]',
        ],
      },
      visible: {
        true: ['opacity-100', 'scale-100', 'pointer-events-auto'],
        false: ['opacity-0', 'scale-95'],
      },
    },
    defaultVariants: {
      position: 'top',
      visible: false,
    },
  },
);

export type TooltipPosition = NonNullable<
  VariantProps<typeof tooltipVariants>['position']
>;
