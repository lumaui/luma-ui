import { InjectionToken } from '@angular/core';
import { Signal } from '@angular/core';

/**
 * Data registered by each LmSelectOptionComponent into the parent LmSelectComponent.
 * label is a plain getter that reads textContent lazily — no timing race with ngAfterViewInit.
 */
export interface OptionEntry {
  value: unknown;
  /** Plain getter — reads textContent on every call, always up-to-date when filter runs */
  label: () => string;
  /** Direct reference to the option's lmDisabled InputSignal */
  disabled: Signal<boolean>;
}

/**
 * Interface that LmSelectComponent implements and exposes via SELECT_CONTEXT.
 * Options use this to register/unregister themselves without circular imports.
 */
export interface SelectContext {
  isMultiple: Signal<boolean>;
  registerOption(entry: OptionEntry): void;
  unregisterOption(value: unknown): void;
}

export const SELECT_CONTEXT = new InjectionToken<SelectContext>(
  'SelectContext',
);
