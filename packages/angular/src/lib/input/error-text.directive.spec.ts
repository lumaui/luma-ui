import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LmErrorTextDirective } from './error-text.directive';
import type { ErrorTextSize } from '@lumaui/core';

@Component({
  template: ` <span lumaErrorText [lmSize]="size()"> Error message </span> `,
  standalone: true,
  imports: [LmErrorTextDirective],
})
class ErrorTextTestHostComponent {
  size = signal<ErrorTextSize>('sm');
}

describe('LmErrorTextDirective', () => {
  let fixture: ComponentFixture<ErrorTextTestHostComponent>;
  let hostComponent: ErrorTextTestHostComponent;
  let errorElement: HTMLSpanElement;
  let directive: LmErrorTextDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmErrorTextDirective, ErrorTextTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorTextTestHostComponent);
    hostComponent = fixture.componentInstance;
    const errorDebugElement = fixture.debugElement.query(
      By.directive(LmErrorTextDirective),
    );
    errorElement = errorDebugElement.nativeElement;
    directive = errorDebugElement.injector.get(LmErrorTextDirective);
  });

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('block');
      expect(classes).toContain('text-destructive');
    });
  });

  describe('Size Classes', () => {
    describe('small size', () => {
      beforeEach(() => {
        hostComponent.size.set('sm');
        fixture.detectChanges();
      });

      it('should apply small size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('text-xs');
        expect(classes).toContain('mt-1');
      });
    });

    describe('medium size', () => {
      beforeEach(() => {
        hostComponent.size.set('md');
        fixture.detectChanges();
      });

      it('should apply medium size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('text-sm');
        expect(classes).toContain('mt-1.5');
      });
    });
  });

  describe('Auto-generated ID', () => {
    it('should generate unique ID', () => {
      fixture.detectChanges();
      const id = errorElement.getAttribute('id');
      expect(id).toMatch(/^luma-error-\d+$/);
    });

    it('should generate different IDs for multiple instances', () => {
      const fixture2 = TestBed.createComponent(ErrorTextTestHostComponent);
      fixture.detectChanges();
      fixture2.detectChanges();

      const id1 = fixture.debugElement
        .query(By.directive(LmErrorTextDirective))
        .nativeElement.getAttribute('id');
      const id2 = fixture2.debugElement
        .query(By.directive(LmErrorTextDirective))
        .nativeElement.getAttribute('id');

      expect(id1).not.toBe(id2);
    });
  });

  describe('Host Bindings', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply classes to host element', () => {
      const classes = errorElement.className;
      expect(classes).toContain('block');
      expect(classes).toContain('text-destructive');
    });
  });
});
