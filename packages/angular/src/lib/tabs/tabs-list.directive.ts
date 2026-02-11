import {
  Component,
  ElementRef,
  inject,
  input,
  computed,
  viewChild,
  signal,
  effect,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  tabsListVariants,
  tabsScrollArrowVariants,
  type TabsScrollArrowDirection,
} from '@lumaui/core';
import { TABS_GROUP, TABS_LIST, type TabsListBase } from './tabs.tokens';

/**
 * Tabs list component
 *
 * Container for tab triggers with role="tablist".
 * Provides context for the indicator component.
 * Supports horizontal scrolling with arrow navigation.
 *
 * @example
 * ```html
 * <div lumaTabsList>
 *   <button lumaTabsTrigger="tab-1">Tab 1</button>
 *   <button lumaTabsTrigger="tab-2">Tab 2</button>
 * </div>
 * ```
 *
 * @example
 * ```html
 * <div lumaTabsList [lmScrollable]="true">
 *   <button lumaTabsTrigger="tab-1">Tab 1</button>
 *   <!-- ... many more tabs -->
 * </div>
 * ```
 */
@Component({
  selector: '[lumaTabsList]',
  providers: [
    {
      provide: TABS_LIST,
      useExisting: LmTabsListDirective,
    },
  ],
  host: {
    '[attr.role]': 'lmScrollable() ? null : "tablist"',
    '[attr.aria-orientation]': 'lmScrollable() ? null : "horizontal"',
    '[class]': 'hostClasses()',
  },
  template: `
    @if (lmScrollable()) {
      <!-- LEFT ARROW - outside tablist for correct ARIA -->
      <button
        type="button"
        [class]="leftArrowClasses()"
        [disabled]="!showLeftArrow()"
        [style.visibility]="showArrows() ? 'visible' : 'hidden'"
        (click)="scrollPrevious()"
        aria-label="Scroll to previous tabs"
      >
        ‹
      </button>
    }

    <!-- SINGLE scroll container - always rendered to avoid dual ng-content -->
    <div
      #scrollContainer
      [attr.role]="lmScrollable() ? 'tablist' : null"
      [attr.aria-orientation]="lmScrollable() ? 'horizontal' : null"
      [class]="scrollContainerClasses()"
      (scroll)="onScroll()"
      (wheel)="onWheel($event)"
    >
      <ng-content />
    </div>

    @if (lmScrollable()) {
      <!-- RIGHT ARROW - outside tablist for correct ARIA -->
      <button
        type="button"
        [class]="rightArrowClasses()"
        [disabled]="!showRightArrow()"
        [style.visibility]="showArrows() ? 'visible' : 'hidden'"
        (click)="scrollNext()"
        aria-label="Scroll to next tabs"
      >
        ›
      </button>
    }
  `,
})
export class LmTabsListDirective
  implements TabsListBase, AfterViewInit, OnDestroy
{
  readonly elementRef = inject(ElementRef<HTMLElement>);
  protected readonly tabsGroup = inject(TABS_GROUP);
  private readonly platformId = inject(PLATFORM_ID);

  /** Reference to the scroll container */
  scrollContainerRef = viewChild<ElementRef<HTMLElement>>('scrollContainer');

  /** Whether horizontal scrolling is enabled */
  lmScrollable = input<boolean>(false);

  /** Whether to show scroll arrows */
  showArrows = signal<boolean>(false);
  showLeftArrow = signal<boolean>(false);
  showRightArrow = signal<boolean>(false);

  /** ResizeObserver for overflow detection */
  private resizeObserver?: ResizeObserver;

  /** Debounce timeout for ResizeObserver */
  private resizeTimeout?: number;

  /** Throttle timeout for scroll events */
  private scrollTimeout?: number;

  /** Host element classes */
  hostClasses = computed(() => {
    if (this.lmScrollable()) {
      // Scrollable: host is a structural flex wrapper (no role, no variant styling)
      return 'flex items-center gap-2 w-full';
    }
    // Non-scrollable: host is the tablist with variant styling
    return tabsListVariants({
      variant: this.tabsGroup.lmVariant(),
    });
  });

  /** Scroll container classes */
  scrollContainerClasses = computed(() => {
    const baseClasses = ['flex', 'items-center'];

    if (this.lmScrollable()) {
      const scrollClasses = [
        ...baseClasses,
        'flex-1', // Fill available space in flex wrapper
        'relative', // For indicator absolute positioning
        'overflow-x-auto',
        'scrollbar-none',
        'scroll-smooth',
        '-webkit-overflow-scrolling-touch',
      ];

      // Move variant visual styling from host to scroll container
      const variant = this.tabsGroup.lmVariant();
      if (variant === 'underline') {
        scrollClasses.push('border-b', 'border-border');
      } else if (variant === 'pills') {
        scrollClasses.push('p-1', 'bg-muted', 'rounded-lg');
      }

      return scrollClasses;
    }

    // Non-scrollable: apply w-full and variant-specific classes
    const variant = this.tabsGroup.lmVariant();
    if (variant === 'underline') {
      return [...baseClasses, 'w-full', 'gap-4'];
    } else if (variant === 'pills') {
      return [...baseClasses, 'w-full', 'gap-1'];
    }

    return [...baseClasses, 'w-full'];
  });

  /** Left arrow button classes */
  leftArrowClasses = computed(() =>
    tabsScrollArrowVariants({ direction: 'left' as TabsScrollArrowDirection }),
  );

  /** Right arrow button classes */
  rightArrowClasses = computed(() =>
    tabsScrollArrowVariants({ direction: 'right' as TabsScrollArrowDirection }),
  );

  constructor() {
    // Update arrows when scrollable changes
    effect(() => {
      if (this.lmScrollable()) {
        this.updateArrowsVisibility();
      } else {
        this.showArrows.set(false);
      }
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.scrollContainerRef()?.nativeElement;
    if (!container) return;

    // Set up ResizeObserver with debouncing to prevent infinite feedback loop
    this.resizeObserver = new ResizeObserver(() => {
      // Debounce: wait 250ms after last resize before updating
      if (this.resizeTimeout !== undefined) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = window.setTimeout(() => {
        this.updateArrowsVisibility();
        this.resizeTimeout = undefined;
      }, 250);
    });

    // Only observe the container, NOT children (prevents cascading updates)
    this.resizeObserver.observe(container);

    // Initial check
    this.updateArrowsVisibility();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();

    // Clear timeouts to prevent memory leaks
    if (this.resizeTimeout !== undefined) {
      clearTimeout(this.resizeTimeout);
    }
    if (this.scrollTimeout !== undefined) {
      clearTimeout(this.scrollTimeout);
    }
  }

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
   * Get the element that acts as the semantic tablist container.
   * When scrollable, this is the inner scroll container (which has role="tablist").
   * When non-scrollable, this is the host element itself.
   */
  getListContainer(): HTMLElement {
    if (this.lmScrollable()) {
      return (
        this.scrollContainerRef()?.nativeElement ??
        this.elementRef.nativeElement
      );
    }
    return this.elementRef.nativeElement;
  }

  /**
   * Scroll to the next set of tabs (85% of container width)
   */
  scrollNext(): void {
    const container = this.scrollContainerRef()?.nativeElement;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  /**
   * Scroll to the previous set of tabs (85% of container width)
   */
  scrollPrevious(): void {
    const container = this.scrollContainerRef()?.nativeElement;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  }

  /**
   * Handle scroll event to update arrow states (throttled)
   */
  onScroll(): void {
    if (!this.lmScrollable()) return;

    // Throttle: only update after 100ms of no scrolling
    if (this.scrollTimeout !== undefined) {
      clearTimeout(this.scrollTimeout);
    }

    this.scrollTimeout = window.setTimeout(() => {
      this.updateArrowsVisibility();
      this.scrollTimeout = undefined;
    }, 100);
  }

  /**
   * Handle mouse wheel for horizontal scroll
   */
  onWheel(event: WheelEvent): void {
    if (!this.lmScrollable()) return;

    const container = this.scrollContainerRef()?.nativeElement;
    if (!container) return;

    event.preventDefault();
    container.scrollLeft += event.deltaY;
  }

  /**
   * Update arrow visibility and enabled states based on scroll position
   * Optimized to only update signals when values actually change
   */
  private updateArrowsVisibility(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const container = this.scrollContainerRef()?.nativeElement;
    if (!container) return;

    // Check if content overflows container
    const hasOverflow = container.scrollWidth > container.clientWidth;

    // Only update if value actually changed
    if (this.showArrows() !== hasOverflow) {
      this.showArrows.set(hasOverflow);
    }

    if (hasOverflow) {
      // Update individual arrow states based on scroll position
      const isAtStart = container.scrollLeft <= 1;
      const isAtEnd =
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth - 1;

      const newShowLeft = !isAtStart;
      const newShowRight = !isAtEnd;

      // Only update if values changed
      if (this.showLeftArrow() !== newShowLeft) {
        this.showLeftArrow.set(newShowLeft);
      }
      if (this.showRightArrow() !== newShowRight) {
        this.showRightArrow.set(newShowRight);
      }
    } else {
      // Reset arrow states when no overflow
      if (this.showLeftArrow() !== false) {
        this.showLeftArrow.set(false);
      }
      if (this.showRightArrow() !== false) {
        this.showRightArrow.set(false);
      }
    }
  }
}
