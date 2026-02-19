import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmInputDirective,
  LmLabelDirective,
  LmHelperTextDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-input-previews',
  imports: [
    ReactiveFormsModule,
    LmInputDirective,
    LmLabelDirective,
    LmHelperTextDirective,
    LmErrorTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-previews.component.html',
})
export class InputPreviewsComponent implements OnInit {
  exampleId = input.required<string>();

  emailControl = new FormControl('');
  emailErrorControl = new FormControl('invalid email', [Validators.email]);
  disabledControl = new FormControl({ value: '', disabled: true });
  requiredNameControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    // Mark as touched so the error preview shows the error state immediately
    this.emailErrorControl.markAsTouched();
  }
}
