import { InjectionToken, Signal } from '@angular/core';

/**
 * Interface for accordion item state that child directives can access
 */
export interface AccordionItemBase {
  /** Whether the accordion item is currently open */
  isOpen: Signal<boolean>;
  /** Whether the accordion item is disabled */
  lmDisabled: Signal<boolean>;
  /** Toggle the accordion open/closed state */
  toggle(): void;
}

/**
 * Injection token for accordion item
 * Allows child directives to access parent accordion item state
 */
export const ACCORDION_ITEM = new InjectionToken<AccordionItemBase>(
  'AccordionItem',
);
