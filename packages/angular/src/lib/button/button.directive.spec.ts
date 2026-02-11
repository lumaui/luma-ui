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

    it('should apply white text class', () => {
      expect(directive.classes()).toContain('text-white');
    });

    it('should apply primary hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-primary/90');
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

    it('should apply border-primary class', () => {
      expect(directive.classes()).toContain('border-primary');
    });

    it('should apply primary text class', () => {
      expect(directive.classes()).toContain('text-primary');
    });

    it('should apply hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-primary/10');
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

    it('should apply primary text class', () => {
      expect(directive.classes()).toContain('text-primary');
    });

    it('should apply hover background class', () => {
      expect(directive.classes()).toContain('hover:bg-primary/10');
    });

    it('should not have solid background class', () => {
      const classList = directive.classes().split(' ');
      expect(classList).not.toContain('bg-primary');
      expect(classList).not.toContain('bg-secondary');
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
      expect(directive.classes()).toContain('border-primary');
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
      expect(anchorDirective.classes()).toContain('text-white');
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
  });
});
