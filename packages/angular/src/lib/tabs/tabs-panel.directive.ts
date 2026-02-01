import {
  Directive,
  inject,
  input,
  computed,
  signal,
  effect,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { tabsPanelVariants } from '@lumaui/core';
import { TABS_GROUP } from './tabs.tokens';

/**
 * Tabs panel directive
 *
 * Content panel with role="tabpanel" and lazy loading support.
 * When lazy loading is enabled, content is only rendered after
 * the tab has been selected at least once, then cached.
 *
 * @example
 * ```html
 * <div lumaTabsPanel="tab-1">Content 1</div>
 *
 * <!-- With lazy loading (default when lmLazy=true on parent) -->
 * <ng-template lumaTabsPanel="tab-1">
 *   <expensive-component />
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[lumaTabsPanel]',
  host: {
    role: 'tabpanel',
    '[attr.id]': 'panelId()',
    '[attr.aria-labelledby]': 'triggerId()',
    '[attr.tabindex]': '0',
    '[class]': 'classes()',
    '[hidden]': '!isVisible()',
  },
})
export class TabsPanelDirective {
  private readonly tabsGroup = inject(TABS_GROUP);
  private readonly templateRef = inject(TemplateRef<unknown>, {
    optional: true,
  });
  private readonly viewContainer = inject(ViewContainerRef);

  /** Panel value identifier */
  lumaTabsPanel = input.required<string>();

  /** Track if panel has ever been selected (for lazy loading cache) */
  private hasBeenSelected = signal(false);

  /** Computed: whether this panel is currently selected */
  isSelected = computed(() => this.tabsGroup.value() === this.lumaTabsPanel());

  /** Computed: whether this panel should be visible/rendered */
  isVisible = computed(() => {
    const selected = this.isSelected();
    const lazy = this.tabsGroup.lmLazy();

    // If lazy loading is disabled, always show selected panel
    if (!lazy) return selected;

    // With lazy loading: render if ever selected, but only show if currently selected
    return this.hasBeenSelected() && selected;
  });

  /** Computed: whether content should be rendered (for lazy loading) */
  shouldRender = computed(() => {
    const lazy = this.tabsGroup.lmLazy();
    return lazy ? this.hasBeenSelected() : true;
  });

  /** Computed: ID for the panel element */
  panelId = computed(() => `tab-panel-${this.lumaTabsPanel()}`);

  /** Computed: ID for the corresponding trigger */
  triggerId = computed(() => `tab-trigger-${this.lumaTabsPanel()}`);

  /** Computed: CSS classes from CVA */
  classes = computed(() =>
    tabsPanelVariants({
      visible: this.isVisible(),
    }),
  );

  constructor() {
    // Track when panel is selected for lazy loading cache
    effect(() => {
      if (this.isSelected() && !this.hasBeenSelected()) {
        this.hasBeenSelected.set(true);
      }
    });

    // Handle template-based lazy loading
    effect(() => {
      if (this.templateRef && this.shouldRender()) {
        if (this.viewContainer.length === 0) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
    });
  }
}
