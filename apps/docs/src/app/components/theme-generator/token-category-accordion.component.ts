import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
} from '@angular/core';
import { ThemeGeneratorService } from '../../services/theme-generator.service';
import {
  LmAccordionGroupComponent,
  LmAccordionItemComponent,
  LmAccordionTriggerDirective,
  LmAccordionTitleDirective,
  LmAccordionIconDirective,
  LmAccordionContentDirective,
} from '@lumaui/angular';
import { TokenEditorRowComponent } from './token-editor-row.component';

@Component({
  selector: 'app-token-category-accordion',
  imports: [
    LmAccordionGroupComponent,
    LmAccordionItemComponent,
    LmAccordionTriggerDirective,
    LmAccordionTitleDirective,
    LmAccordionIconDirective,
    LmAccordionContentDirective,
    TokenEditorRowComponent,
  ],
  templateUrl: './token-category-accordion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TokenCategoryAccordionComponent {
  private themeService = inject(ThemeGeneratorService);

  readonly categories = this.themeService.categories;
  openCategories = signal<string[]>(['color']); // Open color category by default

  onCategoriesChange(value: string | string[]): void {
    // Accordion emits string | string[], but we always want an array
    const categories = Array.isArray(value) ? value : [value];
    this.openCategories.set(categories);
  }
}
