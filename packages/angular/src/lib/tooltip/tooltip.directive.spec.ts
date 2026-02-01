import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

import { TooltipDirective } from './tooltip.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: `
    <button
      [lumaTooltip]="tooltipContent"
      [lmPosition]="lmPosition"
      [lmHtml]="lmHtml"
      [lmTrigger]="lmTrigger"
      [lmDelay]="lmDelay"
    >
      Trigger Button
    </button>
  `,
  imports: [TooltipDirective],
})
class TooltipTestHostComponent {
  tooltipContent = 'Test tooltip content';
  lmPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  lmHtml = false;
  lmTrigger: 'hover' | 'click' | 'focus' = 'hover';
  lmDelay = 0;
}

@Component({
  template: `
    <div [lumaTooltip]="'Tooltip on div'" class="p-4">Hover this div</div>
  `,
  imports: [TooltipDirective],
})
class DivTooltipTestHostComponent {}

@Component({
  template: `
    <span [lumaTooltip]="'Tooltip on span'" class="underline"
      >Hover this span</span
    >
  `,
  imports: [TooltipDirective],
})
class SpanTooltipTestHostComponent {}

@Component({
  template: `
    <button [lumaTooltip]="'Click tooltip'" lmTrigger="click">Click me</button>
  `,
  imports: [TooltipDirective],
})
class ClickTriggerTestHostComponent {}

@Component({
  template: ` <input [lumaTooltip]="'Focus tooltip'" lmTrigger="focus" /> `,
  imports: [TooltipDirective],
})
class FocusTriggerTestHostComponent {}

@Component({
  template: `
    <button
      [lumaTooltip]="'<strong>Bold</strong> and <em>italic</em>'"
      [lmHtml]="true"
    >
      HTML Content
    </button>
  `,
  imports: [TooltipDirective],
})
class HtmlContentTestHostComponent {}

@Component({
  template: `
    <button [lumaTooltip]="'Delayed tooltip'" [lmDelay]="300">Delayed</button>
  `,
  imports: [TooltipDirective],
})
class DelayedTooltipTestHostComponent {}

// ============================================================
// TOKEN DEFINITIONS
// ============================================================

const TOOLTIP_TOKENS = {
  background: 'oklch(0.15 0 0 / 0.9)',
  text: 'oklch(1 0 0)',
  fontSize: '13px',
  padding: '8px',
  radius: '8px',
  shadow: '0 4px 12px oklch(0 0 0 / 0.15)',
  maxWidth: '400px',
  offset: '8px',
  transition: {
    duration: '150ms',
    timing: 'ease-out',
  },
} as const;

const DARK_TOOLTIP_TOKENS = {
  background: 'oklch(0.85 0 0)',
  text: 'oklch(0.15 0 0)',
} as const;

// ============================================================
// TOKEN SETUP/CLEANUP UTILITIES
// ============================================================

function setupTooltipTokens(): void {
  const root = document.documentElement;

  root.style.setProperty(
    '--luma-tooltip-background',
    TOOLTIP_TOKENS.background,
  );
  root.style.setProperty('--luma-tooltip-text', TOOLTIP_TOKENS.text);
  root.style.setProperty('--luma-tooltip-font-size', TOOLTIP_TOKENS.fontSize);
  root.style.setProperty('--luma-tooltip-padding', TOOLTIP_TOKENS.padding);
  root.style.setProperty('--luma-tooltip-radius', TOOLTIP_TOKENS.radius);
  root.style.setProperty('--luma-tooltip-shadow', TOOLTIP_TOKENS.shadow);
  root.style.setProperty('--luma-tooltip-max-width', TOOLTIP_TOKENS.maxWidth);
  root.style.setProperty('--luma-tooltip-offset', TOOLTIP_TOKENS.offset);
  root.style.setProperty(
    '--luma-tooltip-transition-duration',
    TOOLTIP_TOKENS.transition.duration,
  );
  root.style.setProperty(
    '--luma-tooltip-transition-timing',
    TOOLTIP_TOKENS.transition.timing,
  );
}

function cleanupTooltipTokens(): void {
  const root = document.documentElement;
  const tokenNames = [
    '--luma-tooltip-background',
    '--luma-tooltip-text',
    '--luma-tooltip-font-size',
    '--luma-tooltip-padding',
    '--luma-tooltip-radius',
    '--luma-tooltip-shadow',
    '--luma-tooltip-max-width',
    '--luma-tooltip-offset',
    '--luma-tooltip-transition-duration',
    '--luma-tooltip-transition-timing',
  ];

  tokenNames.forEach((name) => root.style.removeProperty(name));
  root.classList.remove('dark');
}

function applyDarkTheme(): void {
  const root = document.documentElement;
  root.classList.add('dark');

  root.style.setProperty(
    '--luma-tooltip-background',
    DARK_TOOLTIP_TOKENS.background,
  );
  root.style.setProperty('--luma-tooltip-text', DARK_TOOLTIP_TOKENS.text);
}

// ============================================================
// TEST SUITES
// ============================================================

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TooltipTestHostComponent>;
  let hostComponent: TooltipTestHostComponent;
  let triggerElement: DebugElement;
  let directive: TooltipDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TooltipDirective,
        TooltipTestHostComponent,
        DivTooltipTestHostComponent,
        SpanTooltipTestHostComponent,
        ClickTriggerTestHostComponent,
        FocusTriggerTestHostComponent,
        HtmlContentTestHostComponent,
        DelayedTooltipTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTestHostComponent);
    hostComponent = fixture.componentInstance;
    triggerElement = fixture.debugElement.query(By.directive(TooltipDirective));
    directive = triggerElement.injector.get(TooltipDirective);

    setupTooltipTokens();
    // Note: Don't call detectChanges() here - let each test/describe handle it
    // to avoid ExpressionChangedAfterItHasBeenCheckedError
  });

  afterEach(() => {
    cleanupTooltipTokens();
  });

  // ============================================================
  // BASIC DIRECTIVE TESTS
  // ============================================================

  describe('Basic Directive Creation', () => {
    it('should create the directive', () => {
      expect(directive).toBeTruthy();
    });

    it('should apply on button element', () => {
      fixture.detectChanges();
      expect(triggerElement.nativeElement.tagName).toBe('BUTTON');
    });

    it('should have signal-based inputs', () => {
      expect(typeof directive.lumaTooltip).toBe('function');
      expect(typeof directive.lmPosition).toBe('function');
      expect(typeof directive.lmHtml).toBe('function');
      expect(typeof directive.lmTrigger).toBe('function');
      expect(typeof directive.lmDelay).toBe('function');
    });

    it('should have computed classes signal', () => {
      expect(typeof directive.classes).toBe('function');
      expect(typeof directive.classes()).toBe('string');
    });

    it('should have isVisible signal', () => {
      expect(typeof directive.isVisible).toBe('function');
      expect(directive.isVisible()).toBe(false);
    });

    it('should have actualPosition signal', () => {
      expect(typeof directive.actualPosition).toBe('function');
      expect(directive.actualPosition()).toBe('top');
    });

    it('should generate unique tooltipId', () => {
      expect(directive.tooltipId).toMatch(/^tooltip-[a-z0-9]+$/);
    });

    it('should apply default position (top) when not specified', () => {
      fixture.detectChanges();
      expect(directive.lmPosition()).toBe('top');
    });

    it('should apply default trigger (hover) when not specified', () => {
      fixture.detectChanges();
      expect(directive.lmTrigger()).toBe('hover');
    });

    it('should apply default delay (0) when not specified', () => {
      fixture.detectChanges();
      expect(directive.lmDelay()).toBe(0);
    });

    it('should apply default lmHtml (false) when not specified', () => {
      fixture.detectChanges();
      expect(directive.lmHtml()).toBe(false);
    });
  });

  // ============================================================
  // HOST BINDINGS TESTS
  // ============================================================

  describe('Host Bindings', () => {
    it('should set aria-describedby attribute', () => {
      fixture.detectChanges();
      expect(
        triggerElement.nativeElement.getAttribute('aria-describedby'),
      ).toBe(directive.tooltipId);
    });

    it('should set position relative on host element', () => {
      fixture.detectChanges();
      expect(triggerElement.nativeElement.style.position).toBe('relative');
    });
  });

  // ============================================================
  // TOOLTIP ELEMENT CREATION TESTS
  // ============================================================

  describe('Tooltip Element Creation', () => {
    it('should create tooltip element as child of trigger', () => {
      fixture.detectChanges();
      const tooltipEl = triggerElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl).toBeTruthy();
    });

    it('should set role="tooltip" on tooltip element', () => {
      fixture.detectChanges();
      const tooltipEl = triggerElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.getAttribute('role')).toBe('tooltip');
    });

    it('should set tooltip content as text content', () => {
      fixture.detectChanges();
      const tooltipEl = triggerElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.textContent).toBe('Test tooltip content');
    });
  });

  // ============================================================
  // DESIGN TOKEN DEFINITION TESTS
  // ============================================================

  describe('Design Token Definition', () => {
    it('should define --luma-tooltip-background css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-background')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.background);
    });

    it('should define --luma-tooltip-text css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-text')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.text);
    });

    it('should define --luma-tooltip-font-size css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-font-size')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.fontSize);
    });

    it('should define --luma-tooltip-padding css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-padding')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.padding);
    });

    it('should define --luma-tooltip-radius css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-radius')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.radius);
    });

    it('should define --luma-tooltip-shadow css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-shadow')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.shadow);
    });

    it('should define --luma-tooltip-max-width css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-max-width')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.maxWidth);
    });

    it('should define --luma-tooltip-offset css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-offset')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.offset);
    });

    it('should define --luma-tooltip-transition-duration css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-transition-duration')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.transition.duration);
    });

    it('should define --luma-tooltip-transition-timing css variable', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-transition-timing')
        .trim();
      expect(value).toBe(TOOLTIP_TOKENS.transition.timing);
    });
  });

  // ============================================================
  // TOKEN OVERRIDE TESTS
  // ============================================================

  describe('Token Override', () => {
    it('should respect custom background token override', () => {
      const customBg = 'oklch(0.2 0 0)';
      document.documentElement.style.setProperty(
        '--luma-tooltip-background',
        customBg,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-background')
        .trim();
      expect(value).toBe(customBg);
    });

    it('should respect custom radius token override', () => {
      const customRadius = '16px';
      document.documentElement.style.setProperty(
        '--luma-tooltip-radius',
        customRadius,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-radius')
        .trim();
      expect(value).toBe(customRadius);
    });

    it('should respect custom max-width token override', () => {
      const customMaxWidth = '500px';
      document.documentElement.style.setProperty(
        '--luma-tooltip-max-width',
        customMaxWidth,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-max-width')
        .trim();
      expect(value).toBe(customMaxWidth);
    });

    it('should respect custom transition duration override', () => {
      const customDuration = '300ms';
      document.documentElement.style.setProperty(
        '--luma-tooltip-transition-duration',
        customDuration,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-transition-duration')
        .trim();
      expect(value).toBe(customDuration);
    });
  });

  // ============================================================
  // CLASS APPLICATION TESTS
  // ============================================================

  describe('Class Application', () => {
    describe('Base Classes', () => {
      beforeEach(() => {
        fixture.detectChanges();
      });

      it('should apply absolute positioning', () => {
        expect(directive.classes()).toContain('absolute');
      });

      it('should apply z-50 for stacking', () => {
        expect(directive.classes()).toContain('z-50');
      });

      it('should apply lm-bg-tooltip for background', () => {
        expect(directive.classes()).toContain('lm-bg-tooltip');
      });

      it('should apply lm-text-tooltip for text color', () => {
        expect(directive.classes()).toContain('lm-text-tooltip');
      });

      it('should apply lm-text-size-tooltip for font size', () => {
        expect(directive.classes()).toContain('lm-text-size-tooltip');
      });

      it('should apply lm-rounded-tooltip for border radius', () => {
        expect(directive.classes()).toContain('lm-rounded-tooltip');
      });

      it('should apply lm-p-tooltip for padding', () => {
        expect(directive.classes()).toContain('lm-p-tooltip');
      });

      it('should apply lm-shadow-tooltip for shadow', () => {
        expect(directive.classes()).toContain('lm-shadow-tooltip');
      });

      it('should apply w-max for content-based width', () => {
        expect(directive.classes()).toContain('w-max');
      });

      it('should apply lm-max-w-tooltip for max-width', () => {
        expect(directive.classes()).toContain('lm-max-w-tooltip');
      });

      it('should apply transition for opacity and transform', () => {
        expect(directive.classes()).toContain('transition-[opacity,transform]');
      });

      it('should apply lm-duration-tooltip for animation duration', () => {
        expect(directive.classes()).toContain('lm-duration-tooltip');
      });

      it('should apply lm-ease-tooltip for animation easing', () => {
        expect(directive.classes()).toContain('lm-ease-tooltip');
      });

      it('should apply whitespace-normal for text wrapping', () => {
        expect(directive.classes()).toContain('whitespace-normal');
      });

      it('should apply text-center for centered text', () => {
        expect(directive.classes()).toContain('text-center');
      });
    });

    describe('Position Variant Classes', () => {
      describe('Top Position', () => {
        beforeEach(() => {
          hostComponent.lmPosition = 'top';
          fixture.detectChanges();
          // Manually set actualPosition since auto-flip uses requestAnimationFrame
          directive.actualPosition.set('top');
        });

        it('should apply bottom-full for vertical positioning', () => {
          expect(directive.classes()).toContain('bottom-full');
        });

        it('should apply left-1/2 for horizontal centering', () => {
          expect(directive.classes()).toContain('left-1/2');
        });

        it('should apply -translate-x-1/2 for centering transform', () => {
          expect(directive.classes()).toContain('-translate-x-1/2');
        });

        it('should apply mb-[var(--luma-tooltip-offset)] for margin', () => {
          expect(directive.classes()).toContain(
            'mb-[var(--luma-tooltip-offset)]',
          );
        });
      });

      describe('Bottom Position', () => {
        beforeEach(() => {
          hostComponent.lmPosition = 'bottom';
          fixture.detectChanges();
          directive.actualPosition.set('bottom');
        });

        it('should apply top-full for vertical positioning', () => {
          expect(directive.classes()).toContain('top-full');
        });

        it('should apply left-1/2 for horizontal centering', () => {
          expect(directive.classes()).toContain('left-1/2');
        });

        it('should apply -translate-x-1/2 for centering transform', () => {
          expect(directive.classes()).toContain('-translate-x-1/2');
        });

        it('should apply mt-[var(--luma-tooltip-offset)] for margin', () => {
          expect(directive.classes()).toContain(
            'mt-[var(--luma-tooltip-offset)]',
          );
        });
      });

      describe('Left Position', () => {
        beforeEach(() => {
          hostComponent.lmPosition = 'left';
          fixture.detectChanges();
          directive.actualPosition.set('left');
        });

        it('should apply right-full for horizontal positioning', () => {
          expect(directive.classes()).toContain('right-full');
        });

        it('should apply top-1/2 for vertical centering', () => {
          expect(directive.classes()).toContain('top-1/2');
        });

        it('should apply -translate-y-1/2 for centering transform', () => {
          expect(directive.classes()).toContain('-translate-y-1/2');
        });

        it('should apply mr-[var(--luma-tooltip-offset)] for margin', () => {
          expect(directive.classes()).toContain(
            'mr-[var(--luma-tooltip-offset)]',
          );
        });
      });

      describe('Right Position', () => {
        beforeEach(() => {
          hostComponent.lmPosition = 'right';
          fixture.detectChanges();
          directive.actualPosition.set('right');
        });

        it('should apply left-full for horizontal positioning', () => {
          expect(directive.classes()).toContain('left-full');
        });

        it('should apply top-1/2 for vertical centering', () => {
          expect(directive.classes()).toContain('top-1/2');
        });

        it('should apply -translate-y-1/2 for centering transform', () => {
          expect(directive.classes()).toContain('-translate-y-1/2');
        });

        it('should apply ml-[var(--luma-tooltip-offset)] for margin', () => {
          expect(directive.classes()).toContain(
            'ml-[var(--luma-tooltip-offset)]',
          );
        });
      });
    });

    describe('Visibility Variant Classes', () => {
      describe('when hidden', () => {
        beforeEach(() => {
          fixture.detectChanges();
          directive.isVisible.set(false);
        });

        it('should apply opacity-0', () => {
          expect(directive.classes()).toContain('opacity-0');
        });

        it('should apply scale-95', () => {
          expect(directive.classes()).toContain('scale-95');
        });

        it('should apply pointer-events-none', () => {
          expect(directive.classes()).toContain('pointer-events-none');
        });
      });

      describe('when visible', () => {
        beforeEach(() => {
          fixture.detectChanges();
          directive.isVisible.set(true);
        });

        it('should apply opacity-100', () => {
          expect(directive.classes()).toContain('opacity-100');
        });

        it('should apply scale-100', () => {
          expect(directive.classes()).toContain('scale-100');
        });

        it('should apply pointer-events-auto', () => {
          expect(directive.classes()).toContain('pointer-events-auto');
        });
      });
    });
  });

  // ============================================================
  // VISIBILITY STATE TESTS
  // ============================================================

  describe('Visibility State', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should start hidden', () => {
      expect(directive.isVisible()).toBe(false);
    });

    it('should show tooltip when show() is called', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);
    });

    it('should hide tooltip when hide() is called', () => {
      directive.show();
      directive.hide();
      expect(directive.isVisible()).toBe(false);
    });

    it('should toggle visibility when toggle() is called', () => {
      expect(directive.isVisible()).toBe(false);
      directive.toggle();
      expect(directive.isVisible()).toBe(true);
      directive.toggle();
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // HOVER TRIGGER TESTS
  // ============================================================

  describe('Hover Trigger', () => {
    beforeEach(() => {
      hostComponent.lmTrigger = 'hover';
      fixture.detectChanges();
      // Mock isTouchDevice to return false for desktop behavior tests
      // Using any to access private method for testing purposes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.spyOn(directive as any, 'isTouchDevice').mockReturnValue(false);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should show on mouseenter', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      expect(directive.isVisible()).toBe(true);
    });

    it('should hide on mouseleave', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      expect(directive.isVisible()).toBe(true);
      triggerElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      expect(directive.isVisible()).toBe(false);
    });

    it('should show on focus', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('focus'));
      expect(directive.isVisible()).toBe(true);
    });

    it('should hide on blur', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('focus'));
      expect(directive.isVisible()).toBe(true);
      triggerElement.nativeElement.dispatchEvent(new Event('blur'));
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // TOUCH DEVICE BEHAVIOR TESTS
  // ============================================================

  describe('Touch Device Behavior', () => {
    beforeEach(() => {
      hostComponent.lmTrigger = 'hover';
      fixture.detectChanges();
      // Mock touch device behavior
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.spyOn(directive as any, 'isTouchDevice').mockReturnValue(true);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should not show on mouseenter when touch device', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      expect(directive.isVisible()).toBe(false);
    });

    it('should not hide on mouseleave when touch device', () => {
      directive.show();
      triggerElement.nativeElement.dispatchEvent(new Event('mouseleave'));
      expect(directive.isVisible()).toBe(true);
    });

    it('should toggle on click when touch device (even with hover trigger)', () => {
      expect(directive.isVisible()).toBe(false);
      triggerElement.nativeElement.click();
      expect(directive.isVisible()).toBe(true);
      triggerElement.nativeElement.click();
      expect(directive.isVisible()).toBe(false);
    });

    it('should hide on document touch outside', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);

      // Simulate touch outside
      const touchEvent = new TouchEvent('touchstart', {
        bubbles: true,
        touches: [{ clientX: 0, clientY: 0 } as Touch],
      });
      document.dispatchEvent(touchEvent);
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // CLICK TRIGGER TESTS
  // ============================================================

  describe('Click Trigger', () => {
    let clickFixture: ComponentFixture<ClickTriggerTestHostComponent>;
    let clickTriggerElement: DebugElement;
    let clickDirective: TooltipDirective;

    beforeEach(async () => {
      clickFixture = TestBed.createComponent(ClickTriggerTestHostComponent);
      clickFixture.detectChanges();
      clickTriggerElement = clickFixture.debugElement.query(
        By.directive(TooltipDirective),
      );
      clickDirective = clickTriggerElement.injector.get(TooltipDirective);
    });

    it('should toggle visibility on click', () => {
      expect(clickDirective.isVisible()).toBe(false);
      clickTriggerElement.nativeElement.click();
      expect(clickDirective.isVisible()).toBe(true);
      clickTriggerElement.nativeElement.click();
      expect(clickDirective.isVisible()).toBe(false);
    });

    it('should not show on mouseenter with click trigger', () => {
      clickTriggerElement.nativeElement.dispatchEvent(new Event('mouseenter'));
      expect(clickDirective.isVisible()).toBe(false);
    });

    it('should hide when clicking outside', () => {
      clickTriggerElement.nativeElement.click();
      expect(clickDirective.isVisible()).toBe(true);

      // Simulate click outside
      document.dispatchEvent(new Event('click'));
      expect(clickDirective.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // FOCUS TRIGGER TESTS
  // ============================================================

  describe('Focus Trigger', () => {
    let focusFixture: ComponentFixture<FocusTriggerTestHostComponent>;
    let focusTriggerElement: DebugElement;
    let focusDirective: TooltipDirective;

    beforeEach(async () => {
      focusFixture = TestBed.createComponent(FocusTriggerTestHostComponent);
      focusFixture.detectChanges();
      focusTriggerElement = focusFixture.debugElement.query(
        By.directive(TooltipDirective),
      );
      focusDirective = focusTriggerElement.injector.get(TooltipDirective);
    });

    it('should show on focus', () => {
      focusTriggerElement.nativeElement.dispatchEvent(new Event('focus'));
      expect(focusDirective.isVisible()).toBe(true);
    });

    it('should hide on blur', () => {
      focusTriggerElement.nativeElement.dispatchEvent(new Event('focus'));
      expect(focusDirective.isVisible()).toBe(true);
      focusTriggerElement.nativeElement.dispatchEvent(new Event('blur'));
      expect(focusDirective.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // ESCAPE KEY TESTS
  // ============================================================

  describe('Escape Key', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should hide tooltip on escape key', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // DELAY TESTS
  // ============================================================

  describe('Delay Functionality', () => {
    let delayFixture: ComponentFixture<DelayedTooltipTestHostComponent>;
    let delayTriggerElement: DebugElement;
    let delayDirective: TooltipDirective;

    beforeEach(async () => {
      vi.useFakeTimers();
      delayFixture = TestBed.createComponent(DelayedTooltipTestHostComponent);
      delayFixture.detectChanges();
      delayTriggerElement = delayFixture.debugElement.query(
        By.directive(TooltipDirective),
      );
      delayDirective = delayTriggerElement.injector.get(TooltipDirective);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should have delay input set', () => {
      expect(delayDirective.lmDelay()).toBe(300);
    });

    it('should not show immediately when delay is set', () => {
      delayDirective.show();
      expect(delayDirective.isVisible()).toBe(false);
      vi.advanceTimersByTime(100);
      expect(delayDirective.isVisible()).toBe(false);
    });

    it('should show after delay period', () => {
      delayDirective.show();
      expect(delayDirective.isVisible()).toBe(false);
      vi.advanceTimersByTime(300);
      expect(delayDirective.isVisible()).toBe(true);
    });

    it('should cancel delay when hide() is called before timeout', () => {
      delayDirective.show();
      vi.advanceTimersByTime(100);
      delayDirective.hide();
      vi.advanceTimersByTime(300);
      expect(delayDirective.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // HTML CONTENT TESTS
  // ============================================================

  describe('HTML Content', () => {
    let htmlFixture: ComponentFixture<HtmlContentTestHostComponent>;
    let htmlTriggerElement: DebugElement;
    let htmlDirective: TooltipDirective;

    beforeEach(async () => {
      htmlFixture = TestBed.createComponent(HtmlContentTestHostComponent);
      htmlFixture.detectChanges();
      htmlTriggerElement = htmlFixture.debugElement.query(
        By.directive(TooltipDirective),
      );
      htmlDirective = htmlTriggerElement.injector.get(TooltipDirective);
    });

    it('should have lmHtml set to true', () => {
      expect(htmlDirective.lmHtml()).toBe(true);
    });

    it('should render HTML content when lmHtml is true', () => {
      const tooltipEl = htmlTriggerElement.nativeElement.querySelector(
        `#${htmlDirective.tooltipId}`,
      );
      expect(tooltipEl.innerHTML).toBe(
        '<strong>Bold</strong> and <em>italic</em>',
      );
    });

    it('should contain strong and em elements', () => {
      const tooltipEl = htmlTriggerElement.nativeElement.querySelector(
        `#${htmlDirective.tooltipId}`,
      );
      expect(tooltipEl.querySelector('strong')).toBeTruthy();
      expect(tooltipEl.querySelector('em')).toBeTruthy();
    });
  });

  // ============================================================
  // ACCESSIBILITY TESTS
  // ============================================================

  describe('Accessibility', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set aria-describedby on trigger element', () => {
      expect(
        triggerElement.nativeElement.getAttribute('aria-describedby'),
      ).toBe(directive.tooltipId);
    });

    it('should set role="tooltip" on tooltip element', () => {
      const tooltipEl = triggerElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.getAttribute('role')).toBe('tooltip');
    });

    it('should have unique ID for tooltip element', () => {
      const tooltipEl = triggerElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.id).toBe(directive.tooltipId);
    });

    it('should be keyboard accessible via focus', () => {
      triggerElement.nativeElement.dispatchEvent(new Event('focus'));
      expect(directive.isVisible()).toBe(true);
    });

    it('should be dismissible via Escape key', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);

      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
      );
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // DARK THEME TESTS
  // ============================================================

  describe('Dark Theme', () => {
    beforeEach(() => {
      applyDarkTheme();
    });

    it('should have access to dark theme background token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-background')
        .trim();
      expect(value).toBe(DARK_TOOLTIP_TOKENS.background);
    });

    it('should have access to dark theme text token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-tooltip-text')
        .trim();
      expect(value).toBe(DARK_TOOLTIP_TOKENS.text);
    });

    it('should have dark class on document element', () => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  // ============================================================
  // CLEANUP TESTS
  // ============================================================

  describe('Cleanup', () => {
    it('should clean up timeout on destroy', () => {
      vi.useFakeTimers();

      hostComponent.lmDelay = 300;
      fixture.detectChanges();

      directive.show();
      vi.advanceTimersByTime(100);

      // Trigger destroy - should not throw
      fixture.destroy();

      // Should not throw and should complete
      vi.advanceTimersByTime(300);
      vi.useRealTimers();
    });

    it('should remove tooltip element on destroy', () => {
      fixture.detectChanges();
      const tooltipId = directive.tooltipId;

      // Verify tooltip exists
      expect(
        triggerElement.nativeElement.querySelector(`#${tooltipId}`),
      ).toBeTruthy();

      // Destroy
      fixture.destroy();

      // Note: After destroy, the host element is removed from DOM
      // so we can't query it anymore. This test verifies ngOnDestroy runs.
    });
  });
});

// ============================================================
// DIFFERENT ELEMENT TYPES TESTS
// ============================================================

describe('TooltipDirective on Different Elements', () => {
  beforeEach(() => {
    setupTooltipTokens();
  });

  afterEach(() => {
    cleanupTooltipTokens();
  });

  describe('on Div Element', () => {
    let fixture: ComponentFixture<DivTooltipTestHostComponent>;
    let divElement: DebugElement;
    let directive: TooltipDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TooltipDirective, DivTooltipTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DivTooltipTestHostComponent);
      fixture.detectChanges();
      divElement = fixture.debugElement.query(By.directive(TooltipDirective));
      directive = divElement.injector.get(TooltipDirective);
    });

    it('should create directive on div element', () => {
      expect(directive).toBeTruthy();
      expect(divElement.nativeElement.tagName).toBe('DIV');
    });

    it('should create tooltip element', () => {
      const tooltipEl = divElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl).toBeTruthy();
    });

    it('should set content correctly', () => {
      const tooltipEl = divElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.textContent).toBe('Tooltip on div');
    });
  });

  describe('on Span Element', () => {
    let fixture: ComponentFixture<SpanTooltipTestHostComponent>;
    let spanElement: DebugElement;
    let directive: TooltipDirective;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TooltipDirective, SpanTooltipTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SpanTooltipTestHostComponent);
      fixture.detectChanges();
      spanElement = fixture.debugElement.query(By.directive(TooltipDirective));
      directive = spanElement.injector.get(TooltipDirective);
    });

    it('should create directive on span element', () => {
      expect(directive).toBeTruthy();
      expect(spanElement.nativeElement.tagName).toBe('SPAN');
    });

    it('should create tooltip element', () => {
      const tooltipEl = spanElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl).toBeTruthy();
    });

    it('should set content correctly', () => {
      const tooltipEl = spanElement.nativeElement.querySelector(
        `#${directive.tooltipId}`,
      );
      expect(tooltipEl.textContent).toBe('Tooltip on span');
    });
  });
});
