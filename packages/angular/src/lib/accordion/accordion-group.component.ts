import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

/**
 * AccordionGroupComponent
 *
 * Optional wrapper component that coordinates multiple accordion items.
 * Supports controlled pattern for implementing business logic like:
 * - Single item open at a time
 * - Multiple items open
 * - Always keep first/last item open
 * - Maximum number of open items
 *
 * @example Controlled single mode
 * ```html
 * <luma-accordion-group [lmValue]="activeItem()" (lmValueChange)="activeItem.set($event)">
 *   <luma-accordion-item lmId="item-1">...</luma-accordion-item>
 *   <luma-accordion-item lmId="item-2">...</luma-accordion-item>
 * </luma-accordion-group>
 * ```
 *
 * @example Controlled multiple mode
 * ```html
 * <luma-accordion-group [lmValue]="activeItems()" (lmValueChange)="activeItems.set($event)">
 *   <luma-accordion-item lmId="item-1">...</luma-accordion-item>
 *   <luma-accordion-item lmId="item-2">...</luma-accordion-item>
 * </luma-accordion-group>
 * ```
 */
@Component({
  selector: 'luma-accordion-group',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
    '[style.gap]': '"var(--luma-accordion-item-gap)"',
  },
})
export class LmAccordionGroupComponent {
  /**
   * Controlled value for which items are open
   * - null: uncontrolled mode (each item manages its own state)
   * - string: single item mode (ID of open item)
   * - string[]: multiple items mode (IDs of open items)
   */
  lmValue = input<string | string[] | null>(null);

  /**
   * Emitted when an item is toggled
   * Returns the new value (string for single mode, string[] for multiple)
   */
  lmValueChange = output<string | string[]>();

  /**
   * Force single mode even when lmValue is an array
   * When true, only one item can be open at a time
   */
  lmSingle = input<boolean>(false);

  /**
   * Toggle an item by its ID
   * Called by child AccordionItemComponent when toggled
   */
  toggleItem(itemId: string): void {
    const current = this.lmValue();

    // If uncontrolled, do nothing (items manage their own state)
    if (current === null || current === undefined) {
      return;
    }

    let newValue: string | string[];

    if (this.lmSingle() || typeof current === 'string') {
      // Single mode: toggle between the item and empty
      newValue = current === itemId ? '' : itemId;
    } else {
      // Multiple mode: add/remove from array
      const arr = Array.isArray(current) ? [...current] : [];
      const index = arr.indexOf(itemId);
      if (index >= 0) {
        arr.splice(index, 1);
      } else {
        arr.push(itemId);
      }
      newValue = arr;
    }

    this.lmValueChange.emit(newValue);
  }
}
