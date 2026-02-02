import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  signal,
  effect,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tabsIndicatorVariants } from '@lumaui/core';
import { TABS_GROUP, TABS_LIST } from './tabs.tokens';

/**
 * Tabs indicator component
 *
 * Animated indicator that slides between tabs for the underline style.
 * Uses CSS transform for smooth, GPU-accelerated animation.
 *
 * @example
 * ```html
 * <div lumaTabsList>
 *   <button lumaTabsTrigger="tab-1">Tab 1</button>
 *   <button lumaTabsTrigger="tab-2">Tab 2</button>
 *   <luma-tabs-indicator />
 * </div>
 * ```
 */
@Component({
  selector: 'luma-tabs-indicator',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()',
    '[style.width.px]': 'indicatorWidth()',
    '[style.transform]': 'indicatorTransform()',
  },
})
export class TabsIndicatorComponent implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly tabsGroup = inject(TABS_GROUP);
  private readonly tabsList = inject(TABS_LIST);

  /** Indicator width in pixels */
  indicatorWidth = signal(0);

  /** Indicator X or Y position */
  private indicatorPosition = signal(0);

  /** Resize observer for recalculating position */
  private resizeObserver: ResizeObserver | null = null;

  /** Computed: CSS classes from CVA */
  classes = computed(() => {
    const style = this.tabsGroup.lmVariant();
    // Only show indicator for underline style
    const isVisible = style === 'underline';

    return tabsIndicatorVariants({
      visible: isVisible,
    });
  });

  /** Computed: CSS transform for positioning */
  indicatorTransform = computed(() => {
    return `translateX(${this.indicatorPosition()}px)`;
  });

  constructor() {
    // Update indicator position when selection changes
    effect(() => {
      // Read the value to track changes
      this.tabsGroup.value();

      // Defer position calculation to ensure DOM is ready
      if (isPlatformBrowser(this.platformId)) {
        // Use setTimeout to ensure triggers are registered
        setTimeout(() => this.updateIndicatorPosition(), 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Initial position calculation with delay to ensure triggers are registered
    setTimeout(() => this.updateIndicatorPosition(), 0);

    // Watch for container resize
    this.resizeObserver = new ResizeObserver(() => {
      this.updateIndicatorPosition();
    });

    this.resizeObserver.observe(this.tabsList.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  private updateIndicatorPosition(): void {
    const activeTrigger = this.tabsList.getActiveTrigger();
    if (!activeTrigger) {
      this.indicatorWidth.set(0);
      return;
    }

    const triggerRect = activeTrigger.getBoundingClientRect();
    const listRect =
      this.tabsList.elementRef.nativeElement.getBoundingClientRect();

    // Horizontal positioning
    this.indicatorPosition.set(triggerRect.left - listRect.left);
    this.indicatorWidth.set(triggerRect.width);
  }
}
