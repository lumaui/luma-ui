import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  LmButtonDirective,
  LmToastService,
  ToastPosition,
} from '@lumaui/angular';

@Component({
  selector: 'app-toast-previews',
  imports: [LmButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('all-variants') {
        <div class="flex flex-wrap gap-2 justify-center">
          <button lumaButton lmVariant="outline" (click)="showInfo()">
            Info
          </button>
          <button lumaButton lmVariant="outline" (click)="showSuccess()">
            Success
          </button>
          <button lumaButton lmVariant="outline" (click)="showWarning()">
            Warning
          </button>
          <button lumaButton lmVariant="outline" (click)="showError()">
            Error
          </button>
        </div>
      }
      @case ('persistent-toast') {
        <div class="flex flex-col items-center gap-4">
          <button lumaButton lmVariant="primary" (click)="showPersistent()">
            Show Persistent Toast
          </button>
          <button lumaButton lmVariant="ghost" (click)="dismissAll()">
            Dismiss All
          </button>
        </div>
      }
      @case ('different-positions') {
        <div class="flex flex-wrap gap-2 justify-center">
          @for (pos of positions; track pos) {
            <button
              lumaButton
              lmVariant="outline"
              (click)="showAtPosition(pos)"
            >
              {{ pos }}
            </button>
          }
        </div>
      }
      @case ('toast-with-title') {
        <div class="flex flex-wrap gap-2 justify-center">
          <button lumaButton lmVariant="outline" (click)="showWithTitle()">
            With Title
          </button>
        </div>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class ToastPreviewsComponent {
  exampleId = input.required<string>();
  private toast = inject(LmToastService);

  positions: ToastPosition[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  showInfo(): void {
    this.toast.info('This is an info message');
  }

  showSuccess(): void {
    this.toast.success('Changes saved successfully!');
  }

  showWarning(): void {
    this.toast.warning('Your session will expire soon');
  }

  showError(): void {
    this.toast.error('Failed to save changes');
  }

  showPersistent(): void {
    this.toast.info('Processing...', { duration: 0 });
  }

  dismissAll(): void {
    this.toast.dismissAll();
  }

  showAtPosition(position: ToastPosition): void {
    this.toast.success(`Toast at ${position}`, { position });
  }

  showWithTitle(): void {
    this.toast.error('Unable to connect to server', {
      title: 'Connection Failed',
    });
  }
}
