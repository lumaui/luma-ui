import { cva } from 'class-variance-authority';

export const tooltipVariants = cva(
  [
    // Portal positioning (fixed = viewport-relative)
    'fixed',
    'z-50',
    // High-contrast popover styling
    'bg-popover',
    'text-popover-foreground',
    'px-3',
    'py-1.5',
    'text-sm',
    'rounded-md',
    'shadow-md',
    'max-w-[360px]',
    'transition-opacity',
    'duration-200',
    'whitespace-normal',
    'text-center',
    'pointer-events-none',
  ],
  {
    variants: {
      visible: {
        true: ['opacity-100', 'pointer-events-auto'],
        false: ['opacity-0'],
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
