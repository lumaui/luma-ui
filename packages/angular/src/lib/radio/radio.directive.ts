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
import { radioVariants } from '@lumaui/core';

let radioIdCounter = 0;

/**
 * Radio button directive with CVA variants and Angular Forms integration.
 * Emits `lmValue` to the FormControl when checked.
 * The inner dot indicator is rendered via a signal-bound `box-shadow` style.
 *
 * @example
 * <input type="radio" lumaRadio lmValue="option-a" [formControl]="optionControl" />
 */
@Directive({
  selector: 'input[type="radio"][lumaRadio]',
  standalone: true,
  host: {
    '[class]': 'classes()',
    '[attr.id]': 'elementId()',
    '[attr.aria-invalid]': 'hasError()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.required]': 'lmRequired() ? "" : null',
    // Inner dot: background fills circle, inset shadow carves a gap between border and dot
    '[style.box-shadow]':
      'isChecked() ? "inset 0 0 0 3px var(--color-background)" : null',
    '[style.background-color]': 'isChecked() ? "var(--color-primary)" : null',
    '[style.border-color]': 'isChecked() ? "var(--color-primary)" : null',
    '(change)': 'onChangeEvent($event)',
    '(blur)': 'onBlur()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmRadioDirective),
      multi: true,
    },
  ],
})
export class LmRadioDirective implements ControlValueAccessor, OnInit {
  // Use Injector to avoid circular dependency
  private injector = inject(Injector);
  private elementRef = inject(ElementRef<HTMLInputElement>);
  private ngControl: NgControl | null = null;
  private destroyRef = inject(DestroyRef);

  // Inputs
  lmValue = input<unknown>(undefined);
  lmError = input<boolean>(false);
  lmDisabled = input<boolean>(false);
  lmRequired = input<boolean>(false);

  // Internal signal for disabled state coming from FormControl.disable()
  private _formDisabled = signal(false);

  // Internal signals for form validation state (bridging non-signal FormControl to signal graph)
  private _formInvalid = signal(false);
  private _formTouched = signal(false);

  // Internal signal tracking whether this radio is currently selected
  isChecked = signal(false);

  // Final disabled state: manual lmDisabled OR programmatic FormControl.disable()
  isDisabled = computed(() => this.lmDisabled() || this._formDisabled());

  // Preserve static id="..." from template; fall back to auto-generated id.
  // elementRef must be declared before this field so it's available at init time.
  elementId = signal<string>(
    this.elementRef.nativeElement.getAttribute('id') ||
      `luma-radio-${radioIdCounter++}`,
  );

  // ARIA describedby (can be set by parent or manually)
  describedBy = signal<string | null>(null);

  // Computed signal — reactive to both manual lmError and FormControl state
  hasError = computed(
    () => this.lmError() || (this._formInvalid() && this._formTouched()),
  );

  // Computed classes
  classes = computed(() => radioVariants({ error: this.hasError() }));

  // noop – replaced at runtime by registerOnChange / registerOnTouched
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (value: unknown) => void = () => {};
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

    // Standalone usage (no FormControl): when the user selects a sibling radio in the
    // same name group, the browser silently sets this radio's .checked = false without
    // firing a change event on it. We listen on document and re-read native state.
    const el = this.elementRef.nativeElement;
    const onSiblingChange = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      if (
        target !== el &&
        target.type === 'radio' &&
        !!el.name &&
        target.name === el.name
      ) {
        this.isChecked.set(el.checked);
      }
    };
    document.addEventListener('change', onSiblingChange);
    this.destroyRef.onDestroy(() =>
      document.removeEventListener('change', onSiblingChange),
    );
  }

  writeValue(value: unknown): void {
    // Check the radio if the form value equals this radio's value
    const checked = value === this.lmValue();
    this.elementRef.nativeElement.checked = checked;
    this.isChecked.set(checked);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }

  onChangeEvent(event: Event): void {
    // Only emit when this radio is checked (not when another radio in the group deselects it)
    if ((event.target as HTMLInputElement).checked) {
      this.isChecked.set(true);
      this.onChange(this.lmValue());
    }
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
