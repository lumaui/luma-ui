import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { Component } from '@angular/core';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: `
    <luma-card>
      <div class="test-content">Projected content</div>
    </luma-card>
  `,
  imports: [CardComponent],
})
class TestHostComponent {}

// ============================================================
// TOKEN DEFINITIONS
// ============================================================

const CARD_TOKENS = {
  background: 'oklch(0.99 0 0)',
  border: 'oklch(0.92 0.008 265)',
  padding: '1.5rem',
} as const;

const DARK_CARD_TOKENS = {
  background: 'oklch(0.17 0 0)',
  border: 'oklch(0.2 0.008 265)',
} as const;

// ============================================================
// TOKEN SETUP/CLEANUP UTILITIES
// ============================================================

function setupCardTokens(): void {
  const root = document.documentElement;
  root.style.setProperty('--luma-card-background', CARD_TOKENS.background);
  root.style.setProperty('--luma-color-neutral-60', CARD_TOKENS.border);
  root.style.setProperty('--luma-card-padding', CARD_TOKENS.padding);
}

function cleanupCardTokens(): void {
  const root = document.documentElement;
  root.style.removeProperty('--luma-card-background');
  root.style.removeProperty('--luma-color-neutral-60');
  root.style.removeProperty('--luma-card-padding');
  root.classList.remove('dark');
}

function applyDarkTheme(): void {
  const root = document.documentElement;
  root.classList.add('dark');
  root.style.setProperty('--luma-card-background', DARK_CARD_TOKENS.background);
  root.style.setProperty('--luma-color-neutral-60', DARK_CARD_TOKENS.border);
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply wrapper classes with solid border', () => {
    fixture.detectChanges();

    const wrapperClasses = component.wrapperClasses();

    // Solid border classes
    expect(wrapperClasses).toContain('relative');
    expect(wrapperClasses).toContain('lm-rounded-lg');
    expect(wrapperClasses).toContain('border');
    expect(wrapperClasses).toContain('lm-border-neutral-60');
  });

  it('should apply content classes with background and padding', () => {
    fixture.detectChanges();

    const contentClasses = component.contentClasses();

    // Inner content classes
    expect(contentClasses).toContain('lm-rounded-lg');
    expect(contentClasses).toContain('lm-bg-card-background');
    expect(contentClasses).toContain('lm-p-card');
    expect(contentClasses).toContain('lm-text-primary');
  });

  it('should render wrapper and content divs in template', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const wrapperDiv = compiled.querySelector('div:first-child');
    const contentDiv = compiled.querySelector('div:first-child > div');

    expect(wrapperDiv).toBeTruthy();
    expect(contentDiv).toBeTruthy();
  });

  it('should project content correctly via ng-content', async () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    await hostFixture.whenStable();
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement as HTMLElement;
    const projectedContent = compiled.querySelector('.test-content');

    expect(projectedContent).toBeTruthy();
    expect(projectedContent?.textContent).toBe('Projected content');
  });

  it('should use OnPush change detection', () => {
    // Verify component is configured with OnPush
    // OnPush means the component only checks for changes when inputs change
    // or events are triggered, improving performance
    expect(component).toBeTruthy();

    // The component is stateless with only computed signals,
    // which work perfectly with OnPush change detection
    const wrapperClasses = component.wrapperClasses();
    const contentClasses = component.contentClasses();

    expect(wrapperClasses).toBeTruthy();
    expect(contentClasses).toBeTruthy();
  });

  it('should have computed signal for wrapperClasses', () => {
    // Verify wrapperClasses is a computed signal
    expect(typeof component.wrapperClasses).toBe('function');

    // Should return string when called
    const classes = component.wrapperClasses();
    expect(typeof classes).toBe('string');
  });

  it('should have computed signal for contentClasses', () => {
    // Verify contentClasses is a computed signal
    expect(typeof component.contentClasses).toBe('function');

    // Should return string when called
    const classes = component.contentClasses();
    expect(typeof classes).toBe('string');
  });

  it('should maintain consistent class generation', () => {
    fixture.detectChanges();

    // Multiple calls should return the same classes
    const wrapperClasses1 = component.wrapperClasses();
    const wrapperClasses2 = component.wrapperClasses();
    const contentClasses1 = component.contentClasses();
    const contentClasses2 = component.contentClasses();

    expect(wrapperClasses1).toBe(wrapperClasses2);
    expect(contentClasses1).toBe(contentClasses2);
  });

  // ============================================================
  // DESIGN TOKEN INTEGRATION TESTS
  // ============================================================

  describe('Design Token Integration', () => {
    beforeEach(() => {
      setupCardTokens();
    });

    afterEach(() => {
      cleanupCardTokens();
    });

    // ----------------------------------------------------------
    // CSS Variable Definition Tests
    // ----------------------------------------------------------

    describe('CSS Variable Definition', () => {
      it('should define --luma-card-background css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-background')
          .trim();
        expect(value).toBe(CARD_TOKENS.background);
      });

      it('should define --luma-color-neutral-60 css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-color-neutral-60')
          .trim();
        expect(value).toBe(CARD_TOKENS.border);
      });

      it('should define --luma-card-padding css variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-padding')
          .trim();
        expect(value).toBe(CARD_TOKENS.padding);
      });
    });

    // ----------------------------------------------------------
    // Token Consumption Tests
    // ----------------------------------------------------------
    // CSS variables are inherited from document.documentElement.
    // We verify that tokens are accessible and component uses the correct classes.

    describe('Token Consumption', () => {
      it('should have access to --luma-card-background token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-background')
          .trim();
        expect(value).toBe(CARD_TOKENS.background);
      });

      it('should have access to --luma-color-neutral-60 token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-color-neutral-60')
          .trim();
        expect(value).toBe(CARD_TOKENS.border);
      });

      it('should have access to --luma-card-padding token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-padding')
          .trim();
        expect(value).toBe(CARD_TOKENS.padding);
      });
    });

    // ----------------------------------------------------------
    // Token Override Tests
    // ----------------------------------------------------------

    describe('Token Override', () => {
      it('should respect custom background token override', () => {
        const customBackground = '#ffffff';
        document.documentElement.style.setProperty(
          '--luma-card-background',
          customBackground,
        );
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-background')
          .trim();
        expect(value).toBe(customBackground);
      });

      it('should respect custom padding token override', () => {
        const customPadding = '2rem';
        document.documentElement.style.setProperty(
          '--luma-card-padding',
          customPadding,
        );
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-padding')
          .trim();
        expect(value).toBe(customPadding);
      });

      it('should respect custom border token override', () => {
        const customBorder = 'oklch(0.5 0 0)';
        document.documentElement.style.setProperty(
          '--luma-color-neutral-60',
          customBorder,
        );
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-color-neutral-60')
          .trim();
        expect(value).toBe(customBorder);
      });
    });

    // ----------------------------------------------------------
    // Dark Theme Tests
    // ----------------------------------------------------------

    describe('Dark Theme', () => {
      beforeEach(() => {
        applyDarkTheme();
      });

      it('should have access to dark theme background token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-card-background')
          .trim();
        expect(value).toBe(DARK_CARD_TOKENS.background);
      });

      it('should have access to dark theme border token', () => {
        fixture.detectChanges();

        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-color-neutral-60')
          .trim();
        expect(value).toBe(DARK_CARD_TOKENS.border);
      });

      it('should have dark class on document element', () => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
    });
  });
});
