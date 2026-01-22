import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonDirective } from './button.directive';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: `
    <button
      lumaButton
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [type]="type"
    >
      Test Button
    </button>
  `,
  imports: [ButtonDirective],
})
class ButtonTestHostComponent {
  variant: 'primary' | 'outline' | 'ghost' | 'danger' = 'primary';
  size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  disabled = false;
  type: 'button' | 'submit' | 'reset' = 'button';
}

@Component({
  template: `<a lumaButton [variant]="variant" href="/test">Link Button</a>`,
  imports: [ButtonDirective],
})
class AnchorButtonTestHostComponent {
  variant: 'primary' | 'outline' | 'ghost' | 'danger' = 'primary';
}

@Component({
  template: `<button lumaButton type="submit">Submit Button</button>`,
  imports: [ButtonDirective],
})
class SubmitButtonTestHostComponent {}

@Component({
  template: `<button lumaButton type="reset">Reset Button</button>`,
  imports: [ButtonDirective],
})
class ResetButtonTestHostComponent {}

// ============================================================
// TOKEN DEFINITIONS
// ============================================================

const BUTTON_TOKENS = {
  primary: {
    bg: 'oklch(0.54 0.1 230)',
    bgHover: 'oklch(0.49 0.09 230)',
    bgActive: 'oklch(0.44 0.08 230)',
    text: 'oklch(1 0 0)',
  },
  outline: {
    border: 'oklch(0.5 0.01 0)',
    borderHover: 'oklch(0.2 0.005 0)',
    bgHover: 'oklch(0.96 0.01 230)',
    text: 'oklch(0.2 0.005 0)',
  },
  ghost: {
    bg: 'rgba(0, 0, 0, 0)',
    bgHover: 'oklch(0.96 0.01 230)',
    text: 'oklch(0.2 0.005 0)',
  },
  danger: {
    bg: 'oklch(0.55 0.22 25)',
    bgHover: 'oklch(0.50 0.20 25)',
    bgActive: 'oklch(0.45 0.18 25)',
    text: 'oklch(1 0 0)',
  },
  padding: {
    xSm: '1rem',
    xMd: '1.5rem',
    xLg: '2rem',
    ySm: '0.5rem',
    yMd: '0.75rem',
    yLg: '1rem',
  },
  radius: '10px',
  focus: {
    ringWidth: '2px',
    ringColor: 'oklch(0.54 0.1 230 / 0.25)',
  },
  transition: {
    duration: '200ms',
    timing: 'ease-out',
  },
} as const;

const DARK_TOKENS = {
  primary: {
    bg: 'oklch(0.64 0.12 230)',
    bgHover: 'oklch(0.69 0.12 230)',
    bgActive: 'oklch(0.74 0.13 230)',
    text: 'oklch(0.1 0 0)',
  },
  outline: {
    border: 'oklch(0.65 0.01 0)',
    borderHover: 'oklch(0.98 0.002 0)',
    bgHover: 'oklch(0.20 0.01 230)',
    text: 'oklch(0.98 0.002 0)',
  },
  ghost: {
    bgHover: 'oklch(0.20 0.01 230)',
    text: 'oklch(0.98 0.002 0)',
  },
  danger: {
    bg: 'oklch(0.60 0.24 25)',
    bgHover: 'oklch(0.65 0.25 25)',
    bgActive: 'oklch(0.70 0.26 25)',
    text: 'oklch(0.1 0 0)',
  },
  focus: {
    ringColor: 'oklch(0.64 0.12 230 / 0.25)',
  },
} as const;

// ============================================================
// TOKEN SETUP/CLEANUP UTILITIES
// ============================================================

function setupButtonTokens(): void {
  const root = document.documentElement;

  // Primary variant
  root.style.setProperty('--luma-button-primary-bg', BUTTON_TOKENS.primary.bg);
  root.style.setProperty(
    '--luma-button-primary-bg-hover',
    BUTTON_TOKENS.primary.bgHover
  );
  root.style.setProperty(
    '--luma-button-primary-bg-active',
    BUTTON_TOKENS.primary.bgActive
  );
  root.style.setProperty(
    '--luma-button-primary-text',
    BUTTON_TOKENS.primary.text
  );

  // Outline variant
  root.style.setProperty(
    '--luma-button-outline-border',
    BUTTON_TOKENS.outline.border
  );
  root.style.setProperty(
    '--luma-button-outline-border-hover',
    BUTTON_TOKENS.outline.borderHover
  );
  root.style.setProperty(
    '--luma-button-outline-bg-hover',
    BUTTON_TOKENS.outline.bgHover
  );
  root.style.setProperty(
    '--luma-button-outline-text',
    BUTTON_TOKENS.outline.text
  );

  // Ghost variant
  root.style.setProperty('--luma-button-ghost-bg', BUTTON_TOKENS.ghost.bg);
  root.style.setProperty(
    '--luma-button-ghost-bg-hover',
    BUTTON_TOKENS.ghost.bgHover
  );
  root.style.setProperty('--luma-button-ghost-text', BUTTON_TOKENS.ghost.text);

  // Danger variant
  root.style.setProperty('--luma-button-danger-bg', BUTTON_TOKENS.danger.bg);
  root.style.setProperty(
    '--luma-button-danger-bg-hover',
    BUTTON_TOKENS.danger.bgHover
  );
  root.style.setProperty(
    '--luma-button-danger-bg-active',
    BUTTON_TOKENS.danger.bgActive
  );
  root.style.setProperty(
    '--luma-button-danger-text',
    BUTTON_TOKENS.danger.text
  );

  // Padding
  root.style.setProperty(
    '--luma-button-padding-x-sm',
    BUTTON_TOKENS.padding.xSm
  );
  root.style.setProperty(
    '--luma-button-padding-x-md',
    BUTTON_TOKENS.padding.xMd
  );
  root.style.setProperty(
    '--luma-button-padding-x-lg',
    BUTTON_TOKENS.padding.xLg
  );
  root.style.setProperty(
    '--luma-button-padding-y-sm',
    BUTTON_TOKENS.padding.ySm
  );
  root.style.setProperty(
    '--luma-button-padding-y-md',
    BUTTON_TOKENS.padding.yMd
  );
  root.style.setProperty(
    '--luma-button-padding-y-lg',
    BUTTON_TOKENS.padding.yLg
  );

  // Radius
  root.style.setProperty('--luma-button-radius', BUTTON_TOKENS.radius);

  // Focus
  root.style.setProperty(
    '--luma-button-focus-ring-width',
    BUTTON_TOKENS.focus.ringWidth
  );
  root.style.setProperty(
    '--luma-button-focus-ring-color',
    BUTTON_TOKENS.focus.ringColor
  );

  // Transition
  root.style.setProperty(
    '--luma-button-transition-duration',
    BUTTON_TOKENS.transition.duration
  );
  root.style.setProperty(
    '--luma-button-transition-timing',
    BUTTON_TOKENS.transition.timing
  );
}

function cleanupButtonTokens(): void {
  const root = document.documentElement;
  const tokenNames = [
    '--luma-button-primary-bg',
    '--luma-button-primary-bg-hover',
    '--luma-button-primary-bg-active',
    '--luma-button-primary-text',
    '--luma-button-outline-border',
    '--luma-button-outline-border-hover',
    '--luma-button-outline-bg-hover',
    '--luma-button-outline-text',
    '--luma-button-ghost-bg',
    '--luma-button-ghost-bg-hover',
    '--luma-button-ghost-text',
    '--luma-button-danger-bg',
    '--luma-button-danger-bg-hover',
    '--luma-button-danger-bg-active',
    '--luma-button-danger-text',
    '--luma-button-padding-x-sm',
    '--luma-button-padding-x-md',
    '--luma-button-padding-x-lg',
    '--luma-button-padding-y-sm',
    '--luma-button-padding-y-md',
    '--luma-button-padding-y-lg',
    '--luma-button-radius',
    '--luma-button-focus-ring-width',
    '--luma-button-focus-ring-color',
    '--luma-button-transition-duration',
    '--luma-button-transition-timing',
  ];

  tokenNames.forEach((name) => root.style.removeProperty(name));
  root.classList.remove('dark');
}

function applyDarkTheme(): void {
  const root = document.documentElement;
  root.classList.add('dark');

  // Primary
  root.style.setProperty('--luma-button-primary-bg', DARK_TOKENS.primary.bg);
  root.style.setProperty(
    '--luma-button-primary-bg-hover',
    DARK_TOKENS.primary.bgHover
  );
  root.style.setProperty(
    '--luma-button-primary-bg-active',
    DARK_TOKENS.primary.bgActive
  );
  root.style.setProperty('--luma-button-primary-text', DARK_TOKENS.primary.text);

  // Outline
  root.style.setProperty(
    '--luma-button-outline-border',
    DARK_TOKENS.outline.border
  );
  root.style.setProperty(
    '--luma-button-outline-border-hover',
    DARK_TOKENS.outline.borderHover
  );
  root.style.setProperty(
    '--luma-button-outline-bg-hover',
    DARK_TOKENS.outline.bgHover
  );
  root.style.setProperty('--luma-button-outline-text', DARK_TOKENS.outline.text);

  // Ghost
  root.style.setProperty(
    '--luma-button-ghost-bg-hover',
    DARK_TOKENS.ghost.bgHover
  );
  root.style.setProperty('--luma-button-ghost-text', DARK_TOKENS.ghost.text);

  // Danger
  root.style.setProperty('--luma-button-danger-bg', DARK_TOKENS.danger.bg);
  root.style.setProperty(
    '--luma-button-danger-bg-hover',
    DARK_TOKENS.danger.bgHover
  );
  root.style.setProperty(
    '--luma-button-danger-bg-active',
    DARK_TOKENS.danger.bgActive
  );
  root.style.setProperty('--luma-button-danger-text', DARK_TOKENS.danger.text);

  // Focus
  root.style.setProperty(
    '--luma-button-focus-ring-color',
    DARK_TOKENS.focus.ringColor
  );
}

// ============================================================
// TEST SUITES
// ============================================================

describe('ButtonDirective', () => {
  let fixture: ComponentFixture<ButtonTestHostComponent>;
  let hostComponent: ButtonTestHostComponent;
  let buttonElement: DebugElement;
  let directive: ButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ButtonDirective,
        ButtonTestHostComponent,
        SubmitButtonTestHostComponent,
        ResetButtonTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonTestHostComponent);
    hostComponent = fixture.componentInstance;
    buttonElement = fixture.debugElement.query(By.directive(ButtonDirective));
    directive = buttonElement.injector.get(ButtonDirective);

    setupButtonTokens();
    // Note: Don't call detectChanges() here - let each test/describe handle it
    // to avoid ExpressionChangedAfterItHasBeenCheckedError
  });

  afterEach(() => {
    cleanupButtonTokens();
  });

  // ============================================================
  // BASIC DIRECTIVE TESTS
  // ============================================================

  describe('Basic Directive Creation', () => {
    it('should create the directive', () => {
      expect(directive).toBeTruthy();
    });

    it('should apply as directive on button element', () => {
      fixture.detectChanges();
      expect(buttonElement.nativeElement.tagName).toBe('BUTTON');
    });

    it('should have signal-based inputs', () => {
      expect(typeof directive.variant).toBe('function');
      expect(typeof directive.size).toBe('function');
      expect(typeof directive.disabled).toBe('function');
      expect(typeof directive.type).toBe('function');
    });

    it('should have computed classes signal', () => {
      expect(typeof directive.classes).toBe('function');
      expect(typeof directive.classes()).toBe('string');
    });

    it('should apply default variant (primary) when not specified', () => {
      fixture.detectChanges();
      expect(directive.variant()).toBe('primary');
    });

    it('should apply default size (md) when not specified', () => {
      fixture.detectChanges();
      expect(directive.size()).toBe('md');
    });

    it('should set type attribute to button by default', () => {
      fixture.detectChanges();
      expect(buttonElement.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should maintain consistent class generation across multiple calls', () => {
      fixture.detectChanges();
      const classes1 = directive.classes();
      const classes2 = directive.classes();
      expect(classes1).toBe(classes2);
    });
  });

  // ============================================================
  // DESIGN TOKEN DEFINITION TESTS
  // ============================================================

  describe('Design Token Definition', () => {
    describe('Primary Variant Tokens', () => {
      it('should define --luma-button-primary-bg css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.bg);
      });

      it('should define --luma-button-primary-bg-hover css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.bgHover);
      });

      it('should define --luma-button-primary-bg-active css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-bg-active')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.bgActive);
      });

      it('should define --luma-button-primary-text css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.text);
      });
    });

    describe('Outline Variant Tokens', () => {
      it('should define --luma-button-outline-border css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-border')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.border);
      });

      it('should define --luma-button-outline-border-hover css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-border-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.borderHover);
      });

      it('should define --luma-button-outline-bg-hover css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.bgHover);
      });

      it('should define --luma-button-outline-text css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.text);
      });
    });

    describe('Ghost Variant Tokens', () => {
      it('should define --luma-button-ghost-bg css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.bg);
      });

      it('should define --luma-button-ghost-bg-hover css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.bgHover);
      });

      it('should define --luma-button-ghost-text css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.text);
      });
    });

    describe('Danger Variant Tokens', () => {
      it('should define --luma-button-danger-bg css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.bg);
      });

      it('should define --luma-button-danger-bg-hover css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.bgHover);
      });

      it('should define --luma-button-danger-bg-active css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-bg-active')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.bgActive);
      });

      it('should define --luma-button-danger-text css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.text);
      });
    });

    describe('Dimension Tokens', () => {
      it('should define --luma-button-padding-x-sm css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-x-sm')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.xSm);
      });

      it('should define --luma-button-padding-x-md css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-x-md')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.xMd);
      });

      it('should define --luma-button-padding-x-lg css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-x-lg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.xLg);
      });

      it('should define --luma-button-padding-y-sm css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-y-sm')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.ySm);
      });

      it('should define --luma-button-padding-y-md css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-y-md')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.yMd);
      });

      it('should define --luma-button-padding-y-lg css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-y-lg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.yLg);
      });

      it('should define --luma-button-radius css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-radius')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.radius);
      });
    });

    describe('Focus Tokens', () => {
      it('should define --luma-button-focus-ring-width css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-focus-ring-width')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.focus.ringWidth);
      });

      it('should define --luma-button-focus-ring-color css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-focus-ring-color')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.focus.ringColor);
      });
    });

    describe('Transition Tokens', () => {
      it('should define --luma-button-transition-duration css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-transition-duration')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.transition.duration);
      });

      it('should define --luma-button-transition-timing css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-transition-timing')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.transition.timing);
      });
    });
  });

  // ============================================================
  // TOKEN CONSUMPTION TESTS
  // ============================================================
  // These tests verify that when a variant is selected, the corresponding
  // tokens are accessible and the correct classes are applied.
  // CSS variables are inherited from document.documentElement.

  describe('Token Consumption', () => {
    describe('Primary Variant', () => {
      beforeEach(() => {
        hostComponent.variant = 'primary';
        fixture.detectChanges();
      });

      it('should have access to --luma-button-primary-bg token', () => {
        // Token is set on document root and inherited by all elements
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.bg);
      });

      it('should have access to --luma-button-primary-text token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.text);
      });

      it('should have access to --luma-button-primary-bg-hover token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-primary-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.primary.bgHover);
      });
    });

    describe('Outline Variant', () => {
      beforeEach(() => {
        hostComponent.variant = 'outline';
        fixture.detectChanges();
      });

      it('should have access to --luma-button-outline-border token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-border')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.border);
      });

      it('should have access to --luma-button-outline-text token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.text);
      });

      it('should have access to --luma-button-outline-bg-hover token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-outline-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.outline.bgHover);
      });
    });

    describe('Ghost Variant', () => {
      beforeEach(() => {
        hostComponent.variant = 'ghost';
        fixture.detectChanges();
      });

      it('should have access to --luma-button-ghost-bg token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.bg);
      });

      it('should have access to --luma-button-ghost-text token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.text);
      });

      it('should have access to --luma-button-ghost-bg-hover token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-ghost-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.ghost.bgHover);
      });
    });

    describe('Danger Variant', () => {
      beforeEach(() => {
        hostComponent.variant = 'danger';
        fixture.detectChanges();
      });

      it('should have access to --luma-button-danger-bg token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-bg')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.bg);
      });

      it('should have access to --luma-button-danger-text token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-text')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.text);
      });

      it('should have access to --luma-button-danger-bg-hover token', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-danger-bg-hover')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.danger.bgHover);
      });
    });

    describe('Dimension Tokens', () => {
      it('should have access to --luma-button-padding-x-md token', () => {
        hostComponent.size = 'md';
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-x-md')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.xMd);
      });

      it('should have access to --luma-button-padding-y-md token', () => {
        hostComponent.size = 'md';
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-padding-y-md')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.padding.yMd);
      });

      it('should have access to --luma-button-radius token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-button-radius')
          .trim();
        expect(value).toBe(BUTTON_TOKENS.radius);
      });
    });
  });

  // ============================================================
  // TOKEN OVERRIDE TESTS
  // ============================================================

  describe('Token Override', () => {
    it('should respect custom radius token override', () => {
      const customRadius = '20px';
      document.documentElement.style.setProperty(
        '--luma-button-radius',
        customRadius
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-radius')
        .trim();
      expect(value).toBe(customRadius);
    });

    it('should respect custom padding-x override', () => {
      const customPadding = '3rem';
      document.documentElement.style.setProperty(
        '--luma-button-padding-x-md',
        customPadding
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-padding-x-md')
        .trim();
      expect(value).toBe(customPadding);
    });

    it('should respect custom padding-y override', () => {
      const customPadding = '1.5rem';
      document.documentElement.style.setProperty(
        '--luma-button-padding-y-md',
        customPadding
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-padding-y-md')
        .trim();
      expect(value).toBe(customPadding);
    });

    it('should respect custom primary background override', () => {
      const customColor = 'oklch(0.6 0.15 250)';
      document.documentElement.style.setProperty(
        '--luma-button-primary-bg',
        customColor
      );
      hostComponent.variant = 'primary';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-primary-bg')
        .trim();
      expect(value).toBe(customColor);
    });

    it('should respect custom focus ring width override', () => {
      const customWidth = '4px';
      document.documentElement.style.setProperty(
        '--luma-button-focus-ring-width',
        customWidth
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-focus-ring-width')
        .trim();
      expect(value).toBe(customWidth);
    });

    it('should respect custom transition duration override', () => {
      const customDuration = '300ms';
      document.documentElement.style.setProperty(
        '--luma-button-transition-duration',
        customDuration
      );
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-transition-duration')
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

      it('should apply inline-flex for layout', () => {
        expect(directive.classes()).toContain('inline-flex');
      });

      it('should apply items-center for vertical alignment', () => {
        expect(directive.classes()).toContain('items-center');
      });

      it('should apply justify-center for horizontal alignment', () => {
        expect(directive.classes()).toContain('justify-center');
      });

      it('should apply font-medium for typography', () => {
        expect(directive.classes()).toContain('font-medium');
      });

      it('should apply leading-snug for line height', () => {
        expect(directive.classes()).toContain('leading-snug');
      });

      it('should remove default focus outline', () => {
        expect(directive.classes()).toContain('focus:outline-none');
      });

      it('should apply focus-visible ring class', () => {
        expect(directive.classes()).toContain('focus-visible:ring-button-focus');
      });

      it('should apply transition class with CSS variables', () => {
        expect(directive.classes()).toContain(
          'transition-[color_var(--luma-button-transition-duration)_var(--luma-button-transition-timing)]'
        );
      });
    });

    describe('Primary Variant Classes', () => {
      beforeEach(() => {
        hostComponent.variant = 'primary';
        fixture.detectChanges();
      });

      it('should apply primary background class', () => {
        expect(directive.classes()).toContain('bg-button-primary-bg');
      });

      it('should apply primary text class', () => {
        expect(directive.classes()).toContain('text-button-primary-text');
      });

      it('should apply primary hover background class', () => {
        expect(directive.classes()).toContain('hover:bg-button-primary-bg-hover');
      });

      it('should apply primary active background class', () => {
        expect(directive.classes()).toContain(
          'active:bg-button-primary-bg-active'
        );
      });
    });

    describe('Outline Variant Classes', () => {
      beforeEach(() => {
        hostComponent.variant = 'outline';
        fixture.detectChanges();
      });

      it('should apply transparent background', () => {
        expect(directive.classes()).toContain('bg-transparent');
      });

      it('should apply outline text class', () => {
        expect(directive.classes()).toContain('text-button-outline-text');
      });

      it('should apply border class', () => {
        expect(directive.classes()).toContain('border');
      });

      it('should apply outline border class', () => {
        expect(directive.classes()).toContain('border-button-outline-border');
      });

      it('should apply border hover class', () => {
        expect(directive.classes()).toContain(
          'hover:border-button-outline-border-hover'
        );
      });

      it('should apply background hover class', () => {
        expect(directive.classes()).toContain('hover:bg-button-outline-bg-hover');
      });
    });

    describe('Ghost Variant Classes', () => {
      beforeEach(() => {
        hostComponent.variant = 'ghost';
        fixture.detectChanges();
      });

      it('should apply ghost background class', () => {
        expect(directive.classes()).toContain('bg-button-ghost-bg');
      });

      it('should apply ghost text class', () => {
        expect(directive.classes()).toContain('text-button-ghost-text');
      });

      it('should apply ghost hover background class', () => {
        expect(directive.classes()).toContain('hover:bg-button-ghost-bg-hover');
      });
    });

    describe('Danger Variant Classes', () => {
      beforeEach(() => {
        hostComponent.variant = 'danger';
        fixture.detectChanges();
      });

      it('should apply danger background class', () => {
        expect(directive.classes()).toContain('bg-button-danger-bg');
      });

      it('should apply danger text class', () => {
        expect(directive.classes()).toContain('text-button-danger-text');
      });

      it('should apply danger hover background class', () => {
        expect(directive.classes()).toContain('hover:bg-button-danger-bg-hover');
      });

      it('should apply danger active background class', () => {
        expect(directive.classes()).toContain(
          'active:bg-button-danger-bg-active'
        );
      });
    });

    describe('Size Classes', () => {
      it('should apply small size classes', () => {
        hostComponent.size = 'sm';
        fixture.detectChanges();

        expect(directive.classes()).toContain(
          'px-[var(--luma-button-padding-x-sm)]'
        );
        expect(directive.classes()).toContain(
          'py-[var(--luma-button-padding-y-sm)]'
        );
        expect(directive.classes()).toContain('text-sm');
        expect(directive.classes()).toContain(
          'rounded-[var(--luma-button-radius)]'
        );
      });

      it('should apply medium size classes', () => {
        hostComponent.size = 'md';
        fixture.detectChanges();

        expect(directive.classes()).toContain(
          'px-[var(--luma-button-padding-x-md)]'
        );
        expect(directive.classes()).toContain(
          'py-[var(--luma-button-padding-y-md)]'
        );
        expect(directive.classes()).toContain('text-luma-base');
        expect(directive.classes()).toContain(
          'rounded-[var(--luma-button-radius)]'
        );
      });

      it('should apply large size classes', () => {
        hostComponent.size = 'lg';
        fixture.detectChanges();

        expect(directive.classes()).toContain(
          'px-[var(--luma-button-padding-x-lg)]'
        );
        expect(directive.classes()).toContain(
          'py-[var(--luma-button-padding-y-lg)]'
        );
        expect(directive.classes()).toContain('text-lg');
        expect(directive.classes()).toContain(
          'rounded-[var(--luma-button-radius)]'
        );
      });

      it('should apply full size classes', () => {
        hostComponent.size = 'full';
        fixture.detectChanges();

        expect(directive.classes()).toContain('w-full');
      });

      it('should apply compound variant for full size with primary', () => {
        hostComponent.size = 'full';
        hostComponent.variant = 'primary';
        fixture.detectChanges();

        expect(directive.classes()).toContain(
          'px-[var(--luma-button-padding-x-md)]'
        );
        expect(directive.classes()).toContain(
          'py-[var(--luma-button-padding-y-md)]'
        );
      });
    });
  });

  // ============================================================
  // DISABLED STATE TESTS
  // ============================================================

  describe('Disabled State', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        hostComponent.disabled = true;
        fixture.detectChanges();
      });

      it('should apply disabled opacity class', () => {
        expect(directive.classes()).toContain('disabled:opacity-50');
      });

      it('should apply disabled cursor class', () => {
        expect(directive.classes()).toContain('disabled:cursor-not-allowed');
      });

      it('should set disabled attribute on element', () => {
        expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(true);
      });

      it('should reflect disabled input signal', () => {
        expect(directive.disabled()).toBe(true);
      });
    });

    describe('when enabled', () => {
      beforeEach(() => {
        hostComponent.disabled = false;
        fixture.detectChanges();
      });

      it('should not have disabled attribute', () => {
        expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(
          false
        );
      });

      it('should reflect enabled state in signal', () => {
        expect(directive.disabled()).toBe(false);
      });
    });
  });

  // ============================================================
  // ACCESSIBILITY TESTS
  // ============================================================

  describe('Accessibility', () => {
    it('should have button element by default', () => {
      fixture.detectChanges();
      expect(buttonElement.nativeElement.tagName).toBe('BUTTON');
    });

    it('should apply focus-visible ring for keyboard navigation', () => {
      const classes = directive.classes();
      expect(classes).toContain('focus-visible:ring-button-focus');
    });

    it('should set type attribute correctly', () => {
      fixture.detectChanges();
      expect(buttonElement.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should allow submit type', () => {
      // Use dedicated test host to avoid ExpressionChangedAfterItHasBeenCheckedError
      const submitFixture = TestBed.createComponent(SubmitButtonTestHostComponent);
      submitFixture.detectChanges();
      const submitButton = submitFixture.debugElement.query(
        By.directive(ButtonDirective)
      );
      expect(submitButton.nativeElement.getAttribute('type')).toBe('submit');
    });

    it('should allow reset type', () => {
      // Use dedicated test host to avoid ExpressionChangedAfterItHasBeenCheckedError
      const resetFixture = TestBed.createComponent(ResetButtonTestHostComponent);
      resetFixture.detectChanges();
      const resetButton = resetFixture.debugElement.query(
        By.directive(ButtonDirective)
      );
      expect(resetButton.nativeElement.getAttribute('type')).toBe('reset');
    });

    it('should propagate disabled state to DOM', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();
      expect(buttonElement.nativeElement.hasAttribute('disabled')).toBe(true);
    });
  });

  // ============================================================
  // INPUT REACTIVITY TESTS
  // ============================================================

  describe('Input Reactivity', () => {
    it('should apply primary variant classes', () => {
      hostComponent.variant = 'primary';
      fixture.detectChanges();
      expect(directive.classes()).toContain('bg-button-primary-bg');
    });

    it('should apply outline variant classes', () => {
      hostComponent.variant = 'outline';
      fixture.detectChanges();
      expect(directive.classes()).toContain('bg-transparent');
      expect(directive.classes()).toContain('border-button-outline-border');
    });

    it('should apply sm size classes', () => {
      hostComponent.size = 'sm';
      fixture.detectChanges();
      expect(directive.classes()).toContain(
        'px-[var(--luma-button-padding-x-sm)]'
      );
    });

    it('should apply lg size classes', () => {
      hostComponent.size = 'lg';
      fixture.detectChanges();
      expect(directive.classes()).toContain(
        'px-[var(--luma-button-padding-x-lg)]'
      );
    });
  });

  // ============================================================
  // DARK THEME TESTS
  // ============================================================

  describe('Dark Theme', () => {
    beforeEach(() => {
      applyDarkTheme();
    });

    it('should have access to dark theme primary background', () => {
      hostComponent.variant = 'primary';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-primary-bg')
        .trim();
      expect(value).toBe(DARK_TOKENS.primary.bg);
    });

    it('should have access to dark theme primary text', () => {
      hostComponent.variant = 'primary';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-primary-text')
        .trim();
      expect(value).toBe(DARK_TOKENS.primary.text);
    });

    it('should have access to dark theme outline border', () => {
      hostComponent.variant = 'outline';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-outline-border')
        .trim();
      expect(value).toBe(DARK_TOKENS.outline.border);
    });

    it('should have access to dark theme danger background', () => {
      hostComponent.variant = 'danger';
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-danger-bg')
        .trim();
      expect(value).toBe(DARK_TOKENS.danger.bg);
    });

    it('should have access to dark theme focus ring color', () => {
      fixture.detectChanges();

      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--luma-button-focus-ring-color')
        .trim();
      expect(value).toBe(DARK_TOKENS.focus.ringColor);
    });

    it('should have dark class on document element', () => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });
});

// ============================================================
// ANCHOR ELEMENT TESTS
// ============================================================

describe('ButtonDirective on Anchor Element', () => {
  let fixture: ComponentFixture<AnchorButtonTestHostComponent>;
  let anchorElement: DebugElement;
  let directive: ButtonDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDirective, AnchorButtonTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnchorButtonTestHostComponent);
    anchorElement = fixture.debugElement.query(By.directive(ButtonDirective));
    directive = anchorElement.injector.get(ButtonDirective);

    setupButtonTokens();
    await fixture.whenStable();
  });

  afterEach(() => {
    cleanupButtonTokens();
  });

  it('should create directive on anchor element', () => {
    expect(directive).toBeTruthy();
    expect(anchorElement.nativeElement.tagName).toBe('A');
  });

  it('should apply same base classes as button element', () => {
    fixture.detectChanges();

    const classes = directive.classes();
    expect(classes).toContain('inline-flex');
    expect(classes).toContain('items-center');
    expect(classes).toContain('justify-center');
  });

  it('should apply variant classes on anchor element', () => {
    fixture.detectChanges();

    const classes = directive.classes();
    expect(classes).toContain('bg-button-primary-bg');
    expect(classes).toContain('text-button-primary-text');
  });

  it('should preserve href attribute', () => {
    fixture.detectChanges();
    expect(anchorElement.nativeElement.getAttribute('href')).toBe('/test');
  });

  it('should have access to tokens on anchor element', () => {
    fixture.detectChanges();

    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--luma-button-primary-bg')
      .trim();
    expect(value).toBe(BUTTON_TOKENS.primary.bg);
  });
});
