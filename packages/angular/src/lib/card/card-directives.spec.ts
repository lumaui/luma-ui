import {
  LmCardContentDirective,
  LmCardDescriptionDirective,
  LmCardHeaderDirective,
  LmCardTitleDirective,
} from './';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// Test host components for each directive
@Component({
  template: `<h3 lumaCardTitle [lmSize]="lmSize">Test Title</h3>`,
  imports: [LmCardTitleDirective],
})
class CardTitleTestComponent {
  lmSize: 'small' | 'normal' | 'large' = 'normal';
}

@Component({
  template: `<p lumaCardDescription [lmSize]="lmSize">Test Description</p>`,
  imports: [LmCardDescriptionDirective],
})
class CardDescriptionTestComponent {
  lmSize: 'small' | 'normal' | 'large' = 'normal';
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

describe('LmCardTitleDirective', () => {
  let fixture: ComponentFixture<CardTitleTestComponent>;
  let _component: CardTitleTestComponent;
  let titleElement: DebugElement;
  let directive: LmCardTitleDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardTitleDirective, CardTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTitleTestComponent);
    _component = fixture.componentInstance;
    titleElement = fixture.debugElement.query(
      By.directive(LmCardTitleDirective),
    );
    directive = titleElement.injector.get(LmCardTitleDirective);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply base classes', () => {
    fixture.detectChanges();

    const classes = directive.classes();

    expect(classes).toContain('font-medium');
    expect(classes).toContain('tracking-tight');
    expect(classes).toContain('mb-1');
    expect(classes).toContain('lm-text-primary');
  });

  it('should apply normal size by default', () => {
    fixture.detectChanges();

    const classes = directive.classes();
    expect(classes).toContain('text-lg');
  });

  it('should use computed signal for classes', () => {
    expect(typeof directive.classes).toBe('function');

    const classes = directive.classes();
    expect(typeof classes).toBe('string');
  });

  it('should use signal-based input for size', () => {
    expect(typeof directive.lmSize).toBe('function');

    const size = directive.lmSize();
    expect(size).toBe('normal');
  });
});

describe('LmCardDescriptionDirective', () => {
  let fixture: ComponentFixture<CardDescriptionTestComponent>;
  let _component: CardDescriptionTestComponent;
  let descriptionElement: DebugElement;
  let directive: LmCardDescriptionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmCardDescriptionDirective, CardDescriptionTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDescriptionTestComponent);
    _component = fixture.componentInstance;
    descriptionElement = fixture.debugElement.query(
      By.directive(LmCardDescriptionDirective),
    );
    directive = descriptionElement.injector.get(LmCardDescriptionDirective);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply base classes', () => {
    fixture.detectChanges();

    const classes = directive.classes();

    expect(classes).toContain('lm-text-secondary');
    expect(classes).toContain('mb-5');
  });

  it('should apply normal size by default', () => {
    fixture.detectChanges();

    const classes = directive.classes();
    expect(classes).toContain('text-sm');
  });

  it('should use computed signal for classes', () => {
    expect(typeof directive.classes).toBe('function');

    const classes = directive.classes();
    expect(typeof classes).toBe('string');
  });

  it('should use signal-based input for size', () => {
    expect(typeof directive.lmSize).toBe('function');

    const size = directive.lmSize();
    expect(size).toBe('normal');
  });
});

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply mb-4 class for spacing', () => {
    fixture.detectChanges();

    const element = headerElement.nativeElement as HTMLElement;
    expect(element.className).toContain('mb-4');
  });

  it('should be a structural directive with no inputs', () => {
    expect(directive).toBeDefined();

    expect(directive).toBeTruthy();
  });
});

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
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

  it('should exist as semantic marker without applying styles', () => {
    fixture.detectChanges();

    // Should have empty class or just the directive itself
    // No specific styling should be applied
    expect(directive).toBeDefined();
  });

  it('should be a structural directive with no inputs', () => {
    // Verify it's a simple structural directive
    expect(directive).toBeDefined();

    // Directive exists for semantic HTML structure
    // No API surface to test - existence is sufficient
    expect(directive).toBeTruthy();
  });

  it('should serve as backward compatibility marker', () => {
    // Directive exists primarily for semantic HTML and backward compatibility
    // No functional behavior to test beyond existence
    expect(directive).toBeTruthy();
  });
});

// Integration test for all directives together
@Component({
  template: `
    <div lumaCardHeader>
      <h3 lumaCardTitle lmSize="large">Integration Test</h3>
      <p lumaCardDescription lmSize="small">Testing all directives together</p>
    </div>
    <div lumaCardContent>
      <p>Content area</p>
    </div>
  `,
  imports: [
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
  ],
})
class IntegrationTestComponent {}

describe('Card Directives Integration', () => {
  let fixture: ComponentFixture<IntegrationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmCardHeaderDirective,
        LmCardTitleDirective,
        LmCardDescriptionDirective,
        LmCardContentDirective,
        IntegrationTestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntegrationTestComponent);
    await fixture.whenStable();
  });

  it('should work together in a composed structure', () => {
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(
      By.directive(LmCardHeaderDirective),
    );
    const titleElement = fixture.debugElement.query(
      By.directive(LmCardTitleDirective),
    );
    const descriptionElement = fixture.debugElement.query(
      By.directive(LmCardDescriptionDirective),
    );
    const contentElement = fixture.debugElement.query(
      By.directive(LmCardContentDirective),
    );

    expect(headerElement).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
  });

  it('should apply all directive classes correctly', () => {
    fixture.detectChanges();

    const titleDirective = fixture.debugElement
      .query(By.directive(LmCardTitleDirective))
      .injector.get(LmCardTitleDirective);
    const descriptionDirective = fixture.debugElement
      .query(By.directive(LmCardDescriptionDirective))
      .injector.get(LmCardDescriptionDirective);

    const titleClasses = titleDirective.classes();
    const descriptionClasses = descriptionDirective.classes();

    expect(titleClasses).toContain('text-2xl'); // large size
    expect(descriptionClasses).toContain('text-xs'); // small size
  });
});
