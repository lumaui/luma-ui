import { Directive, computed, HostBinding } from '@angular/core';
import { badgeVariants } from '@lumaui/core';

@Directive({
  selector: '[lumaBadge]',
})
export class BadgeDirective {
  // Computed class string - layout only, no variants
  classes = computed(() => badgeVariants());

  @HostBinding('class')
  get hostClasses(): string {
    return this.classes();
  }
}
