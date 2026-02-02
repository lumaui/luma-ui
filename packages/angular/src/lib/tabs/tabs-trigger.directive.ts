import {
  Directive,
  ElementRef,
  inject,
  input,
  computed,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { tabsTriggerVariants } from '@lumaui/core';
import { TABS_GROUP } from './tabs.tokens';

/**
 * Tabs trigger directive
 *
 * Individual tab button with role="tab" and keyboard navigation support.
 * Follows WAI-ARIA tabs pattern with roving tabindex.
 *
 * @example
 * ```html
 * <button lumaTabsTrigger="tab-1">Tab 1</button>
 * ```
 */
@Directive({
  selector: '[lumaTabsTrigger]',
  host: {
    role: 'tab',
    '[attr.id]': 'triggerId()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-controls]': 'panelId()',
    '[attr.tabindex]': 'isSelected() ? 0 : -1',
    '[class]': 'classes()',
  },
})
export class TabsTriggerDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly tabsGroup = inject(TABS_GROUP);

  /** Tab value identifier */
  lumaTabsTrigger = input.required<string>();

  /** Whether this trigger is disabled */
  lmDisabled = input<boolean>(false);

  /** Computed: whether this tab is selected */
  isSelected = computed(
    () => this.tabsGroup.value() === this.lumaTabsTrigger(),
  );

  /** Computed: ID for the trigger element */
  triggerId = computed(() => `tab-trigger-${this.lumaTabsTrigger()}`);

  /** Computed: ID for the corresponding panel */
  panelId = computed(() => `tab-panel-${this.lumaTabsTrigger()}`);

  /** Computed: CSS classes from CVA */
  classes = computed(() =>
    tabsTriggerVariants({
      style: this.tabsGroup.lmVariant(),
      selected: this.isSelected(),
    }),
  );

  ngOnInit(): void {
    this.tabsGroup.registerTrigger(
      this.lumaTabsTrigger(),
      this.el.nativeElement,
    );
  }

  ngOnDestroy(): void {
    this.tabsGroup.unregisterTrigger(this.lumaTabsTrigger());
  }

  @HostListener('click')
  onClick(): void {
    if (this.lmDisabled()) return;
    this.tabsGroup.select(this.lumaTabsTrigger());
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.lmDisabled()) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.tabsGroup.focusNextTrigger();
        break;

      case 'ArrowLeft':
        event.preventDefault();
        this.tabsGroup.focusPreviousTrigger();
        break;

      case 'Home':
        event.preventDefault();
        this.tabsGroup.focusFirstTrigger();
        break;

      case 'End':
        event.preventDefault();
        this.tabsGroup.focusLastTrigger();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        this.tabsGroup.select(this.lumaTabsTrigger());
        break;
    }
  }
}
