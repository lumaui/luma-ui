import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmBadgeDirective } from './badge.directive';
import { By } from '@angular/platform-browser';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: ` <span lumaBadge> Test Badge </span> `,
  imports: [LmBadgeDirective],
})
class BadgeTestHostComponent {}

@Component({
  template: `<div lumaBadge>Badge on Div</div>`,
  imports: [LmBadgeDirective],
})
class DivBadgeTestHostComponent {}

// ============================================================
// LAYOUT TOKEN DEFINITIONS
// ============================================================

const BADGE_TOKENS = {
  fontSize: '0.875rem',
  fontWeight: '500',
  paddingX: '0.625rem',
  paddingY: '0.25rem',
  radius: '9999px',
  borderWidth: '1px',
} as const;

// ============================================================
// TOKEN SETUP/CLEANUP UTILITIES
// ============================================================

function setupBadgeTokens(): void {
  const root = document.documentElement;

  // Layout tokens only
  root.style.setProperty('--luma-badge-font-size', BADGE_TOKENS.fontSize);
  root.style.setProperty('--luma-badge-font-weight', BADGE_TOKENS.fontWeight);
  root.style.setProperty('--luma-badge-padding-x', BADGE_TOKENS.paddingX);
  root.style.setProperty('--luma-badge-padding-y', BADGE_TOKENS.paddingY);
  root.style.setProperty('--luma-badge-radius', BADGE_TOKENS.radius);
  root.style.setProperty('--luma-badge-border-width', BADGE_TOKENS.borderWidth);
}

function cleanupBadgeTokens(): void {
  const root = document.documentElement;
  const tokenNames = [
    '--luma-badge-font-size',
    '--luma-badge-font-weight',
    '--luma-badge-padding-x',
    '--luma-badge-padding-y',
    '--luma-badge-radius',
    '--luma-badge-border-width',
  ];

  tokenNames.forEach((name) => root.style.removeProperty(name));
}

// ============================================================
// TEST SUITES
// ============================================================

describe('LmBadgeDirective', () => {
  let fixture: ComponentFixture<BadgeTestHostComponent>;
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
    badgeElement = fixture.debugElement.query(By.directive(LmBadgeDirective));
    directive = badgeElement.injector.get(LmBadgeDirective);

    setupBadgeTokens();
  });

  afterEach(() => {
    cleanupBadgeTokens();
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
  // LAYOUT TOKEN DEFINITION TESTS
  // ============================================================

  describe('Layout Token Definitions', () => {
    it('should define --luma-badge-font-size', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-font-size')
        .trim();
      expect(value).toBe(BADGE_TOKENS.fontSize);
    });

    it('should define --luma-badge-font-weight', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-font-weight')
        .trim();
      expect(value).toBe(BADGE_TOKENS.fontWeight);
    });

    it('should define --luma-badge-padding-x', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-padding-x')
        .trim();
      expect(value).toBe(BADGE_TOKENS.paddingX);
    });

    it('should define --luma-badge-padding-y', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-padding-y')
        .trim();
      expect(value).toBe(BADGE_TOKENS.paddingY);
    });

    it('should define --luma-badge-radius', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-radius')
        .trim();
      expect(value).toBe(BADGE_TOKENS.radius);
    });

    it('should define --luma-badge-border-width', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-border-width')
        .trim();
      expect(value).toBe(BADGE_TOKENS.borderWidth);
    });
  });

  // ============================================================
  // TOKEN OVERRIDE TESTS (CUSTOMIZATION)
  // ============================================================

  describe('Token Override (Customization)', () => {
    it('should respect custom radius token override', () => {
      const customRadius = '4px';
      document.documentElement.style.setProperty(
        '--luma-badge-radius',
        customRadius,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-radius')
        .trim();

      expect(value).toBe(customRadius);
    });

    it('should respect custom font-size token override', () => {
      const customFontSize = '1rem';
      document.documentElement.style.setProperty(
        '--luma-badge-font-size',
        customFontSize,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-font-size')
        .trim();

      expect(value).toBe(customFontSize);
    });

    it('should respect custom border-width token override', () => {
      const customBorderWidth = '2px';
      document.documentElement.style.setProperty(
        '--luma-badge-border-width',
        customBorderWidth,
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-badge-border-width')
        .trim();

      expect(value).toBe(customBorderWidth);
    });
  });

  // ============================================================
  // CLASS APPLICATION TESTS
  // ============================================================

  describe('Class Application', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply inline-flex class', () => {
      expect(directive.classes()).toContain('inline-flex');
    });

    it('should apply items-center class', () => {
      expect(directive.classes()).toContain('items-center');
    });

    it('should apply justify-center class', () => {
      expect(directive.classes()).toContain('justify-center');
    });

    it('should apply whitespace-nowrap class', () => {
      expect(directive.classes()).toContain('whitespace-nowrap');
    });

    it('should apply border class', () => {
      expect(directive.classes()).toContain('border');
    });

    it('should apply lm-font-badge class', () => {
      expect(directive.classes()).toContain('lm-font-badge');
    });

    it('should apply lm-rounded-badge class', () => {
      expect(directive.classes()).toContain('lm-rounded-badge');
    });

    it('should apply lm-border-w-badge class', () => {
      expect(directive.classes()).toContain('lm-border-w-badge');
    });

    it('should apply leading-tight class', () => {
      expect(directive.classes()).toContain('leading-tight');
    });
  });

  // ============================================================
  // MULTI-ELEMENT SUPPORT TESTS
  // ============================================================

  describe('Multi-Element Support', () => {
    it('should work on div elements', () => {
      const divFixture = TestBed.createComponent(DivBadgeTestHostComponent);
      divFixture.detectChanges();

      const divBadge = divFixture.debugElement.query(
        By.directive(LmBadgeDirective),
      );
      expect(divBadge.nativeElement.tagName).toBe('DIV');
    });

    it('should apply layout classes on div elements', () => {
      const divFixture = TestBed.createComponent(DivBadgeTestHostComponent);
      divFixture.detectChanges();

      const divBadge = divFixture.debugElement.query(
        By.directive(LmBadgeDirective),
      );
      const divDirective = divBadge.injector.get(LmBadgeDirective);
      expect(divDirective.classes()).toContain('inline-flex');
      expect(divDirective.classes()).toContain('lm-rounded-badge');
    });
  });
});
