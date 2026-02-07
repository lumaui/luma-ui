import { Directive, input, computed, HostBinding } from '@angular/core';
import {
  badgeVariants,
  type BadgeVariant,
  type BadgeRadius,
} from '@lumaui/core';

@Directive({
  selector: '[lumaBadge]',
})
export class LmBadgeDirective {
  // Signal-based inputs with lm prefix (Angular 20+)
  lmVariant = input<BadgeVariant>('default');
  lmRadius = input<BadgeRadius>('default');

  // Computed class string
  classes = computed(() =>
    badgeVariants({
      variant: this.lmVariant(),
      radius: this.lmRadius(),
    }),
  );

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes();
  }
}
