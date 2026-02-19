import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Trigger button — visually identical to an input field.
 * Cascade rule (from input.variants.ts): mutually exclusive border-color classes
 * live in error branches, never in base, to avoid Tailwind v4 specificity conflicts.
 *
 * Height is handled via compoundVariants keyed on `size` + `multiple`:
 * - single-select → fixed `h-*`
 * - multi-select  → expandable `min-h-*` so chips can wrap
 */
export const selectTriggerVariants = cva(
  [
    'relative',
    'flex',
    'items-center',
    'w-full',
    'border',
    'bg-transparent',
    'font-normal',
    'transition-colors',
    'duration-200',
    'focus:outline-none',
    'focus-visible:outline-none',
  ],
  {
    variants: {
      size: {
        sm: ['px-2.5', 'text-xs', 'rounded-[var(--radius-3)]'],
        md: ['px-3', 'text-sm', 'rounded-[var(--radius-4)]'],
        lg: ['px-3.5', 'text-base', 'rounded-[var(--radius-5)]'],
      },
      multiple: {
        true: ['flex-wrap', 'gap-1', 'py-1'],
        false: [],
      },
      error: {
        true: ['border-destructive', 'focus-visible:border-destructive'],
        false: [
          'border-gray-5',
          'hover:border-gray-9',
          'focus-visible:border-gray-9',
        ],
      },
      disabled: {
        true: ['cursor-not-allowed', 'bg-gray-4', 'border-gray-5'],
        false: ['cursor-pointer'],
      },
    },
    compoundVariants: [
      // Single-select: fixed height
      { multiple: false, size: 'sm', class: ['h-8'] },
      { multiple: false, size: 'md', class: ['h-10'] },
      { multiple: false, size: 'lg', class: ['h-12'] },
      // Multi-select: expandable height
      { multiple: true, size: 'sm', class: ['min-h-8'] },
      { multiple: true, size: 'md', class: ['min-h-10'] },
      { multiple: true, size: 'lg', class: ['min-h-12'] },
    ],
    defaultVariants: {
      size: 'md',
      multiple: false,
      error: false,
      disabled: false,
    },
  },
);

/** Absolute-position listbox panel — positioned via CSS relative to host */
export const selectListboxVariants = cva(
  [
    'absolute',
    'left-0',
    'w-full',
    'z-50',
    'max-h-60',
    'overflow-y-auto',
    'overflow-x-hidden',
    'overscroll-y-contain',
    'rounded-[var(--radius-4)]',
    'border',
    'border-gray-5',
    'bg-card',
    'text-card-foreground',
    'shadow-3',
    'py-1',
    'outline-none',
  ],
  {
    variants: {
      flip: {
        false: ['top-full', 'mt-1'],
        true: ['bottom-full', 'mb-1'],
      },
    },
    defaultVariants: { flip: false },
  },
);

/** Individual option row */
export const selectOptionVariants = cva(
  [
    'flex',
    'items-center',
    'gap-2',
    'w-full',
    'px-3',
    'py-1.5',
    'text-sm',
    'cursor-pointer',
    'select-none',
    'transition-colors',
    'duration-150',
  ],
  {
    variants: {
      selected: {
        true: ['text-primary', 'bg-primary/10'],
        false: ['text-foreground', 'hover:bg-primary/10'],
      },
      disabled: {
        true: ['opacity-50', 'cursor-not-allowed', 'pointer-events-none'],
        false: [],
      },
    },
    defaultVariants: { selected: false, disabled: false },
  },
);

/** Search input — no border of its own; trigger provides the visual container */
export const selectSearchInputVariants = cva([
  'flex-1',
  'bg-transparent',
  'outline-none',
  'border-none',
  'min-w-0',
  'text-foreground',
  'placeholder:text-muted-foreground',
]);

/** Chip for selected items in multi-select mode */
export const selectChipVariants = cva(
  [
    'inline-flex',
    'items-center',
    'gap-0.5',
    'bg-gray-3',
    'text-foreground',
    'rounded-full',
    'max-w-full',
  ],
  {
    variants: {
      size: {
        sm: ['text-[10px]', 'px-1.5', 'py-px'],
        md: ['text-xs', 'px-2', 'py-0.5'],
        lg: ['text-xs', 'px-2.5', 'py-1'],
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/** Dismiss button inside a chip */
export const selectChipDismissVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'shrink-0',
    'rounded-full',
    'text-muted-foreground',
    'hover:text-foreground',
    'hover:bg-primary-3',
    'transition-colors',
    'cursor-pointer',
  ],
  {
    variants: {
      size: {
        sm: ['h-3', 'w-3'],
        md: ['h-3.5', 'w-3.5'],
        lg: ['h-4', 'w-4'],
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/**
 * Manifest hint — template-only classes not referenced in CVA definitions above.
 * The class manifest extractor scans string literals in this file.
 */
// prettier-ignore
const _manifestHint = 'max-h-32 overflow-y-auto min-w-15';

export type SelectSize = NonNullable<
  VariantProps<typeof selectTriggerVariants>['size']
>;
