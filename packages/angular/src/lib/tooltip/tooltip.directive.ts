import {
  Directive,
  ElementRef,
  HostListener,
  NgZone,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { tooltipVariants, type TooltipPosition } from '@lumaui/core';

const TOOLTIP_GAP = 8;

@Directive({
  selector: '[lumaTooltip]',
  host: {
    '[attr.aria-describedby]': 'tooltipId',
  },
})
export class LmTooltipDirective implements OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);

  // Inputs with lm prefix following Lumo convention
  lumaTooltip = input.required<string>();
  lmPosition = input<TooltipPosition>('top');
  lmHtml = input<boolean>(false);
  lmTrigger = input<'hover' | 'click' | 'focus'>('hover');
  lmDelay = input<number>(0);

  // State
  isVisible = signal(false);
  actualPosition = signal<TooltipPosition>('top');
  tooltipId = `tooltip-${Math.random().toString(36).slice(2, 9)}`;

  private tooltipElement: HTMLElement | null = null;
  private showTimeout: ReturnType<typeof setTimeout> | null = null;
  private scrollListener: (() => void) | null = null;
  private resizeListener: (() => void) | null = null;
  private captureScrollHandler: (() => void) | null = null;

  classes = computed(() =>
    tooltipVariants({
      visible: this.isVisible(),
    }),
  );

  constructor() {
    // Create and update tooltip element reactively
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.ensureTooltipElement();
        this.updateContent();
        this.updateClasses();
      }
    });
  }

  private ensureTooltipElement(): void {
    if (this.tooltipElement) return;

    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.setAttribute(this.tooltipElement, 'id', this.tooltipId);
    this.renderer.setAttribute(this.tooltipElement, 'role', 'tooltip');
    // Portal: append to document.body to avoid overflow clipping
    this.renderer.appendChild(this.document.body, this.tooltipElement);
  }

  private updateContent(): void {
    if (!this.tooltipElement) return;

    const content = this.lumaTooltip();
    if (this.lmHtml()) {
      this.tooltipElement.innerHTML = content;
    } else {
      this.tooltipElement.textContent = content;
    }
  }

  private updateClasses(): void {
    if (!this.tooltipElement) return;
    this.tooltipElement.className = this.classes();
  }

  private updatePosition(): void {
    if (!this.tooltipElement || !isPlatformBrowser(this.platformId)) return;

    const triggerRect = this.el.nativeElement.getBoundingClientRect();
    const position = this.actualPosition();

    let top: number;
    let left: number;
    let transform: string;

    switch (position) {
      case 'top':
        left = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.top - TOOLTIP_GAP;
        transform = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        left = triggerRect.left + triggerRect.width / 2;
        top = triggerRect.bottom + TOOLTIP_GAP;
        transform = 'translate(-50%, 0%)';
        break;
      case 'left':
        left = triggerRect.left - TOOLTIP_GAP;
        top = triggerRect.top + triggerRect.height / 2;
        transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        left = triggerRect.right + TOOLTIP_GAP;
        top = triggerRect.top + triggerRect.height / 2;
        transform = 'translate(0%, -50%)';
        break;
    }

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'transform', transform);
  }

  private addPositionListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Run outside Angular zone for performance — no change detection needed
    this.ngZone.runOutsideAngular(() => {
      const onReposition = () => this.updatePosition();

      this.scrollListener = this.renderer.listen(
        'window',
        'scroll',
        onReposition,
      );
      // Capture phase catches scroll events on any ancestor
      this.document.addEventListener('scroll', onReposition, true);
      this.captureScrollHandler = onReposition;
      this.resizeListener = this.renderer.listen(
        'window',
        'resize',
        onReposition,
      );
    });
  }

  private removePositionListeners(): void {
    if (this.scrollListener) {
      this.scrollListener();
      this.scrollListener = null;
    }
    if (this.resizeListener) {
      this.resizeListener();
      this.resizeListener = null;
    }
    // Remove capture-phase scroll listener
    if (this.captureScrollHandler) {
      this.document.removeEventListener(
        'scroll',
        this.captureScrollHandler,
        true,
      );
      this.captureScrollHandler = null;
    }
  }

  private isTouchDevice(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  private getFlippedPosition(preferred: TooltipPosition): TooltipPosition {
    if (!this.tooltipElement || !isPlatformBrowser(this.platformId)) {
      return preferred;
    }

    const triggerRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    switch (preferred) {
      case 'top':
        if (triggerRect.top - tooltipRect.height - TOOLTIP_GAP < 0) {
          return 'bottom';
        }
        break;
      case 'bottom':
        if (
          triggerRect.bottom + tooltipRect.height + TOOLTIP_GAP >
          viewportHeight
        ) {
          return 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width - TOOLTIP_GAP < 0) {
          return 'right';
        }
        break;
      case 'right':
        if (
          triggerRect.right + tooltipRect.width + TOOLTIP_GAP >
          viewportWidth
        ) {
          return 'left';
        }
        break;
    }

    return preferred;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    // Ignore hover on touch devices
    if (this.isTouchDevice()) return;
    if (this.lmTrigger() !== 'hover') return;
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.isTouchDevice()) return;
    if (this.lmTrigger() !== 'hover') return;
    this.hide();
  }

  @HostListener('click')
  onClick(): void {
    // On touch devices, click acts as toggle even with trigger='hover'
    if (this.isTouchDevice() || this.lmTrigger() === 'click') {
      this.toggle();
    }
  }

  @HostListener('focus')
  onFocus(): void {
    if (this.lmTrigger() === 'focus' || this.lmTrigger() === 'hover') {
      this.show();
    }
  }

  @HostListener('blur')
  onBlur(): void {
    if (this.lmTrigger() === 'focus' || this.lmTrigger() === 'hover') {
      this.hide();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.hide();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.lmTrigger() !== 'click' && !this.isTouchDevice()) return;
    const target = event.target as Node;
    // Check both trigger and portal tooltip (tooltip is now in body, not trigger)
    if (
      !this.el.nativeElement.contains(target) &&
      !this.tooltipElement?.contains(target)
    ) {
      this.hide();
    }
  }

  @HostListener('document:touchstart', ['$event'])
  onDocumentTouch(event: TouchEvent): void {
    if (!this.isVisible()) return;
    const target = event.target as Node;
    if (
      !this.el.nativeElement.contains(target) &&
      !this.tooltipElement?.contains(target)
    ) {
      this.hide();
    }
  }

  show(): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);

    const delay = this.lmDelay();
    const showAction = () => {
      // Calculate position with auto-flip
      const actualPosition = this.getFlippedPosition(this.lmPosition());
      this.actualPosition.set(actualPosition);
      this.isVisible.set(true);
      this.updateClasses();
      // Position after DOM paint so tooltip dimensions are available
      requestAnimationFrame(() => {
        this.updatePosition();
        this.addPositionListeners();
      });
    };

    if (delay > 0) {
      this.showTimeout = setTimeout(showAction, delay);
    } else {
      showAction();
    }
  }

  hide(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = null;
    }
    this.isVisible.set(false);
    this.updateClasses();
    this.removePositionListeners();
  }

  toggle(): void {
    if (this.isVisible()) {
      this.hide();
    } else {
      this.show();
    }
  }

  ngOnDestroy(): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    this.removePositionListeners();
    if (this.tooltipElement) {
      this.renderer.removeChild(this.document.body, this.tooltipElement);
    }
  }
}
