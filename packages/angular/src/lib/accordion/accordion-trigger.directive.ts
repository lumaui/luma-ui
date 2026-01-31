import { Directive, inject, computed, HostListener } from '@angular/core';
import { accordionTriggerVariants } from '@lumaui/core';
import { ACCORDION_ITEM } from './accordion.tokens';

let uniqueId = 0;

/**
 * AccordionTriggerDirective
 *
 * Applied to a div element to make it the clickable trigger for the accordion.
 * Uses div instead of button for maximum layout flexibility.
 * Handles ARIA attributes and keyboard navigation automatically.
 *
 * @example Basic usage
 * ```html
 * <div lumaAccordionTrigger>
 *   <span lumaAccordionTitle>Title</span>
 *   <span lumaAccordionIcon>
 *     <svg>...</svg>
 *   </span>
 * </div>
 * ```
 *
 * @example Custom layout
 * ```html
 * <div lumaAccordionTrigger class="grid grid-cols-[auto_1fr_auto] gap-4">
 *   <svg class="w-6 h-6">...</svg>
 *   <div>
 *     <span lumaAccordionTitle>Title</span>
 *     <p class="text-sm">Description</p>
 *   </div>
 *   <span lumaAccordionIcon>
 *     <svg>...</svg>
 *   </span>
 * </div>
 * ```
 */
@Directive({
  selector: 'div[lumaAccordionTrigger]',
  host: {
    '[class]': 'classes()',
    role: 'button',
    '[attr.tabindex]': 'item.lmDisabled() ? -1 : 0',
    '[attr.aria-expanded]': 'item.isOpen()',
    '[attr.aria-controls]': 'contentId',
    '[attr.aria-disabled]': 'item.lmDisabled() ? "true" : null',
    '[id]': 'triggerId',
  },
})
export class AccordionTriggerDirective {
  protected item = inject(ACCORDION_ITEM);

  private id = ++uniqueId;
  triggerId = `luma-accordion-trigger-${this.id}`;
  contentId = `luma-accordion-content-${this.id}`;

  classes = computed(() => accordionTriggerVariants());

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.item.lmDisabled()) return;
    event.preventDefault();
    this.item.toggle();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.item.lmDisabled()) return;

    // Space and Enter don't trigger on div natively - manual handler required
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault();
      this.item.toggle();
    }
  }
}
