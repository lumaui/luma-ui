import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { LmCheckboxDirective } from './checkbox.directive';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  template: `
    <input
      type="checkbox"
      lumaCheckbox
      [lmError]="error"
      [lmDisabled]="disabled"
    />
  `,
  imports: [LmCheckboxDirective],
})
class CheckboxTestHostComponent {
  error = false;
  disabled = false;
}

@Component({
  selector: 'luma-checkbox-form-test-host',
  template: ` <input type="checkbox" lumaCheckbox [formControl]="control" /> `,
  imports: [ReactiveFormsModule, LmCheckboxDirective],
})
class CheckboxFormTestHostComponent {
  control = new FormControl(false);
}

@Component({
  selector: 'luma-checkbox-required-form-host',
  template: ` <input type="checkbox" lumaCheckbox [formControl]="control" /> `,
  imports: [ReactiveFormsModule, LmCheckboxDirective],
})
class CheckboxRequiredFormHostComponent {
  control = new FormControl(false, [Validators.requiredTrue]);
}

// ---------------------------------------------------------------------------
// Spec
// ---------------------------------------------------------------------------

describe('LmCheckboxDirective', () => {
  let fixture: ComponentFixture<CheckboxTestHostComponent>;
  let hostComponent: CheckboxTestHostComponent;
  let checkboxEl: DebugElement;
  let directive: LmCheckboxDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmCheckboxDirective,
        ReactiveFormsModule,
        CheckboxTestHostComponent,
        CheckboxFormTestHostComponent,
        CheckboxRequiredFormHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxTestHostComponent);
    hostComponent = fixture.componentInstance;
    checkboxEl = fixture.debugElement.query(By.directive(LmCheckboxDirective));
    directive = checkboxEl.injector.get(LmCheckboxDirective);
  });

  // -------------------------------------------------------------------------
  // Base class application
  // -------------------------------------------------------------------------

  describe('Base classes', () => {
    it('should apply appearance-none', () => {
      fixture.detectChanges();
      expect(checkboxEl.nativeElement.className).toContain('appearance-none');
    });

    it('should apply h-4 and w-4', () => {
      fixture.detectChanges();
      const cls = checkboxEl.nativeElement.className;
      expect(cls).toContain('h-4');
      expect(cls).toContain('w-4');
    });

    it('should apply rounded-[var(--radius-2)]', () => {
      fixture.detectChanges();
      expect(checkboxEl.nativeElement.className).toContain(
        'rounded-[var(--radius-2)]',
      );
    });

    it('should apply focus-visible ring classes', () => {
      fixture.detectChanges();
      const cls = checkboxEl.nativeElement.className;
      expect(cls).toContain('focus-visible:ring-2');
      expect(cls).toContain('focus-visible:ring-ring');
    });
  });

  // -------------------------------------------------------------------------
  // Error state — mutually exclusive variant
  // -------------------------------------------------------------------------

  describe('Error variant (error: false)', () => {
    beforeEach(() => {
      hostComponent.error = false;
      fixture.detectChanges();
    });

    it('should apply border-gray-5 when no error', () => {
      expect(checkboxEl.nativeElement.className).toContain('border-gray-5');
    });

    it('should apply checked:bg-primary when no error', () => {
      expect(checkboxEl.nativeElement.className).toContain(
        'checked:bg-primary',
      );
    });

    it('should NOT apply border-destructive when no error', () => {
      expect(checkboxEl.nativeElement.className).not.toContain(
        'border-destructive',
      );
    });
  });

  describe('Error variant (error: true)', () => {
    beforeEach(() => {
      hostComponent.error = true;
      fixture.detectChanges();
    });

    it('should apply border-destructive when error', () => {
      expect(checkboxEl.nativeElement.className).toContain(
        'border-destructive',
      );
    });

    it('should apply checked:bg-destructive when error', () => {
      expect(checkboxEl.nativeElement.className).toContain(
        'checked:bg-destructive',
      );
    });

    it('should NOT apply border-gray-5 when error', () => {
      expect(checkboxEl.nativeElement.className).not.toContain('border-gray-5');
    });

    it('should set aria-invalid attribute', () => {
      expect(checkboxEl.nativeElement.getAttribute('aria-invalid')).toBe(
        'true',
      );
    });
  });

  // -------------------------------------------------------------------------
  // Auto-generated ID
  // -------------------------------------------------------------------------

  describe('Auto-generated ID', () => {
    it('should set id attribute starting with luma-checkbox-', () => {
      fixture.detectChanges();
      expect(checkboxEl.nativeElement.getAttribute('id')).toMatch(
        /^luma-checkbox-\d+$/,
      );
    });
  });

  // -------------------------------------------------------------------------
  // Disabled state
  // -------------------------------------------------------------------------

  describe('Disabled state', () => {
    describe('when disabled via lmDisabled input', () => {
      beforeEach(() => {
        hostComponent.disabled = true;
        fixture.detectChanges();
      });

      it('should set disabled attribute', () => {
        expect(checkboxEl.nativeElement.hasAttribute('disabled')).toBe(true);
      });

      it('should apply disabled:cursor-not-allowed class', () => {
        expect(checkboxEl.nativeElement.className).toContain(
          'disabled:cursor-not-allowed',
        );
      });
    });

    describe('when enabled', () => {
      beforeEach(() => {
        hostComponent.disabled = false;
        fixture.detectChanges();
      });

      it('should NOT have disabled attribute', () => {
        expect(checkboxEl.nativeElement.hasAttribute('disabled')).toBe(false);
      });
    });
  });

  // -------------------------------------------------------------------------
  // FormControl integration
  // -------------------------------------------------------------------------

  describe('FormControl integration', () => {
    let formFixture: ComponentFixture<CheckboxFormTestHostComponent>;
    let formCheckboxEl: DebugElement;

    beforeEach(() => {
      formFixture = TestBed.createComponent(CheckboxFormTestHostComponent);
    });

    it('should reflect FormControl false value as unchecked', () => {
      formFixture.componentInstance.control.setValue(false);
      formFixture.detectChanges();
      formCheckboxEl = formFixture.debugElement.query(
        By.directive(LmCheckboxDirective),
      );
      expect((formCheckboxEl.nativeElement as HTMLInputElement).checked).toBe(
        false,
      );
    });

    it('should reflect FormControl true value as checked', () => {
      formFixture.componentInstance.control.setValue(true);
      formFixture.detectChanges();
      formCheckboxEl = formFixture.debugElement.query(
        By.directive(LmCheckboxDirective),
      );
      expect((formCheckboxEl.nativeElement as HTMLInputElement).checked).toBe(
        true,
      );
    });

    it('should disable when FormControl is disabled', () => {
      formFixture.componentInstance.control.disable();
      formFixture.detectChanges();
      formCheckboxEl = formFixture.debugElement.query(
        By.directive(LmCheckboxDirective),
      );
      expect(formCheckboxEl.nativeElement.hasAttribute('disabled')).toBe(true);
    });
  });

  // -------------------------------------------------------------------------
  // FormControl error bridge (markAsTouched + invalid = error classes)
  // -------------------------------------------------------------------------

  describe('FormControl error bridge', () => {
    let errorFixture: ComponentFixture<CheckboxRequiredFormHostComponent>;
    let errorCheckboxEl: DebugElement;

    beforeEach(() => {
      errorFixture = TestBed.createComponent(CheckboxRequiredFormHostComponent);
    });

    it('should NOT show error state when untouched', () => {
      errorFixture.detectChanges();
      errorCheckboxEl = errorFixture.debugElement.query(
        By.directive(LmCheckboxDirective),
      );
      expect(errorCheckboxEl.nativeElement.className).not.toContain(
        'border-destructive',
      );
    });

    it('should show error state when invalid and touched', () => {
      errorFixture.componentInstance.control.markAsTouched();
      errorFixture.detectChanges();
      errorCheckboxEl = errorFixture.debugElement.query(
        By.directive(LmCheckboxDirective),
      );
      expect(errorCheckboxEl.nativeElement.className).toContain(
        'border-destructive',
      );
    });
  });

  // -------------------------------------------------------------------------
  // setDescribedBy
  // -------------------------------------------------------------------------

  describe('setDescribedBy', () => {
    it('should set aria-describedby via setDescribedBy()', () => {
      fixture.detectChanges();
      directive.setDescribedBy('helper-123');
      fixture.detectChanges();
      expect(checkboxEl.nativeElement.getAttribute('aria-describedby')).toBe(
        'helper-123',
      );
    });

    it('should clear aria-describedby when null is passed', () => {
      fixture.detectChanges();
      directive.setDescribedBy('helper-123');
      fixture.detectChanges();
      directive.setDescribedBy(null);
      fixture.detectChanges();
      expect(
        checkboxEl.nativeElement.getAttribute('aria-describedby'),
      ).toBeNull();
    });
  });
});
