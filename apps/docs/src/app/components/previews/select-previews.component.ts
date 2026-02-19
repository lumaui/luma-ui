import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
} from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { LmSelectComponent } from '@lumaui/angular';
import { LmSelectOptionComponent } from '@lumaui/angular';
import { LmLabelDirective } from '@lumaui/angular';
import { LmErrorTextDirective } from '@lumaui/angular';

@Component({
  selector: 'app-select-previews',
  imports: [
    ReactiveFormsModule,
    LmSelectComponent,
    LmSelectOptionComponent,
    LmLabelDirective,
    LmErrorTextDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-previews.component.html',
})
export class SelectPreviewsComponent implements OnInit {
  exampleId = input.required<string>();

  fruitControl = new FormControl<string | null>(null);
  colorsControl = new FormControl<string[]>([]);
  requiredControl = new FormControl<string | null>(null, [Validators.required]);

  ngOnInit(): void {
    this.requiredControl.markAsTouched();
  }
}
