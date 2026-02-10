import {
  Component,
  inject,
  ChangeDetectionStrategy,
  effect,
  signal,
} from '@angular/core';
import { ThemeGeneratorService } from '../../services/theme-generator.service';
import { TokenCategoryAccordionComponent } from './token-category-accordion.component';
import { ExportModalComponent } from './export-modal.component';

@Component({
  selector: 'app-theme-generator-drawer',
  imports: [TokenCategoryAccordionComponent, ExportModalComponent],
  templateUrl: './theme-generator-drawer.component.html',
  styles: `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    /* Panel slides in from right */
    .drawer-panel {
      animation: slideIn 200ms ease-out;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeGeneratorDrawerComponent {
  private themeService = inject(ThemeGeneratorService);

  readonly isOpen = this.themeService.isOpen;
  readonly currentTab = this.themeService.currentTab;
  readonly hasModifications = this.themeService.hasModifications;
  readonly showExportModal = signal(false);

  constructor() {
    // Initialize service on mount
    effect(() => {
      if (this.isOpen() && !this.themeService.isInitialized()) {
        this.themeService.initialize();
      }
    });

    // Handle ESC key
    effect(() => {
      if (!this.isOpen()) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.close();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    });
  }

  close(): void {
    this.themeService.close();
  }

  switchTab(tab: 'light' | 'dark'): void {
    this.themeService.switchTab(tab);
  }

  reset(): void {
    if (confirm('Reset all modifications in the current theme?')) {
      this.themeService.reset('current');
    }
  }

  resetToDefaults(): void {
    if (
      confirm(
        'Reset all customizations to default values? This will clear all saved changes and reload from CSS files.',
      )
    ) {
      this.themeService.resetToDefaults();
    }
  }

  openExportModal(): void {
    this.showExportModal.set(true);
  }

  closeExportModal(): void {
    this.showExportModal.set(false);
  }
}
