import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  computed,
  effect,
  inject,
  input,
  signal,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tooltipVariants, type TooltipPosition } from '@lumaui/core';

@Directive({
  selector: '[lumaTooltip]',
  host: {
    '[attr.aria-describedby]': 'tooltipId',
    '[style.position]': '"relative"',
  },
})
export class TooltipDirective implements OnDestroy {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);

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

  classes = computed(() =>
    tooltipVariants({
      position: this.actualPosition(),
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
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
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
    const offset = 8; // --luma-tooltip-offset

    switch (preferred) {
      case 'top':
        if (triggerRect.top - tooltipRect.height - offset < 0) {
          return 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height + offset > viewportHeight) {
          return 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width - offset < 0) {
          return 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width + offset > viewportWidth) {
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
    if (!this.el.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  @HostListener('document:touchstart', ['$event'])
  onDocumentTouch(event: TouchEvent): void {
    if (!this.isVisible()) return;
    if (!this.el.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  show(): void {
    if (this.showTimeout) clearTimeout(this.showTimeout);

    const delay = this.lmDelay();
    const showAction = () => {
      this.isVisible.set(true);
      // Calculate position with auto-flip after tooltip is visible
      requestAnimationFrame(() => {
        const actualPosition = this.getFlippedPosition(this.lmPosition());
        this.actualPosition.set(actualPosition);
        this.updateClasses();
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
    if (this.tooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltipElement);
    }
  }
}
