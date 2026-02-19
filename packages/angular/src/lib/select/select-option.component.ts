import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { OptionEntry, SELECT_CONTEXT } from './select.tokens';

/**
 * Option component for luma-select.
 * Projects content into a hidden slot (the parent hides it via aria-hidden);
 * registers its value/label/disabled as signals into the parent's registry.
 *
 * @example
 * <luma-select-option [lmValue]="'apple'">Apple</luma-select-option>
 */
@Component({
  selector: 'luma-select-option',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LmSelectOptionComponent implements OnInit, OnDestroy {
  private readonly context = inject(SELECT_CONTEXT);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  lmValue = input.required<unknown>();
  lmDisabled = input<boolean>(false);

  private entry: OptionEntry | null = null;

  ngOnInit(): void {
    this.entry = {
      value: this.lmValue(),
      label: () => this.elementRef.nativeElement.textContent?.trim() ?? '',
      disabled: this.lmDisabled,
    };
    this.context.registerOption(this.entry);
  }

  ngOnDestroy(): void {
    this.context.unregisterOption(this.lmValue());
  }
}
