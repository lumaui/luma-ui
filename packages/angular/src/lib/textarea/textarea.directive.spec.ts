import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { LmTextareaDirective } from './textarea.directive';
import type { TextareaSize } from '@lumaui/core';

@Component({
  template: `
    <textarea
      lumaTextarea
      [lmSize]="size()"
      [lmError]="error()"
      [lmDisabled]="disabled()"
      [lmRequired]="required()"
    ></textarea>
  `,
  standalone: true,
  imports: [LmTextareaDirective],
})
class TextareaTestHostComponent {
  size = signal<TextareaSize>('md');
  error = signal(false);
  disabled = signal(false);
  required = signal(false);
}

@Component({
  template: ` <textarea lumaTextarea [formControl]="control"></textarea> `,
  standalone: true,
  imports: [LmTextareaDirective, ReactiveFormsModule],
})
class TextareaReactiveFormTestHostComponent {
  control = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);
}

describe('LmTextareaDirective', () => {
  let fixture: ComponentFixture<TextareaTestHostComponent>;
  let hostComponent: TextareaTestHostComponent;
  let textareaElement: HTMLTextAreaElement;
  let directive: LmTextareaDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LmTextareaDirective,
        TextareaTestHostComponent,
        TextareaReactiveFormTestHostComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaTestHostComponent);
    hostComponent = fixture.componentInstance;
    const textareaDebugElement = fixture.debugElement.query(
      By.directive(LmTextareaDirective),
    );
    textareaElement = textareaDebugElement.nativeElement;
    directive = textareaDebugElement.injector.get(LmTextareaDirective);
  });

  describe('Size Classes', () => {
    describe('small size', () => {
      beforeEach(() => {
        hostComponent.size.set('sm');
        fixture.detectChanges();
      });

      it('should apply small size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('min-h-20');
        expect(classes).toContain('py-1.5');
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
        expect(classes).toContain('min-h-24');
        expect(classes).toContain('py-2');
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
        expect(classes).toContain('min-h-32');
        expect(classes).toContain('py-2.5');
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

    it('should apply resize class', () => {
      const classes = directive.classes();
      expect(classes).toContain('resize-y');
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
      expect(classes).toContain('disabled:resize-none');
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
        expect(textareaElement.getAttribute('aria-invalid')).toBe('true');
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
        expect(classes).not.toContain('focus-visible:border-destructive');
      });

      it('should set aria-invalid to false', () => {
        expect(textareaElement.getAttribute('aria-invalid')).toBe('false');
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
        expect(textareaElement.hasAttribute('disabled')).toBe(true);
      });
    });

    describe('when enabled', () => {
      beforeEach(() => {
        hostComponent.disabled.set(false);
        fixture.detectChanges();
      });

      it('should not have disabled attribute', () => {
        expect(textareaElement.hasAttribute('disabled')).toBe(false);
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
        expect(textareaElement.hasAttribute('required')).toBe(true);
      });
    });

    describe('when not required', () => {
      beforeEach(() => {
        hostComponent.required.set(false);
        fixture.detectChanges();
      });

      it('should not have required attribute', () => {
        expect(textareaElement.hasAttribute('required')).toBe(false);
      });
    });
  });

  describe('Auto-generated ID', () => {
    it('should generate unique ID', () => {
      fixture.detectChanges();
      const id = textareaElement.getAttribute('id');
      expect(id).toMatch(/^luma-textarea-\d+$/);
    });

    it('should generate different IDs for multiple instances', () => {
      const fixture2 = TestBed.createComponent(TextareaTestHostComponent);
      fixture.detectChanges();
      fixture2.detectChanges();

      const id1 = fixture.debugElement
        .query(By.directive(LmTextareaDirective))
        .nativeElement.getAttribute('id');
      const id2 = fixture2.debugElement
        .query(By.directive(LmTextareaDirective))
        .nativeElement.getAttribute('id');

      expect(id1).not.toBe(id2);
    });
  });

  describe('ARIA Attributes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have aria-invalid attribute', () => {
      expect(textareaElement.hasAttribute('aria-invalid')).toBe(true);
    });

    it('should allow setting aria-describedby', () => {
      directive.setDescribedBy('helper-1 error-1');
      fixture.detectChanges();
      expect(textareaElement.getAttribute('aria-describedby')).toBe(
        'helper-1 error-1',
      );
    });

    it('should allow clearing aria-describedby', () => {
      directive.setDescribedBy('helper-1');
      fixture.detectChanges();
      expect(textareaElement.getAttribute('aria-describedby')).toBe('helper-1');

      directive.setDescribedBy(null);
      fixture.detectChanges();
      expect(textareaElement.getAttribute('aria-describedby')).toBe(null);
    });
  });

  describe('ControlValueAccessor', () => {
    let reactiveFixture: ComponentFixture<TextareaReactiveFormTestHostComponent>;
    let reactiveHostComponent: TextareaReactiveFormTestHostComponent;
    let reactiveTextareaElement: HTMLTextAreaElement;
    let reactiveDirective: LmTextareaDirective;

    beforeEach(() => {
      reactiveFixture = TestBed.createComponent(
        TextareaReactiveFormTestHostComponent,
      );
      reactiveHostComponent = reactiveFixture.componentInstance;
      const textareaDebugElement = reactiveFixture.debugElement.query(
        By.directive(LmTextareaDirective),
      );
      reactiveTextareaElement = textareaDebugElement.nativeElement;
      reactiveDirective =
        textareaDebugElement.injector.get(LmTextareaDirective);
      reactiveFixture.detectChanges();
    });

    it('should write value to textarea', () => {
      reactiveHostComponent.control.setValue('Hello world');
      reactiveFixture.detectChanges();
      expect(reactiveTextareaElement.value).toBe('Hello world');
    });

    it('should call onChange when textarea value changes', () => {
      const onChangeSpy = vi.fn();
      reactiveDirective.registerOnChange(onChangeSpy);

      reactiveTextareaElement.value = 'Hello world';
      reactiveTextareaElement.dispatchEvent(new Event('input'));

      expect(onChangeSpy).toHaveBeenCalledWith('Hello world');
    });

    it('should call onTouched on blur', () => {
      const onTouchedSpy = vi.fn();
      reactiveDirective.registerOnTouched(onTouchedSpy);

      reactiveTextareaElement.dispatchEvent(new Event('blur'));

      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should auto-detect error from Angular Forms when invalid and touched', () => {
      reactiveHostComponent.control.markAsTouched();
      reactiveFixture.detectChanges();

      expect(reactiveDirective.hasError()).toBe(true);
      expect(reactiveTextareaElement.getAttribute('aria-invalid')).toBe('true');
    });

    it('should not show error when invalid but not touched', () => {
      expect(reactiveDirective.hasError()).toBe(false);
      expect(reactiveTextareaElement.getAttribute('aria-invalid')).toBe(
        'false',
      );
    });

    it('should not show error when valid and touched', () => {
      reactiveHostComponent.control.setValue('This is a long enough value');
      reactiveHostComponent.control.markAsTouched();
      reactiveFixture.detectChanges();

      expect(reactiveDirective.hasError()).toBe(false);
      expect(reactiveTextareaElement.getAttribute('aria-invalid')).toBe(
        'false',
      );
    });
  });

  describe('Host Bindings', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply classes to host element', () => {
      const classes = textareaElement.className;
      expect(classes).toContain('w-full');
      expect(classes).toContain('border');
      expect(classes).toContain('border-gray-5');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('resize-y');
    });
  });
});
