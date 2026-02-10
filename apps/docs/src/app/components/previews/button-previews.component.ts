import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { LmButtonDirective } from '@lumaui/angular';

@Component({
  selector: 'app-button-previews',
  imports: [LmButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button-previews.component.html',
})
export class ButtonPreviewsComponent {
  exampleId = input.required<string>();
}
