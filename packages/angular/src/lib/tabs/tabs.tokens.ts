import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { type TabsStyle } from '@lumaui/core';

export interface TabsGroupBase {
  /** Currently selected tab value */
  value: WritableSignal<string | null>;
  /** Visual style of the tabs (underline, background, pill) */
  lmStyle: Signal<TabsStyle>;
  /** Whether to lazy load panel content */
  lmLazy: Signal<boolean>;
  /** Select a tab by value */
  select(value: string): void;
  /** Register a trigger element */
  registerTrigger(value: string, element: HTMLElement): void;
  /** Unregister a trigger element */
  unregisterTrigger(value: string): void;
  /** Get all registered triggers */
  getTriggers(): Map<string, HTMLElement>;
  /** Focus next trigger (for keyboard navigation) */
  focusNextTrigger(): void;
  /** Focus previous trigger (for keyboard navigation) */
  focusPreviousTrigger(): void;
  /** Focus first trigger */
  focusFirstTrigger(): void;
  /** Focus last trigger */
  focusLastTrigger(): void;
}

export interface TabsListBase {
  /** Reference to the native element */
  elementRef: { nativeElement: HTMLElement };
  /** Get the currently active trigger element */
  getActiveTrigger(): HTMLElement | null;
}

/**
 * Injection token for tabs group
 * Allows child components to access parent tabs state
 */
export const TABS_GROUP = new InjectionToken<TabsGroupBase>('TabsGroup');

/**
 * Injection token for tabs list
 * Allows indicator to access trigger positions
 */
export const TABS_LIST = new InjectionToken<TabsListBase>('TabsList');
