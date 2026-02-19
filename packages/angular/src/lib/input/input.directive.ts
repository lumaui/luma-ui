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
import { inputVariants, type InputSize } from '@lumaui/core';

let inputIdCounter = 0;

/**
 * Input directive with CVA variants and Angular Forms integration
 *
 * @example
 * <input lumaInput lmSize="md" />
 */
@Directive({
  selector: 'input[lumaInput]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'elementId()',
    '[attr.aria-invalid]': 'hasError()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.required]': 'lmRequired() ? "" : null',
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmInputDirective),
      multi: true,
    },
  ],
})
export class LmInputDirective implements ControlValueAccessor, OnInit {
  // Use Injector to avoid circular dependency
  private injector = inject(Injector);
  private elementRef = inject(
    ElementRef<HTMLInputElement | HTMLTextAreaElement>,
  );
  private ngControl: NgControl | null = null;
  private destroyRef = inject(DestroyRef);

  // Inputs
  lmSize = input<InputSize>('md');
  lmError = input<boolean>(false);
  lmDisabled = input<boolean>(false);
  lmRequired = input<boolean>(false);

  // Internal signal for disabled state coming from FormControl.disable()
  private _formDisabled = signal(false);

  // Internal signals for form validation state (bridging non-signal FormControl to signal graph)
  private _formInvalid = signal(false);
  private _formTouched = signal(false);

  // Final disabled state: manual lmDisabled OR programmatic FormControl.disable()
  isDisabled = computed(() => this.lmDisabled() || this._formDisabled());

  // Auto-generated ID
  elementId = signal<string>(`luma-input-${inputIdCounter++}`);

  // ARIA describedby (will be set by parent or manually)
  describedBy = signal<string | null>(null);

  // Computed signal — reactive to both manual lmError and FormControl state
  hasError = computed(
    () => this.lmError() || (this._formInvalid() && this._formTouched()),
  );

  // Computed classes
  classes = computed(() =>
    inputVariants({
      size: this.lmSize(),
      error: this.hasError(),
    }),
  );

  // noop – replaced at runtime by registerOnChange / registerOnTouched
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  ngOnInit(): void {
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

  writeValue(value: string): void {
    const element = this.elementRef.nativeElement;
    element.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.onChange(target.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  /**
   * Set the aria-describedby attribute value
   * This is typically called by parent components or directives
   */
  setDescribedBy(value: string | null): void {
    this.describedBy.set(value);
  }
}
