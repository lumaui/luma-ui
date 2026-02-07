import { Directive, input, computed, HostBinding } from '@angular/core';
import {
  buttonVariants,
  type ButtonVariant,
  type ButtonSize,
  type ButtonRadius,
} from '@lumaui/core';

@Directive({
  selector: 'button[lumaButton], a[lumaButton]',
  host: {
    '[attr.type]': 'lmType()',
    '[attr.disabled]': 'lmDisabled() ? "" : null',
  },
})
export class LmButtonDirective {
  // Signal-based inputs with lm prefix (Angular 20+)
  lmVariant = input<ButtonVariant>('primary');
  lmSize = input<ButtonSize>('md');
  lmRadius = input<ButtonRadius>('default');
  lmDisabled = input<boolean>(false);
  lmType = input<'button' | 'submit' | 'reset'>('button');

  // Computed class string
  classes = computed(() =>
    buttonVariants({
      variant: this.lmVariant(),
      size: this.lmSize(),
      radius: this.lmRadius(),
    }),
  );

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes();
  }
}
