import { Directive, input, computed, HostBinding } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  [
    // Base classes
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'leading-snug',
    'transition-[color_var(--luma-button-transition-duration)_var(--luma-button-transition-timing)]',
    'focus:outline-none',
    'focus-visible:ring-button-focus',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-button-primary-bg',
          'text-button-primary-text',
          'hover:bg-button-primary-bg-hover',
          'active:bg-button-primary-bg-active',
        ],
        outline: [
          'bg-transparent',
          'text-button-outline-text',
          'border',
          'border-button-outline-border',
          'hover:border-button-outline-border-hover',
          'hover:bg-button-outline-bg-hover',
        ],
        ghost: [
          'bg-button-ghost-bg',
          'text-button-ghost-text',
          'hover:bg-button-ghost-bg-hover',
        ],
        danger: [
          'bg-button-danger-bg',
          'text-button-danger-text',
          'hover:bg-button-danger-bg-hover',
          'active:bg-button-danger-bg-active',
        ],
      },
      size: {
        sm: [
          'px-[var(--luma-button-padding-x-sm)]',
          'py-[var(--luma-button-padding-y-sm)]',
          'text-sm',
          'rounded-[var(--luma-button-radius)]',
        ],
        md: [
          'px-[var(--luma-button-padding-x-md)]',
          'py-[var(--luma-button-padding-y-md)]',
          'text-luma-base',
          'rounded-[var(--luma-button-radius)]',
        ],
        lg: [
          'px-[var(--luma-button-padding-x-lg)]',
          'py-[var(--luma-button-padding-y-lg)]',
          'text-lg',
          'rounded-[var(--luma-button-radius)]',
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

@Directive({
  selector: 'button[lumaButton], a[lumaButton]',
  host: {
    '[attr.type]': 'type()',
    '[attr.disabled]': 'disabled() ? "" : null',
  },
})
export class ButtonDirective {
  // Signal-based inputs (Angular 20+)
  variant = input<'primary' | 'outline' | 'ghost' | 'danger'>('primary');
  size = input<'sm' | 'md' | 'lg' | 'full'>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');

  // Computed class string
  classes = computed(() =>
    buttonVariants({
      variant: this.variant(),
      size: this.size(),
    }),
  );

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes();
  }
}
