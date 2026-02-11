import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmBadgeDirective } from './badge.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  selector: 'luma-badge-test-host',
  template: `<span lumaBadge [lmVariant]="variant" [lmRadius]="radius"
    >Test Badge</span
  >`,
  imports: [LmBadgeDirective],
})
class BadgeTestHostComponent {
  variant: 'default' | 'outline' = 'default';
  radius: 'default' | 'square' | 'full' = 'default';
}

@Component({
  selector: 'luma-div-badge-test-host',
  template: `<div lumaBadge>Badge on Div</div>`,
  imports: [LmBadgeDirective],
})
class DivBadgeTestHostComponent {}

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
});
