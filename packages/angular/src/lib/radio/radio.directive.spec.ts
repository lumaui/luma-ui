import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { LmRadioDirective } from './radio.directive';

// ---------------------------------------------------------------------------
// Test host components
// ---------------------------------------------------------------------------

@Component({
  template: `
    <input
      type="radio"
      lumaRadio
      [lmError]="error"
      [lmDisabled]="disabled"
      [lmValue]="value"
    />
  `,
  imports: [LmRadioDirective],
})
class RadioTestHostComponent {
  error = false;
  disabled = false;
  value: unknown = 'option-a';
}

@Component({
  template: `
    <input
      type="radio"
      lumaRadio
      lmValue="a"
      [formControl]="control"
      name="group"
      id="radio-a"
    />
    <input
      type="radio"
      lumaRadio
      lmValue="b"
      [formControl]="control"
      name="group"
      id="radio-b"
    />
  `,
  imports: [ReactiveFormsModule, LmRadioDirective],
})
class RadioFormTestHostComponent {
  control = new FormControl('a');
}

@Component({
  template: `
    <input
      type="radio"
      lumaRadio
      lmValue="x"
      [formControl]="control"
      name="req-group"
      id="radio-req"
    />
  `,
  imports: [ReactiveFormsModule, LmRadioDirective],
})
class RadioRequiredFormHostComponent {
  control = new FormControl(null, [Validators.required]);
}

// ---------------------------------------------------------------------------
// Spec
// ---------------------------------------------------------------------------

describe('LmRadioDirective', () => {
  let fixture: ComponentFixture<RadioTestHostComponent>;
  let hostComponent: RadioTestHostComponent;
  let radioEl: DebugElement;
  let directive: LmRadioDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmRadioDirective,
        ReactiveFormsModule,
        RadioTestHostComponent,
        RadioFormTestHostComponent,
        RadioRequiredFormHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioTestHostComponent);
    hostComponent = fixture.componentInstance;
    radioEl = fixture.debugElement.query(By.directive(LmRadioDirective));
    directive = radioEl.injector.get(LmRadioDirective);
  });

  // -------------------------------------------------------------------------
  // Base class application
  // -------------------------------------------------------------------------

  describe('Base classes', () => {
    it('should apply appearance-none', () => {
      fixture.detectChanges();
      expect(radioEl.nativeElement.className).toContain('appearance-none');
    });

    it('should apply h-4 and w-4', () => {
      fixture.detectChanges();
      const cls = radioEl.nativeElement.className;
      expect(cls).toContain('h-4');
      expect(cls).toContain('w-4');
    });

    it('should apply rounded-full for circular shape', () => {
      fixture.detectChanges();
      expect(radioEl.nativeElement.className).toContain('rounded-full');
    });

    it('should apply focus-visible ring classes', () => {
      fixture.detectChanges();
      const cls = radioEl.nativeElement.className;
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
      expect(radioEl.nativeElement.className).toContain('border-gray-5');
    });

    it('should NOT apply border-destructive when no error', () => {
      expect(radioEl.nativeElement.className).not.toContain(
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
      expect(radioEl.nativeElement.className).toContain('border-destructive');
    });

    it('should NOT apply border-gray-5 when error', () => {
      expect(radioEl.nativeElement.className).not.toContain('border-gray-5');
    });

    it('should set aria-invalid attribute', () => {
      expect(radioEl.nativeElement.getAttribute('aria-invalid')).toBe('true');
    });
  });

  // -------------------------------------------------------------------------
  // Auto-generated ID
  // -------------------------------------------------------------------------

  describe('Auto-generated ID', () => {
    it('should set id attribute starting with luma-radio-', () => {
      fixture.detectChanges();
      expect(radioEl.nativeElement.getAttribute('id')).toMatch(
        /^luma-radio-\d+$/,
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
        expect(radioEl.nativeElement.hasAttribute('disabled')).toBe(true);
      });

      it('should apply disabled:cursor-not-allowed class', () => {
        expect(radioEl.nativeElement.className).toContain(
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
        expect(radioEl.nativeElement.hasAttribute('disabled')).toBe(false);
      });
    });
  });

  // -------------------------------------------------------------------------
  // FormControl integration — value selection
  // -------------------------------------------------------------------------

  describe('FormControl integration', () => {
    let formFixture: ComponentFixture<RadioFormTestHostComponent>;
    let radioEls: DebugElement[];

    beforeEach(() => {
      formFixture = TestBed.createComponent(RadioFormTestHostComponent);
    });

    it('should check the radio whose lmValue matches the FormControl value', () => {
      formFixture.componentInstance.control.setValue('a');
      formFixture.detectChanges();
      radioEls = formFixture.debugElement.queryAll(
        By.directive(LmRadioDirective),
      );
      expect((radioEls[0].nativeElement as HTMLInputElement).checked).toBe(
        true,
      );
      expect((radioEls[1].nativeElement as HTMLInputElement).checked).toBe(
        false,
      );
    });

    it('should uncheck radio when FormControl value changes to another option', () => {
      formFixture.componentInstance.control.setValue('b');
      formFixture.detectChanges();
      radioEls = formFixture.debugElement.queryAll(
        By.directive(LmRadioDirective),
      );
      expect((radioEls[0].nativeElement as HTMLInputElement).checked).toBe(
        false,
      );
      expect((radioEls[1].nativeElement as HTMLInputElement).checked).toBe(
        true,
      );
    });

    it('should disable all radios when FormControl is disabled', () => {
      formFixture.componentInstance.control.disable();
      formFixture.detectChanges();
      radioEls = formFixture.debugElement.queryAll(
        By.directive(LmRadioDirective),
      );
      radioEls.forEach((el) => {
        expect(el.nativeElement.hasAttribute('disabled')).toBe(true);
      });
    });
  });

  // -------------------------------------------------------------------------
  // FormControl error bridge (markAsTouched + invalid = error classes)
  // -------------------------------------------------------------------------

  describe('FormControl error bridge', () => {
    let errorFixture: ComponentFixture<RadioRequiredFormHostComponent>;
    let errorRadioEl: DebugElement;

    beforeEach(() => {
      errorFixture = TestBed.createComponent(RadioRequiredFormHostComponent);
    });

    it('should NOT show error state when untouched', () => {
      errorFixture.detectChanges();
      errorRadioEl = errorFixture.debugElement.query(
        By.directive(LmRadioDirective),
      );
      expect(errorRadioEl.nativeElement.className).not.toContain(
        'border-destructive',
      );
    });

    it('should show error state when invalid and touched', () => {
      errorFixture.componentInstance.control.markAsTouched();
      errorFixture.detectChanges();
      errorRadioEl = errorFixture.debugElement.query(
        By.directive(LmRadioDirective),
      );
      expect(errorRadioEl.nativeElement.className).toContain(
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
      directive.setDescribedBy('helper-radio-123');
      fixture.detectChanges();
      expect(radioEl.nativeElement.getAttribute('aria-describedby')).toBe(
        'helper-radio-123',
      );
    });

    it('should clear aria-describedby when null is passed', () => {
      fixture.detectChanges();
      directive.setDescribedBy('helper-radio-123');
      fixture.detectChanges();
      directive.setDescribedBy(null);
      fixture.detectChanges();
      expect(radioEl.nativeElement.getAttribute('aria-describedby')).toBeNull();
    });
  });
});
