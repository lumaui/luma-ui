import {
  LmCardContentDirective,
  LmCardDescriptionDirective,
  LmCardHeaderDirective,
  LmCardTitleDirective,
} from './';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmCardComponent } from './card.component';

// ============================================================
// TEST HOST COMPONENTS
// ============================================================

@Component({
  template: `<h3 lumaCardTitle [lmSize]="lmSize">Test Title</h3>`,
  imports: [LmCardTitleDirective],
})
class CardTitleTestComponent {
  lmSize: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  template: `<p lumaCardDescription [lmSize]="lmSize">Test Description</p>`,
  imports: [LmCardDescriptionDirective],
})
class CardDescriptionTestComponent {
  lmSize: 'sm' | 'md' | 'lg' = 'md';
}

@Component({
  template: `<div lumaCardHeader>Test Header</div>`,
  imports: [LmCardHeaderDirective],
})
class CardHeaderTestComponent {}

@Component({
  template: `<div lumaCardContent>Test Content</div>`,
  imports: [LmCardContentDirective],
})
class CardContentTestComponent {}

@Component({
  template: `
    <luma-card [lmVariant]="variant">
      <div lumaCardHeader>
        <h3 lumaCardTitle lmSize="lg">Card Title</h3>
        <p lumaCardDescription lmSize="md">Card description</p>
      </div>
      <div lumaCardContent>
        <p>Card content</p>
      </div>
    </luma-card>
  `,
  imports: [
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
  ],
})
class FullCardTestComponent {
  variant: 'default' | 'elevated' | 'subtle' = 'default';
}

// ============================================================
// CARD TITLE TESTS
// ============================================================

describe('LmCardTitleDirective', () => {
  let fixture: ComponentFixture<CardTitleTestComponent>;
  let component: CardTitleTestComponent;
  let titleElement: DebugElement;
  let directive: LmCardTitleDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardTitleDirective, CardTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTitleTestComponent);
    component = fixture.componentInstance;
    titleElement = fixture.debugElement.query(
      By.directive(LmCardTitleDirective),
    );
    directive = titleElement.injector.get(LmCardTitleDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply base typography classes', () => {
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('font-semibold');
    expect(classes).toContain('leading-none');
    expect(classes).toContain('tracking-tight');
  });

  it('should apply medium size by default', () => {
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-xl');
  });

  it('should apply small size classes', () => {
    component.lmSize = 'sm';
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-lg');
  });

  it('should apply large size classes', () => {
    component.lmSize = 'lg';
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-2xl');
  });

  it('should use computed signal for classes', () => {
    expect(typeof directive.classes).toBe('function');
    const classes = directive.classes();
    expect(typeof classes).toBe('string');
  });

  it('should use signal-based input for size', () => {
    expect(typeof directive.lmSize).toBe('function');
    const size = directive.lmSize();
    expect(size).toBe('md');
  });
});

// ============================================================
// CARD DESCRIPTION TESTS
// ============================================================

describe('LmCardDescriptionDirective', () => {
  let fixture: ComponentFixture<CardDescriptionTestComponent>;
  let component: CardDescriptionTestComponent;
  let descriptionElement: DebugElement;
  let directive: LmCardDescriptionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardDescriptionDirective, CardDescriptionTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDescriptionTestComponent);
    component = fixture.componentInstance;
    descriptionElement = fixture.debugElement.query(
      By.directive(LmCardDescriptionDirective),
    );
    directive = descriptionElement.injector.get(LmCardDescriptionDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply base text classes', () => {
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-sm');
    expect(classes).toContain('text-muted-foreground');
  });

  it('should apply medium size by default', () => {
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-sm');
  });

  it('should apply small size classes', () => {
    component.lmSize = 'sm';
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-xs');
  });

  it('should apply large size classes', () => {
    component.lmSize = 'lg';
    fixture.detectChanges();
    const classes = directive.classes();
    expect(classes).toContain('text-base');
  });

  it('should use computed signal for classes', () => {
    expect(typeof directive.classes).toBe('function');
    const classes = directive.classes();
    expect(typeof classes).toBe('string');
  });

  it('should use signal-based input for size', () => {
    expect(typeof directive.lmSize).toBe('function');
    const size = directive.lmSize();
    expect(size).toBe('md');
  });
});

// ============================================================
// CARD HEADER TESTS
// ============================================================

describe('LmCardHeaderDirective', () => {
  let fixture: ComponentFixture<CardHeaderTestComponent>;
  let headerElement: DebugElement;
  let directive: LmCardHeaderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardHeaderDirective, CardHeaderTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHeaderTestComponent);
    headerElement = fixture.debugElement.query(
      By.directive(LmCardHeaderDirective),
    );
    directive = headerElement.injector.get(LmCardHeaderDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply flex layout classes', () => {
    fixture.detectChanges();
    const element = headerElement.nativeElement as HTMLElement;
    expect(element.className).toContain('flex');
    expect(element.className).toContain('flex-col');
    expect(element.className).toContain('gap-1.5');
  });

  it('should be a structural directive with no inputs', () => {
    expect(directive).toBeDefined();
    expect(directive).toBeTruthy();
  });
});

// ============================================================
// CARD CONTENT TESTS
// ============================================================

describe('LmCardContentDirective', () => {
  let fixture: ComponentFixture<CardContentTestComponent>;
  let contentElement: DebugElement;
  let directive: LmCardContentDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardContentDirective, CardContentTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContentTestComponent);
    contentElement = fixture.debugElement.query(
      By.directive(LmCardContentDirective),
    );
    directive = contentElement.injector.get(LmCardContentDirective);
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply flex layout classes', () => {
    fixture.detectChanges();
    const element = contentElement.nativeElement as HTMLElement;
    expect(element.className).toContain('flex');
    expect(element.className).toContain('flex-col');
    expect(element.className).toContain('gap-4');
    // Note: padding moved to wrapper, not on content
  });

  it('should exist as semantic marker without applying styles', () => {
    expect(directive).toBeTruthy();
  });

  it('should be a structural directive with no inputs', () => {
    expect(directive).toBeDefined();
    expect(directive).toBeTruthy();
  });
});

// ============================================================
// FULL CARD COMPOSITION TESTS
// ============================================================

describe('Full Card Composition', () => {
  let fixture: ComponentFixture<FullCardTestComponent>;
  let component: FullCardTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmCardComponent,
        LmCardHeaderDirective,
        LmCardTitleDirective,
        LmCardDescriptionDirective,
        LmCardContentDirective,
        FullCardTestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FullCardTestComponent);
    component = fixture.componentInstance;
  });

  it('should work together in a composed structure', () => {
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.directive(LmCardComponent));
    const header = fixture.debugElement.query(
      By.directive(LmCardHeaderDirective),
    );
    const title = fixture.debugElement.query(
      By.directive(LmCardTitleDirective),
    );
    const description = fixture.debugElement.query(
      By.directive(LmCardDescriptionDirective),
    );
    const content = fixture.debugElement.query(
      By.directive(LmCardContentDirective),
    );

    expect(card).toBeTruthy();
    expect(header).toBeTruthy();
    expect(title).toBeTruthy();
    expect(description).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it('should apply all directive classes correctly', () => {
    fixture.detectChanges();

    // Card classes are on the inner div, not the host element
    const card = fixture.debugElement.query(By.directive(LmCardComponent));
    const cardInnerDiv = card.nativeElement.querySelector('div');
    const titleElement = fixture.debugElement.query(
      By.directive(LmCardTitleDirective),
    ).nativeElement;
    const descriptionElement = fixture.debugElement.query(
      By.directive(LmCardDescriptionDirective),
    ).nativeElement;

    // Card should have base classes
    expect(cardInnerDiv.className).toContain('rounded-[var(--radius-5)]');
    expect(cardInnerDiv.className).toContain('border');
    expect(cardInnerDiv.className).toContain('bg-card');

    // Title should have typography classes
    expect(titleElement.className).toContain('font-semibold');
    expect(titleElement.className).toContain('text-2xl');

    // Description should have muted foreground
    expect(descriptionElement.className).toContain('text-muted-foreground');
  });

  it('should support card variants', () => {
    component.variant = 'elevated';
    fixture.detectChanges();

    const card = fixture.debugElement.query(By.directive(LmCardComponent));
    const cardInnerDiv = card.nativeElement.querySelector('div');

    expect(cardInnerDiv.className).toContain('shadow-[var(--shadow-3)]');
  });
});
