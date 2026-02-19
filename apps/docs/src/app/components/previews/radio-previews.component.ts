import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmRadioDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-radio-previews',
  imports: [
    ReactiveFormsModule,
    LmRadioDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './radio-previews.component.html',
})
export class RadioPreviewsComponent implements OnInit {
  exampleId = input.required<string>();

  planControl = new FormControl('starter');
  deliveryControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.deliveryControl.markAsTouched();
  }
}
