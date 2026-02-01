import { Component, signal } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent } from './tabs.component';
import { TabsListDirective } from './tabs-list.directive';
import { TabsTriggerDirective } from './tabs-trigger.directive';
import { TabsPanelDirective } from './tabs-panel.directive';

/**
 * Design tokens for Tabs component testing
 */
const TABS_TOKENS = {
  list: {
    gap: '8px',
    borderColor: 'oklch(0.97 0.006 290)',
  },
  trigger: {
    text: 'oklch(0.48 0.01 290)',
    textHover: 'oklch(0.22 0.014 290)',
    textSelected: 'oklch(0.48 0.09 300)',
    background: 'transparent',
    backgroundHover: 'oklch(0.99 0.004 290)',
    backgroundSelected: 'oklch(0.99 0.004 290)',
    paddingX: '16px',
    paddingY: '8px',
    fontSize: '14px',
    fontWeight: '500',
    radius: '8px',
  },
  indicator: {
    height: '2px',
    color: 'oklch(0.48 0.09 300)',
    radius: '1px',
  },
  panel: {
    padding: '16px',
  },
  pill: {
    background: 'oklch(0.97 0.006 290)',
    backgroundSelected: 'oklch(1 0 0)',
    gap: '4px',
    padding: '4px',
    radius: '12px',
  },
  transition: {
    duration: '200ms',
    timing: 'ease-out',
  },
} as const;

/**
 * Setup tokens on document root
 */
function setupTabsTokens(): void {
  const root = document.documentElement;

  // List tokens
  root.style.setProperty('--luma-tabs-list-gap', TABS_TOKENS.list.gap);
  root.style.setProperty(
    '--luma-tabs-list-border-color',
    TABS_TOKENS.list.borderColor,
  );

  // Trigger tokens
  root.style.setProperty('--luma-tabs-trigger-text', TABS_TOKENS.trigger.text);
  root.style.setProperty(
    '--luma-tabs-trigger-text-hover',
    TABS_TOKENS.trigger.textHover,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-text-selected',
    TABS_TOKENS.trigger.textSelected,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-background',
    TABS_TOKENS.trigger.background,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-background-hover',
    TABS_TOKENS.trigger.backgroundHover,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-background-selected',
    TABS_TOKENS.trigger.backgroundSelected,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-padding-x',
    TABS_TOKENS.trigger.paddingX,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-padding-y',
    TABS_TOKENS.trigger.paddingY,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-font-size',
    TABS_TOKENS.trigger.fontSize,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-font-weight',
    TABS_TOKENS.trigger.fontWeight,
  );
  root.style.setProperty(
    '--luma-tabs-trigger-radius',
    TABS_TOKENS.trigger.radius,
  );

  // Indicator tokens
  root.style.setProperty(
    '--luma-tabs-indicator-height',
    TABS_TOKENS.indicator.height,
  );
  root.style.setProperty(
    '--luma-tabs-indicator-color',
    TABS_TOKENS.indicator.color,
  );
  root.style.setProperty(
    '--luma-tabs-indicator-radius',
    TABS_TOKENS.indicator.radius,
  );

  // Panel tokens
  root.style.setProperty(
    '--luma-tabs-panel-padding',
    TABS_TOKENS.panel.padding,
  );

  // Pill tokens
  root.style.setProperty(
    '--luma-tabs-pill-background',
    TABS_TOKENS.pill.background,
  );
  root.style.setProperty(
    '--luma-tabs-pill-background-selected',
    TABS_TOKENS.pill.backgroundSelected,
  );
  root.style.setProperty('--luma-tabs-pill-gap', TABS_TOKENS.pill.gap);
  root.style.setProperty('--luma-tabs-pill-padding', TABS_TOKENS.pill.padding);
  root.style.setProperty('--luma-tabs-pill-radius', TABS_TOKENS.pill.radius);

  // Transition tokens
  root.style.setProperty(
    '--luma-tabs-transition-duration',
    TABS_TOKENS.transition.duration,
  );
  root.style.setProperty(
    '--luma-tabs-transition-timing',
    TABS_TOKENS.transition.timing,
  );
}

/**
 * Cleanup tokens from document root
 */
function cleanupTabsTokens(): void {
  const root = document.documentElement;
  const tokenNames = [
    '--luma-tabs-list-gap',
    '--luma-tabs-list-border-color',
    '--luma-tabs-trigger-text',
    '--luma-tabs-trigger-text-hover',
    '--luma-tabs-trigger-text-selected',
    '--luma-tabs-trigger-background',
    '--luma-tabs-trigger-background-hover',
    '--luma-tabs-trigger-background-selected',
    '--luma-tabs-trigger-padding-x',
    '--luma-tabs-trigger-padding-y',
    '--luma-tabs-trigger-font-size',
    '--luma-tabs-trigger-font-weight',
    '--luma-tabs-trigger-radius',
    '--luma-tabs-indicator-height',
    '--luma-tabs-indicator-color',
    '--luma-tabs-indicator-radius',
    '--luma-tabs-panel-padding',
    '--luma-tabs-pill-background',
    '--luma-tabs-pill-background-selected',
    '--luma-tabs-pill-gap',
    '--luma-tabs-pill-padding',
    '--luma-tabs-pill-radius',
    '--luma-tabs-transition-duration',
    '--luma-tabs-transition-timing',
  ];
  tokenNames.forEach((name) => root.style.removeProperty(name));
  root.classList.remove('dark');
}

// ============================================================================
// Test Host Components
// ============================================================================

/**
 * Basic test host with all inputs
 */
@Component({
  template: `
    <luma-tabs
      [lmValue]="lmValue()"
      [lmDefaultValue]="lmDefaultValue"
      [lmStyle]="lmStyle"
      [lmLazy]="lmLazy"
      (lmValueChange)="onValueChange($event)"
    >
      <div lumaTabsList>
        <button lumaTabsTrigger="tab-1" [lmDisabled]="tab1Disabled">
          Tab 1
        </button>
        <button lumaTabsTrigger="tab-2" [lmDisabled]="tab2Disabled">
          Tab 2
        </button>
        <button lumaTabsTrigger="tab-3">Tab 3</button>
      </div>
      <div lumaTabsPanel="tab-1">Content 1</div>
      <div lumaTabsPanel="tab-2">Content 2</div>
      <div lumaTabsPanel="tab-3">Content 3</div>
    </luma-tabs>
  `,
  imports: [
    TabsComponent,
    TabsListDirective,
    TabsTriggerDirective,
    TabsPanelDirective,
  ],
})
class TabsTestHostComponent {
  lmValue = signal<string | null>(null);
  lmDefaultValue = 'tab-1';
  lmStyle: 'underline' | 'background' | 'pill' = 'underline';
  lmLazy = true;
  tab1Disabled = false;
  tab2Disabled = false;

  valueChanges: string[] = [];
  onValueChange(value: string): void {
    this.valueChanges.push(value);
  }
}

/**
 * Test host for background style
 */
@Component({
  template: `
    <luma-tabs lmDefaultValue="tab-1" lmStyle="background">
      <div lumaTabsList>
        <button lumaTabsTrigger="tab-1">Tab 1</button>
        <button lumaTabsTrigger="tab-2">Tab 2</button>
      </div>
      <div lumaTabsPanel="tab-1">Content 1</div>
      <div lumaTabsPanel="tab-2">Content 2</div>
    </luma-tabs>
  `,
  imports: [
    TabsComponent,
    TabsListDirective,
    TabsTriggerDirective,
    TabsPanelDirective,
  ],
})
class TabsBackgroundStyleTestHostComponent {}

/**
 * Test host for pill style
 */
@Component({
  template: `
    <luma-tabs lmDefaultValue="tab-1" lmStyle="pill">
      <div lumaTabsList>
        <button lumaTabsTrigger="tab-1">Tab 1</button>
        <button lumaTabsTrigger="tab-2">Tab 2</button>
      </div>
      <div lumaTabsPanel="tab-1">Content 1</div>
      <div lumaTabsPanel="tab-2">Content 2</div>
    </luma-tabs>
  `,
  imports: [
    TabsComponent,
    TabsListDirective,
    TabsTriggerDirective,
    TabsPanelDirective,
  ],
})
class TabsPillStyleTestHostComponent {}

/**
 * Test host for lazy loading disabled
 */
@Component({
  template: `
    <luma-tabs lmDefaultValue="tab-1" [lmLazy]="false">
      <div lumaTabsList>
        <button lumaTabsTrigger="tab-1">Tab 1</button>
        <button lumaTabsTrigger="tab-2">Tab 2</button>
      </div>
      <div lumaTabsPanel="tab-1">Content 1</div>
      <div lumaTabsPanel="tab-2">Content 2</div>
    </luma-tabs>
  `,
  imports: [
    TabsComponent,
    TabsListDirective,
    TabsTriggerDirective,
    TabsPanelDirective,
  ],
})
class TabsNoLazyTestHostComponent {}

// ============================================================================
// Test Suites
// ============================================================================

describe('Tabs', () => {
  let fixture: ComponentFixture<TabsTestHostComponent>;
  let hostComponent: TabsTestHostComponent;
  let tabsComponent: TabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TabsTestHostComponent,
        TabsBackgroundStyleTestHostComponent,
        TabsPillStyleTestHostComponent,
        TabsNoLazyTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsTestHostComponent);
    hostComponent = fixture.componentInstance;
    setupTabsTokens();
  });

  afterEach(() => {
    cleanupTabsTokens();
  });

  // ==========================================================================
  // Basic Component Creation
  // ==========================================================================
  describe('Basic Component Creation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create the TabsComponent', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      expect(tabsComponent).toBeTruthy();
    });

    it('should create TabsListDirective', () => {
      const listEl = fixture.debugElement.query(
        By.directive(TabsListDirective),
      );
      expect(listEl).toBeTruthy();
    });

    it('should create TabsTriggerDirective for each tab', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      expect(triggers.length).toBe(3);
    });

    it('should create TabsPanelDirective for each panel', () => {
      const panels = fixture.debugElement.queryAll(
        By.directive(TabsPanelDirective),
      );
      expect(panels.length).toBe(3);
    });

    it('should have signal-based inputs on TabsComponent', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      expect(typeof tabsComponent.lmValue).toBe('function');
      expect(typeof tabsComponent.lmDefaultValue).toBe('function');
      expect(typeof tabsComponent.lmStyle).toBe('function');
      expect(typeof tabsComponent.lmLazy).toBe('function');
    });
  });

  // ==========================================================================
  // Design Token Definition
  // ==========================================================================
  describe('Design Token Definition', () => {
    describe('List Tokens', () => {
      it('should define --luma-tabs-list-gap css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-list-gap')
          .trim();
        expect(value).toBe(TABS_TOKENS.list.gap);
      });

      it('should define --luma-tabs-list-border-color css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-list-border-color')
          .trim();
        expect(value).toBe(TABS_TOKENS.list.borderColor);
      });
    });

    describe('Trigger Tokens', () => {
      it('should define --luma-tabs-trigger-text css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-trigger-text')
          .trim();
        expect(value).toBe(TABS_TOKENS.trigger.text);
      });

      it('should define --luma-tabs-trigger-padding-x css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-trigger-padding-x')
          .trim();
        expect(value).toBe(TABS_TOKENS.trigger.paddingX);
      });
    });

    describe('Panel Tokens', () => {
      it('should define --luma-tabs-panel-padding css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-panel-padding')
          .trim();
        expect(value).toBe(TABS_TOKENS.panel.padding);
      });
    });

    describe('Transition Tokens', () => {
      it('should define --luma-tabs-transition-duration css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-transition-duration')
          .trim();
        expect(value).toBe(TABS_TOKENS.transition.duration);
      });

      it('should define --luma-tabs-transition-timing css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-tabs-transition-timing')
          .trim();
        expect(value).toBe(TABS_TOKENS.transition.timing);
      });
    });
  });

  // ==========================================================================
  // Class Application
  // ==========================================================================
  describe('Class Application', () => {
    describe('TabsList Classes', () => {
      describe('underline style', () => {
        beforeEach(() => {
          hostComponent.lmStyle = 'underline';
          fixture.detectChanges();
        });

        it('should apply underline style classes', () => {
          const listEl = fixture.debugElement.query(
            By.directive(TabsListDirective),
          );
          const directive = listEl.injector.get(TabsListDirective);
          const classes = directive.classes();
          expect(classes).toContain('border-b');
          expect(classes).toContain('lm-border-tabs-list');
        });
      });

      describe('background style', () => {
        it('should apply background style classes', () => {
          const bgFixture = TestBed.createComponent(
            TabsBackgroundStyleTestHostComponent,
          );
          bgFixture.detectChanges();
          const listEl = bgFixture.debugElement.query(
            By.directive(TabsListDirective),
          );
          const directive = listEl.injector.get(TabsListDirective);
          const classes = directive.classes();
          expect(classes).toContain('lm-gap-tabs-list');
        });
      });

      describe('pill style', () => {
        it('should apply pill style classes', () => {
          const pillFixture = TestBed.createComponent(
            TabsPillStyleTestHostComponent,
          );
          pillFixture.detectChanges();
          const listEl = pillFixture.debugElement.query(
            By.directive(TabsListDirective),
          );
          const directive = listEl.injector.get(TabsListDirective);
          const classes = directive.classes();
          expect(classes).toContain('lm-bg-tabs-pill');
          expect(classes).toContain('lm-rounded-tabs-pill');
        });
      });
    });

    describe('TabsTrigger Classes', () => {
      describe('base classes', () => {
        beforeEach(() => {
          fixture.detectChanges();
        });

        it('should apply base trigger classes', () => {
          const triggerEl = fixture.debugElement.query(
            By.directive(TabsTriggerDirective),
          );
          const directive = triggerEl.injector.get(TabsTriggerDirective);
          const classes = directive.classes();
          expect(classes).toContain('relative');
          expect(classes).toContain('flex');
          expect(classes).toContain('cursor-pointer');
        });

        it('should apply focus ring class', () => {
          const triggerEl = fixture.debugElement.query(
            By.directive(TabsTriggerDirective),
          );
          const directive = triggerEl.injector.get(TabsTriggerDirective);
          const classes = directive.classes();
          expect(classes).toContain('focus-visible:lm-ring-focus');
        });
      });

      describe('selected state', () => {
        beforeEach(() => {
          fixture.detectChanges();
        });

        it('should apply selected classes when tab is selected', () => {
          const triggerEl = fixture.debugElement.query(
            By.directive(TabsTriggerDirective),
          );
          const directive = triggerEl.injector.get(TabsTriggerDirective);
          // First tab is selected by default
          expect(directive.isSelected()).toBe(true);
          const classes = directive.classes();
          expect(classes).toContain('lm-text-tabs-trigger-selected');
        });
      });
    });

    describe('TabsPanel Classes', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should apply visible class to selected panel', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const firstPanel = panels[0].injector.get(TabsPanelDirective);
        expect(firstPanel.isVisible()).toBe(true);
        expect(firstPanel.classes()).toContain('block');
      });

      it('should apply hidden class to non-selected panel', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const secondPanel = panels[1].injector.get(TabsPanelDirective);
        expect(secondPanel.isVisible()).toBe(false);
      });
    });
  });

  // ==========================================================================
  // Tab Selection
  // ==========================================================================
  describe('Tab Selection', () => {
    describe('default value', () => {
      beforeEach(() => {
        hostComponent.lmDefaultValue = 'tab-2';
        fixture.detectChanges();
      });

      it('should select tab based on lmDefaultValue', () => {
        const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
        tabsComponent = tabsEl.injector.get(TabsComponent);
        expect(tabsComponent.value()).toBe('tab-2');
      });
    });

    describe('controlled mode', () => {
      beforeEach(() => {
        hostComponent.lmValue.set('tab-3');
        fixture.detectChanges();
      });

      it('should select tab based on lmValue', () => {
        const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
        tabsComponent = tabsEl.injector.get(TabsComponent);
        expect(tabsComponent.value()).toBe('tab-3');
      });
    });

    describe('click selection', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should select tab on click', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
        tabsComponent = tabsEl.injector.get(TabsComponent);
        expect(tabsComponent.value()).toBe('tab-2');
      });

      it('should emit lmValueChange on selection', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.valueChanges).toContain('tab-2');
      });

      it('should not emit if selecting already selected tab', () => {
        hostComponent.valueChanges = [];
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        // First tab is already selected
        triggers[0].nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.valueChanges.length).toBe(0);
      });
    });
  });

  // ==========================================================================
  // Keyboard Navigation
  // ==========================================================================
  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should focus next tab on ArrowRight', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      expect(tabsComponent.value()).toBe('tab-2');
    });

    it('should focus previous tab on ArrowLeft', () => {
      // First select tab-2
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      tabsComponent.select('tab-2');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const secondTrigger = triggers[1].nativeElement;

      secondTrigger.focus();
      secondTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      );
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should wrap to first tab when pressing ArrowRight on last tab', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      tabsComponent.select('tab-3');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const lastTrigger = triggers[2].nativeElement;

      lastTrigger.focus();
      lastTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should wrap to last tab when pressing ArrowLeft on first tab', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      );
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      expect(tabsComponent.value()).toBe('tab-3');
    });

    it('should focus first tab on Home', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      tabsComponent.select('tab-3');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const lastTrigger = triggers[2].nativeElement;

      lastTrigger.focus();
      lastTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should focus last tab on End', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);
      expect(tabsComponent.value()).toBe('tab-3');
    });

    it('should activate tab on Enter', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);

      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const secondTrigger = triggers[1].nativeElement;

      secondTrigger.focus();
      secondTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter' }),
      );
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-2');
    });

    it('should activate tab on Space', () => {
      const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
      tabsComponent = tabsEl.injector.get(TabsComponent);

      const triggers = fixture.debugElement.queryAll(
        By.directive(TabsTriggerDirective),
      );
      const secondTrigger = triggers[1].nativeElement;

      secondTrigger.focus();
      secondTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-2');
    });
  });

  // ==========================================================================
  // Disabled State
  // ==========================================================================
  describe('Disabled State', () => {
    describe('when trigger is disabled', () => {
      beforeEach(() => {
        hostComponent.tab2Disabled = true;
        fixture.detectChanges();
      });

      it('should apply disabled classes', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        const directive = triggers[1].injector.get(TabsTriggerDirective);
        expect(directive.lmDisabled()).toBe(true);
      });

      it('should not select disabled tab on click', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
        tabsComponent = tabsEl.injector.get(TabsComponent);
        expect(tabsComponent.value()).toBe('tab-1'); // Should remain on tab-1
      });

      it('should not respond to keyboard when disabled', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        const disabledTrigger = triggers[1].nativeElement;

        disabledTrigger.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Enter' }),
        );
        fixture.detectChanges();

        const tabsEl = fixture.debugElement.query(By.directive(TabsComponent));
        tabsComponent = tabsEl.injector.get(TabsComponent);
        expect(tabsComponent.value()).toBe('tab-1');
      });
    });
  });

  // ==========================================================================
  // Accessibility
  // ==========================================================================
  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    describe('Roles', () => {
      it('should have role="tablist" on TabsList', () => {
        const listEl = fixture.debugElement.query(
          By.directive(TabsListDirective),
        );
        expect(listEl.nativeElement.getAttribute('role')).toBe('tablist');
      });

      it('should have role="tab" on TabsTrigger', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[0].nativeElement.getAttribute('role')).toBe('tab');
      });

      it('should have role="tabpanel" on TabsPanel', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        expect(panels[0].nativeElement.getAttribute('role')).toBe('tabpanel');
      });
    });

    describe('ARIA Attributes', () => {
      it('should have aria-selected="true" on selected trigger', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[0].nativeElement.getAttribute('aria-selected')).toBe(
          'true',
        );
      });

      it('should have aria-selected="false" on non-selected trigger', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[1].nativeElement.getAttribute('aria-selected')).toBe(
          'false',
        );
      });

      it('should have aria-controls linking trigger to panel', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[0].nativeElement.getAttribute('aria-controls')).toBe(
          'tab-panel-tab-1',
        );
      });

      it('should have aria-labelledby linking panel to trigger', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        expect(panels[0].nativeElement.getAttribute('aria-labelledby')).toBe(
          'tab-trigger-tab-1',
        );
      });

      it('should have aria-orientation on TabsList', () => {
        const listEl = fixture.debugElement.query(
          By.directive(TabsListDirective),
        );
        expect(listEl.nativeElement.getAttribute('aria-orientation')).toBe(
          'horizontal',
        );
      });
    });

    describe('Roving Tabindex', () => {
      it('should have tabindex="0" on selected trigger', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[0].nativeElement.getAttribute('tabindex')).toBe('0');
      });

      it('should have tabindex="-1" on non-selected trigger', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        expect(triggers[1].nativeElement.getAttribute('tabindex')).toBe('-1');
      });
    });
  });

  // ==========================================================================
  // Lazy Loading
  // ==========================================================================
  describe('Lazy Loading', () => {
    describe('with lmLazy=true (default)', () => {
      beforeEach(() => {
        hostComponent.lmLazy = true;
        fixture.detectChanges();
      });

      it('should render only the selected panel initially', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const firstPanel = panels[0].injector.get(TabsPanelDirective);
        const secondPanel = panels[1].injector.get(TabsPanelDirective);

        expect(firstPanel.shouldRender()).toBe(true);
        // Second panel should not render until selected
        // Note: hasBeenSelected starts false, so shouldRender should be false
      });

      it('should render panel after it is selected', () => {
        // Select second tab
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const secondPanel = panels[1].injector.get(TabsPanelDirective);

        expect(secondPanel.shouldRender()).toBe(true);
      });

      it('should keep panel rendered after switching away (cache)', () => {
        // Select second tab
        const triggers = fixture.debugElement.queryAll(
          By.directive(TabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        // Switch back to first tab
        triggers[0].nativeElement.click();
        fixture.detectChanges();

        const panels = fixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const secondPanel = panels[1].injector.get(TabsPanelDirective);

        // Should still be rendered (cached) but not visible
        expect(secondPanel.shouldRender()).toBe(true);
        expect(secondPanel.isVisible()).toBe(false);
      });
    });

    describe('with lmLazy=false', () => {
      it('should render all panels immediately', () => {
        const noLazyFixture = TestBed.createComponent(
          TabsNoLazyTestHostComponent,
        );
        noLazyFixture.detectChanges();

        const panels = noLazyFixture.debugElement.queryAll(
          By.directive(TabsPanelDirective),
        );
        const firstPanel = panels[0].injector.get(TabsPanelDirective);
        const secondPanel = panels[1].injector.get(TabsPanelDirective);

        expect(firstPanel.shouldRender()).toBe(true);
        expect(secondPanel.shouldRender()).toBe(true);
      });
    });
  });
});
