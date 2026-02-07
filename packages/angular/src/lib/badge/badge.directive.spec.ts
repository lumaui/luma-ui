import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmBadgeDirective } from './badge.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  selector: 'badge-test-host',
  template: `<span lumaBadge [lmVariant]="variant" [lmRadius]="radius">Test Badge</span>`,
  imports: [LmBadgeDirective],
})
class BadgeTestHostComponent {
  variant: 'default' | 'outline' = 'default';
  radius: 'default' | 'square' | 'full' = 'default';
}

@Component({
  selector: 'div-badge-test-host',
  template: `<div lumaBadge>Badge on Div</div>`,
  imports: [LmBadgeDirective],
})
class DivBadgeTestHostComponent {}

// ============================================================
// SEMANTIC TOKEN DEFINITIONS
// ============================================================

const SEMANTIC_TOKENS = {
  colors: {
    primary: 'oklch(0.48 0.09 300)',
    primaryForeground: 'oklch(1 0 0)',
    foreground: 'oklch(0.22 0.014 290)',
    border: 'oklch(0.89 0.004 286)',
  },
  radius: {
    radius4: '0.5rem',    // 8px - default radius
    radiusFull: '9999px', // pill shape
  },
} as const;

// ============================================================
// SETUP & CLEANUP FUNCTIONS
// ============================================================

function setupSemanticTokens(): void {
  const root = document.documentElement;

  // Color tokens
  root.style.setProperty('--color-primary', SEMANTIC_TOKENS.colors.primary);
  root.style.setProperty('--color-primary-foreground', SEMANTIC_TOKENS.colors.primaryForeground);
  root.style.setProperty('--color-foreground', SEMANTIC_TOKENS.colors.foreground);
  root.style.setProperty('--color-border', SEMANTIC_TOKENS.colors.border);

  // Radius tokens
  root.style.setProperty('--radius-4', SEMANTIC_TOKENS.radius.radius4);
  root.style.setProperty('--radius-full', SEMANTIC_TOKENS.radius.radiusFull);
}

function cleanupSemanticTokens(): void {
  const root = document.documentElement;

  // Color tokens
  root.style.removeProperty('--color-primary');
  root.style.removeProperty('--color-primary-foreground');
  root.style.removeProperty('--color-foreground');
  root.style.removeProperty('--color-border');

  // Radius tokens
  root.style.removeProperty('--radius-4');
  root.style.removeProperty('--radius-full');
}

// ============================================================
// TEST SUITE
// ============================================================

describe('LmBadgeDirective', () => {
  let fixture: ComponentFixture<BadgeTestHostComponent>;
  let hostComponent: BadgeTestHostComponent;
  let badgeElement: DebugElement;
  let directive: LmBadgeDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmBadgeDirective,
        BadgeTestHostComponent,
        DivBadgeTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeTestHostComponent);
    hostComponent = fixture.componentInstance;
    badgeElement = fixture.debugElement.query(By.directive(LmBadgeDirective));
    directive = badgeElement.injector.get(LmBadgeDirective);
    setupSemanticTokens();
  });

  afterEach(() => {
    cleanupSemanticTokens();
  });

  // ============================================================
  // BASIC DIRECTIVE CREATION
  // ============================================================

  describe('Basic Directive Creation', () => {
    it('should create the directive', () => {
      expect(directive).toBeTruthy();
    });

    it('should apply as directive on span element', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.tagName).toBe('SPAN');
    });

    it('should have computed classes signal', () => {
      expect(typeof directive.classes).toBe('function');
    });
  });

  // ============================================================
  // BASE CLASSES TESTS
  // ============================================================

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply layout classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('whitespace-nowrap');
    });

    it('should apply typography classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('text-xs');
      expect(classes).toContain('font-medium');
    });

    it('should apply border class', () => {
      const classes = directive.classes();
      expect(classes).toContain('border');
    });

    it('should apply padding classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('px-2');
      expect(classes).toContain('py-0.5');
    });
  });

  // ============================================================
  // DEFAULT VARIANT TESTS
  // ============================================================

  describe('Default Variant', () => {
    beforeEach(() => {
      hostComponent.variant = 'default';
      fixture.detectChanges();
    });

    it('should apply default background class', () => {
      expect(directive.classes()).toContain('bg-primary-2');
    });

    it('should apply default text class', () => {
      expect(directive.classes()).toContain('text-primary-12');
    });

    it('should apply transparent border', () => {
      expect(directive.classes()).toContain('border-transparent');
    });

    it('should have access to --color-primary token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.primary);
    });
  });

  // ============================================================
  // OUTLINE VARIANT TESTS
  // ============================================================

  describe('Outline Variant', () => {
    beforeEach(() => {
      hostComponent.variant = 'outline';
      fixture.detectChanges();
    });

    it('should apply transparent background', () => {
      expect(directive.classes()).toContain('bg-transparent');
    });

    it('should apply foreground text class', () => {
      expect(directive.classes()).toContain('text-primary-12');
    });

    it('should apply border color', () => {
      expect(directive.classes()).toContain('border-primary-7');
    });

    it('should have access to --color-border token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-border')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.border);
    });
  });

  // ============================================================
  // RADIUS DEFAULT TESTS
  // ============================================================

  describe('Radius Default', () => {
    beforeEach(() => {
      hostComponent.radius = 'default';
      fixture.detectChanges();
    });

    it('should apply default radius class', () => {
      expect(directive.classes()).toContain('rounded-[var(--radius-4)]');
    });

    it('should have access to --radius-4 token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--radius-4')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.radius.radius4);
    });
  });

  // ============================================================
  // RADIUS SQUARE TESTS
  // ============================================================

  describe('Radius Square', () => {
    beforeEach(() => {
      hostComponent.radius = 'square';
      fixture.detectChanges();
    });

    it('should apply square radius class', () => {
      expect(directive.classes()).toContain('rounded-none');
    });

    it('should not have rounded corners', () => {
      const classes = directive.classes();
      expect(classes).not.toContain('rounded-full');
      expect(classes).not.toContain('rounded-[var(--radius-4)]');
    });
  });

  // ============================================================
  // RADIUS FULL TESTS
  // ============================================================

  describe('Radius Full', () => {
    beforeEach(() => {
      hostComponent.radius = 'full';
      fixture.detectChanges();
    });

    it('should apply full radius class', () => {
      expect(directive.classes()).toContain('rounded-full');
    });

    it('should have access to --radius-full token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--radius-full')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.radius.radiusFull);
    });
  });

  // ============================================================
  // DIV ELEMENT TESTS
  // ============================================================

  describe('Div Element', () => {
    it('should work on div element', () => {
      const divFixture = TestBed.createComponent(DivBadgeTestHostComponent);
      divFixture.detectChanges();

      const divBadge = divFixture.debugElement.query(
        By.directive(LmBadgeDirective),
      );
      expect(divBadge.nativeElement.tagName).toBe('DIV');
    });

    it('should apply same classes on div element', () => {
      const divFixture = TestBed.createComponent(DivBadgeTestHostComponent);
      divFixture.detectChanges();

      const divBadge = divFixture.debugElement.query(
        By.directive(LmBadgeDirective),
      );
      const divDirective = divBadge.injector.get(LmBadgeDirective);

      expect(divDirective.classes()).toContain('inline-flex');
      expect(divDirective.classes()).toContain('rounded-[var(--radius-4)]');
    });
  });

  // ============================================================
  // SIGNAL-BASED INPUT TESTS
  // ============================================================

  describe('Signal-Based Inputs', () => {
    it('should use signal-based input for variant', () => {
      expect(typeof directive.lmVariant).toBe('function');
      const variant = directive.lmVariant();
      expect(variant).toBe('default');
    });

    it('should use signal-based input for radius', () => {
      expect(typeof directive.lmRadius).toBe('function');
      const radius = directive.lmRadius();
      expect(radius).toBe('default');
    });

    describe('when variant is default', () => {
      beforeEach(() => {
        hostComponent.variant = 'default';
        fixture.detectChanges();
      });

      it('should apply default variant classes', () => {
        expect(directive.classes()).toContain('bg-primary-2');
      });
    });

    describe('when variant is outline', () => {
      beforeEach(() => {
        hostComponent.variant = 'outline';
        fixture.detectChanges();
      });

      it('should apply outline variant classes', () => {
        expect(directive.classes()).toContain('bg-transparent');
        expect(directive.classes()).toContain('border-primary-7');
      });
    });

    describe('when radius is default', () => {
      beforeEach(() => {
        hostComponent.radius = 'default';
        fixture.detectChanges();
      });

      it('should apply default radius classes', () => {
        expect(directive.classes()).toContain('rounded-[var(--radius-4)]');
      });
    });

    describe('when radius is square', () => {
      beforeEach(() => {
        hostComponent.radius = 'square';
        fixture.detectChanges();
      });

      it('should apply square radius classes', () => {
        expect(directive.classes()).toContain('rounded-none');
      });
    });

    describe('when radius is full', () => {
      beforeEach(() => {
        hostComponent.radius = 'full';
        fixture.detectChanges();
      });

      it('should apply full radius classes', () => {
        expect(directive.classes()).toContain('rounded-full');
      });
    });
  });
});
