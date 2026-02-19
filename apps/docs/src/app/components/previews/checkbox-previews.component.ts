import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {
  LmCheckboxDirective,
  LmLabelDirective,
  LmErrorTextDirective,
} from '@lumaui/angular';

@Component({
  selector: 'app-checkbox-previews',
  imports: [
    ReactiveFormsModule,
    LmCheckboxDirective,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox-previews.component.html',
})
export class CheckboxPreviewsComponent implements OnInit {
  exampleId = input.required<string>();

  agreedControl = new FormControl(false);
  requiredControl = new FormControl(false, [Validators.requiredTrue]);

  ngOnInit(): void {
    this.requiredControl.markAsTouched();
  }
}
