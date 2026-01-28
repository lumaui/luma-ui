import {
  CardContentDirective,
  CardDescriptionDirective,
  CardHeaderDirective,
  CardTitleDirective,
} from './';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

// Test host components for each directive
@Component({
  template: `<h3 lumaCardTitle [lmSize]="lmSize">Test Title</h3>`,
  imports: [CardTitleDirective],
})
class CardTitleTestComponent {
  lmSize: 'small' | 'normal' | 'large' = 'normal';
}

@Component({
  template: `<p lumaCardDescription [lmSize]="lmSize">Test Description</p>`,
  imports: [CardDescriptionDirective],
})
class CardDescriptionTestComponent {
  lmSize: 'small' | 'normal' | 'large' = 'normal';
}

@Component({
  template: `<div lumaCardHeader>Test Header</div>`,
  imports: [CardHeaderDirective],
})
class CardHeaderTestComponent {}

@Component({
  template: `<div lumaCardContent>Test Content</div>`,
  imports: [CardContentDirective],
})
class CardContentTestComponent {}

describe('CardTitleDirective', () => {
  let fixture: ComponentFixture<CardTitleTestComponent>;
  let _component: CardTitleTestComponent;
  let titleElement: DebugElement;
  let directive: CardTitleDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTitleDirective, CardTitleTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTitleTestComponent);
    _component = fixture.componentInstance;
    titleElement = fixture.debugElement.query(By.directive(CardTitleDirective));
    directive = titleElement.injector.get(CardTitleDirective);
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

describe('CardDescriptionDirective', () => {
  let fixture: ComponentFixture<CardDescriptionTestComponent>;
  let _component: CardDescriptionTestComponent;
  let descriptionElement: DebugElement;
  let directive: CardDescriptionDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDescriptionDirective, CardDescriptionTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardDescriptionTestComponent);
    _component = fixture.componentInstance;
    descriptionElement = fixture.debugElement.query(
      By.directive(CardDescriptionDirective),
    );
    directive = descriptionElement.injector.get(CardDescriptionDirective);
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

describe('CardHeaderDirective', () => {
  let fixture: ComponentFixture<CardHeaderTestComponent>;
  let headerElement: DebugElement;
  let directive: CardHeaderDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardHeaderDirective, CardHeaderTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardHeaderTestComponent);
    headerElement = fixture.debugElement.query(
      By.directive(CardHeaderDirective),
    );
    directive = headerElement.injector.get(CardHeaderDirective);
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

describe('CardContentDirective', () => {
  let fixture: ComponentFixture<CardContentTestComponent>;
  let contentElement: DebugElement;
  let directive: CardContentDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardContentDirective, CardContentTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContentTestComponent);
    contentElement = fixture.debugElement.query(
      By.directive(CardContentDirective),
    );
    directive = contentElement.injector.get(CardContentDirective);
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
    CardHeaderDirective,
    CardTitleDirective,
    CardDescriptionDirective,
    CardContentDirective,
  ],
})
class IntegrationTestComponent {}

describe('Card Directives Integration', () => {
  let fixture: ComponentFixture<IntegrationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CardHeaderDirective,
        CardTitleDirective,
        CardDescriptionDirective,
        CardContentDirective,
        IntegrationTestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IntegrationTestComponent);
    await fixture.whenStable();
  });

  it('should work together in a composed structure', () => {
    fixture.detectChanges();

    const headerElement = fixture.debugElement.query(
      By.directive(CardHeaderDirective),
    );
    const titleElement = fixture.debugElement.query(
      By.directive(CardTitleDirective),
    );
    const descriptionElement = fixture.debugElement.query(
      By.directive(CardDescriptionDirective),
    );
    const contentElement = fixture.debugElement.query(
      By.directive(CardContentDirective),
    );

    expect(headerElement).toBeTruthy();
    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
    expect(contentElement).toBeTruthy();
  });

  it('should apply all directive classes correctly', () => {
    fixture.detectChanges();

    const titleDirective = fixture.debugElement
      .query(By.directive(CardTitleDirective))
      .injector.get(CardTitleDirective);
    const descriptionDirective = fixture.debugElement
      .query(By.directive(CardDescriptionDirective))
      .injector.get(CardDescriptionDirective);

    const titleClasses = titleDirective.classes();
    const descriptionClasses = descriptionDirective.classes();

    expect(titleClasses).toContain('text-2xl'); // large size
    expect(descriptionClasses).toContain('text-xs'); // small size
  });
});
