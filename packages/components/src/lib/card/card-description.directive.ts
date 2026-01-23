import { Directive, input, computed } from '@angular/core';
import { cva, type VariantProps } from 'class-variance-authority';

const cardDescriptionVariants = cva(['text-text-secondary', 'mb-5'], {
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

@Directive({
  selector: '[lumaCardDescription]',
  host: {
    '[class]': 'classes()',
  },
})
export class CardDescriptionDirective {
  // Signal-based inputs (Angular 20+)
  size = input<'small' | 'normal' | 'large'>('normal');

  // Computed class string
  classes = computed(() => cardDescriptionVariants({ size: this.size() }));
}

export type CardDescriptionVariants = VariantProps<
  typeof cardDescriptionVariants
>;
