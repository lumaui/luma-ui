import { Directive, inject, computed } from '@angular/core';
import { accordionIconVariants } from '@lumaui/core';
import { ACCORDION_ITEM } from './accordion.tokens';

/**
 * AccordionIconDirective
 *
 * Applies rotation animation to the accordion icon (typically a chevron).
 * Must be placed on a wrapper element (span or div), not directly on the SVG.
 * Automatically rotates based on the open state of the parent accordion item.
 *
 * @example With span wrapper (recommended)
 * ```html
 * <span lumaAccordionIcon>
 *   <svg viewBox="0 0 24 24" class="w-4 h-4">
 *     <path stroke="currentColor" stroke-width="2" d="M19 9l-7 7-7-7" />
 *   </svg>
 * </span>
 * ```
 *
 * @example With div wrapper
 * ```html
 * <div lumaAccordionIcon>
 *   <my-chevron-icon></my-chevron-icon>
 * </div>
 * ```
 *
 * @example Customize rotation via CSS variable
 * ```html
 * <span lumaAccordionIcon style="--luma-accordion-icon-rotation: 90deg">
 *   <svg>...</svg>
 * </span>
 * ```
 */
@Directive({
  selector: 'span[lumaAccordionIcon], div[lumaAccordionIcon]',
  host: {
    '[class]': 'classes()',
    '[attr.aria-hidden]': 'true',
  },
})
export class LmAccordionIconDirective {
  protected item = inject(ACCORDION_ITEM);

  classes = computed(() => accordionIconVariants({ open: this.item.isOpen() }));
}
