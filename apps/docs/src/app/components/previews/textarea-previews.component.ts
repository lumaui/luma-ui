import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmTextareaDirective,
  LmLabelDirective,
  LmHelperTextDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-textarea-previews',
  imports: [
    ReactiveFormsModule,
    LmTextareaDirective,
    LmLabelDirective,
    LmHelperTextDirective,
    LmErrorTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './textarea-previews.component.html',
})
export class TextareaPreviewsComponent implements OnInit {
  exampleId = input.required<string>();

  bioControl = new FormControl('');
  messageErrorControl = new FormControl('too short', [
    Validators.minLength(20),
  ]);
  disabledControl = new FormControl({
    value: 'This content cannot be edited.',
    disabled: true,
  });
  requiredMessageControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    // Mark as touched so the error preview shows the error state immediately
    this.messageErrorControl.markAsTouched();
  }
}
