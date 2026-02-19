import { Directive, computed, input } from '@angular/core';
import { labelVariants, type LabelSize } from '@lumaui/core';

/**
 * Label directive with required indicator support
 *
 * @example
 * <label lumaLabel for="email" lmRequired>Email</label>
 */
@Directive({
  selector: 'label[lumaLabel]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.for]': 'for()',
  },
})
export class LmLabelDirective {
  for = input<string>('');
  lmRequired = input<boolean>(false);
  lmSize = input<LabelSize>('md');
  lmInline = input<boolean>(false);

  classes = computed(() =>
    labelVariants({
      size: this.lmSize(),
      required: this.lmRequired(),
      inline: this.lmInline(),
    }),
  );
}
