import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LmLabelDirective } from './label.directive';
import type { LabelSize } from '@lumaui/core';

@Component({
  template: `
    <label
      lumaLabel
      [for]="forId()"
      [lmRequired]="required()"
      [lmSize]="size()"
    >
      Test Label
    </label>
  `,
  standalone: true,
  imports: [LmLabelDirective],
})
class LabelTestHostComponent {
  forId = signal('');
  required = signal(false);
  size = signal<LabelSize>('md');
}

describe('LmLabelDirective', () => {
  let fixture: ComponentFixture<LabelTestHostComponent>;
  let hostComponent: LabelTestHostComponent;
  let labelElement: HTMLLabelElement;
  let directive: LmLabelDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmLabelDirective, LabelTestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelTestHostComponent);
    hostComponent = fixture.componentInstance;
    const labelDebugElement = fixture.debugElement.query(
      By.directive(LmLabelDirective),
    );
    labelElement = labelDebugElement.nativeElement;
    directive = labelDebugElement.injector.get(LmLabelDirective);
  });

  describe('Base Classes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply base classes', () => {
      const classes = directive.classes();
      expect(classes).toContain('block');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('text-foreground');
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
      });
    });

    describe('large size', () => {
      beforeEach(() => {
        hostComponent.size.set('lg');
        fixture.detectChanges();
      });

      it('should apply large size classes', () => {
        const classes = directive.classes();
        expect(classes).toContain('text-base');
      });
    });
  });

  describe('Required Indicator', () => {
    describe('when required', () => {
      beforeEach(() => {
        hostComponent.required.set(true);
        fixture.detectChanges();
      });

      it('should apply required classes', () => {
        const classes = directive.classes();
        expect(classes).toContain("after:content-['*']");
        expect(classes).toContain('after:ml-1');
        expect(classes).toContain('after:text-destructive');
      });
    });

    describe('when not required', () => {
      beforeEach(() => {
        hostComponent.required.set(false);
        fixture.detectChanges();
      });

      it('should not apply required classes', () => {
        const classes = directive.classes();
        expect(classes).not.toContain("after:content-['*']");
        expect(classes).not.toContain('after:ml-1');
        expect(classes).not.toContain('after:text-destructive');
      });
    });
  });

  describe('For Attribute', () => {
    describe('when for is set', () => {
      beforeEach(() => {
        hostComponent.forId.set('test-input');
        fixture.detectChanges();
      });

      it('should set for attribute', () => {
        expect(labelElement.getAttribute('for')).toBe('test-input');
      });
    });

    describe('when for is empty', () => {
      beforeEach(() => {
        hostComponent.forId.set('');
        fixture.detectChanges();
      });

      it('should have empty for attribute', () => {
        expect(labelElement.getAttribute('for')).toBe('');
      });
    });
  });

  describe('Host Bindings', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should apply classes to host element', () => {
      const classes = labelElement.className;
      expect(classes).toContain('block');
      expect(classes).toContain('font-medium');
      expect(classes).toContain('text-foreground');
    });
  });
});
