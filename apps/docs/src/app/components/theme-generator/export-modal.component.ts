import {
  Component,
  output,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeGeneratorService } from '../../services/theme-generator.service';
import {
  LmModalComponent,
  LmModalOverlayComponent,
  LmModalContainerComponent,
  LmModalCloseComponent,
  LmModalHeaderDirective,
  LmModalTitleDirective,
  LmModalContentDirective,
  LmModalFooterDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-export-modal',
  imports: [
    FormsModule,
    LmModalComponent,
    LmModalOverlayComponent,
    LmModalContainerComponent,
    LmModalCloseComponent,
    LmModalHeaderDirective,
    LmModalTitleDirective,
    LmModalContentDirective,
    LmModalFooterDirective,
  ],
  template: `
    <luma-modal [lmOpen]="true" (lmOpenChange)="onOpenChange($event)">
      <luma-modal-overlay />
      <luma-modal-container>
        <div lumaModalHeader>
          <h2 lumaModalTitle>Export Theme</h2>
          <luma-modal-close />
        </div>

        <div lumaModalContent>
          <!-- Export Options -->
          <div class="space-y-3 mb-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="exportMode"
                value="both"
                [(ngModel)]="exportMode"
                (change)="updateExport()"
                class="h-4 w-4"
              />
              <span class="text-sm text-foreground">Both themes</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="exportMode"
                value="light"
                [(ngModel)]="exportMode"
                (change)="updateExport()"
                class="h-4 w-4"
              />
              <span class="text-sm text-foreground">Light theme only</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="exportMode"
                value="dark"
                [(ngModel)]="exportMode"
                (change)="updateExport()"
                class="h-4 w-4"
              />
              <span class="text-sm text-foreground">Dark theme only</span>
            </label>
          </div>

          <!-- Token Count -->
          <div class="mb-4 p-3 rounded-lg bg-muted">
            <p class="text-sm text-muted-foreground">
              Exporting <strong class="text-foreground">{{ exportResult().tokenCount }}</strong> modified tokens
            </p>
          </div>

          <!-- Generated CSS -->
          <div class="relative">
            <pre
              class="rounded-md bg-muted p-4 text-xs font-mono text-foreground overflow-x-auto max-h-96"
            >{{ exportResult().css || 'No modifications to export' }}</pre>
            <button
              type="button"
              (click)="copyToClipboard()"
              class="absolute top-2 right-2 rounded-md px-3 py-1.5 text-xs font-medium hover:bg-accent text-foreground transition-colors"
              [disabled]="!exportResult().css"
            >
              {{ copied() ? 'Copied!' : 'Copy' }}
            </button>
          </div>

          <!-- Usage Instructions -->
          <div class="mt-4 p-3 rounded-lg bg-muted">
            <h3 class="text-sm font-semibold text-foreground mb-2">
              Usage Instructions
            </h3>
            <ol class="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Copy the generated CSS above</li>
              <li>Add it to your project's global stylesheet</li>
              <li>Place it after importing Luma tokens</li>
              <li>Your custom theme will override the defaults</li>
            </ol>
          </div>
        </div>

        <div lumaModalFooter>
          <button
            type="button"
            (click)="download()"
            class="rounded-md px-4 py-2 text-sm font-medium hover:bg-accent text-foreground transition-colors"
            [disabled]="!exportResult().css"
          >
            Download
          </button>
          <button
            type="button"
            (click)="closeModal()"
            class="rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </luma-modal-container>
    </luma-modal>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportModalComponent {
  close = output<void>();

  private themeService = inject(ThemeGeneratorService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  readonly exportMode = signal<'light' | 'dark' | 'both'>('both');
  readonly copied = signal(false);

  readonly exportResult = computed(() => {
    return this.themeService.exportTheme(this.exportMode());
  });

  updateExport(): void {
    // Trigger recomputation
    this.exportResult();
  }

  async copyToClipboard(): Promise<void> {
    if (!this.isBrowser) return;

    try {
      await navigator.clipboard.writeText(this.exportResult().css);
      this.copied.set(true);

      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }

  download(): void {
    if (!this.isBrowser) return;

    const css = this.exportResult().css;
    if (!css) return;

    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'luma-custom-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  }

  onOpenChange(open: boolean): void {
    if (!open) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
