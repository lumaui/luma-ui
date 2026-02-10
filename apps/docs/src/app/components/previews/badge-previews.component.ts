import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { LmBadgeDirective } from '@lumaui/angular';

@Component({
  selector: 'app-badge-previews',
  imports: [LmBadgeDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './badge-previews.component.html',
})
export class BadgePreviewsComponent {
  exampleId = input.required<string>();
}
