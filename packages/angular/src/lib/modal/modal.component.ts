import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  effect,
  computed,
  inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import {
  MODAL_CONTEXT,
  type ModalContext,
  type ModalSize,
} from './modal.tokens';

let uniqueId = 0;

/**
 * Modal container component
 *
 * Manages modal open/close state, escape key handling, and provides context
 * to child components (ModalOverlay, ModalContainer, etc.).
 *
 * Supports both controlled and uncontrolled modes:
 * - Controlled: Use [lmOpen] and (lmOpenChange)
 * - Uncontrolled: Use [lmDefaultOpen] and access via template reference
 *
 * @example
 * ```html
 * <!-- Controlled mode -->
 * <luma-modal [lmOpen]="isOpen()" (lmOpenChange)="isOpen.set($event)">
 *   <luma-modal-overlay>
 *     <luma-modal-container>
 *       <div lumaModalHeader>
 *         <h2 lumaModalTitle>Title</h2>
 *         <luma-modal-close />
 *       </div>
 *       <div lumaModalContent>Content</div>
 *       <div lumaModalFooter>
 *         <button lumaButton (click)="isOpen.set(false)">Close</button>
 *       </div>
 *     </luma-modal-container>
 *   </luma-modal-overlay>
 * </luma-modal>
 *
 * <!-- Uncontrolled mode -->
 * <luma-modal #modal [lmDefaultOpen]="false">
 *   ...
 * </luma-modal>
 * <button (click)="modal.open()">Open</button>
 * ```
 */
@Component({
  selector: 'luma-modal',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MODAL_CONTEXT,
      useExisting: LmModalComponent,
    },
  ],
  host: {
    '[attr.data-state]': 'isOpen() ? "open" : "closed"',
  },
})
export class LmModalComponent implements ModalContext, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  /** Controlled open state (null = uncontrolled mode) */
  lmOpen = input<boolean | null>(null);

  /** Default open state for uncontrolled mode */
  lmDefaultOpen = input<boolean>(false);

  /** Size variant */
  lmSize = input<ModalSize>('md');

  /** Close when clicking the overlay */
  lmCloseOnOverlay = input<boolean>(true);

  /** Close when pressing Escape key */
  lmCloseOnEscape = input<boolean>(true);

  /** Emits when open state changes */
  lmOpenChange = output<boolean>();

  /** Internal open state for uncontrolled mode */
  private internalOpen = signal(false);

  /** Unique modal ID for accessibility */
  readonly modalId = `modal-${uniqueId++}`;

  /** Previously focused element for focus restoration */
  private previouslyFocused: HTMLElement | null = null;

  /** Escape key handler */
  private escapeHandler: ((e: KeyboardEvent) => void) | null = null;

  /** Computed: current open state (controlled or uncontrolled) */
  isOpen = computed(() => {
    const controlled = this.lmOpen();
    return controlled !== null ? controlled : this.internalOpen();
  });

  /** Computed: size signal for context */
  size = computed(() => this.lmSize());

  /** Computed: closeOnOverlay signal for context */
  closeOnOverlay = computed(() => this.lmCloseOnOverlay());

  /** Computed: closeOnEscape signal for context */
  closeOnEscape = computed(() => this.lmCloseOnEscape());

  constructor() {
    // Initialize uncontrolled mode with default value
    effect(() => {
      if (this.lmOpen() === null) {
        this.internalOpen.set(this.lmDefaultOpen());
      }
    });

    // Handle body scroll lock and escape key
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      if (this.isOpen()) {
        this.lockBodyScroll();
        this.registerEscapeHandler();
        this.storeFocus();
      } else {
        // Delay scroll unlock to allow fade animation to complete (250ms)
        setTimeout(() => this.unlockBodyScroll(), 250);
        this.unregisterEscapeHandler();
      }
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.unlockBodyScroll();
      this.unregisterEscapeHandler();
    }
  }

  /**
   * Open the modal
   */
  open(): void {
    if (this.lmOpen() === null) {
      this.internalOpen.set(true);
    }
    this.lmOpenChange.emit(true);
  }

  /**
   * Close the modal
   */
  close(): void {
    if (this.lmOpen() === null) {
      this.internalOpen.set(false);
    }
    this.lmOpenChange.emit(false);
    this.restoreFocus();
  }

  private storeFocus(): void {
    this.previouslyFocused = this.document.activeElement as HTMLElement;
  }

  private restoreFocus(): void {
    if (
      this.previouslyFocused &&
      typeof this.previouslyFocused.focus === 'function'
    ) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        this.previouslyFocused?.focus();
        this.previouslyFocused = null;
      }, 0);
    }
  }

  private lockBodyScroll(): void {
    const body = this.document.body;
    const scrollbarWidth =
      window.innerWidth - this.document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  private unlockBodyScroll(): void {
    const body = this.document.body;
    body.style.overflow = '';
    body.style.paddingRight = '';
  }

  private registerEscapeHandler(): void {
    if (this.escapeHandler) return;

    this.escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.lmCloseOnEscape()) {
        event.preventDefault();
        this.close();
      }
    };

    this.document.addEventListener('keydown', this.escapeHandler);
  }

  private unregisterEscapeHandler(): void {
    if (this.escapeHandler) {
      this.document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }
  }
}
