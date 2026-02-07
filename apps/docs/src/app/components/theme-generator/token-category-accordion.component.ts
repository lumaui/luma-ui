import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
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
  template: `
    <luma-accordion-group
      [lmValue]="openCategories()"
      (lmValueChange)="onCategoriesChange($event)">
      @for (category of categories(); track category.name) {
        <luma-accordion-item [lmId]="category.name">
          <div lumaAccordionTrigger>
            <span lumaAccordionTitle class="capitalize">
              {{ category.name }}
              <span class="text-xs lm-text-secondary ml-2">
                ({{ category.tokens.length }})
              </span>
              @if (category.modifiedCount > 0) {
                <span
                  class="inline-block h-2 w-2 lm-rounded-badge lm-bg-button-primary ml-2"
                  [attr.aria-label]="category.modifiedCount + ' modified'"
                ></span>
              }
            </span>
            <span lumaAccordionIcon>
              <svg viewBox="0 0 24 24" class="w-4 h-4">
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  fill="none"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>

          <div lumaAccordionContent>
            <div class="space-y-3 pt-2">
              @for (token of category.tokens; track token.name) {
                <app-token-editor-row [token]="token" />
              }
            </div>
          </div>
        </luma-accordion-item>
      }
    </luma-accordion-group>
  `,
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
