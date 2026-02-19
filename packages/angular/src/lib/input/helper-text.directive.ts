import { Directive, computed, input, signal } from '@angular/core';
import { helperTextVariants, type HelperTextSize } from '@lumaui/core';

let helperIdCounter = 0;

/**
 * Helper text directive for displaying hint/description text
 *
 * @example
 * <span lumaHelperText>We'll never share your email.</span>
 */
@Directive({
  selector: '[lumaHelperText]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'elementId()',
  },
})
export class LmHelperTextDirective {
  elementId = signal<string>(`luma-helper-${helperIdCounter++}`);
  lmSize = input<HelperTextSize>('sm');

  classes = computed(() => helperTextVariants({ size: this.lmSize() }));
}
