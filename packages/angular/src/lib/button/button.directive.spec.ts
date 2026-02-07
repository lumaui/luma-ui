import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmButtonDirective } from './button.directive';
import { By } from '@angular/platform-browser';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: `
    <button
      lumaButton
      [lmVariant]="lmVariant"
      [lmSize]="lmSize"
      [lmRadius]="lmRadius"
      [lmDisabled]="lmDisabled"
      [lmType]="lmType"
    >
      Test Button
    </button>
  `,
  imports: [LmButtonDirective],
})
class ButtonTestHostComponent {
  lmVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' =
    'primary';
  lmSize: 'sm' | 'md' | 'lg' = 'md';
  lmRadius: 'default' | 'square' | 'full' = 'default';
  lmDisabled = false;
  lmType: 'button' | 'submit' | 'reset' = 'button';
}

@Component({
  template: `<a lumaButton [lmVariant]="lmVariant" href="/test"
    >Link Button</a
  >`,
  imports: [LmButtonDirective],
})
class AnchorButtonTestHostComponent {
  lmVariant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' =
    'primary';
}

@Component({
  template: `<button lumaButton lmType="submit">Submit Button</button>`,
  imports: [LmButtonDirective],
})
class SubmitButtonTestHostComponent {}

@Component({
  template: `<button lumaButton lmType="reset">Reset Button</button>`,
  imports: [LmButtonDirective],
})
class ResetButtonTestHostComponent {}

// ============================================================
// SEMANTIC TOKEN DEFINITIONS
// ============================================================

const SEMANTIC_TOKENS = {
  colors: {
    primary: 'oklch(0.48 0.09 300)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.97 0.006 290)',
    secondaryForeground: 'oklch(0.22 0.014 290)',
    destructive: 'oklch(0.63 0.10 28)',
    destructiveForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.97 0.006 290)',
    accentForeground: 'oklch(0.22 0.014 290)',
    background: 'oklch(1 0 0)',
    foreground: 'oklch(0.22 0.014 290)',
    input: 'oklch(0.97 0.006 290)',
    ring: 'oklch(0.55 0.10 300 / 0.35)',
  },
} as const;

const DARK_SEMANTIC_TOKENS = {
  colors: {
    primary: 'oklch(0.72 0.12 300)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.22 0.008 290)',
    secondaryForeground: 'oklch(0.92 0.01 290)',
    destructive: 'oklch(0.72 0.12 28)',
    destructiveForeground: 'oklch(1 0 0)',
    accent: 'oklch(0.22 0.008 290)',
    accentForeground: 'oklch(0.92 0.01 290)',
    background: 'oklch(0.16 0.006 290)',
    foreground: 'oklch(0.92 0.01 290)',
    input: 'oklch(0.22 0.008 290)',
    ring: 'oklch(0.78 0.12 300 / 0.4)',
  },
} as const;

// ============================================================
// SETUP & CLEANUP FUNCTIONS
// ============================================================

function setupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', SEMANTIC_TOKENS.colors.primary);
  root.style.setProperty(
    '--color-primary-foreground',
    SEMANTIC_TOKENS.colors.primaryForeground,
  );
  root.style.setProperty('--color-secondary', SEMANTIC_TOKENS.colors.secondary);
  root.style.setProperty(
    '--color-secondary-foreground',
    SEMANTIC_TOKENS.colors.secondaryForeground,
  );
  root.style.setProperty(
    '--color-destructive',
    SEMANTIC_TOKENS.colors.destructive,
  );
  root.style.setProperty(
    '--color-destructive-foreground',
    SEMANTIC_TOKENS.colors.destructiveForeground,
  );
  root.style.setProperty('--color-accent', SEMANTIC_TOKENS.colors.accent);
  root.style.setProperty(
    '--color-accent-foreground',
    SEMANTIC_TOKENS.colors.accentForeground,
  );
  root.style.setProperty(
    '--color-background',
    SEMANTIC_TOKENS.colors.background,
  );
  root.style.setProperty(
    '--color-foreground',
    SEMANTIC_TOKENS.colors.foreground,
  );
  root.style.setProperty('--color-input', SEMANTIC_TOKENS.colors.input);
  root.style.setProperty('--color-ring', SEMANTIC_TOKENS.colors.ring);
}

function cleanupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.removeProperty('--color-primary');
  root.style.removeProperty('--color-primary-foreground');
  root.style.removeProperty('--color-secondary');
  root.style.removeProperty('--color-secondary-foreground');
  root.style.removeProperty('--color-destructive');
  root.style.removeProperty('--color-destructive-foreground');
  root.style.removeProperty('--color-accent');
  root.style.removeProperty('--color-accent-foreground');
  root.style.removeProperty('--color-background');
  root.style.removeProperty('--color-foreground');
  root.style.removeProperty('--color-input');
  root.style.removeProperty('--color-ring');
  root.classList.remove('dark');
}

function applyDarkTheme(): void {
  document.documentElement.classList.add('dark');
  const root = document.documentElement;
  root.style.setProperty('--color-primary', DARK_SEMANTIC_TOKENS.colors.primary);
  root.style.setProperty(
    '--color-primary-foreground',
    DARK_SEMANTIC_TOKENS.colors.primaryForeground,
  );
  root.style.setProperty(
    '--color-secondary',
    DARK_SEMANTIC_TOKENS.colors.secondary,
  );
  root.style.setProperty(
    '--color-secondary-foreground',
    DARK_SEMANTIC_TOKENS.colors.secondaryForeground,
  );
  root.style.setProperty(
    '--color-destructive',
    DARK_SEMANTIC_TOKENS.colors.destructive,
  );
  root.style.setProperty(
    '--color-destructive-foreground',
    DARK_SEMANTIC_TOKENS.colors.destructiveForeground,
  );
  root.style.setProperty('--color-accent', DARK_SEMANTIC_TOKENS.colors.accent);
  root.style.setProperty(
    '--color-accent-foreground',
    DARK_SEMANTIC_TOKENS.colors.accentForeground,
  );
  root.style.setProperty(
    '--color-background',
    DARK_SEMANTIC_TOKENS.colors.background,
  );
  root.style.setProperty(
    '--color-foreground',
    DARK_SEMANTIC_TOKENS.colors.foreground,
  );
  root.style.setProperty('--color-input', DARK_SEMANTIC_TOKENS.colors.input);
  root.style.setProperty('--color-ring', DARK_SEMANTIC_TOKENS.colors.ring);
}

// ============================================================
// TEST SUITE
// ============================================================

describe('LmButtonDirective', () => {
  let fixture: ComponentFixture<ButtonTestHostComponent>;
  let hostComponent: ButtonTestHostComponent;
  let buttonElement: DebugElement;
  let directive: LmButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmButtonDirective,
        ButtonTestHostComponent,
        AnchorButtonTestHostComponent,
        SubmitButtonTestHostComponent,
        ResetButtonTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonTestHostComponent);
    hostComponent = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.directive(LmButtonDirective));
    directive = buttonElement.injector.get(LmButtonDirective);
    setupSemanticTokens();
  });

  afterEach(() => {
    cleanupSemanticTokens();
  });

  // ============================================================
  // BASIC CREATION
  // ============================================================

  it('should create the directive', () => {
    expect(directive).toBeTruthy();
  });

  // ============================================================
  // BASE CLASSES TESTS
  // ============================================================

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base layout classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('inline-flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('gap-2');
    });

    it('should apply typography classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('font-medium');
      expect(classes).toContain('whitespace-nowrap');
    });

    it('should apply calm interaction transition classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-200');
    });

    it('should apply focus-visible ring classes using semantic token', () => {
      const classes = directive.classes();
      expect(classes).toContain('focus-visible:outline-none');
      expect(classes).toContain('focus-visible:ring-2');
      expect(classes).toContain('focus-visible:ring-ring');
      expect(classes).toContain('focus-visible:ring-offset-2');
    });

    it('should apply disabled state classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('disabled:pointer-events-none');
      expect(classes).toContain('disabled:opacity-50');
    });
  });

  // ============================================================
  // PRIMARY VARIANT TESTS
  // ============================================================

  describe('Primary Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'primary';
      fixture.detectChanges();
    });

    it('should apply primary background class', () => {
      expect(directive.classes()).toContain('bg-primary');
    });

    it('should apply primary foreground text class', () => {
      expect(directive.classes()).toContain('text-primary-foreground');
    });

    it('should apply primary hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-primary/90');
    });

    it('should have access to --color-primary token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.primary);
    });

    it('should have access to --color-primary-foreground token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-foreground')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.primaryForeground);
    });
  });

  // ============================================================
  // SECONDARY VARIANT TESTS
  // ============================================================

  describe('Secondary Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'secondary';
      fixture.detectChanges();
    });

    it('should apply secondary background class', () => {
      expect(directive.classes()).toContain('bg-secondary');
    });

    it('should apply secondary foreground text class', () => {
      expect(directive.classes()).toContain('text-secondary-foreground');
    });

    it('should apply secondary hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-secondary/80');
    });
  });

  // ============================================================
  // OUTLINE VARIANT TESTS
  // ============================================================

  describe('Outline Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'outline';
      fixture.detectChanges();
    });

    it('should apply border class', () => {
      expect(directive.classes()).toContain('border');
    });

    it('should apply border-input class', () => {
      expect(directive.classes()).toContain('border-input');
    });

    it('should apply background class', () => {
      expect(directive.classes()).toContain('bg-background');
    });

    it('should apply hover accent background class', () => {
      expect(directive.classes()).toContain('hover:bg-accent');
    });

    it('should apply hover accent foreground text class', () => {
      expect(directive.classes()).toContain('hover:text-accent-foreground');
    });
  });

  // ============================================================
  // GHOST VARIANT TESTS
  // ============================================================

  describe('Ghost Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'ghost';
      fixture.detectChanges();
    });

    it('should apply hover accent background class', () => {
      expect(directive.classes()).toContain('hover:bg-accent');
    });

    it('should apply hover accent foreground text class', () => {
      expect(directive.classes()).toContain('hover:text-accent-foreground');
    });

    it('should not have base background class', () => {
      expect(directive.classes()).not.toContain('bg-primary');
      expect(directive.classes()).not.toContain('bg-secondary');
    });
  });

  // ============================================================
  // DESTRUCTIVE VARIANT TESTS
  // ============================================================

  describe('Destructive Variant', () => {
    beforeEach(() => {
      hostComponent.lmVariant = 'destructive';
      fixture.detectChanges();
    });

    it('should apply destructive background class', () => {
      expect(directive.classes()).toContain('bg-destructive');
    });

    it('should apply destructive foreground text class', () => {
      expect(directive.classes()).toContain('text-destructive-foreground');
    });

    it('should apply destructive hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-destructive/90');
    });

    it('should have access to --color-destructive token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-destructive')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.destructive);
    });
  });

  // ============================================================
  // SIZE VARIANT TESTS
  // ============================================================

  describe('Size Variants', () => {
    describe('Small Size (sm)', () => {
      beforeEach(() => {
        hostComponent.lmSize = 'sm';
        fixture.detectChanges();
      });

      it('should apply small font size class (text-xs = 12px)', () => {
        expect(directive.classes()).toContain('text-xs');
      });

      it('should apply small horizontal padding class (px-3 = 12px)', () => {
        expect(directive.classes()).toContain('px-3');
      });

      it('should apply small vertical padding class (py-2 = 8px)', () => {
        expect(directive.classes()).toContain('py-2');
      });
    });

    describe('Medium Size (md)', () => {
      beforeEach(() => {
        hostComponent.lmSize = 'md';
        fixture.detectChanges();
      });

      it('should apply medium font size class (text-sm = 14px)', () => {
        expect(directive.classes()).toContain('text-sm');
      });

      it('should apply medium horizontal padding class (px-4 = 16px)', () => {
        expect(directive.classes()).toContain('px-4');
      });

      it('should apply medium vertical padding class (py-2.5 = 10px)', () => {
        expect(directive.classes()).toContain('py-2.5');
      });
    });

    describe('Large Size (lg)', () => {
      beforeEach(() => {
        hostComponent.lmSize = 'lg';
        fixture.detectChanges();
      });

      it('should apply large font size class (text-base = 16px)', () => {
        expect(directive.classes()).toContain('text-base');
      });

      it('should apply large horizontal padding class (px-5 = 20px)', () => {
        expect(directive.classes()).toContain('px-5');
      });

      it('should apply large vertical padding class (py-3 = 12px)', () => {
        expect(directive.classes()).toContain('py-3');
      });
    });
  });

  // ============================================================
  // RADIUS VARIANT TESTS
  // ============================================================

  describe('Radius Variants', () => {
    describe('Default Radius', () => {
      beforeEach(() => {
        hostComponent.lmRadius = 'default';
        fixture.detectChanges();
      });

      it('should apply default radius class with CSS variable', () => {
        const classes = directive.classes();
        expect(classes).toContain('rounded-[var(--radius-4)]');
      });

      it('should use radius-4 token (8px)', () => {
        // Set up radius-4 token
        document.documentElement.style.setProperty('--radius-4', '0.5rem');

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--radius-4')
          .trim();

        expect(value).toBe('0.5rem');

        // Cleanup
        document.documentElement.style.removeProperty('--radius-4');
      });
    });

    describe('Square Radius', () => {
      beforeEach(() => {
        hostComponent.lmRadius = 'square';
        fixture.detectChanges();
      });

      it('should apply no radius (rounded-none)', () => {
        expect(directive.classes()).toContain('rounded-none');
      });
    });

    describe('Full Radius', () => {
      beforeEach(() => {
        hostComponent.lmRadius = 'full';
        fixture.detectChanges();
      });

      it('should apply full radius (rounded-full)', () => {
        expect(directive.classes()).toContain('rounded-full');
      });
    });

    describe('Default Value', () => {
      it('should default to "default" radius when not specified', () => {
        // Don't set lmRadius, should use default
        const fixture = TestBed.createComponent(ButtonTestHostComponent);
        fixture.detectChanges();

        const buttonElement = fixture.debugElement.query(
          By.directive(LmButtonDirective),
        );
        const directive = buttonElement.injector.get(LmButtonDirective);

        expect(directive.lmRadius()).toBe('default');
        expect(directive.classes()).toContain('rounded-[var(--radius-4)]');
      });
    });
  });

  // ============================================================
  // DISABLED STATE TESTS
  // ============================================================

  describe('Disabled State', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        hostComponent.lmDisabled = true;
        fixture.detectChanges();
      });

      it('should set disabled attribute', () => {
        expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(true);
      });

      it('should reflect disabled input signal', () => {
        expect(directive.lmDisabled()).toBe(true);
      });

      it('should have disabled opacity class from base', () => {
        expect(directive.classes()).toContain('disabled:opacity-50');
      });

      it('should have disabled pointer-events class from base', () => {
        expect(directive.classes()).toContain('disabled:pointer-events-none');
      });
    });

    describe('when enabled', () => {
      beforeEach(() => {
        hostComponent.lmDisabled = false;
        fixture.detectChanges();
      });

      it('should not have disabled attribute', () => {
        expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(
          false,
        );
      });

      it('should reflect enabled state in signal', () => {
        expect(directive.lmDisabled()).toBe(false);
      });
    });
  });

  // ============================================================
  // HTML ELEMENT TESTS
  // ============================================================

  describe('HTML Element', () => {
    it('should have button element by default', () => {
      fixture.detectChanges();
      expect(buttonElement.nativeElement.tagName.toLowerCase()).toBe('button');
    });

    it('should set type attribute correctly', () => {
      hostComponent.lmType = 'button';
      fixture.detectChanges();
      expect(buttonElement.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should allow submit type', () => {
      const submitFixture = TestBed.createComponent(
        SubmitButtonTestHostComponent,
      );
      submitFixture.detectChanges();
      const submitButton = submitFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      expect(submitButton.nativeElement.getAttribute('type')).toBe('submit');
    });

    it('should allow reset type', () => {
      const resetFixture = TestBed.createComponent(
        ResetButtonTestHostComponent,
      );
      resetFixture.detectChanges();
      const resetButton = resetFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      expect(resetButton.nativeElement.getAttribute('type')).toBe('reset');
    });

    it('should propagate disabled state to DOM', () => {
      hostComponent.lmDisabled = true;
      fixture.detectChanges();
      expect(buttonElement.nativeElement.disabled).toBe(true);
    });
  });

  // ============================================================
  // INPUT REACTIVITY TESTS
  // ============================================================

  describe('Input Reactivity', () => {
    it('should apply primary variant classes', () => {
      hostComponent.lmVariant = 'primary';
      fixture.detectChanges();
      expect(directive.classes()).toContain('bg-primary');
    });

    it('should apply outline variant classes', () => {
      hostComponent.lmVariant = 'outline';
      fixture.detectChanges();
      expect(directive.classes()).toContain('border');
      expect(directive.classes()).toContain('border-input');
    });

    it('should apply sm size classes', () => {
      hostComponent.lmSize = 'sm';
      fixture.detectChanges();
      expect(directive.classes()).toContain('px-3');
      expect(directive.classes()).toContain('text-xs');
    });

    it('should apply lg size classes', () => {
      hostComponent.lmSize = 'lg';
      fixture.detectChanges();
      expect(directive.classes()).toContain('px-5');
      expect(directive.classes()).toContain('text-base');
    });
  });

  // ============================================================
  // DARK THEME TESTS
  // ============================================================

  describe('Dark Theme', () => {
    beforeEach(() => {
      applyDarkTheme();
    });

    it('should have access to dark theme primary color', () => {
      hostComponent.lmVariant = 'primary';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      expect(value).toBe(DARK_SEMANTIC_TOKENS.colors.primary);
    });

    it('should have access to dark theme primary foreground', () => {
      hostComponent.lmVariant = 'primary';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary-foreground')
        .trim();
      expect(value).toBe(DARK_SEMANTIC_TOKENS.colors.primaryForeground);
    });

    it('should have access to dark theme destructive color', () => {
      hostComponent.lmVariant = 'destructive';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-destructive')
        .trim();
      expect(value).toBe(DARK_SEMANTIC_TOKENS.colors.destructive);
    });

    it('should have access to dark theme ring color', () => {
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-ring')
        .trim();
      expect(value).toBe(DARK_SEMANTIC_TOKENS.colors.ring);
    });

    it('should have dark class on document element', () => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  // ============================================================
  // ANCHOR ELEMENT TESTS
  // ============================================================

  describe('Anchor Element', () => {
    it('should create directive on anchor element', () => {
      const anchorFixture = TestBed.createComponent(
        AnchorButtonTestHostComponent,
      );
      anchorFixture.detectChanges();
      const anchorButton = anchorFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      expect(anchorButton.nativeElement.tagName.toLowerCase()).toBe('a');
    });

    it('should apply same base classes as button element', () => {
      const anchorFixture = TestBed.createComponent(
        AnchorButtonTestHostComponent,
      );
      anchorFixture.detectChanges();
      const anchorButton = anchorFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      const anchorDirective = anchorButton.injector.get(LmButtonDirective);

      expect(anchorDirective.classes()).toContain('inline-flex');
      expect(anchorDirective.classes()).toContain('items-center');
      expect(anchorDirective.classes()).toContain('justify-center');
    });

    it('should apply variant classes on anchor element', () => {
      const anchorFixture = TestBed.createComponent(
        AnchorButtonTestHostComponent,
      );
      const anchorHost = anchorFixture.componentInstance;
      anchorHost.lmVariant = 'primary';
      anchorFixture.detectChanges();

      const anchorButton = anchorFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      const anchorDirective = anchorButton.injector.get(LmButtonDirective);

      expect(anchorDirective.classes()).toContain('bg-primary');
      expect(anchorDirective.classes()).toContain('text-primary-foreground');
    });

    it('should preserve href attribute', () => {
      const anchorFixture = TestBed.createComponent(
        AnchorButtonTestHostComponent,
      );
      anchorFixture.detectChanges();
      const anchorButton = anchorFixture.debugElement.query(
        By.directive(LmButtonDirective),
      );
      expect(anchorButton.nativeElement.getAttribute('href')).toBe('/test');
    });

    it('should have access to tokens on anchor element', () => {
      const anchorFixture = TestBed.createComponent(
        AnchorButtonTestHostComponent,
      );
      anchorFixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.primary);
    });
  });
});
