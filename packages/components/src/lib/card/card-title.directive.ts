import { Directive, input, computed } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

const cardTitleVariants = cva(
  ['font-medium', 'tracking-tight', 'mb-1', 'text-text-primary'],
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

@Directive({
  selector: '[lumaCardTitle]',
  host: {
    '[class]': 'classes()',
  },
})
export class CardTitleDirective {
  // Signal-based inputs (Angular 20+)
  size = input<'small' | 'normal' | 'large'>('normal');

  // Computed class string
  classes = computed(() => cardTitleVariants({ size: this.size() }));
}

export type CardTitleVariants = VariantProps<typeof cardTitleVariants>;
