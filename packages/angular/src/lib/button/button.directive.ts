import { Directive, input, computed, HostBinding } from '@angular/core';
import {
  buttonVariants,
  type ButtonVariant,
  type ButtonSize,
} from '@lumaui/core';

@Directive({
  selector: 'button[lumaButton], a[lumaButton]',
  host: {
    '[attr.type]': 'lmType()',
    '[attr.disabled]': 'lmDisabled() ? "" : null',
  },
})
export class ButtonDirective {
  // Signal-based inputs with lm prefix (Angular 20+)
  lmVariant = input<ButtonVariant>('primary');
  lmSize = input<ButtonSize>('md');
  lmDisabled = input<boolean>(false);
  lmType = input<'button' | 'submit' | 'reset'>('button');

  // Computed class string
  classes = computed(() =>
    buttonVariants({
      variant: this.lmVariant(),
      size: this.lmSize(),
    }),
  );

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes();
  }
}
