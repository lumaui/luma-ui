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
  templateUrl: './export-modal.component.html',
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
