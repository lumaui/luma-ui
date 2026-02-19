import {
  Directive,
  computed,
  input,
  signal,
  inject,
  forwardRef,
  OnInit,
  DestroyRef,
  Injector,
  ElementRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { checkboxVariants } from '@lumaui/core';

let checkboxIdCounter = 0;

// SVG checkmark encoded as a CSS background-image data URI (white stroke on transparent)
const CHECKMARK_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8l3 3 5-5' stroke='white' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C%2Fsvg%3E\")";

/**
 * Checkbox directive with CVA variants and Angular Forms integration.
 * Supports boolean ControlValueAccessor (checked/unchecked).
 *
 * @example
 * <input type="checkbox" lumaCheckbox [formControl]="agreedControl" />
 */
@Directive({
  selector: 'input[type="checkbox"][lumaCheckbox]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'elementId()',
    '[attr.aria-invalid]': 'hasError()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.required]': 'lmRequired() ? "" : null',
    '[style.background-image]': 'isChecked() ? checkmarkSvg : null',
    '[style.background-repeat]': 'isChecked() ? "no-repeat" : null',
    '[style.background-position]': 'isChecked() ? "center" : null',
    '[style.background-size]': 'isChecked() ? "75%" : null',
    '(change)': 'onChangeEvent($event)',
    '(blur)': 'onBlur()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmCheckboxDirective),
      multi: true,
    },
  ],
})
export class LmCheckboxDirective implements ControlValueAccessor, OnInit {
  // Use Injector to avoid circular dependency
  private injector = inject(Injector);
  private elementRef = inject(ElementRef<HTMLInputElement>);
  private ngControl: NgControl | null = null;
  private destroyRef = inject(DestroyRef);

  // Inputs
  lmError = input<boolean>(false);
  lmDisabled = input<boolean>(false);
  lmRequired = input<boolean>(false);

  // Internal signal for disabled state coming from FormControl.disable()
  private _formDisabled = signal(false);

  // Internal signals for form validation state (bridging non-signal FormControl to signal graph)
  private _formInvalid = signal(false);
  private _formTouched = signal(false);

  // Internal signal tracking whether the checkbox is currently checked
  isChecked = signal(false);

  // Exposed for host binding (readonly reference to the constant)
  readonly checkmarkSvg = CHECKMARK_SVG;

  // Final disabled state: manual lmDisabled OR programmatic FormControl.disable()
  isDisabled = computed(() => this.lmDisabled() || this._formDisabled());

  // Preserve static id="..." from template; fall back to auto-generated id.
  // elementRef must be declared before this field so it's available at init time.
  elementId = signal<string>(
    this.elementRef.nativeElement.getAttribute('id') ||
      `luma-checkbox-${checkboxIdCounter++}`,
  );

  // ARIA describedby (can be set by parent or manually)
  describedBy = signal<string | null>(null);

  // Computed signal — reactive to both manual lmError and FormControl state
  hasError = computed(
    () => this.lmError() || (this._formInvalid() && this._formTouched()),
  );

  // Computed classes
  classes = computed(() => checkboxVariants({ error: this.hasError() }));

  // ControlValueAccessor implementation (boolean-typed)
  // noop – replaced at runtime by registerOnChange / registerOnTouched
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    // Sync initial checked state from native element.
    // Needed when a static `checked` attribute is used without a FormControl —
    // writeValue() is never called in that case, so isChecked stays false.
    this.isChecked.set(this.elementRef.nativeElement.checked);

    // Get NgControl from Injector to avoid circular dependency
    try {
      this.ngControl = this.injector.get(NgControl, null, {
        optional: true,
        self: true,
      });
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;

        const control = this.ngControl.control;
        if (control) {
          // Capture immediate state (e.g. markAsTouched() called before ngOnInit)
          this._formInvalid.set(control.invalid);
          this._formTouched.set(control.touched);

          // React to any future FormControl state changes
          // control.events emits for ALL changes: value, status, touched, pristine
          // statusChanges alone does NOT emit for markAsTouched()
          control.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this._formInvalid.set(control.invalid);
              this._formTouched.set(control.touched);
            });
        }
      }
    } catch {
      // No NgControl present
      this.ngControl = null;
    }
  }

  writeValue(value: boolean): void {
    const checked = !!value;
    this.elementRef.nativeElement.checked = checked;
    this.isChecked.set(checked);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  onChangeEvent(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.isChecked.set(checked);
    this.onChange(checked);
  }

  onBlur(): void {
    this.onTouched();
  }

  /**
   * Set the aria-describedby attribute value.
   * Typically called by helper/error text directives.
   */
  setDescribedBy(value: string | null): void {
    this.describedBy.set(value);
  }
}
