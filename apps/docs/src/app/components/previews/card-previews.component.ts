import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LmButtonDirective,
  LmCardComponent,
  LmCardContentDirective,
  LmCardDescriptionDirective,
  LmCardFooterDirective,
  LmCardHeaderDirective,
  LmCardTitleDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-card-previews',
  imports: [
    LmButtonDirective,
    LmCardComponent,
    LmCardHeaderDirective,
    LmCardTitleDirective,
    LmCardDescriptionDirective,
    LmCardContentDirective,
    LmCardFooterDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @switch (exampleId()) {
      @case ('basic-card') {
        <luma-card>
          <div lumaCardHeader>
            <h3 lumaCardTitle>Card Title</h3>
            <p lumaCardDescription>
              This is a description of the card content.
            </p>
          </div>
          <div lumaCardContent>
            <p>Main content goes here.</p>
          </div>
        </luma-card>
      }
      @case ('variants') {
        <div class="space-y-4">
          <luma-card lmVariant="default">
            <div lumaCardHeader>
              <h3 lumaCardTitle>Default Variant</h3>
              <p lumaCardDescription>Standard card with border</p>
            </div>
            <div lumaCardContent>
              <p>Default card content.</p>
            </div>
          </luma-card>

          <luma-card lmVariant="elevated">
            <div lumaCardHeader>
              <h3 lumaCardTitle>Elevated Variant</h3>
              <p lumaCardDescription>Card with subtle shadow</p>
            </div>
            <div lumaCardContent>
              <p>Elevated card content.</p>
            </div>
          </luma-card>


        </div>
      }
      @case ('with-footer') {
        <luma-card>
          <div lumaCardHeader>
            <h3 lumaCardTitle>Card with Footer</h3>
            <p lumaCardDescription>Example of a card with action buttons</p>
          </div>
          <div lumaCardContent>
            <p>Card content goes here.</p>
          </div>
          <div lumaCardFooter class="flex justify-end gap-2 px-6 py-4">
            <button lumaButton lmVariant="ghost">Cancel</button>
            <button lumaButton lmVariant="primary">Save</button>
          </div>
        </luma-card>
      }
      @default {
        <div class="lm-text-secondary text-sm text-center">
          Preview not available for this example
        </div>
      }
    }
  `,
})
export class CardPreviewsComponent {
  exampleId = input.required<string>();
}
