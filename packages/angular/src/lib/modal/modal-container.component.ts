import {
  Component,
  ChangeDetectionStrategy,
  inject,
  computed,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  effect,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { modalContainerVariants } from '@lumaui/core';
import { MODAL_CONTEXT } from './modal.tokens';

/** Focusable elements selector */
const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Modal container component (dialog box)
 *
 * Contains the modal content and handles:
 * - ARIA attributes for accessibility
 * - Focus trap when modal is open
 * - Size variants
 *
 * @example
 * ```html
 * <luma-modal-overlay>
 *   <luma-modal-container>
 *     <div lumaModalHeader>...</div>
 *     <div lumaModalContent>...</div>
 *     <div lumaModalFooter>...</div>
 *   </luma-modal-container>
 * </luma-modal-overlay>
 * ```
 */
@Component({
  selector: 'luma-modal-container',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    '[attr.aria-modal]': 'true',
    '[attr.aria-labelledby]': 'titleId()',
    '[class]': 'classes()',
    '[attr.data-state]': 'modal.isOpen() ? "open" : "closed"',
  },
})
export class ModalContainerComponent implements AfterViewInit, OnDestroy {
  readonly modal = inject(MODAL_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  /** Focus trap keydown handler */
  private focusTrapHandler: ((e: KeyboardEvent) => void) | null = null;

  /** ID for aria-labelledby */
  titleId = computed(() => `${this.modal.modalId}-title`);

  /** Computed classes from CVA */
  classes = computed(() =>
    modalContainerVariants({
      size: this.modal.size(),
      open: this.modal.isOpen(),
    }),
  );

  constructor() {
    // Focus first focusable element when modal opens
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.modal.isOpen()) {
        // Use setTimeout to ensure content is rendered
        setTimeout(() => this.focusFirstElement(), 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupFocusTrap();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.removeFocusTrap();
    }
  }

  /**
   * Get all focusable elements within the modal
   */
  private getFocusableElements(): HTMLElement[] {
    const elements =
      this.elementRef.nativeElement.querySelectorAll(FOCUSABLE_SELECTOR);
    const elementsArray = Array.from(elements) as HTMLElement[];
    return elementsArray.filter(
      (el) =>
        !el.hasAttribute('disabled') && el.getAttribute('tabindex') !== '-1',
    );
  }

  /**
   * Focus the first focusable element
   */
  private focusFirstElement(): void {
    const focusable = this.getFocusableElements();
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      // If no focusable elements, focus the container itself
      this.elementRef.nativeElement.focus();
    }
  }

  /**
   * Setup focus trap to keep focus within modal
   */
  private setupFocusTrap(): void {
    this.focusTrapHandler = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !this.modal.isOpen()) return;

      const focusable = this.getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      // Shift+Tab on first element -> focus last
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab on last element -> focus first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    this.elementRef.nativeElement.addEventListener(
      'keydown',
      this.focusTrapHandler,
    );
  }

  /**
   * Remove focus trap handler
   */
  private removeFocusTrap(): void {
    if (this.focusTrapHandler) {
      this.elementRef.nativeElement.removeEventListener(
        'keydown',
        this.focusTrapHandler,
      );
      this.focusTrapHandler = null;
    }
  }
}
