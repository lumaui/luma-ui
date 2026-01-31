import { cva } from 'class-variance-authority';

export const badgeVariants = cva([
  // Layout
  'inline-flex',
  'items-center',
  'justify-center',
  'whitespace-nowrap',
  // Typography
  'lm-font-badge',
  'leading-tight',
  'lm-text-size-badge',
  // Border
  'border',
  'lm-border-w-badge',
  // Radius
  'lm-rounded-badge',
  // Padding
  'lm-px-badge',
  'lm-py-badge',
]);
