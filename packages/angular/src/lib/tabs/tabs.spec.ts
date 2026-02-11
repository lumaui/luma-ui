import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmTabsComponent } from './tabs.component';
import { LmTabsListDirective } from './tabs-list.directive';
import { LmTabsTriggerDirective } from './tabs-trigger.directive';
import { LmTabsPanelDirective } from './tabs-panel.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  selector: 'luma-tabs-test-host',
  template: `
    <luma-tabs
      [lmValue]="lmValue()"
      [lmDefaultValue]="lmDefaultValue"
      [lmVariant]="lmVariant"
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
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
  ],
})
class TabsTestHostComponent {
  lmValue = signal<string | null>(null);
  lmDefaultValue = 'tab-1';
  lmVariant: 'underline' | 'pills' = 'underline';
  lmLazy = true;
  tab1Disabled = false;
  tab2Disabled = false;

  valueChanges: string[] = [];
  onValueChange(value: string): void {
    this.valueChanges.push(value);
  }
}

@Component({
  selector: 'luma-tabs-pills-test-host',
  template: `
    <luma-tabs lmDefaultValue="tab-1" lmVariant="pills">
      <div lumaTabsList>
        <button lumaTabsTrigger="tab-1">Tab 1</button>
        <button lumaTabsTrigger="tab-2">Tab 2</button>
      </div>
      <div lumaTabsPanel="tab-1">Content 1</div>
      <div lumaTabsPanel="tab-2">Content 2</div>
    </luma-tabs>
  `,
  imports: [
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
  ],
})
class TabsPillsTestHostComponent {}

@Component({
  selector: 'luma-tabs-no-lazy-test-host',
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
    LmTabsComponent,
    LmTabsListDirective,
    LmTabsTriggerDirective,
    LmTabsPanelDirective,
  ],
})
class TabsNoLazyTestHostComponent {}

// ============================================================
// MOCK RESIZE OBSERVER
// ============================================================

class ResizeObserverMock {
  observe() {
    /* noop */
  }
  unobserve() {
    /* noop */
  }
  disconnect() {
    /* noop */
  }
}

// Install ResizeObserver mock globally
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  (window as unknown as Record<string, unknown>)['ResizeObserver'] =
    ResizeObserverMock;
}

// ============================================================
// TEST SUITE
// ============================================================

describe('Tabs', () => {
  let fixture: ComponentFixture<TabsTestHostComponent>;
  let hostComponent: TabsTestHostComponent;
  let tabsComponent: LmTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TabsTestHostComponent,
        TabsPillsTestHostComponent,
        TabsNoLazyTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsTestHostComponent);
    hostComponent = fixture.componentInstance;
  });

  // ============================================================
  // BASIC CREATION
  // ============================================================

  describe('Basic Creation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create the component', () => {
      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      expect(tabsComponent).toBeTruthy();
    });

    it('should create tabs list', () => {
      const listEl = fixture.debugElement.query(
        By.directive(LmTabsListDirective),
      );
      expect(listEl).toBeTruthy();
    });

    it('should create all triggers', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      expect(triggers.length).toBe(3);
    });

    it('should create all panels', () => {
      const panels = fixture.debugElement.queryAll(
        By.directive(LmTabsPanelDirective),
      );
      expect(panels.length).toBe(3);
    });
  });

  // ============================================================
  // UNDERLINE VARIANT
  // ============================================================

  describe('Underline Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'underline';
      fixture.detectChanges();
    });

    it('should apply underline list classes', () => {
      const listEl = fixture.debugElement.query(
        By.directive(LmTabsListDirective),
      );
      const directive = listEl.injector.get(LmTabsListDirective);
      const classes = directive.hostClasses();
      expect(classes).toContain('border-b');
      expect(classes).toContain('border-border');
    });

    it('should apply underline trigger classes', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      const classes = directive.classes();
      expect(classes).toContain('border-b-2');
      expect(classes).toContain('border-transparent');
      expect(classes).toContain('text-muted-foreground');
    });

    it('should apply active state classes', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      expect(directive.isSelected()).toBe(true);
      const classes = directive.classes();
      expect(classes).toContain('data-[state=active]:border-primary');
      expect(classes).toContain('data-[state=active]:text-foreground');
    });
  });

  // ============================================================
  // PILLS VARIANT
  // ============================================================

  describe('Pills Variant', () => {
    it('should apply pills list classes', () => {
      const pillsFixture = TestBed.createComponent(TabsPillsTestHostComponent);
      pillsFixture.detectChanges();

      const listEl = pillsFixture.debugElement.query(
        By.directive(LmTabsListDirective),
      );
      const directive = listEl.injector.get(LmTabsListDirective);
      const classes = directive.hostClasses();
      expect(classes).toContain('bg-muted');
      expect(classes).toContain('rounded-lg');
    });

    it('should apply pills trigger classes', () => {
      const pillsFixture = TestBed.createComponent(TabsPillsTestHostComponent);
      pillsFixture.detectChanges();

      const triggerEl = pillsFixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      const classes = directive.classes();
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('text-muted-foreground');
    });

    it('should apply pills active state classes', () => {
      const pillsFixture = TestBed.createComponent(TabsPillsTestHostComponent);
      pillsFixture.detectChanges();

      const triggerEl = pillsFixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      const classes = directive.classes();
      expect(classes).toContain('data-[state=active]:bg-background');
      expect(classes).toContain('data-[state=active]:text-foreground');
      expect(classes).toContain('data-[state=active]:shadow-sm');
    });
  });

  // ============================================================
  // BASE CLASSES
  // ============================================================

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base list classes', () => {
      const listEl = fixture.debugElement.query(
        By.directive(LmTabsListDirective),
      );
      const directive = listEl.injector.get(LmTabsListDirective);
      const classes = directive.hostClasses();
      expect(classes).toContain('relative');
      expect(classes).toContain('w-full');
    });

    it('should apply base trigger classes', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      const classes = directive.classes();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('px-4');
      expect(classes).toContain('py-2');
      expect(classes).toContain('text-sm');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('cursor-pointer');
    });

    it('should apply focus ring classes', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      const directive = triggerEl.injector.get(LmTabsTriggerDirective);
      const classes = directive.classes();
      expect(classes).toContain('focus-visible:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-ring');
    });

    it('should apply panel classes', () => {
      const panelEl = fixture.debugElement.query(
        By.directive(LmTabsPanelDirective),
      );
      const directive = panelEl.injector.get(LmTabsPanelDirective);
      const classes = directive.classes();
      expect(classes).toContain('mt-2');
    });
  });

  // ============================================================
  // TAB SELECTION
  // ============================================================

  describe('Tab Selection', () => {
    describe('via default value', () => {
      beforeEach(() => {
        hostComponent.lmDefaultValue = 'tab-2';
        fixture.detectChanges();
      });

      it('should select tab based on default value', () => {
        const tabsEl = fixture.debugElement.query(
          By.directive(LmTabsComponent),
        );
        tabsComponent = tabsEl.injector.get(LmTabsComponent);
        expect(tabsComponent.value()).toBe('tab-2');
      });
    });

    describe('via click', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should select tab on click', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const tabsEl = fixture.debugElement.query(
          By.directive(LmTabsComponent),
        );
        tabsComponent = tabsEl.injector.get(LmTabsComponent);
        expect(tabsComponent.value()).toBe('tab-2');
      });

      it('should emit value change on selection', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.valueChanges).toContain('tab-2');
      });

      it('should not emit if already selected', () => {
        hostComponent.valueChanges = [];
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[0].nativeElement.click();
        fixture.detectChanges();

        expect(hostComponent.valueChanges.length).toBe(0);
      });
    });
  });

  // ============================================================
  // KEYBOARD NAVIGATION
  // ============================================================

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should focus next tab on ArrowRight', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      expect(tabsComponent.value()).toBe('tab-2');
    });

    it('should focus previous tab on ArrowLeft', () => {
      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      tabsComponent.select('tab-2');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const secondTrigger = triggers[1].nativeElement;

      secondTrigger.focus();
      secondTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      );
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should wrap to first tab on ArrowRight from last', () => {
      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      tabsComponent.select('tab-3');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const lastTrigger = triggers[2].nativeElement;

      lastTrigger.focus();
      lastTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowRight' }),
      );
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should wrap to last tab on ArrowLeft from first', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'ArrowLeft' }),
      );
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      expect(tabsComponent.value()).toBe('tab-3');
    });

    it('should focus first tab on Home', () => {
      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      tabsComponent.select('tab-3');
      fixture.detectChanges();

      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const lastTrigger = triggers[2].nativeElement;

      lastTrigger.focus();
      lastTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();

      expect(tabsComponent.value()).toBe('tab-1');
    });

    it('should focus last tab on End', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      const firstTrigger = triggers[0].nativeElement;

      firstTrigger.focus();
      firstTrigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();

      const tabsEl = fixture.debugElement.query(By.directive(LmTabsComponent));
      tabsComponent = tabsEl.injector.get(LmTabsComponent);
      expect(tabsComponent.value()).toBe('tab-3');
    });
  });

  // ============================================================
  // DISABLED STATE
  // ============================================================

  describe('Disabled State', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        hostComponent.tab2Disabled = true;
        fixture.detectChanges();
      });

      it('should have disabled input set', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        const directive = triggers[1].injector.get(LmTabsTriggerDirective);
        expect(directive.lmDisabled()).toBe(true);
      });

      it('should not select on click when disabled', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const tabsEl = fixture.debugElement.query(
          By.directive(LmTabsComponent),
        );
        tabsComponent = tabsEl.injector.get(LmTabsComponent);
        expect(tabsComponent.value()).toBe('tab-1');
      });
    });
  });

  // ============================================================
  // LAZY LOADING
  // ============================================================

  describe('Lazy Loading', () => {
    describe('with lazy enabled', () => {
      beforeEach(() => {
        hostComponent.lmLazy = true;
        fixture.detectChanges();
      });

      it('should render only selected panel', () => {
        const panels = fixture.debugElement.queryAll(
          By.directive(LmTabsPanelDirective),
        );
        const firstPanel = panels[0].injector.get(LmTabsPanelDirective);
        expect(firstPanel.shouldRender()).toBe(true);
      });

      it('should render panel after selection', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        const panels = fixture.debugElement.queryAll(
          By.directive(LmTabsPanelDirective),
        );
        const secondPanel = panels[1].injector.get(LmTabsPanelDirective);
        expect(secondPanel.shouldRender()).toBe(true);
      });

      it('should keep panel rendered after switching', () => {
        const triggers = fixture.debugElement.queryAll(
          By.directive(LmTabsTriggerDirective),
        );
        triggers[1].nativeElement.click();
        fixture.detectChanges();

        triggers[0].nativeElement.click();
        fixture.detectChanges();

        const panels = fixture.debugElement.queryAll(
          By.directive(LmTabsPanelDirective),
        );
        const secondPanel = panels[1].injector.get(LmTabsPanelDirective);
        expect(secondPanel.shouldRender()).toBe(true);
        expect(secondPanel.isVisible()).toBe(false);
      });
    });

    describe('with lazy disabled', () => {
      it('should render all panels immediately', () => {
        const noLazyFixture = TestBed.createComponent(
          TabsNoLazyTestHostComponent,
        );
        noLazyFixture.detectChanges();

        const panels = noLazyFixture.debugElement.queryAll(
          By.directive(LmTabsPanelDirective),
        );
        const firstPanel = panels[0].injector.get(LmTabsPanelDirective);
        const secondPanel = panels[1].injector.get(LmTabsPanelDirective);

        expect(firstPanel.shouldRender()).toBe(true);
        expect(secondPanel.shouldRender()).toBe(true);
      });
    });
  });

  // ============================================================
  // ACCESSIBILITY
  // ============================================================

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have role="tablist" on list', () => {
      const listEl = fixture.debugElement.query(
        By.directive(LmTabsListDirective),
      );
      expect(listEl.nativeElement.getAttribute('role')).toBe('tablist');
    });

    it('should have role="tab" on trigger', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      expect(triggerEl.nativeElement.getAttribute('role')).toBe('tab');
    });

    it('should have role="tabpanel" on panel', () => {
      const panelEl = fixture.debugElement.query(
        By.directive(LmTabsPanelDirective),
      );
      expect(panelEl.nativeElement.getAttribute('role')).toBe('tabpanel');
    });

    it('should have aria-selected on triggers', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      expect(triggers[0].nativeElement.getAttribute('aria-selected')).toBe(
        'true',
      );
      expect(triggers[1].nativeElement.getAttribute('aria-selected')).toBe(
        'false',
      );
    });

    it('should have aria-controls linking trigger to panel', () => {
      const triggerEl = fixture.debugElement.query(
        By.directive(LmTabsTriggerDirective),
      );
      expect(triggerEl.nativeElement.getAttribute('aria-controls')).toBe(
        'tab-panel-tab-1',
      );
    });

    it('should have roving tabindex', () => {
      const triggers = fixture.debugElement.queryAll(
        By.directive(LmTabsTriggerDirective),
      );
      expect(triggers[0].nativeElement.getAttribute('tabindex')).toBe('0');
      expect(triggers[1].nativeElement.getAttribute('tabindex')).toBe('-1');
    });
  });
});
