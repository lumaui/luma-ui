import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import {
  LmButtonDirective,
  LmToastService,
  ToastPosition,
} from '@lumaui/angular';

@Component({
  selector: 'app-toast-previews',
  imports: [LmButtonDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './toast-previews.component.html',
})
export class ToastPreviewsComponent {
  exampleId = input.required<string>();
  toast = inject(LmToastService);
}
