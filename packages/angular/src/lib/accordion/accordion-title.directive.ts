import { Directive, input, computed } from '@angular/core';
import { accordionTitleVariants, type AccordionTitleSize } from '@lumaui/core';

/**
 * AccordionTitleDirective
 *
 * Applies typography styles to the accordion title.
 * Supports size variants for different visual hierarchies.
 *
 * @example Basic usage
 * ```html
 * <span lumaAccordionTitle>What is Luma UI?</span>
 * ```
 *
 * @example With size variant
 * ```html
 * <span lumaAccordionTitle lmSize="lg">Large Title</span>
 * ```
 */
@Directive({
  selector: '[lumaAccordionTitle]',
  host: {
    '[class]': 'classes()',
  },
})
export class AccordionTitleDirective {
  /**
   * Size variant for the title
   * - sm: Small text for compact UIs
   * - md: Default size (base text)
   * - lg: Large text for emphasis
   */
  lmSize = input<AccordionTitleSize>('md');

  classes = computed(() => accordionTitleVariants({ size: this.lmSize() }));
}
