import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Accordion Item Variants
 * Wrapper component that contains trigger and content
 */
export const accordionItemVariants = cva(
  [
    'block',
    'overflow-hidden',
    'group',
    'relative',
    'w-full',
    'border-b',
    'border-gray-200',
  ],
  {
    variants: {
      variant: {
        default: [],
        filled: [
          'border',
          'rounded-[var(--radius-4)]',
          'mb-2',
          'bg-primary-2',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

/**
 * Accordion Trigger Variants
 * Button element that toggles the accordion
 */
export const accordionTriggerVariants = cva([
  'w-full',
  'flex',
  'items-center',
  'justify-between',
  'gap-2',
  'text-left',
  'cursor-pointer',
  'py-4',
  'px-0',
  'font-medium',
  'transition-all',
  'hover:bg-primary-2',
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-primary-9',
  'focus-visible:ring-offset-2',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  '[&[data-state=open]>svg]:rotate-180',
]);

/**
 * Accordion Title Variants
 * Typography for the accordion header
 */
export const accordionTitleVariants = cva(
  ['flex-1', 'text-gray-900'],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

/**
 * Accordion Icon Variants
 * Chevron/icon that rotates when open
 */
export const accordionIconVariants = cva(
  [
    'shrink-0',
    'h-4',
    'w-4',
    'text-gray-600',
    'transition-transform',
    'duration-200',
  ],
  {
    variants: {
      open: {
        true: 'rotate-180',
        false: 'rotate-0',
      },
    },
    defaultVariants: { open: false },
  },
);

/**
 * Accordion Content Wrapper Variants
 * Grid wrapper for height animation
 */
export const accordionContentWrapperVariants = cva(
  ['grid', 'transition-[grid-template-rows]', 'duration-200', 'ease-out'],
  {
    variants: {
      open: {
        true: 'grid-rows-[1fr]',
        false: 'grid-rows-[0fr]',
      },
    },
    defaultVariants: { open: false },
  },
);

/**
 * Accordion Content Variants
 * Content panel with text styling
 */
export const accordionContentVariants = cva(
  [
    'overflow-hidden',
    'text-sm',
    'text-gray-600',
    'pb-4',
    'pt-0',
    'transition-opacity',
    'duration-200',
  ],
  {
    variants: {
      open: {
        true: 'opacity-100',
        false: 'opacity-0',
      },
    },
    defaultVariants: { open: false },
  },
);

// Type exports
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariants = VariantProps<
  typeof accordionTriggerVariants
>;
export type AccordionTitleVariants = VariantProps<
  typeof accordionTitleVariants
>;
export type AccordionIconVariants = VariantProps<typeof accordionIconVariants>;
export type AccordionContentWrapperVariants = VariantProps<
  typeof accordionContentWrapperVariants
>;
export type AccordionContentVariants = VariantProps<
  typeof accordionContentVariants
>;

export type AccordionItemVariant = NonNullable<
  AccordionItemVariants['variant']
>;
export type AccordionTitleSize = NonNullable<AccordionTitleVariants['size']>;
