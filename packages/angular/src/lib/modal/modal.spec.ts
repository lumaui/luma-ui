import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LmModalComponent } from './modal.component';
import { LmModalOverlayComponent } from './modal-overlay.component';
import { LmModalContainerComponent } from './modal-container.component';
import { LmModalHeaderDirective } from './modal-header.directive';
import { LmModalTitleDirective } from './modal-title.directive';
import { LmModalContentDirective } from './modal-content.directive';
import { LmModalFooterDirective } from './modal-footer.directive';

// ============================================================
// TEST HOST COMPONENT
// ============================================================

@Component({
  selector: 'luma-modal-test-host',
  template: `
    <luma-modal [(lmOpen)]="isOpen" [lmSize]="size">
      <luma-modal-overlay>
        <luma-modal-container>
          <div lumaModalHeader>
            <h2 lumaModalTitle>Modal Title</h2>
          </div>
          <div lumaModalContent>
            <p>Modal content</p>
          </div>
          <div lumaModalFooter>
            <button>Close</button>
          </div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>
  `,
  imports: [
    LmModalComponent,
    LmModalOverlayComponent,
    LmModalContainerComponent,
    LmModalHeaderDirective,
    LmModalTitleDirective,
    LmModalContentDirective,
    LmModalFooterDirective,
  ],
})
class ModalTestHostComponent {
  isOpen = signal(false);
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
}

// ============================================================
// TEST SUITE
// ============================================================

describe('Modal', () => {
  describe('LmModalComponent', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;
    let modalElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          LmModalComponent,
          LmModalHeaderDirective,
          LmModalTitleDirective,
          LmModalContentDirective,
          LmModalFooterDirective,
          ModalTestHostComponent,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
    });

    // ============================================================
    // BASIC CREATION
    // ============================================================

    describe('Basic Creation', () => {
      it('should create the component', () => {
        fixture.detectChanges();
        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        expect(modal).toBeTruthy();
      });

      it('should have data-state attribute', () => {
        fixture.detectChanges();
        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        modalElement = modal.nativeElement;
        expect(modalElement.hasAttribute('data-state')).toBe(true);
      });
    });

    // ============================================================
    // CONTAINER CLASSES
    // ============================================================

    describe('Container Classes', () => {
      beforeEach(() => {
        hostComponent.isOpen.set(true);
        fixture.detectChanges();
      });

      it('should apply fixed positioning classes', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('fixed');
        expect(container.className).toContain('left-[50%]');
        expect(container.className).toContain('top-[50%]');
      });

      it('should apply transform classes', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('translate-x-[-50%]');
        expect(container.className).toContain('translate-y-[-50%]');
      });

      it('should apply styling classes', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('bg-white');
        expect(container.className).toContain('border-gray-200');
        expect(container.className).toContain('rounded-[var(--radius-6)]');
      });

      it('should apply transition classes', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('data-[state=open]:opacity-100');
        expect(container.className).toContain('data-[state=closed]:opacity-0');
      });
    });

    // ============================================================
    // SIZE VARIANTS
    // ============================================================

    describe('Size Variants', () => {
      beforeEach(() => {
        hostComponent.isOpen.set(true);
      });

      it('should apply small size classes', () => {
        hostComponent.size = 'sm';
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('max-w-sm');
      });

      it('should apply medium size classes', () => {
        hostComponent.size = 'md';
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('max-w-md');
      });

      it('should apply large size classes', () => {
        hostComponent.size = 'lg';
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('max-w-lg');
      });

      it('should apply extra large size classes', () => {
        hostComponent.size = 'xl';
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('max-w-xl');
      });

      it('should apply full size classes', () => {
        hostComponent.size = 'full';
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.className).toContain('max-w-[95vw]');
        expect(container.className).toContain('h-[95vh]');
      });
    });

    // ============================================================
    // OPEN/CLOSE STATE
    // ============================================================

    describe('Open/Close State', () => {
      it('should have data-state=closed when closed', () => {
        hostComponent.isOpen.set(false);
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container).toBeTruthy();
        expect(container.getAttribute('data-state')).toBe('closed');
      });

      it('should render when open', () => {
        hostComponent.isOpen.set(true);
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container).toBeTruthy();
      });

      it('should have data-state=open when open', () => {
        hostComponent.isOpen.set(true);
        fixture.detectChanges();
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.getAttribute('data-state')).toBe('open');
      });
    });

    // ============================================================
    // DIRECTIVES
    // ============================================================

    describe('Modal Directives', () => {
      beforeEach(() => {
        hostComponent.isOpen.set(true);
        fixture.detectChanges();
      });

      it('should render header directive', () => {
        const header = fixture.debugElement.query(
          By.directive(LmModalHeaderDirective),
        );
        expect(header).toBeTruthy();
      });

      it('should render title directive', () => {
        const title = fixture.debugElement.query(
          By.directive(LmModalTitleDirective),
        );
        expect(title).toBeTruthy();
        expect(title.nativeElement.textContent).toContain('Modal Title');
      });

      it('should render content directive', () => {
        const content = fixture.debugElement.query(
          By.directive(LmModalContentDirective),
        );
        expect(content).toBeTruthy();
        expect(content.nativeElement.textContent).toContain('Modal content');
      });

      it('should render footer directive', () => {
        const footer = fixture.debugElement.query(
          By.directive(LmModalFooterDirective),
        );
        expect(footer).toBeTruthy();
      });
    });

    // ============================================================
    // ACCESSIBILITY
    // ============================================================

    describe('Accessibility', () => {
      beforeEach(() => {
        hostComponent.isOpen.set(true);
        fixture.detectChanges();
      });

      it('should have role="dialog"', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container).toBeTruthy();
      });

      it('should have aria-modal="true"', () => {
        const container =
          fixture.nativeElement.querySelector('[role="dialog"]');
        expect(container.getAttribute('aria-modal')).toBe('true');
      });
    });
  });
});
