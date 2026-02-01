import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
  computed,
} from '@angular/core';
import { type TabsStyle } from '@lumaui/core';
import { TABS_GROUP, type TabsGroupBase } from './tabs.tokens';

/**
 * Tabs container component
 *
 * Manages tab selection state, keyboard navigation, and provides context
 * to child components (TabsList, TabsTrigger, TabsPanel).
 *
 * @example
 * ```html
 * <luma-tabs [lmValue]="selectedTab()" (lmValueChange)="onSelect($event)">
 *   <div lumaTabsList>
 *     <button lumaTabsTrigger="tab-1">Tab 1</button>
 *     <button lumaTabsTrigger="tab-2">Tab 2</button>
 *   </div>
 *   <div lumaTabsPanel="tab-1">Content 1</div>
 *   <div lumaTabsPanel="tab-2">Content 2</div>
 * </luma-tabs>
 * ```
 */
@Component({
  selector: 'luma-tabs',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TABS_GROUP,
      useExisting: TabsComponent,
    },
  ],
  host: {
    '[class]': '"block w-full"',
  },
})
export class TabsComponent implements TabsGroupBase {
  /** Controlled value - currently selected tab */
  lmValue = input<string | null>(null);

  /** Default value for uncontrolled mode */
  lmDefaultValue = input<string>('');

  /** Visual style: underline, background, or pill */
  lmStyle = input<TabsStyle>('underline');

  /** Whether to lazy load panel content */
  lmLazy = input<boolean>(true);

  /** Emits when selected tab changes */
  lmValueChange = output<string>();

  /** Internal state for the selected value */
  value = signal<string | null>(null);

  /** Map of registered triggers for keyboard navigation */
  private triggers = new Map<string, HTMLElement>();

  /** Ordered list of trigger values for navigation */
  private triggerOrder: string[] = [];

  constructor() {
    // Sync controlled value to internal state
    effect(() => {
      const controlled = this.lmValue();
      const defaultVal = this.lmDefaultValue();

      if (controlled !== null) {
        this.value.set(controlled);
      } else if (this.value() === null && defaultVal) {
        this.value.set(defaultVal);
      }
    });
  }

  /**
   * Select a tab by value
   */
  select(tabValue: string): void {
    if (this.value() === tabValue) return;

    this.value.set(tabValue);
    this.lmValueChange.emit(tabValue);
  }

  /**
   * Register a trigger element for keyboard navigation
   */
  registerTrigger(tabValue: string, element: HTMLElement): void {
    this.triggers.set(tabValue, element);
    if (!this.triggerOrder.includes(tabValue)) {
      this.triggerOrder.push(tabValue);
    }
  }

  /**
   * Unregister a trigger element
   */
  unregisterTrigger(tabValue: string): void {
    this.triggers.delete(tabValue);
    this.triggerOrder = this.triggerOrder.filter((v) => v !== tabValue);
  }

  /**
   * Get all registered triggers
   */
  getTriggers(): Map<string, HTMLElement> {
    return this.triggers;
  }

  /**
   * Focus next trigger in the list
   */
  focusNextTrigger(): void {
    const currentIndex = this.getCurrentTriggerIndex();
    const nextIndex = (currentIndex + 1) % this.triggerOrder.length;
    this.focusTriggerAtIndex(nextIndex);
  }

  /**
   * Focus previous trigger in the list
   */
  focusPreviousTrigger(): void {
    const currentIndex = this.getCurrentTriggerIndex();
    const prevIndex =
      currentIndex <= 0 ? this.triggerOrder.length - 1 : currentIndex - 1;
    this.focusTriggerAtIndex(prevIndex);
  }

  /**
   * Focus first trigger
   */
  focusFirstTrigger(): void {
    this.focusTriggerAtIndex(0);
  }

  /**
   * Focus last trigger
   */
  focusLastTrigger(): void {
    this.focusTriggerAtIndex(this.triggerOrder.length - 1);
  }

  private getCurrentTriggerIndex(): number {
    const currentValue = this.value();
    return currentValue ? this.triggerOrder.indexOf(currentValue) : 0;
  }

  private focusTriggerAtIndex(index: number): void {
    const value = this.triggerOrder[index];
    const element = this.triggers.get(value);
    if (element) {
      element.focus();
      this.select(value);
    }
  }
}
