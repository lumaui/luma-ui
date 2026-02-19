import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LmSelectComponent } from './select.component';
import { LmSelectOptionComponent } from './select-option.component';

// ── Test host: basic single-select
@Component({
  template: `
    <luma-select [formControl]="ctrl">
      <luma-select-option [lmValue]="'apple'">Apple</luma-select-option>
      <luma-select-option [lmValue]="'banana'">Banana</luma-select-option>
      <luma-select-option [lmValue]="'cherry'">Cherry</luma-select-option>
    </luma-select>
  `,
  imports: [ReactiveFormsModule, LmSelectComponent, LmSelectOptionComponent],
})
class SingleSelectHostComponent {
  ctrl = new FormControl<string | null>(null);
}

// ── Test host: multi-select
@Component({
  template: `
    <luma-select [formControl]="ctrl" [lmMultiple]="true">
      <luma-select-option [lmValue]="'red'">Red</luma-select-option>
      <luma-select-option [lmValue]="'green'">Green</luma-select-option>
      <luma-select-option [lmValue]="'blue'">Blue</luma-select-option>
    </luma-select>
  `,
  imports: [ReactiveFormsModule, LmSelectComponent, LmSelectOptionComponent],
})
class MultiSelectHostComponent {
  ctrl = new FormControl<string[]>([]);
}

// ── Test host: error state
@Component({
  template: `
    <luma-select [formControl]="ctrl">
      <luma-select-option [lmValue]="'a'">Option A</luma-select-option>
    </luma-select>
  `,
  imports: [ReactiveFormsModule, LmSelectComponent, LmSelectOptionComponent],
})
class ErrorSelectHostComponent {
  ctrl = new FormControl<string | null>(null, [Validators.required]);
}

// ── Test host: disabled option
@Component({
  template: `
    <luma-select [formControl]="ctrl">
      <luma-select-option [lmValue]="'a'">Enabled</luma-select-option>
      <luma-select-option [lmValue]="'b'" [lmDisabled]="true"
        >Disabled</luma-select-option
      >
    </luma-select>
  `,
  imports: [ReactiveFormsModule, LmSelectComponent, LmSelectOptionComponent],
})
class DisabledOptionHostComponent {
  ctrl = new FormControl<string | null>(null);
}

describe('LmSelectComponent', () => {
  describe('Single-select basics', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let host: SingleSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should create', () => {
      expect(selectEl).toBeTruthy();
    });

    it('should start closed', () => {
      expect(selectEl.isOpen()).toBe(false);
    });

    it('should open when open() is called', () => {
      selectEl.open();
      expect(selectEl.isOpen()).toBe(true);
    });

    it('should close and reset search when close() is called', () => {
      selectEl.open();
      selectEl.searchQuery.set('app');
      selectEl.close();
      expect(selectEl.isOpen()).toBe(false);
      expect(selectEl.searchQuery()).toBe('');
    });

    it('should show placeholder when no value selected', () => {
      expect(selectEl.triggerLabel()).toBeNull();
    });

    it('should update FormControl value on selection', () => {
      selectEl.selectValue('apple');
      expect(host.ctrl.value).toBe('apple');
    });

    it('should close after single selection', () => {
      selectEl.open();
      selectEl.selectValue('banana');
      expect(selectEl.isOpen()).toBe(false);
    });

    it('should show selected option label in trigger', () => {
      selectEl.selectValue('apple');
      // triggerLabel depends on _options being registered; wait for changes
      fixture.detectChanges();
      // The label is resolved from the registered option entries
      expect(selectEl.triggerLabel()).toBeTruthy();
    });

    it('should apply trigger classes from CVA', () => {
      const classes = selectEl.triggerClasses();
      expect(classes).toContain('border');
      expect(classes).toContain('h-10'); // md size default (single-select)
    });

    it('should register options', () => {
      const opts = selectEl['_options']();
      expect(opts.length).toBe(3);
    });
  });

  describe('Multi-select', () => {
    let fixture: ComponentFixture<MultiSelectHostComponent>;
    let host: MultiSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultiSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(MultiSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should emit array values', () => {
      selectEl.selectValue('red');
      expect(host.ctrl.value).toEqual(['red']);
    });

    it('should accumulate selections', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('blue');
      expect(host.ctrl.value).toEqual(['red', 'blue']);
    });

    it('should deselect on re-selection', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('red');
      expect(host.ctrl.value).toEqual([]);
    });

    it('should stay open after multi-select', () => {
      selectEl.open();
      selectEl.selectValue('green');
      expect(selectEl.isOpen()).toBe(true);
    });

    it('should report isMultiple as true', () => {
      expect(selectEl.isMultiple()).toBe(true);
    });
  });

  describe('Error state', () => {
    let fixture: ComponentFixture<ErrorSelectHostComponent>;
    let host: ErrorSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ErrorSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(ErrorSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should not have error state before touch', () => {
      expect(selectEl.hasError()).toBe(false);
    });

    it('should have error state when invalid + touched', () => {
      host.ctrl.markAsTouched();
      fixture.detectChanges();
      expect(selectEl.hasError()).toBe(true);
    });

    it('should apply error border class when in error state', () => {
      host.ctrl.markAsTouched();
      fixture.detectChanges();
      const classes = selectEl.triggerClasses();
      expect(classes).toContain('border-destructive');
    });

    it('should clear error when valid value selected', () => {
      host.ctrl.markAsTouched();
      fixture.detectChanges();
      expect(selectEl.hasError()).toBe(true);
      host.ctrl.setValue('a');
      fixture.detectChanges();
      expect(selectEl.hasError()).toBe(false);
    });
  });

  describe('Disabled option', () => {
    let fixture: ComponentFixture<DisabledOptionHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DisabledOptionHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(DisabledOptionHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should have a disabled option registered', () => {
      const opts = selectEl['_options']();
      const disabledOpt = opts.find((o) => o.value === 'b');
      expect(disabledOpt?.disabled()).toBe(true);
    });

    it('should apply disabled option classes', () => {
      const classes = selectEl.optionClasses(false, true, false);
      expect(classes).toContain('cursor-not-allowed');
    });
  });

  describe('Filtering', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should return all options when query is empty', () => {
      selectEl.searchQuery.set('');
      expect(selectEl.filteredOptionsWithState().length).toBe(3);
    });

    it('should filter options by label', () => {
      selectEl.searchQuery.set('app');
      const filtered = selectEl.filteredOptionsWithState();
      expect(filtered.length).toBe(1);
      expect(filtered[0].entry.value).toBe('apple');
    });

    it('should be case-insensitive', () => {
      selectEl.searchQuery.set('BANANA');
      const filtered = selectEl.filteredOptionsWithState();
      expect(filtered.length).toBe(1);
      expect(filtered[0].entry.value).toBe('banana');
    });

    it('should return empty when no match', () => {
      selectEl.searchQuery.set('zzz');
      expect(selectEl.filteredOptionsWithState().length).toBe(0);
    });

    it('should read option labels from textContent on-demand', () => {
      // Labels must be readable after initialization (not cached empty)
      const opts = selectEl['_options']();
      const labels = opts.map((o) => o.label());
      expect(labels).toEqual(['Apple', 'Banana', 'Cherry']);
    });
  });

  describe('Click-outside cleanup', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should clear click-outside handler after close', () => {
      selectEl.open();
      fixture.detectChanges();
      selectEl.close();
      expect(selectEl['clickOutsideHandler']).toBeNull();
    });
  });

  describe('ControlValueAccessor', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let host: SingleSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should reflect programmatic value set on FormControl', () => {
      host.ctrl.setValue('cherry');
      fixture.detectChanges();
      expect(selectEl['_singleValue']()).toBe('cherry');
    });

    it('should disable component when FormControl is disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();
      expect(selectEl.isDisabled()).toBe(true);
    });

    it('should not open when disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();
      selectEl.open();
      expect(selectEl.isOpen()).toBe(false);
    });
  });

  describe('Keyboard navigation', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should open on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      selectEl.onTriggerKeydown(event);
      expect(selectEl.isOpen()).toBe(true);
    });

    it('should open on ArrowDown key', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      selectEl.onTriggerKeydown(event);
      expect(selectEl.isOpen()).toBe(true);
    });

    it('should navigate down with ArrowDown in search', () => {
      selectEl.open();
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      selectEl.onSearchKeydown(event);
      expect(selectEl.focusedOptionIndex()).toBe(0);
    });

    it('should close on Escape in search', () => {
      selectEl.open();
      fixture.detectChanges();
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      selectEl.onSearchKeydown(event);
      expect(selectEl.isOpen()).toBe(false);
    });
  });

  describe('Sizes', () => {
    it('should apply sm size classes for single-select', async () => {
      @Component({
        template: `<luma-select lmSize="sm"
          ><luma-select-option [lmValue]="'a'"
            >A</luma-select-option
          ></luma-select
        >`,
        imports: [LmSelectComponent, LmSelectOptionComponent],
      })
      class SmSizeHostComponent {}

      await TestBed.configureTestingModule({
        imports: [SmSizeHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(SmSizeHostComponent);
      f.detectChanges();
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
      expect(comp.triggerClasses()).toContain('h-8');
    });

    it('should apply lg size classes for single-select', async () => {
      @Component({
        template: `<luma-select lmSize="lg"
          ><luma-select-option [lmValue]="'a'"
            >A</luma-select-option
          ></luma-select
        >`,
        imports: [LmSelectComponent, LmSelectOptionComponent],
      })
      class LgSizeHostComponent {}

      await TestBed.configureTestingModule({
        imports: [LgSizeHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(LgSizeHostComponent);
      f.detectChanges();
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
      expect(comp.triggerClasses()).toContain('h-12');
    });
  });

  describe('Home/End keyboard navigation', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should jump to first option on Home key', () => {
      selectEl.open();
      fixture.detectChanges();
      selectEl.focusedOptionIndex.set(2);
      selectEl.onSearchKeydown(new KeyboardEvent('keydown', { key: 'Home' }));
      expect(selectEl.focusedOptionIndex()).toBe(0);
    });

    it('should jump to last option on End key', () => {
      selectEl.open();
      fixture.detectChanges();
      selectEl.onSearchKeydown(new KeyboardEvent('keydown', { key: 'End' }));
      expect(selectEl.focusedOptionIndex()).toBe(2); // 3 options → last index = 2
    });
  });

  describe('aria-activedescendant', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should return null when no option is focused', () => {
      expect(selectEl.activeDescendantId()).toBeNull();
    });

    it('should return option ID when an option is focused', () => {
      selectEl.focusedOptionIndex.set(1);
      expect(selectEl.activeDescendantId()).toBe(
        `${selectEl.selectId()}-opt-1`,
      );
    });
  });

  describe('Disabled trigger', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let host: SingleSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should apply cursor-not-allowed class when disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();
      expect(selectEl.triggerClasses()).toContain('cursor-not-allowed');
    });

    it('should apply cursor-pointer class when enabled', () => {
      expect(selectEl.triggerClasses()).toContain('cursor-pointer');
    });

    it('should not contain cursor-pointer when disabled', () => {
      host.ctrl.disable();
      fixture.detectChanges();
      expect(selectEl.triggerClasses()).not.toContain('cursor-pointer');
    });
  });

  describe('Focus-visible border', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should include focus-visible:border-gray-9 in non-error state', () => {
      expect(selectEl.triggerClasses()).toContain(
        'focus-visible:border-gray-9',
      );
    });
  });

  describe('lmEmptyMessage', () => {
    it('should use custom empty message', async () => {
      @Component({
        template: `
          <luma-select lmEmptyMessage="Nothing here">
            <luma-select-option [lmValue]="'a'">A</luma-select-option>
          </luma-select>
        `,
        imports: [LmSelectComponent, LmSelectOptionComponent],
      })
      class EmptyMessageHostComponent {}

      await TestBed.configureTestingModule({
        imports: [EmptyMessageHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(EmptyMessageHostComponent);
      f.detectChanges();
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
      expect(comp.lmEmptyMessage()).toBe('Nothing here');
    });

    it('should default to "No options found"', async () => {
      @Component({
        template: `
          <luma-select>
            <luma-select-option [lmValue]="'a'">A</luma-select-option>
          </luma-select>
        `,
        imports: [LmSelectComponent, LmSelectOptionComponent],
      })
      class DefaultEmptyHostComponent {}

      await TestBed.configureTestingModule({
        imports: [DefaultEmptyHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(DefaultEmptyHostComponent);
      f.detectChanges();
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
      expect(comp.lmEmptyMessage()).toBe('No options found');
    });
  });

  describe('Multi-select chips', () => {
    let fixture: ComponentFixture<MultiSelectHostComponent>;
    let host: MultiSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultiSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(MultiSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should return correct selectedChips after selections', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('blue');
      fixture.detectChanges();
      const chips = selectEl.selectedChips();
      expect(chips.length).toBe(2);
      expect(chips[0]).toEqual({ value: 'red', label: 'Red' });
      expect(chips[1]).toEqual({ value: 'blue', label: 'Blue' });
    });

    it('should return empty selectedChips when nothing selected', () => {
      expect(selectEl.selectedChips()).toEqual([]);
    });

    it('should return null for triggerLabel in multi mode', () => {
      selectEl.selectValue('red');
      fixture.detectChanges();
      expect(selectEl.triggerLabel()).toBeNull();
    });

    it('should remove item via removeChip without opening dropdown', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('green');
      fixture.detectChanges();

      const mockEvent = { stopPropagation: vi.fn() } as unknown as Event;
      selectEl.removeChip(mockEvent, 'red');
      fixture.detectChanges();

      expect(mockEvent.stopPropagation).toHaveBeenCalled();
      expect(host.ctrl.value).toEqual(['green']);
      expect(selectEl.isOpen()).toBe(false);
    });

    it('should render chip dismiss buttons with correct aria-label', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('green');
      fixture.detectChanges();

      const dismissButtons = fixture.debugElement.queryAll(
        By.css('button[aria-label]'),
      );
      const chipDismissLabels = dismissButtons
        .map((b) => b.nativeElement.getAttribute('aria-label'))
        .filter((l: string) => l?.startsWith('Remove '));
      expect(chipDismissLabels).toContain('Remove Red');
      expect(chipDismissLabels).toContain('Remove Green');
    });

    it('should apply min-h-10 and flex-wrap in multi mode trigger classes', () => {
      const classes = selectEl.triggerClasses();
      expect(classes).toContain('min-h-10');
      expect(classes).toContain('flex-wrap');
      // Verify no fixed h-10 (only min-h-10); split to avoid substring match
      const classList = (classes ?? '').split(' ');
      expect(classList).not.toContain('h-10');
    });

    it('should return chip classes from chipClasses computed', () => {
      const classes = selectEl.chipClasses();
      expect(classes).toContain('rounded-full');
      expect(classes).toContain('bg-primary-1');
    });
  });

  describe('Backspace removes last chip', () => {
    let fixture: ComponentFixture<MultiSelectHostComponent>;
    let host: MultiSelectHostComponent;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultiSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(MultiSelectHostComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should remove last selected value on Backspace with empty search', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('green');
      selectEl.selectValue('blue');
      selectEl.open();
      fixture.detectChanges();

      // Search is empty after selectValue clears it
      expect(selectEl.searchQuery()).toBe('');

      selectEl.onSearchKeydown(
        new KeyboardEvent('keydown', { key: 'Backspace' }),
      );
      expect(host.ctrl.value).toEqual(['red', 'green']);
    });

    it('should NOT remove chip when search has text', () => {
      selectEl.selectValue('red');
      selectEl.selectValue('green');
      selectEl.open();
      fixture.detectChanges();

      selectEl.searchQuery.set('gre');
      selectEl.onSearchKeydown(
        new KeyboardEvent('keydown', { key: 'Backspace' }),
      );
      // Should not remove anything because search input has text
      expect(host.ctrl.value).toEqual(['red', 'green']);
    });

    it('should do nothing on Backspace when no chips exist', () => {
      selectEl.open();
      fixture.detectChanges();
      selectEl.onSearchKeydown(
        new KeyboardEvent('keydown', { key: 'Backspace' }),
      );
      expect(host.ctrl.value).toEqual([]);
    });
  });

  describe('compareWith', () => {
    it('should use custom comparison for selection state', async () => {
      @Component({
        template: `
          <luma-select [formControl]="ctrl" [lmCompareWith]="compareFn">
            <luma-select-option [lmValue]="opt1">Option 1</luma-select-option>
            <luma-select-option [lmValue]="opt2">Option 2</luma-select-option>
          </luma-select>
        `,
        imports: [
          ReactiveFormsModule,
          LmSelectComponent,
          LmSelectOptionComponent,
        ],
      })
      class CompareWithHostComponent {
        opt1 = { id: 1, name: 'One' };
        opt2 = { id: 2, name: 'Two' };
        ctrl = new FormControl<{ id: number; name: string } | null>(null);
        compareFn = (a: unknown, b: unknown) =>
          (a as { id: number })?.id === (b as { id: number })?.id;
      }

      await TestBed.configureTestingModule({
        imports: [CompareWithHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(CompareWithHostComponent);
      f.detectChanges();
      const host = f.componentInstance;
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);

      // Set value with a DIFFERENT object reference but same id
      host.ctrl.setValue({ id: 1, name: 'One' });
      f.detectChanges();

      const filtered = comp.filteredOptionsWithState();
      expect(filtered[0].isSelected).toBe(true);
      expect(filtered[1].isSelected).toBe(false);
    });

    it('should use strict equality when no compareWith provided', async () => {
      @Component({
        template: `
          <luma-select [formControl]="ctrl">
            <luma-select-option [lmValue]="opt1">Option 1</luma-select-option>
          </luma-select>
        `,
        imports: [
          ReactiveFormsModule,
          LmSelectComponent,
          LmSelectOptionComponent,
        ],
      })
      class NoCompareHostComponent {
        opt1 = { id: 1 };
        ctrl = new FormControl<{ id: number } | null>(null);
      }

      await TestBed.configureTestingModule({
        imports: [NoCompareHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(NoCompareHostComponent);
      f.detectChanges();
      const host = f.componentInstance;
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);

      // Set value with DIFFERENT object reference → strict equality fails
      host.ctrl.setValue({ id: 1 });
      f.detectChanges();

      const filtered = comp.filteredOptionsWithState();
      expect(filtered[0].isSelected).toBe(false);
    });
  });

  describe('Clear button', () => {
    it('should clear single-select value', async () => {
      @Component({
        template: `
          <luma-select [formControl]="ctrl" [lmClearable]="true">
            <luma-select-option [lmValue]="'a'">A</luma-select-option>
          </luma-select>
        `,
        imports: [
          ReactiveFormsModule,
          LmSelectComponent,
          LmSelectOptionComponent,
        ],
      })
      class ClearSingleHostComponent {
        ctrl = new FormControl<string | null>(null);
      }

      await TestBed.configureTestingModule({
        imports: [ClearSingleHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(ClearSingleHostComponent);
      f.detectChanges();
      const host = f.componentInstance;
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);

      comp.selectValue('a');
      expect(host.ctrl.value).toBe('a');
      expect(comp.hasValue()).toBe(true);

      comp.clear();
      expect(host.ctrl.value).toBeNull();
      expect(comp.hasValue()).toBe(false);
    });

    it('should clear multi-select values', async () => {
      @Component({
        template: `
          <luma-select
            [formControl]="ctrl"
            [lmClearable]="true"
            [lmMultiple]="true"
          >
            <luma-select-option [lmValue]="'a'">A</luma-select-option>
            <luma-select-option [lmValue]="'b'">B</luma-select-option>
          </luma-select>
        `,
        imports: [
          ReactiveFormsModule,
          LmSelectComponent,
          LmSelectOptionComponent,
        ],
      })
      class ClearMultiHostComponent {
        ctrl = new FormControl<string[]>([]);
      }

      await TestBed.configureTestingModule({
        imports: [ClearMultiHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(ClearMultiHostComponent);
      f.detectChanges();
      const host = f.componentInstance;
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);

      comp.selectValue('a');
      comp.selectValue('b');
      expect(host.ctrl.value).toEqual(['a', 'b']);

      comp.clear();
      expect(host.ctrl.value).toEqual([]);
      expect(comp.hasValue()).toBe(false);
    });

    it('should report hasValue correctly', () => {
      @Component({
        template: `
          <luma-select [formControl]="ctrl">
            <luma-select-option [lmValue]="'a'">A</luma-select-option>
          </luma-select>
        `,
        imports: [
          ReactiveFormsModule,
          LmSelectComponent,
          LmSelectOptionComponent,
        ],
      })
      class HasValueHostComponent {
        ctrl = new FormControl<string | null>(null);
      }

      TestBed.configureTestingModule({
        imports: [HasValueHostComponent],
      }).compileComponents();

      const f = TestBed.createComponent(HasValueHostComponent);
      f.detectChanges();
      const comp = f.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);

      expect(comp.hasValue()).toBe(false);
      comp.selectValue('a');
      expect(comp.hasValue()).toBe(true);
    });
  });

  describe('ARIA attributes', () => {
    let fixture: ComponentFixture<SingleSelectHostComponent>;
    let selectEl: LmSelectComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SingleSelectHostComponent],
      }).compileComponents();
      fixture = TestBed.createComponent(SingleSelectHostComponent);
      fixture.detectChanges();
      selectEl = fixture.debugElement
        .query(By.directive(LmSelectComponent))
        .injector.get(LmSelectComponent);
    });

    it('should have searchInputId computed', () => {
      expect(selectEl.searchInputId()).toContain('-search');
    });

    it('should have listboxId computed', () => {
      expect(selectEl.listboxId()).toContain('-listbox');
    });
  });
});
