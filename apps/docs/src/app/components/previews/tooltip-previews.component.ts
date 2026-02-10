import { LmButtonDirective, LmTooltipDirective } from '@lumaui/angular';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-tooltip-previews',
  imports: [LmTooltipDirective, LmButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tooltip-previews.component.html',
})
export class TooltipPreviewsComponent {
  exampleId = input.required<string>();
}
