import { Directive, inject, computed } from '@angular/core';
import { accordionContentVariants } from '@lumaui/core';
import { ACCORDION_ITEM } from './accordion.tokens';
import { LmAccordionTriggerDirective } from './accordion-trigger.directive';

let uniqueId = 0;

/**
 * AccordionContentDirective
 *
 * Applied to the content area of the accordion.
 * Handles visibility, ARIA attributes, and fade animation.
 *
 * @example Basic usage
 * ```html
 * <div lumaAccordionContent>
 *   <p>Your content here...</p>
 * </div>
 * ```
 */
@Directive({
  selector: '[lumaAccordionContent]',
  host: {
    '[class]': 'classes()',
    role: 'region',
    '[id]': 'contentId',
    '[attr.aria-labelledby]': 'triggerId()',
    '[attr.hidden]': '!item.isOpen() ? "" : null',
  },
})
export class LmAccordionContentDirective {
  protected item = inject(ACCORDION_ITEM);
  protected trigger = inject(LmAccordionTriggerDirective, { optional: true });

  private id = ++uniqueId;
  contentId = `luma-accordion-content-${this.id}`;

  triggerId = computed(() => this.trigger?.triggerId ?? null);

  classes = computed(() =>
    accordionContentVariants({ open: this.item.isOpen() }),
  );
}
