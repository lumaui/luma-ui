import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LmCardComponent } from './card.component';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  selector: 'card-test-host',
  template: `
    <luma-card [lmVariant]="variant">
      <div class="test-content">Card content</div>
    </luma-card>
  `,
  imports: [LmCardComponent],
})
class CardTestHostComponent {
  variant: 'default' | 'elevated' | 'ghost' = 'default';
}

// ============================================================
// SEMANTIC TOKEN DEFINITIONS
// ============================================================

const SEMANTIC_TOKENS = {
  colors: {
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.22 0.014 290)',
    border: 'oklch(0.97 0.006 290)',
    muted: 'oklch(0.97 0.006 290)',
  },
} as const;

// ============================================================
// SETUP & CLEANUP FUNCTIONS
// ============================================================

function setupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.setProperty('--color-card', SEMANTIC_TOKENS.colors.card);
  root.style.setProperty(
    '--color-card-foreground',
    SEMANTIC_TOKENS.colors.cardForeground,
  );
  root.style.setProperty('--color-border', SEMANTIC_TOKENS.colors.border);
  root.style.setProperty('--color-muted', SEMANTIC_TOKENS.colors.muted);
}

function cleanupSemanticTokens(): void {
  const root = document.documentElement;
  root.style.removeProperty('--color-card');
  root.style.removeProperty('--color-card-foreground');
  root.style.removeProperty('--color-border');
  root.style.removeProperty('--color-muted');
}

// ============================================================
// TEST SUITE
// ============================================================

describe('LmCardComponent', () => {
  let fixture: ComponentFixture<CardTestHostComponent>;
  let hostComponent: CardTestHostComponent;
  let cardComponent: LmCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardComponent, CardTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTestHostComponent);
    hostComponent = fixture.componentInstance;
    setupSemanticTokens();
  });

  afterEach(() => {
    cleanupSemanticTokens();
  });

  // ============================================================
  // BASIC CREATION
  // ============================================================

  describe('Basic Creation', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create the component', () => {
      const cardEl = fixture.debugElement.query(By.directive(LmCardComponent));
      cardComponent = cardEl.injector.get(LmCardComponent);
      expect(cardComponent).toBeTruthy();
    });

    it('should have classes computed signal', () => {
      const cardEl = fixture.debugElement.query(By.directive(LmCardComponent));
      cardComponent = cardEl.injector.get(LmCardComponent);
      expect(typeof cardComponent.classes).toBe('function');
    });

    it('should render inner div with classes', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv).toBeTruthy();
      expect(innerDiv.className).toBeTruthy();
    });
  });

  // ============================================================
  // BASE CLASSES
  // ============================================================

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base card classes', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const cardEl = card.injector.get(LmCardComponent);
      const classes = cardEl.classes();
      expect(classes).toContain('rounded-[var(--radius-5)]');
      expect(classes).toContain('border');
      expect(classes).toContain('text-card-foreground');
    });

    it('should apply classes to inner div', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv.className).toContain('rounded-[var(--radius-5)]');
      expect(innerDiv.className).toContain('border');
    });

    it('should apply padding to card wrapper', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv.className).toContain('p-6');
    });
  });

  // ============================================================
  // DEFAULT VARIANT
  // ============================================================

  describe('Default Variant', () => {
    beforeEach(() => {
      hostComponent.variant = 'default';
      fixture.detectChanges();
    });

    it('should apply default variant classes', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const cardEl = card.injector.get(LmCardComponent);
      const classes = cardEl.classes();
      expect(classes).toContain('bg-card');
      expect(classes).toContain('border-border');
    });

    it('should apply default classes to DOM', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv.className).toContain('bg-card');
      expect(innerDiv.className).toContain('border-border');
    });
  });

  // ============================================================
  // ELEVATED VARIANT
  // ============================================================

  describe('Elevated Variant', () => {
    beforeEach(() => {
      hostComponent.variant = 'elevated';
      fixture.detectChanges();
    });

    it('should apply elevated variant classes', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const cardEl = card.injector.get(LmCardComponent);
      const classes = cardEl.classes();
      expect(classes).toContain('bg-card');
      expect(classes).toContain('shadow-[var(--shadow-3)]');
    });

    it('should apply shadow to DOM', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv.className).toContain('shadow-[var(--shadow-3)]');
    });
  });

  // ============================================================
  // GHOST VARIANT
  // ============================================================

  describe('Ghost Variant', () => {
    beforeEach(() => {
      hostComponent.variant = 'ghost';
      fixture.detectChanges();
    });

    it('should apply ghost variant classes', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const cardEl = card.injector.get(LmCardComponent);
      const classes = cardEl.classes();
      expect(classes).toContain('border-transparent');
      expect(classes).toContain('shadow-none');
    });

    it('should apply transparent border to DOM', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const innerDiv = card.nativeElement.querySelector('div');
      expect(innerDiv.className).toContain('border-transparent');
      expect(innerDiv.className).toContain('shadow-none');
    });
  });

  // ============================================================
  // SEMANTIC TOKENS
  // ============================================================

  describe('Semantic Tokens', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have access to --color-card token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-card')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.card);
    });

    it('should have access to --color-border token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-border')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.border);
    });

    it('should have access to --color-muted token', () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-muted')
        .trim();
      expect(value).toBe(SEMANTIC_TOKENS.colors.muted);
    });
  });

  // ============================================================
  // SIGNAL-BASED INPUTS
  // ============================================================

  describe('Signal-Based Inputs', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should use signal for variant input', () => {
      const card = fixture.debugElement.query(By.directive(LmCardComponent));
      const cardEl = card.injector.get(LmCardComponent);
      expect(typeof cardEl.lmVariant).toBe('function');
      const variant = cardEl.lmVariant();
      expect(variant).toBe('default');
    });
  });
});
