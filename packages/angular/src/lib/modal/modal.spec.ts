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
import { LmModalCloseComponent } from './modal-close.component';

// ============================================
// TOKEN CONSTANTS
// ============================================

const MODAL_TOKENS = {
  overlay: {
    bg: 'oklch(0 0 0 / 0.4)',
  },
  container: {
    bg: 'oklch(1 0 0)',
    radius: '16px',
    shadow: '0 25px 50px -12px oklch(0 0 0 / 0.25)',
  },
  header: {
    paddingX: '24px',
    paddingY: '16px',
    borderColor: 'oklch(0.97 0.006 290)',
  },
  title: {
    color: 'oklch(0.22 0.014 290)',
    fontWeight: '600',
  },
  content: {
    paddingX: '24px',
    paddingY: '20px',
  },
  footer: {
    paddingX: '24px',
    paddingY: '16px',
    borderColor: 'oklch(0.97 0.006 290)',
  },
  close: {
    color: 'oklch(0.48 0.01 290)',
    bgHover: 'oklch(0.97 0.006 290)',
    radius: '6px',
  },
  transition: {
    duration: '200ms',
    timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

// ============================================
// SETUP AND CLEANUP FUNCTIONS
// ============================================

function setupModalTokens(): void {
  const root = document.documentElement;

  // Overlay tokens
  root.style.setProperty('--luma-modal-overlay-bg', MODAL_TOKENS.overlay.bg);

  // Container tokens
  root.style.setProperty(
    '--luma-modal-container-bg',
    MODAL_TOKENS.container.bg,
  );
  root.style.setProperty(
    '--luma-modal-container-radius',
    MODAL_TOKENS.container.radius,
  );
  root.style.setProperty(
    '--luma-modal-container-shadow',
    MODAL_TOKENS.container.shadow,
  );

  // Header tokens
  root.style.setProperty(
    '--luma-modal-header-padding-x',
    MODAL_TOKENS.header.paddingX,
  );
  root.style.setProperty(
    '--luma-modal-header-padding-y',
    MODAL_TOKENS.header.paddingY,
  );
  root.style.setProperty(
    '--luma-modal-header-border-color',
    MODAL_TOKENS.header.borderColor,
  );

  // Title tokens
  root.style.setProperty('--luma-modal-title-color', MODAL_TOKENS.title.color);
  root.style.setProperty(
    '--luma-modal-title-font-weight',
    MODAL_TOKENS.title.fontWeight,
  );

  // Content tokens
  root.style.setProperty(
    '--luma-modal-content-padding-x',
    MODAL_TOKENS.content.paddingX,
  );
  root.style.setProperty(
    '--luma-modal-content-padding-y',
    MODAL_TOKENS.content.paddingY,
  );

  // Footer tokens
  root.style.setProperty(
    '--luma-modal-footer-padding-x',
    MODAL_TOKENS.footer.paddingX,
  );
  root.style.setProperty(
    '--luma-modal-footer-padding-y',
    MODAL_TOKENS.footer.paddingY,
  );
  root.style.setProperty(
    '--luma-modal-footer-border-color',
    MODAL_TOKENS.footer.borderColor,
  );

  // Close tokens
  root.style.setProperty('--luma-modal-close-color', MODAL_TOKENS.close.color);
  root.style.setProperty(
    '--luma-modal-close-bg-hover',
    MODAL_TOKENS.close.bgHover,
  );
  root.style.setProperty(
    '--luma-modal-close-radius',
    MODAL_TOKENS.close.radius,
  );

  // Transition tokens
  root.style.setProperty(
    '--luma-modal-transition-duration',
    MODAL_TOKENS.transition.duration,
  );
  root.style.setProperty(
    '--luma-modal-transition-timing',
    MODAL_TOKENS.transition.timing,
  );
}

function cleanupModalTokens(): void {
  const root = document.documentElement;

  root.style.removeProperty('--luma-modal-overlay-bg');
  root.style.removeProperty('--luma-modal-container-bg');
  root.style.removeProperty('--luma-modal-container-radius');
  root.style.removeProperty('--luma-modal-container-shadow');
  root.style.removeProperty('--luma-modal-header-padding-x');
  root.style.removeProperty('--luma-modal-header-padding-y');
  root.style.removeProperty('--luma-modal-header-border-color');
  root.style.removeProperty('--luma-modal-title-color');
  root.style.removeProperty('--luma-modal-title-font-weight');
  root.style.removeProperty('--luma-modal-content-padding-x');
  root.style.removeProperty('--luma-modal-content-padding-y');
  root.style.removeProperty('--luma-modal-footer-padding-x');
  root.style.removeProperty('--luma-modal-footer-padding-y');
  root.style.removeProperty('--luma-modal-footer-border-color');
  root.style.removeProperty('--luma-modal-close-color');
  root.style.removeProperty('--luma-modal-close-bg-hover');
  root.style.removeProperty('--luma-modal-close-radius');
  root.style.removeProperty('--luma-modal-transition-duration');
  root.style.removeProperty('--luma-modal-transition-timing');

  // Clean up body styles
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

// ============================================
// TEST HOST COMPONENTS
// ============================================

@Component({
  template: `
    <luma-modal
      [lmOpen]="lmOpen()"
      [lmDefaultOpen]="lmDefaultOpen"
      [lmSize]="lmSize"
      [lmCloseOnOverlay]="lmCloseOnOverlay"
      [lmCloseOnEscape]="lmCloseOnEscape"
      (lmOpenChange)="onOpenChange($event)"
    >
      <luma-modal-overlay>
        <luma-modal-container>
          <luma-modal-close />

          <div lumaModalHeader>
            <h2 lumaModalTitle [lmSize]="titleSize">Modal Title</h2>
          </div>

          <div lumaModalContent [lmScrollable]="scrollable">
            <p>Modal content</p>
            <button id="focusable-1">Button 1</button>
            <button id="focusable-2">Button 2</button>
          </div>

          <div lumaModalFooter [lmAlign]="footerAlign">
            <button id="cancel-btn">Cancel</button>
            <button id="confirm-btn">Confirm</button>
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
    LmModalCloseComponent,
  ],
})
class ModalTestHostComponent {
  lmOpen = signal<boolean | null>(null);
  lmDefaultOpen = false;
  lmSize: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  lmCloseOnOverlay = true;
  lmCloseOnEscape = true;
  titleSize: 'sm' | 'md' | 'lg' = 'md';
  scrollable = true;
  footerAlign: 'start' | 'center' | 'end' | 'between' = 'end';

  openChanges: boolean[] = [];
  onOpenChange(value: boolean): void {
    this.openChanges.push(value);
  }
}

@Component({
  template: `
    <luma-modal #modal [lmDefaultOpen]="true">
      <luma-modal-overlay>
        <luma-modal-container>
          <div lumaModalContent>Content</div>
        </luma-modal-container>
      </luma-modal-overlay>
    </luma-modal>
  `,
  imports: [
    LmModalComponent,
    LmModalOverlayComponent,
    LmModalContainerComponent,
    LmModalContentDirective,
  ],
})
class UncontrolledModalTestHostComponent {}

// ============================================
// TEST SUITES
// ============================================

describe('Modal', () => {
  // ============================================
  // MODAL COMPONENT TESTS
  // ============================================

  describe('LmModalComponent', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent, UncontrolledModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    describe('Basic Creation', () => {
      it('should create the component', () => {
        fixture.detectChanges();
        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        expect(modal).toBeTruthy();
      });

      it('should have data-state attribute', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        expect(modal.nativeElement.getAttribute('data-state')).toBe('open');
      });

      it('should have data-state closed when not open', () => {
        hostComponent.lmOpen.set(false);
        fixture.detectChanges();

        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        expect(modal.nativeElement.getAttribute('data-state')).toBe('closed');
      });
    });

    describe('Design Token Definition', () => {
      it('should define --luma-modal-overlay-bg CSS variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-modal-overlay-bg')
          .trim();
        expect(value).toBe(MODAL_TOKENS.overlay.bg);
      });

      it('should define --luma-modal-container-radius CSS variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-modal-container-radius')
          .trim();
        expect(value).toBe(MODAL_TOKENS.container.radius);
      });

      it('should define --luma-modal-transition-duration CSS variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-modal-transition-duration')
          .trim();
        expect(value).toBe(MODAL_TOKENS.transition.duration);
      });

      it('should define --luma-modal-transition-timing CSS variable', () => {
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue('--luma-modal-transition-timing')
          .trim();
        expect(value).toBe(MODAL_TOKENS.transition.timing);
      });
    });

    describe('Controlled Mode', () => {
      it('should show modal when lmOpen is true', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const overlay = fixture.debugElement.query(
          By.directive(LmModalOverlayComponent),
        );
        expect(overlay).toBeTruthy();
      });

      it('should hide modal when lmOpen is false', () => {
        hostComponent.lmOpen.set(false);
        fixture.detectChanges();

        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        expect(modal.nativeElement.getAttribute('data-state')).toBe('closed');
      });

      it('should emit lmOpenChange when close is called', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        modal.componentInstance.close();

        expect(hostComponent.openChanges).toContain(false);
      });

      it('should emit lmOpenChange when open is called', () => {
        hostComponent.lmOpen.set(false);
        fixture.detectChanges();

        const modal = fixture.debugElement.query(
          By.directive(LmModalComponent),
        );
        modal.componentInstance.open();

        expect(hostComponent.openChanges).toContain(true);
      });
    });

    describe('Uncontrolled Mode', () => {
      it('should use lmDefaultOpen for initial state', () => {
        const uncontrolledFixture = TestBed.createComponent(
          UncontrolledModalTestHostComponent,
        );
        uncontrolledFixture.detectChanges();

        const overlay = uncontrolledFixture.debugElement.query(
          By.directive(LmModalOverlayComponent),
        );
        expect(overlay).toBeTruthy();
      });
    });

    describe('Size Variants', () => {
      beforeEach(() => {
        hostComponent.lmOpen.set(true);
      });

      it('should apply sm size classes', () => {
        hostComponent.lmSize = 'sm';
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.componentInstance.classes()).toContain('max-w-sm');
      });

      it('should apply md size classes (default)', () => {
        hostComponent.lmSize = 'md';
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.componentInstance.classes()).toContain('max-w-md');
      });

      it('should apply lg size classes', () => {
        hostComponent.lmSize = 'lg';
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.componentInstance.classes()).toContain('max-w-lg');
      });

      it('should apply xl size classes', () => {
        hostComponent.lmSize = 'xl';
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.componentInstance.classes()).toContain('max-w-xl');
      });

      it('should apply full size classes', () => {
        hostComponent.lmSize = 'full';
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.componentInstance.classes()).toContain('w-[95vw]');
        expect(container.componentInstance.classes()).toContain('h-[95vh]');
      });
    });

    describe('Close on Overlay Click', () => {
      beforeEach(() => {
        hostComponent.lmOpen.set(true);
      });

      it('should close when clicking overlay (default)', () => {
        hostComponent.lmCloseOnOverlay = true;
        fixture.detectChanges();

        const overlay = fixture.debugElement.query(
          By.directive(LmModalOverlayComponent),
        );
        overlay.nativeElement.click();

        expect(hostComponent.openChanges).toContain(false);
      });

      it('should not close when clicking overlay if disabled', () => {
        hostComponent.lmCloseOnOverlay = false;
        fixture.detectChanges();
        hostComponent.openChanges = [];

        const overlay = fixture.debugElement.query(
          By.directive(LmModalOverlayComponent),
        );
        overlay.nativeElement.click();

        expect(hostComponent.openChanges).not.toContain(false);
      });

      it('should not close when clicking inside container', () => {
        hostComponent.lmCloseOnOverlay = true;
        fixture.detectChanges();
        hostComponent.openChanges = [];

        const content = fixture.debugElement.query(
          By.directive(LmModalContentDirective),
        );
        content.nativeElement.click();

        // Should not emit close
        expect(hostComponent.openChanges).not.toContain(false);
      });
    });

    describe('Close on Escape Key', () => {
      beforeEach(() => {
        hostComponent.lmOpen.set(true);
      });

      it('should close when pressing Escape (default)', () => {
        hostComponent.lmCloseOnEscape = true;
        fixture.detectChanges();

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        expect(hostComponent.openChanges).toContain(false);
      });

      it('should not close when pressing Escape if disabled', () => {
        hostComponent.lmCloseOnEscape = false;
        fixture.detectChanges();
        hostComponent.openChanges = [];

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(event);

        expect(hostComponent.openChanges).not.toContain(false);
      });
    });

    describe('Body Scroll Lock', () => {
      it('should lock body scroll when modal opens', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        expect(document.body.style.overflow).toBe('hidden');
      });

      it('should unlock body scroll when modal closes', async () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        hostComponent.lmOpen.set(false);
        fixture.detectChanges();

        // Wait for the 250ms setTimeout in unlockBodyScroll
        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(document.body.style.overflow).toBe('');
      });
    });
  });

  // ============================================
  // MODAL CONTAINER TESTS
  // ============================================

  describe('LmModalContainerComponent', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    describe('Accessibility', () => {
      it('should have role="dialog"', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.nativeElement.getAttribute('role')).toBe('dialog');
      });

      it('should have aria-modal="true"', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        expect(container.nativeElement.getAttribute('aria-modal')).toBe('true');
      });

      it('should have aria-labelledby pointing to title', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        const ariaLabelledBy =
          container.nativeElement.getAttribute('aria-labelledby');
        expect(ariaLabelledBy).toContain('title');

        const title = fixture.debugElement.query(
          By.directive(LmModalTitleDirective),
        );
        expect(title.nativeElement.id).toBe(ariaLabelledBy);
      });
    });

    describe('Class Application', () => {
      it('should apply base container classes', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        const classes = container.componentInstance.classes();

        expect(classes).toContain('relative');
        expect(classes).toContain('z-50');
        expect(classes).toContain('flex');
        expect(classes).toContain('flex-col');
        expect(classes).toContain('lm-bg-modal');
        expect(classes).toContain('lm-rounded-modal');
        expect(classes).toContain('lm-shadow-modal');
      });

      it('should apply open state classes', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const container = fixture.debugElement.query(
          By.directive(LmModalContainerComponent),
        );
        const classes = container.componentInstance.classes();

        expect(classes).toContain('opacity-100');
        expect(classes).toContain('visible');
      });
    });
  });

  // ============================================
  // MODAL HEADER TESTS
  // ============================================

  describe('LmModalHeaderDirective', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should apply header classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const headerEl = fixture.debugElement.query(
        By.directive(LmModalHeaderDirective),
      );
      const directive = headerEl.injector.get(LmModalHeaderDirective);
      const classes = directive.classes();

      expect(classes).toContain('relative');
      expect(classes).toContain('flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-between');
      expect(classes).toContain('lm-px-modal-header');
      expect(classes).toContain('lm-py-modal-header');
      expect(classes).toContain('shrink-0');
    });
  });

  // ============================================
  // MODAL TITLE TESTS
  // ============================================

  describe('LmModalTitleDirective', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should apply title classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(
        By.directive(LmModalTitleDirective),
      );
      const directive = titleEl.injector.get(LmModalTitleDirective);
      const classes = directive.classes();

      expect(classes).toContain('lm-text-modal-title');
      expect(classes).toContain('lm-font-modal-title');
    });

    it('should have unique ID for aria-labelledby', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const titleEl = fixture.debugElement.query(
        By.directive(LmModalTitleDirective),
      );
      expect(titleEl.nativeElement.id).toBeTruthy();
      expect(titleEl.nativeElement.id).toContain('modal');
      expect(titleEl.nativeElement.id).toContain('title');
    });

    describe('Size Variants', () => {
      it('should apply md size classes (default)', () => {
        hostComponent.lmOpen.set(true);
        fixture.detectChanges();

        const titleEl = fixture.debugElement.query(
          By.directive(LmModalTitleDirective),
        );
        const directive = titleEl.injector.get(LmModalTitleDirective);
        expect(directive.classes()).toContain('text-lg');
      });
    });
  });

  // ============================================
  // MODAL CONTENT TESTS
  // ============================================

  describe('LmModalContentDirective', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should apply content classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(
        By.directive(LmModalContentDirective),
      );
      const directive = contentEl.injector.get(LmModalContentDirective);
      const classes = directive.classes();

      expect(classes).toContain('lm-px-modal-content');
      expect(classes).toContain('lm-py-modal-content');
      expect(classes).toContain('flex-1');
      expect(classes).toContain('min-h-0');
    });

    it('should apply scrollable classes when enabled', () => {
      hostComponent.lmOpen.set(true);
      hostComponent.scrollable = true;
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(
        By.directive(LmModalContentDirective),
      );
      const directive = contentEl.injector.get(LmModalContentDirective);
      expect(directive.classes()).toContain('overflow-y-auto');
    });

    it('should not apply scrollable classes when disabled', () => {
      hostComponent.lmOpen.set(true);
      hostComponent.scrollable = false;
      fixture.detectChanges();

      const contentEl = fixture.debugElement.query(
        By.directive(LmModalContentDirective),
      );
      const directive = contentEl.injector.get(LmModalContentDirective);
      expect(directive.classes()).toContain('overflow-visible');
    });
  });

  // ============================================
  // MODAL FOOTER TESTS
  // ============================================

  describe('LmModalFooterDirective', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should apply footer classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const footerEl = fixture.debugElement.query(
        By.directive(LmModalFooterDirective),
      );
      const directive = footerEl.injector.get(LmModalFooterDirective);
      const classes = directive.classes();

      expect(classes).toContain('flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('gap-3');
      expect(classes).toContain('lm-px-modal-footer');
      expect(classes).toContain('lm-py-modal-footer');
      expect(classes).toContain('shrink-0');
    });

    describe('Alignment Variants', () => {
      it('should apply end alignment classes (default)', () => {
        hostComponent.lmOpen.set(true);
        hostComponent.footerAlign = 'end';
        fixture.detectChanges();

        const footerEl = fixture.debugElement.query(
          By.directive(LmModalFooterDirective),
        );
        const directive = footerEl.injector.get(LmModalFooterDirective);
        expect(directive.classes()).toContain('justify-end');
      });

      it('should apply start alignment classes', () => {
        hostComponent.lmOpen.set(true);
        hostComponent.footerAlign = 'start';
        fixture.detectChanges();

        const footerEl = fixture.debugElement.query(
          By.directive(LmModalFooterDirective),
        );
        const directive = footerEl.injector.get(LmModalFooterDirective);
        expect(directive.classes()).toContain('justify-start');
      });

      it('should apply center alignment classes', () => {
        hostComponent.lmOpen.set(true);
        hostComponent.footerAlign = 'center';
        fixture.detectChanges();

        const footerEl = fixture.debugElement.query(
          By.directive(LmModalFooterDirective),
        );
        const directive = footerEl.injector.get(LmModalFooterDirective);
        expect(directive.classes()).toContain('justify-center');
      });

      it('should apply between alignment classes', () => {
        hostComponent.lmOpen.set(true);
        hostComponent.footerAlign = 'between';
        fixture.detectChanges();

        const footerEl = fixture.debugElement.query(
          By.directive(LmModalFooterDirective),
        );
        const directive = footerEl.injector.get(LmModalFooterDirective);
        expect(directive.classes()).toContain('justify-between');
      });
    });
  });

  // ============================================
  // MODAL CLOSE BUTTON TESTS
  // ============================================

  describe('LmModalCloseComponent', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should render close button', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(
        By.directive(LmModalCloseComponent),
      );
      expect(closeButton).toBeTruthy();
    });

    it('should have button element with type="button"', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(
        By.css('luma-modal-close button'),
      );
      expect(closeButton).toBeTruthy();
      expect(closeButton.nativeElement.getAttribute('type')).toBe('button');
    });

    it('should have default aria-label', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(
        By.css('luma-modal-close button'),
      );
      expect(closeButton.nativeElement.getAttribute('aria-label')).toBe(
        'Close modal',
      );
    });

    it('should close modal when clicked', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const closeButton = fixture.debugElement.query(
        By.css('luma-modal-close button'),
      );
      closeButton.nativeElement.click();

      expect(hostComponent.openChanges).toContain(false);
    });

    it('should apply close button classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const closeComponent = fixture.debugElement.query(
        By.directive(LmModalCloseComponent),
      );
      const classes = closeComponent.componentInstance.classes();

      expect(classes).toContain('absolute');
      expect(classes).toContain('top-3');
      expect(classes).toContain('right-3');
      expect(classes).toContain('lm-rounded-modal-close');
      expect(classes).toContain('lm-text-modal-close');
    });
  });

  // ============================================
  // MODAL OVERLAY TESTS
  // ============================================

  describe('LmModalOverlayComponent', () => {
    let fixture: ComponentFixture<ModalTestHostComponent>;
    let hostComponent: ModalTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ModalTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ModalTestHostComponent);
      hostComponent = fixture.componentInstance;
      setupModalTokens();
    });

    afterEach(() => {
      cleanupModalTokens();
    });

    it('should apply overlay classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const overlay = fixture.debugElement.query(
        By.directive(LmModalOverlayComponent),
      );
      const classes = overlay.componentInstance.classes();

      expect(classes).toContain('fixed');
      expect(classes).toContain('inset-0');
      expect(classes).toContain('z-50');
      expect(classes).toContain('flex');
      expect(classes).toContain('items-center');
      expect(classes).toContain('justify-center');
      expect(classes).toContain('lm-bg-modal-overlay');
    });

    it('should apply visible state classes', () => {
      hostComponent.lmOpen.set(true);
      fixture.detectChanges();

      const overlay = fixture.debugElement.query(
        By.directive(LmModalOverlayComponent),
      );
      const classes = overlay.componentInstance.classes();

      expect(classes).toContain('opacity-100');
    });
  });
});
