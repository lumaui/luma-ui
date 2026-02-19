import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  OnDestroy,
  OnInit,
  output,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  selectTriggerVariants,
  selectListboxVariants,
  selectOptionVariants,
  selectSearchInputVariants,
  selectChipVariants,
  selectChipDismissVariants,
  type SelectSize,
} from '@lumaui/core';
import { OptionEntry, SelectContext, SELECT_CONTEXT } from './select.tokens';

let selectIdCounter = 0;

@Component({
  selector: 'luma-select',
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block relative w-full',
    '[attr.id]': 'null',
  },
  providers: [
    { provide: SELECT_CONTEXT, useExisting: LmSelectComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LmSelectComponent),
      multi: true,
    },
  ],
})
export class LmSelectComponent
  implements SelectContext, ControlValueAccessor, OnInit, OnDestroy
{
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private ngControl: NgControl | null = null;

  // ── Inputs
  lmSize = input<SelectSize>('md');
  lmMultiple = input<boolean>(false);
  lmPlaceholder = input<string>('Select…');
  lmSearchPlaceholder = input<string>('Search…');
  lmDisabled = input<boolean>(false);
  lmRequired = input<boolean>(false);
  lmError = input<boolean>(false);
  lmEmptyMessage = input<string>('No options found');
  lmClearable = input<boolean>(false);
  lmCompareWith = input<((a: unknown, b: unknown) => boolean) | null>(null);

  // ── Outputs
  lmValueChange = output<unknown | null | unknown[]>();

  // ── IDs: read the host id attribute before host binding removes it
  selectId = signal<string>(
    this.elementRef.nativeElement.getAttribute('id') ||
      `luma-select-${selectIdCounter++}`,
  );
  readonly listboxId = computed(() => `${this.selectId()}-listbox`);
  readonly searchInputId = computed(() => `${this.selectId()}-search`);

  /** ID of the currently focused option for aria-activedescendant */
  readonly activeDescendantId = computed(() => {
    const idx = this.focusedOptionIndex();
    return idx >= 0 ? `${this.selectId()}-opt-${idx}` : null;
  });

  /** Whether the select has a value (for clear button visibility) */
  readonly hasValue = computed(() => {
    if (this.lmMultiple()) return this._multiValue().length > 0;
    const v = this._singleValue();
    return v !== null && v !== undefined;
  });

  // ── Selection state
  private readonly _singleValue = signal<unknown | null>(null);
  private readonly _multiValue = signal<unknown[]>([]);

  // ── Open state
  private readonly _internalOpen = signal(false);
  readonly isOpen = this._internalOpen.asReadonly();

  // ── Search + options registry
  readonly searchQuery = signal('');
  private readonly _options = signal<OptionEntry[]>([]);

  // ── Form state
  private readonly _formDisabled = signal(false);
  private readonly _formInvalid = signal(false);
  private readonly _formTouched = signal(false);

  // ── Derived state
  readonly isDisabled = computed(
    () => this.lmDisabled() || this._formDisabled(),
  );
  readonly hasError = computed(
    () => this.lmError() || (this._formInvalid() && this._formTouched()),
  );

  /** SelectContext interface */
  readonly isMultiple = computed(() => this.lmMultiple());

  /** Compare two values using the custom compareWith function or strict equality */
  private compareValues(a: unknown, b: unknown): boolean {
    const fn = this.lmCompareWith();
    return fn ? fn(a, b) : a === b;
  }

  /**
   * Combines filtering with selected-state baking in a single computed.
   * Avoids creating per-row signal instances; the whole array recomputes
   * when search query, options, or selection state changes.
   */
  readonly filteredOptionsWithState = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const opts = this._options();
    const filtered = query
      ? opts.filter((o) => o.label().toLowerCase().includes(query))
      : opts;
    const multiple = this.lmMultiple();
    const single = this._singleValue();
    const multi = this._multiValue();
    return filtered.map((o) => ({
      entry: o,
      isSelected: multiple
        ? multi.some((v) => this.compareValues(v, o.value))
        : this.compareValues(o.value, single),
    }));
  });

  /** Label shown in the trigger when the dropdown is closed (single-select only) */
  readonly triggerLabel = computed(() => {
    // Multi-select displays chips instead of a text label
    if (this.lmMultiple()) return null;
    const val = this._singleValue();
    if (val === null || val === undefined) return null;
    const opts = this._options();
    return (
      opts.find((o) => this.compareValues(o.value, val))?.label() ?? String(val)
    );
  });

  /** Chip data for multi-select: maps selected values to { value, label } */
  readonly selectedChips = computed(() => {
    if (!this.lmMultiple()) return [];
    const vals = this._multiValue();
    const opts = this._options();
    return vals.map((v) => ({
      value: v,
      label:
        opts.find((o) => this.compareValues(o.value, v))?.label() ?? String(v),
    }));
  });

  // ── Dropdown flip (one-time check on open — no event listeners)
  private readonly _flipAbove = signal(false);

  // ── Keyboard focus within the listbox
  readonly focusedOptionIndex = signal(-1);

  // ── ViewChild refs
  readonly searchInputRef =
    viewChild<ElementRef<HTMLInputElement>>('searchInputEl');
  readonly triggerRef = viewChild<ElementRef<HTMLElement>>('triggerEl');
  readonly listboxRef = viewChild<ElementRef<HTMLElement>>('listboxEl');

  // ── CVA classes (computed for reactivity)
  readonly triggerClasses = computed(() =>
    selectTriggerVariants({
      size: this.lmSize(),
      multiple: this.lmMultiple(),
      error: this.hasError(),
      disabled: this.isDisabled(),
    }),
  );
  readonly listboxClasses = computed(() =>
    selectListboxVariants({ flip: this._flipAbove() }),
  );
  readonly searchInputClasses = selectSearchInputVariants();

  /** Chip classes — reactive to size */
  readonly chipClasses = computed(() =>
    selectChipVariants({ size: this.lmSize() }),
  );

  /** Chip dismiss button classes — reactive to size */
  readonly chipDismissClasses = computed(() =>
    selectChipDismissVariants({ size: this.lmSize() }),
  );

  optionClasses(
    isSelected: boolean,
    disabled: boolean,
    isFocused: boolean,
  ): string {
    const base = selectOptionVariants({ selected: isSelected, disabled });
    return isFocused && !disabled ? `${base} bg-primary/10` : base;
  }

  // noop – replaced at runtime by registerOnChange / registerOnTouched
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChange: (v: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};

  // ── Event listener refs for cleanup
  private clickOutsideHandler: ((e: MouseEvent) => void) | null = null;

  constructor() {
    // React to open state changes in a single effect
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (this._internalOpen()) {
        this.checkFlipPosition();
        this.registerClickOutside();
        // Defer focus so the input element has been rendered
        setTimeout(() => this.searchInputRef()?.nativeElement.focus(), 0);
      }
    });

    // Scroll focused option into view when keyboard-navigating
    effect(() => {
      const idx = this.focusedOptionIndex();
      if (idx < 0) return;
      const listbox = this.listboxRef()?.nativeElement;
      if (!listbox) return;
      const optionEl = listbox.querySelector(`[id$='-opt-${idx}']`);
      optionEl?.scrollIntoView({ block: 'nearest' });
    });
  }

  ngOnInit(): void {
    try {
      this.ngControl = this.injector.get(NgControl, null, {
        optional: true,
        self: true,
      });
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;
        const control = this.ngControl.control;
        if (control) {
          this._formInvalid.set(control.invalid);
          this._formTouched.set(control.touched);
          control.events
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this._formInvalid.set(control.invalid);
              this._formTouched.set(control.touched);
            });
        }
      }
    } catch {
      this.ngControl = null;
    }
  }

  ngOnDestroy(): void {
    this.unregisterClickOutside();
  }

  // ── SelectContext implementation
  registerOption(entry: OptionEntry): void {
    this._options.update((opts) => [...opts, entry]);
  }

  unregisterOption(value: unknown): void {
    this._options.update((opts) => opts.filter((o) => o.value !== value));
  }

  // ── Open / close
  open(): void {
    if (this.isDisabled()) return;
    this._internalOpen.set(true);
  }

  close(): void {
    this._internalOpen.set(false);
    // Reset search state synchronously so tests and consumers see immediate update
    this.searchQuery.set('');
    this.focusedOptionIndex.set(-1);
    this.onTouched();
    this.unregisterClickOutside();
    setTimeout(() => this.triggerRef()?.nativeElement.focus(), 0);
  }

  toggle(): void {
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  // ── Value selection
  selectValue(value: unknown): void {
    if (this.lmMultiple()) {
      const current = this._multiValue();
      const idx = current.findIndex((v) => this.compareValues(v, value));
      const next =
        idx >= 0 ? current.filter((_, i) => i !== idx) : [...current, value];
      this._multiValue.set(next);
      this.onChange(next);
      this.lmValueChange.emit(next);
      // In multi-select: keep open, clear the search filter
      this.searchQuery.set('');
    } else {
      this._singleValue.set(value);
      this.onChange(value);
      this.lmValueChange.emit(value);
      this.close();
    }
  }

  /** Remove a chip by its value (without opening/closing the dropdown) */
  removeChip(event: Event, value: unknown): void {
    event.stopPropagation();
    // Toggle the value off via selectValue, but preserve open/close state
    const current = this._multiValue();
    const next = current.filter((v) => !this.compareValues(v, value));
    this._multiValue.set(next);
    this.onChange(next);
    this.lmValueChange.emit(next);
  }

  /** Clear the current selection */
  clear(event?: Event): void {
    event?.stopPropagation();
    if (this.lmMultiple()) {
      this._multiValue.set([]);
      this.onChange([]);
      this.lmValueChange.emit([]);
    } else {
      this._singleValue.set(null);
      this.onChange(null);
      this.lmValueChange.emit(null);
    }
  }

  // ── Keyboard handlers for the closed trigger
  onTriggerKeydown(event: KeyboardEvent): void {
    if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      this.open();
    }
  }

  // ── Keyboard handlers for the search input (open state)
  onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.focusedOptionIndex.set(-1);
  }

  onSearchKeydown(event: KeyboardEvent): void {
    const opts = this.filteredOptionsWithState();
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedOptionIndex.update((i) => Math.min(i + 1, opts.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedOptionIndex.update((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        event.preventDefault();
        if (opts.length > 0) this.focusedOptionIndex.set(0);
        break;
      case 'End':
        event.preventDefault();
        if (opts.length > 0) this.focusedOptionIndex.set(opts.length - 1);
        break;
      case 'Enter': {
        event.preventDefault();
        const idx = this.focusedOptionIndex();
        if (idx >= 0 && idx < opts.length) {
          const { entry } = opts[idx];
          if (!entry.disabled()) this.selectValue(entry.value);
        }
        break;
      }
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
      case 'Backspace': {
        // In multi-select: remove last chip when search is empty
        if (this.lmMultiple() && this.searchQuery() === '') {
          const vals = this._multiValue();
          if (vals.length > 0) {
            this.selectValue(vals[vals.length - 1]);
          }
        }
        break;
      }
    }
  }

  // ── One-time flip check (no event listeners needed)
  private checkFlipPosition(): void {
    const trigger = this.triggerRef()?.nativeElement;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const dropdownMaxHeight = 240; // matches max-h-60 (15rem = 240px)
    const gap = 4;
    const spaceBelow = window.innerHeight - rect.bottom;
    this._flipAbove.set(
      spaceBelow < dropdownMaxHeight + gap &&
        rect.top > dropdownMaxHeight + gap,
    );
  }

  private registerClickOutside(): void {
    if (this.clickOutsideHandler) return;
    this.clickOutsideHandler = (e: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(e.target as Node)) {
        this.close();
      }
    };
    // Small timeout to avoid the current click event triggering close immediately
    setTimeout(() => {
      if (this.clickOutsideHandler) {
        this.document.addEventListener('click', this.clickOutsideHandler);
      }
    }, 0);
  }

  private unregisterClickOutside(): void {
    if (this.clickOutsideHandler) {
      this.document.removeEventListener('click', this.clickOutsideHandler);
      this.clickOutsideHandler = null;
    }
  }

  // ── ControlValueAccessor
  writeValue(value: unknown): void {
    if (this.lmMultiple()) {
      this._multiValue.set(
        Array.isArray(value) ? value : value != null ? [value] : [],
      );
    } else {
      this._singleValue.set(value ?? null);
    }
  }

  registerOnChange(fn: (v: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }
}
