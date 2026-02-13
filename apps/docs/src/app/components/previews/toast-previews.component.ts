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
  styles: `
    .custom-toast-section luma-toast-item {
      --color-primary: oklch(0.65 0.2 270);
      --color-primary-foreground: oklch(1 0 0);
    }
  `,
})
export class ToastPreviewsComponent {
  exampleId = input.required<string>();
  toast = inject(LmToastService);
}
