import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LmHelperTextDirective } from './helper-text.directive';
import type { HelperTextSize } from '@lumaui/core';

@Component({
  template: ` <span lumaHelperText [lmSize]="size()"> Helper text </span> `,
  standalone: true,
  imports: [LmHelperTextDirective],
})
class HelperTextTestHostComponent {
  size = signal<HelperTextSize>('sm');
}

describe('LmHelperTextDirective', () => {
  let fixture: ComponentFixture<HelperTextTestHostComponent>;
  let hostComponent: HelperTextTestHostComponent;
  let helperElement: HTMLSpanElement;
  let directive: LmHelperTextDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmHelperTextDirective, HelperTextTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelperTextTestHostComponent);
    hostComponent = fixture.componentInstance;
    const helperDebugElement = fixture.debugElement.query(
      By.directive(LmHelperTextDirective),
    );
    helperElement = helperDebugElement.nativeElement;
    directive = helperDebugElement.injector.get(LmHelperTextDirective);
  });

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('block');
      expect(classes).toContain('text-muted-foreground');
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
      const id = helperElement.getAttribute('id');
      expect(id).toMatch(/^luma-helper-\d+$/);
    });

    it('should generate different IDs for multiple instances', () => {
      const fixture2 = TestBed.createComponent(HelperTextTestHostComponent);
      fixture.detectChanges();
      fixture2.detectChanges();

      const id1 = fixture.debugElement
        .query(By.directive(LmHelperTextDirective))
        .nativeElement.getAttribute('id');
      const id2 = fixture2.debugElement
        .query(By.directive(LmHelperTextDirective))
        .nativeElement.getAttribute('id');

      expect(id1).not.toBe(id2);
    });
  });

  describe('Host Bindings', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply classes to host element', () => {
      const classes = helperElement.className;
      expect(classes).toContain('block');
      expect(classes).toContain('text-muted-foreground');
    });
  });
});
