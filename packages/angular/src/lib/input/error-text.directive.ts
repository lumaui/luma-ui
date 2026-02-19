import { Directive, computed, input, signal } from '@angular/core';
import { errorTextVariants, type ErrorTextSize } from '@lumaui/core';

let errorIdCounter = 0;

/**
 * Error text directive for displaying validation error messages
 *
 * @example
 * <span lumaErrorText *ngIf="hasError">Password must be at least 8 characters.</span>
 */
@Directive({
  selector: '[lumaErrorText]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'elementId()',
  },
})
export class LmErrorTextDirective {
  elementId = signal<string>(`luma-error-${errorIdCounter++}`);
  lmSize = input<ErrorTextSize>('sm');

  classes = computed(() => errorTextVariants({ size: this.lmSize() }));
}
