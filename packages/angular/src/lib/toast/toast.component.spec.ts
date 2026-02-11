import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';

import {
  DEFAULT_TOAST_CONFIG,
  Toast,
  provideToastConfig,
} from './toast.tokens';
import { LmToastService } from './toast.service';
import { LmToastItemComponent } from './toast-item.component';

// ============================================
// HELPER FUNCTIONS
// ============================================

function createMockToast(overrides: Partial<Toast> = {}): Toast {
  return {
    id: 'toast-1',
    message: 'Test message',
    title: '',
    variant: 'info',
    position: 'top-right',
    duration: 5000,
    dismissible: true,
    pauseOnHover: true,
    role: 'status',
    createdAt: Date.now(),
    isExiting: false,
    ...overrides,
  };
}

// ============================================
// TEST HOST COMPONENTS
// ============================================

@Component({
  template: `
    <luma-toast-item [toast]="toast()" (dismiss)="onDismiss($event)" />
  `,
  imports: [LmToastItemComponent],
})
class ToastItemTestHostComponent {
  toast = signal<Toast>(createMockToast());
  dismissedIds: string[] = [];

  onDismiss(id: string): void {
    this.dismissedIds.push(id);
  }
}

@Component({
  template: `
    <luma-toast-item [toast]="toast()" (dismiss)="onDismiss($event)" />
  `,
  imports: [LmToastItemComponent],
})
class ToastItemWithTitleTestHostComponent {
  toast = signal<Toast>(
    createMockToast({ title: 'Test Title', message: 'Test message' }),
  );
  dismissedIds: string[] = [];

  onDismiss(id: string): void {
    this.dismissedIds.push(id);
  }
}

@Component({
  template: `
    <luma-toast-item [toast]="toast()" (dismiss)="onDismiss($event)" />
  `,
  imports: [LmToastItemComponent],
})
class ToastItemNonDismissibleTestHostComponent {
  toast = signal<Toast>(createMockToast({ dismissible: false }));
  dismissedIds: string[] = [];

  onDismiss(id: string): void {
    this.dismissedIds.push(id);
  }
}

@Component({
  template: `
    <luma-toast-item [toast]="toast()" (dismiss)="onDismiss($event)" />
  `,
  imports: [LmToastItemComponent],
})
class ToastItemErrorTestHostComponent {
  toast = signal<Toast>(createMockToast({ variant: 'error', role: 'alert' }));
  dismissedIds: string[] = [];

  onDismiss(id: string): void {
    this.dismissedIds.push(id);
  }
}

// ============================================
// TOAST SERVICE TESTS
// ============================================

describe('LmToastService', () => {
  let service: LmToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LmToastService,
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(LmToastService);
  });

  afterEach(() => {
    service.dismissAll();
    vi.clearAllMocks();
  });

  describe('show()', () => {
    it('should create a toast with required message', () => {
      const ref = service.show({ message: 'Test message' });

      expect(ref.id).toBeDefined();
      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('Test message');
    });

    it('should use default variant "info" when not specified', () => {
      service.show({ message: 'Test' });

      expect(service.toasts()[0].variant).toBe('info');
    });

    it('should use default position from config', () => {
      service.show({ message: 'Test' });

      expect(service.toasts()[0].position).toBe(DEFAULT_TOAST_CONFIG.position);
    });

    it('should override defaults with provided options', () => {
      service.show({
        message: 'Test',
        variant: 'error',
        position: 'bottom-left',
        duration: 10000,
      });

      const toast = service.toasts()[0];
      expect(toast.variant).toBe('error');
      expect(toast.position).toBe('bottom-left');
      expect(toast.duration).toBe(10000);
    });

    it('should set role to "alert" for error variant', () => {
      service.show({ message: 'Error', variant: 'error' });

      expect(service.toasts()[0].role).toBe('alert');
    });

    it('should set role to "status" for non-error variants', () => {
      service.show({ message: 'Info', variant: 'info' });
      service.show({ message: 'Success', variant: 'success' });
      service.show({ message: 'Warning', variant: 'warning' });

      expect(service.toasts()[0].role).toBe('status');
      expect(service.toasts()[1].role).toBe('status');
      expect(service.toasts()[2].role).toBe('status');
    });
  });

  describe('convenience methods', () => {
    it('info() should create info toast', () => {
      service.info('Info message');

      expect(service.toasts()[0].variant).toBe('info');
      expect(service.toasts()[0].message).toBe('Info message');
    });

    it('success() should create success toast', () => {
      service.success('Success message');

      expect(service.toasts()[0].variant).toBe('success');
    });

    it('warning() should create warning toast', () => {
      service.warning('Warning message');

      expect(service.toasts()[0].variant).toBe('warning');
    });

    it('error() should create error toast', () => {
      service.error('Error message');

      expect(service.toasts()[0].variant).toBe('error');
    });

    it('should accept additional options', () => {
      service.success('Message', { title: 'Title', duration: 0 });

      const toast = service.toasts()[0];
      expect(toast.title).toBe('Title');
      expect(toast.duration).toBe(0);
    });
  });

  describe('dismiss()', () => {
    it('should mark toast as exiting', () => {
      const ref = service.show({ message: 'Test' });

      service.dismiss(ref.id);

      expect(service.toasts()[0].isExiting).toBe(true);
    });

    it('should remove toast after animation delay', async () => {
      const ref = service.show({ message: 'Test' });

      service.dismiss(ref.id);
      expect(service.toasts().length).toBe(1);

      await new Promise((resolve) => setTimeout(resolve, 250));
      expect(service.toasts().length).toBe(0);
    });

    it('should notify afterDismissed observable', async () => {
      const ref = service.show({ message: 'Test' });
      let dismissed = false;

      ref.afterDismissed.subscribe(() => {
        dismissed = true;
      });

      service.dismiss(ref.id);
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(dismissed).toBe(true);
    });
  });

  describe('dismissAll()', () => {
    it('should dismiss all toasts', async () => {
      service.show({ message: 'Toast 1' });
      service.show({ message: 'Toast 2' });
      service.show({ message: 'Toast 3' });

      expect(service.toasts().length).toBe(3);

      service.dismissAll();
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(service.toasts().length).toBe(0);
    });
  });

  describe('ToastRef', () => {
    it('dismiss() should dismiss the toast', async () => {
      const ref = service.show({ message: 'Test' });

      ref.dismiss();
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(service.toasts().length).toBe(0);
    });
  });

  describe('maxVisible limit', () => {
    it('should dismiss oldest toast when limit reached', async () => {
      // Default maxVisible is 5
      for (let i = 1; i <= 5; i++) {
        service.show({ message: `Toast ${i}` });
      }
      expect(service.toasts().length).toBe(5);

      // Adding 6th should dismiss 1st
      service.show({ message: 'Toast 6' });
      await new Promise((resolve) => setTimeout(resolve, 250));

      expect(service.toasts().length).toBe(5);
      expect(service.toasts()[0].message).toBe('Toast 2');
      expect(service.toasts()[4].message).toBe('Toast 6');
    });
  });
});

describe('LmToastService with custom config', () => {
  let service: LmToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LmToastService,
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideToastConfig({
          position: 'bottom-center',
          duration: 3000,
          maxVisible: 3,
        }),
      ],
    });
    service = TestBed.inject(LmToastService);
  });

  afterEach(() => {
    service.dismissAll();
  });

  it('should use custom default position', () => {
    service.show({ message: 'Test' });

    expect(service.toasts()[0].position).toBe('bottom-center');
  });

  it('should use custom default duration', () => {
    service.show({ message: 'Test' });

    expect(service.toasts()[0].duration).toBe(3000);
  });

  it('should respect custom maxVisible', async () => {
    for (let i = 1; i <= 4; i++) {
      service.show({ message: `Toast ${i}` });
    }
    await new Promise((resolve) => setTimeout(resolve, 250));

    expect(service.toasts().length).toBe(3);
    expect(service.toasts()[0].message).toBe('Toast 2');
  });
});

// ============================================
// TOAST ITEM COMPONENT TESTS
// ============================================

describe('LmToastItemComponent', () => {
  describe('Basic Creation', () => {
    let fixture: ComponentFixture<ToastItemTestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastItemTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToastItemTestHostComponent);
    });

    it('should create the component', () => {
      fixture.detectChanges();

      const toastItem = fixture.debugElement.query(
        By.directive(LmToastItemComponent),
      );
      expect(toastItem).toBeTruthy();
    });

    it('should display message', () => {
      fixture.detectChanges();

      const messageEl = fixture.nativeElement.querySelector(
        'luma-toast-item div div',
      );
      expect(messageEl.textContent).toContain('Test message');
    });
  });

  describe('With Title', () => {
    let fixture: ComponentFixture<ToastItemWithTitleTestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastItemWithTitleTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToastItemWithTitleTestHostComponent);
    });

    it('should display title when provided', () => {
      fixture.detectChanges();

      const toastEl = fixture.nativeElement;
      expect(toastEl.textContent).toContain('Test Title');
      expect(toastEl.textContent).toContain('Test message');
    });
  });

  describe('Accessibility', () => {
    describe('Non-Error Variants', () => {
      let fixture: ComponentFixture<ToastItemTestHostComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ToastItemTestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToastItemTestHostComponent);
      });

      it('should have role="status" for non-error variants', () => {
        fixture.detectChanges();

        const toastItem = fixture.debugElement.query(
          By.directive(LmToastItemComponent),
        );
        expect(toastItem.nativeElement.getAttribute('role')).toBe('status');
      });

      it('should have aria-live="polite" for non-error variants', () => {
        fixture.detectChanges();

        const toastItem = fixture.debugElement.query(
          By.directive(LmToastItemComponent),
        );
        expect(toastItem.nativeElement.getAttribute('aria-live')).toBe(
          'polite',
        );
      });

      it('should have aria-atomic="true"', () => {
        fixture.detectChanges();

        const toastItem = fixture.debugElement.query(
          By.directive(LmToastItemComponent),
        );
        expect(toastItem.nativeElement.getAttribute('aria-atomic')).toBe(
          'true',
        );
      });
    });

    describe('Error Variant', () => {
      let fixture: ComponentFixture<ToastItemErrorTestHostComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ToastItemErrorTestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToastItemErrorTestHostComponent);
      });

      it('should have role="alert" for error variant', () => {
        fixture.detectChanges();

        const toastItem = fixture.debugElement.query(
          By.directive(LmToastItemComponent),
        );
        expect(toastItem.nativeElement.getAttribute('role')).toBe('alert');
      });

      it('should have aria-live="assertive" for error variant', () => {
        fixture.detectChanges();

        const toastItem = fixture.debugElement.query(
          By.directive(LmToastItemComponent),
        );
        expect(toastItem.nativeElement.getAttribute('aria-live')).toBe(
          'assertive',
        );
      });
    });
  });

  describe('Close Button', () => {
    describe('When Dismissible', () => {
      let fixture: ComponentFixture<ToastItemTestHostComponent>;
      let hostComponent: ToastItemTestHostComponent;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ToastItemTestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ToastItemTestHostComponent);
        hostComponent = fixture.componentInstance;
      });

      it('should render close button when dismissible', () => {
        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(
          By.css('luma-toast-close'),
        );
        expect(closeButton).toBeTruthy();
      });

      it('should emit dismiss when close clicked', () => {
        fixture.detectChanges();

        // luma-toast-close IS the button (host has type: 'button')
        const closeButton = fixture.debugElement.query(
          By.css('luma-toast-close'),
        );
        closeButton.nativeElement.click();

        expect(hostComponent.dismissedIds).toContain('toast-1');
      });
    });

    describe('When Not Dismissible', () => {
      let fixture: ComponentFixture<ToastItemNonDismissibleTestHostComponent>;

      beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [ToastItemNonDismissibleTestHostComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(
          ToastItemNonDismissibleTestHostComponent,
        );
      });

      it('should not render close button when not dismissible', () => {
        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(
          By.css('luma-toast-close'),
        );
        expect(closeButton).toBeFalsy();
      });
    });
  });

  describe('Keyboard Navigation', () => {
    let fixture: ComponentFixture<ToastItemTestHostComponent>;
    let hostComponent: ToastItemTestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastItemTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToastItemTestHostComponent);
      hostComponent = fixture.componentInstance;
    });

    it('should dismiss on Escape key when dismissible', () => {
      fixture.detectChanges();

      const toastItem = fixture.debugElement.query(
        By.directive(LmToastItemComponent),
      );
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      toastItem.nativeElement.dispatchEvent(event);

      expect(hostComponent.dismissedIds).toContain('toast-1');
    });

    it('should have tabindex 0 when dismissible', () => {
      fixture.detectChanges();

      const toastItem = fixture.debugElement.query(
        By.directive(LmToastItemComponent),
      );
      expect(toastItem.nativeElement.getAttribute('tabindex')).toBe('0');
    });
  });

  describe('Class Application', () => {
    let fixture: ComponentFixture<ToastItemTestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ToastItemTestHostComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ToastItemTestHostComponent);
    });

    it('should apply base item classes', () => {
      fixture.detectChanges();

      const toastItem = fixture.debugElement.query(
        By.directive(LmToastItemComponent),
      );
      const component = toastItem.componentInstance as LmToastItemComponent;
      const classes = component['itemClasses']();

      expect(classes).toContain('flex');
      expect(classes).toContain('items-start');
    });
  });
});
