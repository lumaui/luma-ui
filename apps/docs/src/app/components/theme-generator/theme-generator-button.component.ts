import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeGeneratorService } from '../../services/theme-generator.service';

@Component({
  selector: 'app-theme-generator-button',
  imports: [],
  templateUrl: './theme-generator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeGeneratorButtonComponent {
  private themeService = inject(ThemeGeneratorService);

  readonly isOpen = this.themeService.isOpen;

  toggle(): void {
    this.themeService.toggle();
  }
}
