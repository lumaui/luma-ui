import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmTooltipDirective } from './tooltip.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  selector: 'tooltip-test-host',
  template: `
    <button [lumaTooltip]="tooltipText" [lmPosition]="position">
      Hover me
    </button>
  `,
  imports: [LmTooltipDirective],
})
class TooltipTestHostComponent {
  tooltipText = 'Test tooltip';
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
}

// ============================================================
// SEMANTIC TOKEN DEFINITIONS
// ============================================================

const SEMANTIC_TOKENS = {
  colors: {
    popover: 'oklch(0.13 0.030 300)',
    popoverForeground: 'oklch(1 0 0)',
  },
} as const;

// ============================================================
// SETUP & CLEANUP FUNCTIONS
// ============================================================

function setupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.setProperty('--color-popover', SEMANTIC_TOKENS.colors.popover);
  root.style.setProperty('--color-popover-foreground', SEMANTIC_TOKENS.colors.popoverForeground);
}

function cleanupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.removeProperty('--color-popover');
  root.style.removeProperty('--color-popover-foreground');
}

function cleanupPortalTooltips(): void {
  document.querySelectorAll('[role="tooltip"]').forEach((el) => el.remove());
}

// ============================================================
// TEST SUITE
// ============================================================

describe('LmTooltipDirective', () => {
  let fixture: ComponentFixture<TooltipTestHostComponent>;
  let hostComponent: TooltipTestHostComponent;
  let buttonElement: DebugElement;
  let directive: LmTooltipDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmTooltipDirective, TooltipTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTestHostComponent);
    hostComponent = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    setupSemanticTokens();
    // Do NOT get directive here - get it after detectChanges() in each test
  });

  afterEach(() => {
    cleanupSemanticTokens();
    cleanupPortalTooltips();
  });

  // ============================================================
  // BASIC CREATION
  // ============================================================

  describe('Basic Creation', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should create the directive', () => {
      expect(directive).toBeTruthy();
    });

    it('should have tooltip text input', () => {
      expect(directive.lumaTooltip()).toBe('Test tooltip');
    });

    it('should have position input', () => {
      expect(directive.lmPosition()).toBe('top');
    });
  });

  // ============================================================
  // BASE CLASSES
  // ============================================================

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should apply fixed positioning for portal pattern', () => {
      const classes = directive.classes();
      expect(classes).toContain('fixed');
      expect(classes).toContain('z-50');
    });

    it('should apply high-contrast popover styling classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('bg-popover');
      expect(classes).toContain('text-popover-foreground');
    });

    it('should apply padding classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('px-3');
      expect(classes).toContain('py-1.5');
    });

    it('should apply typography classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('text-sm');
      expect(classes).toContain('whitespace-normal');
      expect(classes).toContain('text-center');
    });

    it('should apply shape classes with 360px max-width', () => {
      const classes = directive.classes();
      expect(classes).toContain('rounded-md');
      expect(classes).toContain('shadow-md');
      expect(classes).toContain('max-w-[360px]');
    });

    it('should apply animation classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('transition-opacity');
      expect(classes).toContain('duration-200');
    });

    it('should have pointer-events-none by default', () => {
      const classes = directive.classes();
      expect(classes).toContain('pointer-events-none');
    });
  });

  // ============================================================
  // POSITION INPUTS
  // ============================================================

  describe('Top Position', () => {
    beforeEach(() => {
      hostComponent.position = 'top';
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should accept top position input', () => {
      expect(directive.lmPosition()).toBe('top');
    });
  });

  describe('Bottom Position', () => {
    beforeEach(() => {
      hostComponent.position = 'bottom';
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should accept bottom position input', () => {
      expect(directive.lmPosition()).toBe('bottom');
    });
  });

  describe('Left Position', () => {
    beforeEach(() => {
      hostComponent.position = 'left';
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should accept left position input', () => {
      expect(directive.lmPosition()).toBe('left');
    });
  });

  describe('Right Position', () => {
    beforeEach(() => {
      hostComponent.position = 'right';
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should accept right position input', () => {
      expect(directive.lmPosition()).toBe('right');
    });
  });

  // ============================================================
  // VISIBILITY STATE
  // ============================================================

  describe('Visibility State', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should be hidden by default', () => {
      expect(directive.isVisible()).toBe(false);
      const classes = directive.classes();
      expect(classes).toContain('opacity-0');
    });

    it('should have show() method', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);
    });

    it('should have hide() method', () => {
      directive.show();
      expect(directive.isVisible()).toBe(true);

      directive.hide();
      expect(directive.isVisible()).toBe(false);
    });

    it('should have toggle() method', () => {
      expect(directive.isVisible()).toBe(false);

      directive.toggle();
      expect(directive.isVisible()).toBe(true);

      directive.toggle();
      expect(directive.isVisible()).toBe(false);
    });
  });

  // ============================================================
  // PORTAL RENDERING
  // ============================================================

  describe('Portal Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should render tooltip as a child of document.body', () => {
      const tooltip = document.getElementById(directive.tooltipId);
      expect(tooltip).toBeTruthy();
      expect(tooltip!.parentElement).toBe(document.body);
    });

    it('should NOT render tooltip inside the trigger element', () => {
      const trigger = buttonElement.nativeElement;
      const tooltipInTrigger = trigger.querySelector('[role="tooltip"]');
      expect(tooltipInTrigger).toBeNull();
    });

    it('should NOT set position:relative on the trigger', () => {
      const trigger = buttonElement.nativeElement;
      expect(trigger.style.position).not.toBe('relative');
    });

    it('should remove tooltip from body on destroy', () => {
      const tooltipId = directive.tooltipId;
      expect(document.getElementById(tooltipId)).toBeTruthy();

      fixture.destroy();

      expect(document.getElementById(tooltipId)).toBeNull();
    });
  });

  // ============================================================
  // SEMANTIC TOKENS
  // ============================================================

  describe('Semantic Tokens', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should have access to --color-popover token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-popover')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.popover);
    });

    it('should have access to --color-popover-foreground token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-popover-foreground')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.popoverForeground);
    });
  });

  // ============================================================
  // TOOLTIP CONTENT
  // ============================================================

  describe('Tooltip Content', () => {
    describe('with updated text', () => {
      beforeEach(() => {
        hostComponent.tooltipText = 'New tooltip text';
        fixture.detectChanges();
        directive = buttonElement.injector.get(LmTooltipDirective);
      });

      it('should update tooltip text when input changes', () => {
        expect(directive.lumaTooltip()).toBe('New tooltip text');
      });
    });

    describe('with empty text', () => {
      beforeEach(() => {
        hostComponent.tooltipText = '';
        fixture.detectChanges();
        directive = buttonElement.injector.get(LmTooltipDirective);
      });

      it('should handle empty tooltip text', () => {
        expect(directive.lumaTooltip()).toBe('');
      });
    });
  });

  // ============================================================
  // SIGNAL-BASED INPUTS
  // ============================================================

  describe('Signal-Based Inputs', () => {
    beforeEach(() => {
      fixture.detectChanges();
      directive = buttonElement.injector.get(LmTooltipDirective);
    });

    it('should use signal for tooltip text', () => {
      expect(typeof directive.lumaTooltip).toBe('function');
      const text = directive.lumaTooltip();
      expect(text).toBe('Test tooltip');
    });

    it('should use signal for position', () => {
      expect(typeof directive.lmPosition).toBe('function');
      const position = directive.lmPosition();
      expect(position).toBe('top');
    });
  });
});
