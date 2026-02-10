import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  LmButtonDirective,
  LmCardComponent,
  LmCardContentDirective,
  LmCardDescriptionDirective,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-previews.component.html',
})
export class CardPreviewsComponent {
  exampleId = input.required<string>();
}
