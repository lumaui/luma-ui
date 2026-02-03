import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  Renderer2,
  signal,
} from '@angular/core';
import {
  accordionItemVariants,
  accordionContentWrapperVariants,
  type AccordionItemVariant,
} from '@lumaui/core';
import { ACCORDION_ITEM, type AccordionItemBase } from './accordion.tokens';
import { LmAccordionGroupComponent } from './accordion-group.component';

/**
 * AccordionItemComponent
 *
 * Wrapper component that contains the trigger and content.
 * Can be used standalone or within an AccordionGroupComponent.
 *
 * @example Standalone usage
 * ```html
 * <luma-accordion-item>
 *   <button lumaAccordionTrigger>
 *     <span lumaAccordionTitle>Title</span>
 *     <svg lumaAccordionIcon>...</svg>
 *   </button>
 *   <div lumaAccordionContent>Content here...</div>
 * </luma-accordion-item>
 * ```
 *
 * @example With variants
 * ```html
 * <luma-accordion-item lmVariant="filled">
 *   ...
 * </luma-accordion-item>
 * ```
 */
@Component({
  selector: 'luma-accordion-item',
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: ACCORDION_ITEM, useExisting: LmAccordionItemComponent },
  ],
  host: {
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
    '[attr.data-variant]': 'lmVariant()',
  },
})
export class LmAccordionItemComponent implements AccordionItemBase {
  private group = inject(LmAccordionGroupComponent, { optional: true });
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private previousClasses: string[] = [];

  constructor() {
    // Effect to reactively manage CVA classes without replacing user classes
    effect(() => {
      // Remove previous CVA classes
      this.previousClasses.forEach((c) => {
        this.renderer.removeClass(this.el.nativeElement, c);
      });

      // Add new CVA classes (preserves user-provided classes)
      const newClasses = this.wrapperClasses()
        .split(' ')
        .filter((c) => c);
      newClasses.forEach((c) => {
        this.renderer.addClass(this.el.nativeElement, c);
      });

      this.previousClasses = newClasses;
    });
  }

  /**
   * Unique identifier for this item (required when using AccordionGroup)
   */
  lmId = input<string>('');

  /**
   * Visual style variant
   * - default: Standard with border
   * - bordered: FAQ-style stacked items
   * - filled: Solid background (unified trigger/content)
   */
  lmVariant = input<AccordionItemVariant>('default');

  /**
   * Initial/controlled open state (for standalone usage)
   */
  lmOpen = input<boolean>(false);

  /**
   * Whether the accordion item is disabled
   */
  lmDisabled = input<boolean>(false);

  /**
   * Emitted when the open state changes
   * Useful for tracking/analytics
   */
  lmOpenChange = output<boolean>();

  // Internal state for uncontrolled mode
  private _isOpen = signal(false);

  /**
   * Computed open state
   * Priority: group controlled > lmOpen input > internal state
   */
  isOpen = computed(() => {
    // If in a controlled group, check group value
    if (this.group?.lmValue() !== null && this.group?.lmValue() !== undefined) {
      const value = this.group.lmValue();
      const id = this.lmId();
      return Array.isArray(value) ? value.includes(id) : value === id;
    }
    // Otherwise use input or internal state
    return this.lmOpen() || this._isOpen();
  });

  // CVA classes
  wrapperClasses = computed(() =>
    accordionItemVariants({
      variant: this.lmVariant(),
    }),
  );

  contentWrapperClasses = computed(() =>
    accordionContentWrapperVariants({ open: this.isOpen() }),
  );

  /**
   * Toggle the accordion open/closed state
   */
  toggle(): void {
    if (this.lmDisabled()) return;

    if (this.group && this.group.lmValue() !== null) {
      // Controlled by group
      this.group.toggleItem(this.lmId());
    } else {
      // Uncontrolled mode
      this._isOpen.update((v) => !v);
    }

    this.lmOpenChange.emit(this.isOpen());
  }
}
