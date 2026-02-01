import {
  Directive,
  ElementRef,
  inject,
  computed,
  HostListener,
} from '@angular/core';
import { tabsListVariants } from '@lumaui/core';
import { TABS_GROUP, TABS_LIST, type TabsListBase } from './tabs.tokens';

/**
 * Tabs list directive
 *
 * Container for tab triggers with role="tablist".
 * Provides context for the indicator component.
 *
 * @example
 * ```html
 * <div lumaTabsList>
 *   <button lumaTabsTrigger="tab-1">Tab 1</button>
 *   <button lumaTabsTrigger="tab-2">Tab 2</button>
 * </div>
 * ```
 */
@Directive({
  selector: '[lumaTabsList]',
  providers: [
    {
      provide: TABS_LIST,
      useExisting: TabsListDirective,
    },
  ],
  host: {
    role: 'tablist',
    '[attr.aria-orientation]': '"horizontal"',
    '[class]': 'classes()',
  },
})
export class TabsListDirective implements TabsListBase {
  readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly tabsGroup = inject(TABS_GROUP);

  /** Whether horizontal scrolling is enabled */
  lmScrollable = false;

  classes = computed(() =>
    tabsListVariants({
      style: this.tabsGroup.lmStyle(),
      scrollable: this.lmScrollable,
    }),
  );

  /**
   * Get the currently active trigger element
   */
  getActiveTrigger(): HTMLElement | null {
    const currentValue = this.tabsGroup.value();
    if (!currentValue) return null;

    const triggers = this.tabsGroup.getTriggers();
    return triggers.get(currentValue) || null;
  }

  /**
   * Handle mouse wheel for horizontal scroll
   */
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    if (this.lmScrollable) {
      event.preventDefault();
      this.elementRef.nativeElement.scrollLeft += event.deltaY;
    }
  }
}
