import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  [
    // Base classes
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'leading-snug',
    'transition-[color_var(--luma-button-transition-duration)_var(--luma-button-transition-timing)]',
    'focus:outline-none',
    'focus-visible:lm-ring-button-focus',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'lm-bg-button-primary-bg',
          'lm-text-button-primary-text',
          'hover:lm-bg-button-primary-bg-hover',
          'active:lm-bg-button-primary-bg-active',
        ],
        outline: [
          'bg-transparent',
          'lm-text-button-outline-text',
          'border',
          'lm-border-button-outline-border',
          'hover:lm-border-button-outline-border-hover',
          'hover:lm-bg-button-outline-bg-hover',
        ],
        ghost: [
          'lm-bg-button-ghost-bg',
          'lm-text-button-ghost-text',
          'hover:lm-bg-button-ghost-bg-hover',
        ],
        danger: [
          'lm-bg-button-danger-bg',
          'lm-text-button-danger-text',
          'hover:lm-bg-button-danger-bg-hover',
          'active:lm-bg-button-danger-bg-active',
        ],
      },
      size: {
        sm: [
          'px-[var(--luma-button-padding-x-sm)]',
          'py-[var(--luma-button-padding-y-sm)]',
          'text-sm',
          'lm-rounded-button',
        ],
        md: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
          'lm-text-size-base',
          'lm-rounded-button',
        ],
        lg: [
          'px-[var(--luma-button-padding-x-lg)]',
          'py-[var(--luma-button-padding-y-lg)]',
          'text-lg',
          'lm-rounded-button',
        ],
        full: ['w-full'],
      },
    },
    compoundVariants: [
      {
        size: 'full',
        variant: 'primary',
        class: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
        ],
      },
      {
        size: 'full',
        variant: 'outline',
        class: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
        ],
      },
      {
        size: 'full',
        variant: 'ghost',
        class: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
        ],
      },
      {
        size: 'full',
        variant: 'danger',
        class: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
        ],
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariants['variant']>;
export type ButtonSize = NonNullable<ButtonVariants['size']>;
