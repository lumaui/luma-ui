import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { LmInputDirective } from './input.directive';
import type { InputSize } from '@lumaui/core';

@Component({
  template: `
    <input
      lumaInput
      [lmSize]="size()"
      [lmError]="error()"
      [lmDisabled]="disabled()"
      [lmRequired]="required()"
    />
  `,
  standalone: true,
  imports: [LmInputDirective],
})
class InputTestHostComponent {
  size = signal<InputSize>('md');
  error = signal(false);
  disabled = signal(false);
  required = signal(false);
}

@Component({
  template: ` <input lumaInput [formControl]="control" /> `,
  standalone: true,
  imports: [LmInputDirective, ReactiveFormsModule],
})
class InputReactiveFormTestHostComponent {
  control = new FormControl('', [Validators.required, Validators.email]);
}

describe('LmInputDirective', () => {
  let fixture: ComponentFixture<InputTestHostComponent>;
  let hostComponent: InputTestHostComponent;
  let inputElement: HTMLInputElement;
  let directive: LmInputDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmInputDirective,
        InputTestHostComponent,
        InputReactiveFormTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTestHostComponent);
    hostComponent = fixture.componentInstance;
    const inputDebugElement = fixture.debugElement.query(
      By.directive(LmInputDirective),
    );
    inputElement = inputDebugElement.nativeElement;
    directive = inputDebugElement.injector.get(LmInputDirective);
  });

  describe('Size Classes', () => {
    describe('small size', () => {
      beforeEach(() => {
        hostComponent.size.set('sm');
        fixture.detectChanges();
      });

      it('should apply small size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('h-8');
        expect(classes).toContain('px-2.5');
        expect(classes).toContain('text-xs');
        expect(classes).toContain('rounded-[var(--radius-3)]');
      });
    });

    describe('medium size', () => {
      beforeEach(() => {
        hostComponent.size.set('md');
        fixture.detectChanges();
      });

      it('should apply medium size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('h-10');
        expect(classes).toContain('px-3');
        expect(classes).toContain('text-sm');
        expect(classes).toContain('rounded-[var(--radius-4)]');
      });
    });

    describe('large size', () => {
      beforeEach(() => {
        hostComponent.size.set('lg');
        fixture.detectChanges();
      });

      it('should apply large size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('h-12');
        expect(classes).toContain('px-3.5');
        expect(classes).toContain('text-base');
        expect(classes).toContain('rounded-[var(--radius-5)]');
      });
    });
  });

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base layout classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('w-full');
    });

    it('should apply base typography classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('font-normal');
      expect(classes).toContain('placeholder:text-muted-foreground');
    });

    it('should apply transition classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('transition-colors');
      expect(classes).toContain('duration-200');
    });

    it('should apply accessibility classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('focus-visible:outline-none');
      expect(classes).toContain('focus-visible:border-gray-9');
    });

    it('should apply disabled state classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('disabled:cursor-not-allowed');
      expect(classes).toContain('disabled:bg-gray-4');
      expect(classes).toContain('disabled:border-gray-5');
    });
  });

  describe('Error State', () => {
    describe('when lmError is true', () => {
      beforeEach(() => {
        hostComponent.error.set(true);
        fixture.detectChanges();
      });

      it('should apply error classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('border-destructive');
        expect(classes).toContain('focus-visible:border-destructive');
      });

      it('should set aria-invalid to true', () => {
        expect(inputElement.getAttribute('aria-invalid')).toBe('true');
      });

      it('should have hasError computed to true', () => {
        expect(directive.hasError()).toBe(true);
      });
    });

    describe('when lmError is false', () => {
      beforeEach(() => {
        hostComponent.error.set(false);
        fixture.detectChanges();
      });

      it('should not apply error classes', () => {
        const classes = directive.classes();
        expect(classes).not.toContain('border-destructive');
        expect(classes).not.toContain('focus-visible:ring-destructive/20');
      });

      it('should set aria-invalid to false', () => {
        expect(inputElement.getAttribute('aria-invalid')).toBe('false');
      });

      it('should have hasError computed to false', () => {
        expect(directive.hasError()).toBe(false);
      });
    });
  });

  describe('Disabled State', () => {
    describe('when disabled', () => {
      beforeEach(() => {
        hostComponent.disabled.set(true);
        fixture.detectChanges();
      });

      it('should set disabled attribute', () => {
        expect(inputElement.hasAttribute('disabled')).toBe(true);
      });
    });

    describe('when enabled', () => {
      beforeEach(() => {
        hostComponent.disabled.set(false);
        fixture.detectChanges();
      });

      it('should not have disabled attribute', () => {
        expect(inputElement.hasAttribute('disabled')).toBe(false);
      });
    });
  });

  describe('Required State', () => {
    describe('when required', () => {
      beforeEach(() => {
        hostComponent.required.set(true);
        fixture.detectChanges();
      });

      it('should set required attribute', () => {
        expect(inputElement.hasAttribute('required')).toBe(true);
      });
    });

    describe('when not required', () => {
      beforeEach(() => {
        hostComponent.required.set(false);
        fixture.detectChanges();
      });

      it('should not have required attribute', () => {
        expect(inputElement.hasAttribute('required')).toBe(false);
      });
    });
  });

  describe('Auto-generated ID', () => {
    it('should generate unique ID', () => {
      fixture.detectChanges();
      const id = inputElement.getAttribute('id');
      expect(id).toMatch(/^luma-input-\d+$/);
    });

    it('should generate different IDs for multiple instances', () => {
      const fixture2 = TestBed.createComponent(InputTestHostComponent);
      fixture.detectChanges();
      fixture2.detectChanges();

      const id1 = fixture.debugElement
        .query(By.directive(LmInputDirective))
        .nativeElement.getAttribute('id');
      const id2 = fixture2.debugElement
        .query(By.directive(LmInputDirective))
        .nativeElement.getAttribute('id');

      expect(id1).not.toBe(id2);
    });
  });

  describe('ARIA Attributes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have aria-invalid attribute', () => {
      expect(inputElement.hasAttribute('aria-invalid')).toBe(true);
    });

    it('should allow setting aria-describedby', () => {
      directive.setDescribedBy('helper-1 error-1');
      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-describedby')).toBe(
        'helper-1 error-1',
      );
    });

    it('should allow clearing aria-describedby', () => {
      directive.setDescribedBy('helper-1');
      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-describedby')).toBe('helper-1');

      directive.setDescribedBy(null);
      fixture.detectChanges();
      expect(inputElement.getAttribute('aria-describedby')).toBe(null);
    });
  });

  describe('ControlValueAccessor', () => {
    let reactiveFixture: ComponentFixture<InputReactiveFormTestHostComponent>;
    let reactiveHostComponent: InputReactiveFormTestHostComponent;
    let reactiveInputElement: HTMLInputElement;
    let reactiveDirective: LmInputDirective;

    beforeEach(() => {
      reactiveFixture = TestBed.createComponent(
        InputReactiveFormTestHostComponent,
      );
      reactiveHostComponent = reactiveFixture.componentInstance;
      const inputDebugElement = reactiveFixture.debugElement.query(
        By.directive(LmInputDirective),
      );
      reactiveInputElement = inputDebugElement.nativeElement;
      reactiveDirective = inputDebugElement.injector.get(LmInputDirective);
      reactiveFixture.detectChanges();
    });

    it('should write value to input', () => {
      reactiveHostComponent.control.setValue('test@example.com');
      reactiveFixture.detectChanges();
      expect(reactiveInputElement.value).toBe('test@example.com');
    });

    it('should call onChange when input value changes', () => {
      const onChangeSpy = vi.fn();
      reactiveDirective.registerOnChange(onChangeSpy);

      reactiveInputElement.value = 'test@example.com';
      reactiveInputElement.dispatchEvent(new Event('input'));

      expect(onChangeSpy).toHaveBeenCalledWith('test@example.com');
    });

    it('should call onTouched on blur', () => {
      const onTouchedSpy = vi.fn();
      reactiveDirective.registerOnTouched(onTouchedSpy);

      reactiveInputElement.dispatchEvent(new Event('blur'));

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should auto-detect error from Angular Forms when invalid and touched', () => {
      reactiveHostComponent.control.markAsTouched();
      reactiveFixture.detectChanges();

      expect(reactiveDirective.hasError()).toBe(true);
      expect(reactiveInputElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not show error when invalid but not touched', () => {
      expect(reactiveDirective.hasError()).toBe(false);
      expect(reactiveInputElement.getAttribute('aria-invalid')).toBe('false');
    });

    it('should not show error when valid and touched', () => {
      reactiveHostComponent.control.setValue('valid@example.com');
      reactiveHostComponent.control.markAsTouched();
      reactiveFixture.detectChanges();

      expect(reactiveDirective.hasError()).toBe(false);
      expect(reactiveInputElement.getAttribute('aria-invalid')).toBe('false');
    });
  });

  describe('Host Bindings', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply classes to host element', () => {
      const classes = inputElement.className;
      expect(classes).toContain('w-full');
      expect(classes).toContain('border');
      expect(classes).toContain('border-gray-5');
      expect(classes).toContain('bg-transparent');
    });
  });
});
